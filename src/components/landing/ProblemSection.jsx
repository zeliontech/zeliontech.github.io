import { motion } from "framer-motion";
import { AlertTriangle, Database, Lock } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Unverified Energy Data",
    description:
      "Energy data is often difficult to verify at the source and can be vulnerable to manipulation.",
  },
  {
    icon: Database,
    title: "Centralized Validation",
    description:
      "Many systems rely on centralized validation, reducing transparency and resilience.",
  },
  {
    icon: Lock,
    title: "Physical–Digital Disconnect",
    description:
      "Infrastructure and digital systems often operate without unified verification layers.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Structural Challenges
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Structural Challenges in
            <br />
            <span className="metal-gradient">Global Energy Systems</span>
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <p className="text-base text-muted-foreground">
              Global energy systems face three core validation challenges.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Zelion addresses these gaps by validating data at the infrastructure edge.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 md:grid-cols-3">
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
                <problem.icon className="h-6 w-6 text-silver-light" />
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
