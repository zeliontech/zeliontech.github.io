import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import KeywordMarquee from "@/components/landing/KeywordMarquee";
import TokenomicsSnapshot from "@/components/landing/TokenomicsSnapshot";
import Roadmap from "@/components/landing/Roadmap";
import TeamSection from "@/components/landing/TeamSection";
import ContactSection from "@/components/landing/ContactSection";
import CommunitySection from "@/components/landing/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <KeywordMarquee />
      <TokenomicsSnapshot />
      <Roadmap />
      <TeamSection />
      <ContactSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
