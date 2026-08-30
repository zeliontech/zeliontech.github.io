import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackWhitepaperDownload } from "@/services/analyticsService";

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
      <main className="pt-24">
        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* Background: soft radial glow */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
            style={{
              width: "900px",
              height: "500px",
              background:
                "radial-gradient(ellipse at center, rgba(0,153,214,0.10) 0%, rgba(0,153,214,0.04) 45%, transparent 70%)",
            }}
          />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="mx-auto max-w-4xl">
              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-12 label-rule-r" />
                  <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
                    Documentation
                  </span>
                  <div className="h-px w-12 label-rule-l" />
                </div>
                <h1
                  className="mb-6 font-heading font-black tracking-tight"
                  style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
                >
                  <span className="gradient-text">Whitepaper</span>
                </h1>
                <p className="mx-auto mb-10 max-w-xl font-kanit font-light text-lg text-slate-900/60 leading-relaxed">
                  A comprehensive technical overview of the Zelion protocol, architecture,
                  and token economics.
                </p>
                <a
                  href="https://github.com/zeliontech/zelion-whitepaper/releases/download/v1.0/Zelion_Whitepaper_v1.0.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhitepaperDownload()}
                  className="group cta-gradient text-white font-kanit font-semibold px-10 py-5 rounded-xl inline-flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(0,153,214,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
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
                    className="relative bg-white rounded-2xl border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] flex items-center gap-3 p-4 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center">
                      <span className="font-mono text-xs font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-kanit text-sm text-slate-900/80">{section}</span>
                  </motion.div>
                ))}
              </div>

              {/* Reading preview */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] mt-16 p-8 lg:p-12 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-slate-900 text-xl">Abstract</h2>
                </div>
                <div className="space-y-4 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
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
