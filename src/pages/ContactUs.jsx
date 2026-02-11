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
    value: "@zelionglobal",
    href: "https://t.me/zelionglobal",
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
    value: "@zelion_tech",
    href: "https://x.com/zelion_tech",
    ariaLabel: "Follow us on X (Twitter)",
  },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl"
            >
              {/* Header */}
              <div className="mb-16 text-center">
                <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
                  Get in Touch
                </span>
                <h1 className="mb-6 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                  Contact <span className="metal-gradient">Zelion</span>
                </h1>
                <div className="mx-auto max-w-2xl space-y-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Zelion Energy Network enables trustless verification of renewable energy at the source.
                  </p>
                  <p className="text-base leading-relaxed text-foreground font-medium">
                    The future of energy finance depends on proof — not promises.
                  </p>
                </div>
              </div>

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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="glass-card-hover group p-6 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted transition-colors group-hover:border-silver-light/50 group-hover:bg-silver-light/10">
                        <contact.icon className="h-5 w-5 text-silver-light" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                          {contact.label}
                        </div>
                        <div className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-silver-light">
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 text-center"
              >
                <div className="glass-card mx-auto max-w-2xl p-8">
                  <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
                    Infrastructure-First Approach
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Zelion is designed for infrastructure validation, deterministic data processing, and long-term system deployment. We prioritize resilience and infrastructure longevity over rapid expansion.
                  </p>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="my-16 border-t border-border/50"></div>

              {/* Contact Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
