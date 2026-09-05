import ZevProcess from "@/components/zev/ZevProcess";
import PillarCards from "@/components/zev/PillarCards";
import WhyValidate from "@/components/zev/WhyValidate";
import ZevStack from "@/components/zev/ZevStack";
import ZevRoadmap from "@/components/zev/ZevRoadmap";
import SceneBand from "@/components/zev/SceneBand";
import WhatToRemember from "@/components/zev/WhatToRemember";
import TeamSection from "@/components/landing/TeamSection";
import FAQSection from "@/components/landing/FAQSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/Footer";

/**
 * Everything on the homepage below the first viewport, imported statically by
 * Index.jsx. It is kept in one module so the sections mount together with the
 * hero: hash links such as /#how-zev-works rely on their targets existing when
 * ScrollToTop looks for them, which a lazily loaded chunk could not promise.
 *
 * The page is a story, not an index. It runs: how the machine works, the
 * three pillars, why validation belongs at the source (with the four proof
 * points), the ZEV and ZLN stack (with the token teaser), the roadmap, the
 * one-sentence takeaway, the people, four questions, contact. Digital
 * utilities and use cases live on the ZEV page; the full token detail lives
 * on Tokenomics; the legal line lives in the footer and on the Legal page.
 */
const IndexBelowFold = () => {
  return (
    <>
      <ZevProcess />
      <PillarCards />
      <WhyValidate />
      <ZevStack />
      <ZevRoadmap />
      <SceneBand />
      <WhatToRemember />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default IndexBelowFold;
