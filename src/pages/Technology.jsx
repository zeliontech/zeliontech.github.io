import { Link } from "react-router-dom";
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
  Activity,
  AlertTriangle,
  Cpu,
  FileCheck,
  Radar,
  Leaf,
  SlidersHorizontal,
  TrendingUp,
  Bell,
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

// Technology page (ZEV brief §16: hardware, Secure Element, AI, blockchain,
// energy data, validation, APIs, security). Content follows brief §3–§6 and
// §15. Claims discipline (§24): the ZEV Lite proof of concept list is the only
// thing labelled Demonstrated; every ZEV Pro capability is Planned and the
// ZEV Pro platform as a whole is In Development, matching the homepage hero.

const PILLS = [
  { label: "Energy data", href: "#energy-data" },
  { label: "Validation", href: "#validation" },
  { label: "Hardware", href: "#hardware" },
  { label: "Security", href: "#security" },
  { label: "AI & edge", href: "#ai" },
  { label: "Blockchain", href: "#blockchain" },
  { label: "APIs", href: "#apis" },
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

// Brief §15, verbatim capability lists.
export const ZEV_LITE = [
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

export const ZEV_PRO = [
  "Industrial hardware",
  "Secure Element",
  "Inverter integration",
  "Battery integration",
  "Grid integration",
  "AI edge processing",
  "Anomaly detection",
  "Tamper detection",
  "Advanced energy analytics",
  "Carbon / MRV data",
  "Renewable computing",
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
    body: "ZEV Pro is designed to sign each record with a key that never leaves the Secure Element.",
    level: "planned",
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

// Brief §6: potential functions of the future edge architecture.
export const AI_FUNCTIONS = [
  { Icon: Activity, label: "Energy pattern analysis" },
  { Icon: AlertTriangle, label: "Anomaly detection" },
  { Icon: Cpu, label: "Abnormal equipment behaviour detection" },
  { Icon: FileCheck, label: "Data-integrity monitoring" },
  { Icon: Radar, label: "Tamper detection" },
  { Icon: Leaf, label: "Renewable-production analysis" },
  { Icon: SlidersHorizontal, label: "Energy optimization" },
  { Icon: TrendingUp, label: "Predictive insights" },
  { Icon: Bell, label: "Operational alerts" },
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

const EMERALD = "#10B981";

const SectionHead = ({ eyebrow, title, lede, align = "center" }) => (
  <div className={`mb-12 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
    <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light">
      {eyebrow}
    </span>
    <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
    {lede && <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">{lede}</p>}
  </div>
);

const IconTile = ({ Icon, tone = "primary" }) => (
  <span
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
    style={{
      borderColor: tone === "emerald" ? `${EMERALD}40` : "hsl(var(--primary) / 0.3)",
      backgroundColor: tone === "emerald" ? `${EMERALD}12` : "hsl(var(--primary) / 0.08)",
      color: tone === "emerald" ? EMERALD : "hsl(var(--primary))",
    }}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </span>
);

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="The ZEV device"
          title={
            <>
              Inside <span className="metal-gradient">ZEV.</span>
              <br />
              Hardware, cryptography, blockchain.
            </>
          }
          lede="What the Zelion Energy Validator is made of: the hardware that reads renewable-energy equipment on site, the validation chain that turns a reading into a record anyone can verify, and the security and intelligence layers ZEV Pro is designed to add."
          legend
        >
          <SectionPills items={PILLS} />
        </PageHeader>

        {/* ── Energy data (§3A) ─────────────────────────────────────────── */}
        <section id="energy-data" className="section-bg-subtle scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Energy data"
              title="What ZEV reads"
              lede="ZEV connects to the electrical and renewable-energy equipment on site — solar, wind, hydro or any other source, plus storage, inverters, meters and the grid connection — and turns what that equipment does physically into structured digital information."
            />
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
              <Reveal className="glass-card p-6 sm:p-8 lg:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Connected infrastructure
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SOURCES.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                      <IconTile Icon={Icon} tone="emerald" />
                      {label}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Which of these a given ZEV connects to depends on the installation and the equipment it is
                  configured for.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="glass-card p-6 sm:p-8 lg:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Information ZEV can process
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {SIGNALS.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Integration status
                </p>
                <ul className="mt-3 space-y-2.5">
                  {INTEGRATIONS.map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 text-sm">
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
          </div>
        </section>

        {/* ── Validation (§3B / §5) ─────────────────────────────────────── */}
        <section id="validation" className="section-bg-alternate scroll-mt-16 py-20 lg:py-28">
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

        {/* ── Hardware (§15) ────────────────────────────────────────────── */}
        <section id="hardware" className="section-bg-subtle scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Hardware"
              title="Two generations of one machine"
              lede="ZEV Lite is the proof of concept that showed the idea works end to end. ZEV Pro is the industrial platform being engineered around it. Every capability below is labelled with where it actually stands."
            />
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              <Reveal className="glass-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">ZEV Lite</p>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-foreground">Proof of concept</h3>
                  </div>
                  <MaturityBadge level="demonstrated" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Physical energy information captured by hardware, transformed into cryptographically verifiable
                  information and connected with blockchain infrastructure.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {ZEV_LITE.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: EMERALD }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="glass-card p-6 ring-1 ring-primary/20 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">ZEV Pro</p>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-foreground">Industrial evolution</h3>
                  </div>
                  <MaturityBadge level="in-development" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The next architecture, under development. Each item is a planned capability of the ZEV Pro
                  platform — not something deployed commercially today.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {ZEV_PRO.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <MaturityBadge level="planned" className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Security / Secure Element (§4) ────────────────────────────── */}
        <section id="security" className="section-bg-alternate scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Security"
              title="Infrastructure equipment, not a consumer gadget"
              lede="Sensitive cryptographic operations and the device's identity are meant to live in hardware. Five things the ZEV architecture is built around — with the honest status of each."
            />
            <ol className="mx-auto grid max-w-6xl gap-4 md:grid-cols-5">
              {TRUST_CHAIN.map(({ Icon, title, body, level }, i) => (
                <Reveal key={title} delay={i * 0.05} className="glass-card relative flex flex-col p-5">
                  <span className="absolute right-4 top-4 font-mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <IconTile Icon={Icon} />
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                  <MaturityBadge level={level} className="mt-4 self-start" />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── AI & edge intelligence (§6) ───────────────────────────────── */}
        <section id="ai" className="section-bg-subtle scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="AI & edge intelligence"
              title="More than a meter"
              lede="ZEV does not only measure energy. The future architecture is designed to make it an intelligent layer between physical energy infrastructure and digital infrastructure — analysing on the device, at the edge."
            />
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5 text-sm text-muted-foreground">
                <MaturityBadge level="planned" />
                <span>Potential functions of the ZEV Pro edge architecture</span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AI_FUNCTIONS.map(({ Icon, label }, i) => (
                  <Reveal key={label} delay={i * 0.03}>
                    <li className="glass-card flex items-center gap-3 p-4 text-sm text-foreground">
                      <IconTile Icon={Icon} />
                      {label}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Blockchain (§5) ───────────────────────────────────────────── */}
        <section id="blockchain" className="section-bg-alternate scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Blockchain"
              title="An integrity layer, not a database"
              lede="The proof of concept uses BNB Smart Chain, an EVM-compatible network. The point is not to push large quantities of raw energy data on-chain — it is to make selected records independently verifiable."
            />
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              <Reveal className="glass-card p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Goes on-chain</p>
                  <MaturityBadge level="demonstrated" />
                </div>
                <ul className="mt-5 space-y-3">
                  {ON_CHAIN.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                      <IconTile Icon={Icon} />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="glass-card p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Stays off-chain</p>
                <ul className="mt-5 space-y-3">
                  {OFF_CHAIN.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                      <IconTile Icon={Icon} tone="emerald" />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
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
        <section id="apis" className="section-bg-subtle scroll-mt-16 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="APIs & integration"
              title="Where validated data goes next"
              lede="A record that has been through the chain is only useful if operators and other systems can reach it."
            />
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {INTERFACES.map(({ Icon, title, body, level }, i) => (
                <Reveal key={title} delay={i * 0.05} className="glass-card flex flex-col p-6">
                  <IconTile Icon={Icon} />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  <MaturityBadge level={level} className="mt-4 self-start" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card mx-auto flex max-w-4xl flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">See the whole chain in motion</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The homepage animation walks from a renewable source to a verifiable record in six beats.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/#how-zev-works"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Watch how ZEV works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
                >
                  Talk to ZelionTech
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

export default Technology;
