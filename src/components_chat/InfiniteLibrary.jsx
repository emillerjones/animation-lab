import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./InfiniteLibrary.css";

const BOOK_PALETTE = ["#42271d", "#74452e", "#9a6a3e", "#203a3a", "#3c2948", "#b58a52"];

function InstancedBooks({ count, bays }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => BOOK_PALETTE.map((value) => new THREE.Color(value)), []);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    for (let index = 0; index < count; index += 1) {
      const bay = index % bays;
      const side = bay % 2 ? 1 : -1;
      const depth = Math.floor(bay / 2);
      const row = Math.floor(index / bays) % 5;
      const slot = seeded(index, 405);
      const height = 0.38 + seeded(index, 406) * 0.48;
      dummy.position.set(side * (6.9 + seeded(index, 407) * 0.28), 0.25 + row * 1.18 + height * 0.5, -depth * 3.05 - 1.15 + slot * 2.3);
      dummy.rotation.set(0, side > 0 ? -Math.PI / 2 : Math.PI / 2, (seeded(index, 408) - 0.5) * 0.08);
      dummy.scale.set(0.12 + seeded(index, 409) * 0.11, height, 0.45 + seeded(index, 410) * 0.24);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
      mesh.current.setColorAt(index, colors[index % colors.length]);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  }, [bays, colors, count, dummy]);
  return <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial vertexColors roughness={0.82} metalness={0.04} /></instancedMesh>;
}

function InfiniteLibraryWorld({ settings, accent }) {
  const library = useRef();
  const shelves = Math.max(10, Math.min(130, Math.round(settings.shelves ?? 90)));
  const books = Math.max(200, Math.min(14000, Math.round(settings.books ?? 6000)));
  useFrame((state, delta) => {
    if (!library.current) return;
    library.current.position.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.75;
    library.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.035) * 0.008;
    library.current.children.forEach((child) => {
      if (child.userData.returningBook) child.position.x = Math.sin(state.clock.elapsedTime * 0.45 + child.userData.phase) * 1.5;
    });
    void delta;
  });
  const depthRows = Math.ceil(shelves / 2);
  return (
    <group ref={library} position={[3, -2.5, -8]}>
      {range(shelves).map((index) => {
        const side = index % 2 ? 1 : -1;
        const depth = Math.floor(index / 2);
        return <group key={index} position={[side * 7.25, 3.25, -depth * 3.05]}><mesh><boxGeometry args={[1.25, 7.15, 2.75]} /><meshStandardMaterial color="#120d09" roughness={0.58} metalness={0.22} emissive={index % 12 === 0 ? accent : "#000000"} emissiveIntensity={0.18} /></mesh>{range(5).map((row) => <mesh key={row} position={[-side * 0.72, -2.45 + row * 1.2, 0]}><boxGeometry args={[0.18, 0.08, 2.55]} /><meshStandardMaterial color="#a27548" roughness={0.46} metalness={0.28} /></mesh>)}</group>;
      })}
      <InstancedBooks count={books} bays={shelves} />
      {range(Math.min(12, Math.ceil(depthRows / 6))).map((index) => <group key={index} position={[0, 5.8, -index * 18]}><mesh><sphereGeometry args={[0.16, 16, 12]} /><meshBasicMaterial color="#fff2bd" toneMapped={false} /></mesh><pointLight color="#e4b56f" intensity={18} distance={13} /></group>)}
      {range(4).map((index) => <mesh key={index} userData={{ returningBook: true, phase: index * 1.7 }} position={[0, 1.2 + index, -8 - index * 13]} rotation={[0.1, index * 0.4, 0.08]}><boxGeometry args={[0.28, 0.8, 0.55]} /><meshStandardMaterial color={BOOK_PALETTE[index]} emissive={accent} emissiveIntensity={0.18} /></mesh>)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -depthRows * 1.5]}><planeGeometry args={[15, Math.max(50, depthRows * 3.2)]} /><meshStandardMaterial color="#090603" metalness={0.68} roughness={0.28} /></mesh>
      <Dust count={420} color={accent} scale={[18, 12, Math.max(60, depthRows * 3.2)]} size={0.72} speed={0.08} opacity={0.52} />
    </group>
  );
}

export default function InfiniteLibrary({ settings = {} }) {
  return <GpuExperience scene="infinite-library" World={InfiniteLibraryWorld} settings={settings} accent="#e4b56f" background="#050301" eyebrow="21 — Endless archive" title={"Every aisle\nholds another world."} description="Procedural shelves repeat beyond sight while dust and warm reading lights drift through the stacks." cta="Find the unwritten book" />;
}
