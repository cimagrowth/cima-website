import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/RxV8vl8lgXtUddCR3zg6/webhook-trigger/faac0ee9-2ee4-420e-a272-1c722ae86e0e";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    console.log("Received webhook request:", JSON.stringify(body));

    // Forward to LeadConnector webhook
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log("Webhook response status:", response.status);
    console.log("Webhook response:", responseText);

    return new Response(
      JSON.stringify({ success: true, status: response.status }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook error:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
