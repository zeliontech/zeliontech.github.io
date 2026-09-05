import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import Reveal from "./Reveal";
import { CARD_IMAGE } from "./card-image";
import { usePointerTilt } from "./hooks";

// The three pillar cards from the approved design reference: the device, the
// token, and the environmental layer. One dark card, one light, one green.
//
// Claims discipline (brief §9/§24): the reference copy said ZEV "enables the
// generation of high-integrity carbon credits". ZEV does not issue credits —
// issuance needs an accepted methodology, registration and independent
// verification — so the card says the data supports carbon accounting and MRV.

// Logo path from public/logo.svg (viewBox 200 520 280 390), reused on the coin.
const LOGO = (
  <g fill="#FFFFFF">
    <path d="M214.802 556.668L473.479 556.646C473.896 597.828 472.837 641.203 472.784 682.676L416.626 777.551L407.146 777.594L349.42 777.518C354.271 765.496 364.772 745.541 370.767 733.231L415.897 640.365L273.121 641.141C271.242 638.757 269.34 635.907 267.644 633.375C250.412 607.644 231.746 582.564 214.802 556.668Z" />
    <path d="M293.652 698.756C308.596 698.506 325.054 699.014 340.118 699.212C335.946 710.359 324.984 731.163 319.318 742.857L274.393 835.743L416.65 835.174C434.582 860.502 456.574 890.924 473.108 916.937L463.501 917.183L215.882 916.943C215.254 877.429 215.618 835.979 215.724 796.385C235.43 765.336 253.797 731.089 272.626 699.183L293.652 698.756Z" />
  </g>
);

/**
 * Device close-up: a crop of the same on-site scene the hero uses, so the
 * card shows the product the visitor has just seen. The top of the crop
 * dissolves into the ink card behind the copy; the whole frame eases in
 * a touch on hover alongside the card tilt.
 */
const DeviceArt = () => (
  <div className="absolute inset-0">
    <picture>
      <source type="image/avif" srcSet={CARD_IMAGE.avif} />
      <source type="image/webp" srcSet={CARD_IMAGE.webp} />
      <img
        src={CARD_IMAGE.jpg}
        width={CARD_IMAGE.width}
        height={CARD_IMAGE.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="card-photo absolute inset-0 h-full w-full object-cover object-[50%_45%]"
        draggable={false}
      />
    </picture>
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: "linear-gradient(to bottom, hsl(var(--ink)) 0%, hsl(var(--ink) / 0) 46%)" }}
    />
  </div>
);

