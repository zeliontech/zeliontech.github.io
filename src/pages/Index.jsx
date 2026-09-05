import Navbar from "@/components/Navbar";
import usePageMeta from "@/hooks/usePageMeta";
import ZevHero from "@/components/zev/ZevHero";
import IndexBelowFold from "./IndexBelowFold";

const Index = () => {
  usePageMeta({
    title: "ZelionTech | From physical energy to proof",
    description:
      "ZelionTech is developing ZEV, an energy-validation device that reads renewable energy where it is produced, validates it on the device and records the proof on blockchain.",
    path: "/",
  });

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
