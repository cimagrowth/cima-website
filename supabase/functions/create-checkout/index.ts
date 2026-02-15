import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Whop checkout URLs
const WHOP_CHECKOUT = {
  monthly: "https://whop.com/checkout/plan_YTMn2yZ62W5Xt",
  annual: "https://whop.com/checkout/plan_gKhQsMZi7n1dB",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { plan, customerInfo } = await req.json();
    if (!plan || !["monthly", "annual"].includes(plan)) {
      throw new Error("Invalid plan. Must be 'monthly' or 'annual'");
    }
    logStep("Plan selected", { plan });

    // Initialize Stripe (still used to create/update customer profiles)
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Create or update Stripe customer profile from form data
    if (customerInfo?.email) {
      const customerEmail = customerInfo.email;
      logStep("Customer info from form", { email: customerEmail, name: customerInfo.fullName });

      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        const customerId = customers.data[0].id;
        logStep("Found existing Stripe customer, updating", { customerId });
        await stripe.customers.update(customerId, {
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          metadata: {
            clinic_name: customerInfo.clinicName,
            address: customerInfo.address,
            plan,
          },
        });
      } else {
        const newCustomer = await stripe.customers.create({
          email: customerEmail,
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          metadata: {
            clinic_name: customerInfo.clinicName,
            address: customerInfo.address,
            plan,
          },
        });
        logStep("Created new Stripe customer", { customerId: newCustomer.id });
      }
    }

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
        }),
      }).then(() => logStep("Signup webhook fired"))
        .catch((err) => logStep("Signup webhook error", { error: String(err) }));
    }

    // Build Whop checkout URL with prefilled email
    let whopUrl = WHOP_CHECKOUT[plan as keyof typeof WHOP_CHECKOUT];
    if (customerInfo?.email) {
      whopUrl += `?email=${encodeURIComponent(customerInfo.email)}`;
    }

    logStep("Redirecting to Whop checkout", { url: whopUrl });

    return new Response(JSON.stringify({ url: whopUrl }), {
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
