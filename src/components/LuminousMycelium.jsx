import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { seeded } from "../utils/procedural";
import AnimationReadout from "./AnimationReadout";
import GpuExperience from "./webgl/GpuExperience";
import { Dust } from "./webgl/GpuPrimitives";
import "./LuminousMycelium.css";

const MAX_MUSHROOMS = 10000;
// Vogel/Fermat spiral (sunflower phyllotaxis) for the angle, same idea as before. But
// radius now grows with index^0.65, not sqrt(index) (^0.5): area-per-mushroom is
// proportional to d(radius^2)/d(index), which for an exponent p works out to i^(2p-1) —
// flat (constant density) at p=0.5, but growing with i once p > 0.5. So this keeps the
// same close, dense packing near the hub while spacing mushrooms out more and more the
// further out they land, and it reaches a much larger total radius for the same count.
const GOLDEN_ANGLE = 2.399963229728653;
const RADIUS_POWER = 0.65;
const RADIUS_SCALE = 0.75;
const SEGMENTS_PER_PATH = 6;
const GROW_DURATION = 0.8;
const MAX_SIGNALS = 160;
const PALETTE = ["#9dff82", "#7dffc2", "#c7ff6a", "#63e9ff", "#e8ffb0", "#a3ffe4"];

// Camera tilt: the one knob to turn. 0 = eye-level horizon, 90 = straight overhead.
// Everything else (focus point, how far back the camera sits) stays fixed — only this
// angle changes as you tune it.
const CAMERA_PITCH_DEGREES = 30;
const CAMERA_FOCUS = [3, -1, -11];
const CAMERA_DISTANCE = 70;

function orbitPositionFromPitch(focus, distance, pitchDegrees) {
  const pitch = THREE.MathUtils.degToRad(pitchDegrees);
  return [
    focus[0],
    focus[1] + distance * Math.sin(pitch),
    focus[2] + distance * Math.cos(pitch),
  ];
}

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = THREE.MathUtils.clamp(t, 0, 1) - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
}

// One stable, seeded pool computed once for the maximum possible count — dragging the
// slider only ever reveals more of this same pool (or hides the tail of it), so a mushroom
// already on screen never jumps to a new position/color when the count changes.
function buildPool(max) {
  const pool = new Array(max);
  for (let i = 0; i < max; i += 1) {
    const angle = i * GOLDEN_ANGLE + (seeded(i, 8101) - 0.5) * 0.16;
    const baseRadius = RADIUS_SCALE * Math.pow(i + 0.5, RADIUS_POWER);
    // Jitter scaled to the local radius rather than a fixed amount — a fixed jitter would
    // be proportionally huge right at the hub and invisible way out at the edge.
    const radius = baseRadius + (seeded(i, 8102) - 0.5) * baseRadius * 0.22;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const scale = 0.42 + seeded(i, 8103) * 0.85;
    const tilt = (seeded(i, 8104) - 0.5) * 0.3;
    const lean = (seeded(i, 8105) - 0.5) * 0.3;
    const paletteBase = new THREE.Color(PALETTE[Math.floor(seeded(i, 8106) * PALETTE.length) % PALETTE.length]);
    const color = paletteBase.clone().multiplyScalar(0.85 + seeded(i, 8107) * 0.35);

    // A gently bowed line from the hub to the cap, not a straight spoke — offset
    // perpendicular to the radius so the network reads as organic paths, not a wheel.
    const bend = (seeded(i, 8108) - 0.5) * (0.4 + radius * 0.12);
    const perpX = -Math.sin(angle);
    const perpZ = Math.cos(angle);
    const points = new Array(SEGMENTS_PER_PATH + 1);
    for (let s = 0; s <= SEGMENTS_PER_PATH; s += 1) {
      const t = s / SEGMENTS_PER_PATH;
      const wobble = Math.sin(t * Math.PI) * bend;
      points[s] = new THREE.Vector3(x * t + perpX * wobble, Math.sin(t * Math.PI) * 0.12, z * t + perpZ * wobble);
    }

    pool[i] = { x, z, radius, scale, tilt, lean, color, points };
  }
  return pool;
}

function pointOnPath(points, t) {
  const span = points.length - 1;
  const eased = THREE.MathUtils.clamp(t, 0, 1) * span;
  const index = Math.min(span - 1, Math.floor(eased));
  const local = eased - index;
  return points[index].clone().lerp(points[index + 1], local);
}

function useMushroomGeometry() {
  return useMemo(() => {
    const stem = new THREE.CylinderGeometry(0.05, 0.09, 0.86, 7);
    stem.translate(0, 0.43, 0);
    const cap = new THREE.SphereGeometry(0.36, 12, 8);
    cap.scale(1, 0.3, 1);
    cap.computeVertexNormals();
    cap.translate(0, 0.9, 0);
    const merged = mergeGeometries([stem, cap]);
    stem.dispose();
    cap.dispose();
    return merged;
  }, []);
}

