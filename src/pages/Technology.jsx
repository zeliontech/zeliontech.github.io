import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import {
  Sun,
  Wind,
  Waves,
  BatteryCharging,
  Zap,
  Network,
  Gauge,
  Factory,
  Boxes,
  Fingerprint,
  ShieldCheck,
  KeyRound,
  Lock,
  Link2,
  FileBadge2,
  Hash,
  Clock,
  Database,
  LayoutDashboard,
  Code2,
  Server,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader, { SectionPills } from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";
import ValidationPipeline from "@/components/zev/ValidationPipeline";
import ZevScenePicture from "@/components/zev/ZevScenePicture";
import DigitalUtilities from "@/components/zev/DigitalUtilities";
import UseCases from "@/components/zev/UseCases";
import { DevelopmentToDesign, ZevProShowcase } from "@/components/zev/ZevProFigures";
import { EXPOFIN_PRODUCTS, EXPOFIN_URL } from "@/components/zev/expofin";

// Technology page (ZEV brief §16: hardware, Secure Element, blockchain,
// energy data, validation, APIs, security). Content follows brief §3–§5 and
// §15, with the device line-up of the founders' project update of October
// 2026: one demonstrated proof of concept, then two dedicated prototypes,
// ZEV Lite and ZEV Pro, developed in parallel and both signing through a
// secure element. Claims discipline (§24): only the proof-of-concept list is
// labelled Demonstrated.

const PILLS = [
  { label: "Energy data", href: "#energy-data" },
  { label: "Validation", href: "#validation" },
  { label: "Devices", href: "#hardware" },
  { label: "Security", href: "#security" },
  { label: "Blockchain", href: "#blockchain" },
  { label: "APIs", href: "#apis" },
  { label: "Utilities", href: "#utilities" },
  { label: "Use cases", href: "#use-cases" },
];

// Brief §2 input list, with the owner's note that renewable generation is
// not only solar: wind, hydro and any other renewable source count.
export const SOURCES = [
  { Icon: Sun, label: "Solar PV" },
  { Icon: Wind, label: "Wind turbines" },
  { Icon: Waves, label: "Hydro and other renewable generation" },
  { Icon: BatteryCharging, label: "Battery energy storage" },
  { Icon: Zap, label: "Electrical grid connection" },
  { Icon: Network, label: "Inverters" },
  { Icon: Gauge, label: "Smart meters and energy meters" },
  { Icon: Factory, label: "Commercial and industrial energy systems" },
  { Icon: Boxes, label: "Distributed energy assets" },
];

const SIGNALS = [
  "Energy production",
  "Energy consumption",
  "Voltage",
  "Current",
  "Power",
  "Grid interaction (import / export)",
  "Renewable generation",
  "Battery behaviour",
  "Equipment status",
  "Energy flows",
];

const INTEGRATIONS = [
  { label: "Energy meter integration", level: "demonstrated", note: "ZEV Lite proof of concept" },
  { label: "Inverter integration", level: "planned", note: "ZEV Pro" },
  { label: "Battery integration", level: "planned", note: "ZEV Pro" },
  { label: "Grid integration", level: "planned", note: "ZEV Pro" },
];

// Brief §15: what the ZEV Lite proof of concept demonstrated.
export const POC = [
  "ESP32-based controller",
  "Energy meter integration",
  "Wi-Fi / network communication",
  "Energy-data processing",
  "SHA-256 hashing",
  "Timestamping",
  "BNB Smart Chain interaction",
  "On-chain energy-data proof",
  "Dashboard visualization",
];

// The two dedicated prototypes now in development (project update, October
// 2026). Both carry the same verification foundation and secure-element
// signing; ZEV Pro adds industrial integration and computing powered by
// stored surplus energy.
export const ZEV_LITE = [
  "Dedicated validation hardware",
  "Energy measurement for connected systems",
  "Record checking and hashing",
  "Secure-element signing",
  "BNB Smart Chain anchoring",
  "Contribution rewards for operators",
];

export const ZEV_PRO = [
  "The ZEV Lite verification foundation",
  "Industrial hardware",
  "Inverter, battery and grid integration",
  "Computing powered by stored surplus energy",
  "Tamper detection",
  "Carbon / MRV data",
  "Enterprise APIs",
  "Scalable deployment",
];

// Brief §4: the five things security should communicate.
export const TRUST_CHAIN = [
  {
    Icon: Fingerprint,
    title: "Physical device identity",
    body: "Each ZEV is designed to carry a unique identity protected inside a hardware Secure Element, so a record can be tied to one specific device.",
    level: "planned",
  },
  {
    Icon: ShieldCheck,
    title: "Secure energy data",
    body: "Readings are checked for integrity and hashed on the device before they leave it — the proof of concept already does this with SHA-256.",
    level: "demonstrated",
  },
  {
    Icon: KeyRound,
    title: "Cryptographic signing",
    body: "Both the ZEV Lite and ZEV Pro prototypes sign records through a secure element, with a key that never leaves it.",
    level: "in-development",
  },
  {
    Icon: Lock,
    title: "Tamper-resistant architecture",
    body: "Hardware and firmware designed to detect and resist physical or software interference with the device.",
    level: "planned",
  },
  {
    Icon: Link2,
    title: "Blockchain verification",
    body: "Hashes anchored on BNB Smart Chain let anyone verify a record independently of ZelionTech.",
    level: "demonstrated",
  },
];

const ON_CHAIN = [
  { Icon: Hash, label: "SHA-256 hash of the record" },
  { Icon: Clock, label: "Timestamp" },
  { Icon: Link2, label: "Transaction reference" },
];

const OFF_CHAIN = [
  { Icon: Database, label: "Raw measurements" },
  { Icon: Gauge, label: "Equipment telemetry" },
  { Icon: LayoutDashboard, label: "Dashboards and analytics" },
];

const INTERFACES = [
  {
    Icon: LayoutDashboard,
    title: "Energy dashboard",
    body: "The proof of concept visualises validated readings for the operator.",
    level: "demonstrated",
  },
  {
    Icon: Code2,
    title: "Enterprise APIs",
    body: "Programmatic access to validated records for operators, ESG and MRV systems and partners.",
    level: "planned",
  },
  {
    Icon: Server,
    title: "Scalable deployment",
    body: "Provisioning and management for networks of ZEV nodes rather than single machines.",
    level: "planned",
  },
];


const SectionHead = ({ eyebrow, title, lede, align = "center" }) => (
  <div className={`mb-12 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
    <p className="eyebrow">
      {eyebrow}
    </p>
    <h2 className="headline mt-4">{title}</h2>
    {lede && <p className="lede mt-4">{lede}</p>}
  </div>
);

const IconTile = ({ Icon, tone = "primary" }) => (
  <span
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
    style={{
      borderColor: tone === "emerald" ? "hsl(var(--eco) / 0.3)" : "hsl(var(--primary) / 0.3)",
      backgroundColor: tone === "emerald" ? "hsl(var(--eco) / 0.07)" : "hsl(var(--primary) / 0.08)",
      color: tone === "emerald" ? "hsl(var(--eco))" : "hsl(var(--primary))",
    }}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </span>
);

const Technology = () => {
  usePageMeta({
    title: "ZEV, the Zelion Energy Validator | ZelionTech",
    description:
      "Inside ZEV: the hardware that reads renewable-energy equipment on site, the validation chain that turns a reading into a verifiable record, and the ZEV Lite and ZEV Pro prototypes now in development.",
    path: "/zev",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main">
        <PageHeader
          eyebrow="The ZEV device"
          title={
            <>
              Inside <span className="metal-gradient">ZEV.</span>
              <br />
              Hardware, cryptography, blockchain.
            </>
          }
          lede="What the Zelion Energy Validator is made of: the hardware that reads renewable-energy equipment on site, the validation chain that turns a reading into a record anyone can verify, and the two prototypes now in development, ZEV Lite and ZEV Pro."
          legend
          media={
            <ZevScenePicture
              aspect="aspect-[4/3]"
              position="object-[38%_50%]"
              placeholderPosition="38% 50%"
              sizes="(min-width: 1024px) 520px, 100vw"
              priority
            />
          }
        >
          <SectionPills items={PILLS} />
        </PageHeader>

        {/* ── Energy data (§3A) ─────────────────────────────────────────── */}
        <section id="energy-data" className="scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Energy data"
              title="What ZEV reads"
              lede="ZEV connects to the electrical and renewable-energy equipment on site — solar, wind, hydro or any other source, plus storage, inverters, meters and the grid connection — and turns what that equipment does physically into structured digital information."
            />
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
              <Reveal className="glass-card p-6 sm:p-8 lg:col-span-3">
                <p className="text-[13px] font-medium text-muted-foreground">
                  Connected infrastructure
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SOURCES.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-[15px] text-foreground">
                      <IconTile Icon={Icon} tone="emerald" />
                      {label}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                  Which of these a given ZEV connects to depends on the installation and the equipment it is
                  configured for.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="glass-card p-6 sm:p-8 lg:col-span-2">
                <p className="text-[13px] font-medium text-muted-foreground">
                  Information ZEV can process
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {SIGNALS.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] font-medium text-muted-foreground">
                  Integration status
                </p>
                <ul className="mt-3 space-y-2.5">
                  {INTEGRATIONS.map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 text-[15px]">
                      <MaturityBadge level={item.level} className="mt-px shrink-0" />
                      <span>
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground"> — {item.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Reference equipment: the joint-venture partner's installed
                base, the generation, storage and charging equipment ZEV is
                being designed to read first. Product names and descriptions
                are Expofin's own; no performance figures are repeated here,
                and the whole row is labelled Upcoming because the proof of
                concept integrates an energy meter only. */}
            <Reveal delay={0.12} className="mx-auto mt-6 max-w-6xl">
              <div className="glass-card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
                  <div className="max-w-2xl">
                    <p className="text-[13px] font-medium text-muted-foreground">
                      Reference equipment · Expofin E.S.Co.
                    </p>
                    <h3 className="mt-1 subhead">The installed base ZEV is designed to read first</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      ZelionTech&apos;s joint-venture partner builds and installs the equipment below.
                      ZEV is being designed to read it first, through the meters, inverters and
                      storage controllers on site.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                    <MaturityBadge level="planned" />
                    <span>ZEV integration</span>
                  </div>
                </div>

                <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {EXPOFIN_PRODUCTS.map((p) => (
                    <li key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-4">
                      <div className="flex h-44 items-center justify-center rounded-xl bg-muted/60 p-5">
                        {/* min-w-0: a flex item will not shrink below the
                            render's intrinsic width otherwise, and the tile
                            overflows on phones once the lazy image lands. */}
                        <picture className="flex min-w-0 max-w-full justify-center">
                          <source type="image/avif" srcSet={p.avif} sizes="220px" />
                          <source type="image/webp" srcSet={p.webp} sizes="220px" />
                          <img
                            src={p.fallback}
                            srcSet={p.png}
                            sizes="220px"
                            width={p.width}
                            height={p.height}
                            alt={`${p.name}, Expofin ${p.kind.toLowerCase()}`}
                            loading="lazy"
                            decoding="async"
                            className="max-h-36 w-auto max-w-full object-contain"
                            draggable={false}
                          />
                        </picture>
                      </div>
                      <p className="mt-4 text-[13px] font-medium text-muted-foreground">{p.kind}</p>
                      <h4 className="mt-0.5 text-[17px] font-bold tracking-[-0.01em] text-foreground">{p.name}</h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                  Also in Expofin&apos;s range: Hydrovolt hybrid photovoltaic and thermal panels, Solar
                  Bloom vertical agrivoltaics and the Infinity Tower. Product pages on{" "}
                  <a
                    href={EXPOFIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    expofin.eu
                  </a>{" "}
                  (Italian); the whole range and the partnership on the{" "}
                  <Link to="/partners" className="font-medium text-foreground underline-offset-4 hover:underline">
                    Partners page
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Validation (§3B / §5) ─────────────────────────────────────── */}
        <section id="validation" className="section-bg-alternate scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Validation"
              title="From a reading to a verifiable record"
              lede="Energy information should not simply appear on a dashboard. Every reading passes through the same chain: measured, processed, hashed, timestamped, anchored on-chain, verifiable by anyone. Step through it."
            />
            <div className="mx-auto max-w-6xl">
              <ValidationPipeline />
            </div>
          </div>
        </section>

        {/* ── Devices (§15, project update of October 2026) ─────────────── */}
        <section id="hardware" className="scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Devices"
              title="Two devices, one energy network"
              lede="The ZEV Lite proof of concept showed the idea works end to end. Dedicated ZEV Lite and ZEV Pro prototypes are now being developed in parallel, both with secure-element signing."
            />

            {/* The owner's ZEV Pro material of 26 October 2026: the
                development assembly beside the enclosure concept. */}
            <DevelopmentToDesign />

            <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-3">
              <Reveal className="glass-card p-6 sm:p-8">
                <div>
                  <p className="text-[13px] font-medium text-muted-foreground">ZEV Lite</p>
                  <h3 className="mt-1 subhead">Proof of concept</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Shown working end to end: energy data captured by hardware, hashed, timestamped and
                  anchored on BNB Smart Chain.
                </p>
                <ul className="mt-5 grid gap-2">
                  {POC.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] text-foreground">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-eco" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {/* The two prototypes share one list treatment: a hollow azure dot
                  for what is being engineered, against the solid eco dot of
                  what the proof of concept showed. */}
              {[
                { name: "ZEV Lite", title: "Dedicated prototype", body: "Validation hardware for connected energy equipment, now in development.", items: ZEV_LITE },
                { name: "ZEV Pro", title: "Industrial prototype", body: "Developed alongside ZEV Lite on the same signing foundation, for industrial sites such as the solar and storage installations Expofin builds.", items: ZEV_PRO },
              ].map((device, i) => (
                <Reveal
                  key={device.name}
                  delay={0.06 * (i + 1)}
                  className={`glass-card p-6 sm:p-8 ${i === 1 ? "ring-1 ring-primary/20" : ""}`}
                >
                  <div>
                    <p className="text-[13px] font-medium text-muted-foreground">{device.name}</p>
                    <h3 className="mt-1 subhead">{device.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{device.body}</p>
                  <ul className="mt-5 grid gap-2">
                    {device.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-foreground">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full border border-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* The enclosure on site, with its two detail views. */}
            <ZevProShowcase />

            <Reveal delay={0.1} className="mx-auto mt-6 max-w-6xl">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5">
                <IconTile Icon={FileBadge2} />
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Patent applications filed</span> for
                  ZEV Lite and ZEV Pro, with the patent process underway.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Security / Secure Element (§4) ────────────────────────────── */}
        <section id="security" className="section-bg-alternate scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Security"
              title="Infrastructure equipment, not a consumer gadget"
              lede="Sensitive cryptographic operations and the device's identity are meant to live in hardware. Five things the ZEV architecture is built around."
            />
            <ol className="mx-auto grid max-w-6xl gap-4 md:grid-cols-5">
              {TRUST_CHAIN.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.05} className="glass-card relative flex flex-col p-5">
                  <span className="absolute right-4 top-4 text-[13px] font-semibold tabular-nums text-muted-foreground">
                    0{i + 1}
                  </span>
                  <IconTile Icon={Icon} />
                  <h3 className="mt-4 font-body text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Blockchain (§5) ───────────────────────────────────────────── */}
        <section id="blockchain" className="scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Blockchain"
              title="An integrity layer, not a database"
              lede="The proof of concept uses BNB Smart Chain, an EVM-compatible network. The point is not to push large quantities of raw energy data on-chain — it is to make selected records independently verifiable."
            />
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              <Reveal className="glass-card p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-medium text-muted-foreground">Goes on-chain</p>
                  <MaturityBadge level="demonstrated" />
                </div>
                <ul className="mt-5 space-y-3">
                  {ON_CHAIN.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-[15px] text-foreground">
                      <IconTile Icon={Icon} />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="glass-card p-6 sm:p-8">
                <p className="text-[13px] font-medium text-muted-foreground">Stays off-chain</p>
                <ul className="mt-5 space-y-3">
                  {OFF_CHAIN.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-[15px] text-foreground">
                      <IconTile Icon={Icon} tone="emerald" />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-[15px] leading-relaxed text-muted-foreground">
              ZLN, the ecosystem token, lives on the same chain but is a separate layer: the digital utility
              layer around the physical ZEV infrastructure.{" "}
              <Link to="/#ecosystem" className="font-medium text-primary hover:underline">
                See the ZEV + ZLN stack
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── APIs & integration ───────────────────────────────────────── */}
        <section id="apis" className="section-bg-alternate scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="APIs & integration"
              title="Where validated data goes next"
              lede="A record that has been through the chain is only useful if operators and other systems can reach it."
            />
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {INTERFACES.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.05} className="glass-card flex flex-col p-6">
                  <IconTile Icon={Icon} />
                  <h3 className="mt-4 font-body text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card mx-auto flex max-w-4xl flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
              <div>
                <h2 className="subhead">See the whole chain in motion</h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  The homepage animation walks from a renewable source to a verifiable record in six beats.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/#how-zev-works"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-body text-[15px] font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Watch how ZEV works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-body text-[15px] font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
                >
                  Talk to ZelionTech
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What the validated data is for, and where the machine is designed
            to work (brief §6, §8, §9, §14). Moved here from the homepage so
            the homepage stays a story and the ZEV page holds the detail. */}
        <DigitalUtilities />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
