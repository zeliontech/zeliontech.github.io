import { Link } from "react-router-dom";

const socials = [
  { label: "X (Twitter)", href: "https://x.com/zelion_tech", external: true },
  { label: "Telegram", href: "https://t.me/zelionglobal", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zeliontech/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/zeliontech_zev/", external: true },
  { label: "GitHub", href: "https://github.com/zeliontech", external: true },
];

const platformLinks = [
  { label: "Technology", to: "/technology" },
  { label: "Tokenomics", to: "/tokenomics" },
  { label: "Whitepaper", to: "/whitepaper" },
];

const companyLinks = [
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Legal", to: "/legal" },
  { label: "Website", href: "https://www.zeliontech.com" },
  { label: "info@zeliontech.com", href: "mailto:info@zeliontech.com" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-primary/10 bg-[rgba(246,249,252,0.9)] backdrop-blur-2xl">
      {/* Centered top hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/zeliontech-logo.png"
                className="w-8 h-8 object-contain"
                alt="ZelionTech"
              />
              <span className="font-kanit font-bold text-lg tracking-[0.1em] text-slate-900">
                ZELION<span className="text-primary">TECH</span>
              </span>
            </div>
            <p className="max-w-sm font-kanit font-light text-sm text-slate-900/55 mb-8">
              Infrastructure-first energy validation network. Connecting
              physical energy infrastructure with hardware-level validation,
              verifiable data integrity, and decentralized coordination.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/[0.04] border border-slate-900/10 text-slate-900/55 font-kanit hover:text-primary hover:border-primary/30 transition"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Platform column */}
          <div>
            <h3 className="font-kanit text-xs uppercase tracking-[0.2em] text-primary/70 mb-5">
              PLATFORM
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-kanit font-light text-sm text-slate-900/55 hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="font-kanit text-xs uppercase tracking-[0.2em] text-primary/70 mb-5">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="font-kanit font-light text-sm text-slate-900/55 hover:text-primary transition"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="font-kanit font-light text-sm text-slate-900/55 hover:text-primary transition"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900/10 pt-8 flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="text-center md:text-left">
            <p className="text-xs text-slate-900/45">
              © {new Date().getFullYear()} ZelionTech. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-900/35 mt-1">
              Nothing on this website constitutes financial advice. $ZLN is a
              utility token. Not a financial product. Always conduct your own
              research.
            </p>
          </div>
          <div className="font-mono text-xs tracking-[0.3em] text-primary/50">
            ZELIONTECH.COM
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
