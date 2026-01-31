import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import Problem from "@/components/home/Problem";
import Solution from "@/components/home/Solution";
import HowItWorks from "@/components/home/HowItWorks";
import Authority from "@/components/home/Authority";
import UseCases from "@/components/home/UseCases";
import AIStudio from "@/components/home/AIStudio";
import FounderLetter from "@/components/home/FounderLetter";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
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
