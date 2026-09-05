import Navbar from "@/components/Navbar";
import ZevHero from "@/components/zev/ZevHero";
import IndexBelowFold from "./IndexBelowFold";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main">
        <ZevHero />
        <IndexBelowFold />
      </main>
    </div>
  );
};

export default Index;
