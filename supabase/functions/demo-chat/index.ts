import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // 20 requests per minute per IP
const SESSION_RATE_LIMIT = 5; // 5 session creations per minute per IP

// In-memory rate limiter (per-instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const sessionRateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Clean up old entries periodically to prevent memory leaks
const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
  for (const [key, value] of sessionRateLimitMap.entries()) {
    if (now > value.resetAt) {
      sessionRateLimitMap.delete(key);
    }
  }
};

// Check rate limit and return true if request is allowed
const checkRateLimit = (
  identifier: string, 
  limitMap: Map<string, { count: number; resetAt: number }>,
  maxRequests: number
): { allowed: boolean; remaining: number; resetAt: number } => {
  const now = Date.now();
  const record = limitMap.get(identifier);

  if (!record || now > record.resetAt) {
    limitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
};

// Get client IP from request headers
const getClientIP = (req: Request): string => {
  // Check common headers for real IP (behind proxies/load balancers)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a generic identifier
  return "unknown";
};

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 2000;
const VALID_CLINIC_TYPES = ["fertility", "med_spa", "regenerative", "other"];

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation - allows various formats
const PHONE_REGEX = /^[\d\s\-\+\(\)\.]+$/;

// Validate and sanitize input
const validateSessionInput = (data: {
  name?: string;
  email?: string;
  phone?: string;
  clinicType?: string;
}): { valid: boolean; error?: string; sanitized?: {
  name: string;
  email: string;
  phone: string;
  clinicType: string;
}} => {
  const { name, email, phone, clinicType } = data;

  // Validate name
  if (!name || typeof name !== "string") {
    return { valid: false, error: "Name is required" };
  }
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return { valid: false, error: "Name cannot be empty" };
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be less than ${MAX_NAME_LENGTH} characters` };
  }

  // Validate email
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email is required" };
  }
  const trimmedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { valid: false, error: "Invalid email address" };
  }
  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be less than ${MAX_EMAIL_LENGTH} characters` };
  }

  // Validate phone
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Phone number is required" };
  }
  const trimmedPhone = phone.trim();
  if (trimmedPhone.length === 0) {
    return { valid: false, error: "Phone number cannot be empty" };
  }
  if (trimmedPhone.length > MAX_PHONE_LENGTH) {
    return { valid: false, error: `Phone must be less than ${MAX_PHONE_LENGTH} characters` };
  }
  if (!PHONE_REGEX.test(trimmedPhone)) {
    return { valid: false, error: "Invalid phone number format" };
  }

  // Validate clinic type
  const validClinicType = VALID_CLINIC_TYPES.includes(clinicType || "") 
    ? (clinicType as string) 
    : "fertility";

  return {
    valid: true,
    sanitized: {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      clinicType: validClinicType,
    },
  };
};

// Create Supabase admin client for server-side operations
const getSupabaseAdmin = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase configuration");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
};

