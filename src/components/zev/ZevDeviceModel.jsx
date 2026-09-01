/**
 * Procedural 3D model of the ZEV device (brief §17/§19): DIN-rail industrial
 * enclosure, dark metal, emissive cyan seams. Built from primitives so no
 * external model file is needed.
 *
 * GLB SWAP POINT: when a real scan/CAD export exists, replace the body of
 * this component with `useGLTF("/zev/zev-device.glb")` and return its scene —
 * everything else (canvas, lighting, idle rig, lazy loading, posters) stays
 * unchanged.
 */

const METAL_BODY = "#262A31";
const METAL_PANEL = "#1B1E24";
const METAL_DARKER = "#101318";
const METAL_LIGHT = "#33373F";
const SEAM_CYAN = "#2FC5F2";
const LED_EMERALD = "#10B981";

const Seam = ({ position, size }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color="#06232E" emissive={SEAM_CYAN} emissiveIntensity={1.8} />
  </mesh>
);

const Led = ({ position, color, intensity = 1.6 }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.026, 12, 12]} />
    <meshStandardMaterial color="#05131A" emissive={color} emissiveIntensity={intensity} />
  </mesh>
);

const ZevDeviceModel = () => {
  return (
    <group>
      {/* Main enclosure */}
      <mesh>
        <boxGeometry args={[1.35, 1.8, 0.85]} />
        <meshStandardMaterial color={METAL_BODY} metalness={0.65} roughness={0.38} />
      </mesh>

      {/* Front panel plate, slightly proud of the body */}
      <mesh position={[0, 0, 0.435]}>
        <boxGeometry args={[1.22, 1.66, 0.03]} />
        <meshStandardMaterial color={METAL_PANEL} metalness={0.5} roughness={0.45} />
      </mesh>

      {/* Emissive cyan seam frame around the front panel */}
      <Seam position={[-0.6, 0, 0.452]} size={[0.018, 1.62, 0.012]} />
      <Seam position={[0.6, 0, 0.452]} size={[0.018, 1.62, 0.012]} />
      <Seam position={[0, 0.81, 0.452]} size={[1.2, 0.018, 0.012]} />
      <Seam position={[0, -0.81, 0.452]} size={[1.2, 0.018, 0.012]} />

      {/* OLED status window with a live readout line */}
      <mesh position={[0, 0.46, 0.455]}>
        <boxGeometry args={[0.72, 0.36, 0.02]} />
        <meshStandardMaterial color="#0A0C10" metalness={0.2} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.46, 0.467]}>
        <planeGeometry args={[0.64, 0.28]} />
        <meshStandardMaterial color="#05161C" emissive="#0E2A33" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-0.06, 0.48, 0.469]}>
        <planeGeometry args={[0.46, 0.018]} />
        <meshStandardMaterial color="#031015" emissive={SEAM_CYAN} emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[-0.13, 0.42, 0.469]}>
        <planeGeometry args={[0.32, 0.014]} />
        <meshStandardMaterial color="#031015" emissive={SEAM_CYAN} emissiveIntensity={0.9} />
      </mesh>

      {/* Status LEDs: power, link, validation (emerald), spare (dim) */}
      <Led position={[-0.44, 0.12, 0.46]} color={SEAM_CYAN} />
      <Led position={[-0.28, 0.12, 0.46]} color={SEAM_CYAN} intensity={1.1} />
      <Led position={[-0.12, 0.12, 0.46]} color={LED_EMERALD} />
      <Led position={[0.04, 0.12, 0.46]} color="#3A3F48" intensity={0.25} />

      {/* Ventilation slats */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[0, -0.12 - i * 0.065, 0.452]}>
          <boxGeometry args={[0.92, 0.028, 0.014]} />
          <meshStandardMaterial color={METAL_DARKER} metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Terminal block with screw heads */}
      <mesh position={[0, -0.68, 0.44]}>
        <boxGeometry args={[1.02, 0.19, 0.1]} />
        <meshStandardMaterial color="#14171C" metalness={0.55} roughness={0.4} />
      </mesh>
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x) => (
        <mesh key={x} position={[x, -0.68, 0.495]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
          <meshStandardMaterial color="#4A505B" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}

      {/* Heat-sink fins along the left face */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[-0.72, 0, -0.32 + i * 0.13]}>
          <boxGeometry args={[0.05, 1.55, 0.06]} />
          <meshStandardMaterial color="#2A2E36" metalness={0.7} roughness={0.32} />
        </mesh>
      ))}

      {/* DIN-rail clip and rail on the back */}
      <mesh position={[0, 0, -0.46]}>
        <boxGeometry args={[0.5, 0.7, 0.06]} />
        <meshStandardMaterial color={METAL_LIGHT} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, -0.51]}>
        <boxGeometry args={[1.9, 0.34, 0.035]} />
        <meshStandardMaterial color="#3A3F48" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Connectivity antenna with emissive tip */}
      <mesh position={[0.46, 1.05, 0]}>
        <cylinderGeometry args={[0.024, 0.03, 0.34, 12]} />
        <meshStandardMaterial color={METAL_LIGHT} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.46, 1.24, 0]}>
        <sphereGeometry args={[0.036, 12, 12]} />
        <meshStandardMaterial color="#06232E" emissive={SEAM_CYAN} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
};

export default ZevDeviceModel;
