import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User } from "lucide-react";

const leadership = [
  {
    name: "İhsan Serdar Eldek",
    role: "Co-Founder & CEO",
    photo: "/team/Serdar Photo.jpeg",
  },
  {
    name: "Roula Jamil",
    role: "Co-Founder & President",
    photo: "/team/Roula photo.jpeg",
  },
  {
    name: "Ralph Saab",
    role: "Chief Strategy & Innovation Officer",
    photo: "/team/ralph-saab.jpeg",
  },
  {
    name: "Eng. Dino Vincoletto",
    role: "Chief Renewable Technology & Energy Validation Officer",
    photo: "/team/dino-vincoletto.jpeg",
  },
  {
    name: "Eng. Alessio Munerato",
    role: "Chief Infrastructure & Cybersecurity Officer",
    photo: "/team/alessio-munerato.png",
  },
  {
    name: "Eng. Federico Davoli",
    role: "Chief Hardware & Industrial Systems Officer",
    photo: "/team/federico-davoli.png",
  },
  {
    name: "Luigi Benacchio",
    role: "Chief Information Officer",
    photo: "/team/luigi-benacchio.jpeg",
  },
  {
    name: "Allam Jamil",
    role: "Chief Financial, Investment & Data Officer (CFIDO)",
    photo: "/team/allam photo.jpeg",
  },
  {
    name: "Eleonora Passarella",
    role: "Chief Marketing & Communications Officer",
    photo: "/team/eleonora-passarella.png",
  },
];

const advisory = [
  {
    name: "Francesco Di Bernardo",
    role: "Director of Legal Affairs & Corporate Governance",
    photo: null,
  },
  {
    name: "Antonio Guadagnino",
    role: "Director of Compliance & Regulatory Affairs",
    photo: "/team/antonio-guadagnino.png",
  },
  {
    name: "Professor Michele De Carli",
    role: "Department of Industrial Engineering – University of Padua",
    photo: "/team/michele-de-carli.png",
  },
];

const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group flex flex-col items-center text-center"
  >
    <div className="relative mb-5">
      <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5 shadow-[0_0_30px_rgba(0,153,214,0.08)] transition-all group-hover:border-primary/60">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-10 w-10 text-slate-300" />
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_40px_rgba(0,153,214,0.25)] transition-opacity group-hover:opacity-100" />
    </div>
    <h3 className="mb-1 font-heading text-base font-bold text-slate-900 transition-colors group-hover:text-primary">
      {member.name}
    </h3>
    <div className="mb-2 h-px w-8 bg-primary/40 transition-all group-hover:w-14" />
    <p className="font-mono text-xs uppercase leading-snug tracking-wide text-slate-500">
      {member.role}
    </p>
  </motion.div>
);

const TeamSection = () => {
  const [advisoryOpen, setAdvisoryOpen] = useState(false);

  return (
    <section id="team" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 label-rule-r" />
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
              TEAM
            </span>
            <div className="h-px w-12 label-rule-l" />
          </div>
          <h2 className="mb-4 font-heading text-4xl font-bold text-slate-900 lg:text-5xl">
            The People Behind <span className="gradient-text">ZelionTech</span>
          </h2>
          <p className="mx-auto max-w-2xl font-kanit font-light text-slate-500">
            A team of infrastructure experts, engineers, and ecosystem builders
            working to reshape energy validation.
          </p>
        </motion.div>

        {/* Leadership grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
          {leadership.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Advisory toggle */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setAdvisoryOpen((open) => !open)}
            aria-expanded={advisoryOpen}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-transparent px-8 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/5"
          >
            {advisoryOpen ? "Show Less" : "Explore All Team"}
            <ChevronDown
              className={`h-3 w-3 transition-transform ${advisoryOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Advisory collapsible */}
        <AnimatePresence initial={false}>
          {advisoryOpen && (
            <motion.div
              key="advisory"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-16">
                <div className="mb-12 text-center">
                  <h3 className="mb-3 font-heading text-xl font-semibold text-slate-900">
                    Directors, Governance, Scientific &amp; Strategic Advisory
                  </h3>
                  <p className="mx-auto max-w-xl text-sm text-slate-500">
                    Additional leadership and advisory structure across legal,
                    compliance, and academic domains.
                  </p>
                </div>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
                  {advisory.map((member, index) => (
                    <MemberCard key={member.name} member={member} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamSection;
