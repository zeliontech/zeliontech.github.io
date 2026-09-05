import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { Download, ArrowRight, FileText, Cpu, Coins, Leaf, ScrollText, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";
import { trackWhitepaperDownload } from "@/services/analyticsService";

// Whitepaper page on the approved light design system.
//
// The abstract shown here is written to the same claims discipline as the
// rest of the site (brief §24). The previous version asserted "Byzantine
// fault tolerant multi-node verification", "tamper-resistant hardware
// validators with cryptographic attestation" and operation "without
// centralized trust assumptions" as present fact; none of that is
// demonstrated, so it has been replaced with what the proof of concept
// actually showed and what the industrial platform is designed to add.

// PUBLISHED PDF: this points at the currently published release. When the
// next edition is published, update this URL and the version label together.
const PDF_URL =
  "https://github.com/zeliontech/zelion-whitepaper/releases/download/v1.0/Zelion_Whitepaper_v1.0.pdf";

export const CHAPTERS = [
  { Icon: FileText, title: "Origin and structure", body: "How the project began, what ZelionTech built before any joint venture, and how the work is divided now." },
  { Icon: Cpu, title: "The ZEV device", body: "What the hardware reads, how a measurement becomes a signed record, and the honest status of each capability." },
  { Icon: ScrollText, title: "Validation and architecture", body: "The chain from reading to anchored proof, and what goes on-chain versus what stays off it." },
  { Icon: Leaf, title: "Carbon, compute and MRV", body: "Where validated energy data is useful, and precisely where ZEV's role ends." },
  { Icon: Coins, title: "ZLN and tokenomics", body: "Token parameters, the final allocation, vesting, governance and treasury controls." },
  { Icon: Users, title: "Leadership and legal", body: "Who runs the project, how decisions are made, and the risk and disclaimer position." },
];

const Whitepaper = () => {
  usePageMeta({
    title: "Whitepaper | ZelionTech",
    description:
      "The ZelionTech whitepaper: ZEV, the ZLN token, the ecosystem architecture and the roadmap, with every capability labelled by its maturity.",
    path: "/whitepaper",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="Documentation"
          title={
            <>
              The technical <span className="metal-gradient">whitepaper.</span>
            </>
          }
          lede="The full account of ZEV and ZLN: what has been demonstrated, what is being engineered, how the project is owned and governed, and the terms on which any of it should be read."
        />

        {/* Download */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal>
              <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-3xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
                <div>
                  <h2 className="subhead">Download the whitepaper</h2>
                  <p className="mt-2 text-[15px] text-muted-foreground">
                    PDF · published edition
                  </p>
                </div>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhitepaperDownload()}
                  className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-colors hover:bg-foreground/90"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What is inside */}
        <section className="section section-bg-alternate pt-0 lg:pt-0">
          <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">What is inside</p>
              <h2 className="headline mt-4">
                Written to be <span className="metal-gradient">checked.</span>
              </h2>
              <p className="lede mx-auto mt-5 max-w-2xl">
                Every capability in the document carries its real status, and the token figures can
                be reconciled against the contract on-chain.
              </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CHAPTERS.map(({ Icon, title, body }, i) => (
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

        {/* Abstract */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl">
              <p className="eyebrow">Abstract</p>
              <h2 className="headline mt-4">In short</h2>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Renewable-energy data is mostly self-reported. It passes through several parties
                  before anyone relies on it, and by the time it reaches a report there is no
                  practical way to check that it still describes what the equipment actually did.
                </p>
                <p>
                  ZEV moves the point of trust to the equipment. The device reads the measurement
                  on site, checks it, hashes it and timestamps it, then anchors that proof on BNB
                  Smart Chain. The raw data stays off-chain; what goes on-chain is the evidence.
                  Anyone holding the original record can recompute its hash and compare, which
                  means verification does not require trusting ZelionTech.
                </p>
                <p>
                  The ZEV Lite proof of concept demonstrated that chain end to end in a controlled
                  environment, using an ESP32-based controller and energy-meter integration. The
                  ZEV Pro industrial platform is being engineered to add industrial metering,
                  secure-element device identity, inverter, battery and grid integration, AI
                  anomaly detection at the edge, and enterprise interfaces.
                </p>
                <p>
                  ZLN is the ecosystem&apos;s digital utility layer: a fixed supply of 500,000,000
                  on BNB Smart Chain, with no transaction tax and minting disabled. It coordinates
                  participation and settles ecosystem services as those services are deployed. It
                  is not a financial product and it is not a carbon credit.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <MaturityBadge level="demonstrated" />
                  <span>ZEV Lite proof of concept</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <MaturityBadge level="in-development" />
                  <span>ZEV Pro industrial platform</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Onward links */}
        <section className="section pt-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {[
                { to: "/zev", label: "Inside the device" },
                { to: "/tokenomics", label: "ZLN and tokenomics" },
                { to: "/carbon", label: "Carbon and MRV" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="glass-card-hover flex items-center justify-between gap-3 p-5 text-[15px] font-semibold text-foreground"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
