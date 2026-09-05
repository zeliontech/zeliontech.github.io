import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/zev/Reveal";

// Team, on the approved white system. Leadership is shown; the directors and
// advisory group sit behind a reveal so the page leads with the people who
// run the company and still gives the full structure one click away.
//
// Roster note: Ralph Saab is no longer listed. His strategy, innovation and
// tokenomics mandate moved to Allam Jamil, as recorded in the whitepaper.

const leadership = [
  { name: "İhsan Serdar Eldek", role: "Co-Founder & CEO", photo: "/team/Serdar Photo.jpeg" },
  { name: "Roula Jamil", role: "Co-Founder & President", photo: "/team/Roula photo.jpeg" },
  { name: "Allam Jamil", role: "Chief Financial, Investment & Data Officer (CFIDO)", photo: "/team/allam photo.jpeg" },
  { name: "Eng. Dino Vincoletto", role: "Chief Renewable Technology & Energy Validation Officer", photo: "/team/dino-vincoletto.jpeg" },
  { name: "Eng. Alessio Munerato", role: "Chief Infrastructure & Cybersecurity Officer", photo: "/team/alessio-munerato.png" },
  { name: "Eng. Federico Davoli", role: "Chief Hardware & Industrial Systems Officer", photo: "/team/federico-davoli.png" },
  { name: "Luigi Benacchio", role: "Chief Information Officer", photo: "/team/luigi-benacchio.jpeg" },
  { name: "Eleonora Passarella", role: "Chief Marketing & Communications Officer", photo: "/team/eleonora-passarella.png" },
];

const advisory = [
  { name: "Francesco Di Bernardo", role: "Director of Legal Affairs & Corporate Governance", initials: "FB" },
  { name: "Antonio Guadagnino", role: "Director of Compliance & Regulatory Affairs", photo: "/team/antonio-guadagnino.png" },
  { name: "Prof. Michele De Carli", role: "Department of Industrial Engineering – University of Padua", photo: "/team/michele-de-carli.png" },
];

const Avatar = ({ member, size }) => (
  <div
    className="relative mx-auto mb-5 overflow-hidden rounded-full bg-muted ring-1 ring-border transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
    style={{ width: size, height: size }}
  >
    {member.photo ? (
      <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-2xl font-bold tracking-[-0.02em] text-primary">
        {member.initials}
      </div>
    )}
  </div>
);

const MemberCard = ({ member, size = 140, style }) => (
  <div className="group text-center" style={style}>
    <Avatar member={member} size={size} />
    <h3 className="text-[16px] font-bold tracking-[-0.01em] text-foreground">{member.name}</h3>
    <p className="mx-auto mt-1.5 max-w-[240px] text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
      {member.role}
    </p>
  </div>
);

const TeamSection = () => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section id="team" className="section bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Team</p>
          <h2 className="headline mt-4">
            The people behind <span className="metal-gradient">ZelionTech.</span>
          </h2>
          <p className="lede mx-auto mt-5 max-w-2xl">
            A multidisciplinary team across energy infrastructure, hardware and industrial systems,
            cybersecurity, finance and decentralised coordination. ZEV is being advanced through
            ZelionTech Expofin Smart Energy Ltd, a joint venture with EXPOFIN E.S.Co. that is being
            established, in which each company holds an equal share.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>

        {/* Directors and advisory, behind a reveal */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-border bg-card pl-6 pr-5 text-[15px] font-semibold text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-muted hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {open ? "Hide directors & advisors" : "Meet the directors & advisors"}
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-[12px] font-semibold tabular-nums text-background">
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
            <div className="mx-auto max-w-4xl border-t border-border pt-12">
              <div className="text-center">
                <h3 className="subhead">Directors, governance, scientific &amp; strategic advisory</h3>
                <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                  Legal, compliance and academic oversight around the company and the joint venture.
                </p>
              </div>
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-3">
                {advisory.map((member, i) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    size={120}
                    style={open ? { animation: `zev-rise 0.5s ease-out both`, animationDelay: `${0.08 + i * 0.07}s` } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
