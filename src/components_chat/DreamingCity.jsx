import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust } from "./webgl/GpuPrimitives";
import "./DreamingCity.css";

function TowerInstances({ count, accent }) {
  const solid = useRef();
  const wire = useRef();

  useEffect(() => {
    if (!solid.current || !wire.current) return;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    for (let index = 0; index < count; index += 1) {
      const depth = seeded(index, 101) * 58;
      const height = 1.8 + seeded(index, 103) * (8 + depth * 0.08);
      const width = 0.45 + seeded(index, 104) * 1.7;
      position.set((seeded(index, 102) - 0.5) * (25 + depth * 0.3), height / 2, -depth);
      scale.set(width, height, 0.45 + seeded(index, 105) * 1.7);
      matrix.compose(position, quaternion, scale);
      solid.current.setMatrixAt(index, matrix);
      wire.current.setMatrixAt(index, matrix);
    }
    solid.current.instanceMatrix.needsUpdate = true;
    wire.current.instanceMatrix.needsUpdate = true;
    solid.current.computeBoundingSphere();
    wire.current.computeBoundingSphere();
  }, [count]);

  return (
    <>
      <instancedMesh ref={solid} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06080a" emissive={accent} emissiveIntensity={0.19} metalness={0.65} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={wire} args={[null, null, count]} scale={1.012}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.19} />
      </instancedMesh>
    </>
  );
}

function DreamingCityWorld({ settings, accent }) {
  const city = useRef();
  const count = Math.max(20, Math.min(400, Math.round(settings.towers ?? 140)));
  useFrame((state, delta) => {
    if (!city.current) return;
    city.current.position.z = -13 + Math.sin(state.clock.elapsedTime * 0.12) * 1.2;
    city.current.rotation.y += delta * 0.006 * (settings.speed ?? 1);
  });

  return (
    <group ref={city} position={[3, -2.6, -13]}>
      <TowerInstances count={count} accent={accent} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -28]}>
        <planeGeometry args={[58, 125, 28, 56]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.09} />
      </mesh>
      <Dust count={Math.min(520, 160 + count)} color={accent} scale={[44, 20, 90]} speed={0.12} />
    </group>
  );
}

export default function DreamingCity({ settings = {} }) {
  return <GpuExperience scene="dreaming-city" World={DreamingCityWorld} settings={settings} accent="#ffc978" background="#050301" eyebrow="09 — Impossible urbanism" title={"The city\ndreams upward."} description="Hundreds of instanced towers stretch through a reflective grid where streets move and gravity has no fixed direction." cta="Enter the dreaming city" />;
}
