import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./BlueprintWorld.css";

function BlueprintWorldScene({ settings, accent }) {
  const assembly = useRef();
  const count = Math.min(48, settings.blocks ?? settings.components ?? 24);
  const measurements = Math.min(36, settings.measurements ?? 18);
  useFrame((state) => { if (assembly.current) assembly.current.children.forEach((child, index) => { if (!child.userData.blueprintPart) return; const phase = (state.clock.elapsedTime * (settings.speed ?? 1) * 0.35 + index * 0.12) % 1; child.scale.setScalar(0.15 + THREE.MathUtils.smoothstep(phase, 0, 0.55) * 0.85); }); });
  return <group ref={assembly} position={[3, 0, -10]}>{range(count).map((index) => <mesh key={index} userData={{ blueprintPart: true }} position={[(seeded(index, 121) - 0.5) * 18, (seeded(index, 122) - 0.35) * 11, (seeded(index, 123) - 0.5) * 15]} rotation={[seeded(index, 124), seeded(index, 125), seeded(index, 126)]}><boxGeometry args={[0.6 + seeded(index, 127) * 3, 0.6 + seeded(index, 128) * 3, 0.6 + seeded(index, 129) * 3]} /><meshBasicMaterial color={accent} wireframe transparent opacity={0.72} blending={THREE.AdditiveBlending} /></mesh>)}{range(measurements).map((index) => <Line key={index} points={[[-11 + index, -5, -4], [-11 + index, 7, -4]]} color={accent} transparent opacity={0.08} lineWidth={0.4} />)}<Dust count={90} color={accent} scale={[26, 16, 28]} /></group>;
}

export default function BlueprintWorld({ settings = {} }) {
  return <GpuExperience scene="blueprint-world" World={BlueprintWorldScene} settings={settings} accent="#68cfff" background="#01070d" eyebrow="23 — Continuous construction" title={"The drawing\nbuilds itself."} description="Measured wireframes rotate, scale, and lock into a technical world that never stops drafting." cta="Begin the assembly" />;
}
