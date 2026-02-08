import { motion } from "framer-motion";
import { Users, Eye, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Technical Integrity",
    description:
      "Infrastructure reliability and hardware-level validation ensure system integrity across all deployment environments.",
  },
  {
    icon: Eye,
    title: "Infrastructure Reliability",
    description:
      "Long-term operational stability prioritized over rapid expansion. Systems designed for resilient, deterministic performance.",
  },
  {
    icon: Users,
    title: "Long-Term Ecosystem Alignment",
    description:
      "Governance evolves gradually and remains subordinate to infrastructure stability. Protocol decisions align with long-term sustainability.",
  },
];

const TrustGovernance = () => {
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
            Governance
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Governance{" "}
            <span className="metal-gradient">Principles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Zelion governance prioritizes:
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover p-8 text-center lg:p-10"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
                <pillar.icon className="h-6 w-6 text-silver-light" />
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
