import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import AnimationReadout from "./AnimationReadout";
import "./InfiniteLibrary.css";

const SHELF_ROWS = 5;
const BOOK_SLOTS = 24;
const BAY_SPACING = 3.05;
const BOOK_PALETTE = ["#b84f43", "#d58a45", "#d7bd76", "#477b70", "#667da8", "#89618f", "#9e7046", "#7f394b"];

function useWoodTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 384;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    context.fillStyle = "#8b572f";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let line = 0; line < 92; line += 1) {
      const y = seeded(line, 701) * canvas.height;
      const alpha = 0.035 + seeded(line, 702) * 0.16;
      context.strokeStyle = seeded(line, 703) > 0.48
        ? `rgba(45, 18, 6, ${alpha})`
        : `rgba(238, 176, 100, ${alpha * 0.72})`;
      context.lineWidth = 0.4 + seeded(line, 704) * 2.2;
      context.beginPath();
      for (let x = 0; x <= canvas.width; x += 12) {
        const wave = Math.sin(x * (0.018 + seeded(line, 705) * 0.025) + line) * (1.2 + seeded(line, 706) * 3.8);
        if (x === 0) context.moveTo(x, y + wave);
        else context.lineTo(x, y + wave);
      }
      context.stroke();
    }
    for (let knot = 0; knot < 9; knot += 1) {
      const x = seeded(knot, 711) * canvas.width;
      const y = seeded(knot, 712) * canvas.height;
      context.strokeStyle = "rgba(49, 19, 7, 0.2)";
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(x, y, 10 + seeded(knot, 713) * 20, 2 + seeded(knot, 714) * 5, 0, 0, Math.PI * 2);
      context.stroke();
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(2.6, 1);
    return map;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

function LibraryFog() {
  const scene = useThree((state) => state.scene);
  useLayoutEffect(() => {
    const previousFog = scene.fog;
    scene.fog = new THREE.FogExp2("#080401", 0.006);
    return () => { scene.fog = previousFog; };
  }, [scene]);
  return null;
}

function setInstance(mesh, index, position, scale, rotationY = 0) {
  const dummy = new THREE.Object3D();
  dummy.position.set(...position);
  dummy.rotation.y = rotationY;
  dummy.scale.set(...scale);
  dummy.updateMatrix();
  mesh.setMatrixAt(index, dummy.matrix);
}

function ShelfArchitecture({ bays, woodTexture }) {
  const backs = useRef();
  const shelves = useRef();
  const uprights = useRef();

  useLayoutEffect(() => {
    if (!backs.current || !shelves.current || !uprights.current) return;
    for (let bay = 0; bay < bays; bay += 1) {
      const side = bay % 2 ? 1 : -1;
      const depth = Math.floor(bay / 2);
      const z = -depth * BAY_SPACING;
      setInstance(backs.current, bay, [side * 7.48, 3.55, z], [0.22, 7.25, 2.88]);
      for (let row = 0; row < SHELF_ROWS + 1; row += 1) {
        setInstance(shelves.current, bay * (SHELF_ROWS + 1) + row, [side * 6.98, 0.12 + row * 1.34, z], [1.18, 0.12, 2.98]);
      }
      setInstance(uprights.current, bay * 2, [side * 6.55, 3.58, z - 1.45], [0.22, 7.35, 0.18]);
      setInstance(uprights.current, bay * 2 + 1, [side * 6.55, 3.58, z + 1.45], [0.22, 7.35, 0.18]);
    }
    [backs.current, shelves.current, uprights.current].forEach((mesh) => {
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    });
  }, [bays]);

  return (
    <>
      <instancedMesh ref={backs} args={[undefined, undefined, bays]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#2f1d12" />
      </instancedMesh>
      <instancedMesh ref={shelves} args={[undefined, undefined, bays * (SHELF_ROWS + 1)]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#b77b46" map={woodTexture} />
      </instancedMesh>
      <instancedMesh ref={uprights} args={[undefined, undefined, bays * 2]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#c18a50" map={woodTexture} />
      </instancedMesh>
    </>
  );
}

function BookBatch({ entries, color, outline = false }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    entries.forEach((book, index) => {
      dummy.position.set(book.x - (outline ? 0 : book.side * 0.05), book.y, book.z);
      dummy.rotation.set(0, 0, book.tilt);
      dummy.scale.set(
        book.depth + (outline ? 0.02 : 0),
        book.height + (outline ? 0.045 : 0),
        book.width + (outline ? 0.026 : 0),
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [dummy, entries, outline]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, entries.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

function InstancedBooks({ count, bays }) {
  const visibleCount = Math.min(count, bays * SHELF_ROWS * BOOK_SLOTS);
  const entries = useMemo(() => Array.from({ length: visibleCount }, (_, index) => {
    const bay = index % bays;
    const sequence = Math.floor(index / bays);
    const row = sequence % SHELF_ROWS;
    const slot = (Math.floor(sequence / SHELF_ROWS) * 7) % BOOK_SLOTS;
    const side = bay % 2 ? 1 : -1;
    const depth = Math.floor(bay / 2);
    const height = 0.62 + seeded(index, 406) * 0.38;
    const slotZ = -1.35 + (slot + 0.5) * (2.7 / BOOK_SLOTS);
    return {
      side,
      x: side * 6.72,
      y: 0.2 + row * 1.34 + height * 0.5,
      z: -depth * BAY_SPACING + slotZ,
      height,
      width: 0.04 + seeded(index, 409) * 0.028,
      depth: 0.42 + seeded(index, 410) * 0.1,
      tilt: (seeded(index, 408) - 0.5) * 0.055,
      colorIndex: Math.floor(seeded(index, 415) * BOOK_PALETTE.length),
    };
  }), [bays, visibleCount]);
  const batches = useMemo(() => BOOK_PALETTE.map((_, colorIndex) => entries.filter((book) => book.colorIndex === colorIndex)), [entries]);

  return (
    <>
      <BookBatch entries={entries} color="#180d09" outline />
      {batches.map((batch, colorIndex) => <BookBatch key={BOOK_PALETTE[colorIndex]} entries={batch} color={BOOK_PALETTE[colorIndex]} />)}
    </>
  );
}

function LibraryShell({ depthRows, accent, woodTexture }) {
  const aisleDepth = Math.max(76, depthRows * BAY_SPACING + 8);
  const centerZ = 3 - aisleDepth * 0.5;
  const beamCount = Math.ceil(aisleDepth / 6);
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, centerZ]}>
        <planeGeometry args={[15.2, aisleDepth]} />
        <meshStandardMaterial color="#2a170d" metalness={0.24} roughness={0.5} emissive="#140905" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, centerZ]}>
        <planeGeometry args={[3.7, aisleDepth]} />
        <meshStandardMaterial color="#5b201b" roughness={0.78} emissive="#270a07" emissiveIntensity={0.34} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8.05, centerZ]}>
        <planeGeometry args={[15.2, aisleDepth]} />
        <meshBasicMaterial color="#21140d" side={THREE.DoubleSide} />
      </mesh>
      {range(beamCount).map((index) => {
        const z = 1 - index * 6;
        return (
          <group key={index} position={[0, 0, z]}>
            <mesh position={[0, 7.88, 0]}><boxGeometry args={[15.3, 0.28, 0.36]} /><meshBasicMaterial color="#b57a45" map={woodTexture} /></mesh>
            <mesh position={[-6.55, 4.1, 0]}><boxGeometry args={[0.32, 7.7, 0.42]} /><meshBasicMaterial color="#b98049" map={woodTexture} /></mesh>
            <mesh position={[6.55, 4.1, 0]}><boxGeometry args={[0.32, 7.7, 0.42]} /><meshBasicMaterial color="#b98049" map={woodTexture} /></mesh>
          </group>
        );
      })}
      <group position={[0, 3.9, -aisleDepth + 4]}>
        <mesh><boxGeometry args={[13.2, 7.8, 0.45]} /><meshBasicMaterial color="#2b1a10" /></mesh>
        <mesh position={[0, -0.15, 0.28]}><planeGeometry args={[2.5, 5.3]} /><meshBasicMaterial color={accent} transparent opacity={0.28} toneMapped={false} /></mesh>
      </group>
    </>
  );
}

function InfiniteLibraryWorld({ settings, accent }) {
  const library = useRef();
  const woodTexture = useWoodTexture();
  const shelves = Math.max(10, Math.min(130, Math.round(settings.shelves ?? 90)));
  const books = Math.max(200, Math.min(14000, Math.round(settings.books ?? 6000)));
  const depthRows = Math.ceil(shelves / 2);
  const aisleDepth = Math.max(76, depthRows * BAY_SPACING + 8);

  useFrame((state) => {
    if (!library.current) return;
    library.current.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.45;
    library.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.028) * 0.004;
  });

  return (
    <group ref={library} position={[3, -2.5, -8]}>
      <LibraryFog />
      <LibraryShell depthRows={depthRows} accent={accent} woodTexture={woodTexture} />
      <ShelfArchitecture bays={shelves} woodTexture={woodTexture} />
      <InstancedBooks count={books} bays={shelves} />
      {range(Math.min(16, Math.ceil(aisleDepth / 14))).map((index) => (
        <group key={index} position={[0, 6.65, -4 - index * 14]}>
          <pointLight color="#ffd99b" intensity={32} distance={18} decay={2} />
        </group>
      ))}
      <Dust count={560} color={accent} scale={[16, 12, aisleDepth]} size={0.62} speed={0.055} opacity={0.46} />
    </group>
  );
}

export default function InfiniteLibrary({ settings = {} }) {
  const shelves = Math.max(10, Math.min(130, Math.round(settings.shelves ?? 90)));
  const books = Math.max(200, Math.min(14000, Math.round(settings.books ?? 6000)));
  const visibleBooks = Math.min(books, shelves * SHELF_ROWS * BOOK_SLOTS);

  return (
    <GpuExperience
      scene="infinite-library"
      World={InfiniteLibraryWorld}
      settings={settings}
      accent="#e4b56f"
      background="#050301"
      eyebrow="12 — Endless archive"
      title={"Every aisle\nholds another world."}
      description="Book-filled galleries, timber vaults, and pools of reading light repeat beyond sight."
      foreground={(
        <AnimationReadout
          eyebrow="Live archive"
          value={`${visibleBooks.toLocaleString()} BOOKS SHELVED`}
          stats={[{ value: shelves, label: "SHELF BAYS" }]}
        />
      )}
    />
  );
}
