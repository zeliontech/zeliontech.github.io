// A close crop of the device's upper-left corner for the dark feature card:
// the aluminium edge catching light, the black glass and the light bar
// filling the frame. Same model, different camera and a darker rig.
// Lazy-loaded by PillarCards; the poster crop is the fallback.

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ZevDeviceModel from "./ZevDeviceModel";
import { StudioEnvironment, configureRenderer } from "./ZevDevice3D";

// The device is offset so the upper-left corner of the front glass — the
// aluminium edge and the light bar — sits at the origin, where the camera
// looks. The frame then fills with that corner rather than the whole tower.
const Rig = () => {
  const group = useRef();
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = -0.62 + Math.sin(t * 0.15) * 0.04;
  });
  return (
    <group ref={group} position={[0.62, -0.62, -0.25]}>
      <ZevDeviceModel withShadow={false} />
    </group>
  );
};

const ZevDeviceCloseup = () => (
  <Canvas
    aria-hidden="true"
    dpr={[1, 2]}
    camera={{ position: [0.55, 0.28, 1.75], fov: 32, near: 0.1, far: 20 }}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    onCreated={configureRenderer}
    style={{ width: "100%", height: "100%" }}
  >
    <StudioEnvironment />
    <ambientLight intensity={0.12} />
    <directionalLight position={[-2, 4, 3]} intensity={1.6} />
    <directionalLight position={[4, 1, -2]} intensity={0.6} color="#BFD9FF" />
    <pointLight position={[0.1, 1.0, 1.8]} color="#4FC3FF" intensity={2.6} distance={4} decay={2} />
    <Rig />
  </Canvas>
);

export default ZevDeviceCloseup;
