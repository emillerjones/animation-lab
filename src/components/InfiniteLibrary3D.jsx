import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import AnimationReadout from "./AnimationReadout";
import "./InfiniteLibrary3D.css";

const dummy = new THREE.Object3D();
const SIDE_X = 4.6;
const BAY_DEPTH = 1.7;
const SHELF_LEVELS = 6;
const LEVEL_HEIGHT = 0.52;
const FAR_BAY_COUNT = 600;
const FAR_PANEL_HEIGHT = SHELF_LEVELS * LEVEL_HEIGHT;
// The vault springs well above the shelf tops and rises on an 8.6-unit radius — roughly
// a 48ft apex over 10ft shelves, tall enough to read as a hall, not a corridor. The
// springline also has to clear the drag-orbit camera's max reachable height (~5 units,
// derived from CanvasStage's default orbit radius and pitch clamp) with real margin, or
// looking up — the one thing you'd actually do to see a vaulted ceiling — clips into it.
const VAULT_SPRINGLINE = 6;
const VAULT_RADIUS = 8.6;

function useWoodGrainTexture(repeatX = 2, repeatY = 2) {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#8b5a30";
    ctx.fillRect(0, 0, size, size);
    // Alternating dark and light streaks (rather than only-ever-darkening lines) is what
    // gives real grain its contrast — a wood texture built from one-directional shading
    // reads as muddy and flat, especially once scene lighting dims it further.
    for (let i = 0; i < 130; i += 1) {
      const y = seeded(i, 8801) * size;
      const amp = 3 + seeded(i, 8802) * 11;
      const freq = 0.006 + seeded(i, 8803) * 0.018;
      const dark = seeded(i, 8804) > 0.45;
      const alpha = 0.08 + seeded(i, 8805) * 0.4;
      ctx.strokeStyle = dark
        ? `rgba(40, 17, 6, ${alpha})`
        : `rgba(232, 178, 108, ${alpha * 0.85})`;
      ctx.lineWidth = 0.6 + seeded(i, 8806) * 2.8;
      ctx.beginPath();
      for (let x = 0; x <= size; x += 8) {
        const yy = y + Math.sin(x * freq + i) * amp;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    for (let i = 0; i < 8; i += 1) {
      const kx = seeded(i, 8901) * size;
      const ky = seeded(i, 8902) * size;
      const kr = 7 + seeded(i, 8903) * 13;
      const grad = ctx.createRadialGradient(kx, ky, 0, kx, ky, kr);
      grad.addColorStop(0, "rgba(30,15,6,0.55)");
      grad.addColorStop(1, "rgba(30,15,6,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(kx, ky, kr, kr * 1.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    return texture;
  }, [repeatX, repeatY]);
}

// A wide, shallow coffered panel pattern for the vault's underside — the arc sweep
// (0 → π) maps to the texture's full width, so repeat.x should stay 1.
function useVaultCofferTexture(repeatY = 1) {
  return useMemo(() => {
    const w = 1024;
    const h = 256;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#efe0bd";
    ctx.fillRect(0, 0, w, h);
    const cols = 9;
    const rows = 2;
    const cw = w / cols;
    const rh = h / rows;
    for (let cx = 0; cx < cols; cx += 1) {
      for (let ry = 0; ry < rows; ry += 1) {
        const px = cx * cw;
        const py = ry * rh;
        const grad = ctx.createRadialGradient(px + cw / 2, py + rh / 2, 6, px + cw / 2, py + rh / 2, Math.max(cw, rh) / 1.3);
        grad.addColorStop(0, "rgba(255,246,220,0.55)");
        grad.addColorStop(1, "rgba(112,84,44,0.32)");
        ctx.fillStyle = grad;
        ctx.fillRect(px + 6, py + 6, cw - 12, rh - 12);
      }
    }
    ctx.strokeStyle = "rgba(196,158,88,0.75)";
    ctx.lineWidth = 5;
    for (let cx = 0; cx <= cols; cx += 1) {
      ctx.beginPath();
      ctx.moveTo(cx * cw, 0);
      ctx.lineTo(cx * cw, h);
      ctx.stroke();
    }
    for (let ry = 0; ry <= rows; ry += 1) {
      ctx.beginPath();
      ctx.moveTo(0, ry * rh);
      ctx.lineTo(w, ry * rh);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, repeatY);
    return texture;
  }, [repeatY]);
}

function ShelfStructure({ bayCount, accent }) {
  const plankRef = useRef();
  const panelRef = useRef();
  const plankWoodMap = useWoodGrainTexture(2, 1.4);
  const panelWoodMap = useWoodGrainTexture(1, 3);

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

  // Static geometry — the matrices never change after layout, so they're written once
  // (useEffect) instead of every frame (useFrame). Re-uploading an unchanged instance
  // buffer 60x/sec was the main cost of pushing the bay-count slider high.
  useEffect(() => {
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
  }, [planks, panels]);

  return (
    <group>
      {/* receiveShadow only — with up to ~1,600 plank/panel instances, having them also
          cast shadows onto each other is where the real GPU cost was hiding. */}
      <instancedMesh ref={plankRef} args={[undefined, undefined, planks.length]} frustumCulled={false} receiveShadow>
        <boxGeometry args={[1, 0.04, BAY_DEPTH * 0.94]} />
        <meshStandardMaterial map={plankWoodMap} color="#8a6a44" roughness={0.75} emissive={accent} emissiveIntensity={0.04} />
      </instancedMesh>
      {/* This panel is the back wall behind the books (outer edge of each bay) as much as
          it's an end-cap divider — a *lit* material here wasn't reliably reached by any of
          the scene's lights and was rendering flat black. Unlit + wood map guarantees it
          always shows real texture instead of a void, same fix as the books' fog issue. */}
      <instancedMesh ref={panelRef} args={[undefined, undefined, panels.length]} frustumCulled={false}>
        <boxGeometry args={[0.05, SHELF_LEVELS * LEVEL_HEIGHT, BAY_DEPTH * 0.94]} />
        <meshBasicMaterial map={panelWoodMap} color="#6b5233" />
      </instancedMesh>
    </group>
  );
}

// Ceiling-height horizontal beams, spanning both shelf rows — the structural read of
// "you're under a roof," kept from the reference but pushed up to the vault's springline
// instead of capping the room a few feet above the shelves.
function CrossBeams({ bayCount }) {
  const meshRef = useRef();
  const woodMap = useWoodGrainTexture(7, 1);
  const beamSpacing = 4;
  const beamLength = (SIDE_X + 0.72) * 2 + 1.6;

  const beams = useMemo(() => {
    const list = [];
    for (let bay = 0; bay <= bayCount; bay += beamSpacing) list.push({ z: -bay * BAY_DEPTH });
    return list;
  }, [bayCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    beams.forEach((beam, index) => {
      dummy.position.set(0, VAULT_SPRINGLINE, beam.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [beams]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, beams.length]} frustumCulled={false} castShadow receiveShadow>
      <boxGeometry args={[beamLength, 0.42, 0.34]} />
      <meshStandardMaterial map={woodMap} color="#a38878" roughness={0.7} metalness={0.04} />
    </instancedMesh>
  );
}

// Vertical posts closing the gap between the shelf tops and the beams above them — without
// these the beams read as floating planks with nothing holding them up.
function BeamSupports({ bayCount }) {
  const meshRef = useRef();
  const woodMap = useWoodGrainTexture(1, 3);
  const beamSpacing = 4;
  const shelfTop = SHELF_LEVELS * LEVEL_HEIGHT;
  const postHeight = VAULT_SPRINGLINE - shelfTop;
  const postX = SIDE_X + 0.72;

  const posts = useMemo(() => {
    const list = [];
    for (let bay = 0; bay <= bayCount; bay += beamSpacing) {
      const z = -bay * BAY_DEPTH;
      [-1, 1].forEach((side) => list.push({ x: side * postX, z }));
    }
    return list;
  }, [bayCount, postX]);

  useEffect(() => {
    if (!meshRef.current) return;
    posts.forEach((post, index) => {
      dummy.position.set(post.x, shelfTop + postHeight / 2, post.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [posts, shelfTop, postHeight]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, posts.length]} frustumCulled={false} castShadow receiveShadow>
      <boxGeometry args={[0.34, postHeight, 0.34]} />
      <meshStandardMaterial map={woodMap} color="#8a6a44" roughness={0.72} metalness={0.04} />
    </instancedMesh>
  );
}

// The vault itself: a barrel-vault shell (half-cylinder, viewed from inside) springing
// from just above the cross beams. Built from a CylinderGeometry rotated so its axis
// runs along the depth (Z) instead of the default height (Y) axis.
// three.js's CylinderGeometry parametrizes its circumference as x=r*sin(theta), z=r*cos(theta)
// (theta=0 points toward +Z, not +X) — thetaStart must be Math.PI/2 so the sweep spans
// x from -R to +R with the peak at +R, not just x in [0, R]. Using thetaStart=0 (the
// naive assumption) put the whole vault to one side instead of centered overhead.
function VaultedCeiling({ depth }) {
  const texture = useVaultCofferTexture(Math.max(1, Math.round(depth / 14)));
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(VAULT_RADIUS, VAULT_RADIUS, depth, 48, 1, true, Math.PI / 2, Math.PI);
    geo.rotateX(Math.PI / 2);
    return geo;
  }, [depth]);

  return (
    <mesh geometry={geometry} position={[0, VAULT_SPRINGLINE, -depth / 2 + 12]}>
      <meshStandardMaterial map={texture} color="#fff3da" side={THREE.BackSide} roughness={0.82} metalness={0.06} />
    </mesh>
  );
}

// Gilded rib arches tracing the vault's curve at intervals — the detail that keeps the
// ceiling from reading as "a textureless brown box," sparser than the wooden cross beams
// so the wood structure still reads as primary and the gold as ornament above it.
function VaultRibs({ bayCount }) {
  const meshRef = useRef();
  const ribSpacing = 8;
  const geometry = useMemo(() => new THREE.TorusGeometry(VAULT_RADIUS, 0.13, 10, 48, Math.PI), []);

  const ribs = useMemo(() => {
    const list = [];
    for (let bay = 0; bay <= bayCount; bay += ribSpacing) list.push({ z: -bay * BAY_DEPTH });
    return list;
  }, [bayCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    ribs.forEach((rib, index) => {
      dummy.position.set(0, VAULT_SPRINGLINE, rib.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [ribs]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, ribs.length]} frustumCulled={false}>
      <meshStandardMaterial color="#d8b46a" metalness={0.65} roughness={0.3} emissive="#3d2a0e" emissiveIntensity={0.18} />
    </instancedMesh>
  );
}

// Cheap stand-ins for the shelving well beyond the detailed near tier: one flat
// side-panel silhouette per bay-side (2 instances/bay vs. the near tier's 16),
// laid out once and never touched again. Fog and distance do the rest of the
// work of selling "this keeps going," without paying for full plank geometry
// or per-bay lighting out there.
function FarShelfSilhouettes({ startZ, accent }) {
  const meshRef = useRef();

  const panels = useMemo(() => {
    const list = [];
    for (let bay = 0; bay < FAR_BAY_COUNT; bay += 1) {
      const z = startZ - bay * BAY_DEPTH;
      [-1, 1].forEach((side) => {
        list.push({ x: side * (SIDE_X + 0.72), z });
      });
    }
    return list;
  }, [startZ]);

  useEffect(() => {
    if (!meshRef.current) return;
    panels.forEach((panel, index) => {
      dummy.position.set(panel.x, FAR_PANEL_HEIGHT / 2, panel.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [panels]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, panels.length]}>
      <boxGeometry args={[0.05, FAR_PANEL_HEIGHT, BAY_DEPTH * 0.94]} />
      <meshStandardMaterial color="#1c140c" roughness={0.9} emissive={accent} emissiveIntensity={0.03} />
    </instancedMesh>
  );
}

// A curated palette reads as "distinct books" far better than continuous random hue —
// neighboring random HSL hues are often too close in tone to tell apart at a glance,
// especially once ambient/fog dims things. Unlit + toneMapped=false keeps every color
// punchy and legible regardless of how the hall around it is lit.
const BOOK_PALETTE = [
  "#b8453a", "#d98a3d", "#d9bb62", "#4f7d5c", "#3f7f8c",
  "#5a72ad", "#8a5aa0", "#a34a6b", "#8a5a30", "#c97f4a",
];

// A white-based spine texture (ridge bands + a title block) so it tints correctly under
// any palette color via the standard map*color multiply, instead of needing one texture
// baked per color.
function useBookSpineTexture() {
  return useMemo(() => {
    const w = 64;
    const h = 128;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(0, h * 0.11, w, 3);
    ctx.fillRect(0, h * 0.19, w, 2);
    ctx.fillRect(0, h * 0.78, w, 2);
    ctx.fillRect(0, h * 0.86, w, 3);
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    ctx.fillRect(w * 0.15, h * 0.34, w * 0.7, h * 0.2);
    for (let i = 0; i < 30; i += 1) {
      const x = seeded(i, 9001) * w;
      ctx.fillStyle = `rgba(0,0,0,${0.03 + seeded(i, 9002) * 0.06})`;
      ctx.fillRect(x, 0, 0.6, h);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

// One InstancedMesh per palette color (matching chat's proven approach) rather than a
// single mesh driven by per-instance setColorAt — instance-color buffers on
// InstancedMesh turned out not to render at all here (books stayed solid black even at
// close range with fog disabled), while a uniform material.color per batch is guaranteed
// to work. ~10 draw calls total instead of 1 is immaterial at this instance count.
function BookBatch({ entries, color, speed, spineMap }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    entries.forEach((book, index) => {
      dummy.position.set(book.x, book.y + Math.sin(t * 0.25 + book.bob) * 0.008, book.z);
      dummy.rotation.set(0, 0, book.tilt);
      dummy.scale.set(book.width, book.height, 0.24);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // No castShadow: shadow-mapping thousands of individual instances is real cost for a
  // barely-visible effect at that scale — the beams/shelves already ground the lighting.
  // Fog is left on (no fog={false} override) so books recede into the murk at the same
  // rate as everything else — with it disabled, distant books stayed at full brightness
  // and looked like they were glowing against the dimmer, fogged shelving around them.
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, entries.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={spineMap} color={color} toneMapped={false} />
    </instancedMesh>
  );
}

function BookInstances({ count, slotBayCount }) {
  const speed = useSpeed();
  const spineMap = useBookSpineTexture();
  const slotCount = slotBayCount * 2 * SHELF_LEVELS;

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
      colorIndex: Math.floor(seeded(index, 1605) * BOOK_PALETTE.length) % BOOK_PALETTE.length,
      bob: seeded(index, 1606) * Math.PI * 2,
    };
  }), [count, slotCount]);

  const batches = useMemo(
    () => BOOK_PALETTE.map((_, colorIndex) => books.filter((book) => book.colorIndex === colorIndex)),
    [books],
  );

  return batches.map((batch, colorIndex) => (
    batch.length > 0
      ? <BookBatch key={BOOK_PALETTE[colorIndex]} entries={batch} color={BOOK_PALETTE[colorIndex]} speed={speed} spineMap={spineMap} />
      : null
  ));
}

// A marble-and-brass tile pattern, alternating light/dark stone in a running-bond
// layout with a thin gold inlay line — read through the reflective floor's roughness
// channel so the tile joints actually catch and scatter the reflection instead of the
// floor being one uninterrupted mirror.
function useFloorTileTexture(repeatY) {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#2c2015";
    ctx.fillRect(0, 0, size, size);
    const cols = 6;
    const rows = 6;
    const cw = size / cols;
    const rh = size / rows;
    for (let ry = 0; ry < rows; ry += 1) {
      for (let cx = 0; cx < cols; cx += 1) {
        const offset = ry % 2 === 0 ? 0 : cw / 2;
        const px = ((cx * cw + offset) % size + size) % size;
        const dark = (cx + ry) % 2 === 0;
        ctx.fillStyle = dark ? "#160d07" : "#5a4127";
        ctx.fillRect(px, ry * rh, cw, rh);
        // A soft inset highlight on each tile so they read as individual slabs even
        // where the grout line contrast alone is too subtle to notice from a distance.
        ctx.fillStyle = dark ? "rgba(255,220,170,0.05)" : "rgba(255,235,200,0.1)";
        ctx.fillRect(px + 6, ry * rh + 6, cw - 12, rh - 12);
      }
    }
    ctx.strokeStyle = "rgba(226,188,118,0.75)";
    ctx.lineWidth = 4;
    for (let ry = 0; ry <= rows; ry += 1) {
      ctx.beginPath();
      ctx.moveTo(0, ry * rh);
      ctx.lineTo(size, ry * rh);
      ctx.stroke();
    }
    for (let ry = 0; ry < rows; ry += 1) {
      const offset = ry % 2 === 0 ? 0 : cw / 2;
      for (let cx = -1; cx <= cols; cx += 1) {
        const px = cx * cw + offset;
        ctx.beginPath();
        ctx.moveTo(px, ry * rh);
        ctx.lineTo(px, (ry + 1) * rh);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, repeatY);
    return texture;
  }, [repeatY]);
}

// A capping wall with a glowing doorway at the end of the detailed near tier — something
// to actually walk toward, instead of the hall just fading into flat fog with no target.
function EndOfHallDoorway({ z }) {
  const wallHeight = VAULT_SPRINGLINE + VAULT_RADIUS * 0.5;
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[VAULT_RADIUS * 1.9, wallHeight, 0.6]} />
        <meshStandardMaterial color="#20150c" roughness={0.88} />
      </mesh>
      <mesh position={[0, wallHeight * 0.42, 0.34]}>
        <planeGeometry args={[3.4, wallHeight * 0.72]} />
        <meshBasicMaterial color="#f6cd85" transparent opacity={0.6} toneMapped={false} />
      </mesh>
      <mesh position={[0, wallHeight * 0.42, 0.3]}>
        <planeGeometry args={[3.9, wallHeight * 0.8]} />
        <meshBasicMaterial color="#3a2510" />
      </mesh>
      <pointLight color="#f6cd85" intensity={28} distance={22} decay={2} position={[0, wallHeight * 0.5, 2]} />
    </group>
  );
}

// A tall, tiling wall-panel texture — vertical pilaster divisions with a gold cornice
// near the top and a baseboard near the bottom, echoing the vault's gold trim so the
// walls read as part of the same building instead of a separate flat backdrop.
function useWallPanelTexture(repeatX) {
  return useMemo(() => {
    const w = 512;
    const h = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#8a6b45";
    ctx.fillRect(0, 0, w, h);
    const cols = 3;
    const cw = w / cols;
    for (let c = 0; c < cols; c += 1) {
      const grad = ctx.createLinearGradient(c * cw, 0, (c + 1) * cw, 0);
      grad.addColorStop(0, "rgba(255,235,200,0.16)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.12)");
      grad.addColorStop(1, "rgba(255,235,200,0.16)");
      ctx.fillStyle = grad;
      ctx.fillRect(c * cw + 12, 50, cw - 24, h - 100);
    }
    ctx.strokeStyle = "rgba(230,192,120,0.65)";
    ctx.lineWidth = 5;
    for (let c = 0; c <= cols; c += 1) {
      ctx.beginPath();
      ctx.moveTo(c * cw, 0);
      ctx.lineTo(c * cw, h);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(230,192,120,0.55)";
    ctx.fillRect(0, 28, w, 14);
    ctx.fillRect(0, h - 60, w, 16);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, 1);
    return texture;
  }, [repeatX]);
}

// Side walls running parallel to the shelf rows, rising from the floor to exactly the
// vault's springline (its own base radius) — the height at which the barrel-vault curve
// begins, so the wall's top edge is the seam where the straight wall becomes the arched
// ceiling rather than climbing partway up the curve itself. Setting the wall any further
// in than the vault's base radius forces it to climb well past the springline to reach
// the curve, eating into the arc and reading as a quarter-dome instead of a half-dome.
// Unlit, like the shelf backs: a lit material this far from the point lights (they only
// reach ~10 units) rendered solid black before.
function SideWalls({ depth }) {
  const wallX = VAULT_RADIUS;
  const wallTop = VAULT_SPRINGLINE;
  const texture = useWallPanelTexture(Math.max(3, Math.round(depth / 10)));

  return (
    <>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * wallX, wallTop / 2, -depth / 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[depth + 20, wallTop]} />
          <meshBasicMaterial map={texture} color="#c9a877" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

// A tiled floor with a moderate planar reflection — the earlier full-strength reflector
// (mixStrength 25, heavy blur) rendered as a blurred mirror slab that drowned out the
// tile pattern underneath; dropping the reflection entirely made the ceiling lights read
// as decoration instead of actually lighting the room. This passes the tile texture in
// as the reflector's own diffuse map (MeshReflectorMaterial is a MeshStandardMaterial
// subclass, so `map` works normally) and mixes in a much weaker, softer reflection on
// top of it — visible sheen and light glints, tile pattern still clearly legible.
function AisleFloor({ depth }) {
  const tileMap = useFloorTileTexture(Math.max(2, Math.round(depth / 6)));
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -depth / 2]} receiveShadow>
      <planeGeometry args={[16, depth + 20]} />
      <MeshReflectorMaterial
        map={tileMap}
        roughnessMap={tileMap}
        resolution={512}
        blur={[110, 35]}
        mixBlur={0.55}
        mixStrength={1.3}
        depthScale={0.6}
        roughness={0.6}
        metalness={0.2}
      />
    </mesh>
  );
}

// Real light fixtures recessed into the vault apex, spaced with the gold ribs so each one
// reads as sitting in its own bay rather than floating free. Each is a real point light
// (not just a glowing disc) so it throws an actual highlight onto the floor below — that
// highlight is what makes the ceiling read as lit from above instead of just decorated.
function CeilingLights({ bayCount }) {
  const lightSpacing = 8;
  const apexY = VAULT_SPRINGLINE + VAULT_RADIUS - 0.12;

  const lights = useMemo(() => {
    const list = [];
    for (let bay = 0; bay <= bayCount; bay += lightSpacing) list.push(-bay * BAY_DEPTH);
    return list;
  }, [bayCount]);

  return lights.map((z, index) => (
    <group key={index} position={[0, apexY, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 24]} />
        <meshBasicMaterial color="#3a2a12" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[0.3, 24]} />
        <meshBasicMaterial color="#fff2cf" toneMapped={false} />
      </mesh>
      <pointLight color="#ffdca0" intensity={55} distance={22} decay={2} position={[0, -0.1, 0]} />
    </group>
  ));
}

// Real-time point lights are the expensive part of this scene, not the instanced
// geometry — capped at a fixed count regardless of bay count so the slider can't
// accidentally spawn dozens of dynamic lights. None of these cast shadows themselves
// (a shadow-casting point light renders its whole cube-map depth pass 6x over, and
// stacking several of those was what actually stalled the frame) — the single main
// point light below carries the shadow, these just throw real warm light onto the shelves.
function LampRow({ bayCount, accent }) {
  const lampCount = Math.min(12, Math.max(3, Math.ceil(bayCount / 12)));
  const depth = bayCount * BAY_DEPTH;
  return Array.from({ length: lampCount }, (_, index) => (
    <pointLight
      key={index}
      color={accent}
      intensity={11}
      distance={10.5}
      decay={2}
      position={[0, SHELF_LEVELS * LEVEL_HEIGHT + 0.6, -(index / Math.max(1, lampCount - 1)) * depth]}
    />
  ));
}

export default function InfiniteLibrary3D({ settings = {} }) {
  const bayCount = Math.max(10, Math.min(130, settings.shelves ?? 90));
  const bookCount = Math.max(200, Math.min(14000, settings.books ?? 6000));
  const nearDepth = bayCount * BAY_DEPTH;
  const totalDepth = (bayCount + FAR_BAY_COUNT) * BAY_DEPTH;

  return (
    <section className="atmosphere infinite-library-3d" style={{ "--experiment-accent": "#e0ba79" }}>
      <CanvasStage camera={{ position: [0, 1.4, 9], fov: 52 }} orbitEnabled shadows speed={settings.speed ?? 1} bloom={{ intensity: 0.6 }}>
        <color attach="background" args={["#050309"]} />
        <fogExp2 attach="fog" args={["#050309", 0.01]} />
        <ambientLight intensity={0.22} />
        <hemisphereLight args={["#fff3da", "#0c0806", 0.35]} />
        <pointLight color="#e0ba79" intensity={12} distance={12} decay={2} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-near={0.3} shadow-camera-far={14} position={[0, 3, 0]} />
        <LampRow bayCount={bayCount} accent="#e0ba79" />
        <AisleFloor depth={totalDepth} />
        <SideWalls depth={totalDepth} />
        <ShelfStructure bayCount={bayCount} accent="#e0ba79" />
        <CrossBeams bayCount={bayCount} />
        <BeamSupports bayCount={bayCount} />
        <VaultedCeiling depth={totalDepth} />
        <VaultRibs bayCount={bayCount} />
        <CeilingLights bayCount={bayCount} />
        <EndOfHallDoorway z={-nearDepth - 3} />
        <FarShelfSilhouettes startZ={-nearDepth} accent="#e0ba79" />
        <BookInstances count={bookCount} slotBayCount={bayCount + FAR_BAY_COUNT} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>16 — Perspective study, genuinely endless</p>
        <h1>A hall that<br />actually recedes.</h1>
        <span>Full shelving bays under a vaulted, gold-ribbed ceiling forty feet up, thousands of books threaded through the shelves, and a much longer silhouette fading into the fog far beyond where the detail stops.</span>
      </div>
      <AnimationReadout
        eyebrow="Live corridor"
        value={`${bookCount.toLocaleString()} BOOKS ON THE SHELVES`}
        stats={[{ value: bayCount, label: "SHELF BAYS" }]}
      />
    </section>
  );
}
