import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  "Abstract",
  "Introduction",
  "Problem Statement",
  "Architecture Overview",
  "Physical Layer",
  "Validation Layer",
  "Blockchain Coordination",
  "Token Economics",
  "Governance Framework",
  "Roadmap",
  "Conclusion",
  "References",
];

const Whitepaper = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
                  Documentation
                </span>
                <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                  <span className="metal-gradient">Whitepaper</span>
                </h1>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                  A comprehensive technical overview of the Zelion protocol, architecture,
                  and token economics.
                </p>
                <a 
                  href="https://github.com/zeliontech/zelion-whitepaper/releases/download/v1.0/Zelion_Whitepaper_v1.0.pdf"
                  download="Zelion_Whitepaper_v1.0.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                </a>
              </motion.div>

              {/* Section Navigation */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section, index) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="glass-card-hover flex items-center gap-3 p-4 cursor-pointer"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                      <span className="font-heading text-xs font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{section}</span>
                  </motion.div>
                ))}
              </div>

              {/* Reading preview */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card mt-16 p-8 lg:p-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-5 w-5 text-silver-light" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">Abstract</h2>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Zelion presents an infrastructure-first approach to energy data validation
                    using hardware-anchored verification nodes. The protocol establishes a
                    three-layer architecture—physical, validation, and blockchain coordination—that
                    enables deterministic energy data verification without centralized trust assumptions.
                  </p>
                  <p>
                    This whitepaper describes the technical architecture, consensus mechanisms,
                    token economics, and governance framework that constitute the Zelion protocol.
                    The system is designed for institutional-grade reliability while maintaining
                    the transparency and immutability properties of decentralized coordination.
                  </p>
                  <p>
                    Key innovations include tamper-resistant hardware validators with cryptographic
                    attestation, Byzantine fault tolerant multi-node verification, and a utility
                    token model aligned with long-term network sustainability.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
