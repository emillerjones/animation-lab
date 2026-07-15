import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { GodRays, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import { seeded } from "../utils/procedural";
import "./AlienDysonSwarm.css";

const ARCHETYPE_KEYS = ["collector", "habitat", "relay", "truss", "mirror", "dock"];
const ARCHETYPE_LABELS = {
  collector: "Solar Collector Array",
  habitat: "Habitat Ring",
  relay: "Power Relay",
  truss: "Structural Truss",
  mirror: "Focusing Mirror",
  dock: "Docking Facility",
};
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const MAX_BEAMS = 5;

const hullMaterial = new THREE.MeshStandardMaterial({ color: "#39352f", metalness: 0.96, roughness: 0.3 });
const darkHullMaterial = new THREE.MeshStandardMaterial({ color: "#0d0c0b", metalness: 0.9, roughness: 0.42 });
const panelMaterial = new THREE.MeshStandardMaterial({ color: "#090b0d", metalness: 0.86, roughness: 0.2, emissive: "#6d3107", emissiveIntensity: 0.08 });
const mirrorMaterial = new THREE.MeshStandardMaterial({ color: "#756047", metalness: 1, roughness: 0.08 });
const emberMaterial = new THREE.MeshStandardMaterial({ color: "#ffb066", emissive: "#ff8a3d", emissiveIntensity: 1.6, toneMapped: false });
const hitMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

function designationFor(index, archetype) {
  const sector = Math.floor(seeded(index, 411) * 900) + 100;
  const roman = ROMAN[Math.floor(seeded(index, 412) * ROMAN.length)];
  return `${ARCHETYPE_LABELS[archetype]} ${roman} — Sector ${sector}`;
}

function buildNodes(count) {
  const bands = [
    { radius: 11, inclination: -0.62 }, { radius: 15.5, inclination: 0.38 },
    { radius: 21, inclination: -0.18 }, { radius: 27, inclination: 0.7 },
    { radius: 34, inclination: -0.43 }, { radius: 42, inclination: 0.22 },
  ];
  return Array.from({ length: count }, (_, i) => {
    const archetype = ARCHETYPE_KEYS[Math.floor(seeded(i, 501) * ARCHETYPE_KEYS.length)];
    const band = bands[i % bands.length];
    return {
      archetype,
      radius: band.radius + (seeded(i, 502) - 0.5) * 2.8,
      eccentricity: 0.68 + seeded(i, 509) * 0.17,
      inclination: band.inclination + (seeded(i, 503) - 0.5) * 0.08,
      phase: seeded(i, 504) * Math.PI * 2,
      orbitSpeedMul: 0.12 + seeded(i, 505) * 0.36,
      scale: 1.05 + seeded(i, 506) * 2.9,
      spin: (seeded(i, 507) - 0.5) * 0.7,
      tracksStar: archetype === "collector" || archetype === "mirror",
      designation: designationFor(i, archetype),
    };
  });
}

// The small-satellite field is built once as instanced buffer attributes (radius, phase,
// orbital speed, inclination, scale, a per-instance tilt) and orbited entirely on the GPU
// in the vertex shader below — a real Dyson swarm reads as hundreds of thousands of tiny
// collectors, and updating that many transforms in a JS loop every frame (the way the
// interactive structures and drones below still do, since there are only a few dozen of
// those) would never hold 60fps. Radius is weighted toward the outer part of the shell
// (pow 0.6 on a uniform draw) so the field doesn't clump unrealistically near the star.
function buildSatelliteField(count) {
  const base = new THREE.PlaneGeometry(0.24, 0.11);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = base.index;
  geometry.attributes.position = base.attributes.position;
  geometry.attributes.normal = base.attributes.normal;
  geometry.attributes.uv = base.attributes.uv;

  const radius = new Float32Array(count);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const inclination = new Float32Array(count);
  const scale = new Float32Array(count);
  const tilt = new Float32Array(count);
  const eccentricity = new Float32Array(count);
  const thickness = new Float32Array(count);
  const bands = [
    [10.5, -0.64, 0.72], [14.5, 0.4, 0.8], [19.5, -0.2, 0.7],
    [25.5, 0.69, 0.76], [32.5, -0.45, 0.67], [40.5, 0.24, 0.73],
  ];

  for (let i = 0; i < count; i += 1) {
    const bandIndex = Math.floor(seeded(i, 707) * bands.length);
    const band = bands[bandIndex];
    radius[i] = band[0] + (seeded(i, 701) - 0.5) * (1.1 + bandIndex * 0.24);
    // Cubing the offset packs collectors into industrial arcs while leaving large gaps.
    const cluster = Math.floor(seeded(i, 708) * 5);
    const clusterCenter = cluster * 1.21 + bandIndex * 0.47;
    phase[i] = clusterCenter + Math.pow(seeded(i, 702) * 2 - 1, 3) * 0.48;
    speed[i] = 0.05 + seeded(i, 703) * 0.55;
    inclination[i] = band[1] + (seeded(i, 704) - 0.5) * 0.045;
    scale[i] = 0.65 + seeded(i, 705) * 1.65;
    tilt[i] = seeded(i, 706) * Math.PI * 2;
    eccentricity[i] = band[2];
    thickness[i] = (seeded(i, 709) - 0.5) * (0.35 + bandIndex * 0.08);
  }

  geometry.setAttribute("aRadius", new THREE.InstancedBufferAttribute(radius, 1));
  geometry.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
  geometry.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speed, 1));
  geometry.setAttribute("aInclination", new THREE.InstancedBufferAttribute(inclination, 1));
  geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(scale, 1));
  geometry.setAttribute("aTilt", new THREE.InstancedBufferAttribute(tilt, 1));
  geometry.setAttribute("aEccentricity", new THREE.InstancedBufferAttribute(eccentricity, 1));
  geometry.setAttribute("aThickness", new THREE.InstancedBufferAttribute(thickness, 1));
  geometry.instanceCount = count;
  return geometry;
}

