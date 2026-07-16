import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import useDragOrbit from "../../hooks/useDragOrbit";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../../rendering/quality";
import "./GpuExperience.css";

// Orbit focus/distance/base-angles reproduce the camera's original resting pose
// (position [0, 3.3, 13.5], lookAt-ish target [0, 2.4, -14]) exactly at rest (drag targets 0,0).
const ORBIT_FOCUS = new THREE.Vector3(0, 2.4, -14);
const ORBIT_OFFSET = new THREE.Vector3(0, 3.3, 13.5).sub(ORBIT_FOCUS);
const ORBIT_DISTANCE = ORBIT_OFFSET.length();
const ORBIT_BASE_YAW = Math.atan2(ORBIT_OFFSET.x, ORBIT_OFFSET.z);
const ORBIT_BASE_PITCH = Math.asin(ORBIT_OFFSET.y / ORBIT_DISTANCE);

function CameraRig({ speed = 1, impulse }) {
  const travel = useRef(0);
  const dragRef = useDragOrbit();
  const orbitRef = useRef({ yaw: ORBIT_BASE_YAW, pitch: ORBIT_BASE_PITCH });
  useFrame((state, delta) => {
    const step = Math.min(delta, .05) * speed;
    travel.current += step;
    const drag = dragRef.current;
    const orbit = orbitRef.current;
    orbit.yaw = THREE.MathUtils.damp(orbit.yaw, ORBIT_BASE_YAW + drag.targetYaw, 3.4, delta);
    orbit.pitch = THREE.MathUtils.damp(orbit.pitch, ORBIT_BASE_PITCH + drag.targetPitch, 3.4, delta);
    state.camera.position.set(
      ORBIT_FOCUS.x + ORBIT_DISTANCE * Math.sin(orbit.yaw) * Math.cos(orbit.pitch),
      ORBIT_FOCUS.y + ORBIT_DISTANCE * Math.sin(orbit.pitch),
      ORBIT_FOCUS.z + ORBIT_DISTANCE * Math.cos(orbit.yaw) * Math.cos(orbit.pitch),
    );
    state.camera.position.z += Math.sin(travel.current * .18) * .35 - impulse * .28;
    state.camera.lookAt(ORBIT_FOCUS);
  });
  return null;
}

function Stage({ World, settings, accent, background, impulse, actionActive }) {
  const speed = settings.speed ?? 1;
  return (
    <>
      <color attach="background" args={[background]} />
      <fogExp2 attach="fog" args={[background, .028]} />
      <ambientLight intensity={.24} color={accent} />
      <directionalLight position={[4, 10, 6]} intensity={1.1} color="#fff1d3" />
      <pointLight position={[-6, 4, 3]} intensity={22} distance={32} color={accent} />
      <CameraRig speed={speed} impulse={impulse} />
      <World settings={settings} accent={accent} impulse={impulse} actionActive={actionActive} />
      <EffectComposer multisampling={WEBGL_MSAA_SAMPLES}>
        <Bloom mipmapBlur intensity={1.3} luminanceThreshold={.18} luminanceSmoothing={.45} />
        <Noise opacity={.018} premultiply />
        <SMAA />
      </EffectComposer>
      <AdaptiveDpr />
    </>
  );
}

export default function GpuExperience({
  scene,
  World,
  settings = {},
  eyebrow,
  title,
  description,
  cta = "Enter the experience",
  accent = "#8fdcff",
  background = "#020407",
  align = "left",
  foreground = null,
  wheelInteraction = false,
  action = null,
  camera = null,
}) {
  const [impulse, setImpulse] = useState(0);
  const [actionActive, setActionActive] = useState(false);
  const decayRef = useRef();

  const activate = (direction = 1) => {
    setImpulse((value) => THREE.MathUtils.clamp(value + direction * 5, -10, 10));
    window.clearTimeout(decayRef.current);
    decayRef.current = window.setTimeout(() => setImpulse(0), 900);
  };

  const handleWheel = (event) => {
    const direction = Math.sign(event.deltaY);
    if (direction) activate(direction);
  };

  return (
    <section className={`atmosphere gpu-experience gpu-experience--${scene} gpu-experience--${align} ${actionActive ? "is-action-active" : ""}`} style={{ "--gpu-accent": accent }} onWheel={wheelInteraction ? handleWheel : undefined}>
      <Canvas
        className="gpu-experience__canvas"
        dpr={WEBGL_DPR}
        camera={{ fov: 52, near: .1, far: 260, position: [0, 3.3, 13.5], ...camera }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <Suspense fallback={null}>
          <Stage World={World} settings={settings} accent={accent} background={background} impulse={impulse} actionActive={actionActive} />
        </Suspense>
      </Canvas>
      <div className="gpu-experience__veil" aria-hidden="true" />
      <div className="experiment-copy gpu-experience__copy">
        <p>{eyebrow}</p>
        <h1>{title.split("\n").map((line, index) => <span key={line}>{line}{index < title.split("\n").length - 1 && <br />}</span>)}</h1>
        <span>{description}</span>
        {action && !actionActive && <button type="button" onClick={() => setActionActive(true)}>{cta}<i aria-hidden="true">→</i></button>}
      </div>
      {foreground}
      <div className="gpu-experience__status" aria-hidden="true"><i />GPU procedural · drag to orbit</div>
    </section>
  );
}
