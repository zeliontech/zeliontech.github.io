import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Users, Server, Handshake, Vote } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// ZLN — the digital utility layer (brief §11, §12, §13). One section in
// place of the pre-ZEV Token Utility, Tokenomics Snapshot and Economic Model
// trio: the token's technical parameters, the allocation snapshot, what the
// token is designed to do as ecosystem utilities are deployed (Planned, per
// §12), and the §24 lines — not a financial product, not a carbon credit.

export const PARAMETERS = [
  { label: "Blockchain", value: "BNB Smart Chain" },
  { label: "Token standard", value: "BEP-20" },
  { label: "Maximum supply", value: "500,000,000 ZLN" },
  { label: "Decimals", value: "18" },
  { label: "Transaction tax", value: "0%" },
  { label: "Additional minting", value: "Disabled" },
];

// Owner-approved final allocation. Kept in sync with TokenAllocation.jsx and
// the tokenomics page; percentages must sum to 100.
export const ALLOCATIONS = [
  { label: "Compute Rewards & ZEV Network", pct: 20 },
  { label: "Ecosystem & Infrastructure", pct: 15 },
  { label: "Liquidity & Market Stability", pct: 15 },
  { label: "Core Contributors (Team)", pct: 10 },
  { label: "Private & Strategic Sale", pct: 10 },
  { label: "Public Sale", pct: 10 },
  { label: "Strategic Partnerships", pct: 10 },
  { label: "Community & Marketing", pct: 10 },
];

export const UTILITIES = [
  { Icon: Users, title: "Ecosystem participation", body: "Taking part in the ZelionTech ecosystem as ZEV networks and their services come online." },
  { Icon: Server, title: "Access to ecosystem services", body: "Services built on validated energy data — for operators, integrators and partners." },
  { Icon: Handshake, title: "Contributor alignment", body: "Aligning long-term contributors and participants around the infrastructure being built." },
  { Icon: Vote, title: "Governance signalling", body: "Signalling on ecosystem-level decisions as governance mechanisms are introduced." },
];

const CONTRACT_URL = "https://bscscan.com/address/0x9D9c5C7B7BfC398Ed446b7e53a8Ad8d62DCD0181";

const ZlnLayer = () => {
  return (
    <section id="zln" className="section-bg-subtle relative scroll-mt-16 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light">
            ZLN
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            The <span className="metal-gradient">digital utility layer</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
            ZLN is the blockchain-based digital asset of the ZelionTech ecosystem — the digital layer
            around the physical ZEV infrastructure. Its tokenomics are part of the infrastructure story,
            not the purpose of the company.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          {/* Technical parameters (§11) */}
          <Reveal className="glass-card p-6 lg:col-span-2 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Technical parameters
            </p>
            <dl className="mt-5 divide-y divide-border/60">
              {PARAMETERS.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-sm text-muted-foreground">{p.label}</dt>
                  <dd className="text-right font-heading text-sm font-semibold text-foreground">{p.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={CONTRACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              Token contract on BscScan
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Fixed supply, no transaction tax, no additional minting: the model favours infrastructure
              longevity over rapid expansion.
            </p>
          </Reveal>

          {/* Allocation snapshot (§13) */}
          <Reveal delay={0.08} className="glass-card p-6 lg:col-span-3 lg:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Allocation of the 500,000,000 ZLN maximum supply
              </p>
              <Link to="/tokenomics" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Full tokenomics
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            {/* Single-hue supply bar with a 2px gap between segments, so the
                four allocations that share 10% stay individually readable.
                Identity comes from the labelled list below, never colour. */}
            <div className="mt-5 flex h-3 w-full gap-[2px] overflow-hidden rounded-full" role="presentation">
              {ALLOCATIONS.map((a, i) => (
                <div
                  key={a.label}
                  className="h-full rounded-full"
                  style={{
                    width: `${a.pct}%`,
                    backgroundColor: "hsl(var(--primary))",
                    opacity: i % 2 === 0 ? 1 : 0.62,
                  }}
                />
              ))}
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {ALLOCATIONS.map((a, i) => (
                <li key={a.label} className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3.5 py-2.5">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--primary))", opacity: i % 2 === 0 ? 1 : 0.62 }}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm text-foreground">{a.label}</span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">{a.pct}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Team and core contributor allocations follow long-term vesting.
            </p>
          </Reveal>
        </div>

        {/* Designed utility (§12: as those utilities are deployed) */}
        <div className="mx-auto mt-8 max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5 text-sm text-muted-foreground">
            <MaturityBadge level="planned" />
            <span>What ZLN is designed to do as ecosystem utilities are deployed</span>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UTILITIES.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="glass-card h-full p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">ZLN is a utility token, not a financial product.</span>{" "}
            It does not represent equity, ownership or a share of revenue, and it is not a carbon credit —
            a carbon credit is a separately verified environmental asset issued under its own standard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ZlnLayer;