// A raw shader instead of MeshStandardMaterial: instanceColor only tints the base albedo in
// three.js's built-in lighting chunks, never the emissive term, so it can't drive the actual
// glow that reads as "luminous." Writing the shader directly lets one instanced draw call
// give every mushroom its own bright, distinct color instead.
function useMushroomMaterial() {
  return useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      // instanceColor and instanceMatrix are declared for us — three.js auto-injects both
      // into any shader (regardless of material type) whenever the object is an
      // InstancedMesh with instanceColor set, and redeclaring either here is a GLSL
      // redefinition error.
      varying vec3 vColor;
      varying vec3 vNormalW;
      void main() {
        vColor = instanceColor;
        vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
        vNormalW = normalize(mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * instancePosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying vec3 vNormalW;
      void main() {
        vec3 lightDir = normalize(vec3(0.35, 1.0, 0.4));
        float lambert = max(dot(normalize(vNormalW), lightDir), 0.0);
        vec3 glow = vColor * (1.0 + lambert * 0.6);
        gl_FragColor = vec4(glow, 1.0);
      }
    `,
  }), []);
}

function MushroomForest({ settings, accent }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const linesRef = useRef();
  const signalsRef = useRef();
  const groundRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pool = useMemo(() => buildPool(MAX_MUSHROOMS), []);
  const geometry = useMushroomGeometry();
  const material = useMushroomMaterial();

  const count = THREE.MathUtils.clamp(Math.round(settings.mushrooms ?? 400), 10, MAX_MUSHROOMS);

  // Every path segment for the full pool, pre-built once; only the draw range changes as
  // the count grows or shrinks, so revealing more mushrooms costs nothing per frame.
  const lineGeometry = useMemo(() => {
    const verticesPerPath = SEGMENTS_PER_PATH * 2;
    const positions = new Float32Array(MAX_MUSHROOMS * verticesPerPath * 3);
    const colors = new Float32Array(MAX_MUSHROOMS * verticesPerPath * 3);
    for (let i = 0; i < MAX_MUSHROOMS; i += 1) {
      const { points, color } = pool[i];
      const base = i * verticesPerPath * 3;
      for (let s = 0; s < SEGMENTS_PER_PATH; s += 1) {
        const a = points[s];
        const b = points[s + 1];
        const offset = base + s * 6;
        positions[offset] = a.x; positions[offset + 1] = a.y; positions[offset + 2] = a.z;
        positions[offset + 3] = b.x; positions[offset + 4] = b.y; positions[offset + 5] = b.z;
        colors[offset] = color.r; colors[offset + 1] = color.g; colors[offset + 2] = color.b;
        colors[offset + 3] = color.r; colors[offset + 4] = color.g; colors[offset + 5] = color.b;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [pool]);

  // toneMapped left at its default (true) so these respect the same ACES curve the mushroom
  // caps do — `false` here previously let the lines render at raw, uncompressed brightness
  // while the caps got tone-mapped/softened, which is why the lines read brighter than the
  // mushrooms despite the caps being the intended focal point. Opacity dropped well below the
  // caps' own brightness so the lines stay a faint, ghosted trail rather than competing.
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.16,
  }), []);

  // Pre-sized to the full pool up front. InstancedMesh.setColorAt() lazily allocates
  // instanceColor sized to `count` on its first call — since count starts well below
  // MAX_MUSHROOMS, that lazy buffer would be too small the moment the slider is dragged
  // past its initial value, silently dropping colors (and reads) for every instance beyond
  // that first allocation.
  useEffect(() => {
    if (meshRef.current && !meshRef.current.instanceColor) {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(MAX_MUSHROOMS * 3).fill(1),
        3,
      );
    }
  }, []);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
  }, [geometry, material, lineGeometry, lineMaterial]);

  // Signals don't scale with the forest — a fixed, small pool of traveling pulses is
  // reassigned across a spread of paths (stride 37 is coprime-ish with typical counts, so
  // consecutive signals don't cluster near the hub) whenever the revealed count changes.
  const signalCount = Math.min(MAX_SIGNALS, count);
  const signalPaths = useMemo(
    () => Array.from({ length: signalCount }, (_, i) => (i * 37) % count),
    [signalCount, count],
  );

  const growthRef = useRef({ pending: new Map(), settledCount: 0 });

  useEffect(() => {
    const state = growthRef.current;
    if (count > state.settledCount) {
      for (let i = state.settledCount; i < count; i += 1) {
        state.pending.set(i, null);
      }
    } else {
      for (let i = count; i < state.settledCount; i += 1) {
        state.pending.delete(i);
      }
    }
    state.settledCount = count;
    if (meshRef.current) meshRef.current.count = count;
    lineGeometry.setDrawRange(0, count * SEGMENTS_PER_PATH * 2);
  }, [count, lineGeometry]);

  // Colors never change once assigned, so they're written once per instance the first time
  // it's grown rather than every frame.
  const coloredRef = useRef(new Set());

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const speed = settings.speed ?? 1;
    const elapsed = state.clock.elapsedTime * speed;

    if (groupRef.current) {
      groupRef.current.position.y = -1.85 + Math.sin(elapsed * 0.2) * 0.03;
      groupRef.current.rotation.y += delta * 0.004 * speed;
    }

    const growth = growthRef.current;
    if (growth.pending.size > 0) {
      growth.pending.forEach((startTime, index) => {
        const start = startTime ?? elapsed;
        if (startTime === null) growth.pending.set(index, start);
        const t = easeOutBack((elapsed - start) / GROW_DURATION);
        const node = pool[index];
        if (!coloredRef.current.has(index)) {
          mesh.setColorAt(index, node.color);
          coloredRef.current.add(index);
        }
        const settled = t >= 1;
        const scale = settled ? node.scale : Math.max(0.001, node.scale * t);
        dummy.position.set(node.x, 0, node.z);
        dummy.rotation.set(node.tilt, 0, node.lean);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        if (settled) growth.pending.delete(index);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    if (signalsRef.current) {
      signalPaths.forEach((pathIndex, slot) => {
        const node = pool[pathIndex];
        const travel = (elapsed * 0.14 + slot / Math.max(1, signalPaths.length)) % 1;
        const point = pointOnPath(node.points, travel);
        dummy.position.copy(point);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(0.06);
        dummy.updateMatrix();
        signalsRef.current.setMatrixAt(slot, dummy.matrix);
      });
      signalsRef.current.count = signalPaths.length;
      signalsRef.current.instanceMatrix.needsUpdate = true;
    }

    if (groundRef.current) {
      const groundRadius = RADIUS_SCALE * Math.pow(count, RADIUS_POWER) + 6;
      groundRef.current.scale.setScalar(groundRadius);
    }
  });

  return (
    <>
      {/* `attach="fog"` targets the nearest enclosing three.js object, which would be this
          group if nested inside it — has to sit at the same scene level as the group (not
          inside it) to actually reach `scene.fog`. Lower density than GpuExperience's shared
          default: at forest scale the far rings would otherwise vanish well before the count
          slider does anything visible. */}
      <fogExp2 attach="fog" args={["#010803", 0.007]} />
      <group ref={groupRef} position={[3, -1.85, -11]}>
        <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
          <circleGeometry args={[1, 72]} />
          <meshStandardMaterial color="#010b04" roughness={0.96} metalness={0.05} />
        </mesh>

        <instancedMesh ref={meshRef} args={[geometry, material, MAX_MUSHROOMS]} frustumCulled={false} />
        <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} frustumCulled={false} />
        <instancedMesh ref={signalsRef} args={[undefined, undefined, MAX_SIGNALS]} frustumCulled={false}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#efffe7" toneMapped={false} />
        </instancedMesh>

        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.58, 24, 18]} />
          <meshStandardMaterial color="#eaffdf" emissive={accent} emissiveIntensity={3.4} roughness={0.28} />
        </mesh>
        <pointLight color={accent} intensity={42} distance={22} position={[0, 1.4, 0]} />
        <Dust count={260} color={accent} scale={[32, 8, 32]} speed={0.1} />
      </group>
    </>
  );
}

export default function LuminousMycelium({ settings = {} }) {
  const mushroomCount = THREE.MathUtils.clamp(Math.round(settings.mushrooms ?? 400), 10, MAX_MUSHROOMS);
  return (
    <GpuExperience
      scene="luminous-mycelium"
      World={MushroomForest}
      settings={settings}
      accent="#9dff82"
      background="#010803"
      eyebrow="01 — Subterranean intelligence"
      title={"A forest beneath\nthe forest."}
      description="Branching mycelium carries visible signals through the soil, feeding luminous fruiting bodies as the underground network wakes."
      foreground={<AnimationReadout eyebrow="Live network" value={`${mushroomCount.toLocaleString()} MUSHROOMS`} />}
      // Default GpuExperience far plane (260) sits inside the mushroom field's own radius at
      // high counts (~299 units at 10k, per RADIUS_SCALE * count^RADIUS_POWER) — fringe
      // mushrooms were crossing that clip boundary as the camera orbited, popping in and out.
      // Fog already fades them out well before this new distance, so raising it only fixes
      // the clipping without changing how the far edge looks.
      camera={{ far: 420 }}
      // An angled overhead pose instead of GpuExperience's shared near-horizon default — looks
      // down into the forest from above so a dense mushroom count reads as a canopy filling
      // the frame top-to-bottom, rather than a horizon line with empty fog above it. Tune the
      // angle via CAMERA_PITCH_DEGREES above; everything else derives from it.
      orbitFocus={CAMERA_FOCUS}
      orbitPosition={orbitPositionFromPitch(CAMERA_FOCUS, CAMERA_DISTANCE, CAMERA_PITCH_DEGREES)}
    />
  );
}
