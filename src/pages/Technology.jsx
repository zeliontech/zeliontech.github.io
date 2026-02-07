import { motion } from "framer-motion";
import { Cpu, Shield, Link as LinkIcon, Server, Wifi, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const techLayers = [
  {
    icon: Cpu,
    title: "Physical Layer",
    subtitle: "Hardware Validators",
    description:
      "Purpose-built validation hardware deployed at energy production facilities. Each unit contains ARM-based processors, multi-input energy sensors, and tamper-resistant enclosures with cryptographic attestation modules.",
    specs: [
      "ARM Cortex-A processor",
      "Multi-protocol connectivity (LoRa, WiFi, LTE)",
      "Tamper-evident sealed enclosure",
      "Real-time energy measurement array",
      "Secure element for key storage",
    ],
  },
  {
    icon: Shield,
    title: "Validation Layer",
    subtitle: "Deterministic Verification",
    description:
      "A distributed validation network that cross-references hardware-signed energy data against consensus rules. Multi-node verification ensures no single point of failure can compromise data integrity.",
    specs: [
      "Byzantine fault tolerant consensus",
      "Cryptographic data attestation",
      "Multi-node cross-verification",
      "Real-time anomaly detection",
      "Slashing conditions for malicious behavior",
    ],
  },
  {
    icon: LinkIcon,
    title: "Blockchain Coordination Layer",
    subtitle: "On-Chain Settlement",
    description:
      "Immutable on-chain records of all validated energy data. Smart contracts automate token distribution, governance execution, and transparent data coordination across the network.",
    specs: [
      "Immutable data records",
      "Smart contract automation",
      "On-chain governance",
      "Cross-chain interoperability",
      "Public audit trails",
    ],
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
                Technology
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Enterprise-Grade
                <br />
                <span className="metal-gradient">Validation Architecture</span>
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A deep dive into Zelion's three-layer infrastructure stack designed for
                deterministic energy data validation at scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tech Layers */}
        <section className="pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-16">
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
                          <h2 className="font-heading text-2xl font-bold text-foreground">
                            {layer.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
                      <div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {layer.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                          Specifications
                        </h4>
                        <ul className="space-y-2">
                          {layer.specs.map((spec) => (
                            <li key={spec} className="flex items-center gap-2 text-sm text-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