const SATELLITE_VERTEX_SHADER = `
  attribute float aRadius;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aInclination;
  attribute float aScale;
  attribute float aTilt;
  attribute float aEccentricity;
  attribute float aThickness;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    float angle = aPhase + uTime * aSpeed;
    float bx = cos(angle) * aRadius;
    float bz = sin(angle) * aRadius * aEccentricity;
    vec3 orbitPos = vec3(bx, bz * sin(aInclination) + aThickness, bz * cos(aInclination));

    vec3 toStar = normalize(-orbitPos);
    vec3 upGuess = abs(toStar.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(upGuess, toStar));
    vec3 realUp = cross(toStar, right);
    mat3 basis = mat3(right, realUp, toStar);

    vec3 local = position * aScale;
    float ca = cos(aTilt);
    float sa = sin(aTilt);
    local.xy = mat2(ca, -sa, sa, ca) * local.xy;
    vec3 tilted = basis * local;

    vec3 worldPos = orbitPos + tilted;
    vNormal = normalize(basis * normal);
    vWorldPos = worldPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
  }
`;

const SATELLITE_FRAGMENT_SHADER = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorOuter;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 toStar = normalize(-vWorldPos);
    float lambert = max(dot(normalize(vNormal), toStar), 0.0);
    float dist = length(vWorldPos);
    float falloff = clamp(1.0 - (dist - 6.0) / 70.0, 0.3, 1.0);
    // The collectors remain nearly black; only star-facing surfaces and grazing edges
    // pick up the white-gold source light.
    float shellT = smoothstep(10.0, 50.0, dist);
    vec3 litColor = mix(uColorA, uColorOuter, shellT * 0.65);
    float edge = pow(1.0 - abs(dot(normalize(vNormal), normalize(cameraPosition - vWorldPos))), 3.0);
    vec3 col = mix(uColorB, litColor, lambert * 0.48) * (0.12 + lambert * 0.7) * falloff;
    col += uColorA * edge * lambert * 0.9;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function buildDrones(count) {
  return Array.from({ length: count }, (_, i) => {
    const startAngle = seeded(i, 801) * Math.PI * 2;
    const startTilt = (seeded(i, 802) - 0.5) * Math.PI;
    const endAngle = seeded(i, 803) * Math.PI * 2;
    const endTilt = (seeded(i, 804) - 0.5) * Math.PI;
    const shell = 30 + seeded(i, 805) * 20;
    const start = new THREE.Vector3(
      Math.cos(startAngle) * Math.cos(startTilt) * shell,
      Math.sin(startTilt) * shell,
      Math.sin(startAngle) * Math.cos(startTilt) * shell,
    );
    const end = new THREE.Vector3(
      Math.cos(endAngle) * Math.cos(endTilt) * shell,
      Math.sin(endTilt) * shell,
      Math.sin(endAngle) * Math.cos(endTilt) * shell,
    );
    return { start, end, phase: seeded(i, 806), speed: 0.05 + seeded(i, 807) * 0.06 };
  });
}

