import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import "./PrismPulse3D.css";

function ProceduralStudio() {
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer intensity={2.4} color="#ffe6f0" position={[0, 4, -3]} scale={[6, 6, 1]} />
      <Lightformer intensity={1.8} color="#bfe9ff" position={[-4, -1, 2]} scale={[4, 4, 1]} />
      <Lightformer intensity={2} color="#ffffff" position={[4, 2, 3]} scale={[3, 3, 1]} />
      <Lightformer intensity={1.2} color="#fff0c8" position={[0, -4, 4]} scale={[5, 3, 1]} />
    </Environment>
  );
}

function PrismCore() {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.y += delta * 0.14 * speed;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.3;
    const breathe = 1 + Math.sin(t * 0.6) * 0.06;
    ref.current.scale.setScalar(breathe);
  });
  return (
    <mesh ref={ref}>
      <coneGeometry args={[1.6, 2.6, 4]} />
      <MeshTransmissionMaterial
        thickness={1.2}
        roughness={0.14}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.09}
        anisotropy={0.2}
        distortion={0.1}
        color="#ffffff"
      />
    </mesh>
  );
}

function SpectrumBands({ count, colors }) {
  const group = useRef();
  const speed = useSpeed();
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * 0.05 * speed; });
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index} position={[2 + index * 0.16, 1.2 - index * 0.28, 0]} rotation={[0, 0, -0.15 + index * 0.03]}>
          <boxGeometry args={[6, 0.03 + index * 0.004, 0.03]} />
          <meshBasicMaterial color={colors[index % colors.length]} transparent opacity={0.75} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

export default function PrismPulse3D({ settings = {} }) {
  const planes = Math.max(4, Math.min(12, settings.planes ?? 12));
  const colors = ["#ff456d", "#ffbe48", "#55ffb0", "#47c8ff", "#a779ff"];
  return (
    <section className="atmosphere prism-pulse-3d">
      <CanvasStage camera={{ position: [1.6, 0.6, 8], fov: 44 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.75, threshold: 0.4 }}>
        <ambientLight intensity={0.4} />
        <pointLight color="#ff6f91" intensity={18} distance={22} position={[1.6, 1, 3]} />
        <pointLight color="#7fd8ff" intensity={12} distance={22} position={[1.6, -1.2, -2]} />
        <ProceduralStudio />
        <group position={[1.6, 0.6, 0]}>
          <PrismCore />
          <SpectrumBands count={planes} colors={colors} />
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>10B — Refraction study, with real dispersion</p>
        <h1>White light,<br />actually splitting.</h1>
        <span>A real transmissive prism glints and breathes as it turns, catching soft studio light from every side instead of one harsh point source.</span>
      </div>
    </section>
  );
}
