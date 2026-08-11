'use client';

import Link from "next/link";

const TermsOfService = () => {
  return (
    <>
      <div className="container-wide px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-[340] tracking-tight mb-2">Website Terms of Use</h1>
          <p className="text-muted-foreground text-lg mb-8">Cima Growth Solutions, LLC</p>

          <p>
            These Website Terms of Use ("Terms") govern your access to and use of cimagrowth.com and its subpages (the "Site"), operated by Cima Growth Solutions, LLC, a Pennsylvania limited liability company ("Company," "Cima," "we," "us," or "our").
          </p>

          <p className="font-semibold">
            These terms govern your use of this website only. They are not a contract for GrowthOS platform services. Access to GrowthOS is granted solely under a signed GrowthOS Platform Services Agreement. Where these website terms conflict with a signed Agreement, the signed Agreement controls in full.
          </p>

          <h2>1. Acceptance</h2>
          <p>
            By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site. These Terms apply to all visitors and users of the Site.
          </p>

          <h2>2. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Changes are effective when posted to this page. Your continued use of the Site after changes are posted means you accept the updated Terms.
          </p>

          <h2>3. Acceptable Use of the Site</h2>
          <p>When using the Site, you agree that you will not:</p>
          <ul>
            <li>Use the Site for any unlawful purpose or in violation of any applicable law or regulation;</li>
            <li>Attempt to gain unauthorized access to the Site, its servers, or any connected systems or networks;</li>
            <li>Interfere with, disrupt, or place an unreasonable load on the Site or its infrastructure;</li>
            <li>Circumvent, disable, or interfere with security, authentication, rate-limiting, or access-control features of the Site;</li>
            <li>Scrape, harvest, or extract data from the Site by automated means except as expressly permitted;</li>
            <li>Introduce any virus, malware, or other harmful code to the Site; or</li>
            <li>Infringe the intellectual property, privacy, or other rights of Cima or any third party.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            The Site and its contents, including text, graphics, logos, images, page layouts, and software, are owned by or licensed to Cima and are protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to access and view the Site for your own informational purposes. You may not copy, reproduce, republish, distribute, or create derivative works from Site content without our prior written permission.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or resources. We provide these links for convenience only and do not endorse and are not responsible for the content, products, or practices of any third-party site. Accessing third-party sites is at your own risk and subject to their terms.
          </p>

          <h2>6. No Professional Advice</h2>
          <p>
            Content on the Site is provided for general informational purposes only. It is not medical, legal, financial, or other professional advice, and it should not be relied on as a substitute for advice from a qualified professional. You are responsible for evaluating the information on the Site before relying on it.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p className="uppercase">
            The Site and its content are provided "as is" and "as available." To the maximum extent permitted by law, Company disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, secure, or free of harmful components, or that any information on the Site is accurate, complete, or current.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Commonwealth of Pennsylvania, without regard to its conflict-of-laws rules.
          </p>

          <h2>9. Related Policies</h2>
          <p>
            Your use of the Site is also subject to our{" "}
            <Link href="/privacy">Privacy Policy</Link> and our{" "}
            <Link href="/refund-policy">Refund Policy</Link>.
          </p>

          <h2>10. Contact</h2>
          <p>
            Cima Growth Solutions, LLC<br />
            Email: brandon@cimagrowth.com
          </p>
        </article>
      </div>
    </>
  );
};

export default TermsOfService;
