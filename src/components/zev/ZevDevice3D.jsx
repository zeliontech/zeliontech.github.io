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
    g.rotation.y = -0.55 + Math.sin(t * 0.22) * 0.32;
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
      dpr={[1, 1.5]}
      camera={{ position: [1.6, 0.9, 3.1], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.3} />
      <pointLight position={[-3, -0.5, 2.5]} color="#2FC5F2" intensity={14} distance={9} decay={2} />
      <DeviceRig />
    </Canvas>
  );
};

export default ZevDevice3D;
