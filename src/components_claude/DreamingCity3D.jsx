import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./DreamingCity3D.css";

function useWindowTexture(accent) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#05060a";
    ctx.fillRect(0, 0, 64, 128);
    const cols = 6;
    const rows = 14;
    const cellW = 64 / cols;
    const cellH = 128 / rows;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const lit = seeded(row * cols + col, 1410) > 0.42;
        ctx.fillStyle = lit ? accent : "#0d1116";
        ctx.fillRect(col * cellW + 1, row * cellH + 1, cellW - 2, cellH - 2);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [accent]);
}

function Tower({ index, accent, windowMap }) {
  const x = (seeded(index, 1401) - 0.5) * 14;
  const z = (seeded(index, 1402) - 0.5) * 10;
  const baseWidth = 0.8 + seeded(index, 1404) * 1.1;
  const baseHeight = 2.2 + seeded(index, 1403) * 6;
  const midHeight = baseHeight * (0.4 + seeded(index, 1406) * 0.2);
  const topHeight = baseHeight * (0.18 + seeded(index, 1407) * 0.12);
  const hasSpire = seeded(index, 1408) > 0.6;

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, baseHeight / 2, 0]}>
        <boxGeometry args={[baseWidth, baseHeight, baseWidth]} />
        <meshStandardMaterial map={windowMap} emissiveMap={windowMap} emissive={accent} emissiveIntensity={0.5} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, baseHeight + midHeight / 2, 0]}>
        <boxGeometry args={[baseWidth * 0.72, midHeight, baseWidth * 0.72]} />
        <meshStandardMaterial map={windowMap} emissiveMap={windowMap} emissive={accent} emissiveIntensity={0.5} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, baseHeight + midHeight + topHeight / 2, 0]}>
        <boxGeometry args={[baseWidth * 0.48, topHeight, baseWidth * 0.48]} />
        <meshStandardMaterial map={windowMap} emissiveMap={windowMap} emissive={accent} emissiveIntensity={0.5} metalness={0.5} roughness={0.4} />
      </mesh>
      {hasSpire && (
        <mesh position={[0, baseHeight + midHeight + topHeight + 0.6, 0]}>
          <coneGeometry args={[0.04, 1.2, 8]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function Towers({ count, accent }) {
  const group = useRef();
  const speed = useSpeed();
  const windowMap = useWindowTexture(accent);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.6;
    group.current.rotation.y += delta * 0.01 * speed;
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, index) => (
        <Tower key={index} index={index} accent={accent} windowMap={windowMap} />
      ))}
    </group>
  );
}

function ReflectiveGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial blur={[250, 90]} resolution={512} mixBlur={1} mixStrength={30} roughness={1} depthScale={1} color="#050608" metalness={0.5} />
    </mesh>
  );
}

export default function DreamingCity3D({ settings = {} }) {
  const count = Math.max(12, Math.min(120, settings.towers ?? 60));
  return (
    <section className="atmosphere dreaming-city-3d">
      <CanvasStage camera={{ position: [1.6, 2.2, 10], fov: 46 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.9 }}>
        <color attach="background" args={["#04050a"]} />
        <fogExp2 attach="fog" args={["#04050a", 0.028]} />
        <ambientLight intensity={0.15} />
        <group position={[1.6, 0, -2]}>
          <ReflectiveGround />
          <Towers count={count} accent="#ffc978" />
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>14B — Gravity study, genuinely mirrored</p>
        <h1>A skyline that<br />actually doubles.</h1>
        <span>Tiered towers with real lit windows sit over a genuine mirrored floor, fading into a soft city haze.</span>
      </div>
    </section>
  );
}
