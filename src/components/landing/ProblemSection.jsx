import { motion } from "framer-motion";
import { AlertTriangle, Database, Lock } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Lack of Verifiable Energy Data",
    description:
      "Energy data is often difficult to verify at the source and can be vulnerable to manipulation.",
  },
  {
    icon: Database,
    title: "Centralized Validation Mechanisms",
    description:
      "Many existing systems rely on centralized validation, reducing transparency and resilience.",
  },
  {
    icon: Lock,
    title: "Inefficient Physical-to-Digital Coordination",
    description:
      "Physical infrastructure and digital systems often operate without unified verification or coordination layers.",
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
            Structural Challenges
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Structural Challenges in
            <br />
            <span className="metal-gradient">Global Energy Systems</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
            Global energy systems face three core challenges
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-muted-foreground/80">
            Zelion addresses these gaps by anchoring validation at the infrastructure edge, not at the application layer.
          </p>
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
