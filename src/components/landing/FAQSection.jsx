import { motion } from "framer-motion";
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
    a: "An intelligent hardware-and-software platform that connects to real energy infrastructure — solar, wind, hydro and other renewable generation, batteries, inverters, meters and the grid — to collect, process, validate and digitally record energy information. ZEV Lite is a working proof of concept; ZEV Pro is the industrial platform in development.",
  },
  {
    q: "What has actually been demonstrated?",
    a: "The ZEV Lite proof of concept: physical energy measurement with an ESP32-based controller and energy-meter integration, energy-data processing, SHA-256 hashing, timestamping, anchoring on BNB Smart Chain and a dashboard. Everything labelled Planned or In Development on this site is not built yet, and we say so on every capability.",
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card overflow-hidden border-border/50 px-8"
              >
                <AccordionTrigger className="py-5 text-left font-body text-[15px] font-semibold text-foreground hover:no-underline hover:text-primary sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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
