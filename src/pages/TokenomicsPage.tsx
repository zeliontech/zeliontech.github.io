import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allocations = [
  { label: "Validators & Infrastructure", pct: 35, color: "bg-primary" },
  { label: "Ecosystem Development", pct: 20, color: "bg-silver-mid" },
  { label: "Team & Advisors", pct: 15, color: "bg-silver-dark" },
  { label: "Community & Governance", pct: 15, color: "bg-foreground" },
  { label: "Liquidity & Reserves", pct: 10, color: "bg-muted-foreground" },
  { label: "Strategic Partners", pct: 5, color: "bg-border" },
];

const vestingSchedule = [
  { category: "Validators", cliff: "None", vesting: "Monthly over 48 months", tge: "10%" },
  { category: "Ecosystem", cliff: "3 months", vesting: "Monthly over 36 months", tge: "5%" },
  { category: "Team", cliff: "12 months", vesting: "Monthly over 36 months", tge: "0%" },
  { category: "Community", cliff: "None", vesting: "Monthly over 24 months", tge: "15%" },
  { category: "Liquidity", cliff: "None", vesting: "Immediate", tge: "100%" },
  { category: "Partners", cliff: "6 months", vesting: "Monthly over 24 months", tge: "0%" },
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
              <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
                Tokenomics
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                <span className="metal-gradient">$ZLN</span> Token Economics
              </h1>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Transparent allocation, structured vesting, and utility-driven distribution.
              </p>
            </motion.div>

            {/* Supply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card mx-auto mb-12 max-w-xl p-8 text-center"
            >
              <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Total Supply</div>
              <div className="mt-2 font-heading text-5xl font-bold text-foreground">1,000,000,000</div>
              <div className="mt-1 font-heading text-xl text-primary">$ZLN</div>
            </motion.div>

            {/* Allocation */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Allocation
              </h2>
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
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allocations.map((alloc) => (
                  <div key={alloc.label} className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-4 py-3">
                    <div className={`h-3 w-3 flex-shrink-0 rounded-sm ${alloc.color}`} />
                    <span className="flex-1 text-sm text-foreground">{alloc.label}</span>
                    <span className="font-heading text-sm font-semibold text-foreground">{alloc.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vesting Table */}
            <div className="mx-auto mt-16 max-w-4xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Vesting Schedule
              </h2>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Cliff</th>
                        <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">Vesting</th>
                        <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">TGE Unlock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vestingSchedule.map((row, i) => (
                        <tr key={row.category} className={i < vestingSchedule.length - 1 ? "border-b border-border/50" : ""}>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{row.category}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{row.cliff}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{row.vesting}</td>
                          <td className="px-6 py-4 text-sm text-primary">{row.tge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
