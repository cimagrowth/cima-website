import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

Remember: You're showcasing how AI can nurture patient leads effectively. Make the experience impressive and realistic.`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, clinicType, visitorName, userMessage, saveAssistantMessage } = await req.json();
    
    console.log("Demo chat request:", { sessionId, clinicType, visitorName, messageCount: messages?.length });

    const supabaseAdmin = getSupabaseAdmin();

    // Validate session exists (security check - only process requests for valid sessions)
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
      await supabaseAdmin.from("demo_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
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
