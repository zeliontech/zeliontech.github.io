import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, FileText, Megaphone, PieChart } from "lucide-react";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Page hero */}
        <section className="py-20 relative overflow-hidden">
          {/* Background: centered radial glow */}
          <div
            className="absolute left-1/2 top-40 -translate-x-1/2 pointer-events-none"
            style={{
              width: "900px",
              height: "500px",
              background:
                "radial-gradient(ellipse at center, rgba(0,153,214,0.10) 0%, rgba(0,153,214,0.04) 45%, transparent 70%)",
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

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 label-rule-r" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
                PARTNERS
              </span>
              <div className="h-px w-12 label-rule-l" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black navy-gradient-text tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
            >
              Strategic Partnerships
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-kanit font-light text-xl text-slate-900/60 leading-[1.85] max-w-3xl mx-auto"
            >
              We work with energy asset operators, ESG-focused enterprises,
              carbon market participants, institutional investors, and Web3
              protocol teams.
            </motion.p>
          </div>
        </section>

        {/* Cards */}
        <section className="pb-24 relative">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6">
            {/* Announcements card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center mb-5">
                <Megaphone size={18} className="text-primary" />
              </div>
              <h2 className="font-heading font-bold text-slate-900 text-xl mb-3">
                Partnership Announcements
              </h2>
              <p className="font-kanit font-light text-slate-900/60 leading-relaxed">
                Formal partnership announcements will be published here as
                agreements are finalized.
              </p>
            </motion.div>

            {/* Allocation fact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center mb-5">
                <PieChart size={18} className="text-primary" />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-2">
                Strategic Partnerships
              </div>
              <div className="font-mono text-4xl font-bold text-primary mb-3">
                10%
              </div>
              <p className="font-kanit font-light text-slate-900/60 leading-relaxed">
                of total $ZLN supply is allocated to strategic partnerships.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA row */}
        <section className="pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row gap-5 justify-center"
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
