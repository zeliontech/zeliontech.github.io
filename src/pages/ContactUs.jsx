import { Mail, Globe, Send, Linkedin, Handshake, Building2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/zev/PageHeader";
import Reveal from "@/components/zev/Reveal";
import { trackExternalLink } from "@/services/analyticsService";

// Contact page on the approved light design system.

const channels = [
  { Icon: Mail, label: "Email", value: "info@zeliontech.com", href: "mailto:info@zeliontech.com", aria: "Email ZelionTech" },
  { Icon: Send, label: "Telegram", value: "@zelionglobal", href: "https://t.me/zelionglobal", aria: "ZelionTech on Telegram" },
  { Icon: Linkedin, label: "LinkedIn", value: "ZelionTech", href: "https://www.linkedin.com/company/zeliontech/", aria: "ZelionTech on LinkedIn" },
  { Icon: Globe, label: "Website", value: "www.zeliontech.com", href: "https://www.zeliontech.com", aria: "ZelionTech website" },
];

const enquiries = [
  { Icon: Building2, title: "Pilot deployments", body: "Renewable operators and industrial sites interested in hosting ZEV units once the prototype is validated." },
  { Icon: Handshake, title: "Partnerships", body: "Integrators, energy platforms, ESG and MRV providers looking to build on validated energy data." },
  { Icon: FileText, title: "Institutional enquiries", body: "Investors and institutional counterparties who need the technical and governance detail." },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s build the proof <span className="metal-gradient">layer.</span>
            </>
          }
          lede="ZelionTech develops ZEV, the Zelion Energy Validator: hardware and software that turn renewable-energy activity into verifiable digital records. Tell us what you are working on."
        />

        {/* Channels */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map(({ Icon, label, value, href, aria }, i) => (
                <Reveal key={label} delay={i * 0.05}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={aria}
                    onClick={() => trackExternalLink(href, label)}
                    className="glass-card-hover group flex h-full flex-col p-6"
                  >
                    <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <p className="eyebrow mt-5">{label}</p>
                    <p className="mt-1.5 break-words text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
                      {value}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What to get in touch about */}
        <section className="section section-bg-alternate pt-0 lg:pt-0">
          <div className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">What we hear about most</p>
              <h2 className="headline mt-4">
                Three conversations we are <span className="metal-gradient">open to.</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {enquiries.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="glass-card h-full p-7">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="subhead mt-5">{title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <Reveal className="mx-auto mb-10 max-w-3xl text-center">
              <p className="eyebrow">Send a message</p>
              <h2 className="headline mt-4">
                Tell us what you are <span className="metal-gradient">building.</span>
              </h2>
            </Reveal>
            <div className="mx-auto max-w-4xl">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Closing note */}
        <section className="section pt-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-muted/50 p-8 text-center lg:p-10">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                ZelionTech builds infrastructure first. ZEV is the product; ZLN coordinates the
                ecosystem around it. Every capability on this site is labelled with where it
                genuinely stands, and we would rather tell you what is still in development than
                oversell what exists.
              </p>
              <Link
                to="/about"
                className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline"
              >
                More about ZelionTech
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
