import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./BioluminescentTide3D.css";

const dummy = new THREE.Object3D();

function Plankton({ count, color }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const particles = useMemo(() => Array.from({ length: count }, (_, index) => ({
    angle: seeded(index, 1001) * Math.PI * 2,
    radius: 1 + seeded(index, 1002) * 6,
    speedFactor: 0.2 + seeded(index, 1003) * 0.3,
    bob: seeded(index, 1004) * Math.PI * 2,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    particles.forEach((particle, index) => {
      const angle = particle.angle + t * particle.speedFactor;
      const x = Math.cos(angle) * particle.radius;
      const z = Math.sin(angle) * particle.radius * 0.6;
      const y = Math.sin(t * 0.8 + particle.bob) * 0.3;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.05 + Math.sin(t * 2 + particle.bob) * 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function ReflectiveWater({ tint }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial blur={[300, 100]} resolution={512} mixBlur={1.3} mixStrength={25} roughness={0.85} depthScale={0.8} color={tint} metalness={0.3} />
    </mesh>
  );
}

export default function BioluminescentTide3D({ settings = {} }) {
  const count = Math.max(60, Math.min(280, (settings.density ?? 60) * 4));
  const hue = (settings.hue ?? 166) / 360;
  const glowColor = useMemo(() => new THREE.Color().setHSL(hue, 0.9, 0.58), [hue]);
  const waterTint = useMemo(() => new THREE.Color().setHSL(hue, 0.55, 0.045), [hue]);
  return (
    <section className="atmosphere bioluminescent-tide-3d">
      <CanvasStage camera={{ position: [0, 1.2, 8], fov: 48 }} orbitEnabled speed={settings.speed ?? 1} bloom={{ intensity: 1.2 }}>
        <ambientLight intensity={0.05} />
        <Plankton count={count} color={glowColor} />
        <ReflectiveWater tint={waterTint} />
        <pointLight color={glowColor} intensity={18} distance={14} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>08B — Organism study, mirrored in real water</p>
        <h1>Glow, actually<br />afloat.</h1>
        <span>Plankton drift over a real reflective tide instead of a flat animated gradient standing in for water.</span>
      </div>
    </section>
  );
}
