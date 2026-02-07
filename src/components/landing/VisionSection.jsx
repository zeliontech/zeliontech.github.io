import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const visionPoints = [
  "Energy validation is hardware-based, not trust-based",
  "Infrastructure operates independently of speculative cycles",
  "Blockchain functions as a coordination layer, not the core product",
];

const VisionSection = () => {
  return (
    <section className="relative bg-muted/20 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Vision
          </span>
          <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Long-Term Infrastructure
            <br />
            <span className="metal-gradient">Validation</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Zelion envisions a future where:
          </p>
          <div className="mx-auto max-w-2xl space-y-4 text-left">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-silver-light" />
                <span className="text-base text-muted-foreground">{point}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-base text-muted-foreground">
            The system is designed for long-term infrastructure deployment and real-world integration.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
