import { Link } from "react-router-dom";

const footerLinks = {
  Protocol: [
    { label: "Technology", href: "/technology" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Tokenomics", href: "/tokenomics" },
    { label: "Contact Us", href: "/contact" },
  ],
  Community: [
    { label: "Telegram", href: "https://t.me/zelionglobal", external: true },
    { label: "Twitter (X)", href: "https://x.com/zelion_tech", external: true },
    { label: "Website", href: "https://www.zeliontech.com", external: true },
    { label: "Email", href: "mailto:info@zeliontech.com", external: false },
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
              Zelion Energy Network enables trustless verification of renewable energy at the source.
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
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
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
            © {new Date().getFullYear()} Zelion. All rights reserved.
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
