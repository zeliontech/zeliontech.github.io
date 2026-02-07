import { motion } from "framer-motion";

const allocations = [
  { label: "Ecosystem & Infrastructure", pct: 30, color: "bg-silver-light" },
  { label: "Development & Operations", pct: 15, color: "bg-silver-mid" },
  { label: "Liquidity & Market Stability", pct: 15, color: "bg-silver-dark" },
  { label: "Community Programs", pct: 10, color: "bg-foreground/80" },
  { label: "Strategic Partnerships", pct: 10, color: "bg-muted-foreground/80" },
  { label: "Core Contributors (Team)", pct: 20, color: "bg-border" },
];

const TokenomicsSnapshot = () => {
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
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Tokenomics
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Supply &{" "}
            <span className="metal-gradient">Allocation</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Total Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card mb-8 p-6 text-center lg:p-8"
          >
            <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Total Supply (Fixed)
            </div>
            <div className="mt-2 font-heading text-4xl font-bold text-foreground lg:text-5xl">
              500,000,000
            </div>
            <div className="mt-1 font-heading text-lg text-silver-light">$ZLN</div>
            <div className="mt-3 text-xs text-muted-foreground">
              Team and core contributor allocations follow long-term vesting
            </div>
          </motion.div>

          {/* Allocation Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex h-3 overflow-hidden rounded-full">
              {allocations.map((alloc, i) => (
                <motion.div
                  key={alloc.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${alloc.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className={`${alloc.color} ${i > 0 ? "border-l border-background" : ""}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Legend */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allocations.map((alloc, index) => (
              <motion.div
                key={alloc.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-4 py-3"
              >
                <div className={`h-3 w-3 flex-shrink-0 rounded-sm ${alloc.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{alloc.label}</div>
                </div>
                <div className="font-heading text-sm font-semibold text-foreground">
                  {alloc.pct}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSnapshot;
