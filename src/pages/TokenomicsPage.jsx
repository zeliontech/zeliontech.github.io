import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { ArrowRight, ExternalLink, Server, Coins, Leaf, Wallet, Vote, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";
import TokenAllocation from "@/components/zev/TokenAllocation";

// ZLN token page (brief §11, §13). Parameters and allocation match the
// owner-approved final tokenomics. Utility is labelled Planned throughout:
// the ecosystem services ZLN is designed to settle are not deployed yet. The
// utility list, the reward model and the private-sale schedule follow the
// founders' project updates of October 2026 (community edition): pay, earn,
// advise, and no stake required to run a device.

import { CONTRACT, PARAMETERS, PRIVATE_SALE, REWARDS } from "@/components/zev/zln";

const UTILITIES = [
  { Icon: Server, title: "Pay for ZEV services", body: "Payments in ZLN for eligible energy-data access, validation and reporting services, as those services launch." },
  { Icon: Coins, title: "Earn contribution rewards", body: "Eligible device operators receive existing ZLN from funded reward budgets, based on their verified contribution." },
  { Icon: Leaf, title: "Carbon-sale bonus", body: "When issued credits from an eligible project are sold and paid for, the customer's agreed net proceeds can be settled in ZLN." },
  { Icon: Wallet, title: "Claim to your own wallet", body: "Rewards are claimed to the operator's own paired wallet. Network fees are paid in BNB, separately from ZLN." },
  { Icon: Vote, title: "Advisory input", body: "Signalling on protocol settings and ecosystem policy, as the ecosystem matures. Advisory only, with no corporate voting rights." },
  { Icon: ShieldCheck, title: "Clear boundaries", body: "No ZLN stake or subscription is needed to run a ZEV prototype. ZLN is not a carbon credit, and service utility is still in development." },
];

// Cumulative release, drawn as ten bars: launch, then months 1 to 9.
const ReleaseChart = ({ schedule }) => (
  <figure className="mt-6">
    {/* Bars are sized against the plot area alone; the first and last
        values sit above their bars in the top padding, so a label never
        takes height away from the bar it names. */}
    <div
      role="img"
      aria-label="Cumulative share of purchased tokens released: 10% at launch, rising by 10% each month to 100% at month 9."
      className="flex h-40 items-end gap-1.5 pt-6 sm:gap-2"
    >
      {schedule.map((pct, i) => (
        <div key={pct} className="relative flex h-full flex-1 items-end">
          <span
            aria-hidden="true"
            className="block w-full rounded-t-md"
            style={{
              height: `${pct}%`,
              background:
                i === 0
                  ? "hsl(var(--eco))"
                  : `linear-gradient(to top, hsl(var(--primary) / ${0.55 + i * 0.045}), hsl(var(--primary) / ${0.3 + i * 0.05}))`,
            }}
          />
          {(i === 0 || i === schedule.length - 1) && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 text-center text-[11px] font-semibold tabular-nums text-foreground"
              style={{ bottom: `calc(${pct}% + 6px)` }}
            >
              {pct}%
            </span>
          )}
        </div>
      ))}
    </div>
    <div aria-hidden="true" className="mt-2 flex gap-1.5 border-t border-border pt-2 sm:gap-2">
      {schedule.map((pct, i) => (
        <span key={pct} className="flex-1 text-center text-[11px] tabular-nums text-muted-foreground">
          {i === 0 ? "Launch" : `M${i}`}
        </span>
      ))}
    </div>
  </figure>
);

