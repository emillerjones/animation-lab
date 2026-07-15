import { Suspense, createContext, useContext, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, SMAA, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import useDragOrbit from "../hooks/useDragOrbit";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import "./CanvasStage.css";

const SpeedContext = createContext(1);
export function useSpeed() {
  return useContext(SpeedContext);
}

function useReducedMotion() {
  return useMemo(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, []);
}

function OrbitCameraRig({ camera, focus, pitchLimits }) {
  const { invalidate } = useThree();
  const dragRef = useDragOrbit({ pitchMin: pitchLimits[0], pitchMax: pitchLimits[1] });
  const geometry = useMemo(() => {
    const focusVec = new THREE.Vector3(...focus);
    const offset = new THREE.Vector3(...camera.position).sub(focusVec);
    const distance = offset.length();
    return {
      focus: focusVec,
      distance,
      baseYaw: Math.atan2(offset.x, offset.z),
      basePitch: Math.asin(THREE.MathUtils.clamp(offset.y / distance, -1, 1)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orbitRef = useRef({ yaw: geometry.baseYaw, pitch: geometry.basePitch });

  useFrame((state, delta) => {
    const drag = dragRef.current;
    const orbit = orbitRef.current;
    if (drag.dragging) invalidate();
    orbit.yaw = THREE.MathUtils.damp(orbit.yaw, geometry.baseYaw + drag.targetYaw, 3.4, delta);
    orbit.pitch = THREE.MathUtils.damp(orbit.pitch, geometry.basePitch + drag.targetPitch, 3.4, delta);
    state.camera.position.set(
      geometry.focus.x + geometry.distance * Math.sin(orbit.yaw) * Math.cos(orbit.pitch),
      geometry.focus.y + geometry.distance * Math.sin(orbit.pitch),
      geometry.focus.z + geometry.distance * Math.cos(orbit.yaw) * Math.cos(orbit.pitch),
    );
    state.camera.lookAt(geometry.focus);
  });
  return null;
}

export default function CanvasStage({
  camera = { position: [0, 0, 8], fov: 45 },
  orbitEnabled = false,
  orbitFocus = [0, 0, 0],
  orbitPitchLimits = [-0.55, 0.58],
  speed = 1,
  bloom,
  vignette,
  extraEffects,
  shadows = false,
  children,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="canvas-stage">
      <Canvas
        dpr={WEBGL_DPR}
        camera={camera}
        shadows={shadows}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <SpeedContext.Provider value={reducedMotion ? 0 : speed}>
          <Suspense fallback={null}>
            {orbitEnabled && <OrbitCameraRig camera={camera} focus={orbitFocus} pitchLimits={orbitPitchLimits} />}
            {children}
            <EffectComposer multisampling={WEBGL_MSAA_SAMPLES}>
              <Bloom
                mipmapBlur
                luminanceThreshold={bloom?.threshold ?? 0.2}
                luminanceSmoothing={0.3}
                intensity={bloom?.intensity ?? 1.1}
              />
              {extraEffects}
              <Vignette eskil={false} offset={vignette?.offset ?? 0.25} darkness={vignette?.darkness ?? 0.9} />
              <SMAA />
            </EffectComposer>
          </Suspense>
        </SpeedContext.Provider>
      </Canvas>
    </div>
  );
}
