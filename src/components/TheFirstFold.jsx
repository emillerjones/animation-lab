import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import "./TheFirstFold.css";

// ---------------------------------------------------------------------------
// A single traditional origami crane, built to actually match the real
// bird-base fold rather than a stylized low-poly bird: a thin blade-like
// body (two flat side panels meeting at a keel and a ridge, not a rounded
// hull), a long flat neck rising to a sharp reverse-folded head with a
// downward beak, a separate tapered tail, and two broad triangular wings
// each split by a visible crease ridge rather than left perfectly flat.
// Every part is non-indexed (each triangle owns its own three vertices) so
// computeVertexNormals gives genuine flat-shaded facets with hard edges —
// no smoothing across folds, no rounded surfaces.
// ---------------------------------------------------------------------------
function tri(positions, a, b, c) {
  positions.push(...a, ...b, ...c);
}

function buildCraneGeometry() {
  const positions = [];

  // --- Body: a thin blade-like hull, two side panels meeting at a bottom
  // keel and a top ridge, pointed at both the neck and tail attachments.
  // A tiny X offset per side is the only "thickness" — just enough for the
  // light to separate the two faces at a grazing angle, like real paper.
  const KEEL_L = [-0.028, -0.05, 0.05];
  const KEEL_R = [0.028, -0.05, 0.05];
  const RIDGE_L = [-0.028, 0.55, 0.15];
  const RIDGE_R = [0.028, 0.55, 0.15];
  const FRONT_L = [-0.028, 0.32, 0.68];
  const FRONT_R = [0.028, 0.32, 0.68];
  const BACK_L = [-0.028, 0.26, -0.62];
  const BACK_R = [0.028, 0.26, -0.62];

  tri(positions, KEEL_L, FRONT_L, RIDGE_L);
  tri(positions, KEEL_L, RIDGE_L, BACK_L);
  tri(positions, KEEL_R, RIDGE_R, FRONT_R);
  tri(positions, KEEL_R, BACK_R, RIDGE_R);

  // --- Neck: a long, flat blade rising from the body's front point at a
  // steep angle — the single most identifying silhouette feature of a crane.
  const NECK_BASE_L = [-0.035, 0.32, 0.66];
  const NECK_BASE_R = [0.035, 0.32, 0.66];
  const NECK_TIP_L = [-0.02, 0.98, 1.55];
  const NECK_TIP_R = [0.02, 0.98, 1.55];

  tri(positions, NECK_BASE_L, NECK_BASE_R, NECK_TIP_R);
  tri(positions, NECK_BASE_L, NECK_TIP_R, NECK_TIP_L);

  // --- Head: a sharp reverse-fold at the neck's tip, a small angular flap
  // whose point (the beak) bends down and forward — the crane's other
  // unmistakable feature, distinct from any rounded bird head.
  const BEAK_TIP = [0, 0.78, 1.92];
  tri(positions, NECK_TIP_L, NECK_TIP_R, BEAK_TIP);

  // --- Tail: shorter and simpler than the neck, a single clean taper.
  const TAIL_BASE_L = [-0.04, 0.26, -0.6];
  const TAIL_BASE_R = [0.04, 0.26, -0.6];
  const TAIL_TIP = [0, 0.34, -1.15];
  tri(positions, TAIL_BASE_L, TAIL_BASE_R, TAIL_TIP);

  // --- Wings: broad triangles rooted along the body's ridge, each split
  // into two facets by a crease point pulled upward off the straight
  // root-to-tip line — a visible fold ridge, not a flat uncreased panel.
  function wing(sign) {
    const root = [0.04 * sign, 0.52, 0.1];
    const tipFront = [0.95 * sign, 0.68, 0.62];
    const tipBack = [1.85 * sign, 0.78, -0.55];
    const crease = [1.2 * sign, 0.98, -0.02];
    if (sign > 0) {
      tri(positions, root, tipFront, crease);
      tri(positions, root, crease, tipBack);
    } else {
      tri(positions, root, crease, tipFront);
      tri(positions, root, tipBack, crease);
    }
  }
  wing(1);
  wing(-1);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

function makeShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.55)");
  gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.28)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function Crane({ settings }) {
  const groupRef = useRef();
  const speed = useSpeed();
  const rotationSpeedMul = settings.rotationSpeed ?? 1;
  const dragRef = useDragOrbit({ pitchMin: -0.5, pitchMax: 0.55 });
  const baseYawRef = useRef(0.55);

  const geometry = useMemo(() => buildCraneGeometry(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#f5ecd9",
    roughness: 0.82,
    metalness: 0,
    transmission: 0.1,
    thickness: 0.35,
    ior: 1.4,
    sheen: 0.25,
    sheenColor: new THREE.Color("#fff6e6"),
    side: THREE.DoubleSide,
    flatShading: true,
  }), []);
  useEffect(() => () => material.dispose(), [material]);

  const shadowTexture = useMemo(() => makeShadowTexture(), []);
  const shadowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  }), [shadowTexture]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05) * speed;
    baseYawRef.current += delta * 0.12 * rotationSpeedMul;
    if (groupRef.current) {
      groupRef.current.rotation.y = baseYawRef.current + dragRef.current.targetYaw;
      groupRef.current.rotation.x = dragRef.current.targetPitch * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={groupRef} geometry={geometry} material={material} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} material={shadowMaterial}>
        <circleGeometry args={[1.6, 48]} />
      </mesh>
    </group>
  );
}

function FoldScene({ settings }) {
  const lightWarmth = (settings.lightWarmth ?? 100) / 100;
  return (
    <group>
      <ambientLight intensity={0.22} color="#e8dcc8" />
      <hemisphereLight color="#d8c8a8" groundColor="#14100a" intensity={0.2} />
      <directionalLight position={[3.2, 3.6, 2.2]} intensity={2.1 * lightWarmth} color="#fff2d8" />
      <directionalLight position={[-2.6, 1.4, -1.8]} intensity={0.55 * lightWarmth} color="#a8c8ff" />
      <pointLight position={[0, 1.6, 3.4]} intensity={2.2 * lightWarmth} distance={9} color="#ffcf8a" />
      <Crane settings={settings} />
    </group>
  );
}

export default function TheFirstFold({ settings = {} }) {
  return (
    <section className="atmosphere the-first-fold" style={{ "--experiment-accent": "#f0c987" }}>
      <CanvasStage
        camera={{ position: [3.2, 1.8, 4.2], fov: 42, near: 0.05, far: 40 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.5, threshold: 0.75 }}
      >
        <fogExp2 attach="fog" args={["#0c0a08", 0.045]} />
        <FoldScene settings={settings} />
      </CanvasStage>

      <div className="experiment-copy the-first-fold__copy">
        <p>28 — Before the thousand</p>
        <h1>The First<br />Fold.</h1>
        <span>One sheet of paper, folded the traditional way — a diamond body, a long raised neck, a head bent sharply down, a tapered tail, and two broad creased wings. Drag to look around.</span>
      </div>

      <div className="the-first-fold__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit around the crane</span></div></div>
      </div>
    </section>
  );
}
