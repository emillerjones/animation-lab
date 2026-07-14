import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./ParticleCollider3D.css";

const dummy = new THREE.Object3D();

function Beam({ count, direction, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const particles = useMemo(() => Array.from({ length: count }, (_, index) => ({
    offset: seeded(index, direction > 0 ? 501 : 502),
    lane: (seeded(index, direction > 0 ? 503 : 504) - 0.5) * 0.6,
  })), [count, direction]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    const duration = 1.6;
    particles.forEach((particle, index) => {
      const progress = ((t * 0.5 + particle.offset * duration) % duration) / duration;
      const x = direction * (7 - progress * 7);
      dummy.position.set(x, particle.lane, particle.lane * 0.6);
      const fade = progress > 0.85 ? (1 - progress) / 0.15 : 1;
      dummy.scale.setScalar(0.06 * fade);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function Burst({ count, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const period = 3.2;
  const directions = useMemo(() => Array.from({ length: count }, (_, index) => new THREE.Vector3(
    seeded(index, 511) - 0.5,
    seeded(index, 512) - 0.5,
    seeded(index, 513) - 0.5,
  ).normalize().multiplyScalar(1 + seeded(index, 514) * 3)), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = (state.clock.elapsedTime * speed) % period;
    const active = t < 0.9;
    const local = THREE.MathUtils.clamp(t / 0.9, 0, 1);
    directions.forEach((dir, index) => {
      dummy.position.copy(dir).multiplyScalar(local * 2.6);
      dummy.scale.setScalar(active ? Math.sin(local * Math.PI) * 0.05 : 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} transparent opacity={0.95} />
    </instancedMesh>
  );
}

function GuideRings({ count, accent }) {
  const group = useRef();
  const speed = useSpeed();
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * 0.15 * speed; });
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, (index / count) * Math.PI]}>
          <torusGeometry args={[1.4 + index * 0.24, 0.02, 8, 100]} />
          <meshBasicMaterial color={index % 2 ? accent : "#ffffff"} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function ColliderScene({ settings }) {
  const rings = Math.max(4, Math.min(14, settings.rings ?? 8));
  const sparks = Math.max(20, Math.min(90, settings.sparks ?? 52));
  return (
    <group position={[1.8, 0.3, -2]}>
      <Beam count={40} direction={1} accent="#b0ff72" />
      <Beam count={40} direction={-1} accent="#ffffff" />
      <GuideRings count={rings} accent="#b0ff72" />
      <Burst count={sparks} accent="#eaffcf" />
      <pointLight color="#b0ff72" intensity={26} distance={20} />
    </group>
  );
}

export default function ParticleCollider3D({ settings = {} }) {
  return (
    <section className="atmosphere particle-collider-3d">
      <CanvasStage camera={{ position: [0, 1, 9], fov: 46 }} orbitEnabled speed={settings.speed ?? 1} bloom={{ intensity: 1.5, threshold: 0.15 }}>
        <ambientLight intensity={0.08} />
        <ColliderScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>28B — Physics study, actually colliding</p>
        <h1>Force, made<br />into an event.</h1>
        <span>Two real particle beams travel toward the center and detonate on a real cycle, instead of sitting still next to sparkle dust.</span>
      </div>
    </section>
  );
}
