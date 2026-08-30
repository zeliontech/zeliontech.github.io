import { motion } from "framer-motion";

const leadership = [
  { name: "İhsan Serdar Eldek", role: "Co-Founder & CEO", photo: "/team/Serdar Photo.jpeg" },
  { name: "Roula Jamil", role: "Co-Founder & President", photo: "/team/Roula photo.jpeg" },
  { name: "Ralph Saab", role: "Chief Strategy & Innovation Officer", initials: "RS" },
  { name: "Eng. Dino Vincoletto", role: "Chief Renewable Technology & Energy Validation Officer", initials: "DV" },
  { name: "Eng. Alessio Munerato", role: "Chief Infrastructure & Cybersecurity Officer", initials: "AM" },
  { name: "Eng. Federico Davoli", role: "Chief Hardware & Industrial Systems Officer", initials: "FD" },
  { name: "Luigi Benacchio", role: "Chief Information Officer", initials: "LB" },
  { name: "Allam Jamil", role: "Chief Financial, Investment & Data Officer (CFIDO)", photo: "/team/allam photo.jpeg" },
  { name: "Eleonora Passarella", role: "Chief Marketing & Communications Officer", initials: "EP" },
];

const advisory = [
  { name: "Francesco Di Bernardo", role: "Director of Legal Affairs & Corporate Governance", initials: "FB" },
  { name: "Antonio Guadagnino", role: "Director of Compliance & Regulatory Affairs", initials: "AG" },
  { name: "Prof. Michele De Carli", role: "Department of Industrial Engineering – University of Padua", initials: "MD" },
];

const Avatar = ({ member, size }) => (
  <div
    className="relative mx-auto mb-5 overflow-hidden rounded-full border border-border bg-muted"
    style={{ width: size, height: size }}
  >
    {member.photo ? (
      <img
        src={member.photo}
        alt={member.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center font-heading text-2xl font-semibold text-silver-light">
        {member.initials}
      </div>
    )}
  </div>
);

const MemberCard = ({ member, index, size = 140 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.05 * index }}
    className="text-center"
  >
    <Avatar member={member} size={size} />
    <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
      {member.name}
    </h3>
    <p className="mx-auto max-w-[240px] text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
      {member.role}
    </p>
  </motion.div>
);

const TeamSection = () => {
  return (
    <section id="team" className="border-t border-border/50 bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Team
          </span>
          <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            The People Behind <span className="metal-gradient">ZelionTech</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            A team of infrastructure experts, engineers, and ecosystem builders
            working to reshape energy validation.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="section-divider my-16" />

        <div className="mb-12 text-center">
          <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">
            Directors, Governance, Scientific & Strategic Advisory
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Additional leadership and advisory structure across legal,
            compliance, and academic domains.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-x-8 gap-y-12 sm:grid-cols-3">
          {advisory.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} size={110} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
