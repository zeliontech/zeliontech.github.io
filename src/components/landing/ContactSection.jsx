import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

const stats = [
  { value: "Phase 2", label: "ACTIVE STAGE" },
  { value: "3-Layer", label: "ARCHITECTURE" },
  { value: "100%", label: "INFRASTRUCTURE FIRST" },
];

const ContactSection = () => {
  return (
    <section className="py-36 relative overflow-hidden">
      {/* Background: centered radial ellipse glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(0,153,214,0.12) 0%, rgba(0,153,214,0.05) 45%, transparent 70%)",
        }}
      />
      {/* Background: faint grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,153,214,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,214,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 label-rule-r" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
            GET IN TOUCH
          </span>
          <div className="h-px w-12 label-rule-l" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-black navy-gradient-text mb-10"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          Get in Touch
        </motion.h2>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-kanit font-light text-xl text-slate-900/60 leading-[1.85] max-w-3xl mx-auto mb-14"
        >
          The future of energy finance depends on proof — not promises. Connect
          with our infrastructure team.
        </motion.p>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
              className="relative bg-white rounded-2xl p-5 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="font-mono text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-kanit text-xs uppercase tracking-widest text-slate-900/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link
            to="/contact"
            className="group cta-gradient text-white font-kanit font-semibold px-10 py-5 rounded-xl inline-flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(0,153,214,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/whitepaper"
            className="bg-primary/5 border border-primary/25 text-slate-900 font-kanit font-semibold px-10 py-5 rounded-xl backdrop-blur-xl inline-flex items-center justify-center gap-3 transition-colors hover:bg-primary/10"
          >
            <FileText size={17} />
            Read Whitepaper
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
