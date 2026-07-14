import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust } from "./webgl/GpuPrimitives";
import "./SolarFlare.css";

function SolarFlareWorld({ settings, accent }) {
  const star = useRef();
  const flareRefs = useRef([]);
  const loops = Math.max(3, Math.min(7, Math.round((settings.energy ?? 100) / 20)));
  const flareDefs = useMemo(() => Array.from({ length: loops }, (_, index) => {
    const theta = seeded(index, 51) * Math.PI * 2;
    const phi = 0.5 + seeded(index, 52) * 2.1;
    const normal = new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(normal, seeded(index, 53) * Math.PI));
    const halfSpan = 0.42 + seeded(index, 54) * 0.38;
    const height = 0.72 + seeded(index, 55) * 0.72;
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-halfSpan, -0.055, 0),
      new THREE.Vector3(-halfSpan * 0.55, height, 0),
      new THREE.Vector3(halfSpan * 0.55, height, 0),
      new THREE.Vector3(halfSpan, -0.055, 0),
    );
    return { curve, position: normal.multiplyScalar(4.17), quaternion };
  }), [loops]);

  useFrame((state, delta) => {
    if (!star.current) return;
    const speed = settings.speed ?? 1;
    const time = state.clock.elapsedTime * speed;
    star.current.rotation.y += delta * 0.12 * speed;
    star.current.scale.setScalar(1 + Math.sin(time * 1.3) * 0.018);
    flareRefs.current.forEach((flare, index) => {
      if (!flare) return;
      const cycle = (time * 0.09 + index / loops) % 1;
      const eruption = cycle > 0.66 ? Math.sin(((cycle - 0.66) / 0.34) * Math.PI) ** 2 : 0;
      flare.scale.set(1, 0.08 + eruption, 1);
      flare.material.opacity = eruption * (0.46 + seeded(index, 57) * 0.34);
    });
  });

  return (
    <group position={[3, 1.8, -10]}>
      <mesh ref={star}>
        <sphereGeometry args={[4.2, 96, 64]} />
        <meshBasicMaterial color="#ff7a1a" toneMapped={false} />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[4.2, 72, 48]} />
        <meshBasicMaterial color="#ffb64a" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={accent} intensity={120} distance={70} />
      {flareDefs.map((flare, index) => (
        <mesh
          key={index}
          ref={(node) => { flareRefs.current[index] = node; }}
          position={flare.position}
          quaternion={flare.quaternion}
        >
          <tubeGeometry args={[flare.curve, 42, 0.045, 7, false]} />
          <meshBasicMaterial color="#fff0a4" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
      <Dust count={280} color="#ffb14c" scale={[22, 18, 22]} speed={0.45} />
    </group>
  );
}

export default function SolarFlare({ settings = {} }) {
  return <GpuExperience scene="solar-flare" World={SolarFlareWorld} settings={settings} accent="#ff9b38" background="#080200" eyebrow="07 — Stellar weather" title={"A star\nbreaks open."} description="Incandescent loops erupt from a turbulent stellar surface and suspend themselves in orbit." cta="Approach the corona" />;
}
