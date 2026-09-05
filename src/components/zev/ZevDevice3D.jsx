// Lazy-loaded 3D stage for the ZEV device. The only place three/fiber is
// imported for the hero; code-split via React.lazy in ZevHero.jsx and never
// requested under prefers-reduced-motion or data-saver.
//
// The stage is what makes the aluminium and the glass believable: a studio
// environment map gives them something to reflect, and filmic tone mapping
// keeps the highlights from clipping to flat white on a white page.

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, PMREMGenerator, SRGBColorSpace } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import ZevDeviceModel from "./ZevDeviceModel";

/** A neutral studio environment for reflections. Background stays clear. */
export const StudioEnvironment = () => {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

export const configureRenderer = ({ gl }) => {
  gl.toneMapping = ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.0;
  gl.outputColorSpace = SRGBColorSpace;
};

// Idle rig: a slow three-quarter sway and a gentle float. Time-based, so
// there is no drift and no dependence on frame rate.
const DeviceRig = () => {
  const group = useRef();
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = -0.42 + Math.sin(t * 0.18) * 0.14;
    g.rotation.x = 0.02 + Math.sin(t * 0.27) * 0.012;
    g.position.y = Math.sin(t * 0.55) * 0.03;
  });
  return (
    <group ref={group} position={[0, 0.02, 0]}>
      <ZevDeviceModel />
    </group>
  );
};

const ZevDevice3D = () => {
  return (
    <Canvas
      role="img"
      aria-label="The ZEV device: a brushed aluminium tower with a black glass front panel and a vertical blue status light"
      dpr={[1, 2]}
      camera={{ position: [2.55, 0.5, 5.0], fov: 32, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={configureRenderer}
      style={{ width: "100%", height: "100%" }}
    >
      <StudioEnvironment />
      {/* Key from the upper left, cool rim from behind right, and a touch of
          azure spill near the light bar. The environment does the rest. */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[-3.5, 6, 5]} intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[5, 2.5, -3]} intensity={0.9} color="#DDEBFF" />
      <pointLight position={[0.2, 0.9, 2.2]} color="#4FC3FF" intensity={3.2} distance={5} decay={2} />
      <DeviceRig />
    </Canvas>
  );
};

export default ZevDevice3D;
