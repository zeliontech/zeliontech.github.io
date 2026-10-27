import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { ArrowRight, ExternalLink, Factory, Cpu, FileCheck2, Wrench, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader, { SectionPills } from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import MaturityBadge from "@/components/zev/MaturityBadge";
import JointVenture from "@/components/zev/JointVenture";
import { EXPOFIN_PRODUCTS, EXPOFIN_URL, EXPOFIN_WORDMARK } from "@/components/zev/expofin";

// Partners page: the one place on the site that gives the joint-venture
// partner room. It opens with the joint-venture section the homepage
// carries, then says who Expofin E.S.Co. is, what it builds, and how that
// equipment connects to ZEV, and closes with the other agreements in place.
//
// Everything stated about Expofin is as published on expofin.eu, with the
// source named; none of Expofin's performance figures are repeated. Nothing
// about how the venture is owned or funded appears, and the token is never
// tied to a partner.

const PILLS = [
  { label: "Joint venture", href: "#joint-venture" },
  { label: "Expofin", href: "#expofin" },
  { label: "Equipment", href: "#equipment" },
  { label: "How it connects", href: "#how-it-connects" },
  { label: "Agreements", href: "#agreements" },
];

const EXPOFIN_CATALOGUE = "https://expofin.eu/english-catalogue";

export const EXPOFIN_FACTS = [
  "Energy service company: audit, design, build, finance and operation of efficiency projects",
  "Innovation centre in Padua and production plant in Verona",
  "Technologies conceived, patented and produced in house",
  "Energy-efficiency tenders won for more than a thousand Italian municipalities",
  "Promotes energy communities with public administrations",
  "Exhibitor at Key Energy 2025; covered by Il Sole 24 Ore, la Repubblica and Corriere della Sera",
];

// The rest of the range, beyond the four pictured products.
export const MORE_EQUIPMENT = [
  { name: "Hydrovolt", body: "A hybrid panel that produces electricity and heat from the same surface." },
  { name: "Infinity Tower", body: "An urban energy and digital tower with vertical photovoltaics, storage and connectivity." },
  { name: "Solar Bloom", body: "Vertical agrivoltaics: solar generation between the crops, with the land still farmed." },
  { name: "Smart mobility", body: "Solar carports, charging points and fast charging for electric vehicles." },
  { name: "Cogeneration", body: "Combined heat and power units for sites with a steady demand for both." },
  { name: "Green Sentinel", body: "A solar-powered monitoring post for farmland and agrivoltaic sites." },
];

export const CONNECTION = [
  {
    Icon: Factory,
    title: "Expofin installs and runs",
    body: "Generation, storage and charging equipment on real sites, under energy-service and energy-performance contracts for public bodies and companies.",
  },
  {
    Icon: Cpu,
    title: "ZEV reads and signs on site",
    body: "ZEV is being designed to read that equipment through its meters, inverters and storage controllers, then check, hash and anchor each record. The proof of concept reads an energy meter today.",
  },
  {
    Icon: FileCheck2,
    title: "The record backs what a project must show",
    body: "Energy produced and consumed, savings reported and carbon workflows prepared, with a record anyone can check. Independent verification stays with the bodies responsible for it.",
  },
];

export const AGREEMENTS = [
  {
    Icon: Wrench,
    name: "LOGBOT S.R.L.",
    role: "Technology partner",
    body: "Supports ZEV prototype development and technical integration under a signed technology agreement.",
  },
  {
    Icon: Handshake,
    name: "Expofin E.S.Co.",
    role: "Manufacturing",
    body: "Will be the manufacturing partner for mass production and scaling once the prototype has been validated.",
  },
];

const SectionHead = ({ eyebrow, title, lede }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="headline mt-4">{title}</h2>
    {lede && <p className="lede mt-4">{lede}</p>}
  </div>
);

const ExternalText = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-foreground underline-offset-4 hover:underline"
  >
    {children}
  </a>
);

