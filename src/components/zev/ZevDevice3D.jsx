// Lazy-loaded 3D stage for the ZEV device (hero, brief §17). This file is the
// only place three/fiber is imported for the hero — it is code-split via
// React.lazy in ZevHero.jsx and never requested on mobile or under
// prefers-reduced-motion (static poster instead).

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ZevDeviceModel from "./ZevDeviceModel";

// Idle rig: slow three-quarter sway plus a gentle float. Deterministic
// (time-based) so there is no drift.
const DeviceRig = () => {
  const group = useRef();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Sway centred so the front panel stays presented to the camera through
    // the whole cycle — a three-quarter view, never edge-on.
    g.rotation.y = -0.26 + Math.sin(t * 0.22) * 0.24;
    g.rotation.x = 0.06 + Math.sin(t * 0.35) * 0.02;
    g.position.y = Math.sin(t * 0.7) * 0.045;
  });

  return (
    <group ref={group}>
      <ZevDeviceModel />
    </group>
  );
};

const ZevDevice3D = () => {
  return (
    <Canvas
      role="img"
      aria-label="ZEV device — industrial DIN-rail enclosure with cyan status lighting"
      dpr={[1, 1.5]}
      camera={{ position: [1.6, 0.9, 3.1], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Three-point rig: neutral key, soft fill so the enclosure reads as
          machined metal rather than a black slab, and a cyan rim that picks
          out the top and side edges against the graphite background. */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 6]} intensity={2.1} />
      <directionalLight position={[-2, 1.5, 4]} intensity={0.7} color="#CFE8F5" />
      <directionalLight position={[-4, 3, -3]} intensity={1.5} color="#2FC5F2" />
      <pointLight position={[-3, -0.5, 2.5]} color="#2FC5F2" intensity={14} distance={9} decay={2} />
      <DeviceRig />
    </Canvas>
  );
};

export default ZevDevice3D;
