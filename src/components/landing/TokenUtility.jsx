import { motion } from "framer-motion";
import { Zap, Vote, Shield, Server } from "lucide-react";

const utilities = [
  {
    icon: Zap,
    title: "Validation Rewards",
    description: "Node operators earn $ZLN for providing deterministic energy data validation through hardware-verified infrastructure.",
  },
  {
    icon: Vote,
    title: "Governance",
    description: "Token holders participate in protocol governance, including network upgrades, parameter adjustments, and validator policies.",
  },
  {
    icon: Shield,
    title: "Staking Security",
    description: "Validators stake $ZLN as collateral to ensure honest data reporting. Slashing mechanisms protect network integrity.",
  },
  {
    icon: Server,
    title: "Data Access",
    description: "Institutions use $ZLN to access verified energy data feeds, enabling trust-minimized decision making across energy markets.",
  },
];

const TokenUtility = () => {
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
            Token Utility
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="metal-gradient">$ZLN</span> Utility Token
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground lg:text-base">
            $ZLN is a utility token that powers the Zelion validation network.
            It is not a financial product or investment vehicle.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {utilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 lg:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                <item.icon className="h-5 w-5 text-primary" />
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
