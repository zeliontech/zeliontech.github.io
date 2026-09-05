/**
 * The ZEV device, built to the approved design reference: a brushed-aluminium
 * tower with generously radiused edges, a black glass front carrying a
 * vertical azure light bar and the ZelionTech mark, ventilation grooves down
 * the right flank, and a plinth it appears to rest on.
 *
 * What makes it read as metal rather than grey plastic:
 *  - real radiused edges (RoundedBoxGeometry), so the corners catch light;
 *  - a physically based aluminium with anisotropy, which renders the
 *    directional streaks of a brushed finish;
 *  - environment reflections supplied by the stage (ZevDevice3D), which the
 *    metal and the glass both need — without them there is nothing to reflect.
 *
 * GLB SWAP POINT: when a real CAD export exists, replace the body of the
 * default export with useGLTF("/zev/zev-device.glb") and return its scene.
 * The stage, rig, lazy loading and poster stay unchanged.
 */
import { useMemo } from "react";
import { CanvasTexture, SRGBColorSpace, AdditiveBlending, DoubleSide } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const ALUMINIUM = "#E3E7EB";
const ALUMINIUM_DEEP = "#B9C2CB";
const GROOVE = "#15181D";
const GLASS = "#07090C";
const AZURE = "#4FC3FF";

// Logo path from public/logo.svg (viewBox 200 520 280 390).
const LOGO_PATHS = [
  "M214.802 556.668L473.479 556.646C473.896 597.828 472.837 641.203 472.784 682.676L416.626 777.551L407.146 777.594L349.42 777.518C354.271 765.496 364.772 745.541 370.767 733.231L415.897 640.365L273.121 641.141C271.242 638.757 269.34 635.907 267.644 633.375C250.412 607.644 231.746 582.564 214.802 556.668Z",
  "M293.652 698.756C308.596 698.506 325.054 699.014 340.118 699.212C335.946 710.359 324.984 731.163 319.318 742.857L274.393 835.743L416.65 835.174C434.582 860.502 456.574 890.924 473.108 916.937L463.501 917.183L215.882 916.943C215.254 877.429 215.618 835.979 215.724 796.385C235.43 765.336 253.797 731.089 272.626 699.183L293.652 698.756Z",
];

/** The ZelionTech mark, white on transparent. */
export const makeLogoTexture = (size = 512) => {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  // Logo bbox is ~260 × 361 in its own units; fit it to 78% of the canvas.
  const s = (size * 0.78) / 361;
  ctx.translate(size / 2, size / 2);
  ctx.scale(s, s);
  ctx.translate(-344, -736.5);
  ctx.fillStyle = "#FFFFFF";
  for (const d of LOGO_PATHS) ctx.fill(new Path2D(d));
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

/** The "ZEV" wordmark, white on transparent. */
export const makeWordmarkTexture = () => {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 200;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '800 150px Inter, "Segoe UI", Roboto, system-ui, sans-serif';
  if ("letterSpacing" in ctx) ctx.letterSpacing = "22px";
  ctx.fillText("ZEV", 320 + 11, 108);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

/** Soft radial falloff used for the light-bar bloom and the contact shadow. */
export const makeRadialTexture = (inner, outer, size = 256) => {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(c);
};

const rbox = (w, h, d, r, seg = 5) => new RoundedBoxGeometry(w, h, d, seg, r);

/** Brushed aluminium. Anisotropy runs vertically, like a machined extrusion. */
export const Aluminium = ({ color = ALUMINIUM, roughness = 0.34 }) => (
  <meshPhysicalMaterial
    color={color}
    metalness={0.9}
    roughness={roughness}
    anisotropy={0.75}
    anisotropyRotation={Math.PI / 2}
    clearcoat={0.12}
    clearcoatRoughness={0.4}
    envMapIntensity={1.05}
  />
);

const ZevDeviceModel = ({ withShadow = true }) => {
  const geo = useMemo(
    () => ({
      body: rbox(1.5, 2.36, 1.1, 0.075, 6),
      plinth: rbox(1.62, 0.12, 1.22, 0.035, 3),
      bezel: rbox(1.16, 1.94, 0.03, 0.05, 3),
      glass: rbox(1.08, 1.86, 0.05, 0.045, 3),
      bar: rbox(0.085, 0.86, 0.022, 0.04, 2),
      fin: rbox(0.03, 1.72, 0.034, 0.012, 2),
      grooveBand: rbox(0.016, 1.78, 0.84, 0.008, 1),
    }),
    []
  );

  const tex = useMemo(
    () => ({
      logo: makeLogoTexture(),
      wordmark: makeWordmarkTexture(),
      bloom: makeRadialTexture("rgba(79,195,255,0.85)", "rgba(79,195,255,0)"),
      shadow: makeRadialTexture("rgba(10,14,20,0.42)", "rgba(10,14,20,0)", 512),
    }),
    []
  );

  return (
    <group>
      {/* Enclosure */}
      <mesh geometry={geo.body}>
        <Aluminium />
      </mesh>

      {/* Front: recessed bezel, then the black glass proud of it */}
      <mesh geometry={geo.bezel} position={[0, 0.08, 0.545]}>
        <meshPhysicalMaterial color="#2A2F36" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh geometry={geo.glass} position={[0, 0.08, 0.575]}>
        <meshPhysicalMaterial
          color={GLASS}
          metalness={0.2}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* Light bar and its bloom */}
      <mesh position={[0, 0.66, 0.606]}>
        <planeGeometry args={[0.62, 1.5]} />
        <meshBasicMaterial map={tex.bloom} transparent blending={AdditiveBlending} depthWrite={false} toneMapped={false} opacity={0.55} />
      </mesh>
      <mesh geometry={geo.bar} position={[0, 0.66, 0.612]}>
        <meshStandardMaterial color="#8EDCFF" emissive={AZURE} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>

      {/* Mark and wordmark on the glass */}
      <mesh position={[0, -0.34, 0.604]}>
        <planeGeometry args={[0.36, 0.36]} />
        <meshBasicMaterial map={tex.logo} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.66, 0.604]}>
        <planeGeometry args={[0.46, 0.144]} />
        <meshBasicMaterial map={tex.wordmark} transparent toneMapped={false} depthWrite={false} opacity={0.96} />
      </mesh>

      {/* Right flank: fine machined grooves — a dark recessed band with many
          thin aluminium ribs over it, barely proud of the surface */}
      <mesh geometry={geo.grooveBand} position={[0.752, 0.02, 0]}>
        <meshStandardMaterial color={GROOVE} metalness={0.4} roughness={0.7} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} geometry={geo.fin} position={[0.766, 0.02, -0.385 + i * 0.07]}>
          <Aluminium color={ALUMINIUM} roughness={0.36} />
        </mesh>
      ))}

      {/* Plinth with a shadow gap beneath the tower */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[1.4, 0.05, 1.0]} />
        <meshStandardMaterial color="#5E6873" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh geometry={geo.plinth} position={[0, -1.26, 0]}>
        <Aluminium color={ALUMINIUM_DEEP} roughness={0.42} />
      </mesh>

      {/* Contact shadow: a soft dark radial on the ground plane. Cheaper and
          softer than real shadow maps, and it is what sells the weight. */}
      {withShadow && (
        <mesh position={[0.1, -1.325, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 3.6]} />
          <meshBasicMaterial map={tex.shadow} transparent depthWrite={false} side={DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

export default ZevDeviceModel;
