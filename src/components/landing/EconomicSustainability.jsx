import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const sustainabilityFocus = [
  "Controlled token supply",
  "Infrastructure-backed utility",
  "Long-term ecosystem participation",
];

const EconomicSustainability = () => {
  return (
    <section className="relative bg-muted/20 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="text-center mb-8">
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
              Economic Model
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Long-Term Economic
              <br />
              <span className="metal-gradient">Sustainability</span>
            </h2>
          </div>
          
          <div className="glass-card p-8 lg:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted">
              <TrendingUp className="h-7 w-7 text-silver-light" />
            </div>
            
            <p className="mb-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              Zelion's economic model avoids short-term incentive cycles and unsustainable emissions.
            </p>
            
            <div className="mb-6">
              <p className="mb-4 text-sm font-medium text-foreground">Focused on:</p>
              <ul className="space-y-3">
                {sustainabilityFocus.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-base text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-silver-light" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">
                The model prioritizes system resilience over rapid expansion.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EconomicSustainability;
