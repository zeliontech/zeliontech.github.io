import Navbar from "@/components/Navbar";
import ZevHero from "@/components/zev/ZevHero";
import TrustStrip from "@/components/zev/TrustStrip";
import { MaturityLegend } from "@/components/zev/MaturityBadge";
import IndexBelowFold from "./IndexBelowFold";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ZevHero />
      <TrustStrip />
      <div className="container mx-auto px-4 pb-4 lg:px-8">
        <MaturityLegend />
      </div>
      <IndexBelowFold />
    </div>
  );
};

export default Index;
