import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./StarryNight3D.css";

function CraterMoon() {
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 24);
    const position = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const craters = Array.from({ length: 14 }, (_, index) => ({
      dir: new THREE.Vector3(
        seeded(index, 711) - 0.5,
        seeded(index, 712) - 0.5,
        seeded(index, 713) - 0.5,
      ).normalize(),
      radius: 0.14 + seeded(index, 714) * 0.32,
      depth: 0.035 + seeded(index, 715) * 0.045,
    }));

    for (let index = 0; index < position.count; index += 1) {
      vertex.fromBufferAttribute(position, index);
      direction.copy(vertex).normalize();
      let offset = (seeded(index, 716) - 0.5) * 0.006;
      craters.forEach((crater) => {
        const d = direction.distanceTo(crater.dir);
        if (d < crater.radius) {
          const t = d / crater.radius;
          const bowl = -crater.depth * (1 - t * t);
          const rim = crater.depth * 0.55 * Math.exp(-Math.pow((t - 0.88) * 7, 2));
          offset += bowl + rim;
        }
      });
      vertex.addScaledVector(direction, offset);
      position.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[5.5, 5, -14]}>
      <meshStandardMaterial color="#f4f2e8" roughness={0.95} />
    </mesh>
  );
}

function CloudPuff({ position, scale, opacity }) {
  return (
    <group position={position} scale={scale}>
      {[[0, 0, 0], [0.8, 0.15, 0.2], [-0.7, 0.1, -0.15], [0.25, -0.15, 0.4], [-0.2, 0.2, -0.35]].map((offset, index) => (
        <mesh key={index} position={offset}>
          <sphereGeometry args={[1, 12, 10]} />
          <meshStandardMaterial color="#5c6b8c" transparent opacity={opacity} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

const dummy = new THREE.Object3D();

function ShootingStars({ count }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const trails = useMemo(() => Array.from({ length: count }, (_, index) => ({
    startX: (seeded(index, 702) - 0.5) * 40 - 10,
    startY: 9 + seeded(index, 703) * 5,
    z: -28 - seeded(index, 704) * 30,
    offset: seeded(index, 705),
    period: 11 + seeded(index, 706) * 8,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    const window = 0.16;
    trails.forEach((trail, index) => {
      const local = ((t + trail.offset * trail.period) % trail.period) / trail.period;
      const active = local < window;
      const progress = active ? local / window : 1;
      const alpha = active ? Math.sin(progress * Math.PI) : 0;
      dummy.position.set(trail.startX + progress * 9, trail.startY - progress * 4.5, trail.z);
      dummy.rotation.set(0, 0, -0.46);
      dummy.scale.set(1, alpha * 1.3, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.01, 0.01, 1.4, 5]} />
      <meshBasicMaterial color="#eaf6ff" blending={THREE.AdditiveBlending} transparent opacity={0.9} />
    </instancedMesh>
  );
}

function ReflectiveLake() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.4, -6]}>
      <planeGeometry args={[40, 20]} />
      <MeshReflectorMaterial blur={[250, 90]} resolution={512} mixBlur={1.2} mixStrength={20} roughness={0.9} depthScale={1} color="#050b12" metalness={0.3} />
    </mesh>
  );
}

function Clouds({ cloudCover }) {
  const count = Math.max(2, Math.round(2 + cloudCover * 7));
  const puffs = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 721) - 0.5) * 26,
    y: 2.2 + seeded(index, 722) * 4,
    z: -6 - seeded(index, 723) * 16,
    scale: 1.4 + seeded(index, 724) * 2.4,
  })), [count]);

  return puffs.map((puff, index) => (
    <CloudPuff key={index} position={[puff.x, puff.y, puff.z]} scale={puff.scale} opacity={0.3 + cloudCover * 0.55} />
  ));
}

function SkyScene({ settings }) {
  const starCount = Math.max(400, (settings.density ?? 150) * 12);
  const cloudCover = (settings.clouds ?? 72) / 100;
  return (
    <group>
      <Stars radius={80} depth={50} count={starCount} factor={3.4} saturation={0} fade speed={0.2} />
      <CraterMoon />
      <pointLight position={[5.5, 5, -11]} color="#eaf4ff" intensity={45} distance={30} />
      <Clouds cloudCover={cloudCover} />
      <ShootingStars count={2} />
      <ReflectiveLake />
    </group>
  );
}

export default function StarryNight3D({ settings = {} }) {
  return (
    <section className="atmosphere starry-night-3d">
      <CanvasStage camera={{ position: [0, 1, 9], fov: 50 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.7 }}>
        <ambientLight intensity={0.1} />
        <SkyScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>03B — Parallax study, with a real moon</p>
        <h1>A sky you<br />could land on.</h1>
        <span>A cratered moon, real shooting stars, and a lake that actually reflects the sky instead of a painted gradient.</span>
      </div>
    </section>
  );
}
