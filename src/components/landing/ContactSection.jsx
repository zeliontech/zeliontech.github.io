import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Get in Touch
          </span>
          <h2 className="mb-6 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Contact <span className="metal-gradient">Zelion</span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              Zelion Energy Network enables trustless verification of renewable energy at the source.
            </p>
            <p className="text-base leading-relaxed text-foreground font-medium">
              The future of energy finance depends on proof — not promises.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
