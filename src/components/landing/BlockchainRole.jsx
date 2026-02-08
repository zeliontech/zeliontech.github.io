import { motion } from "framer-motion";
import { Blocks } from "lucide-react";

const blockchainRoles = [
  "Validator coordination",
  "Infrastructure alignment",
  "Ecosystem transparency",
];

const BlockchainRole = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
      <div className="section-divider mb-24" />
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
              Blockchain Role
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Blockchain as a
              <br />
              <span className="metal-gradient">Coordination Layer</span>
            </h2>
          </div>
          
          <div className="glass-card p-8 lg:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted">
              <Blocks className="h-7 w-7 text-silver-light" />
            </div>
            
            <p className="mb-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              Blockchain supports:
            </p>
            
            <ul className="mb-8 space-y-4">
              {blockchainRoles.map((role, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-base text-muted-foreground"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-silver-light" />
                  {role}
                </motion.li>
              ))}
            </ul>
            
            <div className="border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Blockchain does not control physical infrastructure.</span>
                <br />
                It records validated outcomes from infrastructure-level processes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlockchainRole;
