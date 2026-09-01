import { motion } from "framer-motion";
import { useReducedMotion } from "./hooks";

/**
 * Reveal — whileInView fade+rise wrapper (y:16, 0.5s, easeOut, once).
 * Under reduced motion it renders children plainly (static end state).
 *
 * Kept out of hooks.js on purpose: this is the only ZEV component that needs
 * framer-motion, and hooks.js is imported by the above-the-fold hero. Keeping
 * the motion library confined here keeps it out of the critical chunk.
 */
const Reveal = ({ children, className, delay = 0, ...rest }) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
