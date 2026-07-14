import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./ParticleCollider.css";

function ParticleColliderWorld({ settings, accent }) {
  const instrument = useRef();
  const count = Math.min(120, settings.sparks ?? settings.particles ?? 54);
  const rings = Math.min(18, settings.rings ?? 8);
  useFrame((_, delta) => { if (instrument.current) { instrument.current.rotation.y += delta * 0.1 * (settings.speed ?? 1); instrument.current.rotation.z -= delta * 0.035; } });
  return <group ref={instrument} position={[3, 2, -8]}>{range(rings).map((index) => <mesh key={index} rotation={[index * 0.35, index * 0.22, index * 0.4]}><torusGeometry args={[2.5 + index * 0.48, 0.03, 8, 150]} /><meshBasicMaterial color={index % 2 ? accent : "#ff4f9c"} transparent opacity={0.42} blending={THREE.AdditiveBlending} /></mesh>)}<mesh rotation={[0, 0, Math.PI / 4]}><cylinderGeometry args={[0.045, 0.045, 18, 8]} /><meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} /></mesh><mesh rotation={[0, 0, -Math.PI / 4]}><cylinderGeometry args={[0.045, 0.045, 18, 8]} /><meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} /></mesh><mesh><sphereGeometry args={[0.55, 32, 32]} /><meshBasicMaterial color="#ffffff" /></mesh><pointLight color={accent} intensity={70} distance={40} /><Dust count={count * 6} color={accent} scale={[19, 16, 20]} size={1.8} speed={0.75} /></group>;
}

export default function ParticleCollider({ settings = {} }) {
  return <GpuExperience scene="particle-collider" World={ParticleColliderWorld} settings={settings} accent="#55e7ff" background="#010208" eyebrow="28 — Collision instrument" title={"Make force\nvisible."} description="Charged beams cross inside an orbital instrument and scatter a storm of high-energy particles." cta="Initiate collision" />;
}
