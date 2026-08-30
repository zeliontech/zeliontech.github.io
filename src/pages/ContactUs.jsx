import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Globe, Send } from "lucide-react";
import { trackExternalLink } from "@/services/analyticsService";

const contactLinks = [
  {
    icon: Send,
    label: "Telegram",
    value: "Channel link coming soon",
    href: "#",
    ariaLabel: "Join us on Telegram",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.zeliontech.com",
    href: "https://www.zeliontech.com",
    ariaLabel: "Visit our website",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@zeliontech.com",
    href: "mailto:info@zeliontech.com",
    ariaLabel: "Send us an email",
  },
  {
    icon: Globe,
    label: "Twitter (X)",
    value: "Channel link coming soon",
    href: "#",
    ariaLabel: "Follow us on X (Twitter)",
  },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
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

          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-12 label-rule-r" />
                  <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
                    Get in Touch
                  </span>
                  <div className="h-px w-12 label-rule-l" />
                </div>
                <h1
                  className="mb-8 font-heading font-black navy-gradient-text tracking-tight"
                  style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
                >
                  Contact <span className="gradient-text">Zelion</span>
                </h1>
                <div className="mx-auto max-w-2xl space-y-4">
                  <p className="font-kanit font-light text-lg leading-[1.85] text-slate-900/60">
                    Zelion Energy Network enables trustless verification of renewable energy at the source.
                  </p>
                  <p className="font-kanit font-normal text-lg leading-[1.85] text-slate-900/80">
                    The future of energy finance depends on proof — not promises.
                  </p>
                </div>
              </motion.div>

              {/* Contact Cards */}
              <div className="grid gap-6 sm:grid-cols-2">
                {contactLinks.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={contact.ariaLabel}
                    onClick={() => trackExternalLink(contact.href, contact.label)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="group relative bg-white rounded-2xl p-6 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden transition-transform hover:-translate-y-0.5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                        <contact.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-900/50">
                          {contact.label}
                        </div>
                        <div className="font-heading text-base font-semibold text-slate-900 transition-colors group-hover:text-primary">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 text-center"
              >
                <div className="relative mx-auto max-w-2xl bg-white rounded-2xl p-8 border border-primary/15 shadow-[0_10px_40px_rgba(15,40,70,0.08)] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <h2 className="mb-4 font-heading text-xl font-bold text-slate-900">
                    Infrastructure-First Approach
                  </h2>
                  <p className="font-kanit font-light text-sm leading-relaxed text-slate-900/60">
                    Zelion is designed for infrastructure validation, deterministic data processing, and long-term system deployment. We prioritize resilience and infrastructure longevity over rapid expansion.
                  </p>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="my-16 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"></div>

              {/* Contact Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
