import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AnimationReadout from "./AnimationReadout";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./LuminousMycelium3D.css";

function buildNetwork(count) {
  const nodes = Array.from({ length: count }, (_, index) => new THREE.Vector3(
    (seeded(index, 1201) - 0.5) * 10,
    (seeded(index, 1202) - 0.5) * 5,
    (seeded(index, 1203) - 0.5) * 8,
  ));
  const edges = [];
  const degree = new Array(count).fill(0);
  nodes.forEach((node, index) => {
    const distances = nodes
      .map((other, otherIndex) => ({ otherIndex, dist: otherIndex === index ? Infinity : node.distanceTo(other) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);
    distances.forEach((entry) => {
      const key = [index, entry.otherIndex].sort((a, b) => a - b).join("-");
      if (!edges.some((edge) => edge.key === key)) {
        edges.push({ key, a: index, b: entry.otherIndex });
        degree[index] += 1;
        degree[entry.otherIndex] += 1;
      }
    });
  });
  return { nodes, edges, degree };
}

function Strands({ nodes, edges, accent }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points = new Float32Array(edges.length * 6);
    edges.forEach((edge, index) => {
      points.set([nodes[edge.a].x, nodes[edge.a].y, nodes[edge.a].z, nodes[edge.b].x, nodes[edge.b].y, nodes[edge.b].z], index * 6);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return geo;
  }, [nodes, edges]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={accent} transparent opacity={0.28} />
    </lineSegments>
  );
}

const dummy = new THREE.Object3D();

function Pulses({ nodes, edges, accent }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const meta = useMemo(() => edges.map((_, index) => ({ offset: seeded(index, 1204), period: 2 + seeded(index, 1205) * 2 })), [edges]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    edges.forEach((edge, index) => {
      const { offset, period } = meta[index];
      const local = ((t + offset * period) % period) / period;
      const point = nodes[edge.a].clone().lerp(nodes[edge.b], local);
      dummy.position.copy(point);
      dummy.scale.setScalar(0.05 * Math.sin(local * Math.PI));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, edges.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} transparent opacity={0.95} />
    </instancedMesh>
  );
}

function Nodes({ nodes, degree }) {
  const maxDegree = Math.max(1, ...degree);
  return nodes.map((node, index) => {
    const level = degree[index] / maxDegree;
    const hue = (100 + seeded(index, 1210) * 170) / 360;
    const color = new THREE.Color().setHSL(hue, 0.85, 0.5 + level * 0.22);
    const size = 0.06 + level * 0.07;
    return (
      <mesh key={index} position={node}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    );
  });
}

export default function LuminousMycelium3D({ settings = {} }) {
  const count = Math.max(4, Math.min(144, settings.nodes ?? 62));
  const { nodes, edges, degree } = useMemo(() => buildNetwork(count), [count]);

  return (
    <section className="atmosphere luminous-mycelium-3d" style={{ "--experiment-accent": "#9dff82" }}>
      <CanvasStage camera={{ position: [1.4, 0.4, 9], fov: 46 }} orbitEnabled orbitFocus={[1.4, 0.4, -1]} speed={settings.speed ?? 1} bloom={{ intensity: 1 }}>
        <ambientLight intensity={0.1} />
        <group position={[1.4, 0.4, -1]}>
          <Strands nodes={nodes} edges={edges} accent="#9dff82" />
          <Nodes nodes={nodes} degree={degree} />
          <Pulses nodes={nodes} edges={edges} accent="#e8ffe0" />
          <pointLight color="#9dff82" intensity={18} distance={16} />
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>11 — Intelligence study, with real signal</p>
        <h1>Light that<br />actually travels.</h1>
        <span>Real pulses of signal move along each connection, the way a fungal network actually communicates.</span>
      </div>
      <AnimationReadout
        eyebrow="Live network"
        value={`${count} NODES`}
        stats={[{ value: edges.length, label: "Signal paths" }]}
      />
    </section>
  );
}
