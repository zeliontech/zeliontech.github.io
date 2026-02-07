import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allocations = [
  { label: "Ecosystem & Infrastructure", amount: "150,000,000", pct: 30, color: "bg-silver-light" },
  { label: "Development & Operations", amount: "75,000,000", pct: 15, color: "bg-silver-mid" },
  { label: "Liquidity & Market Stability", amount: "75,000,000", pct: 15, color: "bg-silver-dark" },
  { label: "Community Programs", amount: "50,000,000", pct: 10, color: "bg-foreground" },
  { label: "Strategic Partnerships", amount: "50,000,000", pct: 10, color: "bg-muted-foreground" },
  { label: "Core Contributors (Team)", amount: "100,000,000", pct: 20, color: "bg-border" },
];

const TokenomicsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
                Token Economics
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Zelion Token Structure
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                $ZLN is a utility and coordination token used within the infrastructure ecosystem.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                It supports validator coordination, ecosystem participation, and long-term network alignment.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                It does not represent equity, ownership, or profit-sharing.
              </p>
            </motion.div>

            {/* Supply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mb-12 max-w-4xl"
            >
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Fixed Supply Model
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
                $ZLN has a fixed supply designed to support long-term ecosystem sustainability and infrastructure deployment.
              </p>
              <div className="glass-card mx-auto max-w-xl p-8 text-center">
                <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Total Supply</div>
                <div className="mt-2 font-heading text-5xl font-bold text-foreground">500,000,000</div>
                <div className="mt-1 font-heading text-xl text-silver-light">$ZLN</div>
              </div>
            </motion.div>

            {/* Allocation */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Token Allocation Structure
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
                Token distribution is designed to support infrastructure deployment, ecosystem growth, and long-term system stability.
              </p>
              <div className="mb-8 flex h-4 overflow-hidden rounded-full">
                {allocations.map((alloc, i) => (
                  <motion.div
                    key={alloc.label}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${alloc.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                    className={`${alloc.color} ${i > 0 ? "border-l border-background" : ""}`}
                  />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {allocations.map((alloc) => (
                  <div key={alloc.label} className="glass-card p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className={`h-3 w-3 flex-shrink-0 rounded-sm ${alloc.color}`} />
                      <span className="flex-1 text-sm font-medium text-foreground">{alloc.label}</span>
                      <span className="font-heading text-sm font-semibold text-foreground">{alloc.pct}%</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      {alloc.amount} $ZLN
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vesting */}
            <div className="mx-auto mt-16 max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Long-Term Alignment
              </h2>
              <div className="glass-card p-8">
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Team and core contributor allocations follow long-term vesting schedules designed to support ecosystem stability and long-term contributor alignment.
                </p>
                <div className="mb-6 rounded-lg border border-border/50 bg-muted/30 p-6">
                  <h3 className="mb-4 text-sm font-medium text-foreground">Vesting Structure:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                      6-month cliff
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                      12–24 months linear vesting following cliff period
                    </li>
                  </ul>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Liquidity allocations are managed strategically to support sustainable ecosystem growth and reduce short-term volatility.
                </p>
              </div>
            </div>

            {/* Economic Model */}
            <div className="mx-auto mt-16 max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Infrastructure-Aligned Economic Model
              </h2>
              <div className="glass-card p-8">
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The Zelion economic model prioritizes:
                </p>
                <div className="mb-6 rounded-lg border border-border/50 bg-muted/30 p-6">
                  <h3 className="mb-4 text-sm font-medium text-foreground">Key priorities:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                      Controlled token supply
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                      Infrastructure-backed utility
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                      Long-term ecosystem participation
                    </li>
                  </ul>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The system favors resilience and infrastructure longevity over rapid expansion.
                </p>
              </div>
            </div>

            {/* Token Role */}
            <div className="mx-auto mt-16 max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Utility and Coordination Function
              </h2>
              <div className="glass-card p-8">
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The Zelion token is used for:
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                    Validator coordination mechanisms
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                    Access to infrastructure-level ecosystem services
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                    Alignment of long-term ecosystem contributors
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-silver-light" />
                    Governance signaling for protocol-level decisions
                  </li>
                </ul>
                <p className="text-sm font-medium text-foreground">
                  The token is not designed as a financial product or investment instrument.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="glass-card border-2 border-yellow-500/20 bg-yellow-500/5 p-8">
                <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
                  Important Notice
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  The Zelion token is a utility and coordination instrument used within the ecosystem infrastructure.
                  It does not represent ownership, equity, or entitlement to revenue or profit.
                </p>
                <p className="text-sm font-medium text-foreground">
                  Participation in decentralized infrastructure ecosystems involves risk.
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

export default TokenomicsPage;
