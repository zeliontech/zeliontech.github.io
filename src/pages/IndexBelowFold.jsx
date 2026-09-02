import ZevKeyAnimation from "@/components/zev/ZevKeyAnimation";
import WhyValidate from "@/components/zev/WhyValidate";
import ZevStack from "@/components/zev/ZevStack";
import ZlnLayer from "@/components/zev/ZlnLayer";
import ZevRoadmap from "@/components/zev/ZevRoadmap";
import TeamSection from "@/components/landing/TeamSection";
import FAQSection from "@/components/landing/FAQSection";
import LegalNotice from "@/components/landing/LegalNotice";
import ContactSection from "@/components/landing/ContactSection";
import CommunitySection from "@/components/landing/CommunitySection";
import Footer from "@/components/Footer";

/**
 * Everything on the homepage below the first viewport. Split into its own
 * chunk and mounted by Index.jsx through Suspense so first paint only has to
 * build the hero. The chunk request starts during the first render, so the
 * content mounts a tick later, not on scroll.
 *
 * Order follows the ZEV brief: the flagship animation, why validation at the
 * source matters, the ZEV + ZLN stack, then the token, roadmap, team and the
 * closing sections. The waitlist section (NotifyLaunchSection) stays out of
 * this graph on purpose: importing it alone pulls the Firebase SDK in.
 */
const IndexBelowFold = () => {
  return (
    <>
      <ZevKeyAnimation />
      <WhyValidate />
      <ZevStack />
      <ZlnLayer />
      <ZevRoadmap />
      <TeamSection />
      <FAQSection />
      <LegalNotice />
      <ContactSection />
      <CommunitySection />
      <Footer />
    </>
  );
};

export default IndexBelowFold;
