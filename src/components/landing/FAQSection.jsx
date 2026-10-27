import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ZEV-framed FAQ. Every answer stays inside the ZEV Lite proof-of-concept
// facts (brief §15) and the §24 wording rules: what ZEV does, what has
// actually been demonstrated, what ZLN is and is not, and no investment
// language.
export const faqs = [
  {
    q: "What is ZEV?",
    a: "An intelligent hardware-and-software platform that connects to real energy infrastructure — solar, wind, hydro and other renewable generation, batteries, inverters, meters and the grid — to collect, process, validate and digitally record energy information. There are two devices: ZEV Lite for connected energy systems, and ZEV Pro, which adds industrial computing powered by stored surplus energy. Both are in prototype development.",
  },
  {
    q: "What actually works today?",
    a: "The ZEV Lite proof of concept: physical energy measurement with an ESP32-based controller and energy-meter integration, energy-data processing, SHA-256 hashing, timestamping, anchoring on BNB Smart Chain and a dashboard. Patent applications have been filed for ZEV Lite and ZEV Pro. Everything labelled Upcoming or In Development on this site is not built yet, and we say so on every capability.",
  },
  {
    q: "How do ZEV operators earn ZLN?",
    a: "Through contribution rewards, now in development. A device records and signs energy data, eligible activity earns contribution points, and the points set each operator's share of a funded ZLN reward budget, which they claim to their own wallet. At least 98% of the energy must be verified as renewable. Rewards distribute existing ZLN rather than creating new tokens, and buying or holding ZLN alone does not earn them.",
  },
  {
    q: "Does ZEV generate carbon credits? Is ZLN a carbon credit?",
    a: "No, and no. ZEV is designed to provide trusted, traceable and auditable energy data that can support carbon accounting and MRV processes. Carbon-credit issuance requires an accepted methodology, project registration and independent validation under the applicable carbon standard. ZLN is the ecosystem token; a carbon credit is a separately verified environmental asset — they are not the same thing.",
  },
  {
    q: "Is ZelionTech an investment?",
    a: "No. ZelionTech is infrastructure technology under development. Nothing on this site is investment advice, and no promises are made about performance, adoption or token value. Participation in decentralized systems involves risk — please do your own research.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative scroll-mt-16 section-compact bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="eyebrow">
            FAQ
          </p>
          <h2 className="headline-standard mt-4">
            Questions <span className="metal-gradient">people ask</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          {/* Hairline rows, not cards: a plus that turns into a cross. */}
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger
                  className="gap-6 py-6 text-left font-body text-[17px] font-semibold text-foreground hover:no-underline hover:text-primary [&[data-state=open]>svg]:rotate-45"
                  icon={
                    <Plus
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  }
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
