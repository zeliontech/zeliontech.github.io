import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is ZelionTech?",
    a: "ZelionTech is an infrastructure-first technology initiative focused on real-world energy validation, deterministic processing, and long-term system deployment. The network bridges physical energy systems, decentralized infrastructure, and blockchain-based coordination through verifiable data integrity and hardware-level validation mechanisms.",
  },
  {
    q: "Why infrastructure before token?",
    a: "Most blockchain projects begin with tokens and attempt to later attach utility. ZelionTech reverses this approach by beginning with infrastructure, hardware validation, and real-world system integration. The token exists only as a coordination and alignment layer within the ecosystem.",
  },
  {
    q: "What does the $ZLN token do?",
    a: "$ZLN is a utility and coordination instrument. Primary utilities include participation in validator coordination mechanisms, access to ecosystem-level infrastructure services, alignment of long-term contributors, and governance signaling for protocol-level decisions. The token does not represent equity, ownership, or profit-sharing.",
  },
  {
    q: "How does hardware validation work?",
    a: "ZelionTech integrates hardware-based validators designed to capture real-world energy-related data, perform local integrity verification, and prevent manipulation before data enters digital systems. By validating data at the physical source, ZelionTech reduces attack surfaces and improves data reliability.",
  },
  {
    q: "What is the role of blockchain in ZelionTech?",
    a: "In the ZelionTech ecosystem, blockchain is used for validator coordination, infrastructure alignment, and ecosystem transparency. Blockchain does not control physical infrastructure—it records validated outcomes produced by infrastructure-level processes, improving resilience and scalability.",
  },
  {
    q: "Is ZelionTech an investment?",
    a: "No. ZelionTech is infrastructure technology designed for long-term deployment, real-world infrastructure integration, and institutional compatibility. Participation in decentralized infrastructure systems involves risk, and no guarantees are made regarding performance, adoption, or outcomes. Users should conduct independent research before participating.",
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            FAQ
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
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
                <AccordionTrigger className="py-5 text-left font-heading text-sm font-medium text-foreground hover:no-underline hover:text-silver-light sm:text-base">
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