function ArchetypeGeometry({ archetype }) {
  switch (archetype) {
    case "collector":
      return (
        <group>
          <mesh material={panelMaterial}><boxGeometry args={[2.2, 0.04, 1.4]} /></mesh>
          <mesh material={hullMaterial} position={[0, 0, -0.9]}><boxGeometry args={[0.12, 0.12, 0.6]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, 0, -1.3]}><cylinderGeometry args={[0.08, 0.14, 0.5, 8]} /></mesh>
        </group>
      );
    case "habitat":
      return (
        <group rotation={[0.3, 0, 0]}>
          <mesh material={hullMaterial}><torusGeometry args={[1.1, 0.09, 8, 32]} /></mesh>
          <mesh material={darkHullMaterial} position={[1.1, 0, 0]}><boxGeometry args={[0.06, 0.5, 0.06]} /></mesh>
          <mesh material={darkHullMaterial} position={[-1.1, 0, 0]}><boxGeometry args={[0.06, 0.5, 0.06]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, 1.1, 0]}><boxGeometry args={[0.5, 0.06, 0.06]} /></mesh>
          <mesh material={panelMaterial}><cylinderGeometry args={[0.3, 0.3, 0.4, 10]} /></mesh>
        </group>
      );
    case "relay":
      return (
        <group>
          <mesh material={hullMaterial}><cylinderGeometry args={[0.16, 0.22, 1.6, 8]} /></mesh>
          <mesh material={emberMaterial} position={[0, 0.85, 0]}><coneGeometry args={[0.07, 0.5, 6]} /></mesh>
          <mesh material={emberMaterial} position={[0, 0.3, 0]}><coneGeometry args={[0.07, 0.5, 6]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, -0.9, 0]}><boxGeometry args={[0.5, 0.1, 0.5]} /></mesh>
        </group>
      );
    case "truss":
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          {Array.from({ length: 6 }).map((_, k) => (
            <mesh key={k} material={darkHullMaterial} position={[0, k * 0.55 - 1.4, 0]}><boxGeometry args={[0.12, 0.42, 0.12]} /></mesh>
          ))}
          <mesh material={hullMaterial}><cylinderGeometry args={[0.04, 0.04, 3.4, 6]} /></mesh>
        </group>
      );
    case "mirror":
      return (
        <group>
          <mesh material={mirrorMaterial}><sphereGeometry args={[1.3, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.35]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, 0, -0.3]}><cylinderGeometry args={[0.05, 0.08, 0.6, 6]} /></mesh>
        </group>
      );
    case "dock":
    default:
      return (
        <group>
          <mesh material={hullMaterial}><boxGeometry args={[1.2, 0.5, 1.2]} /></mesh>
          <mesh material={darkHullMaterial} position={[-0.7, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.5, 6]} /></mesh>
          <mesh material={darkHullMaterial} position={[0.7, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.5, 6]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, 0, -0.7]}><cylinderGeometry args={[0.08, 0.08, 0.5, 6]} /></mesh>
          <mesh material={darkHullMaterial} position={[0, 0, 0.7]}><cylinderGeometry args={[0.08, 0.08, 0.5, 6]} /></mesh>
        </group>
      );
  }
}

