import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust } from "./webgl/GpuPrimitives";
import "./LuminousMycelium.css";

function FruitingBody({ position, scale, accent }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.08, 0.84, 9]} />
        <meshStandardMaterial color="#d9ead2" emissive={accent} emissiveIntensity={0.3} roughness={0.74} />
      </mesh>
      <mesh position={[0, 0.88, 0]} scale={[1, 0.28, 1]}>
        <sphereGeometry args={[0.34, 18, 10]} />
        <meshStandardMaterial color="#e9ffe5" emissive={accent} emissiveIntensity={1.8} roughness={0.38} />
      </mesh>
      <pointLight position={[0, 0.88, 0]} color={accent} intensity={2.4} distance={3.5} />
    </group>
  );
}

function LuminousMyceliumWorld({ settings, accent, actionActive }) {
  const group = useRef();
  const signalRefs = useRef([]);
  const branchCount = Math.max(10, Math.min(30, Math.round((settings.nodes ?? 64) / 5)));
  const branches = useMemo(() => Array.from({ length: branchCount }, (_, index) => {
    const angle = (index / branchCount) * Math.PI * 2 + seeded(index, 710) * 0.35;
    const length = 6.5 + seeded(index, 711) * 7.5;
    const points = Array.from({ length: 9 }, (__, step) => {
      const t = step / 8;
      const bend = Math.sin(t * Math.PI * (1.2 + seeded(index, 712))) * (seeded(index, 713) - 0.5) * 2.2;
      return new THREE.Vector3(
        Math.cos(angle) * length * t + Math.cos(angle + Math.PI / 2) * bend,
        Math.sin(t * Math.PI * 2 + index) * 0.07 - t * 0.14,
        Math.sin(angle) * length * t + Math.sin(angle + Math.PI / 2) * bend,
      );
    });
    return { points, curve: new THREE.CatmullRomCurve3(points), end: points.at(-1) };
  }), [branchCount]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const speed = settings.speed ?? 1;
    const time = state.clock.elapsedTime * speed;
    group.current.position.y = -1.85 + Math.sin(time * 0.25) * 0.035;
    group.current.rotation.y += delta * 0.005 * speed;
    signalRefs.current.forEach((signal, index) => {
      if (!signal) return;
      const travel = (time * (actionActive ? 0.24 : 0.09) + index / branchCount) % 1;
      signal.position.copy(branches[index].curve.getPoint(travel));
      const pulse = actionActive ? 0.12 + Math.sin(time * 5 + index) * 0.025 : 0.065;
      signal.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group} position={[3, -1.85, -11]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
        <circleGeometry args={[15, 72]} />
        <meshStandardMaterial color="#010b04" roughness={0.96} metalness={0.05} />
      </mesh>
      {branches.map((branch, index) => (
        <group key={index}>
          <Line points={branch.points} color={index % 4 === 0 ? "#e5ffd8" : accent} transparent opacity={0.34 + (index % 3) * 0.1} lineWidth={0.75 + (index % 3) * 0.18} />
          <mesh ref={(node) => { signalRefs.current[index] = node; }}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color="#efffe7" toneMapped={false} />
          </mesh>
          {index % 2 === 0 && <FruitingBody position={branch.end} scale={0.72 + seeded(index, 715) * 1.05} accent={accent} />}
        </group>
      ))}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.58, 24, 18]} />
        <meshStandardMaterial color="#eaffdf" emissive={accent} emissiveIntensity={3.4} roughness={0.28} />
      </mesh>
      <pointLight color={accent} intensity={42} distance={22} position={[0, 1.4, 0]} />
      <Dust count={220} color={accent} scale={[28, 7, 28]} speed={0.1} />
    </group>
  );
}

export default function LuminousMycelium({ settings = {} }) {
  return <GpuExperience scene="luminous-mycelium" World={LuminousMyceliumWorld} settings={settings} accent="#9dff82" background="#010803" eyebrow="04 — Subterranean intelligence" title={"A forest beneath\nthe forest."} description="Branching mycelium carries visible signals through the soil, feeding luminous fruiting bodies as the underground network wakes." cta="Send a pulse" action={() => {}} />;
}
