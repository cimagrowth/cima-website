'use client';

import Hero from "@/components/home/Hero";
import EmployeeNotChatbot from "@/components/home/EmployeeNotChatbot";
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
import HomepageOSCallout from "@/components/home/HomepageOSCallout";

const Index = () => {
  return (
    <>
      <Hero />
      <EmployeeNotChatbot />
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
      <HomepageOSCallout />
    </>
  );
};

export default Index;
