import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { ARRAY_IMAGE, CARD_IMAGE } from "./card-image";
import { usePointerTilt } from "./hooks";

// The three pillar cards from the approved design reference: the device, the
// token, and the environmental layer. One dark card with the device, one
// azure tile for the token, one light card with the array. The two
// photographs are crops of the hero scene, so the page has one image family.
//
// Claims discipline (brief §9/§24): the reference copy said ZEV "enables the
// generation of high-integrity carbon credits". ZEV does not issue credits —
// issuance needs an accepted methodology, registration and independent
// verification — so the card says the data supports carbon accounting and MRV.

// Logo path from public/logo.svg (viewBox 200 520 280 390), cut into the ZLN tile.
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

/**
 * ZLN card: a typographic tile on the azure gradient with the mark cut large
 * into the corner. The token has no physical form, so it gets the brand
 * rather than an invented coin.
 */
const ZlnTile = () => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(212 92% 44%) 55%, hsl(222 60% 20%) 100%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(70% 90% at 82% 8%, rgba(255,255,255,0.26), transparent 60%)" }}
    />
    <svg viewBox="200 520 280 390" className="absolute -bottom-12 -right-4 h-[150%] w-auto opacity-[0.14]">
      {LOGO}
    </svg>
    <div className="absolute bottom-6 left-7">
      <p className="text-[13px] font-medium text-white/70">BEP-20 · BNB Smart Chain</p>
      <p className="mt-1 font-body text-[56px] font-bold leading-none tracking-[-0.045em] text-white">ZLN</p>
    </div>
  </div>
);

/**
 * Carbon card: the solar array and the field from the same scene as the
 * hero, dissolving into the white card at the top.
 */
const ArrayArt = () => (
  <div className="absolute inset-0">
    <picture>
      <source type="image/avif" srcSet={ARRAY_IMAGE.avif} />
      <source type="image/webp" srcSet={ARRAY_IMAGE.webp} />
      <img
        src={ARRAY_IMAGE.jpg}
        width={ARRAY_IMAGE.width}
        height={ARRAY_IMAGE.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="card-photo absolute inset-0 h-full w-full object-cover object-[50%_65%]"
        draggable={false}
      />
    </picture>
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: "linear-gradient(to bottom, hsl(var(--card)) 0%, hsl(var(--card) / 0) 42%)" }}
    />
  </div>
);

const CARDS = [
  {
    id: "zev",
    eyebrow: "ZEV device",
    title: (
      <>
        The device that turns
        <br />a reading into <span className="text-primary">proof.</span>
      </>
    ),
    body: "ZEV reads the equipment, validates the record on the device and anchors the proof on a public chain.",
    to: "/zev",
    dark: true,
    Art: DeviceArt,
  },
  {
    id: "zln",
    eyebrow: "ZLN token",
    title: (
      <>
        One token, tied to
        <br />the <span className="metal-gradient">infrastructure.</span>
      </>
    ),
    body: "ZLN is the digital utility layer of the ecosystem: participation and services around validated energy data, coordinated by the hardware rather than leading it.",
    to: "/tokenomics",
    Art: ZlnTile,
  },
  {
    id: "carbon",
    eyebrow: "Carbon credits",
    title: (
      <>
        Data a carbon auditor
        <br />can <span className="text-eco">check.</span>
      </>
    ),
    body: "Traceable energy records that carbon accounting, ESG reporting and digital MRV processes can rely on.",
    to: "/carbon",
    Art: ArrayArt,
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
    >
      <div className="relative z-10 flex flex-col p-7 lg:p-8">
        <p className={`eyebrow ${card.dark ? "text-white/55" : ""}`}>{card.eyebrow}</p>
        <h3 className={`subhead mt-4 ${card.dark ? "text-white" : ""}`}>{card.title}</h3>
        <p
          className={`mt-4 max-w-[26ch] text-[15px] leading-relaxed ${
            card.dark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {card.body}
        </p>
        <Link
          to={card.to}
          className={`mt-6 inline-flex items-center gap-2 self-start text-[15px] font-semibold transition-colors ${
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
