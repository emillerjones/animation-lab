import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { wrapEffect } from "@react-three/postprocessing";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import { LensingEffectImpl } from "./LensingEffect";
import "./BlackHole3D.css";

const dummy = new THREE.Object3D();

const LensingEffect = wrapEffect(LensingEffectImpl);
const LENS_CENTER = new THREE.Vector2(0.62, 0.47);

function useDiskGradient() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    for (let angleStep = 0; angleStep < size; angleStep += 1) {
      const u = angleStep / size;
      const turbulence = 0.55
        + 0.3 * Math.sin(u * Math.PI * 2 * 5 + Math.sin(u * 17) * 2)
        + 0.2 * Math.sin(u * Math.PI * 2 * 11 - u * 6);
      const brightness = Math.max(0.25, Math.min(1.3, turbulence));
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, `rgba(255,253,240,${brightness})`);
      gradient.addColorStop(0.18, `rgba(255,226,160,${Math.min(1, brightness * 0.95)})`);
      gradient.addColorStop(0.42, `rgba(255,154,77,${Math.min(1, brightness * 0.85)})`);
      gradient.addColorStop(0.72, `rgba(201,74,44,${Math.min(1, brightness * 0.7)})`);
      gradient.addColorStop(1, "rgba(30,8,8,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(angleStep, 0, 1, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);
}

function AccretionDisk({ bands, tilt }) {
  const group = useRef();
  const speed = useSpeed();
  const gradient = useDiskGradient();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((ring, index) => {
      ring.rotation.z += delta * speed * (0.55 - index * 0.09);
    });
  });

  const ringDefs = useMemo(() => {
    const count = Math.max(3, Math.min(7, bands));
    return Array.from({ length: count }, (_, index) => ({
      inner: 1.5 + index * 0.42,
      outer: 1.5 + (index + 1) * 0.42,
      opacity: 0.85 - index * 0.09,
    }));
  }, [bands]);

  return (
    <group ref={group} rotation={[tilt, 0, 0]}>
      {ringDefs.map((ring, index) => (
        <mesh key={index}>
          <ringGeometry args={[ring.inner, ring.outer, 96, 1]} />
          <meshBasicMaterial
            map={gradient}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function InfallingMatter({ count, tilt }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const streams = useMemo(() => Array.from({ length: count }, (_, index) => ({
    angle: seeded(index, 951) * Math.PI * 2,
    offset: seeded(index, 952),
    period: 4 + seeded(index, 953) * 3,
    wobble: (seeded(index, 954) - 0.5) * 0.3,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    streams.forEach((stream, index) => {
      const local = ((t / stream.period + stream.offset) % 1 + 1) % 1;
      const radius = 6.5 * (1 - local) + 1.35 * local;
      const angle = stream.angle + (1 - local) * 2.2 + local * 9;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = stream.wobble * Math.sin(local * Math.PI * 3);
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.03 + local * 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#fff2c8" blending={THREE.AdditiveBlending} transparent opacity={0.85} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function PhotonRing({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2.35, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 128]} />
      <meshBasicMaterial color="#fff8e6" blending={THREE.AdditiveBlending} transparent opacity={0.9} />
    </mesh>
  );
}

function BlackHoleScene({ settings }) {
  const bands = Math.round((settings.rings ?? 22) / 4);
  const starCount = Math.max(400, (settings.stars ?? 150) * 12);

  return (
    <group position={[2.1, 0.6, -2]}>
      <Stars radius={70} depth={45} count={starCount} factor={3.4} saturation={0} fade speed={0.25} />
      <AccretionDisk bands={bands} tilt={-Math.PI / 2.35} />
      <InfallingMatter count={Math.max(60, Math.round(starCount / 12))} tilt={-Math.PI / 2.35} />
      <PhotonRing radius={1.42} />
      <mesh>
        <sphereGeometry args={[1.28, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <pointLight color="#ffb173" intensity={18} distance={20} />
    </group>
  );
}

export default function BlackHole3D({ settings = {} }) {
  return (
    <section className="atmosphere black-hole-3d">
      <CanvasStage
        camera={{ position: [0, 1.1, 8.5], fov: 45 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 1.4, threshold: 0.12 }}
        extraEffects={<LensingEffect center={LENS_CENTER} strength={0.16} radius={0.42} />}
      >
        <BlackHoleScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>22B — Gravity study, made of real light</p>
        <h1>Where light<br />stops answering.</h1>
        <span>A real accretion disk, a real starfield, and a genuine lensing distortion bending space around the dark.</span>
      </div>
    </section>
  );
}
