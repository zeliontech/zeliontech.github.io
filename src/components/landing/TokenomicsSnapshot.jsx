import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const allocations = [
  { label: "Ecosystem & Infrastructure", pct: "30%", width: "100%", color: "#0099D6" },
  { label: "Core Contributors (Team)", pct: "20%", width: "66.6%", color: "#33AACC" },
  { label: "Development & Operations", pct: "15%", width: "50%", color: "#5CBFD9" },
  { label: "Liquidity & Market Stability", pct: "15%", width: "50%", color: "#85CFE0" },
  { label: "Strategic Partnerships", pct: "10%", width: "33.3%", color: "#9FDCE8" },
  { label: "Community Programs", pct: "10%", width: "33.3%", color: "#B8E6EF" },
];

const TokenomicsSnapshot = () => {
  return (
    <section id="tokenomics" className="py-40 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,153,214,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 label-rule-r" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">
              TOKENOMICS
            </span>
            <div className="h-px w-16 label-rule-l" />
          </div>
          <h2
            className="font-heading font-black navy-gradient-text tracking-tight"
            style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
          >
            Supply &amp; Allocation
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
          {/* Left: total supply card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white rounded-3xl p-10 text-center border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-4">
              TOTAL SUPPLY
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
            <div className="font-heading text-2xl font-bold text-slate-900 mb-3">
              $ZLN Fixed
            </div>
            <p className="text-xs text-slate-900/50 mb-8">
              Team and core contributor allocations follow long-term vesting
            </p>
            <Link
              to="/tokenomics"
              className="bg-primary/10 border border-primary/25 text-primary rounded-xl px-6 py-3 text-sm font-heading font-semibold inline-flex items-center gap-2 hover:bg-primary/15 transition-colors"
            >
              View Full Tokenomics
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right: allocation bars */}
          <div className="space-y-4">
            {allocations.map((alloc, i) => (
              <motion.div
                key={alloc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="font-kanit font-light text-sm text-slate-900/70">
                    {alloc.label}
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {alloc.pct}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-900/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: alloc.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: alloc.color }}
                  />
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
