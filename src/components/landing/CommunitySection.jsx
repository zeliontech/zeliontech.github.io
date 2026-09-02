import { motion } from "framer-motion";
import { trackExternalLink } from "@/services/analyticsService";

// The five official ZelionTech channels. Labels only — account handles are
// never displayed on the page.
const channels = [
  { label: "Telegram", href: "https://t.me/zelionglobal" },
  { label: "X (Twitter)", href: "https://x.com/zelion_tech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zeliontech/" },
  { label: "Instagram", href: "https://www.instagram.com/zeliontech_zev/" },
  { label: "GitHub", href: "https://github.com/zeliontech" },
];

const CommunitySection = () => {
  return (
    <section id="community" className="border-t border-border/50 bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Join the Community
          </span>
          <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Connect With <span className="metal-gradient">ZelionTech</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Follow our channels for real-time updates, announcements, and
            community discussions.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink(ch.href, ch.label)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              className="glass-card-hover rounded-full border border-border px-6 py-3 font-heading text-sm font-medium text-foreground transition-colors hover:text-silver-light"
            >
              {ch.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
