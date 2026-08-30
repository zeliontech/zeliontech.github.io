import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allocations = [
  { label: "Ecosystem & Infrastructure", amount: "150,000,000", pct: 30, color: "#0099D6" },
  { label: "Development & Operations", amount: "75,000,000", pct: 15, color: "#5CBFD9" },
  { label: "Liquidity & Market Stability", amount: "75,000,000", pct: 15, color: "#85CFE0" },
  { label: "Community Programs", amount: "50,000,000", pct: 10, color: "#B8E6EF" },
  { label: "Strategic Partnerships", amount: "50,000,000", pct: 10, color: "#9FDCE8" },
  { label: "Core Contributors (Team)", amount: "100,000,000", pct: 20, color: "#33AACC" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const SectionHeading = ({ children }) => (
  <h2 className="mb-6 text-center font-heading font-bold text-slate-900 text-2xl md:text-3xl tracking-tight">
    {children}
  </h2>
);

const Card = ({ className = "", children }) => (
  <div
    className={`relative bg-white rounded-2xl border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    {children}
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-3 font-kanit font-light text-sm text-slate-900/60">
    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
    {children}
  </li>
);

const TokenomicsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
            style={{
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
                  Token Economics
                </span>
                <div className="h-px w-12 label-rule-l" />
              </div>
              <h1
                className="mb-8 font-heading font-black navy-gradient-text tracking-tight"
                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
              >
                Zelion Token Structure
              </h1>
              <p className="mx-auto max-w-2xl font-kanit font-light text-lg leading-[1.85] text-slate-900/60">
                $ZLN is a utility and coordination token used within the infrastructure ecosystem.
              </p>
              <p className="mx-auto mt-4 max-w-2xl font-kanit font-light text-lg leading-[1.85] text-slate-900/60">
                It supports validator coordination, ecosystem participation, and long-term network alignment.
              </p>
              <p className="mx-auto mt-4 max-w-2xl font-kanit font-light text-sm text-slate-900/50">
                It does not represent equity, ownership, or profit-sharing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6">
            {/* Supply */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-20">
              <SectionHeading>Fixed Supply Model</SectionHeading>
              <p className="mx-auto mb-10 max-w-2xl text-center font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                $ZLN has a fixed supply designed to support long-term ecosystem sustainability and infrastructure deployment.
              </p>
              <Card className="mx-auto max-w-xl p-10 text-center">
                <div className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-4">
                  Total Supply
                </div>
                <div
                  className="font-mono font-bold"
                  style={{
                    fontSize: "clamp(2.5rem,5vw,4rem)",
                    background: "linear-gradient(135deg, #0099D6, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  500,000,000
                </div>
                <div className="mt-1 font-heading text-2xl font-bold text-slate-900">$ZLN</div>
              </Card>
            </motion.div>

            {/* Allocation */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-20">
              <SectionHeading>Token Allocation Structure</SectionHeading>
              <p className="mx-auto mb-10 max-w-2xl text-center font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                Token distribution is designed to support infrastructure deployment, ecosystem growth, and long-term system stability.
              </p>
              <div className="mb-10 flex h-2.5 overflow-hidden rounded-full bg-slate-900/[0.06]">
                {allocations.map((alloc, i) => (
                  <motion.div
                    key={alloc.label}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${alloc.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    className={i > 0 ? "border-l border-white" : ""}
                    style={{ backgroundColor: alloc.color }}
                  />
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {allocations.map((alloc, i) => (
                  <motion.div
                    key={alloc.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Card className="p-5">
                      <div className="mb-2 flex items-center gap-3">
                        <div
                          className="h-3 w-3 flex-shrink-0 rounded-sm"
                          style={{ backgroundColor: alloc.color }}
                        />
                        <span className="flex-1 font-kanit text-sm font-medium text-slate-900">
                          {alloc.label}
                        </span>
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {alloc.pct}%
                        </span>
                      </div>
                      <div className="pl-6 font-mono text-xs text-slate-900/50">
                        {alloc.amount} $ZLN
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vesting */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-20">
              <SectionHeading>Long-Term Alignment</SectionHeading>
              <Card className="p-8 md:p-10">
                <p className="mb-6 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  Team and core contributor allocations follow long-term vesting schedules designed to support ecosystem stability and long-term contributor alignment.
                </p>
                <div className="mb-6 rounded-xl border border-primary/15 bg-primary/[0.03] p-6">
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary/80">
                    Vesting Structure:
                  </h3>
                  <ul className="space-y-2">
                    <Bullet>6-month cliff</Bullet>
                    <Bullet>12–24 months linear vesting following cliff period</Bullet>
                  </ul>
                </div>
                <p className="font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  Liquidity allocations are managed strategically to support sustainable ecosystem growth and reduce short-term volatility.
                </p>
              </Card>
            </motion.div>

            {/* Economic Model */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-20">
              <SectionHeading>Infrastructure-Aligned Economic Model</SectionHeading>
              <Card className="p-8 md:p-10">
                <p className="mb-6 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  The Zelion economic model prioritizes:
                </p>
                <div className="mb-6 rounded-xl border border-primary/15 bg-primary/[0.03] p-6">
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary/80">
                    Key priorities:
                  </h3>
                  <ul className="space-y-3">
                    <Bullet>Controlled token supply</Bullet>
                    <Bullet>Infrastructure-backed utility</Bullet>
                    <Bullet>Long-term ecosystem participation</Bullet>
                  </ul>
                </div>
                <p className="font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  The system favors resilience and infrastructure longevity over rapid expansion.
                </p>
              </Card>
            </motion.div>

            {/* Token Role */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-20">
              <SectionHeading>Utility and Coordination Function</SectionHeading>
              <Card className="p-8 md:p-10">
                <p className="mb-6 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  The Zelion token is used for:
                </p>
                <ul className="mb-6 space-y-3">
                  <Bullet>Validator coordination mechanisms</Bullet>
                  <Bullet>Access to infrastructure-level ecosystem services</Bullet>
                  <Bullet>Alignment of long-term ecosystem contributors</Bullet>
                  <Bullet>Governance signaling for protocol-level decisions</Bullet>
                </ul>
                <p className="font-kanit text-sm font-medium text-slate-900">
                  The token is not designed as a financial product or investment instrument.
                </p>
              </Card>
            </motion.div>

            {/* Disclaimer */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-amber-50/60 p-8 md:p-10 shadow-[0_10px_40px_rgba(15,40,70,0.08)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <h2 className="mb-4 font-heading text-xl font-bold text-slate-900">
                  Important Notice
                </h2>
                <p className="mb-4 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                  The Zelion token is a utility and coordination instrument used within the ecosystem infrastructure.
                  It does not represent ownership, equity, or entitlement to revenue or profit.
                </p>
                <p className="font-kanit text-sm font-medium text-slate-900">
                  Participation in decentralized infrastructure ecosystems involves risk.
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

export default TokenomicsPage;
