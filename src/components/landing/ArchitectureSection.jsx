import { motion } from "framer-motion";
import { Cpu, Shield, Link as LinkIcon } from "lucide-react";

const layers = [
  {
    icon: Cpu,
    name: "Physical Layer",
    tag: "Hardware",
    description:
      "On-site validator devices measure and verify energy production data at the source. Tamper-resistant hardware ensures data integrity from point of origin.",
    color: "text-primary",
  },
  {
    icon: Shield,
    name: "Validation Layer",
    tag: "Verification",
    description:
      "Deterministic validation protocols cross-reference hardware data against network consensus. Multi-node verification eliminates single points of failure.",
    color: "text-silver-mid",
  },
  {
    icon: LinkIcon,
    name: "Blockchain Coordination Layer",
    tag: "Settlement",
    description:
      "Immutable on-chain records of validated data. Smart contract automation for token distribution, governance, and transparent energy data coordination.",
    color: "text-foreground",
  },
];

const ArchitectureSection = () => {
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
            Architecture
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Three-Layer
            <br />
            <span className="metal-gradient">Validation Stack</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover relative overflow-hidden p-6 lg:p-8"
            >
              {/* Layer number */}
              <div className="absolute right-6 top-6 font-heading text-5xl font-bold text-muted/50 lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                  <layer.icon className={`h-6 w-6 ${layer.color}`} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {layer.name}
                    </h3>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      {layer.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {layer.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < layers.length - 1 && (
                <div className="absolute -bottom-6 left-10 h-6 w-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
