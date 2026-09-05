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
    q: "What is ZelionTech?",
    a: "ZelionTech is an energy-technology company developing ZEV, the Zelion Energy Validator: hardware and software that measure renewable-energy activity at the equipment, validate it on the device and anchor a verifiable record on a public blockchain. ZLN, the ecosystem token, is the digital utility layer around that infrastructure — not the other way round.",
  },
  {
    q: "What is ZEV?",
    a: "An intelligent hardware-and-software platform that connects to real energy infrastructure — solar, wind, hydro and other renewable generation, batteries, inverters, meters and the grid — to collect, process, validate and digitally record energy information. ZEV Lite is a working proof of concept; ZEV Pro is the industrial platform in development.",
  },
  {
    q: "What has actually been demonstrated?",
    a: "The ZEV Lite proof of concept: physical energy measurement with an ESP32-based controller and energy-meter integration, energy-data processing, SHA-256 hashing, timestamping, anchoring on BNB Smart Chain and a dashboard. Everything labelled Planned or In Development on this site is not built yet, and we say so on every capability.",
  },
  {
    q: "What goes on the blockchain?",
    a: "A hash of each validated record, a timestamp and the transaction reference. The raw measurements and equipment telemetry stay off-chain. The chain is used as an integrity and verification layer, not as a database — anyone holding the original record can recompute its hash and compare it with the on-chain value.",
  },
  {
    q: "What is ZLN and what does it do?",
    a: "ZLN is the blockchain-based digital asset of the ZelionTech ecosystem on BNB Smart Chain: 500,000,000 maximum supply, 18 decimals, 0% transaction tax, no additional minting. It is designed to support participation and economic interactions within the ecosystem as those utilities are deployed. It is a utility token — not equity, not ownership, not a share of revenue.",
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
    <section id="faq" className="relative scroll-mt-16 section section-bg-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="eyebrow">
            FAQ
          </p>
          <h2 className="headline mt-4">
            Frequently Asked{" "}
            <span className="metal-gradient">Questions</span>
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
