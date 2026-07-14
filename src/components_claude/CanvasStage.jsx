import { Suspense, createContext, useContext, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, SMAA, Vignette } from "@react-three/postprocessing";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import "./CanvasStage.css";

const SpeedContext = createContext(1);
export function useSpeed() {
  return useContext(SpeedContext);
}

function useReducedMotion() {
  return useMemo(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, []);
}

export default function CanvasStage({
  camera = { position: [0, 0, 8], fov: 45 },
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
