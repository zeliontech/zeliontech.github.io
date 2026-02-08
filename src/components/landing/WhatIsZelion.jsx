import { motion } from "framer-motion";

const WhatIsZelion = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            What is Zelion
          </span>
          <h2 className="mb-10 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="metal-gradient">Infrastructure Before Token</span>
          </h2>
          <div className="space-y-6">
            <div className="glass-card p-6 lg:p-8">
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Most blockchain systems start with tokens and attempt to add utility later.
                Zelion reverses this model.
              </p>
            </div>
            <div className="glass-card p-6 lg:p-8 border-silver-light/20">
              <p className="text-base font-medium leading-relaxed text-foreground lg:text-lg">
                Zelion starts with infrastructure, hardware validation, and real-world deployment.
                The token exists only to coordinate and align ecosystem participation.
              </p>
            </div>
            <div className="glass-card p-6 lg:p-8">
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Designed for long-term infrastructure integration and institutional use.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsZelion;
