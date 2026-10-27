import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { ZEV_PRO_IMAGES as IMG } from "./zev-pro-images";

// Three figures built from the ZEV Pro material the owner delivered on
// 26 October 2026, each laid out in the site's own type rather than the
// composites' baked-in text:
//
//   DevelopmentToDesign  the development assembly beside the enclosure
//                        concept, with the Expofin line (Devices section)
//   ZevProShowcase       the enclosure on site with its two detail views
//                        (Devices section, the #zev-pro anchor)
//   ZevComputeConcept    the ZEV Compute racks with three details
//                        (Digital utilities, beside renewable compute)
//
// Captions keep the owner's wording. Every picture is a concept or a
// development photograph and says so; nothing here is shown as a product.

const Picture = ({ image, alt, sizes, className = "" }) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ backgroundImage: `url("${image.placeholder}")`, backgroundSize: "cover" }}
  >
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        srcSet={image.jpg}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </picture>
  </div>
);

const Panel = ({ image, alt, label, title, body }) => (
  <figure className="m-0 min-w-0">
    <Picture image={image} alt={alt} sizes="(min-width: 1024px) 540px, 100vw" className="aspect-[695/480] rounded-2xl" />
    <figcaption className="mt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{label}</p>
      <p className="mt-1.5 text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</p>
      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
    </figcaption>
  </figure>
);

export const DevelopmentToDesign = () => (
  <Reveal className="mx-auto max-w-6xl">
    <div className="glass-card p-6 sm:p-8 lg:p-10">
      <p className="eyebrow">ZEV Pro · Development</p>
      <h3 className="headline-standard mt-4">
        From development to <span className="metal-gradient">industrial design.</span>
      </h3>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        A look at the current hardware and the proposed ZEV Pro enclosure.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8">
        <Panel
          image={IMG.bench}
          alt="The ZEV Pro development assembly: controller, operator display, sensors and control modules mounted on a board during development"
          label="Current development"
          title="ZEV Pro development assembly"
          body="Current hardware shown during the development process."
        />
        <div className="flex justify-center text-primary" aria-hidden="true">
          <ArrowDown className="h-7 w-7 lg:hidden" />
          <ArrowRight className="hidden h-7 w-7 lg:block" />
        </div>
        <Panel
          image={IMG.enclosureSite}
          alt="The ZEV Pro enclosure concept mounted on a wall beside a solar array"
          label="Proposed exterior"
          title="ZEV Pro enclosure concept"
          body="Target exterior design. Final enclosure may evolve during engineering."
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-accent px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] leading-relaxed text-foreground">
          <span className="font-semibold text-primary">Developed with Expofin.</span> Hardware
          integration and testing are ongoing.
        </p>
        <a
          href="#zev-pro"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Explore ZEV Pro
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-4 text-[13px] text-muted-foreground">Development photograph and illustrative design concept.</p>
    </div>
  </Reveal>
);

export const ZevProShowcase = () => (
  <Reveal delay={0.08} className="mx-auto mt-6 max-w-6xl">
    <div id="zev-pro" className="glass-card scroll-mt-24 overflow-hidden lg:grid lg:grid-cols-12">
      <div className="relative lg:col-span-5">
        <Picture
          image={IMG.poster}
          alt="The ZEV Pro enclosure mounted on a concrete wall at a solar site, with its status bar, key lock and sealed cable entries"
          sizes="(min-width: 1024px) 480px, 100vw"
          className="aspect-[625/1024] lg:absolute lg:inset-0 lg:aspect-auto"
        />
      </div>
      <div className="flex flex-col p-6 sm:p-8 lg:col-span-7 lg:p-10">
        <p className="eyebrow">ZEV Pro</p>
        <h3 className="headline-standard mt-4">
          Energy intelligence. <span className="metal-gradient">Engineered for the field.</span>
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          An industrial enclosure designed for installation on site: a serviceable housing with a
          key lock, a status bar for power, network, signal and cloud, and sealed cable entries.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <figure className="m-0">
            <Picture image={IMG.posterFront} alt="ZEV Pro enclosure, front view" sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[462/520] rounded-xl" />
            <figcaption className="mt-2 text-[13px] font-medium text-muted-foreground">Serviceable enclosure</figcaption>
          </figure>
          <figure className="m-0">
            <Picture image={IMG.posterGlands} alt="Sealed cable entries beneath the ZEV Pro enclosure" sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[462/340] rounded-xl" />
            <figcaption className="mt-2 text-[13px] font-medium text-muted-foreground">Protected connections</figcaption>
          </figure>
        </div>
        <p className="mt-auto pt-6 text-[13px] text-muted-foreground">
          Industrial enclosure concept. Final dimensions and protection to be validated.
        </p>
      </div>
    </div>
  </Reveal>
);

const COMPUTE_DETAILS = [
  { image: IMG.computeServer, title: "Modular compute architecture", ratio: "aspect-[392/200]", alt: "A ZEV compute unit, a rack server with a honeycomb front" },
  { image: IMG.computeNetwork, title: "Shared networking", ratio: "aspect-[392/190]", alt: "Network switches with blue patch cables inside a ZEV rack" },
  { image: IMG.computePower, title: "Managed rack power", ratio: "aspect-[392/246]", alt: "Power distribution and cabling at the back of a ZEV rack" },
];

export const ZevComputeConcept = () => (
  <Reveal delay={0.1} className="mx-auto mt-6 max-w-6xl">
    <div className="glass-card p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Future development</p>
          <h3 className="headline-standard mt-4">
            ZEV <span className="metal-gradient">Compute.</span>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Exploring modular computing for the ZEV ecosystem: racks of ZEV compute units fed by
            stored surplus renewable energy, with ZEV Pro as the energy data layer.
          </p>
        </div>
        <span className="rounded-full border border-primary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          Design concept
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <Picture
          image={IMG.compute}
          alt="Concept visualisation of three ZEV compute racks in a hall beside a solar field"
          sizes="(min-width: 1024px) 660px, 100vw"
          className="aspect-[862/774] rounded-2xl lg:col-span-7"
        />
        <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {COMPUTE_DETAILS.map((d) => (
            <li key={d.title}>
              <p className="text-[15px] font-semibold text-foreground">{d.title}</p>
              <Picture image={d.image} alt={d.alt} sizes="(min-width: 1024px) 440px, (min-width: 640px) 33vw, 100vw" className={`mt-2 rounded-xl ${d.ratio}`} />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
        Concept visualisation of a potential modular computing infrastructure. Hardware
        configuration, capacity and deployment plans remain under development.
      </p>
    </div>
  </Reveal>
);