function Sun({ onReady, intensity, onClear }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uIntensity: { value: intensity / 100 } },
    vertexShader: `
      varying vec3 vPosition; varying vec3 vNormal;
      uniform float uTime;
      void main() {
        vPosition = position; vNormal = normal;
        float turbulence = sin(position.x * 2.4 + uTime) * sin(position.y * 2.8 - uTime * .7) * sin(position.z * 2.1 + uTime * .45);
        vec3 p = position + normal * turbulence * .13;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vPosition; varying vec3 vNormal;
      uniform float uTime; uniform float uIntensity;
      void main() {
        float cells = sin(vPosition.x * 5.2 + uTime) * sin(vPosition.y * 6.1 - uTime * .8) * sin(vPosition.z * 4.7);
        float filaments = pow(abs(cells), 3.0);
        float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.,0.,1.))), 2.0);
        vec3 whiteGold = mix(vec3(1.0, .44, .05), vec3(1.0, .96, .72), .68 + filaments * .32);
        gl_FragColor = vec4(whiteGold * (1.8 + uIntensity * 1.2 + rim), 1.0);
      }`,
    toneMapped: false,
  }), [intensity]);

  useEffect(() => {
    if (meshRef.current) onReady(meshRef.current);
  }, [onReady]);

  useFrame((state) => {
    if (!meshRef.current) return;
    material.uniforms.uTime.value = state.clock.elapsedTime * speed;
    meshRef.current.rotation.y += 0.0012 * speed;
  });

  return (
    <mesh ref={meshRef} material={material} onClick={(event) => { event.stopPropagation(); onClear(); }}>
      <icosahedronGeometry args={[6.6, 8]} />
    </mesh>
  );
}