const Partners = () => {
  usePageMeta({
    title: "Partners | ZelionTech",
    description:
      "ZelionTech's joint-venture partner Expofin E.S.Co.: who they are, the generation, storage and smart-city equipment they build, and how it connects to ZEV.",
    path: "/partners",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="Partners"
          title={
            <>
              Built with <span className="metal-gradient">Expofin.</span>
            </>
          }
          lede="ZelionTech develops ZEV with one industrial partner: Expofin E.S.Co., the Italian energy service company whose equipment ZEV is designed to read first. Who they are, what they build, and how the two companies work together."
        >
          <SectionPills items={PILLS} />
        </PageHeader>

        {/* The joint venture, as the homepage tells it; its link to this
            page is left off here. */}
        <JointVenture partnersLink={false} />

        {/* ── Who Expofin is ───────────────────────────────────────────── */}
        <section id="expofin" className="scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <picture>
                  <source type="image/webp" srcSet={EXPOFIN_WORDMARK.webp} sizes="160px" />
                  <img
                    src={EXPOFIN_WORDMARK.fallback}
                    srcSet={EXPOFIN_WORDMARK.png}
                    sizes="160px"
                    width={EXPOFIN_WORDMARK.width}
                    height={EXPOFIN_WORDMARK.height}
                    alt="Expofin"
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto"
                  />
                </picture>
                <p className="eyebrow mt-8">The partner</p>
                <h2 className="headline mt-4">
                  An energy service company that <span className="metal-gradient">builds its own equipment.</span>
                </h2>
                <p className="lede mt-5">
                  Expofin E.S.Co. works along the whole energy chain, from audit and design to
                  building, financing and running efficiency projects, with generation, storage
                  and smart-city technologies it conceives and produces itself.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={EXPOFIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background transition-colors hover:bg-foreground/90"
                  >
                    Visit expofin.eu
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={EXPOFIN_CATALOGUE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    English catalogue
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-3 text-[13px] text-muted-foreground">expofin.eu is an Italian-language site.</p>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-7">
                <div className="glass-card p-6 lg:p-8">
                  <p className="text-[13px] font-medium text-muted-foreground">Expofin E.S.Co., in brief</p>
                  <ul className="mt-5 space-y-3.5">
                    {EXPOFIN_FACTS.map((fact) => (
                      <li key={fact} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[13px] text-muted-foreground">
                    As published on <ExternalText href={EXPOFIN_URL}>expofin.eu</ExternalText>. Expofin S.R.L., Padua and Verona, Italy.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── What Expofin builds ──────────────────────────────────────── */}
        <section id="equipment" className="section-bg-alternate scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="Equipment"
              title="What Expofin builds"
              lede="The cascade system: generation, storage and charging equipment designed to work together on one site. ZEV is being designed to read these first."
            />
            <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {EXPOFIN_PRODUCTS.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05} className="h-full">
                  <li className="glass-card flex h-full flex-col p-4">
                    <div className="flex h-48 items-center justify-center rounded-xl bg-muted/60 p-5">
                      <picture className="flex min-w-0 max-w-full justify-center">
                        <source type="image/avif" srcSet={p.avif} sizes="240px" />
                        <source type="image/webp" srcSet={p.webp} sizes="240px" />
                        <img
                          src={p.fallback}
                          srcSet={p.png}
                          sizes="240px"
                          width={p.width}
                          height={p.height}
                          alt={`${p.name}, Expofin ${p.kind.toLowerCase()}`}
                          loading="lazy"
                          decoding="async"
                          className="max-h-40 w-auto max-w-full object-contain"
                          draggable={false}
                        />
                      </picture>
                    </div>
                    <p className="mt-4 text-[13px] font-medium text-muted-foreground">{p.kind}</p>
                    <h3 className="mt-0.5 text-[17px] font-bold tracking-[-0.01em] text-foreground">{p.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1} className="mx-auto mt-6 max-w-6xl">
              <div className="glass-card p-6 lg:p-8">
                <p className="text-[13px] font-medium text-muted-foreground">Also in the range</p>
                <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MORE_EQUIPMENT.map((item) => (
                    <div key={item.name}>
                      <dt className="text-[15px] font-semibold text-foreground">{item.name}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{item.body}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] text-muted-foreground">
                  Product names and descriptions are Expofin&apos;s. Specifications on{" "}
                  <ExternalText href={EXPOFIN_URL}>expofin.eu</ExternalText>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How it connects to ZEV ───────────────────────────────────── */}
        <section id="how-it-connects" className="scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead
              eyebrow="How it connects"
              title="Expofin builds the site. ZEV makes its data checkable."
              lede="Three steps, and where each company's work ends."
            />
            <ol className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {CONNECTION.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.06} className="h-full">
                  <li className="glass-card relative flex h-full flex-col p-6 lg:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {i === 1 && <MaturityBadge level="planned" />}
                    </div>
                    <p className="mt-5 text-[13px] font-semibold tabular-nums text-primary">0{i + 1}</p>
                    <h3 className="mt-1 text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-3">
              <Link
                to="/zev#energy-data"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline"
              >
                What ZEV reads
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span aria-hidden="true" className="text-muted-foreground">·</span>
              <Link
                to="/carbon"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline"
              >
                Where ZEV stops, and who takes over
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Agreements in place ──────────────────────────────────────── */}
        <section id="agreements" className="section-bg-alternate scroll-mt-16 section">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHead eyebrow="Agreements" title="Technology and manufacturing" />
            <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
              {AGREEMENTS.map(({ Icon, name, role, body }, i) => (
                <Reveal key={name} delay={i * 0.06} className="h-full">
                  <div className="glass-card h-full p-6 lg:p-7">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <p className="mt-5 text-[13px] font-medium text-muted-foreground">{role}</p>
                    <h3 className="mt-1 text-[17px] font-bold tracking-[-0.01em] text-foreground">{name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
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
                <h2 className="subhead">Work with ZelionTech</h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  Pilot sites, integrations and institutional partnerships.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Get in touch
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

export default Partners;
