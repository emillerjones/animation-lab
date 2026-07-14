import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./CathedralAscent3D.css";

const ARCH_SPACING = 6.2;
const dummy = new THREE.Object3D();

function useArchGeometry() {
  return useMemo(() => {
    const outer = new THREE.Shape();
    outer.moveTo(-3.4, -4.6);
    outer.lineTo(3.4, -4.6);
    outer.lineTo(3.4, 0.6);
    outer.quadraticCurveTo(3.4, 3.2, 0, 4.7);
    outer.quadraticCurveTo(-3.4, 3.2, -3.4, 0.6);
    outer.closePath();

    const opening = new THREE.Path();
    opening.moveTo(-2.95, -4.35);
    opening.lineTo(-2.95, 0.6);
    opening.quadraticCurveTo(-2.95, 2.65, 0, 3.95);
    opening.quadraticCurveTo(2.95, 2.65, 2.95, 0.6);
    opening.lineTo(2.95, -4.35);
    opening.closePath();
    outer.holes.push(opening);

    const geometry = new THREE.ExtrudeGeometry(outer, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    geometry.center();
    return geometry;
  }, []);
}

function useTraceryGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.6, -4.3);
    shape.lineTo(-2.6, 0.55);
    shape.quadraticCurveTo(-2.6, 2.35, 0, 3.55);
    shape.quadraticCurveTo(2.6, 2.35, 2.6, 0.55);
    shape.lineTo(2.6, -4.3);
    const hole = new THREE.Path();
    hole.moveTo(-2.3, -4.3);
    hole.lineTo(-2.3, 0.5);
    hole.quadraticCurveTo(-2.3, 2.1, 0, 3.2);
    hole.quadraticCurveTo(2.3, 2.1, 2.3, 0.5);
    hole.lineTo(2.3, -4.3);
    shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false });
    geometry.center();
    return geometry;
  }, []);
}

function Nave({ count, accent }) {
  const archGeometry = useArchGeometry();
  const traceryGeometry = useTraceryGeometry();
  const speed = useSpeed();
  const archMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0c0904", emissive: accent, emissiveIntensity: 1.3, metalness: 0.85, roughness: 0.28 }),
    [accent],
  );
  const traceryMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1508", emissive: accent, emissiveIntensity: 0.7, metalness: 0.7, roughness: 0.4 }),
    [accent],
  );

  useFrame((state) => {
    const breathe = 0.5 + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
    archMaterial.emissiveIntensity = 1.1 + breathe * 0.5;
    traceryMaterial.emissiveIntensity = 0.55 + breathe * 0.3;
  });

  return (
    <group>
      {Array.from({ length: count }, (_, index) => (
        <group key={index} position={[0, 3.2, 6 - index * ARCH_SPACING]}>
          <mesh geometry={archGeometry} material={archMaterial} />
          <mesh geometry={traceryGeometry} material={traceryMaterial} position={[0, 0, 0.14]} />
        </group>
      ))}
    </group>
  );
}

function Pillars({ count, accent }) {
  const shaftRef = useRef();
  const capitalRef = useRef();
  const speed = useSpeed();
  const shaftMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#171106", metalness: 0.6, roughness: 0.4, emissive: accent, emissiveIntensity: 0.2 }),
    [accent],
  );
  const capitalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1c1608", metalness: 0.8, roughness: 0.3, emissive: accent, emissiveIntensity: 0.6 }),
    [accent],
  );

  const pillars = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: index % 2 === 0 ? -4.6 : 4.6,
    z: 5 - Math.floor(index / 2) * ARCH_SPACING,
  })), [count]);

  useFrame((state) => {
    if (!shaftRef.current || !capitalRef.current) return;
    const breathe = 0.5 - Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
    shaftMaterial.emissiveIntensity = 0.1 + breathe * 0.2;
    capitalMaterial.emissiveIntensity = 0.35 + breathe * 0.35;
    pillars.forEach((pillar, index) => {
      dummy.position.set(pillar.x, 1.6, pillar.z);
      dummy.updateMatrix();
      shaftRef.current.setMatrixAt(index, dummy.matrix);
      dummy.position.set(pillar.x, 3.15, pillar.z);
      dummy.updateMatrix();
      capitalRef.current.setMatrixAt(index, dummy.matrix);
    });
    shaftRef.current.instanceMatrix.needsUpdate = true;
    capitalRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={shaftRef} args={[undefined, undefined, count]} material={shaftMaterial} frustumCulled={false}>
        <cylinderGeometry args={[0.22, 0.28, 3.2, 12]} />
      </instancedMesh>
      <instancedMesh ref={capitalRef} args={[undefined, undefined, count]} material={capitalMaterial} frustumCulled={false}>
        <torusGeometry args={[0.34, 0.07, 8, 16]} />
      </instancedMesh>
    </group>
  );
}