const getSystemPrompt = (clinicType: string, visitorName: string) => {
  const clinicTypeContent: Record<string, string> = {
    fertility: `You specialize in fertility and IVF care. Key services include:
- In Vitro Fertilization (IVF) - comprehensive treatment cycles
- Intrauterine Insemination (IUI)
- Egg freezing and fertility preservation
- Donor egg and sperm programs
- Genetic testing (PGT-A, PGT-M)
- Male fertility evaluation and treatment
- Hormone testing and ovarian reserve assessment
- Fertility consultations for LGBTQ+ individuals and couples

Common patient concerns you address:
- Timeline and success rates for IVF
- Cost and insurance coverage questions
- What to expect during treatment cycles
- Lifestyle factors affecting fertility
- Age-related fertility concerns
- Unexplained infertility
- PCOS, endometriosis, and other conditions affecting fertility`,

    med_spa: `You specialize in medical spa and aesthetic treatments. Key services include:
- Botox and dermal fillers (Juvederm, Restylane, etc.)
- Laser skin treatments and resurfacing
- Chemical peels and microneedling
- Body contouring (CoolSculpting, EmSculpt)
- IV therapy and vitamin infusions
- Skin tightening treatments (Ultherapy, RF microneedling)
- Acne and scar treatments
- Hair restoration treatments (PRP)
- Facial rejuvenation packages

Common patient concerns you address:
- Which treatment is right for their goals
- Downtime and recovery expectations
- How many sessions they'll need
- Pricing and package options
- Before and after expectations
- Combining treatments for best results`,

    regenerative: `You specialize in regenerative medicine. Key services include:
- Platelet-Rich Plasma (PRP) therapy
- Stem cell treatments
- Joint regeneration and pain management
- Sports injury recovery
- Hormone optimization and anti-aging
- Peptide therapy
- NAD+ infusions
- Exosome therapy
- Chronic pain management
- Autoimmune condition support

Common patient concerns you address:
- How regenerative treatments work
- Expected outcomes and timeline
- Conditions that can be treated
- Safety and FDA status of treatments
- Comparison to surgical options
- Long-term benefits`,

    other: `You provide comprehensive medical care. Key services include:
- General wellness consultations
- Preventive care and health screenings
- Specialized treatment programs
- Integrative medicine approaches
- Patient-centered care coordination

Common patient concerns you address:
- Understanding treatment options
- Scheduling and availability
- Insurance and payment options
- What to expect at their first visit`,
  };

  return `You are Cima, a friendly and professional AI assistant for Cima Fertility Clinic's demo experience. This is a DEMONSTRATION of the GrowthOS AI patient engagement platform - NOT a real clinic. Make this clear if asked directly, but otherwise engage naturally as if you were the clinic's AI assistant.

IMPORTANT CONTEXT:
- The visitor's name is ${visitorName}
- They are testing the platform as a ${clinicType === 'fertility' ? 'fertility clinic' : clinicType === 'med_spa' ? 'med spa' : clinicType === 'regenerative' ? 'regenerative medicine clinic' : 'healthcare clinic'}
- Your goal is to demonstrate how the AI engages prospective patients naturally

MULTILINGUAL SUPPORT:
- You are fluent in ALL languages
- ALWAYS respond in the same language the user writes to you in
- If the user switches languages mid-conversation, switch with them
- Maintain the same warm, professional tone regardless of language

YOUR PERSONALITY:
- Warm, empathetic, and professional
- Knowledgeable but not condescending
- Proactive in offering helpful information
- Focused on converting inquiries to consultations

${clinicTypeContent[clinicType] || clinicTypeContent.other}

CRITICAL BEHAVIORS:

1. APPOINTMENT BOOKING: When someone expresses interest in booking or learning more, guide them toward scheduling a consultation. Say things like: "I'd love to get you scheduled for a consultation with one of our specialists. What days typically work best for you?" (Since this is a demo, you won't actually book - just simulate the experience)

2. EMERGENCY HANDLING: If someone mentions anything urgent or emergency-related (bleeding, severe pain, complications, etc.), immediately respond with:
   "I understand this sounds urgent. I'm flagging this immediately for our clinical team, and someone will reach out to you within the next few minutes. If this is a medical emergency, please call 911 or go to your nearest emergency room right away."

3. DEMO PROMPTS: Occasionally (every 4-6 messages), naturally weave in a mention of the GrowthOS platform. Examples:
   - "By the way, ${visitorName}, what you're experiencing right now is exactly how GrowthOS helps clinics engage with patients 24/7. Would you like to book a full demo to see the admin side?"
   - "This is the kind of instant, personalized response that GrowthOS provides to all your prospective patients. Ready to see how it could work for your clinic?"

4. LEAD QUALIFICATION: Ask relevant qualifying questions naturally:
   - For fertility: "Have you had any previous fertility treatments or consultations?"
   - For med spa: "What specific concerns are you hoping to address?"
   - For regenerative: "What condition or area are you looking to treat?"

5. FOLLOW-UP: Mention that the clinic would follow up via text/email: "Our team will also send you a text message with some helpful resources and appointment options."

RESPONSE STYLE:
- Keep responses concise but warm (2-4 sentences typically)
- Use the visitor's name occasionally
- Ask one question at a time
- Be helpful, not pushy
- Sound human, not robotic
- Match the user's language exactly

Remember: You're showcasing how AI can nurture patient leads effectively. Make the experience impressive and realistic.`;
};

