import { motion } from "framer-motion";
import { Users, Eye, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Community Governance",
    description:
      "All protocol decisions pass through on-chain governance. $ZLN holders vote on upgrades, parameter changes, and resource allocation.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description:
      "Open-source validation logic, public audit trails, and real-time network telemetry. Every data point is verifiable on-chain.",
  },
  {
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Hardware-anchored trust model with cryptographic attestation. Slashing conditions ensure validator integrity across the network.",
  },
];

const TrustGovernance = () => {
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
            Trust & Governance
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Built on{" "}
            <span className="metal-gradient">Transparency</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover p-6 text-center lg:p-8"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustGovernance;
