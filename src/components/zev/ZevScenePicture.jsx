import { HERO_IMAGE } from "./hero-image";

// The ZEV on-site scene as a responsive, edge-masked picture. Used by the
// homepage hero (with priority loading and pointer parallax) and by page
// headers that want the same photograph at a different crop.
//
// The frame is masked (.hero-photo-mask) rather than overpainted: a white
// overlay over a clipped composited image leaves a hairline at the boundary,
// while a mask makes the edge pixels genuinely transparent. A 24px blurred
// placeholder sits inset behind the picture so nothing flashes white while
// the image arrives.

export const SCENE_ALT =
  "The ZEV device, a graphite tower with a silver edge and a cyan status light, standing on a concrete pad in front of a solar array, with wind turbines on the wooded hills behind";

const MASKS = {
  frame: "hero-photo-mask", // all four edges dissolve: a picture on the page
  band: "scene-band-mask", // top and bottom only: a full-width strip
};

const ZevScenePicture = ({
  className = "",
  aspect = "aspect-[4/3] lg:aspect-[3/2]",
  position = "object-[22%_50%] lg:object-[12%_50%]",
  placeholderPosition = "20% 50%",
  sizes = HERO_IMAGE.sizes,
  priority = false,
  parallax = false,
  mask = "frame",
  alt = SCENE_ALT,
}) => (
  <div className={`${MASKS[mask] || MASKS.frame} relative w-full overflow-hidden ${aspect} ${className}`}>
    <div
      aria-hidden="true"
      className="absolute inset-[8%] scale-110 blur-2xl"
      style={{
        backgroundImage: `url("${HERO_IMAGE.placeholder}")`,
        backgroundSize: "cover",
        backgroundPosition: placeholderPosition,
      }}
    />
    <picture>
      <source type="image/avif" srcSet={HERO_IMAGE.avif} sizes={sizes} />
      <source type="image/webp" srcSet={HERO_IMAGE.webp} sizes={sizes} />
      <img
        src={HERO_IMAGE.fallback}
        srcSet={HERO_IMAGE.jpg}
        sizes={sizes}
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        alt={alt}
        className={`${parallax ? "hero-parallax-photo" : "scale-[1.04]"} absolute inset-0 h-full w-full object-cover ${position}`}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
      />
    </picture>
  </div>
);

export default ZevScenePicture;
