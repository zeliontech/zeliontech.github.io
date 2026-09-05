import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { ArrowRight, ExternalLink, Users, Server, Handshake, Vote, Cpu, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";
import TokenAllocation from "@/components/zev/TokenAllocation";

// ZLN token page (brief §11, §13). Parameters and allocation match the
// owner-approved final tokenomics. Utility is labelled Planned throughout:
// the ecosystem services ZLN is designed to settle are not deployed yet.

const CONTRACT = "0x9D9c5C7B7BfC398Ed446b7e53a8Ad8d62DCD0181";

export const PARAMETERS = [
  { label: "Network", value: "BNB Smart Chain" },
  { label: "Token standard", value: "BEP-20" },
  { label: "Maximum supply", value: "500,000,000 ZLN" },
  { label: "Decimals", value: "18" },
  { label: "Transaction tax", value: "0%" },
  { label: "Additional minting", value: "Disabled" },
];

const UTILITIES = [
  { Icon: Server, title: "Access to verified data", body: "Metered access to validated energy data streams and API endpoints." },
  { Icon: Cpu, title: "Renewable-compute services", body: "Access to, and settlement of, verified-compute services across the network." },
  { Icon: Users, title: "Ecosystem participation", body: "Taking part in the network as ZEV deployments and their services come online." },
  { Icon: Handshake, title: "Contributor alignment", body: "Aligning long-term contributors and partners around the infrastructure." },
  { Icon: Lock, title: "Node participation", body: "Operators of validation nodes hold and stake ZLN, aligning them with network integrity." },
  { Icon: Vote, title: "Governance signalling", body: "Advisory signalling on protocol parameters and ecosystem policy." },
];

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
          lede="ZLN is the blockchain-based digital asset of the ZelionTech ecosystem — the digital layer around the physical ZEV infrastructure. Its tokenomics are part of the infrastructure story, not the purpose of the company."
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
                  className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline"
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
                        <dt className="text-[14.5px] text-muted-foreground">{p.label}</dt>
                        <dd className="text-right text-[15px] font-semibold text-foreground">{p.value}</dd>
                      </div>
                    ))}
                    <div className="px-6 py-4">
                      <dt className="text-[14.5px] text-muted-foreground">Contract address</dt>
                      <dd className="mt-1 break-all font-mono text-[12.5px] text-foreground">{CONTRACT}</dd>
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
                The single largest allocation funds compute rewards and ZEV network participation,
                rather than any internal party.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mx-auto mt-12 max-w-4xl">
              <div className="glass-card p-6 sm:p-8 lg:p-10">
                <TokenAllocation />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mx-auto mt-6 max-w-4xl">
              <p className="text-center text-[13.5px] leading-relaxed text-muted-foreground">
                Team and core contributor allocations are subject to long-term vesting. Any tokens
                granted to a partner come from the Strategic Partnerships allocation under the same
                rules, separately from any shareholding in the joint venture.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Utility */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Utility</p>
              <h2 className="headline mt-4">
                What ZLN is designed to <span className="metal-gradient">do.</span>
              </h2>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-[14px] text-muted-foreground">
                <MaturityBadge level="planned" />
                <span>Deployed progressively as ecosystem services come online</span>
              </div>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {UTILITIES.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="glass-card-hover h-full p-6">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ))}
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
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-[14.5px] font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  How carbon actually works here
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/whitepaper"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-[14.5px] font-semibold text-foreground transition-colors hover:bg-muted"
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
