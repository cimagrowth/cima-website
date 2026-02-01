import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OptimizeRequest {
  title: string;
  content: string;
}

interface SEOResult {
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  excerpt: string;
  reading_time_minutes: number;
  suggested_image_prompt: string;
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute (admin-only, so lower limit)

// In-memory rate limit store
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  const rateLimitResult = checkRateLimit(clientIP);

  if (!rateLimitResult.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter),
        },
      }
    );
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Verify user is authenticated and admin
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !roleData) {
      console.error("Role check error:", roleError);
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { title, content }: OptimizeRequest = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Optimizing SEO for:", title);

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const reading_time_minutes = Math.max(1, Math.ceil(wordCount / 200));

    // Call Lovable AI Gateway for SEO optimization
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are the SEO and content expert for Cima Growth Solutions blog, focused on fertility and regenerative medicine clinics.

BRAND IDENTITY:
Cima Growth Solutions helps fertility and regenerative medicine clinics grow ethically, intelligently, and sustainably using modern marketing systems, automation, and AI. We are operators, strategists, and system builders. Our core belief: most clinics don't have a lead problem—they have a communication, follow-up, and systems problem.

VOICE & TONE:
- Authoritative, calm, and clear. Never loud, hype-driven, or gimmicky.
- Confident but not arrogant. Direct but not aggressive. Educational, not preachy.
- Feel like "a seasoned operator explaining how things really work behind the scenes."
- AVOID: marketing buzzwords, over-promising, emotional manipulation, "growth hacks," em dashes, exclamation points, emojis.
- PREFER: clear explanations, real-world examples, systems thinking, cause-and-effect logic, calm conviction.

CONTENT PILLARS:
1. Patient Journey Intelligence - How patients move from awareness to treatment, patient leakage, response time impact
2. Clinic Growth Systems - Systems over tactics, why "more leads" doesn't fix growth, automation supporting human care
3. AI in Healthcare (Practical) - AI as support layer, communication amplifier, consistency engine. Never replacing doctors.
4. Operational Clarity - Reduce chaos, centralize communication, eliminate tool sprawl
5. Market Education & Myth-Busting - Challenge bad ideas calmly, offer clearer frameworks

AUDIENCE: Fertility clinic owners, practice administrators, medical directors, growth-minded leadership. Smart but busy, skeptical of hype, frustrated with fragmented tools.

IMPORTANT: Every post should end with a clear CTA to "Book a Demo" with Cima Growth Solutions.

Always respond with valid JSON in this exact format:
{
  "meta_title": "SEO-optimized title under 60 characters that reflects authority and clarity",
  "meta_description": "Compelling meta description under 160 characters. No hype. Clear value proposition.",
  "meta_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "excerpt": "A 2-3 sentence excerpt that hooks readers with insight, not hype. Should feel like the opening of a whitepaper or consulting insight.",
  "suggested_image_prompt": "A detailed prompt for generating a professional, minimalist medical-themed header image. Avoid cartoon illustrations and 'happy people' stock photo aesthetics. Favor calm, clinical, authoritative visuals suitable for fertility and regenerative medicine."
}`,
            },
            {
              role: "user",
              content: `Please optimize the following blog post for SEO, following Cima Growth brand guidelines:

Title: ${title}

Content:
${content.substring(0, 3000)}${content.length > 3000 ? "..." : ""}

Provide optimized SEO metadata in JSON format.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResult = await response.json();
    console.log("AI response received");

    const aiContent = aiResult.choices[0]?.message?.content;
    
    // Parse the JSON response from AI
    let seoData: SEOResult;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      seoData = JSON.parse(jsonMatch[0]);
      seoData.reading_time_minutes = reading_time_minutes;
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, aiContent);
      // Fallback to basic SEO
      seoData = {
        meta_title: title.substring(0, 60),
        meta_description: content.substring(0, 157) + "...",
        meta_keywords: ["clinic growth", "patient acquisition", "healthcare marketing"],
        excerpt: content.substring(0, 200) + "...",
        reading_time_minutes,
        suggested_image_prompt: `Professional medical office setting with soft lighting, representing ${title}. Clean, modern healthcare aesthetic.`,
      };
    }

    console.log("SEO optimization complete:", seoData);

    return new Response(JSON.stringify(seoData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in optimize-blog-seo:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
