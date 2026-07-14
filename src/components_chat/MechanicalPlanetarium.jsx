import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./MechanicalPlanetarium.css";

function MechanicalPlanetariumWorld({ settings, accent }) {
  const orrery = useRef();
  const rings = Math.min(18, settings.rings ?? 12);
  const planetCount = Math.min(rings, settings.planets ?? Math.ceil(rings / 2));
  useFrame((_, delta) => { if (orrery.current) { orrery.current.rotation.y += delta * 0.08 * (settings.speed ?? 1); orrery.current.rotation.z += delta * 0.018; orrery.current.children.forEach((child, index) => { child.rotation.x += delta * (0.025 + index * 0.003); child.rotation.z -= delta * (0.018 + index * 0.002); }); } });
  return <group ref={orrery} position={[3, 2, -9]}>{range(rings).map((index) => <group key={index} rotation={[seeded(index, 111) * Math.PI, seeded(index, 112) * Math.PI, seeded(index, 113) * Math.PI]}><mesh><torusGeometry args={[2 + index * 0.42, 0.025 + index % 3 * 0.012, 8, 130]} /><meshStandardMaterial color={index % 4 ? accent : "#fff1b6"} emissive={accent} emissiveIntensity={1.2} metalness={0.8} roughness={0.25} /></mesh>{index < planetCount && <mesh position={[2 + index * 0.42, 0, 0]}><sphereGeometry args={[0.12 + index * 0.018, 18, 18]} /><meshBasicMaterial color="#fff4d4" /></mesh>}</group>)}<mesh><sphereGeometry args={[0.55, 32, 32]} /><meshStandardMaterial color="#37200d" emissive={accent} emissiveIntensity={2.8} /></mesh><pointLight color={accent} intensity={45} distance={40} /><Dust count={130} color={accent} scale={[28, 22, 30]} /></group>;
}

export default function MechanicalPlanetarium({ settings = {} }) {
  return <GpuExperience scene="mechanical-planetarium" World={MechanicalPlanetariumWorld} settings={settings} accent="#d6ad66" background="#050301" eyebrow="20 — Celestial machinery" title={"The heavens\nwere engineered."} description="Brass orbital rings, illuminated guide paths, and mechanical worlds turn at independent speeds." cta="Set the sky in motion" />;
}