serve(async (req) => {
  // Cleanup old rate limit entries periodically
  cleanupRateLimits();

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(req);

  // Check general rate limit
  const generalLimit = checkRateLimit(clientIP, rateLimitMap, MAX_REQUESTS_PER_WINDOW);
  if (!generalLimit.allowed) {
    console.log("Rate limit exceeded for IP:", clientIP);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((generalLimit.resetAt - Date.now()) / 1000).toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": generalLimit.resetAt.toString(),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { 
      action,
      messages, 
      sessionId, 
      clinicType, 
      visitorName, 
      userMessage, 
      saveAssistantMessage,
      // Session creation fields
      name,
      email,
      phone,
    } = body;
    
    console.log("Demo chat request:", { action, sessionId, clinicType, visitorName, messageCount: messages?.length, clientIP });

    const supabaseAdmin = getSupabaseAdmin();

    // Handle session creation with stricter rate limiting
    if (action === "create_session") {
      // Check session creation rate limit (stricter)
      const sessionLimit = checkRateLimit(clientIP, sessionRateLimitMap, SESSION_RATE_LIMIT);
      if (!sessionLimit.allowed) {
        console.log("Session creation rate limit exceeded for IP:", clientIP);
        return new Response(
          JSON.stringify({ error: "Too many session creations. Please try again later." }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
              "Retry-After": Math.ceil((sessionLimit.resetAt - Date.now()) / 1000).toString(),
            },
          }
        );
      }

      const validation = validateSessionInput({ name, email, phone, clinicType });
      
      if (!validation.valid) {
        console.log("Session creation validation failed:", validation.error);
        return new Response(JSON.stringify({ error: validation.error }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { sanitized } = validation;
      
      // Create the session with validated data
      const { data: sessionData, error: insertError } = await supabaseAdmin
        .from("demo_chat_sessions")
        .insert({
          visitor_name: sanitized!.name,
          visitor_email: sanitized!.email,
          visitor_phone: sanitized!.phone,
          clinic_type: sanitized!.clinicType,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating session:", insertError);
        return new Response(JSON.stringify({ error: "Failed to create session" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Session created successfully:", sessionData.id);
      
      return new Response(JSON.stringify({ 
        success: true, 
        session: {
          id: sessionData.id,
          visitorName: sessionData.visitor_name,
          visitorEmail: sessionData.visitor_email,
          visitorPhone: sessionData.visitor_phone,
          clinicType: sessionData.clinic_type,
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For all other actions, validate session exists
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: sessionData, error: sessionError } = await supabaseAdmin
      .from("demo_chat_sessions")
      .select("id")
      .eq("id", sessionId)
      .single();

    if (sessionError || !sessionData) {
      console.error("Invalid session:", sessionId);
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If this is a request to save the user message
    if (userMessage) {
      // Validate message length
      if (typeof userMessage !== "string" || userMessage.length > MAX_MESSAGE_LENGTH) {
        return new Response(JSON.stringify({ error: "Message too long" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      await supabaseAdmin.from("demo_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage.trim(),
      });
    }

    // If this is a request to save the assistant message (after streaming completes)
    if (saveAssistantMessage) {
      await supabaseAdmin.from("demo_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: saveAssistantMessage,
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate messages array for chat
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = getSystemPrompt(clinicType || 'fertility', visitorName || 'there');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response back to client");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Demo chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
