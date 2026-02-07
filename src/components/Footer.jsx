import { Link } from "react-router-dom";

const footerLinks = {
  Protocol: [
    { label: "Technology", href: "/technology" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Tokenomics", href: "/tokenomics" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Telegram", href: "#" },
  ],
  Legal: [
    { label: "Disclaimer", href: "/legal" },
    { label: "Privacy Policy", href: "/legal" },
    { label: "Terms of Use", href: "/legal" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted">
                <span className="font-heading text-sm font-bold text-silver-light">Z</span>
              </div>
              <span className="font-heading text-lg font-semibold tracking-wider text-foreground">
                ZELION
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Zelion is designed for infrastructure validation, deterministic data processing, and long-term system deployment.
              $ZLN is a utility token used for ecosystem coordination and does not represent ownership, equity, or profit-sharing.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Zelion Protocol. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            $ZLN is a utility token. Not a financial product.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
