import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import Problem from "@/components/home/Problem";
import Solution from "@/components/home/Solution";
import IntegrationFlexibility from "@/components/home/IntegrationFlexibility";
import HowItWorks from "@/components/home/HowItWorks";
import Authority from "@/components/home/Authority";
import UseCases from "@/components/home/UseCases";
import AIStudio from "@/components/home/AIStudio";
import FounderLetter from "@/components/home/FounderLetter";
import FinalCTA from "@/components/home/FinalCTA";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from "@/components/seo/schemas";

const Index = () => {
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareSchema(),
  ];

  return (
    <Layout>
      <SEO
        title="GrowthOS – AI Patient Engagement Platform for Healthcare Clinics"
        description="Stop patient leakage with GrowthOS. AI-powered patient engagement that responds instantly across web, phone, text, email & social media. Built for fertility clinics, med spas, wellness centers & regenerative medicine. Live in 24-48 hours."
        keywords={[
          "patient engagement software",
          "healthcare CRM",
          "AI patient communication",
          "fertility clinic software",
          "med spa CRM",
          "wellness center management",
          "regenerative medicine software",
          "patient follow-up automation",
          "healthcare lead nurturing",
          "patient leakage prevention",
          "clinic growth software",
          "medical practice AI",
          "automated patient response",
          "healthcare marketing automation",
        ]}
        canonical="https://cimagrowth.com"
      />
      <JsonLd schema={schemas} />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <IntegrationFlexibility />
      <HowItWorks />
      <Authority />
      <UseCases />
      <AIStudio />
      <FounderLetter />
      <FinalCTA />
    </Layout>
  );
};

export default Index;