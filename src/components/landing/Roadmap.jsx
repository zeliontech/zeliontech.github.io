import { motion } from "framer-motion";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    badge: "Active",
    status: "active",
    items: [
      "Core hardware validation",
      "Initial system deployment",
      "Infrastructure testing",
      "Protocol development",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    badge: "Upcoming",
    status: "upcoming",
    items: [
      "Expanded deployment",
      "Ecosystem integrations",
      "Performance optimization",
      "Validator network growth",
    ],
  },
  {
    phase: "Phase 3",
    title: "Global Scale",
    badge: "Future",
    status: "future",
    items: [
      "Global scalable infrastructure rollout",
      "Long-term operational refinement",
      "Institutional integration",
      "Ecosystem maturity",
    ],
  },
];

const cardVariants = {
  active: "bg-primary/[0.06] border border-primary/30",
  upcoming: "bg-slate-900/[0.03] border border-slate-900/10",
  future: "bg-slate-900/[0.02] border border-slate-900/[0.08]",
};

const badgeVariants = {
  active: "bg-primary/5 text-primary border border-primary/30",
  upcoming: "bg-slate-900/[0.04] text-slate-900/60 border border-slate-900/10",
  future: "bg-slate-900/[0.03] text-slate-900/40 border border-slate-900/[0.08]",
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-36 relative">
      {/* Centered radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,153,214,0.05), transparent 60%)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-20 px-6"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 label-rule-r" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
            ROADMAP
          </span>
          <div className="h-px w-10 label-rule-l" />
        </div>
        <h2
          className="font-heading font-black navy-gradient-text leading-tight mb-5"
          style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)" }}
        >
          Infrastructure Deployment
          <br />
          Roadmap
        </h2>
        <p className="font-mono text-sm text-slate-900/45">
          Timelines adapt based on real-world infrastructure deployment conditions
        </p>
      </motion.div>

      {/* Phase columns */}
      <div className="relative grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            {index === 0 ? (
              <div className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-2">
                CURRENT PHASE
              </div>
            ) : (
              <div className="hidden md:block md:mt-[26px]" />
            )}

            <div className={`rounded-2xl p-6 relative overflow-hidden ${cardVariants[phase.status]}`}>
              {/* Top hairline */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Inner radial glow for active phase */}
              {phase.status === "active" && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,153,214,0.10),transparent_60%)]" />
              )}

              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs ${
                      phase.status === "active" ? "text-primary/80" : "text-slate-900/40"
                    }`}
                  >
                    {phase.phase}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-mono ${badgeVariants[phase.status]}`}
                  >
                    {phase.badge}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">
                  {phase.title}
                </h3>

                <ul className="space-y-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                          phase.status === "active" ? "bg-primary/50" : "bg-slate-900/30"
                        }`}
                      />
                      <span className="font-kanit font-light text-sm text-slate-900/60">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
