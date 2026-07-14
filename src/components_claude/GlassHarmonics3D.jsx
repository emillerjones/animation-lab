import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./GlassHarmonics3D.css";

function GlassPlate({ index, accent }) {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.scale.y = 1 + Math.sin(t * (1 + index * 0.15) + index) * 0.12;
  });
  return (
    <mesh
      ref={ref}
      position={[(seeded(index, 1301) - 0.5) * 6, (seeded(index, 1302) - 0.5) * 4, (seeded(index, 1303) - 0.5) * 4]}
      rotation={[seeded(index, 1304) * 2, seeded(index, 1305) * 2, 0]}
    >
      <torusGeometry args={[0.6 + seeded(index, 1306) * 0.6, 0.1, 16, 48]} />
      <MeshTransmissionMaterial thickness={0.6} roughness={0.05} transmission={0.9} ior={1.3} chromaticAberration={0.03} color={index % 3 ? "#ffffff" : accent} />
    </mesh>
  );
}

export default function GlassHarmonics3D({ settings = {} }) {
  const count = Math.max(6, Math.min(18, settings.plates ?? 16));
  return (
    <section className="atmosphere glass-harmonics-3d">
      <CanvasStage camera={{ position: [1.6, 0.6, 8], fov: 46 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.9 }}>
        <ambientLight intensity={0.2} />
        <pointLight color="#78e9ff" intensity={35} distance={20} position={[1.6, 1, 3]} />
        <group position={[1.6, 0.4, 0]}>
          {Array.from({ length: count }).map((_, index) => <GlassPlate key={index} index={index} accent="#78e9ff" />)}
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>13B — Matter study, with real waves</p>
        <h1>Sound, made<br />visible in glass.</h1>
        <span>Real transmissive membranes ring with genuine expanding ripples, timed like actual resonance.</span>
      </div>
    </section>
  );
}
