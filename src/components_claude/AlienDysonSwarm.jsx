import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { GodRays, ChromaticAberration } from "@react-three/postprocessing";
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

const hullMaterial = new THREE.MeshStandardMaterial({ color: "#8891a3", metalness: 0.85, roughness: 0.32 });
const darkHullMaterial = new THREE.MeshStandardMaterial({ color: "#333a48", metalness: 0.82, roughness: 0.4 });
const panelMaterial = new THREE.MeshStandardMaterial({ color: "#182534", metalness: 0.55, roughness: 0.22, emissive: "#3a6a96", emissiveIntensity: 0.22 });
const mirrorMaterial = new THREE.MeshStandardMaterial({ color: "#e6ecf5", metalness: 1, roughness: 0.06 });
const emberMaterial = new THREE.MeshStandardMaterial({ color: "#ffb066", emissive: "#ff8a3d", emissiveIntensity: 1.6, toneMapped: false });
const hitMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

function designationFor(index, archetype) {
  const sector = Math.floor(seeded(index, 411) * 900) + 100;
  const roman = ROMAN[Math.floor(seeded(index, 412) * ROMAN.length)];
  return `${ARCHETYPE_LABELS[archetype]} ${roman} — Sector ${sector}`;
}

function buildNodes(count) {
  return Array.from({ length: count }, (_, i) => {
    const archetype = ARCHETYPE_KEYS[Math.floor(seeded(i, 501) * ARCHETYPE_KEYS.length)];
    return {
      archetype,
      radius: 7 + seeded(i, 502) * 32,
      inclination: (seeded(i, 503) - 0.5) * Math.PI * 0.7,
      phase: seeded(i, 504) * Math.PI * 2,
      orbitSpeedMul: 0.12 + seeded(i, 505) * 0.36,
      scale: 0.5 + seeded(i, 506) * 2.4,
      spin: (seeded(i, 507) - 0.5) * 0.7,
      tracksStar: archetype === "collector" || archetype === "mirror",
      designation: designationFor(i, archetype),
    };
  });
}

function buildDebris(count) {
  return Array.from({ length: count }, (_, i) => ({
    radius: 5 + seeded(i, 701) * 42,
    inclination: (seeded(i, 702) - 0.5) * Math.PI,
    phase: seeded(i, 703) * Math.PI * 2,
    orbitSpeedMul: 0.08 + seeded(i, 704) * 0.5,
    size: 0.03 + seeded(i, 705) * 0.09,
  }));
}

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

function useSunGeometry() {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.4, 24);
    const base = geo.attributes.position.array.slice();
    return { geo, base };
  }, []);
}

function Sun({ onReady, intensity, onClear }) {
  const meshRef = useRef();
  const { geo, base } = useSunGeometry();
  const speed = useSpeed();

  useEffect(() => {
    if (meshRef.current) onReady(meshRef.current);
  }, [onReady]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    const position = meshRef.current.geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const amp = 0.09 * (intensity / 100);
    for (let index = 0; index < position.count; index += 1) {
      vertex.set(base[index * 3], base[index * 3 + 1], base[index * 3 + 2]);
      direction.copy(vertex).normalize();
      const noise = Math.sin(vertex.x * 1.6 + t) * Math.cos(vertex.y * 1.6 - t * 0.6) * amp;
      vertex.addScaledVector(direction, noise);
      position.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.y += 0.0012 * speed;
  });

  return (
    <mesh ref={meshRef} geometry={geo} onClick={(event) => { event.stopPropagation(); onClear(); }}>
      <meshStandardMaterial color="#ff9a3d" emissive="#ffcf7a" emissiveIntensity={1.1 + intensity / 140} roughness={0.65} />
    </mesh>
  );
}

