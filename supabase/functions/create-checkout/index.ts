import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// GrowthOS pricing configuration
const PRICING = {
  monthly: {
    subscription: "price_1StZvYL9v3Ddx5xKXWfS22Ra", // $999/mo
    setup: "price_1StZvgL9v3Ddx5xK4pJAkhu5", // $999 one-time
  },
  annual: {
    subscription: "price_1StZvhL9v3Ddx5xKxlQmlLNs", // $9,999/yr (no setup)
  },
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { plan, customerInfo } = await req.json();
    if (!plan || !["monthly", "annual"].includes(plan)) {
      throw new Error("Invalid plan. Must be 'monthly' or 'annual'");
    }
    logStep("Plan selected", { plan });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    let customerId: string | undefined;
    let customerEmail: string | undefined;

    // Use customer info from the form if provided
    if (customerInfo?.email) {
      customerEmail = customerInfo.email;
      logStep("Customer info from form", { email: customerEmail, name: customerInfo.fullName });

      // Check for existing Stripe customer by email
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing Stripe customer", { customerId });

        // Update customer with latest info
        await stripe.customers.update(customerId, {
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          metadata: {
            clinic_name: customerInfo.clinicName,
            address: customerInfo.address,
          },
        });
      } else {
        // Create new Stripe customer with form data
        const newCustomer = await stripe.customers.create({
          email: customerEmail,
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          metadata: {
            clinic_name: customerInfo.clinicName,
            address: customerInfo.address,
          },
        });
        customerId = newCustomer.id;
        logStep("Created new Stripe customer", { customerId });
      }
    }

    // Fallback: try auth header if no form info
    if (!customerId && !customerEmail) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader !== "Bearer " && authHeader !== "Bearer undefined" && authHeader !== "Bearer null") {
        try {
          const token = authHeader.replace("Bearer ", "");
          const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
          
          if (!authError && userData.user?.email) {
            customerEmail = userData.user.email;
            logStep("User authenticated", { userId: userData.user.id, email: customerEmail });

            const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
            if (customers.data.length > 0) {
              customerId = customers.data[0].id;
              logStep("Found existing Stripe customer", { customerId });
            }
          } else {
            logStep("Auth header present but invalid - proceeding as guest", { error: authError?.message });
          }
        } catch (authErr) {
          logStep("Auth validation failed - proceeding as guest", { error: String(authErr) });
        }
      } else {
        logStep("No valid auth header - proceeding with guest checkout");
      }
    }

    // Build line items based on plan
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    
    if (plan === "monthly") {
      lineItems.push(
        { price: PRICING.monthly.subscription, quantity: 1 },
        { price: PRICING.monthly.setup, quantity: 1 }
      );
    } else {
      lineItems.push({ price: PRICING.annual.subscription, quantity: 1 });
    }

    logStep("Line items prepared", { lineItems: lineItems.map(li => li.price) });

    // Create checkout session
    const origin = req.headers.get("origin") || "https://inquiry-to-consult.lovable.app";
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: lineItems,
      mode: "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sign-up`,
    };

    // Add customer info
    if (customerId) {
      sessionParams.customer = customerId;
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Fire signup webhook to LeadConnector (non-blocking)
    if (customerInfo) {
      const webhookUrl = "https://services.leadconnectorhq.com/hooks/RxV8vl8lgXtUddCR3zg6/webhook-trigger/58ac1029-90ba-4390-a871-20d7650b6360";
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: customerInfo.fullName,
          clinicName: customerInfo.clinicName,
          address: customerInfo.address,
          phone: customerInfo.phone,
          email: customerInfo.email,
          plan,
          stripeSessionId: session.id,
        }),
      }).then(() => logStep("Signup webhook fired"))
        .catch((err) => logStep("Signup webhook error", { error: String(err) }));
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