const TokenomicsPage = () => {
  usePageMeta({
    title: "ZLN token and tokenomics | ZelionTech",
    description:
      "ZLN is the digital utility layer of the ZelionTech ecosystem: technical parameters, the allocation of the fixed 500,000,000 supply and what the token is designed to do.",
    path: "/tokenomics",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="ZLN token"
          title={
            <>
              The digital utility <span className="metal-gradient">layer.</span>
            </>
          }
          lede="ZLN is the blockchain-based digital asset of the ZelionTech ecosystem, the digital layer around the physical ZEV infrastructure. Its tokenomics are part of the infrastructure story, not the purpose of the company."
        />

        {/* Parameters */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="eyebrow">Token parameters</p>
                <h2 className="headline mt-4">Fixed supply. No tax. No minting.</h2>
                <p className="lede mt-5">
                  The contract is deployed, its source is verified on BscScan with an exact match,
                  and the supply cannot be increased. Anyone can check all of it.
                </p>
                <a
                  href={`https://bscscan.com/address/${CONTRACT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
                >
                  View the contract on BscScan
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-7">
                <div className="glass-card overflow-hidden">
                  <dl className="divide-y divide-border">
                    {PARAMETERS.map((p) => (
                      <div key={p.label} className="flex items-baseline justify-between gap-4 px-6 py-4">
                        <dt className="text-[15px] text-muted-foreground">{p.label}</dt>
                        <dd className="text-right text-[15px] font-semibold text-foreground">{p.value}</dd>
                      </div>
                    ))}
                    <div className="px-6 py-4">
                      <dt className="text-[15px] text-muted-foreground">Contract address</dt>
                      <dd className="mt-1 break-all font-mono text-[13px] text-foreground">{CONTRACT}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Allocation */}
        <section className="section section-bg-alternate">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Allocation</p>
              <h2 className="headline mt-4">
                Weighted toward the <span className="metal-gradient">network.</span>
              </h2>
              <p className="lede mx-auto mt-5 max-w-2xl">
                The single largest allocation funds ZEV network rewards and participation, rather
                than any internal party. Six headings, with ecosystem and partnerships kept apart.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mx-auto mt-12 max-w-4xl">
              <div className="glass-card p-6 sm:p-8 lg:p-10">
                <TokenAllocation />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mx-auto mt-6 max-w-4xl">
              <p className="text-center text-[15px] leading-relaxed text-muted-foreground">
                Team and core contributor allocations are subject to long-term vesting. The private
                sale release is set out below.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Release policy: the private sale */}
        <section id="private-sale" className="section scroll-mt-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="eyebrow">Release policy</p>
                <h2 className="headline mt-4">
                  Private sale, in ten equal <span className="metal-gradient">releases.</span>
                </h2>
                <p className="lede mt-5">
                  Launch means the start of public trading in ZLN. Tokens becoming available under a
                  schedule do not automatically enter circulation.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
                >
                  Private-sale enquiries: contact the team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-7">
                <div className="glass-card p-6 lg:p-8">
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-foreground">
                    Private sale ({PRIVATE_SALE.pool})
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{PRIVATE_SALE.release}</p>
                  <ReleaseChart schedule={PRIVATE_SALE.schedule} />
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground">{PRIVATE_SALE.example}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{PRIVATE_SALE.monthNote}</p>
                </div>

                <div className="glass-card mt-5 p-6 lg:p-8">
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-foreground">
                    Private sale participation
                  </h3>
                  <dl className="mt-4 divide-y divide-border">
                    {PRIVATE_SALE.participation.map((row) => (
                      <div key={row.label} className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[9rem_1fr]">
                        <dt className="text-[15px] font-semibold text-foreground">{row.label}</dt>
                        <dd className="text-[15px] leading-relaxed text-muted-foreground">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">{PRIVATE_SALE.notice}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Utility */}
        <section className="section section-bg-alternate">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Utility</p>
              <h2 className="headline mt-4">
                What ZLN is designed to <span className="metal-gradient">do.</span>
              </h2>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-[15px] text-muted-foreground">
                <MaturityBadge level="planned" />
                <span>Deployed progressively as ecosystem services come online</span>
              </div>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {UTILITIES.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="glass-card-hover h-full p-6">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="mt-5 text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contribution rewards */}
        <section id="rewards" className="section scroll-mt-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <p className="eyebrow">Contribution rewards</p>
                <h2 className="headline mt-4">
                  Earned by the <span className="metal-gradient">machine.</span>
                </h2>
                <p className="lede mt-5">
                  ZEV operators are designed to earn ZLN for verified renewable participation, not
                  for holding the token.
                </p>
                <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                  <p className="font-body text-[56px] font-bold leading-none tracking-[-0.045em] text-eco">
                    {REWARDS.gate}
                  </p>
                  <p className="mt-3 text-[15px] leading-snug text-muted-foreground">{REWARDS.gateLabel}</p>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-8">
                <ol className="grid gap-5 sm:grid-cols-2">
                  {REWARDS.steps.map((step, i) => (
                    <li key={step.title} className="glass-card h-full p-6">
                      <span className="step-dot">{i + 1}</span>
                      <h3 className="mt-5 text-[17px] font-bold tracking-[-0.01em] text-foreground">{step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  <MaturityBadge level="planned" className="mt-px" />
                  <span className="min-w-0 flex-1">{REWARDS.note}</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What it is not */}
        <section className="section pt-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
              <h2 className="subhead">What ZLN is not</h2>
              <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Not a financial product.</span> ZLN
                  does not represent equity, ownership, or a share of revenue or profit in
                  ZelionTech or any related entity.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Not a carbon credit.</span> A
                  carbon credit is a separately verified environmental asset issued by an
                  independent body under an applicable standard. Holding ZLN does not represent
                  holding one.
                </p>
                <p>
                  ZLN is designed and intended to function as a utility and coordination token
                  within the ZEV ecosystem. Its legal or regulatory classification may differ
                  between jurisdictions. Nothing here is investment advice.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/carbon"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  How carbon actually works here
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/whitepaper"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Read the whitepaper
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TokenomicsPage;
