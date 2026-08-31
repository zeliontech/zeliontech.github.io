import { motion } from "framer-motion";
import { trackExternalLink } from "@/services/analyticsService";

/* Minimal 24x24 brand glyphs, fill="currentColor" */
const icons = {
  telegram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.4 3.2 2.7 10.6c-.9.4-.8 1.6.1 1.9l4.7 1.5 1.8 5.7c.2.8 1.2 1 1.7.4l2.5-3 4.7 3.5c.6.5 1.6.1 1.7-.7l2.7-14.9c.2-1-.8-1.7-1.6-1.4Zm-11 10.8-.3 3.1-1.5-4.6 9.7-6c.3-.2.6.2.3.4l-8.2 7.1Z" />
    </svg>
  ),
  x: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 3H21l-7.3 8.4L22.2 21h-6.7l-5.2-6.9L4.3 21H1l7.8-9L1.4 3h6.9l4.7 6.3L17.6 3Zm-1.2 16h1.9L7.1 4.9H5.1L16.4 19Z" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="5" r="2.2" />
      <path d="M3.2 9h3.6v12H3.2V9Zm6.8 0h3.4v1.7c.6-1.1 1.9-2 3.7-2 3 0 4.4 1.9 4.4 5.3V21h-3.6v-6.3c0-1.8-.6-2.8-2-2.8-1.5 0-2.3 1-2.3 2.8V21H10V9Z" />
    </svg>
  ),
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 3.8 7v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 1.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
      <circle cx="17.4" cy="6.6" r="1.2" />
    </svg>
  ),
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.7.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.8 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .6 1.5.2 2.5.1 2.8.7.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.7 5.1.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  ),
};

const channels = [
  { label: "Telegram", href: "https://t.me/zelionglobal", color: "#26A5E4", icon: "telegram" },
  { label: "X (Twitter)", href: "https://x.com/zelion_tech", color: "#0B1B2E", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zeliontech/", color: "#0A66C2", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/zeliontech_zev/", color: "#E4405F", icon: "instagram" },
  { label: "GitHub", href: "https://github.com/zeliontech", color: "#0B1B2E", icon: "github" },
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-20 overflow-hidden">
      {/* Centered radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,153,214,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 label-rule-r" />
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
              JOIN THE COMMUNITY
            </span>
            <div className="h-px w-8 label-rule-l" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Connect With <span className="gradient-text">Zelion</span>
          </h2>
          <p className="font-mono text-sm text-slate-500 max-w-md mx-auto">
            Follow our channels for real-time updates, announcements, and community discussions.
          </p>
        </motion.div>

        {/* Channel grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-6xl mx-auto px-6">
          {channels.map((channel, i) => {
            const isExternal = channel.href !== "#";
            return (
              <motion.a
                key={channel.label}
                href={channel.href}
                {...(isExternal
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                      onClick: () => trackExternalLink(channel.href, channel.label),
                    }
                  : {})}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-900/10 hover:border-slate-900/20 transition"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${channel.color}15`,
                    border: `1px solid ${channel.color}30`,
                    color: channel.color,
                  }}
                >
                  {icons[channel.icon]}
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                  {channel.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
