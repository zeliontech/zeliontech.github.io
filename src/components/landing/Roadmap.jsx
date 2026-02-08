import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
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
    status: "upcoming",
    items: [
      "Global scalable infrastructure rollout",
      "Long-term operational refinement",
      "Institutional integration",
      "Ecosystem maturity",
    ],
  },
];

const Roadmap = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
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
            Roadmap
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Infrastructure Deployment{" "}
            <span className="metal-gradient">Roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Timelines adapt based on real-world infrastructure deployment conditions
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-2.5 top-6 h-3 w-3 rounded-full border-2 md:top-6 ${
                    phase.status === "active"
                      ? "border-silver-light bg-silver-light shadow-[0_0_12px_-2px_rgba(226,232,240,0.6)]"
                      : "border-border bg-muted"
                  } ${index % 2 === 0 ? "md:left-auto md:-right-[6.5px]" : "md:-left-[6.5px]"}`}
                />

                <div className="glass-card p-8 lg:p-10">
                  <div className="mb-1 flex items-center gap-3">
                    <span
                      className={`text-xs font-medium tracking-wider uppercase ${
                        phase.status === "active" ? "text-silver-light" : "text-muted-foreground"
                      }`}
                    >
                      {phase.phase}
                    </span>
                    {phase.status === "active" && (
                      <span className="rounded-full bg-silver-light/15 px-2 py-0.5 text-[10px] font-medium text-silver-light">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        {phase.status === "active" ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-silver-light" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-border" />
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
