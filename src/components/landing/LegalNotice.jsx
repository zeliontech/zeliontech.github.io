import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const LegalNotice = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl border border-primary/15 p-8 shadow-[0_10px_40px_rgba(15,40,70,0.06)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
              Important Notice
            </span>
          </div>

          <div className="space-y-3 font-kanit font-light text-sm leading-relaxed text-slate-900/60">
            <p>This project is provided for informational purposes only.</p>
            <p>
              Zelion is not an investment. It is infrastructure technology
              designed for long-term deployment. The $ZLN token does not
              represent equity, ownership, or profit-sharing.
            </p>
            <p>
              Participation in decentralized infrastructure systems involves
              risk. No guarantees are made regarding performance, adoption, or
              outcomes.
            </p>
            <p className="font-normal text-slate-900/75">
              Users should conduct independent research before participating.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalNotice;
