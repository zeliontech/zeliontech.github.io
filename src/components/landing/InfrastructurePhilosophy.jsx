import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const principles = [
  "Infrastructure before token",
  "Deterministic processing over probabilistic consensus",
  "Long-term deployment over short-term incentives",
];

const InfrastructurePhilosophy = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Philosophy
          </span>
          <h2 className="mb-10 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Infrastructure Before
            <br />
            <span className="metal-gradient">Speculation</span>
          </h2>
          
          <div className="mb-10">
            <div className="glass-card mx-auto max-w-2xl p-6 lg:p-8 border-silver-light/20">
              <p className="text-base font-medium leading-relaxed text-foreground lg:text-lg">
                Zelion does not replace energy systems.
                It validates, coordinates, and secures them.
              </p>
            </div>
          </div>

          <div className="glass-card mx-auto max-w-2xl p-8 lg:p-10 text-left">
            <p className="mb-6 text-sm text-muted-foreground">
              Core principles:
            </p>
            <div className="space-y-5">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-silver-light" />
                  <span className="text-base text-foreground">{principle}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfrastructurePhilosophy;
