import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./InfiniteDataOcean3D.css";

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -30]}>
      <planeGeometry args={[70, 140]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#020a10"
        metalness={0.4}
      />
    </mesh>
  );
}

function DataGrid({ segments, accent }) {
  const mesh = useRef();
  const speed = useSpeed();

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime * speed;
    const positions = mesh.current.geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      positions.setZ(index, Math.sin(x * 0.5 + time * 0.8) * 0.35 + Math.cos(y * 0.32 - time * 0.6) * 0.5);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, -30]}>
      <planeGeometry args={[70, 140, segments, Math.round(segments * 2)]} />
      <meshBasicMaterial color={accent} wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} fog />
    </mesh>
  );
}

function DataNodes({ count, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodes = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 311) - 0.5) * 60,
    z: seeded(index, 312) * -130 + 10,
    phase: seeded(index, 313) * Math.PI * 2,
  })), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * speed;
    nodes.forEach((node, index) => {
      const y = 0.5 + Math.sin(node.x * 0.5 + time * 0.8 + node.phase) * 0.35 + Math.cos(node.z * 0.32 - time * 0.6) * 0.5;
      dummy.position.set(node.x, y + 0.06, node.z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#eafcff" />
    </instancedMesh>
  );
}

function OceanScene({ settings }) {
  const segments = Math.max(24, Math.min(72, Math.round((settings.lines ?? 42) * 1.4)));
  const nodeCount = Math.max(30, Math.min(180, settings.vertices ?? 160));

  return (
    <group position={[0, -1.4, -4]}>
      <ReflectiveFloor />
      <DataGrid segments={segments} accent="#5ef3ff" />
      <DataNodes count={nodeCount} accent="#5ef3ff" />
      <pointLight color="#5ef3ff" intensity={22} distance={26} position={[2, 3, 2]} />
    </group>
  );
}

export default function InfiniteDataOcean3D({ settings = {} }) {
  return (
    <section className="atmosphere infinite-data-ocean-3d">
      <CanvasStage camera={{ position: [0, 2.2, 9], fov: 48 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.8 }}>
        <color attach="background" args={["#010204"]} />
        <fogExp2 attach="fog" args={["#010204", 0.014]} />
        <ambientLight intensity={0.12} />
        <OceanScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>18B — Seascape study, mirrored</p>
        <h1>Data, reflected<br />in black glass.</h1>
        <span>A breathing signal grid floats above a real mirrored floor instead of a flat wireframe pretending at depth.</span>
      </div>
    </section>
  );
}
