import { motion } from "framer-motion";

const WhatIsZelion = () => {
  return (
    <section className="relative py-24 lg:py-32">
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
          <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="metal-gradient">Infrastructure Before Token</span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
            <p>
              Most blockchain projects begin with tokens and attempt to later attach utility.
              Zelion reverses this approach.
            </p>
            <p className="font-medium text-foreground">
              Zelion begins with infrastructure, hardware validation, and real-world system integration.
              The token exists only as a coordination and alignment layer within the ecosystem.
            </p>
            <p>
              Zelion is designed for long-term deployment, real-world infrastructure integration, and institutional compatibility.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsZelion;
