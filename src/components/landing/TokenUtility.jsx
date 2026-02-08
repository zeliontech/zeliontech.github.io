import { motion } from "framer-motion";
import { Zap, Vote, Shield, Server } from "lucide-react";

const utilities = [
  {
    icon: Zap,
    title: "Validator Coordination",
    description: "Participation in validator coordination mechanisms to support network integrity and infrastructure alignment.",
  },
  {
    icon: Server,
    title: "Infrastructure Services",
    description: "Access to ecosystem-level infrastructure services and validated data feeds for institutional integration.",
  },
  {
    icon: Shield,
    title: "Ecosystem Alignment",
    description: "Alignment of long-term contributors and ecosystem participants through coordinated incentive structures.",
  },
  {
    icon: Vote,
    title: "Governance Signaling",
    description: "Governance signaling for protocol-level decisions. The token does not represent equity, ownership, or profit-sharing.",
  },
];

const TokenUtility = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-subtle">
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
            Token Utility
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="metal-gradient">$ZLN</span> Utility Token
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:text-base">
            $ZLN is a utility and coordination token used for:
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 sm:grid-cols-2">
          {utilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-8 lg:p-10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                <item.icon className="h-5 w-5 text-silver-light" />
              </div>
              <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenUtility;