const CoinArt = () => (
  <svg viewBox="0 0 320 210" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
    <defs>
      <radialGradient id="cFace" cx="0.35" cy="0.3" r="0.85">
        <stop offset="0%" stopColor="#5EB3FF" />
        <stop offset="45%" stopColor="#2E90FA" />
        <stop offset="100%" stopColor="#0B2F5E" />
      </radialGradient>
      <linearGradient id="cEdge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1D4F86" />
        <stop offset="100%" stopColor="#0A1B33" />
      </linearGradient>
      <linearGradient id="cRim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#BFE1FF" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#7CC0FF" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0B2F5E" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="cTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3A9BFF" />
        <stop offset="100%" stopColor="#174A85" />
      </linearGradient>
      <filter id="cShadow" x="-20%" y="-20%" width="140%" height="160%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>

    {/* Ground shadow */}
    <ellipse cx="170" cy="192" rx="120" ry="14" fill="#0B1F3A" opacity="0.22" filter="url(#cShadow)" />

    {/* Stacked coins, side-on */}
    {[0, 1, 2, 3].map((i) => {
      const y = 176 - i * 13;
      return (
        <g key={i}>
          <path d={`M60 ${y} a58 16 0 0 0 116 0 v-12 a58 16 0 0 1 -116 0 z`} fill="url(#cEdge)" />
          <ellipse cx="118" cy={y - 12} rx="58" ry="16" fill="url(#cTop)" />
          <ellipse cx="118" cy={y - 12} rx="58" ry="16" fill="none" stroke="#9FD0FF" strokeOpacity="0.35" strokeWidth="1" />
          <ellipse cx="118" cy={y - 12} rx="46" ry="12.5" fill="none" stroke="#BFE1FF" strokeOpacity="0.18" strokeWidth="0.8" />
        </g>
      );
    })}

    {/* Face-on coin, leaning on the stack */}
    <g transform="translate(232 118)">
      <circle r="66" cx="2" cy="4" fill="#07152B" opacity="0.5" />
      <circle r="66" fill="url(#cEdge)" />
      <circle r="66" fill="none" stroke="#7CC0FF" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="2.4 3" />
      <circle r="58" fill="url(#cFace)" />
      <circle r="58" fill="none" stroke="url(#cRim)" strokeWidth="2.5" />
      <circle r="49" fill="none" stroke="#BFE1FF" strokeOpacity="0.28" strokeWidth="1" />
      <g transform="translate(-24 -33) scale(0.183)">{LOGO}</g>
      {/* Specular sweep */}
      <path d="M-40 -46 A62 62 0 0 1 46 -40" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

const ForestArt = () => (
  <svg viewBox="0 0 320 210" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F3FBF6" />
        <stop offset="100%" stopColor="#DCF3E4" />
      </linearGradient>
      <radialGradient id="fSun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="fFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B9E0C7" />
        <stop offset="100%" stopColor="#CFEBD9" />
      </linearGradient>
      <linearGradient id="fMid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7CC697" />
        <stop offset="100%" stopColor="#5BB07C" />
      </linearGradient>
      <linearGradient id="fNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B9A62" />
        <stop offset="100%" stopColor="#1F6B40" />
      </linearGradient>
      <linearGradient id="fMist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="320" height="210" fill="url(#fSky)" />
    <circle cx="250" cy="48" r="60" fill="url(#fSun)" />

    {/* Far ridge with haze */}
    <path d="M-10 118 C 50 84, 110 128, 170 100 C 220 78, 270 108, 330 92 L330 210 L-10 210 Z" fill="url(#fFar)" />
    <rect x="-10" y="100" width="340" height="40" fill="url(#fMist)" />

    {/* Mid ridge */}
    <path d="M-10 146 C 40 122, 100 156, 160 136 C 214 118, 262 150, 330 130 L330 210 L-10 210 Z" fill="url(#fMid)" />
    {[30, 86, 140, 196, 250, 300].map((x, i) => (
      <path key={x} d={`M${x} ${150 + (i % 2) * 4} l-7 0 l7 -20 l7 20 z`} fill="#4EA36E" opacity="0.8" />
    ))}
    <rect x="-10" y="136" width="340" height="30" fill="url(#fMist)" opacity="0.8" />

    {/* Near ridge with conifers */}
    <path d="M-10 176 C 50 158, 110 186, 170 170 C 230 154, 280 182, 330 166 L330 210 L-10 210 Z" fill="url(#fNear)" />
    {[14, 42, 74, 108, 150, 182, 222, 262, 296].map((x, i) => {
      const s = 0.85 + ((i * 7) % 5) * 0.12;
      const y = 178 + ((i * 3) % 4) * 2;
      return (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 -34 L-9 -12 L-5 -12 L-12 4 L-6 4 L-14 20 L14 20 L6 4 L12 4 L5 -12 L9 -12 Z" fill="#17553A" />
          <path d="M0 -34 L-9 -12 L-5 -12 L-12 4 L-6 4 L-14 20 L0 20 Z" fill="#1F6B45" />
        </g>
      );
    })}
  </svg>
);

const CARDS = [
  {
    id: "zev",
    eyebrow: "ZEV device",
    title: (
      <>
        More than a monitor.
        <br />A new <span className="text-primary">standard.</span>
      </>
    ),
    body: "ZEV is a next-generation device built to bring intelligence, transparency and verifiable value to renewable energy infrastructure.",
    to: "/zev",
    dark: true,
    Art: DeviceArt,
  },
  {
    id: "zln",
    eyebrow: "ZLN token",
    title: (
      <>
        Real value.
        <br />Real <span className="metal-gradient">impact.</span>
      </>
    ),
    body: "ZLN is the digital utility layer of the ecosystem, designed to connect verified energy data, ecosystem services and participation.",
    to: "/tokenomics",
    Art: CoinArt,
  },
  {
    id: "carbon",
    eyebrow: "Carbon credits",
    title: (
      <>
        Verified today.
        <br />A cleaner <span className="text-eco">tomorrow.</span>
      </>
    ),
    body: "Trusted, traceable energy data that supports carbon accounting, ESG reporting and digital MRV processes.",
    to: "/carbon",
    Art: ForestArt,
    badge: "A greener planet awaits",
  },
];

const PillarCard = ({ card }) => {
  const { Art } = card;
  const tilt = usePointerTilt(4);
  return (
    <article
      {...tilt}
      className={`tilt-card group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border ${
        card.dark ? "ink-surface border-transparent" : "border-border bg-card hover:border-foreground/15"
      }`}
      style={
        card.dark
          ? undefined
          : { boxShadow: "0 1px 2px hsl(220 15% 8% / 0.04), 0 8px 24px -14px hsl(220 15% 8% / 0.12)" }
      }
    >
      <div className="relative z-10 flex flex-col p-7 lg:p-8">
        <p className={`eyebrow ${card.dark ? "text-white/55" : ""}`}>{card.eyebrow}</p>
        <h3 className={`subhead mt-4 ${card.dark ? "text-white" : ""}`}>{card.title}</h3>
        <p
          className={`mt-4 max-w-[26ch] text-[14.5px] leading-relaxed ${
            card.dark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {card.body}
        </p>
        <Link
          to={card.to}
          className={`mt-6 inline-flex items-center gap-2 self-start text-[14.5px] font-semibold transition-colors ${
            card.dark ? "text-white hover:text-primary" : "text-foreground hover:text-primary"
          }`}
        >
          Learn more
          <ArrowRight className="card-arrow h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Art fills the lower half and bleeds to the card edges */}
      <div className="relative mt-auto h-52 w-full">
        <Art />
        {card.badge && (
          <span className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-eco backdrop-blur-sm">
            <Leaf className="h-3 w-3" aria-hidden="true" />
            {card.badge}
          </span>
        )}
      </div>
    </article>
  );
};

const PillarCards = () => {
  return (
    <section className="section bg-background pt-0">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.07} className="h-full">
              <PillarCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarCards;
