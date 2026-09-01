import { ShieldCheck, FileText, Github, ExternalLink } from "lucide-react";

// Verify-it-yourself strip (light zone, directly under the hero): the three
// primary proof links. URLs are the canonical ones — do not substitute.
const TRUST_LINKS = [
  {
    label: "Verified Contract",
    detail: "0x9D9c…0181 on BscScan",
    href: "https://bscscan.com/address/0x9D9c5C7B7bFC398Ed446b7e53a8Ad8d62DCD0181",
    Icon: ShieldCheck,
  },
  {
    label: "Whitepaper",
    detail: "PDF, v1.0",
    href: "https://github.com/zeliontech/zelion-whitepaper/releases/download/v1.0/Zelion_Whitepaper_v1.0.pdf",
    Icon: FileText,
  },
  {
    label: "Open Source",
    detail: "github.com/zeliontech",
    href: "https://github.com/zeliontech",
    Icon: Github,
  },
];

const TrustStrip = () => {
  return (
    <section aria-label="Verification links" className="container mx-auto px-4 py-8 lg:px-8">
      <div className="glass-card grid divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {TRUST_LINKS.map(({ label, detail, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-accent/40"
          >
            <Icon className="h-5 w-5 shrink-0 text-silver-light" aria-hidden="true" />
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground">
                {label}
                <ExternalLink
                  className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
              <span className="block truncate font-mono text-xs text-muted-foreground">
                {detail}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
