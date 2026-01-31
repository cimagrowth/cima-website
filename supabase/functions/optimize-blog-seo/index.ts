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

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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
              content: `You are an SEO expert for a medical clinic marketing blog. Your task is to optimize blog posts for search engines while maintaining a professional, authoritative tone suitable for fertility and regenerative medicine clinics.

Always respond with valid JSON in this exact format:
{
  "meta_title": "SEO-optimized title under 60 characters",
  "meta_description": "Compelling meta description under 160 characters that includes the main keyword",
  "meta_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "excerpt": "A 2-3 sentence excerpt that hooks readers and summarizes the post",
  "suggested_image_prompt": "A detailed prompt for generating a professional, medical-themed header image for this blog post. Should be calm, professional, and suitable for healthcare marketing."
}`,
            },
            {
              role: "user",
              content: `Please optimize the following blog post for SEO:

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
