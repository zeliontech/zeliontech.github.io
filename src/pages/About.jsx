import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { ArrowRight, Building2, Cpu, Factory, Handshake, Target, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/zev/Reveal";
import TeamSection from "@/components/landing/TeamSection";
import MaturityBadge from "@/components/zev/MaturityBadge";

// About / Company page. Carries the project story required by the brief:
// ZelionTech originated ZLN and the ZEV proof of concept, and the project is
// being advanced through a 50/50 joint venture with EXPOFIN E.S.Co.
//
// The joint venture is described as being established, not as operating,
// until the certificate of incorporation is issued.

const JV = "ZelionTech Expofin Smart Energy Ltd";

export const PHASES = [
  {
    Icon: Cpu,
    title: "Built by ZelionTech",
    body: "ZelionTech created the ZLN token and its blockchain infrastructure, and built the original ZEV proof of concept: energy data captured on hardware, hashed, timestamped and recorded on BNB Smart Chain.",
    level: "demonstrated",
  },
  {
    Icon: Handshake,
    title: "A joint venture with EXPOFIN",
    body: `To take ZEV from proof of concept to an industrial product, ZelionTech and EXPOFIN E.S.Co. are establishing ${JV}, owned equally by both companies.`,
    level: "in-development",
  },
  {
    Icon: Factory,
    title: "Industrial development",
    body: "Inside the joint venture, ZelionTech leads the token, blockchain, protocol and software. EXPOFIN leads the device, energy engineering and the production prototype.",
    level: "in-development",
  },
  {
    Icon: Building2,
    title: "Scaled manufacturing",
    body: "Once the prototype is validated, Expofin Turkey is expected to prepare production: sourcing, assembly, quality control and commercial batches.",
    level: "planned",
  },
];

const PRINCIPLES = [
  { Icon: Target, title: "Infrastructure before token", body: "ZEV is the product. ZLN coordinates the ecosystem around it, not the other way round." },
  { Icon: ShieldCheck, title: "Validation at the source", body: "Trust belongs at the equipment, not in a reporting layer several steps downstream." },
  { Icon: Building2, title: "Say only what is true", body: "Every capability on this site is labelled with where it genuinely stands today." },
];

const About = () => {
  usePageMeta({
    title: "About ZelionTech | Team and joint venture",
    description:
      "The people behind ZelionTech and the joint venture with EXPOFIN E.S.Co. through which the ZEV energy validator is being advanced.",
    path: "/about",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="eyebrow">About ZelionTech</p>
              <h1 className="display mt-5">
                An energy company that builds <span className="metal-gradient">proof.</span>
              </h1>
              <p className="lede mt-6 max-w-2xl">
                ZelionTech develops ZEV, the Zelion Energy Validator: hardware and software that
                measure renewable-energy activity at the equipment, validate it on the device, and
                anchor a verifiable record on a public blockchain.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section section-bg-alternate pt-0 lg:pt-0">
          <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">How the project is structured</p>
              <h2 className="headline mt-4">
                Two companies. One integrated <span className="metal-gradient">project.</span>
              </h2>
              <p className="lede mx-auto mt-5 max-w-2xl">
                ZelionTech originated the technology. EXPOFIN E.S.Co. brings the industrial energy
                engineering needed to turn it into a machine that can be installed and certified.
              </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
              {PHASES.map(({ Icon, title, body, level }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="glass-card h-full p-6 lg:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                      <MaturityBadge level={level} />
                    </div>
                    <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mx-auto mt-8 max-w-4xl">
              <div className="rounded-2xl border border-border bg-card px-6 py-5 text-center">
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  The 50/50 arrangement concerns ownership, governance and economic participation
                  in the joint-venture project. It is not a division of the ZLN token supply, which
                  remains subject to its published allocation and vesting framework.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Principles */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">How we build</p>
              <h2 className="headline mt-4">
                Three rules we do not <span className="metal-gradient">bend.</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {PRINCIPLES.map(({ Icon, title, body }, i) => (
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

        <TeamSection />

        {/* Closing */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-3xl border border-border bg-muted/50 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
              <div>
                <h2 className="subhead">Work with ZelionTech</h2>
                <p className="mt-2 text-[14.5px] text-muted-foreground">
                  Pilot sites, integrations, and institutional partnerships.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-colors hover:bg-foreground/90"
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

export default About;
