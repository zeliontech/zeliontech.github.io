import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import WhatIsZelion from "@/components/landing/WhatIsZelion";
import InfrastructurePhilosophy from "@/components/landing/InfrastructurePhilosophy";
import ProblemSection from "@/components/landing/ProblemSection";
import VisionSection from "@/components/landing/VisionSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import HardwareSection from "@/components/landing/HardwareSection";
import BlockchainRole from "@/components/landing/BlockchainRole";
import TokenUtility from "@/components/landing/TokenUtility";
import TokenomicsSnapshot from "@/components/landing/TokenomicsSnapshot";
import EconomicSustainability from "@/components/landing/EconomicSustainability";
import Roadmap from "@/components/landing/Roadmap";
import TrustGovernance from "@/components/landing/TrustGovernance";
import TeamPhilosophy from "@/components/landing/TeamPhilosophy";
import FAQSection from "@/components/landing/FAQSection";
import LegalNotice from "@/components/landing/LegalNotice";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatIsZelion />
      <InfrastructurePhilosophy />
      <ProblemSection />
      <VisionSection />
      <ArchitectureSection />
      <HardwareSection />
      <BlockchainRole />
      <TokenUtility />
      <TokenomicsSnapshot />
      <EconomicSustainability />
      <Roadmap />
      <TrustGovernance />
      <TeamPhilosophy />
      <FAQSection />
      <LegalNotice />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
