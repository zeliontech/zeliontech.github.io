import ZevProcess from "@/components/zev/ZevProcess";
import PillarCards from "@/components/zev/PillarCards";
import ValueStrip from "@/components/zev/ValueStrip";
import WhyValidate from "@/components/zev/WhyValidate";
import ZevStack from "@/components/zev/ZevStack";
import DigitalUtilities from "@/components/zev/DigitalUtilities";
import UseCases from "@/components/zev/UseCases";
import ZevRoadmap from "@/components/zev/ZevRoadmap";
import ZlnLayer from "@/components/zev/ZlnLayer";
import WhatToRemember from "@/components/zev/WhatToRemember";
import TeamSection from "@/components/landing/TeamSection";
import FAQSection from "@/components/landing/FAQSection";
import LegalNotice from "@/components/landing/LegalNotice";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/Footer";

/**
 * Everything on the homepage below the first viewport, imported statically by
 * Index.jsx. It is kept in one module so the sections mount together with the
 * hero: hash links such as /#how-zev-works rely on their targets existing when
 * ScrollToTop looks for them, which a lazily loaded chunk could not promise.
 *
 * Order follows the approved design reference for the opening sequence —
 * process strip, three pillar cards, value strip — and then continues into
 * the fuller ZEV story required by the brief.
 *
 * The waitlist section (NotifyLaunchSection) stays out of this graph on
 * purpose: importing it alone pulls in the Firebase SDK.
 */
const IndexBelowFold = () => {
  return (
    <>
      <ZevProcess />
      <PillarCards />
      <ValueStrip />
      <WhyValidate />
      <ZevStack />
      <DigitalUtilities />
      <UseCases />
      <ZevRoadmap />
      <ZlnLayer />
      <WhatToRemember />
      <TeamSection />
      <FAQSection />
      <LegalNotice />
      <ContactSection />
      <Footer />
    </>
  );
};

export default IndexBelowFold;
