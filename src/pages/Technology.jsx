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
      "The validation layer performs deterministic processing and cryptographic verification of infrastructure data before ecosystem coordination.",
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
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "900px",
              height: "500px",
              background:
                "radial-gradient(ellipse at center, rgba(0,153,214,0.10) 0%, rgba(0,153,214,0.04) 45%, transparent 70%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 label-rule-r" />
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
                  Technology Architecture
                </span>
                <div className="h-px w-12 label-rule-l" />
              </div>
              <h1
                className="font-heading font-black navy-gradient-text tracking-tight mb-6"
                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
              >
                Infrastructure for Verifiable Energy Data
              </h1>
              <p className="mx-auto max-w-2xl font-kanit font-light text-lg leading-[1.85] text-slate-900/60">
                Zelion is an infrastructure-first system enabling deterministic energy data validation through hardware verification and blockchain coordination.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-6 font-heading font-black navy-gradient-text text-3xl sm:text-4xl tracking-tight">
                Three-Layer Infrastructure
                <br />
                <span className="gradient-text">Architecture</span>
              </h2>
              <p className="mb-8 font-kanit font-light text-base leading-[1.85] text-slate-900/60">
                Zelion operates across three interoperable layers:
              </p>
              <div className="relative mx-auto max-w-xl bg-white rounded-2xl p-6 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-3 font-kanit text-sm text-slate-900/80">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Physical infrastructure hardware
                  </li>
                  <li className="flex items-center gap-3 font-kanit text-sm text-slate-900/80">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Deterministic validation processing
                  </li>
                  <li className="flex items-center gap-3 font-kanit text-sm text-slate-900/80">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Blockchain coordination
                  </li>
                </ul>
                <p className="mt-6 font-kanit font-light text-xs text-slate-900/50">
                  Each layer operates independently while maintaining system interoperability.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Layers */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            {techLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="relative bg-white rounded-2xl border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="border-b border-primary/10 p-6 lg:p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <layer.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest text-primary/70">
                          Layer {index + 1}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-slate-900">
                          {layer.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <p className="mb-6 font-kanit font-light text-sm leading-[1.85] text-slate-900/60">
                      {layer.description}
                    </p>
                    <div className="mb-6 rounded-xl border border-primary/10 bg-primary/[0.03] p-6">
                      <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-900/70">
                        {index === 0 ? "These devices are designed to:" : "Functions include:"}
                      </h4>
                      <ul className="space-y-3">
                        {layer.capabilities.map((capability) => (
                          <li key={capability} className="flex items-start gap-3 font-kanit font-light text-sm text-slate-900/60">
                            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="font-kanit font-light text-xs text-slate-900/50">
                      {layer.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hardware Validation Philosophy */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-8 font-heading font-black navy-gradient-text text-3xl sm:text-4xl tracking-tight">
                Validation at the
                <br />
                <span className="gradient-text">Infrastructure Edge</span>
              </h2>
              <div className="relative bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <p className="font-kanit font-light text-base leading-[1.85] text-slate-900/60">
                  Validating data before it enters digital systems reduces attack risk and improves infrastructure reliability.
                </p>
                <p className="mt-4 font-kanit font-light text-sm text-slate-900/50">
                  This design supports industrial-scale deployment and infrastructure-level reliability.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-8 font-heading font-black navy-gradient-text text-3xl sm:text-4xl tracking-tight">
                Core Infrastructure
                <br />
                <span className="gradient-text">Principles</span>
              </h2>
              <div className="relative bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
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
                      <span className="font-kanit text-base text-slate-900/80">{principle}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 font-kanit font-light text-xs text-slate-900/50">
                  These principles guide system architecture and governance evolution.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
