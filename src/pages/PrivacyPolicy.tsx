import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/components/seo/schemas";

const PrivacyPolicy = () => {
  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://cimagrowth.com" },
        { name: "Privacy Policy" },
      ],
    }),
  ];

  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for the GrowthOS platform by Cima Growth Solutions. Covers data collection, HIPAA compliance, PHI handling, and patient data protection."
        keywords={["privacy policy", "HIPAA compliance", "healthcare data protection", "GrowthOS privacy"]}
        canonical="https://cimagrowth.com/privacy"
        ogImage="https://cimagrowth.com/og-privacy.png"
      />
      <JsonLd schema={schemas} />
      <div className="container-wide px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Healthcare Enterprise Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-8">Last Updated: January 2026</p>

          <p>
            Thank you for using the Cima Growth Solutions LLC platform, including our website, mobile applications, software, and related services (collectively, the "Services"). This Privacy Policy ("Policy") explains how Cima Growth Solutions LLC ("Cima," "Company," "we," "us," or "our") collects, uses, discloses, and safeguards information when providing a healthcare-focused SaaS platform.
          </p>
          <p>This Policy is designed to meet the expectations of healthcare organizations, enterprise buyers, and regulators.</p>
          <p>By accessing or using the Services, you acknowledge that you have read and understood this Policy.</p>

          <h2>1. Scope of This Policy</h2>
          <p>This Policy applies to information collected:</p>
          <ul>
            <li>Through www.cimagrowth.com and related domains</li>
            <li>Through Cima-branded mobile applications</li>
            <li>Through email, SMS, voice, and in-app communications</li>
            <li>Through forms, CRM workflows, AI-assisted tools, and integrations</li>
          </ul>
          <p>This Policy does not apply to third-party websites or services accessed through integrations or links. Their privacy practices are governed by their own policies.</p>

          <h2>2. Healthcare Data, PHI, and HIPAA</h2>
          <p>Cima is a technology platform provider and does not provide medical care or clinical services.</p>

          <h3>Business Associate Role</h3>
          <p>
            In certain configurations, the Services may process Protected Health Information (PHI) on behalf of healthcare providers ("Covered Entities") as defined under the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"). In those circumstances:
          </p>
          <ul>
            <li>Cima acts solely as a Business Associate</li>
            <li>Processing of PHI is governed by a separate Business Associate Agreement (BAA)</li>
            <li>PHI is used only to provide contracted services and for no other purpose</li>
          </ul>

          <h3>No BAA, No PHI</h3>
          <p>If a BAA is not in place, users must not submit PHI into the Services. Cima is not responsible for PHI submitted outside an executed BAA.</p>

          <h3>No PHI for Advertising or AI Training</h3>

          <h2>3. Information We Collect</h2>
          <h3>A. Information You Provide</h3>
          <ul>
            <li>Identifiers: Name, email, phone number, organization, job title, username</li>
            <li>Account Data: Login credentials, preferences, permissions</li>
            <li>Transaction Data: Billing details processed via PCI-compliant processors (e.g., Stripe)</li>
            <li>User Content: Data submitted through forms, CRM records, messages, and uploads</li>
            <li>Communications: Support requests, calls, emails, and chat records</li>
          </ul>

          <h3>B. Information Collected Automatically</h3>
          <ul>
            <li>Device &amp; Network Data: IP address, browser type, OS, device identifiers</li>
            <li>Usage Data: Pages viewed, features used, timestamps, interaction logs</li>
            <li>Cookies &amp; Similar Technologies: Cookies, pixels, SDKs, local storage</li>
            <li>Location Data: Approximate or precise location if enabled</li>
          </ul>

          <h3>C. Information from Third Parties</h3>
          <ul>
            <li>Advertising and analytics platforms (e.g., Google, Meta)</li>
            <li>Public or professional data sources</li>
            <li>Authorized integrations (e.g., Zapier, Twilio, Mailgun)</li>
          </ul>

          <h2>4. How We Use Information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Provide, operate, and maintain the Services</li>
            <li>Configure workflows and automations</li>
            <li>Process payments and provide support</li>
            <li>Communicate service-related and promotional messages</li>
            <li>Perform analytics, security monitoring, and fraud prevention</li>
            <li>Improve platform functionality</li>
          </ul>

          <h3>AI and Automated Tools</h3>
          <p>Certain features may use AI-assisted or automated processing to support messaging, workflow optimization, or analytics. These tools:</p>
          <ul>
            <li>Do not provide medical advice, diagnoses, or treatment recommendations</li>
            <li>Are configurable by the customer</li>
            <li>Operate under strict data access controls</li>
          </ul>

          <h2>5. Legal Bases for Processing (EEA/UK)</h2>
          <p>Where applicable, we process data based on:</p>
          <ul>
            <li>Consent</li>
            <li>Contractual necessity</li>
            <li>Legal obligations</li>
            <li>Legitimate interests, including platform security and improvement</li>
          </ul>

          <h2>6. Sharing and Disclosure</h2>
          <p>We may share information with:</p>
          <ul>
            <li>Service Providers &amp; Subprocessors: Hosting, communications, payments, analytics</li>
            <li>Affiliates: Under common ownership</li>
            <li>Legal Authorities: As required by law</li>
            <li>Business Transfers: Mergers, acquisitions, or asset sales</li>
            <li>With Consent: As directed by the customer</li>
          </ul>
          <p>Cima does not sell PHI, phone numbers, or SMS opt-in consent.</p>
          <p>A current list of subprocessors is available upon request.</p>

          <h2>7. Advertising &amp; Tracking</h2>
          <p>
            Cima may use standard analytics and advertising tools for its own marketing. Healthcare customer data and PHI are never used for advertising, retargeting, or audience modeling.
          </p>
          <p>Users may opt out of non-essential tracking via browser settings or industry opt-out tools.</p>

          <h2>8. Your Rights and Choices</h2>
          <p>Depending on jurisdiction, you may have rights to:</p>
          <ul>
            <li>Access, correct, or delete personal data</li>
            <li>Restrict or object to processing</li>
            <li>Opt out of targeted advertising or profiling</li>
          </ul>
          <p>Requests may be submitted using the contact information below.</p>

          <h2>9. U.S. State Privacy Rights</h2>
          <p>Cima honors applicable state privacy laws, including but not limited to:</p>
          <ul>
            <li>California (CCPA/CPRA)</li>
            <li>Virginia, Colorado, Connecticut, Utah</li>
            <li>Other U.S. states as laws come into effect</li>
          </ul>
          <p>Sensitive Personal Information is handled in accordance with applicable law.</p>

          <h2>10. Children's Privacy</h2>
          <p>The Services are not intended for children under 13 (or under 16 where required by law). We do not knowingly collect children's data.</p>

          <h2>11. Data Retention</h2>
          <p>Data is retained only as long as necessary for:</p>
          <ul>
            <li>Contractual obligations</li>
            <li>Legal compliance</li>
            <li>Security and dispute resolution</li>
          </ul>
          <p>When no longer required, data is securely deleted or anonymized.</p>

          <h2>12. Data Security</h2>
          <p>Cima maintains administrative, technical, and physical safeguards including encryption, access controls, and monitoring. No system is completely secure.</p>

          <h2>13. International Transfers</h2>
          <p>Data may be processed in the United States or other jurisdictions with appropriate safeguards.</p>

          <h2>14. Terms of Use</h2>
          <p>Use of the Services is subject to our <a href="/terms">Terms of Use</a>.</p>

          <h2>15. Contact Information</h2>
          <p>
            Cima Growth Solutions LLC<br />
            3467 Trexler Blvd<br />
            Allentown, PA 18104<br />
            Phone: +1-484-480-9296<br />
            Email: support@cimagrowth.com
          </p>

          <hr />

          <h2>Business Associate Agreement (BAA)</h2>
          <p>
            This Business Associate Agreement ("Agreement") is entered into by and between ("Business Associate") and the healthcare customer executing this Agreement ("Covered Entity"). This Agreement is effective as of the date it is executed by the parties.
          </p>

          <h3>1. Purpose</h3>
          <p>
            This Agreement is intended to comply with the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"), including the Privacy Rule, Security Rule, and HITECH Act, and governs the use and disclosure of Protected Health Information ("PHI") by Business Associate.
          </p>

          <h3>2. Definitions</h3>
          <p>All capitalized terms not defined herein have the meanings set forth in HIPAA.</p>

          <h3>3. Permitted Uses and Disclosures</h3>
          <p>Business Associate may use or disclose PHI solely to:</p>
          <ul>
            <li>Perform services for Covered Entity as defined in the applicable services agreement</li>
            <li>Support platform functionality, troubleshooting, and security</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>Business Associate shall not use PHI for advertising, marketing, or generalized AI training.</p>

          <h3>4. Safeguards</h3>
          <p>Business Associate shall:</p>
          <ul>
            <li>Implement administrative, technical, and physical safeguards</li>
            <li>Protect against unauthorized access, use, or disclosure</li>
            <li>Ensure workforce compliance with HIPAA obligations</li>
          </ul>

          <h3>5. Subcontractors</h3>
          <p>Business Associate shall ensure that any subcontractor that creates, receives, maintains, or transmits PHI agrees in writing to equivalent HIPAA protections.</p>

          <h3>6. Reporting</h3>
          <p>Business Associate shall report to Covered Entity:</p>
          <ul>
            <li>Any use or disclosure not permitted by this Agreement</li>
            <li>Any Security Incident or Breach of Unsecured PHI without unreasonable delay</li>
          </ul>

          <h3>7. Access and Amendment</h3>
          <p>To the extent required by HIPAA, Business Associate shall:</p>
          <ul>
            <li>Provide access to PHI</li>
            <li>Amend PHI</li>
            <li>Incorporate amendments as directed by Covered Entity</li>
          </ul>

          <h3>8. Accounting of Disclosures</h3>
          <p>Business Associate shall make information available as necessary to provide an accounting of disclosures.</p>

          <h3>9. Term and Termination</h3>
          <p>This Agreement remains in effect until terminated. Covered Entity may terminate for material breach if not cured within a reasonable time.</p>
          <p>Upon termination, Business Associate shall return or destroy PHI where feasible.</p>

          <h3>10. Compliance with HIPAA</h3>
          <p>Business Associate agrees to comply with applicable provisions of HIPAA and HITECH.</p>

          <h3>11. Indemnification</h3>
          <p>Each party shall be responsible for its own violations of HIPAA and applicable law.</p>

          <h3>12. Survival</h3>
          <p>The obligations relating to PHI survive termination of this Agreement.</p>

          <h3>13. Miscellaneous</h3>
          <p>This Agreement is governed by the laws specified in the underlying services agreement. This Agreement may be executed electronically.</p>
        </article>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
