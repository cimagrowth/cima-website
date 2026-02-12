import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";

const RefundPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Refund Policy"
        description="Refund Policy for Cima Growth Solutions GrowthOS subscriptions and associated services."
        canonical="https://cimagrowth.com/refund-policy"
        ogImage="https://cimagrowth.com/og-refund.png"
      />
      <div className="container-wide px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Refund Policy</h1>
          <p className="text-muted-foreground text-lg mb-8">Last Updated: February 10, 2026</p>

          <p>
            This Refund Policy applies to all purchases made through Cima Growth Solutions ("Cima," "we," "our," or "us"), including GrowthOS subscriptions and any associated setup fees.
          </p>
          <p>By purchasing or using our services, you agree to this Refund Policy.</p>

          <h2>1. 14-Day Cancellation &amp; Refund Window</h2>
          <p>
            Customers may cancel their initial purchase within fourteen (14) calendar days of the original transaction date and request a refund without providing a reason, provided the conditions below are met.
          </p>
          <p>To request a refund, the customer must submit a written request to support@cimagrowth.com within the 14-day window.</p>

          <h2>2. Conditions &amp; Deductions During the 14-Day Period</h2>
          <p>Refunds within the 14-day period may be reduced or denied if any of the following have occurred:</p>
          <ul>
            <li>The platform has been substantially accessed or used, including but not limited to:
              <ul>
                <li>Activation of AI systems</li>
                <li>Deployment of automations, workflows, or campaigns</li>
                <li>Use of proprietary tools, templates, or configurations</li>
                <li>Live integrations or production environments being enabled</li>
              </ul>
            </li>
            <li>Custom setup, onboarding, or configuration work has been completed</li>
            <li>The customer expressly requested immediate access or performance</li>
          </ul>
          <p>Where services have already been delivered during the 14-day period, Cima reserves the right to issue a partial refund, deducting the reasonable value of services rendered.</p>

          <h2>3. Setup Fees</h2>
          <p>Setup fees cover immediate services including:</p>
          <ul>
            <li>System provisioning</li>
            <li>Platform and account configuration</li>
            <li>AI initialization and customization</li>
            <li>Onboarding preparation and internal resource allocation</li>
          </ul>
          <p>Because setup work begins immediately after purchase, setup fees are non-refundable once work has commenced, even if a cancellation occurs within the 14-day period.</p>

          <h2>4. After the 14-Day Period</h2>
          <p>Once fourteen (14) days have passed from the initial purchase date:</p>
          <ul>
            <li>All payments are final and non-refundable</li>
            <li>No refunds will be issued for:
              <ul>
                <li>Partial billing periods</li>
                <li>Unused subscription time</li>
                <li>Early cancellation</li>
                <li>Failure to use or fully implement the platform</li>
              </ul>
            </li>
          </ul>
          <p>Canceling a subscription after the 14-day period will prevent future billing but does not entitle the customer to a refund of past charges.</p>

          <h2>5. Performance-Based Services</h2>
          <p>Any performance-based fees, usage-based charges, or outcome-dependent services are non-refundable once incurred.</p>
          <p>Results may vary due to factors outside Cima's control, including market conditions, ad spend, lead quality, responsiveness, compliance requirements, and operational capacity.</p>

          <h2>6. Chargebacks &amp; Payment Disputes</h2>
          <p>Customers agree to contact Cima Growth Solutions first to resolve billing concerns before initiating a chargeback or payment dispute.</p>
          <p>Unauthorized chargebacks may result in:</p>
          <ul>
            <li>Immediate suspension or termination of services</li>
            <li>Loss of platform access</li>
          </ul>

          <h2>7. Exceptions</h2>
          <p>Refunds outside of this policy may be issued solely at Cima's discretion in limited circumstances such as:</p>
          <ul>
            <li>Duplicate charges</li>
            <li>Billing errors caused by Cima</li>
            <li>Legal or regulatory requirements</li>
          </ul>

          <h2>8. Policy Updates</h2>
          <p>Cima Growth Solutions reserves the right to modify this Refund Policy at any time. Updates will apply to purchases made after the effective date of the change.</p>

          <h2>9. Contact</h2>
          <p>
            For refund requests or billing questions, contact:<br />
            Cima Growth Solutions<br />
            Email: support@cimagrowth.com<br />
            Website: <a href="https://www.cimagrowth.com">https://www.cimagrowth.com</a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
