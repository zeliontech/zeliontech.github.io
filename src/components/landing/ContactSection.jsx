import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

// Lazy: keeps the form (and the Firebase chunk rollup ties to it) out of the
// homepage's initial static graph — this section sits far below the fold.
const ContactForm = lazy(() => import("@/components/ContactForm"));

const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="eyebrow">
            Get in Touch
          </p>
          <h2 className="headline mt-4">
            Contact <span className="metal-gradient">ZelionTech</span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            <p className="lede">
              Partnerships, pilot sites, integrations or press — tell us what you are working on.
            </p>
            <p className="text-base leading-relaxed text-foreground font-medium">
              Trusted energy data starts with proof, not promises.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
