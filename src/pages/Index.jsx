import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import HardwareSection from "@/components/landing/HardwareSection";
import TokenUtility from "@/components/landing/TokenUtility";
import TokenomicsSnapshot from "@/components/landing/TokenomicsSnapshot";
import Roadmap from "@/components/landing/Roadmap";
import TrustGovernance from "@/components/landing/TrustGovernance";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ArchitectureSection />
      <HardwareSection />
      <TokenUtility />
      <TokenomicsSnapshot />
      <Roadmap />
      <TrustGovernance />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
