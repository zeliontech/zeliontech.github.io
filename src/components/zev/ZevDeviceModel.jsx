/**
 * Procedural 3D model of the ZEV device, built to the approved design
 * reference: a brushed-aluminium tower with softly radiused edges, a black
 * glass front panel carrying a vertical azure light bar, ventilation fins
 * down one flank, and the ZEV wordmark on the face.
 *
 * Built from primitives so no external model file is needed. GLB SWAP POINT:
 * when a real scan or CAD export exists, replace the body of this component
 * with useGLTF("/zev/zev-device.glb") and return its scene. Everything else
 * (canvas, lighting, idle rig, lazy loading, poster) stays unchanged.
 */

const ALUMINIUM = "#E7EBEF";
const ALUMINIUM_DARK = "#CDD5DC";
const GLASS = "#12161C";
const AZURE = "#2E90FA";

// Rounded box: a thin box scaled up slightly on each axis reads as a radiused
// edge at this camera distance without the cost of real fillet geometry.
const Body = () => (
  <group>
    {/* Main enclosure */}
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.5, 2.3, 1.15]} />
      <meshStandardMaterial color={ALUMINIUM} metalness={0.28} roughness={0.38} />
    </mesh>

    {/* Soft chamfers: slightly inset slabs on each face catch the light and
        break the silhouette so the block does not read as a flat rectangle. */}
    <mesh position={[0, 0, 0.58]}>
      <boxGeometry args={[1.42, 2.22, 0.02]} />
      <meshStandardMaterial color={ALUMINIUM_DARK} metalness={0.3} roughness={0.32} />
    </mesh>
    <mesh position={[0.76, 0, 0]}>
      <boxGeometry args={[0.02, 2.22, 1.07]} />
      <meshStandardMaterial color={ALUMINIUM_DARK} metalness={0.3} roughness={0.34} />
    </mesh>
  </group>
);

const FrontPanel = () => (
  <group position={[0, 0, 0.6]}>
    {/* Black glass inset */}
    <mesh position={[0, 0.18, 0.01]}>
      <boxGeometry args={[1.06, 1.74, 0.03]} />
      <meshStandardMaterial color={GLASS} metalness={0.4} roughness={0.12} />
    </mesh>

    {/* Vertical azure light bar */}
    <mesh position={[0, 0.62, 0.035]}>
      <boxGeometry args={[0.075, 0.78, 0.012]} />
      <meshStandardMaterial color="#0A2740" emissive={AZURE} emissiveIntensity={2.6} toneMapped={false} />
    </mesh>
    {/* Bloom pad behind the bar */}
    <mesh position={[0, 0.62, 0.03]}>
      <planeGeometry args={[0.34, 1.0]} />
      <meshStandardMaterial color="#08131F" emissive={AZURE} emissiveIntensity={0.28} transparent opacity={0.55} />
    </mesh>

    {/* ZEV wordmark block on the lower face */}
    <mesh position={[0, -0.44, 0.035]}>
      <planeGeometry args={[0.30, 0.085]} />
      <meshStandardMaterial color="#0A0C10" emissive="#FFFFFF" emissiveIntensity={0.5} />
    </mesh>
    {/* Brand mark above the wordmark */}
    <mesh position={[0, -0.28, 0.035]}>
      <planeGeometry args={[0.15, 0.15]} />
      <meshStandardMaterial color="#0A0C10" emissive="#FFFFFF" emissiveIntensity={0.42} />
    </mesh>
  </group>
);

const Fins = () => (
  <group position={[0.7, 0.1, 0]}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <mesh key={i} position={[0.09, 0, -0.4 + i * 0.135]}>
        <boxGeometry args={[0.06, 1.5, 0.055]} />
        <meshStandardMaterial color={ALUMINIUM_DARK} metalness={0.26} roughness={0.42} />
      </mesh>
    ))}
  </group>
);

const Base = () => (
  <group position={[0, -1.2, 0]}>
    <mesh>
      <boxGeometry args={[1.56, 0.1, 1.2]} />
      <meshStandardMaterial color={ALUMINIUM_DARK} metalness={0.26} roughness={0.44} />
    </mesh>
    {/* Recessed shadow gap so the tower appears to float on its plinth */}
    <mesh position={[0, 0.07, 0]}>
      <boxGeometry args={[1.44, 0.045, 1.08]} />
      <meshStandardMaterial color="#9AA5B1" metalness={0.2} roughness={0.7} />
    </mesh>
  </group>
);

const ZevDeviceModel = () => (
  <group>
    <Body />
    <FrontPanel />
    <Fins />
    <Base />
  </group>
);

export default ZevDeviceModel;
