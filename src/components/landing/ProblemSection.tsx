import { motion } from "framer-motion";
import { AlertTriangle, Database, Lock } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Unverified Energy Data",
    description:
      "Energy markets rely on self-reported data with no hardware-level verification. This creates systemic risk and trust gaps across the value chain.",
  },
  {
    icon: Database,
    title: "Centralized Validation",
    description:
      "Current validation infrastructure depends on single points of failure. Centralized systems can be manipulated, delayed, or compromised.",
  },
  {
    icon: Lock,
    title: "Opaque Coordination",
    description:
      "Energy producers, validators, and consumers operate in silos. There is no transparent, immutable coordination layer connecting them.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
            The Problem
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Infrastructure Without
            <br />
            <span className="metal-gradient">Verification Is Fragile</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover p-6 lg:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                <problem.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
