import WhatIsZelion from "@/components/landing/WhatIsZelion";
import ZevStack from "@/components/zev/ZevStack";
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
import TeamSection from "@/components/landing/TeamSection";
import FAQSection from "@/components/landing/FAQSection";
import LegalNotice from "@/components/landing/LegalNotice";
// NotifyLaunchSection is intentionally not imported while its render stays
// commented out: the import alone pulls the Firebase SDK into this chunk.
import ContactSection from "@/components/landing/ContactSection";
import CommunitySection from "@/components/landing/CommunitySection";
import Footer from "@/components/Footer";

/**
 * Everything on the homepage below the first viewport. Split into its own
 * chunk and mounted by Index.jsx through Suspense so first paint only has to
 * build the hero — rendering all twenty sections up front was the dominant
 * cost in the mobile performance budget. The chunk request starts during the
 * first render, so the content mounts a tick later, not on scroll.
 */
const IndexBelowFold = () => {
  return (
    <>
      <WhatIsZelion />
      <ZevStack />
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
    </>
  );
};

export default IndexBelowFold;
