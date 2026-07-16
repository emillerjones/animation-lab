import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import AnimationReadout from "./AnimationReadout";
import { seeded } from "../utils/procedural";
import "./RiverOfWishes.css";

const MAX_CRANES = 10000;
const PATH_SAMPLES = 512;

// ---------------------------------------------------------------------------
// Crane geometry — same construction as The Wishing Tree (kept as its own
// local copy since every piece here is self-contained): primitives in the
// proportions of the hand-tuned crane in OrigamiFold.jsx (#15) — a
// flattened elongated octahedron body, wide flat kite-shaped wings, a thin
// cone neck capped with a small head, and a short tail cone. Wings flap
// continuously here (no fold-in lifecycle, this piece is a constant flow).
// ---------------------------------------------------------------------------
function addHingeAttribute(geo, group) {
  const count = geo.attributes.position.count;
  geo.setAttribute("aHingeGroup", new THREE.Float32BufferAttribute(new Float32Array(count).fill(group), 1));
  return geo;
}

function buildWingGeometry(mirror) {
  const s = mirror ? -1 : 1;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute([
    0, 0, 0, s * 1.55, 0, 0.1, s * 0.32, 0, 1.05,
    0, 0, 0, s * 0.32, 0, 1.05, s * 0.06, 0, 0.36,
  ], 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0], 2));
  geo.computeVertexNormals();
  return geo;
}

function buildCraneGeometry() {
  const body = new THREE.OctahedronGeometry(0.5, 0).toNonIndexed();
  body.scale(0.56, 0.34, 1.35);
  body.rotateX(Math.PI / 2);
  body.computeVertexNormals();
  addHingeAttribute(body, 0);

  const wingL = buildWingGeometry(true);
  wingL.translate(-0.12, 0.22, -0.15);
  addHingeAttribute(wingL, 1);
  const wingR = buildWingGeometry(false);
  wingR.translate(0.12, 0.22, -0.15);
  addHingeAttribute(wingR, 2);

  const neck = new THREE.ConeGeometry(0.16, 0.68, 4).toNonIndexed();
  neck.rotateX(Math.PI / 2.6);
  neck.translate(0, 0.26, 0.62);
  neck.computeVertexNormals();
  const head = new THREE.OctahedronGeometry(0.14, 0).toNonIndexed();
  head.scale(0.85, 0.6, 1.3);
  head.translate(0, 0.4, 0.98);
  head.computeVertexNormals();
  const neckHead = mergeGeometries([neck, head]);
  addHingeAttribute(neckHead, 3);

  const tail = new THREE.ConeGeometry(0.13, 0.5, 4).toNonIndexed();
  tail.rotateX(-Math.PI / 2.35);
  tail.translate(0, 0.09, -0.5);
  tail.computeVertexNormals();
  addHingeAttribute(tail, 4);

  const merged = mergeGeometries([body, wingL, wingR, neckHead, tail]);
  [body, wingL, wingR, neck, head, neckHead, tail].forEach((g) => g.dispose());
  return merged;
}

// ---------------------------------------------------------------------------
// The river's path: a closed loop threading through an entrance courtyard
// (pillars), a bridge crossing, and a garden — authored once as control
// points, then baked to a small DataTexture so the vertex shader can sample
// "position along the river" for any of the 10,000 instances without any
// per-frame CPU work (arbitrary curves aren't natively evaluable in a vertex
// shader, so baking to a texture is the standard technique for GPU-side
// curve-following motion at scale).
// ---------------------------------------------------------------------------
const PATH_CONTROL_POINTS = [
  [0, 3, 16], [6, 3.4, 12], [9, 3, 5], [8.5, 3.6, -3],
  [4, 4.4, -8], [-4, 4.6, -9], [-9, 3.4, -3], [-9, 2.8, 6],
  [-5, 2.6, 13], [0, 2.8, 16],
];

