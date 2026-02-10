import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

const LEADCONNECTOR_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/RxV8vl8lgXtUddCR3zg6/webhook-trigger/faac0ee9-2ee4-420e-a272-1c722ae86e0e";
const N8N_CREATE_ACCOUNT_WEBHOOK_URL = "https://cima.app.n8n.cloud/webhook/create-cima-account";
const EXTERNAL_ACCOUNT_WEBHOOK_URL = "https://xdbahwfhycfiwjwouzwp.supabase.co/functions/v1/external-account-webhook";

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    logStep("Verifying webhook signature");
    
    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      logStep("Webhook signature verification failed", { error: errorMessage });
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${errorMessage}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    logStep("Webhook event received", { type: event.type, id: event.id });

    // Handle checkout.session.completed event (successful payment)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      logStep("Checkout session completed", {
        sessionId: session.id,
        customerEmail: session.customer_email,
        customerId: session.customer,
        amountTotal: session.amount_total,
        currency: session.currency,
        mode: session.mode,
      });

      // Extract customer details
      const customerEmail = session.customer_email || session.customer_details?.email;
      const customerName = session.customer_details?.name || "";
      const customerPhone = session.customer_details?.phone || "";
      
      // Split name into first/last
      const nameParts = customerName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Fetch Stripe customer to get metadata (clinic_name)
      let clinicName = "";
      if (session.customer) {
        try {
          const customer = await stripe.customers.retrieve(session.customer as string);
          if (customer && !customer.deleted && customer.metadata?.clinic_name) {
            clinicName = customer.metadata.clinic_name;
          }
          logStep("Fetched customer metadata", { clinicName });
        } catch (err) {
          logStep("Failed to fetch customer metadata", { error: String(err) });
        }
      }
      
      // Determine plan type based on mode and amount
      let planType = "unknown";
      if (session.mode === "subscription") {
        const amountInDollars = (session.amount_total || 0) / 100;
        if (amountInDollars >= 9000) {
          planType = "annual";
        } else {
          planType = "monthly";
        }
      } else {
        planType = "one-time";
      }

      // Prepare payload for LeadConnector
      const webhookPayload = {
        source: "stripe_payment",
        event: "checkout_completed",
        email: customerEmail,
        name: customerName,
        phone: customerPhone,
        planType: planType,
        amountPaid: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || "USD",
        stripeSessionId: session.id,
        stripeCustomerId: session.customer,
        subscriptionId: session.subscription || null,
        paymentStatus: session.payment_status,
        submittedAt: new Date().toISOString(),
      };

      logStep("Sending to LeadConnector", webhookPayload);

      // 1) Fire webhook to LeadConnector
      const response = await fetch(LEADCONNECTOR_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      const responseText = await response.text();
      logStep("LeadConnector response", { status: response.status, response: responseText });

      if (!response.ok) {
        logStep("LeadConnector webhook failed", { status: response.status });
      }

      // 2) Fire n8n webhook to create CIMA account (non-blocking)
      logStep("Sending to n8n create-cima-account webhook", { email: customerEmail, name: customerName });
      fetch(N8N_CREATE_ACCOUNT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          planType,
          amountPaid: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency?.toUpperCase() || "USD",
          stripeCustomerId: session.customer,
          subscriptionId: session.subscription || null,
          createdAt: new Date().toISOString(),
        }),
      }).then(async (res) => {
        const text = await res.text();
        logStep("n8n create-account response", { status: res.status, response: text });
      }).catch((err) => logStep("n8n create-account webhook error", { error: String(err) }));

      // 3) Fire external-account-webhook (non-blocking)
      const externalApiKey = Deno.env.get("EXTERNAL_ACCOUNT_WEBHOOK_KEY");
      if (externalApiKey) {
        logStep("Sending to external-account-webhook", { email: customerEmail, firstName, lastName });
        fetch(EXTERNAL_ACCOUNT_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": externalApiKey,
          },
          body: JSON.stringify({
            email: customerEmail,
            company_name: clinicName,
            first_name: firstName,
            last_name: lastName,
            phone: customerPhone,
            plan_status: "active",
            send_welcome_email: false,
          }),
        }).then(async (res) => {
          const text = await res.text();
          logStep("external-account-webhook response", { status: res.status, response: text });
        }).catch((err) => logStep("external-account-webhook error", { error: String(err) }));
      } else {
        logStep("EXTERNAL_ACCOUNT_WEBHOOK_KEY not set, skipping external-account-webhook");
      }
    }

    // Handle subscription created/updated events
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      logStep("Subscription event", {
        subscriptionId: subscription.id,
        status: subscription.status,
        customerId: subscription.customer,
      });
    }

    // Acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
