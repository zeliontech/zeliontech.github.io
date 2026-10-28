import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/zev/Reveal";
import { Button } from "@/components/ui/button";

// Team, on the approved white system. Leadership is shown; the directors and
// advisory group sit behind a reveal so the page leads with the people who
// run the company and still gives the full structure one click away.
//
// Roster note: Ralph Saab is no longer listed. His strategy, innovation and
// tokenomics mandate moved to Allam Jamil, as recorded in the whitepaper.
// Order and titles follow the founders' project update of October 2026.
// Zaydan Sukkar joined on 28 October 2026, listed after the chief officers.

// Portraits: public/team/<slug>.{avif,webp,jpg}, 280px squares built by
// scripts/images/build-team.mjs from the originals in assets-source/team.
const leadership = [
  { name: "Roula Jamil", role: "Founder & Chief Executive Officer", slug: "roula-jamil" },
  { name: "İhsan Serdar Eldek", role: "Chief ZEV Product and Blockchain Officer", slug: "ihsan-serdar-eldek" },
  { name: "Allam Jamil", role: "Chief Financial Officer", slug: "allam-jamil" },
  { name: "Eng. Dino Vincoletto", role: "Chief Energy Technology and Industrial Development Officer", slug: "dino-vincoletto" },
  { name: "Luigi Benacchio", role: "Chief Information Officer", slug: "luigi-benacchio" },
  { name: "Zaydan Sukkar", role: "Head of Technology & Digital Assets", slug: "zaydan-sukkar" },
  { name: "Eleonora Passarella", role: "Marketing & Communications", slug: "eleonora-passarella" },
  { name: "Eng. Federico Davoli", role: "Hardware & Industrial Systems", slug: "federico-davoli" },
  { name: "Eng. Alessio Munerato", role: "Infrastructure & Cybersecurity", slug: "alessio-munerato" },
];

const advisory = [
  { name: "Prof. Michele De Carli", role: "University of Padua. Academic and technical guidance", slug: "michele-de-carli" },
  { name: "Francesco Di Bernardo", role: "Legal affairs and corporate governance", initials: "FB" },
  { name: "Antonio Guadagnino", role: "Compliance and regulatory requirements", slug: "antonio-guadagnino" },
];

// One treatment for every portrait: greyscale at rest so mixed lighting and
// backgrounds read as one set, colour on hover (.portrait in index.css).
const Avatar = ({ member, size }) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border"
    style={{ width: size, height: size }}
  >
    {member.slug ? (
      <picture>
        <source type="image/avif" srcSet={`/team/${member.slug}.avif`} />
        <source type="image/webp" srcSet={`/team/${member.slug}.webp`} />
        <img
          src={`/team/${member.slug}.jpg`}
          alt={member.name}
          width={280}
          height={280}
          loading="lazy"
          decoding="async"
          className="portrait h-full w-full object-cover"
        />
      </picture>
    ) : (
      <div className="flex h-full w-full items-center justify-center text-[22px] font-bold tracking-[-0.02em] text-primary">
        {member.initials}
      </div>
    )}
  </div>
);

// A roster row, not a centred tile: portrait on the left, name and role in
// sentence case beside it, so the list reads like a masthead.
const MemberCard = ({ member, size = 96, style }) => (
  <div className="group flex items-center gap-5" style={style}>
    <Avatar member={member} size={size} />
    <div className="min-w-0">
      <h3 className="text-[17px] font-bold tracking-[-0.01em] text-foreground">{member.name}</h3>
      <p className="mt-1 text-[15px] leading-snug text-muted-foreground">{member.role}</p>
    </div>
  </div>
);

// `compact` (the homepage) shows the four leaders and sends visitors to the
// About page for the full roster; the About page owns the whole team and the
// directors and advisory reveal.
const TeamSection = ({ compact = false }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const shown = compact ? leadership.slice(0, 4) : leadership;

  return (
    <section id="team" className="section-compact bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Team</p>
          <h2 className="headline-standard mt-4">
            The people behind <span className="metal-gradient">ZelionTech.</span>
          </h2>
          <p className="lede mt-5">
            A multidisciplinary team across energy infrastructure, hardware and industrial systems,
            cybersecurity, finance and decentralised coordination. ZEV is being advanced through
            ZelionTech Expofin Smart Energy Ltd, the joint venture with Expofin S.R.L. being
            established in the United Kingdom.
            {!compact && " Dino Vincoletto is the nominated director for Expofin in that venture."}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {shown.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>

        {compact ? (
          <div className="mt-12 flex">
            <Button asChild variant="outline" size="lg">
              <Link to="/about#team">
                Meet the whole team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
        {/* Directors and advisory, behind a reveal */}
        <div className="mt-12 flex">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-border bg-card pl-6 pr-5 text-[15px] font-semibold text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-muted hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {open ? "Hide the advisors" : "Meet the advisors"}
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-[13px] font-semibold tabular-nums text-background">
              {advisory.length}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Grid-rows transition: no measurement, no motion library, and the
            panel keeps its natural height at every viewport. */}
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
            open ? "mt-12 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!open}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-border pt-10">
              <div>
                <h3 className="subhead">Advisors</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
                  Academic, legal and compliance guidance around the company and the joint venture.
                </p>
              </div>
              <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                {advisory.map((member, i) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    style={open ? { animation: `zev-rise 0.5s ease-out both`, animationDelay: `${0.08 + i * 0.07}s` } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
