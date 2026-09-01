import Navbar from "@/components/Navbar";
import ZevHero from "@/components/zev/ZevHero";
import TrustStrip from "@/components/zev/TrustStrip";
import { MaturityLegend } from "@/components/zev/MaturityBadge";
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
import NotifyLaunchSection from "@/components/landing/NotifyLaunchSection";
import ContactSection from "@/components/landing/ContactSection";
import TeamSection from "@/components/landing/TeamSection";
import CommunitySection from "@/components/landing/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ZevHero />
      <TrustStrip />
      <div className="container mx-auto px-4 pb-4 lg:px-8">
        <MaturityLegend />
      </div>
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
      <TeamSection />
      <FAQSection />
      <LegalNotice />
      {/* <NotifyLaunchSection /> */}
      <ContactSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
