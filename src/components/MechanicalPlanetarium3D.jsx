import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import { seeded } from "../utils/procedural";
import "./MechanicalPlanetarium3D.css";

// Real orbital periods span a 165:1 ratio (Mercury to Neptune) — too extreme to watch directly,
// so the visual period is log-compressed while keeping every planet's relative order intact.
function visualPeriod(period) {
  return 5 + Math.log(period + 1) * 11;
}

// Real relative order, distance, size, and orbital period (Earth = 1 year) of the eight planets.
// Distance and size are both compressed (not linear) so the whole system reads clearly at once.
const PLANETS = [
  { name: "Mercury", radius: 1.9, size: 0.045, color: "#a9998c", period: 0.24 },
  { name: "Venus", radius: 2.5, size: 0.075, color: "#e8cf9c", period: 0.615 },
  { name: "Earth", radius: 3.2, size: 0.08, color: "#4a7fc9", period: 1 },
  { name: "Mars", radius: 3.9, size: 0.06, color: "#c1542f", period: 1.88 },
  { name: "Jupiter", radius: 5.2, size: 0.32, color: "#c9a679", period: 11.86 },
  { name: "Saturn", radius: 6.6, size: 0.27, color: "#e0c896", period: 29.5, rings: true },
  { name: "Uranus", radius: 7.8, size: 0.17, color: "#a6dee0", period: 84 },
  { name: "Neptune", radius: 8.9, size: 0.165, color: "#5c76e0", period: 164.8 },
];

function Planet({ planet, orbitSpeed }) {
  const planetRef = useRef();
  const speed = useSpeed();
  const angleOffset = useMemo(() => seeded(planet.radius, 301) * Math.PI * 2, [planet.radius]);

  useFrame((state) => {
    if (!planetRef.current) return;
    const angle = angleOffset + state.clock.elapsedTime * orbitSpeed * speed;
    planetRef.current.position.set(Math.cos(angle) * planet.radius, 0, Math.sin(angle) * planet.radius);
  });

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[planet.radius, 0.006, 8, 160]} />
        <meshBasicMaterial color="#8a8266" transparent opacity={0.35} />
      </mesh>
      <group ref={planetRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[planet.size, 24, 24]} />
          <meshStandardMaterial color={planet.color} roughness={0.65} metalness={0.1} />
        </mesh>
        {planet.rings && (
          <mesh rotation={[Math.PI / 2.6, 0, 0]}>
            <ringGeometry args={[planet.size * 1.5, planet.size * 2.4, 48]} />
            <meshBasicMaterial color="#d8c79c" transparent opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </>
  );
}

// How far the orrery is tipped toward a top-down view before any drag input. The
// original -0.32 rad left it nearly edge-on, so the rings (and Saturn's) read as thin
// lines instead of the visible ellipses a planetarium view should show. The sign matters:
// negative put the fixed camera underneath the disc looking up at its belly (Saturn's
// ring showing its far/bottom face); positive puts the camera above it, looking down.
const BASE_PITCH = 0.58;

function SolarRig({ children }) {
  const group = useRef();
  const speed = useSpeed();
  const dragRef = useDragOrbit();
  const autoYawRef = useRef(0);
  const orbitRef = useRef({ yaw: 0, pitch: BASE_PITCH });
  useFrame((state, delta) => {
    if (!group.current) return;
    autoYawRef.current += delta * 0.025 * speed;
    const orbit = orbitRef.current;
    orbit.yaw = THREE.MathUtils.damp(orbit.yaw, dragRef.current.targetYaw, 3.4, delta);
    orbit.pitch = THREE.MathUtils.damp(orbit.pitch, BASE_PITCH + dragRef.current.targetPitch, 3.4, delta);
    group.current.rotation.y = autoYawRef.current + orbit.yaw;
    group.current.rotation.x = orbit.pitch;
  });
  return <group ref={group}>{children}</group>;
}

function SolarSystemScene({ settings }) {
  const visibleCount = Math.max(1, Math.min(PLANETS.length, Math.round(settings.rings ?? PLANETS.length)));
  const planets = PLANETS.slice(0, visibleCount);

  return (
    <SolarRig>
      <group position={[1.6, 0, -1]}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#3a2410" emissive="#ffb35c" emissiveIntensity={2.6} />
        </mesh>
        <pointLight color="#ffd9a0" intensity={40} distance={30} castShadow />
        {planets.map((planet) => (
          <Planet key={planet.name} planet={planet} orbitSpeed={(2 * Math.PI) / visualPeriod(planet.period)} />
        ))}
      </group>
    </SolarRig>
  );
}

export default function MechanicalPlanetarium3D({ settings = {} }) {
  return (
    <section className="atmosphere mechanical-planetarium-3d">
      <CanvasStage camera={{ position: [0, 3.6, 10], fov: 42 }} speed={settings.speed ?? 1} shadows bloom={{ intensity: 0.7 }}>
        <ambientLight intensity={0.15} />
        <SolarSystemScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>11 — Astronomy study, an actual solar system</p>
        <h1>Eight worlds,<br />in the right order.</h1>
        <span>Mercury through Neptune, correctly ordered and correctly paced — Neptune takes 165 times longer to orbit than Mercury, just like the real thing.</span>
      </div>
    </section>
  );
}
