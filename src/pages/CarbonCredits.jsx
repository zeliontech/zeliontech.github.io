import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import {
  Leaf, Gauge, FileCheck2, Link2, ClipboardCheck, BadgeCheck, ArrowRight, ArrowDown, Building2, Factory, Sun,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";

// Carbon page (brief §9, §10). The single most claim-sensitive page on the
// site: ZEV supplies evidence for MRV and carbon accounting, and does not
// issue, certify or guarantee credits. Every statement here is written so it
// survives scrutiny from an auditor or a registry.

export const CHAIN = [
  { Icon: Sun, title: "Renewable generation", body: "Solar, wind, hydro or another renewable source produces electricity at a site.", who: "The asset" },
  { Icon: Gauge, title: "ZEV measurement", body: "The reading is taken at the equipment itself rather than reported afterwards.", who: "ZEV", level: "demonstrated" },
  { Icon: FileCheck2, title: "Validated energy data", body: "The record is checked, hashed and timestamped on the device.", who: "ZEV", level: "demonstrated" },
  { Icon: Link2, title: "Digital audit trail", body: "The proof is anchored on-chain, so later alteration is detectable by anyone.", who: "ZEV", level: "demonstrated" },
  { Icon: ClipboardCheck, title: "MRV and carbon accounting", body: "The data feeds methodology-based calculation performed by the responsible party.", who: "Project developer", level: "planned" },
  { Icon: BadgeCheck, title: "Independent verification", body: "An accredited validation and verification body reviews the claim.", who: "Third party" },
  { Icon: Leaf, title: "Credit issuance", body: "A registry decides, under the applicable standard. ZEV plays no part in this step.", who: "Registry" },
];

const USES = [
  { Icon: Building2, title: "Corporate ESG disclosure", body: "Machine-verifiable energy evidence for Scope 1 and 2 reporting under CSRD, SFDR and comparable frameworks." },
  { Icon: Factory, title: "Project developers", body: "A stronger evidence base for renewable projects preparing methodology-driven submissions." },
  { Icon: BadgeCheck, title: "Verification bodies", body: "Source-level data that reduces reliance on self-reported figures during assessment." },
];

const CarbonCredits = () => {
  usePageMeta({
    title: "Carbon data and MRV | ZelionTech",
    description:
      "How validated energy data from ZEV is designed to support carbon accounting, ESG reporting and digital measurement, reporting and verification processes.",
    path: "/carbon",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        {/* Hero */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">Carbon credits</p>
                <h1 className="display mt-5">
                  Verified today.
                  <br />A cleaner <span className="text-eco">tomorrow.</span>
                </h1>
                <p className="lede mt-6 max-w-xl">
                  Carbon markets lost confidence because the evidence behind credits was weak.
                  ZEV attacks that at the source: energy data measured on the device, validated
                  there, and anchored where anyone can check it.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/contact" primary>Talk to ZelionTech</Button>
                  <Button to="/zev">How ZEV works</Button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-border bg-card p-7 lg:p-8">
                  <Leaf className="h-9 w-9 text-eco" strokeWidth={1.6} aria-hidden="true" />
                  <p className="mt-5 text-[15px] font-semibold leading-snug text-foreground">
                    What ZEV does, stated precisely
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    ZEV is designed to provide trusted, traceable and auditable energy data that
                    can support carbon accounting and digital measurement, reporting and
                    verification.
                  </p>
                  <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">ZEV does not issue carbon credits.</span>{" "}
                    Issuance requires an accepted methodology, project registration and
                    independent verification under the applicable standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The chain */}
        <section className="section section-bg-alternate">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">The evidence chain</p>
              <h2 className="headline mt-4">
                Where ZEV stops, and who takes <span className="metal-gradient">over.</span>
              </h2>
              <p className="lede mx-auto mt-5 max-w-2xl">
                Being explicit about the handover is the point. ZEV owns the first four steps.
                Everything after them belongs to parties with the standing to decide.
              </p>
            </Reveal>

            <ol className="mx-auto mt-12 max-w-3xl">
              {CHAIN.map(({ Icon, title, body, who, level }, i) => (
                <Reveal key={title} delay={i * 0.04}>
                  <li className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                          i < 4 ? "border-eco/30 bg-eco/10 text-eco" : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      {i < CHAIN.length - 1 && (
                        <span aria-hidden="true" className="my-1 flex-1">
                          <ArrowDown className="h-4 w-4 text-border" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pb-8">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[16px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {who}
                        </span>
                        {level && <MaturityBadge level={level} />}
                      </div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Who it serves */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Who it serves</p>
              <h2 className="headline mt-4">
                Evidence the whole chain can <span className="metal-gradient">rely on.</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {USES.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="glass-card-hover h-full p-7">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="subhead mt-5">{title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ZLN separation (brief §10) */}
        <section className="section pt-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
              <h2 className="subhead">ZLN is not a carbon credit</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                ZLN is the ZelionTech ecosystem&apos;s utility token. A carbon credit is a
                separately verified environmental asset, issued by an independent body under an
                applicable standard. They are different instruments. Holding ZLN does not
                represent holding a carbon credit, and nothing on this page should be read as
                suggesting otherwise.
              </p>
              <Link
                to="/tokenomics"
                className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline"
              >
                What ZLN actually is
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Small local button so this page does not depend on the shadcn variant set.
const Button = ({ to, children, primary }) => (
  <Link
    to={to}
    className={`inline-flex h-12 items-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-colors ${
      primary
        ? "bg-foreground text-background hover:bg-foreground/90"
        : "border border-border bg-card text-foreground hover:bg-muted"
    }`}
  >
    {children}
    <ArrowRight className="h-4 w-4" aria-hidden="true" />
  </Link>
);

export default CarbonCredits;
