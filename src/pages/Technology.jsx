import { motion } from "framer-motion";
import { Cpu, Shield, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const principles = [
  "Infrastructure before token",
  "Deterministic processing over probabilistic consensus",
  "Long-term deployment over short-term incentives",
];

const techLayers = [
  {
    icon: Cpu,
    title: "Physical Infrastructure Layer",
    description:
      "The physical layer consists of energy-related hardware and validation devices operating at the infrastructure edge.",
    capabilities: [
      "Capture real-world energy-related data",
      "Perform local data integrity validation",
      "Reduce manipulation risk at the source",
    ],
    note: "This approach aligns with industrial and infrastructure-grade system requirements.",
  },
  {
    icon: Shield,
    title: "Deterministic Validation Processing",
    description:
      "The validation layer performs deterministic processing and cryptographic verification of infrastructure data.",
    capabilities: [
      "Data integrity verification",
      "Deterministic validation processing",
      "Cryptographic verification of validated data",
    ],
    note: "This layer ensures data reliability before it enters ecosystem-level coordination systems.",
  },
  {
    icon: LinkIcon,
    title: "Blockchain Coordination Layer",
    description:
      "Blockchain is used for validator coordination, infrastructure alignment, and ecosystem transparency.",
    capabilities: [
      "Validator coordination",
      "Infrastructure alignment",
      "Ecosystem transparency",
    ],
    note: "Blockchain does not control physical infrastructure systems. It records validated outcomes produced by infrastructure-level validation processes.",
  },
];

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
                Technology Architecture
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Infrastructure-First
                <br />
                <span className="metal-gradient">Validation Architecture</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                Zelion is designed as an infrastructure-first system focused on deterministic energy data validation through hardware-anchored verification and blockchain coordination.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground">
                Three-Layer Infrastructure
                <br />
                <span className="metal-gradient">Architecture</span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                The Zelion system is structured across three independent but interoperable layers:
              </p>
              <div className="glass-card mx-auto max-w-xl p-6">
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-3 text-sm text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Physical Infrastructure Layer
                  </li>
                  <li className="flex items-center gap-3 text-sm text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Validation Processing Layer
                  </li>
                  <li className="flex items-center gap-3 text-sm text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Blockchain Coordination Layer
                  </li>
                </ul>
                <p className="mt-6 text-xs text-muted-foreground">
                  Each layer operates independently while maintaining system interoperability and long-term deployment flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Layers */}
        <section className="pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-12">
              {techLayers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="glass-card overflow-hidden">
                    <div className="border-b border-border/50 p-6 lg:p-8">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-muted">
                          <layer.icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-medium tracking-wider text-primary uppercase">
                            Layer {index + 1}
                          </div>
                          <h3 className="font-heading text-xl font-bold text-foreground">
                            {layer.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 lg:p-8">
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {layer.description}
                      </p>
                      <div className="mb-6 rounded-lg border border-border/50 bg-muted/30 p-6">
                        <h4 className="mb-4 text-xs font-medium tracking-wider text-foreground uppercase">
                          {index === 0 ? "These devices are designed to:" : "Functions include:"}
                        </h4>
                        <ul className="space-y-3">
                          {layer.capabilities.map((capability) => (
                            <li key={capability} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {layer.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware Validation Philosophy */}
        <section className="bg-muted/20 py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground">
                Validation at the
                <br />
                <span className="metal-gradient">Infrastructure Edge</span>
              </h2>
              <div className="glass-card p-8">
                <p className="text-base leading-relaxed text-muted-foreground">
                  By validating infrastructure data before it enters digital systems, Zelion reduces potential attack surfaces and false reporting risks.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  This design supports industrial-scale deployment and infrastructure-level reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground">
                Core Infrastructure
                <br />
                <span className="metal-gradient">Principles</span>
              </h2>
              <div className="glass-card p-8">
                <ul className="space-y-4 text-left">
                  {principles.map((principle, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-base text-foreground">{principle}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground">
                  These principles guide system architecture and governance evolution.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
