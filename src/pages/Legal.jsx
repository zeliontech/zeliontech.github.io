import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    heading: "General Disclaimer",
    body: "The information provided on this website and related materials is for informational purposes only. Nothing contained herein constitutes financial advice, investment advice, trading advice, or any other sort of professional advice. $ZLN is a utility token designed to function within the Zelion protocol infrastructure. It is not a security, commodity, or financial instrument.",
  },
  {
    heading: "No Investment Advice",
    body: "The content on this website does not constitute a recommendation or solicitation to buy, sell, or hold any token, cryptocurrency, or digital asset. You should conduct your own research and consult with qualified professionals before making any decisions regarding digital assets.",
  },
  {
    heading: "Risk Disclosure",
    body: "Digital assets involve substantial risk and are not suitable for everyone. The value of digital assets can fluctuate significantly. You should only participate with funds you can afford to lose. Past performance does not guarantee future results.",
  },
  {
    heading: "Forward-Looking Statements",
    body: "This website may contain forward-looking statements regarding the Zelion protocol, technology development, and token utility. Such statements are based on current expectations and assumptions, and actual results may differ materially from those projected.",
  },
  {
    heading: "Regulatory Compliance",
    body: "Users are solely responsible for understanding and complying with all applicable laws and regulations in their jurisdiction regarding digital assets and cryptocurrency. The availability of $ZLN tokens may be restricted in certain jurisdictions.",
  },
  {
    heading: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, Zelion and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the protocol or tokens.",
  },
];

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Page hero */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
            style={{
              width: "900px",
              height: "500px",
              background:
                "radial-gradient(ellipse at center, rgba(0,153,214,0.08) 0%, rgba(0,153,214,0.03) 45%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 label-rule-r" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
                LEGAL
              </span>
              <div className="h-px w-12 label-rule-l" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black navy-gradient-text tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
            >
              Legal Disclaimer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-kanit font-light text-slate-900/60"
            >
              Last updated: February 2026
            </motion.p>
          </div>
        </section>

        {/* Legal sections */}
        <section className="pb-28 relative">
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            {sections.map((item, i) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <h2 className="font-heading font-bold text-slate-900 text-xl mb-3">
                  {item.heading}
                </h2>
                <p className="font-kanit font-light text-slate-900/60 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
