import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./GlassHarmonics.css";

function GlassHarmonicsWorld({ settings, accent }) {
  const group = useRef();
  const count = Math.min(28, settings.plates ?? settings.drops ?? settings.membranes ?? 14);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * 0.045 * (settings.speed ?? 1); group.current.children.forEach((child, index) => { child.scale.y = 1 + Math.sin(state.clock.elapsedTime * (1 + index * 0.03) + index) * 0.08; }); } });
  return <group ref={group} position={[3, 1.5, -9]}>{range(count).map((index) => <Float key={index} speed={0.5 + seeded(index, 91)} floatIntensity={0.75}><mesh position={[(seeded(index, 92) - 0.5) * 14, (seeded(index, 93) - 0.5) * 9, (seeded(index, 94) - 0.5) * 10]} rotation={[seeded(index, 95) * 2, seeded(index, 96) * 2, 0]}><torusGeometry args={[0.55 + seeded(index, 97) * 1.2, 0.08, 12, 60]} /><meshPhysicalMaterial color={index % 3 ? accent : "#ff86da"} transmission={0.72} thickness={1.1} roughness={0.08} transparent opacity={0.72} emissive={accent} emissiveIntensity={0.45} side={THREE.DoubleSide} /></mesh></Float>)}<pointLight color={accent} intensity={55} distance={35} /><Dust count={130} color={accent} scale={[24, 16, 30]} /></group>;
}

export default function GlassHarmonics({ settings = {} }) {
  return <GpuExperience scene="glass-harmonics" World={GlassHarmonicsWorld} settings={settings} accent="#83e9ff" background="#010608" eyebrow="08 — Suspended geometry" title={"Gravity holds\nits breath."} description="Translucent halos drift and precess through a weightless orbital field, gathering light as they cross one another." cta="Enter the orbit" />;
}
