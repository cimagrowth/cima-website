'use client';

const RefundPolicy = () => {
  return (
    <>
      <div className="container-wide px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-[340] tracking-tight mb-2">Refund Policy</h1>
          <p className="text-muted-foreground text-lg mb-8">Last updated: October 28, 2026</p>

          <p>
            This Refund Policy applies to GrowthOS subscriptions and add-ons purchased through our online checkout, where Paddle.com is the Merchant of Record. Subscriptions invoiced directly by Cima Growth Solutions, LLC ("Cima") under a signed GrowthOS Platform Services Agreement follow the refund terms in that agreement.
          </p>

          <h2>1. 14-day refund</h2>
          <p>
            If you are not satisfied, you can request a full refund within 14 days of your initial purchase, for any reason.
          </p>

          <h2>2. How to request a refund</h2>
          <p>
            Request a refund at <a href="https://paddle.net" target="_blank" rel="noopener">https://paddle.net</a>, or email <a href="mailto:support@cimagrowth.com">support@cimagrowth.com</a> and we will arrange it with Paddle.
          </p>
          <p>
            Approved refunds are returned to the original payment method, usually within 5 to 10 business days.
          </p>

          <h2>3. After 14 days</h2>
          <p>
            After the 14-day window, you can cancel at any time and you will not be charged again. Cancellation takes effect at the end of your current billing period. Charges already made for that period are not refunded, except where required by law or in the case of a duplicate charge or billing error.
          </p>

          <h2>4. Contact</h2>
          <p>
            Cima Growth Solutions, LLC<br />
            3467 Trexler Blvd, Allentown, PA 18104<br />
            <a href="mailto:support@cimagrowth.com">support@cimagrowth.com</a>
          </p>
        </article>
      </div>
    </>
  );
};

export default RefundPolicy;
