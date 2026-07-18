import { Suspense, createContext, useContext, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import useDragOrbit from "../hooks/useDragOrbit";
import usePinchZoom from "../hooks/usePinchZoom";
import useDroneMode from "../hooks/useDroneMode";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import "./CanvasStage.css";

const SpeedContext = createContext(1);
export function useSpeed() {
  return useContext(SpeedContext);
}

function useReducedMotion() {
  return useMemo(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, []);
}

function OrbitCameraRig({ camera, focus, pitchLimits, droneMode = false }) {
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
  // Zoom range is proportional to each scene's own starting distance, not an absolute unit
  // count, since world scale varies wildly between pieces.
  const distanceRef = useRef(geometry.distance);
  const targetDistanceRef = useRef(geometry.distance);
  usePinchZoom({
    targetDistanceRef,
    min: geometry.distance * 0.4,
    max: geometry.distance * 2.2,
    invalidate,
  });

  // Free-fly bounds scale with this piece's own starting camera distance, same as the
  // zoom range above, so drone mode can't be asked to leave every scene's actual content.
  useDroneMode({
    enabled: droneMode,
    dragRef,
    moveSpeed: geometry.distance * 0.45,
    bounds: {
      x: geometry.distance * 3.5,
      yMin: 0.3,
      yMax: geometry.distance * 3,
      z: geometry.distance * 3.5,
    },
  });

  useFrame((state, delta) => {
    if (droneMode) return;
    const drag = dragRef.current;
    const orbit = orbitRef.current;
    if (drag.dragging) invalidate();
    orbit.yaw = THREE.MathUtils.damp(orbit.yaw, geometry.baseYaw + drag.targetYaw, 3.4, delta);
    orbit.pitch = THREE.MathUtils.damp(orbit.pitch, geometry.basePitch + drag.targetPitch, 3.4, delta);
    distanceRef.current = THREE.MathUtils.damp(distanceRef.current, targetDistanceRef.current, 6, delta);
    state.camera.position.set(
      geometry.focus.x + distanceRef.current * Math.sin(orbit.yaw) * Math.cos(orbit.pitch),
      geometry.focus.y + distanceRef.current * Math.sin(orbit.pitch),
      geometry.focus.z + distanceRef.current * Math.cos(orbit.yaw) * Math.cos(orbit.pitch),
    );
    state.camera.lookAt(geometry.focus);
  });
  return null;
}

export default function CanvasStage({
  camera = { position: [0, 0, 8], fov: 45 },
  orbitEnabled = false,
  orbitFocus = [0, 0, 0],
  orbitPitchLimits = [-0.85, 0.85],
  droneMode = false,
  speed = 1,
  bloom,
  extraEffects,
  shadows = false,
  children,
}) {
  const reducedMotion = useReducedMotion();
  const mobileRenderer = useMemo(
    () => window.matchMedia?.("(max-width: 760px), (pointer: coarse)").matches ?? false,
    [],
  );

  return (
    <div className="canvas-stage">
      <Canvas
        dpr={mobileRenderer ? [0.75, 1] : WEBGL_DPR}
        camera={camera}
        shadows={shadows}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <SpeedContext.Provider value={reducedMotion ? 0 : speed}>
          <Suspense fallback={null}>
            {orbitEnabled && (
              <OrbitCameraRig camera={camera} focus={orbitFocus} pitchLimits={orbitPitchLimits} droneMode={droneMode} />
            )}
            {children}
            <EffectComposer multisampling={mobileRenderer ? 0 : WEBGL_MSAA_SAMPLES}>
              <Bloom
                mipmapBlur
                luminanceThreshold={bloom?.threshold ?? 0.2}
                luminanceSmoothing={0.3}
                intensity={bloom?.intensity ?? 1.1}
              />
              {extraEffects}
              <SMAA />
            </EffectComposer>
          </Suspense>
        </SpeedContext.Provider>
      </Canvas>
    </div>
  );
}