function CoronaShell({ index, intensity }) {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * (0.06 + index * 0.015) * speed; });
  return (
    <mesh ref={ref} rotation={[seeded(index, 951) * 3, seeded(index, 952) * 3, 0]}>
      <torusGeometry args={[7.1 + index * 0.48, 0.045 + index * .018, 6, 160, Math.PI * (0.65 + seeded(index, 953))]} />
      <meshBasicMaterial color="#ffd28b" transparent opacity={0.22 + (intensity / 100) * 0.16} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Swarm({ settings, onSunReady }) {
  const { camera } = useThree();
  const speed = useSpeed();
  const dragRef = useDragOrbit();
  const groupRefs = useRef([]);
  const droneRef = useRef();
  const distanceRef = useRef(46);
  const baseAngleRef = useRef(0.6);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const swarmDensity = Math.round(settings.swarmDensity ?? 16);
  const satelliteCount = Math.round(settings.debrisDensity ?? 40000);
  const starIntensity = settings.starIntensity ?? 110;
  const orbitSpeed = settings.orbitSpeed ?? 0.6;
  const droneTraffic = Math.round(settings.droneTraffic ?? 16);

  const nodes = useMemo(() => buildNodes(swarmDensity), [swarmDensity]);
  const sourceIndices = useMemo(() => nodes.map((n, i) => i).filter((i) => nodes[i].tracksStar), [nodes]);
  const relayIndices = useMemo(() => nodes.map((n, i) => i).filter((i) => nodes[i].archetype === "relay"), [nodes]);
  const beamGeometry = useMemo(() => new THREE.CylinderGeometry(0.035, 0.06, 1, 6, 1, true), []);
  const beamRefs = useRef([]);
  const beamsRef = useRef(Array.from({ length: MAX_BEAMS }, () => null));
  const beamSpawnTimerRef = useRef(0.6);
  const drones = useMemo(() => buildDrones(droneTraffic), [droneTraffic]);
  const satelliteGeometry = useMemo(() => buildSatelliteField(satelliteCount), [satelliteCount]);
  const satelliteMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: SATELLITE_VERTEX_SHADER,
    fragmentShader: SATELLITE_FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#ffd08a") },
      uColorB: { value: new THREE.Color("#080706") },
      uColorOuter: { value: new THREE.Color("#3b2718") },
    },
    side: THREE.DoubleSide,
  }), []);

  useEffect(() => () => { satelliteGeometry.dispose(); }, [satelliteGeometry]);
  useEffect(() => () => { satelliteMaterial.dispose(); }, [satelliteMaterial]);
  useEffect(() => () => { beamGeometry.dispose(); }, [beamGeometry]);

  useEffect(() => {
    if (focusedIndex != null && focusedIndex >= nodes.length) setFocusedIndex(null);
    if (hoveredIndex != null && hoveredIndex >= nodes.length) setHoveredIndex(null);
  }, [nodes.length, focusedIndex, hoveredIndex]);

  useEffect(() => {
    const stageEl = document.querySelector(".alien-dyson-swarm .canvas-stage canvas");
    if (!stageEl) return undefined;
    const onWheel = (event) => {
      event.preventDefault();
      distanceRef.current = THREE.MathUtils.clamp(distanceRef.current - event.deltaY * 0.045, 9, 92);
    };
    stageEl.addEventListener("wheel", onWheel, { passive: false });
    return () => stageEl.removeEventListener("wheel", onWheel);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime * speed;

    nodes.forEach((node, i) => {
      const el = groupRefs.current[i];
      if (!el) return;
      const angle = node.phase + elapsed * node.orbitSpeedMul * orbitSpeed;
      const bx = Math.cos(angle) * node.radius;
      const bz = Math.sin(angle) * node.radius * node.eccentricity;
      el.position.set(bx, bz * Math.sin(node.inclination), bz * Math.cos(node.inclination));
      if (node.tracksStar) {
        el.lookAt(origin);
      } else {
        el.rotation.y += node.spin * delta * orbitSpeed;
      }
      el.scale.setScalar(node.scale);
    });

    // The satellite field's orbit is computed entirely in the vertex shader (see
    // buildSatelliteField above) — the only per-frame JS cost for however many hundreds
    // of thousands of them exist is this one uniform write.
    satelliteMaterial.uniforms.uTime.value = elapsed * orbitSpeed;

    // Periodically fire a collected-light beam from a sun-tracking collector/mirror to a
    // relay station, so the swarm visibly does the "collect -> transmit" work the
    // structures otherwise only imply. Beams are a small pooled set of meshes reused by
    // index rather than mounted/unmounted, to avoid churn from a piece with this many
    // moving parts already.
    beamSpawnTimerRef.current -= delta * orbitSpeed;
    if (beamSpawnTimerRef.current <= 0 && sourceIndices.length) {
      beamSpawnTimerRef.current = 0.5 + Math.random() * 0.7;
      const freeSlot = beamsRef.current.findIndex(
        (beam) => !beam || elapsed - beam.startTime > beam.duration,
      );
      if (freeSlot !== -1) {
        const srcIndex = sourceIndices[Math.floor(Math.random() * sourceIndices.length)];
        const srcEl = groupRefs.current[srcIndex];
        if (srcEl) {
          const targetEl = relayIndices.length
            ? groupRefs.current[relayIndices[Math.floor(Math.random() * relayIndices.length)]]
            : null;
          beamsRef.current[freeSlot] = {
            start: srcEl.position.clone(),
            end: targetEl ? targetEl.position.clone() : origin.clone(),
            startTime: elapsed,
            duration: 1.1 + Math.random() * 0.4,
          };
        }
      }
    }
    beamsRef.current.forEach((beam, slot) => {
      const mesh = beamRefs.current[slot];
      if (!mesh) return;
      if (!beam) { mesh.visible = false; return; }
      const t = (elapsed - beam.startTime) / beam.duration;
      if (t >= 1) {
        mesh.visible = false;
        beamsRef.current[slot] = null;
        return;
      }
      const dir = beam.end.clone().sub(beam.start);
      const length = Math.max(dir.length(), 0.001);
      const grow = Math.min(1, t / 0.22);
      mesh.visible = true;
      mesh.position.copy(beam.start).addScaledVector(dir, 0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      mesh.scale.set(1, length * grow, 1);
      mesh.material.opacity = Math.sin(Math.PI * Math.min(t, 1)) * 0.85;
    });

    if (droneRef.current) {
      drones.forEach((drone, i) => {
        const t = (elapsed * drone.speed + drone.phase) % 1;
        dummy.position.lerpVectors(drone.start, drone.end, t);
        const direction = drone.end.clone().sub(drone.start).normalize();
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        droneRef.current.setMatrixAt(i, dummy.matrix);
      });
      droneRef.current.instanceMatrix.needsUpdate = true;
    }

    baseAngleRef.current += delta * 0.014 * orbitSpeed;
    const focusedEl = focusedIndex != null ? groupRefs.current[focusedIndex] : null;
    const target = focusedEl ? focusedEl.position : origin;
    const desiredDistance = focusedEl ? Math.max(4, nodes[focusedIndex].scale * 3.2) : distanceRef.current;
    const yaw = baseAngleRef.current + dragRef.current.targetYaw;
    const pitch = THREE.MathUtils.clamp(0.2 + dragRef.current.targetPitch, -1.4, 1.4);
    const camX = target.x + Math.cos(yaw) * Math.cos(pitch) * desiredDistance;
    const camZ = target.z + Math.sin(yaw) * Math.cos(pitch) * desiredDistance;
    const camY = target.y + Math.sin(pitch) * desiredDistance;
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), focusedEl ? 0.035 : 0.05);
    camera.lookAt(focusedEl ? target : new THREE.Vector3(-5.5, 0, 0));
  });

  return (
    <>
      <color attach="background" args={["#090508"]} />
      <fogExp2 attach="fog" args={["#10080a", 0.008]} />
      <ambientLight color="#704628" intensity={0.075} />
      <pointLight color="#ffb95c" intensity={85 * (starIntensity / 100)} distance={125} decay={1.55} />
      <Sun onReady={onSunReady} intensity={starIntensity} onClear={() => setFocusedIndex(null)} />
      {Array.from({ length: 5 }).map((_, index) => <CoronaShell key={index} index={index} intensity={starIntensity} />)}

      {nodes.map((node, i) => (
        <group key={i} ref={(el) => { groupRefs.current[i] = el; }}>
          <ArchetypeGeometry archetype={node.archetype} />
          <mesh
            material={hitMaterial}
            onPointerOver={(event) => { event.stopPropagation(); setHoveredIndex(i); }}
            onPointerOut={(event) => { event.stopPropagation(); setHoveredIndex((current) => (current === i ? null : current)); }}
            onClick={(event) => { event.stopPropagation(); setFocusedIndex(i); }}
          >
            <sphereGeometry args={[1.6, 8, 8]} />
          </mesh>
          {hoveredIndex === i && (
            <Html center distanceFactor={22} style={{ pointerEvents: "none" }}>
              <div className="alien-dyson-swarm__label">{node.designation}</div>
            </Html>
          )}
        </group>
      ))}

      <mesh geometry={satelliteGeometry} material={satelliteMaterial} frustumCulled={false} />

      {Array.from({ length: MAX_BEAMS }).map((_, slot) => (
        <mesh key={slot} ref={(el) => { beamRefs.current[slot] = el; }} geometry={beamGeometry} visible={false} frustumCulled={false}>
          <meshBasicMaterial color="#bfe9ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}

      <instancedMesh ref={droneRef} args={[undefined, undefined, drones.length]} frustumCulled={false}>
        <boxGeometry args={[0.05, 0.05, 0.5]} />
        <meshBasicMaterial color="#dff1ff" toneMapped={false} />
      </instancedMesh>
    </>
  );
}

export default function AlienDysonSwarm({ settings = {} }) {
  const [sun, setSun] = useState(null);

  return (
    <section className="atmosphere alien-dyson-swarm">
      <CanvasStage
        camera={{ position: [0, 10, 46], fov: 48 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 1.75, threshold: 0.12 }}
        extraEffects={sun ? (
          <>
            <GodRays sun={sun} blendFunction={BlendFunction.SCREEN} samples={42} density={0.85} decay={0.93} weight={0.3} exposure={0.35} clampMax={0.85} kernelSize={KernelSize.SMALL} blur />
            <ChromaticAberration offset={[0.0007, 0.0007]} radialModulation modulationOffset={0.4} />
            <Noise opacity={0.035} blendFunction={BlendFunction.SOFT_LIGHT} />
          </>
        ) : null}
      >
        <Swarm settings={settings} onSunReady={setSun} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>23 — An engineered star, tens of thousands of years old</p>
        <h1>Alien Dyson<br />Swarm.</h1>
        <span>Its builders are gone. The swarm never stopped working. Scroll to approach, drag your cursor to look around, and click a structure to study it closely.</span>
      </div>
    </section>
  );
}