function buildPath() {
  const points = PATH_CONTROL_POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
  const sampled = curve.getPoints(PATH_SAMPLES);
  const data = new Float32Array(PATH_SAMPLES * 4);
  for (let i = 0; i < PATH_SAMPLES; i += 1) {
    const p = sampled[i];
    data[i * 4] = p.x;
    data[i * 4 + 1] = p.y;
    data[i * 4 + 2] = p.z;
    data[i * 4 + 3] = 1;
  }
  const texture = new THREE.DataTexture(data, PATH_SAMPLES, 1, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  return { curve, texture };
}

function makeWoodTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#3f2c1a";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 70; i += 1) {
    const y = i * 3.6 + seeded(i, 701) * 3;
    ctx.strokeStyle = `rgba(20, 12, 6, ${0.12 + seeded(i, 702) * 0.22})`;
    ctx.lineWidth = 1 + seeded(i, 703) * 2;
    ctx.beginPath();
    for (let x = 0; x <= size; x += 12) {
      const wave = Math.sin(x * 0.03 + i) * 4;
      if (x === 0) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  return texture;
}

function makeStoneTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#5a5650";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 300; i += 1) {
    const x = seeded(i, 801) * size;
    const y = seeded(i, 802) * size;
    ctx.fillStyle = `rgba(30, 28, 24, ${0.06 + seeded(i, 803) * 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + seeded(i, 804) * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// ---------------------------------------------------------------------------
// River flow field: GPU vertex-shader-driven, same "per-vertex shared /
// per-instance InstancedBufferAttribute, motion from uTime alone" scaffolding
// as Alien Dyson Swarm's satellite field. Each instance samples the baked
// path texture for its centerline position, offsets by a fixed per-instance
// lane (lateral+vertical), and flutters its wings continuously.
// ---------------------------------------------------------------------------
const RIVER_VERTEX_SHADER = `
  attribute float aHingeGroup;
  attribute float aPathPhase;
  attribute float aLaneX;
  attribute float aLaneY;
  attribute float aFlapPhase;
  attribute float aFlapSpeed;
  attribute float aColorSeed;

  uniform sampler2D uPathTexture;
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uRiverWidth;
  uniform float uWingFlutter;

  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vPathU;

  vec3 rotateAroundAxis(vec3 p, vec3 axis, float angle) {
    return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
  }

  void applyFlap(inout vec3 p, inout vec3 n, int group, float openT) {
    vec3 pivot = vec3(0.0);
    vec3 axis = vec3(0.0, 0.0, 1.0);
    float closedAngle = 0.0;
    if (group == 1) { pivot = vec3(-0.12, 0.22, -0.15); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
    else if (group == 2) { pivot = vec3(0.12, 0.22, -0.15); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
    else { return; }
    float angle = mix(closedAngle, 0.0, openT);
    vec3 local = p - pivot;
    p = rotateAroundAxis(local, axis, angle) + pivot;
    n = rotateAroundAxis(n, axis, angle);
  }

  void main() {
    float u = fract(aPathPhase + uTime * uFlowSpeed);
    vec3 centerHere = texture2D(uPathTexture, vec2(u, 0.5)).xyz;
    float uAhead = fract(u + 0.006);
    vec3 centerAhead = texture2D(uPathTexture, vec2(uAhead, 0.5)).xyz;
    vec3 tangent = normalize(centerAhead - centerHere);

    vec3 worldUp = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(worldUp, tangent));
    vec3 up = normalize(cross(tangent, right));

    int group = int(aHingeGroup + 0.5);
    vec3 localPos = position;
    vec3 localNormal = normal;
    float openT = 0.72 + sin(uTime * aFlapSpeed + aFlapPhase) * 0.28 * uWingFlutter;
    applyFlap(localPos, localNormal, group, clamp(openT, 0.0, 1.0));

    vec3 laneOffset = right * aLaneX * uRiverWidth + up * aLaneY * uRiverWidth;
    vec3 orientedBody = right * localPos.x + up * localPos.y + tangent * localPos.z;
    vec3 worldPos = centerHere + laneOffset + orientedBody * 0.42;
    vec3 worldNormal = normalize(right * localNormal.x + up * localNormal.y + tangent * localNormal.z);

    vNormal = normalize(normalMatrix * worldNormal);
    vColorSeed = aColorSeed;
    vPathU = u;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
  }
`;

const RIVER_FRAGMENT_SHADER = `
  uniform vec3 uWarmColor;
  uniform vec3 uCoolColor;
  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vPathU;

  void main() {
    vec3 lightDir = normalize(vec3(0.4, 1.0, 0.35));
    float lambert = max(dot(normalize(vNormal), lightDir), 0.0);
    float warmth = 1.0 - smoothstep(0.0, 0.62, vPathU);
    vec3 base = mix(uCoolColor, uWarmColor, warmth);
    base = mix(base, base * 1.08, fract(vColorSeed * 4.1));
    vec3 shaded = base * (0.3 + lambert * 0.68);
    gl_FragColor = vec4(shaded, 1.0);
  }
`;

function buildRiverGeometry(craneGeometry, count, riverWidthMul) {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = craneGeometry.index;
  geometry.attributes.position = craneGeometry.attributes.position;
  geometry.attributes.normal = craneGeometry.attributes.normal;
  geometry.attributes.aHingeGroup = craneGeometry.attributes.aHingeGroup;

  const pathPhase = new Float32Array(count);
  const laneX = new Float32Array(count);
  const laneY = new Float32Array(count);
  const flapPhase = new Float32Array(count);
  const flapSpeed = new Float32Array(count);
  const colorSeed = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    pathPhase[i] = seeded(i, 901);
    const lane = 0.4 + seeded(i, 902) * 2.6;
    const laneAngle = seeded(i, 903) * Math.PI * 2;
    laneX[i] = Math.cos(laneAngle) * lane * riverWidthMul;
    laneY[i] = Math.sin(laneAngle) * lane * 0.5 * riverWidthMul;
    flapPhase[i] = seeded(i, 904) * Math.PI * 2;
    flapSpeed[i] = 2.2 + seeded(i, 905) * 1.6;
    colorSeed[i] = seeded(i, 906);
  }

  geometry.setAttribute("aPathPhase", new THREE.InstancedBufferAttribute(pathPhase, 1));
  geometry.setAttribute("aLaneX", new THREE.InstancedBufferAttribute(laneX, 1));
  geometry.setAttribute("aLaneY", new THREE.InstancedBufferAttribute(laneY, 1));
  geometry.setAttribute("aFlapPhase", new THREE.InstancedBufferAttribute(flapPhase, 1));
  geometry.setAttribute("aFlapSpeed", new THREE.InstancedBufferAttribute(flapSpeed, 1));
  geometry.setAttribute("aColorSeed", new THREE.InstancedBufferAttribute(colorSeed, 1));
  geometry.instanceCount = count;
  return geometry;
}

function RiverScene({ settings, onStats }) {
  const { camera, gl } = useThree();
  const speed = useSpeed();
  const craneCount = Math.round(THREE.MathUtils.clamp(settings.craneCount ?? 6000, 2000, MAX_CRANES));
  const flowSpeedMul = (settings.flowSpeed ?? 1) * 0.016;
  const riverWidthMul = (settings.riverWidth ?? 100) / 100;
  const wingFlutter = (settings.wingFlutter ?? 100) / 100;
  const lightWarmth = (settings.lightWarmth ?? 100) / 100;

  const craneGeometry = useMemo(() => buildCraneGeometry(), []);
  const { curve, texture: pathTexture } = useMemo(() => buildPath(), []);
  const riverGeometry = useMemo(
    () => buildRiverGeometry(craneGeometry, craneCount, riverWidthMul),
    [craneGeometry, craneCount, riverWidthMul],
  );

  const warmColor = useMemo(() => new THREE.Color("#f0b866"), []);
  const coolColor = useMemo(() => new THREE.Color("#5c78b8"), []);

  const riverMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: RIVER_VERTEX_SHADER,
    fragmentShader: RIVER_FRAGMENT_SHADER,
    uniforms: {
      uPathTexture: { value: pathTexture },
      uTime: { value: 0 },
      uFlowSpeed: { value: flowSpeedMul },
      uRiverWidth: { value: riverWidthMul },
      uWingFlutter: { value: wingFlutter },
      uWarmColor: { value: warmColor },
      uCoolColor: { value: coolColor },
    },
    side: THREE.DoubleSide,
  }), [pathTexture, warmColor, coolColor, flowSpeedMul, riverWidthMul, wingFlutter]);

  useEffect(() => () => { riverGeometry.dispose(); }, [riverGeometry]);
  useEffect(() => () => { riverMaterial.dispose(); }, [riverMaterial]);

  const woodTexture = useMemo(() => makeWoodTexture(), []);
  const stoneTexture = useMemo(() => makeStoneTexture(), []);
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: woodTexture, color: "#c9a878", roughness: 0.78, metalness: 0.04 }), [woodTexture]);
  const stoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: stoneTexture, color: "#8f8a80", roughness: 0.85, metalness: 0.05 }), [stoneTexture]);

  const pillars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const t = 0.02 + (i / 10) * 0.42;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = i % 2 ? 1 : -1;
      const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(3.4 * side);
      list.push(point.clone().add(perp).setY(0));
    }
    return list;
  }, [curve]);

  const bridgeCenter = useMemo(() => curve.getPoint(0.58).clone().setY(1.4), [curve]);
  const bridgeTangent = useMemo(() => curve.getTangent(0.58).normalize(), [curve]);
  const bridgeQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), bridgeTangent),
    [bridgeTangent],
  );

  const gardenLanterns = useMemo(() => {
    const list = [];
    for (let i = 0; i < 5; i += 1) {
      const t = 0.68 + (i / 5) * 0.3;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = i % 2 ? 1 : -1;
      const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(2.6 * side);
      list.push(point.clone().add(perp).setY(0));
    }
    return list;
  }, [curve]);

  const dragRef = useDragOrbit({ pitchMin: -0.4, pitchMax: 0.45 });
  const travelRef = useRef(0.08);
  const statsTimerRef = useRef({ frames: 0, time: 0 });
  const sceneColorRef = useRef(new THREE.Color());

  useEffect(() => {
    camera.position.set(0, 4, 20);
    camera.lookAt(0, 3, 12);
  }, [camera]);

  useFrame((state, rawDelta) => {
    const elapsed = state.clock.elapsedTime * speed;
    riverMaterial.uniforms.uTime.value = elapsed;
    riverMaterial.uniforms.uFlowSpeed.value = flowSpeedMul;
    riverMaterial.uniforms.uRiverWidth.value = riverWidthMul;
    riverMaterial.uniforms.uWingFlutter.value = wingFlutter;

    travelRef.current = (travelRef.current + Math.min(rawDelta, 0.05) * speed * 0.01) % 1;
    const camPoint = curve.getPoint(travelRef.current);
    const camTangent = curve.getTangent(travelRef.current).normalize();
    const lookPoint = curve.getPoint((travelRef.current + 0.03) % 1);
    // Ride alongside the river rather than through its centerline — lane offsets put cranes
    // up to ~3 units off-axis, so a camera sitting exactly on the path is submerged in traffic.
    const worldUp = new THREE.Vector3(0, 1, 0);
    const camRight = new THREE.Vector3().crossVectors(worldUp, camTangent).normalize();
    const sideOffset = camRight.clone().multiplyScalar(6.5);
    const yaw = dragRef.current.targetYaw;
    const pitch = dragRef.current.targetPitch;
    const lookOffset = new THREE.Vector3(Math.sin(yaw) * 4, pitch * 3, Math.cos(yaw) * -0.5);
    camera.position.set(
      camPoint.x + sideOffset.x,
      camPoint.y + 3.2,
      camPoint.z + sideOffset.z,
    );
    camera.lookAt(lookPoint.x + lookOffset.x, lookPoint.y + lookOffset.y, lookPoint.z + lookOffset.z);

    const warmth = 1 - THREE.MathUtils.smoothstep(travelRef.current, 0, 0.62);
    sceneColorRef.current.copy(coolColor).lerp(warmColor, warmth).multiplyScalar(0.32 * lightWarmth + 0.14);
    state.scene.background = sceneColorRef.current;
    if (state.scene.fog) state.scene.fog.color.copy(sceneColorRef.current);

    statsTimerRef.current.frames += 1;
    statsTimerRef.current.time += rawDelta;
    if (statsTimerRef.current.time >= 0.5) {
      onStats({
        fps: Math.round(statsTimerRef.current.frames / statsTimerRef.current.time),
        zone: warmth > 0.5 ? "TEMPLE COURTYARD" : "MOONLIT GARDEN",
      });
      statsTimerRef.current.frames = 0;
      statsTimerRef.current.time = 0;
    }
  });

  useEffect(() => {
    const backendName = gl?.constructor?.name ?? "WebGL2";
    onStats({ gpu: backendName.includes("WebGPU") ? "WebGPU" : "WebGL2", cranes: craneCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [craneCount]);

  return (
    <group>
      <ambientLight intensity={0.16} color="#f4e0c0" />
      <hemisphereLight color="#dcc9a0" groundColor="#241c14" intensity={0.16} />
      <directionalLight position={[8, 10, 6]} intensity={0.4} color="#ffdca0" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[22, 64]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {pillars.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.32, 0.38, 4.4, 8]} />
            <primitive object={woodMaterial} attach="material" />
          </mesh>
          <pointLight position={[0, 4.6, 0]} intensity={3.5 * lightWarmth} distance={7} color="#ffcf8a" />
        </group>
      ))}

      <group position={bridgeCenter} quaternion={bridgeQuat}>
        <mesh>
          <boxGeometry args={[3.2, 0.24, 5.5]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[1.5, 0.6, 0]}>
          <boxGeometry args={[0.16, 1.2, 5.5]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[-1.5, 0.6, 0]}>
          <boxGeometry args={[0.16, 1.2, 5.5]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
      </group>

      {gardenLanterns.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 6]} />
            <meshStandardMaterial color="#3a3a3e" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.34, 0.3, 0.34]} />
            <meshStandardMaterial color="#2e2e32" roughness={0.6} />
          </mesh>
          <pointLight position={[0, 1.35, 0]} intensity={2.4} distance={5} color="#9db6e8" />
        </group>
      ))}

      <mesh geometry={riverGeometry} material={riverMaterial} frustumCulled={false} />
    </group>
  );
}

export default function RiverOfWishes({ settings = {} }) {
  const [stats, setStats] = useState({ fps: 60, gpu: "—", cranes: 0, zone: "TEMPLE COURTYARD" });
  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));

  return (
    <section className="atmosphere river-of-wishes" style={{ "--experiment-accent": "#e6c88a" }}>
      <CanvasStage
        camera={{ position: [0, 4, 20], fov: 50, near: 0.1, far: 70 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.8, threshold: 0.6 }}
      >
        <fogExp2 attach="fog" args={["#2a2418", 0.018]} />
        <RiverScene settings={settings} onStats={onStats} />
      </CanvasStage>

      <div className="experiment-copy river-of-wishes__copy">
        <p>25 — A river suspended in midair</p>
        <h1>The River<br />of Wishes.</h1>
        <span>Ten thousand cranes drift through an ancient temple in slow currents, parting around pillars and beneath a wooden bridge, out into a moonlit garden — never colliding, never stopping.</span>
      </div>

      <div className="river-of-wishes__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Look around as you drift</span></div></div>
      </div>

      <AnimationReadout
        eyebrow="Current position"
        value={stats.zone}
        stats={[
          { value: stats.cranes.toLocaleString(), label: "CRANES IN THE RIVER" },
          { value: stats.gpu, label: "RENDERER" },
        ]}
      />
    </section>
  );
}
