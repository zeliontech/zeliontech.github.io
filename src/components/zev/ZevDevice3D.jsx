// Lazy-loaded 3D stage for the ZEV device. This file is the only place
// three/fiber is imported for the hero; it is code-split via React.lazy in
// ZevHero.jsx and never requested under prefers-reduced-motion or data-saver.
//
// Lighting is a bright studio rig, because the device now sits on a white
// page rather than in a dark instrument panel: a broad key, a cool fill to
// keep the aluminium from going flat, and a soft ground bounce.

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ZevDeviceModel from "./ZevDeviceModel";

// Idle rig: a slow three-quarter sway and a gentle float. Time-based, so
// there is no drift and no dependence on frame rate.
const DeviceRig = () => {
  const group = useRef();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Centred so the front panel stays presented to the camera throughout.
    g.rotation.y = -0.34 + Math.sin(t * 0.2) * 0.2;
    g.rotation.x = 0.04 + Math.sin(t * 0.32) * 0.015;
    g.position.y = Math.sin(t * 0.65) * 0.04;
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
      aria-label="The ZEV device: a brushed aluminium tower with a black glass front panel and a vertical blue status light"
      dpr={[1, 1.75]}
      camera={{ position: [1.9, 0.75, 3.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Studio rig for a product shot on white */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 7, 6]} intensity={2.6} />
      <directionalLight position={[-5, 3, 4]} intensity={1.15} color="#DCE9F5" />
      <directionalLight position={[0, -3, 4]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-2.5, 1.2, 2.6]} color="#2E90FA" intensity={9} distance={11} decay={2} />
      <DeviceRig />
    </Canvas>
  );
};

export default ZevDevice3D;