function Sun({ onReady }) {
  return (
    <mesh ref={onReady} position={[0, 3.6, -78]}>
      <sphereGeometry args={[2.4, 32, 32]} />
      <meshBasicMaterial color="#fff7dd" toneMapped={false} />
    </mesh>
  );
}

function SacredDust({ count, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const motes = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 2101) - 0.5) * 8,
    y: 0.4 + seeded(index, 2102) * 6.4,
    z: -seeded(index, 2103) * 70,
    rise: 0.15 + seeded(index, 2104) * 0.3,
    drift: (seeded(index, 2105) - 0.5) * 0.4,
    size: 0.02 + seeded(index, 2106) * 0.035,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    motes.forEach((mote, index) => {
      const y = ((mote.y + t * mote.rise) % 6.8);
      dummy.position.set(mote.x + Math.sin(t * 0.3 + index) * mote.drift, y, mote.z);
      dummy.scale.setScalar(mote.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={accent} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

function useFloorTileTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0a0704";
    ctx.fillRect(0, 0, size, size);
    const tiles = 16;
    const step = size / tiles;
    ctx.strokeStyle = "rgba(226,182,101,0.35)";
    ctx.lineWidth = 2;
    for (let i = 0; i <= tiles; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 14);
    return texture;
  }, []);
}

function ReflectiveFloor() {
  const tileMap = useFloorTileTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, -35]}>
      <planeGeometry args={[12, 90]} />
      <MeshReflectorMaterial
        blur={[320, 110]}
        resolution={512}
        mixBlur={1.1}
        mixStrength={30}
        roughness={0.7}
        depthScale={1.1}
        color="#050301"
        metalness={0.7}
        roughnessMap={tileMap}
      />
    </mesh>
  );
}

function CathedralRig({ children }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.05;
    group.current.rotation.x = state.pointer.y * 0.02;
  });
  return <group ref={group}>{children}</group>;
}

function BreathingLight({ accent }) {
  const lightRef = useRef();
  const speed = useSpeed();
  useFrame((state) => {
    if (!lightRef.current) return;
    const breathe = 0.5 + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
    lightRef.current.intensity = 20 + breathe * 12;
  });
  return <pointLight ref={lightRef} color={accent} intensity={26} distance={30} position={[0, 3.6, -10]} />;
}

function CathedralScene({ settings, onSunReady }) {
  const archCount = Math.max(10, Math.min(20, Math.round((settings.arches ?? 30) / 1.6)));
  const dustCount = Math.max(60, Math.min(220, settings.dust ?? 110));

  return (
    <CathedralRig>
      <Sun onReady={onSunReady} />
      <ReflectiveFloor />
      <Nave count={archCount} accent="#e2b665" />
      <Pillars count={archCount * 2} accent="#e2b665" />
      <SacredDust count={dustCount} accent="#ffe6b0" />
      <BreathingLight accent="#e2b665" />
    </CathedralRig>
  );
}

export default function CathedralAscent3D({ settings = {} }) {
  const [sun, setSun] = useState(null);
  return (
    <section className="atmosphere cathedral-ascent-3d">
      <CanvasStage
        camera={{ position: [0, 1.6, 9], fov: 48 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.85, threshold: 0.12 }}
        vignette={{ darkness: 0.95 }}
        extraEffects={sun ? (
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            samples={45}
            density={0.93}
            decay={0.92}
            weight={0.5}
            exposure={0.6}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur
          />
        ) : null}
      >
        <ambientLight intensity={0.05} />
        <CathedralScene settings={settings} onSunReady={setSun} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>Claude — Sacred geometry, breathing in real light</p>
        <h1>Cathedral<br />of Light.</h1>
        <span>Ribbed arches and real stone pillars line a nave that breathes between light and shadow, tracked over a genuine mirrored floor.</span>
      </div>
    </section>
  );
}
