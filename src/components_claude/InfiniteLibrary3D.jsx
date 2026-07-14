import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./InfiniteLibrary3D.css";

const dummy = new THREE.Object3D();
const SIDE_X = 4.6;
const BAY_DEPTH = 1.7;
const SHELF_LEVELS = 6;
const LEVEL_HEIGHT = 0.52;

function ShelfStructure({ bayCount, accent }) {
  const plankRef = useRef();
  const panelRef = useRef();

  const { planks, panels } = useMemo(() => {
    const plankList = [];
    const panelList = [];
    for (let bay = 0; bay < bayCount; bay += 1) {
      const z = -bay * BAY_DEPTH;
      [-1, 1].forEach((side) => {
        for (let level = 0; level <= SHELF_LEVELS; level += 1) {
          plankList.push({ x: side * SIDE_X, y: level * LEVEL_HEIGHT, z });
        }
        panelList.push({ x: side * SIDE_X + side * 0.72, y: (SHELF_LEVELS * LEVEL_HEIGHT) / 2, z });
      });
    }
    return { planks: plankList, panels: panelList };
  }, [bayCount]);

  useFrame(() => {
    if (!plankRef.current || !panelRef.current) return;
    planks.forEach((plank, index) => {
      dummy.position.set(plank.x, plank.y, plank.z);
      dummy.scale.set(1.5, 1, 1);
      dummy.updateMatrix();
      plankRef.current.setMatrixAt(index, dummy.matrix);
    });
    plankRef.current.instanceMatrix.needsUpdate = true;
    panels.forEach((panel, index) => {
      dummy.position.set(panel.x, panel.y, panel.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      panelRef.current.setMatrixAt(index, dummy.matrix);
    });
    panelRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={plankRef} args={[undefined, undefined, planks.length]} frustumCulled={false}>
        <boxGeometry args={[1, 0.04, BAY_DEPTH * 0.94]} />
        <meshStandardMaterial color="#3a2b1a" roughness={0.8} emissive={accent} emissiveIntensity={0.04} />
      </instancedMesh>
      <instancedMesh ref={panelRef} args={[undefined, undefined, panels.length]} frustumCulled={false}>
        <boxGeometry args={[0.05, SHELF_LEVELS * LEVEL_HEIGHT, BAY_DEPTH * 0.94]} />
        <meshStandardMaterial color="#241a10" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}

function BookInstances({ count, bayCount, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const slotCount = bayCount * 2 * SHELF_LEVELS;

  const books = useMemo(() => Array.from({ length: count }, (_, index) => {
    const slot = index % slotCount;
    const bay = Math.floor(slot / (2 * SHELF_LEVELS));
    const side = Math.floor(slot / SHELF_LEVELS) % 2 === 0 ? -1 : 1;
    const level = slot % SHELF_LEVELS;
    const alongShelf = (seeded(index, 1601) - 0.5) * (BAY_DEPTH * 0.85);
    const width = 0.05 + seeded(index, 1602) * 0.045;
    const height = 0.3 + seeded(index, 1603) * 0.18;
    return {
      x: side * SIDE_X + side * (0.36 - width * 3),
      y: level * LEVEL_HEIGHT + height / 2 + 0.03,
      z: -bay * BAY_DEPTH + alongShelf,
      width,
      height,
      tilt: (seeded(index, 1604) - 0.5) * 0.1,
      hue: seeded(index, 1605),
      bob: seeded(index, 1606) * Math.PI * 2,
    };
  }), [count, slotCount]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    books.forEach((book, index) => {
      dummy.position.set(book.x, book.y + Math.sin(t * 0.25 + book.bob) * 0.008, book.z);
      dummy.rotation.set(0, 0, book.tilt);
      dummy.scale.set(book.width, book.height, 0.24);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
      meshRef.current.setColorAt(index, new THREE.Color().setHSL(book.hue, 0.55, 0.42));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors roughness={0.6} emissive={accent} emissiveIntensity={0.1} />
    </instancedMesh>
  );
}

function ReflectiveAisle({ depth }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -depth / 2]}>
      <planeGeometry args={[16, depth + 20]} />
      <MeshReflectorMaterial blur={[200, 60]} resolution={512} mixBlur={1} mixStrength={25} roughness={1} depthScale={1} color="#08060a" metalness={0.4} />
    </mesh>
  );
}

function LampRow({ bayCount, accent }) {
  return Array.from({ length: Math.ceil(bayCount / 3) }, (_, index) => (
    <pointLight key={index} color={accent} intensity={9} distance={9} position={[0, SHELF_LEVELS * LEVEL_HEIGHT + 0.6, -index * 3 * BAY_DEPTH]} />
  ));
}

export default function InfiniteLibrary3D({ settings = {} }) {
  const bayCount = Math.max(10, Math.min(300, settings.shelves ?? 120));
  const bookCount = Math.max(200, Math.min(10000, settings.books ?? 4000));
  const depth = bayCount * BAY_DEPTH;

  return (
    <section className="atmosphere infinite-library-3d">
      <CanvasStage camera={{ position: [0, 1.4, 9], fov: 52 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.6 }}>
        <color attach="background" args={["#050309"]} />
        <fogExp2 attach="fog" args={["#050309", 0.01]} />
        <ambientLight intensity={0.15} />
        <pointLight color="#e0ba79" intensity={30} distance={20} position={[0, 3, 0]} />
        <LampRow bayCount={bayCount} accent="#e0ba79" />
        <ReflectiveAisle depth={depth} />
        <ShelfStructure bayCount={bayCount} accent="#e0ba79" />
        <BookInstances count={bookCount} bayCount={bayCount} accent="#e0ba79" />
      </CanvasStage>
      <div className="experiment-copy">
        <p>21B — Perspective study, genuinely endless</p>
        <h1>Shelves that<br />actually recede.</h1>
        <span>Real shelving bays packed with thousands of books, reflected in a real aisle floor that runs on into the dark.</span>
      </div>
    </section>
  );
}
