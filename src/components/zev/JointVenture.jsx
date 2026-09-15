import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import { JV_BANNER } from "./jv-banner";

// The joint venture with Expofin, on the homepage between the roadmap and
// the takeaway. The substance is HTML text; the co-branded banner is the
// picture, framed inside the container rather than full-bleed because every
// word on it is baked into the pixels and a full-width crop would lose them
// on a phone. Below 640px an art-directed crop of the left part (logos,
// headline, ZEV Pro and ZEV Lite) is served instead, and the two partner
// cards repeat the facts as text. The build script rebuilds the composite's
// own painted corners so the poster's CSS radius does the rounding cleanly.
//
// Every statement here comes from the whitepaper sections "The Joint
// Venture" and "Project Partners". Nothing about how the venture is owned,
// funded or governed beyond its directors appears on the site.

export const JV_NAME = "ZelionTech Expofin Smart Energy Ltd";

export const PARTNERS = [
  {
    name: "ZelionTech",
    where: "United Kingdom",
    title: "Token, software and blockchain",
    body: "ZLN, the validation software and the on-chain proof: the part of ZEV that turns a reading into a record anyone can check.",
  },
  {
    name: "Expofin S.R.L.",
    where: "Italy",
    title: "Industrial energy engineering and the ZEV device",
    body: "Development of the industrial ZEV device. Manufacturing at scale is planned through Expofin Turkey once the prototype is validated.",
  },
];

// Describes what is pictured; the product names are read off the banner.
export const BANNER_ALT =
  "Co-branded ZelionTech and Expofin E.S.Co. banner: the ZEV Pro tower and ZEV Lite wall unit beside the Expofin Smart Tower 5G, the EOS TH solar concentrator and Solid Power energy storage, in front of solar panels, wind turbines and a city skyline. The headline reads Energy. Intelligence. Infrastructure.";

const JointVenture = () => (
  <section id="joint-venture" className="section scroll-mt-16 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Joint venture</p>
        <h2 className="headline-standard mt-4">
          Built together with <span className="metal-gradient">Expofin.</span>
        </h2>
        <p className="lede mx-auto mt-5">
          {JV_NAME} is being established in the United Kingdom as the joint venture between
          ZelionTech and Expofin S.R.L. It is designated to lead the project&apos;s future
          operations. Until then, each company carries out its own part of the work within that
          framework.
        </p>
      </Reveal>

      {/* The banner as a crisp poster with an ambient glow behind it. The
          poster keeps every printed pixel and is clipped only by the site's
          corner radius; the glow is the scene's own colours, blurred, and it
          dissolves into the page on all four sides through the same mask the
          hero photograph uses. Width and height travel with every source so
          the space is reserved before the picture arrives, at either crop. */}
      <Reveal delay={0.06} className="mx-auto mt-12 max-w-6xl">
        <figure className="relative m-0">
          <div
            aria-hidden="true"
            className="hero-photo-mask pointer-events-none absolute -inset-x-[18%] -bottom-[40%] -top-[12%]"
          >
            <div
              className="jv-glow h-full w-full"
              style={{
                "--glow": `url("${JV_BANNER.desktop.glow}")`,
                "--glow-mobile": `url("${JV_BANNER.mobile.glow}")`,
              }}
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_32px_90px_-48px_rgba(15,23,42,0.5)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 blur-2xl"
              style={{ backgroundImage: `url("${JV_BANNER.placeholder}")`, backgroundSize: "cover" }}
            />
            <picture>
              <source
                media={JV_BANNER.mobile.media}
                type="image/avif"
                srcSet={JV_BANNER.mobile.avif}
                sizes="100vw"
                width={JV_BANNER.mobile.width}
                height={JV_BANNER.mobile.height}
              />
              <source
                media={JV_BANNER.mobile.media}
                type="image/webp"
                srcSet={JV_BANNER.mobile.webp}
                sizes="100vw"
                width={JV_BANNER.mobile.width}
                height={JV_BANNER.mobile.height}
              />
              <source
                media={JV_BANNER.mobile.media}
                srcSet={JV_BANNER.mobile.jpg}
                sizes="100vw"
                width={JV_BANNER.mobile.width}
                height={JV_BANNER.mobile.height}
              />
              <source
                type="image/avif"
                srcSet={JV_BANNER.desktop.avif}
                sizes={JV_BANNER.sizes}
                width={JV_BANNER.desktop.width}
                height={JV_BANNER.desktop.height}
              />
              <source
                type="image/webp"
                srcSet={JV_BANNER.desktop.webp}
                sizes={JV_BANNER.sizes}
                width={JV_BANNER.desktop.width}
                height={JV_BANNER.desktop.height}
              />
              <img
                src={JV_BANNER.desktop.fallback}
                srcSet={JV_BANNER.desktop.jpg}
                sizes={JV_BANNER.sizes}
                width={JV_BANNER.desktop.width}
                height={JV_BANNER.desktop.height}
                alt={BANNER_ALT}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="relative block h-auto w-full"
              />
            </picture>
          </div>
          {/* Credit kept for assistive tech; the picture carries both marks
              itself, so a printed caption only repeated them. */}
          <figcaption className="sr-only">
            Joint product line-up. Image: ZelionTech (UK) and Expofin E.S.Co. (Italy).
          </figcaption>
        </figure>
      </Reveal>

      {/* What each side builds */}
      <Reveal delay={0.1} className="relative mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        {PARTNERS.map((p) => (
          <div key={p.name} className="glass-card h-full p-6 lg:p-7">
            <p className="text-[13px] font-medium text-muted-foreground">
              {p.name} · {p.where}
            </p>
            <h3 className="mt-2 text-[17px] font-bold tracking-[-0.01em] text-foreground">{p.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.14} className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-[15px] leading-relaxed text-foreground">
          ZelionTech leads the digital side. Expofin leads the industrial side.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Nominated directors of the joint venture: Dino Vincoletto for Expofin; İhsan Serdar Eldek
          and Roula Jamil for ZelionTech.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/whitepaper">
              Read the whitepaper
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://expofin.eu" target="_blank" rel="noopener noreferrer">
              Visit expofin.eu
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
        <p className="mt-3 text-[13px] text-muted-foreground">expofin.eu is an Italian-language site.</p>
      </Reveal>
    </div>
  </section>
);

export default JointVenture;
