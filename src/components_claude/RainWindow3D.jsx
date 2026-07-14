import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./RainWindow3D.css";

const dummy = new THREE.Object3D();

function Rain({ count, accent, intensity }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const drops = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 801) - 0.5) * 18,
    z: seeded(index, 802) * -14 + 2,
    offset: seeded(index, 803),
    fall: 6 + seeded(index, 804) * 8,
    drift: (seeded(index, 805) - 0.5) * 0.6,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    drops.forEach((drop, index) => {
      const period = 3;
      const local = ((t * drop.fall * 0.15 + drop.offset * period) % period) / period;
      const y = 8 - local * 16 * (.72 + intensity * .4);
      dummy.position.set(drop.x + local * drop.drift * 2, y, drop.z);
      dummy.rotation.set(0, 0, 0.05);
      dummy.scale.set(1, 0.9, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.03, 0.03, 0.6, 5]} />
      <meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} transparent opacity={.55 + intensity * .4} toneMapped={false} />
    </instancedMesh>
  );
}

function GlassDroplets({ count, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const drops = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 850) - 0.5) * 13,
    startY: (seeded(index, 851) - 0.5) * 8,
    creep: 0.15 + seeded(index, 852) * 0.35,
    size: 0.04 + seeded(index, 853) * 0.05,
    period: 6 + seeded(index, 854) * 6,
    offset: seeded(index, 855),
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    drops.forEach((drop, index) => {
      const local = ((t + drop.offset * drop.period) % drop.period) / drop.period;
      const y = drop.startY - local * drop.creep * 3;
      dummy.position.set(drop.x, y, 4.06);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(drop.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={accent} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

function CityLights({ accent, intensity }) {
  return (
    <group position={[0, -1, -12]}>
      {Array.from({ length: 10 }).map((_, index) => (
        <mesh key={index} position={[(index - 5) * 2.2, seeded(index, 806) * 1.5, -seeded(index, 807) * 6]}>
          <boxGeometry args={[1.3, 4 + seeded(index, 808) * 8, 1.3]} />
          <meshStandardMaterial color="#03080f" emissive={index % 3 === 0 ? accent : "#ff4d9e"} emissiveIntensity={.8 + (1 - intensity) * 1.2} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function GlassPane({ distortion }) {
  return (
    <mesh position={[0, 1, 4]}>
      <planeGeometry args={[16, 10]} />
      <meshPhysicalMaterial color="#0b1826" transparent opacity={.1 + distortion * .12} roughness={.05 + distortion * .24} transmission={.85 - distortion * .22} thickness={.3 + distortion * .8} ior={1.2 + distortion * .28} />
    </mesh>
  );
}

function StormSky({ settings, intensity }) {
  const cloudGroup = useRef();
  const cloudMesh = useRef();
  const bolt = useRef();
  const flashLight = useRef();
  const nextFlash = useRef(2.8);
  const flash = useRef(0);
  const speed = useSpeed();
  const cover = (settings.claudeClouds ?? 72) / 100;
  const count = Math.round(10 + cover * 34);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const boltPositions = useMemo(() => {
    const points = [];
    let x = -5.5;
    let y = 7.8;
    for (let index = 0; index < 8; index += 1) {
      const nextX = x + (seeded(index, 830) - .48) * 1.7;
      const nextY = y - .8 - seeded(index, 831) * .45;
      points.push(x, y, -7, nextX, nextY, -7);
      x = nextX;
      y = nextY;
    }
    return new Float32Array(points);
  }, []);

  useLayoutEffect(() => {
    if (!cloudMesh.current) return;
    for (let index = 0; index < count; index += 1) {
      dummy.position.set((seeded(index, 820) - .5) * 22, 4.4 + seeded(index, 821) * 5, -7 - seeded(index, 822) * 15);
      dummy.scale.set(2.1 + seeded(index, 823) * 4.2, .7 + seeded(index, 824) * 1.5, 1.5 + seeded(index, 825) * 2.8);
      dummy.rotation.set(0, seeded(index, 826) * Math.PI, 0);
      dummy.updateMatrix();
      cloudMesh.current.setMatrixAt(index, dummy.matrix);
    }
    cloudMesh.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (cloudGroup.current) cloudGroup.current.position.x = Math.sin(time * .045 * speed) * 2.2;
    if (settings.claudeLightning !== false && time > nextFlash.current) {
      flash.current = .7 + intensity * .55;
      nextFlash.current = time + Math.max(1.2, 7.8 - intensity * 5.5) * (.7 + seeded(Math.floor(time * 10), 832) * .8);
    }
    flash.current = Math.max(0, flash.current - delta * (5.5 - intensity * 1.6));
    const pulse = settings.claudeLightning === false ? 0 : flash.current;
    if (bolt.current) bolt.current.opacity = pulse;
    if (flashLight.current) flashLight.current.intensity = pulse * (45 + intensity * 120);
  });

  return (
    <group>
      <group ref={cloudGroup}>
        <instancedMesh ref={cloudMesh} args={[undefined, undefined, count]}>
          <sphereGeometry args={[1, 16, 9]} />
          <meshStandardMaterial color="#101722" emissive="#07101a" emissiveIntensity={.2} roughness={1} transparent opacity={.58 + cover * .34} />
        </instancedMesh>
      </group>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[boltPositions, 3]} /></bufferGeometry>
        <lineBasicMaterial ref={bolt} color="#e8f4ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <pointLight ref={flashLight} position={[-4, 6, -4]} color="#d6eaff" intensity={0} distance={45} />
    </group>
  );
}

export default function RainWindow3D({ settings = {} }) {
  const intensity = (settings.claudeRain ?? 68) / 100;
  const distortion = (settings.claudeGlass ?? 66) / 100;
  const count = Math.round(70 + intensity * 500);
  const background = new THREE.Color("#07111c").lerp(new THREE.Color("#010205"), intensity);
  return (
    <section className="atmosphere rain-window-3d">
      <CanvasStage camera={{ position: [0, 0.5, 9], fov: 50 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.6 }}>
        <color attach="background" args={[background]} />
        <fogExp2 attach="fog" args={[background, .035 + intensity * .018]} />
        <ambientLight intensity={.035 + (1 - intensity) * .08} />
        <StormSky settings={settings} intensity={intensity} />
        <CityLights accent="#69d7ff" intensity={intensity} />
        <Rain count={count} accent="#b9eaff" intensity={intensity} />
        <GlassPane distortion={distortion} />
        <GlassDroplets count={Math.round(30 + intensity * 40)} accent="#dff3ff" />
      </CanvasStage>
      <div className="experiment-copy">
        <p>04B — Glass study, with real refraction</p>
        <h1>Rain, seen<br />through real glass.</h1>
        <span>A physically refractive pane actually bends the city's glow, instead of a flat tint pretending to be a window.</span>
      </div>
    </section>
  );
}
