import { Link } from "react-router-dom";
import { Linkedin, Send } from "lucide-react";
import { trackExternalLink } from "@/services/analyticsService";

// Footer per the approved design reference: wordmark and one-line positioning
// on the left, page links in the middle, channel icons on the right, then a
// hairline rule with the copyright and the closing line.

const pageLinks = [
  { label: "Home", to: "/" },
  { label: "ZEV", to: "/zev" },
  { label: "ZLN", to: "/tokenomics" },
  { label: "Carbon Credits", to: "/carbon" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Whitepaper", to: "/whitepaper" },
  { label: "Disclaimer", to: "/legal" },
  { label: "Privacy Policy", to: "/privacy" },
];

// X, Instagram and GitHub have no Lucide glyph, so they are drawn inline to
// keep every icon on the same 20px optical grid.
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zeliontech/", Icon: Linkedin },
  { label: "X", href: "https://x.com/zelion_tech", Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/zeliontech_zev/", Icon: InstagramIcon },
  { label: "Telegram", href: "https://t.me/zelionglobal", Icon: Send },
  { label: "GitHub", href: "https://github.com/zeliontech", Icon: GithubIcon },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-14 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5" aria-label="ZelionTech home">
              <img src="/logo.svg" alt="" className="h-8 w-8" width="32" height="32" />
              <span className="font-body text-[22px] font-bold tracking-[-0.03em] text-foreground">
                ZelionTech
              </span>
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Technology for a cleaner, more transparent world.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-10 gap-y-8">
            <div>
              <h2 className="eyebrow mb-4">Explore</h2>
              <ul className="space-y-2.5">
                {pageLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[15px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-4">Resources</h2>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[15px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:info@zeliontech.com"
                    className="text-[15px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    info@zeliontech.com
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Channels */}
          <div>
            <h2 className="eyebrow mb-4">Follow</h2>
            <ul className="flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLink(href, label)}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted-foreground">
            © {new Date().getFullYear()} ZelionTech. All rights reserved.
          </p>
        </div>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
          $ZLN is a utility token, not a financial product. This site is published for information
          only; participation in decentralised infrastructure involves risk. Read the{" "}
          <Link to="/legal" className="underline underline-offset-2 hover:text-foreground">
            legal disclaimer
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
