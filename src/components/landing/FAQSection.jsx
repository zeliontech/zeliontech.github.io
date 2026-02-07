import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Zelion?",
    a: "Zelion is a DePIN (Decentralized Physical Infrastructure Network) protocol that uses hardware validators to verify energy production data. The network provides deterministic, tamper-proof energy validation through a three-layer architecture.",
  },
  {
    q: "What does the $ZLN token do?",
    a: "$ZLN is a utility token used for validator staking, governance participation, data access fees, and network incentive distribution. It is not a financial product or investment vehicle.",
  },
  {
    q: "How do hardware validators work?",
    a: "Zelion validators are purpose-built devices deployed at energy production sites. They measure energy data, cryptographically sign it, and submit it to the validation layer for cross-referencing with network consensus.",
  },
  {
    q: "How do I buy $ZLN tokens?",
    a: "You can purchase $ZLN tokens by connecting a compatible Web3 wallet and using the purchase flow on our platform. Visit the 'How to Buy' page for step-by-step instructions.",
  },
  {
    q: "Is Zelion an investment?",
    a: "No. Zelion is infrastructure technology. $ZLN is a utility token designed to power the validation network. It should not be treated as a financial product, security, or investment vehicle.",
  },
  {
    q: "What blockchain does Zelion use?",
    a: "Zelion's blockchain coordination layer is designed to be chain-agnostic, with initial deployment focused on high-throughput, low-cost networks optimized for data-intensive operations.",
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
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
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card overflow-hidden border-border/50 px-6"
              >
                <AccordionTrigger className="py-5 text-left font-heading text-sm font-medium text-foreground hover:no-underline hover:text-primary sm:text-base">
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