function CoronaShell({ index, intensity }) {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * (0.06 + index * 0.015) * speed; });
  return (
    <mesh ref={ref} rotation={[seeded(index, 951) * 3, seeded(index, 952) * 3, 0]}>
      <torusGeometry args={[4.1 + index * 0.4, 0.03, 6, 120, Math.PI * (0.5 + seeded(index, 953))]} />
      <meshBasicMaterial color="#ffe3ae" transparent opacity={0.5 + (intensity / 100) * 0.3} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}

function Swarm({ settings, onSunReady }) {
  const { camera } = useThree();
  const speed = useSpeed();
  const dragRef = useDragOrbit();
  const groupRefs = useRef([]);
  const debrisRef = useRef();
  const droneRef = useRef();
  const distanceRef = useRef(46);
  const baseAngleRef = useRef(0.6);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const swarmDensity = Math.round(settings.swarmDensity ?? 90);
  const debrisDensity = Math.round(settings.debrisDensity ?? 1600);
  const starIntensity = settings.starIntensity ?? 110;
  const orbitSpeed = settings.orbitSpeed ?? 0.6;
  const droneTraffic = Math.round(settings.droneTraffic ?? 16);

  const nodes = useMemo(() => buildNodes(swarmDensity), [swarmDensity]);
  const debris = useMemo(() => buildDebris(debrisDensity), [debrisDensity]);
  const drones = useMemo(() => buildDrones(droneTraffic), [droneTraffic]);

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
      const bz = Math.sin(angle) * node.radius;
      el.position.set(bx, bz * Math.sin(node.inclination), bz * Math.cos(node.inclination));
      if (node.tracksStar) {
        el.lookAt(origin);
      } else {
        el.rotation.y += node.spin * delta * orbitSpeed;
      }
      el.scale.setScalar(node.scale);
    });

    if (debrisRef.current) {
      debris.forEach((bit, i) => {
        const angle = bit.phase + elapsed * bit.orbitSpeedMul * orbitSpeed;
        const bx = Math.cos(angle) * bit.radius;
        const bz = Math.sin(angle) * bit.radius;
        dummy.position.set(bx, bz * Math.sin(bit.inclination), bz * Math.cos(bit.inclination));
        dummy.scale.setScalar(bit.size);
        dummy.rotation.set(elapsed * 0.3 + i, elapsed * 0.2, 0);
        dummy.updateMatrix();
        debrisRef.current.setMatrixAt(i, dummy.matrix);
      });
      debrisRef.current.instanceMatrix.needsUpdate = true;
    }

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
    camera.lookAt(target);
  });

  return (
    <>
      <ambientLight intensity={0.045} />
      <pointLight color="#ffb95c" intensity={30 * (starIntensity / 100)} distance={140} decay={1.4} />
      <Sun onReady={onSunReady} intensity={starIntensity} onClear={() => setFocusedIndex(null)} />
      {Array.from({ length: 4 }).map((_, index) => <CoronaShell key={index} index={index} intensity={starIntensity} />)}

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

      <instancedMesh ref={debrisRef} args={[undefined, undefined, debris.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#6b7284" metalness={0.7} roughness={0.5} />
      </instancedMesh>

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
        camera={{ position: [0, 14, 46], fov: 50 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 1.3, threshold: 0.18 }}
        vignette={{ darkness: 1 }}
        extraEffects={sun ? (
          <>
            <GodRays sun={sun} blendFunction={BlendFunction.SCREEN} samples={42} density={0.85} decay={0.93} weight={0.3} exposure={0.35} clampMax={0.85} kernelSize={KernelSize.SMALL} blur />
            <ChromaticAberration offset={[0.0007, 0.0007]} radialModulation modulationOffset={0.4} />
          </>
        ) : null}
      >
        <Swarm settings={settings} onSunReady={setSun} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>Claude — An engineered star, tens of thousands of years old</p>
        <h1>Alien Dyson<br />Swarm.</h1>
        <span>Its builders are gone. The swarm never stopped working. Scroll to approach, drag your cursor to look around, and click a structure to study it closely.</span>
      </div>
    </section>
  );
}
