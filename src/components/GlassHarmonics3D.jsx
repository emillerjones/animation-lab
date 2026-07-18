import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import AnimationReadout from "./AnimationReadout";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./GlassHarmonics3D.css";

// Every ring gets its own hue, saturation, roughness, and chromatic aberration instead of
// alternating between two fixed colors — some read as near-clear glass, some as pale
// frosted, some as saturated cyan-through-violet, so the field reads as a mix of distinct
// glass types drifting together rather than one ring repeated many times. The hue band
// stays cool (cyan through violet) to match the halo's existing accent rather than
// spreading into a full rainbow.
function GlassPlate({ index }) {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.scale.y = 1 + Math.sin(t * (1 + index * 0.15) + index) * 0.12;
  });
  const color = useMemo(() => new THREE.Color().setHSL(
    0.5 + seeded(index, 1308) * 0.3,
    0.15 + seeded(index, 1309) * 0.6,
    0.55 + seeded(index, 1310) * 0.25,
  ), [index]);
  const roughness = 0.02 + seeded(index, 1311) * 0.22;
  const chromaticAberration = 0.015 + seeded(index, 1312) * 0.055;
  const thickness = 0.35 + seeded(index, 1313) * 0.5;

  return (
    <mesh
      ref={ref}
      position={[(seeded(index, 1301) - 0.5) * 6, (seeded(index, 1302) - 0.5) * 4, (seeded(index, 1303) - 0.5) * 4]}
      rotation={[seeded(index, 1304) * 2, seeded(index, 1305) * 2, 0]}
    >
      <torusGeometry args={[0.6 + seeded(index, 1306) * 0.6, 0.1, 16, 48]} />
      <MeshTransmissionMaterial thickness={thickness} roughness={roughness} transmission={0.9} ior={1.3} chromaticAberration={chromaticAberration} color={color} />
    </mesh>
  );
}

export default function GlassHarmonics3D({ settings = {} }) {
  const count = Math.max(6, Math.min(24, settings.plates ?? 16));
  return (
    <section className="atmosphere glass-harmonics-3d" style={{ "--experiment-accent": "#78e9ff" }}>
      <CanvasStage camera={{ position: [1.6, 0.6, 8], fov: 46 }} orbitEnabled orbitFocus={[1.6, 0.4, 0]} droneMode={settings.droneMode} speed={settings.speed ?? 1} bloom={{ intensity: 0.9 }}>
        <ambientLight intensity={0.2} />
        <pointLight color="#78e9ff" intensity={35} distance={20} position={[1.6, 1, 3]} />
        <group position={[1.6, 0.4, 0]}>
          {Array.from({ length: count }).map((_, index) => <GlassPlate key={index} index={index} />)}
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>09 — Orbital geometry</p>
        <h1>Halos without<br />a horizon.</h1>
        <span>Transmissive rings float, tilt, and breathe through a field where gravity has released its hold.</span>
      </div>
      <AnimationReadout eyebrow="Orbital field" value={`${count} RINGS`} />
    </section>
  );
}
