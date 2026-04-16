'use client';

import Hero from "@/components/home/Hero";
import PositioningBand from "@/components/home/PositioningBand";
import PatientJourney from "@/components/home/PatientJourney";
import StackReplacement from "@/components/home/StackReplacement";
import SocialProof from "@/components/home/SocialProof";
import Problem from "@/components/home/Problem";
import Solution from "@/components/home/Solution";
import ValueStack from "@/components/home/ValueStack";
import HowItWorks from "@/components/home/HowItWorks";
import IntegrationFlexibility from "@/components/home/IntegrationFlexibility";
import FounderLetter from "@/components/home/FounderLetter";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <>
      <Hero />
      <PositioningBand />
      <PatientJourney />
      <StackReplacement />
      <Problem />
      <ValueStack />
      <SocialProof />
      <Solution />
      <HowItWorks />
      <IntegrationFlexibility />
      <FounderLetter />
      <FinalCTA />
    </>
  );
};

export default Index;
