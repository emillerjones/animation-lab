import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./BioluminescentTide.css";

function BioluminescentTideWorld({ settings, accent }) {
  const surface = useRef();
  useFrame((state) => {
    if (!surface.current) return;
    const time = state.clock.elapsedTime * (settings.speed ?? 1);
    const positions = surface.current.geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      positions.setZ(index, Math.sin(x * 0.65 + time) * 0.28 + Math.cos(y * 0.35 - time * 0.7) * 0.42);
    }
    positions.needsUpdate = true;
  });
  return <group position={[2, -2.2, -16]} rotation={[-Math.PI / 2.65, 0, 0]}><mesh ref={surface}><planeGeometry args={[34, 48, 55, 55]} /><meshBasicMaterial color={accent} wireframe transparent opacity={0.18} blending={THREE.AdditiveBlending} /></mesh>{range(7).map((index) => <Float key={index} speed={0.7 + index * 0.08} floatIntensity={1.5}><mesh position={[(seeded(index, 61) - 0.5) * 20, (seeded(index, 62) - 0.5) * 28, 1 + seeded(index, 63) * 3]}><sphereGeometry args={[0.25 + seeded(index, 64) * 0.75, 24, 16]} /><meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={2} transparent opacity={0.65} roughness={0.2} /></mesh></Float>)}<Dust count={Math.max(180, (settings.density ?? 60) * 5)} color={accent} scale={[35, 50, 8]} size={1.5} speed={0.25} /></group>;
}

export default function BioluminescentTide({ settings = {} }) {
  const accent = new THREE.Color().setHSL((settings.hue ?? 166) / 360, 0.88, 0.61).getStyle();
  return <GpuExperience scene="bioluminescent-tide" World={BioluminescentTideWorld} settings={settings} accent={accent} background="#00080b" eyebrow="08 — Living ocean" title={"Light lives\ndown here."} description="A breathing surface of luminous organisms answers the current with waves of turquoise fire." cta="Wake the water" />;
}
