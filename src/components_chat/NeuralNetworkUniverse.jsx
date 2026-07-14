import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import GpuExperience from "./webgl/GpuExperience";
import "./NeuralNetworkUniverse.css";

const CLUSTERS = [
  new THREE.Vector3(-7, 3.5, -5),
  new THREE.Vector3(5.5, 4.5, -10),
  new THREE.Vector3(-3, -2.5, -17),
  new THREE.Vector3(7, -1, -24),
  new THREE.Vector3(-6, 2, -30),
];

function NeuralNetworkWorld({ settings, accent, actionActive }) {
  const group = useRef();
  const nodeMesh = useRef();
  const signalRefs = useRef([]);
  const count = Math.max(50, Math.min(170, Math.round(settings.nodes ?? 150)));
  const pulseRate = settings.pulseRate ?? 0.9;
  const nodes = useMemo(() => Array.from({ length: count }, (_, index) => {
    const cluster = CLUSTERS[index % CLUSTERS.length];
    const radius = index < CLUSTERS.length ? 0 : 1.2 + seeded(index, 801) * 4.2;
    const theta = seeded(index, 802) * Math.PI * 2;
    const phi = Math.acos(THREE.MathUtils.lerp(-1, 1, seeded(index, 803)));
    return new THREE.Vector3(
      cluster.x + Math.sin(phi) * Math.cos(theta) * radius,
      cluster.y + Math.cos(phi) * radius * 0.72,
      cluster.z + Math.sin(phi) * Math.sin(theta) * radius,
    );
  }), [count]);

  const edges = useMemo(() => {
    const unique = new Set();
    const result = [];
    nodes.forEach((node, index) => {
      const neighbors = nodes
        .map((candidate, candidateIndex) => ({ candidateIndex, distance: candidate.distanceToSquared(node) }))
        .filter(({ candidateIndex }) => candidateIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, index < CLUSTERS.length ? 7 : 3);
      neighbors.forEach(({ candidateIndex }) => {
        const low = Math.min(index, candidateIndex);
        const high = Math.max(index, candidateIndex);
        const key = `${low}:${high}`;
        if (unique.has(key)) return;
        unique.add(key);
        result.push([nodes[low], nodes[high]]);
      });
    });
    for (let index = 0; index < CLUSTERS.length; index += 1) result.push([nodes[index], nodes[(index + 1) % CLUSTERS.length]]);
    return result;
  }, [nodes]);

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([start, end], index) => {
      positions.set(start.toArray(), index * 6);
      positions.set(end.toArray(), index * 6 + 3);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [edges]);

  useEffect(() => {
    if (!nodeMesh.current) return;
    const dummy = new THREE.Object3D();
    nodes.forEach((node, index) => {
      dummy.position.copy(node);
      dummy.scale.setScalar(index < CLUSTERS.length ? 0.48 : 0.18 + seeded(index, 804) * 0.11);
      dummy.updateMatrix();
      nodeMesh.current.setMatrixAt(index, dummy.matrix);
      nodeMesh.current.setColorAt(index, new THREE.Color(index < CLUSTERS.length ? "#ffffff" : index % 6 === 0 ? "#b9f2ff" : accent));
    });
    nodeMesh.current.instanceMatrix.needsUpdate = true;
    if (nodeMesh.current.instanceColor) nodeMesh.current.instanceColor.needsUpdate = true;
  }, [nodes, accent]);

  const signalEdges = useMemo(() => edges.filter((_, index) => index % Math.max(2, Math.floor(edges.length / 34)) === 0).slice(0, 34), [edges]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const speed = (settings.speed ?? 1) * pulseRate;
    const time = state.clock.elapsedTime * speed;
    group.current.rotation.y += delta * 0.008 * speed;
    group.current.position.y = 0.4 + Math.sin(time * 0.18) * 0.12;
    signalRefs.current.forEach((signal, index) => {
      if (!signal) return;
      const [start, end] = signalEdges[index];
      const travel = (time * (actionActive ? 0.48 : 0.17) + index * 0.083) % 1;
      signal.position.lerpVectors(start, end, travel);
      signal.scale.setScalar((actionActive ? 0.16 : 0.095) * (0.72 + Math.sin(time * 5 + index) * 0.28));
    });
  });

  return (
    <group ref={group} position={[3.8, 0.4, -1]} scale={0.88}>
      <lineSegments geometry={edgeGeometry} frustumCulled={false}>
        <lineBasicMaterial color={accent} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </lineSegments>
      <instancedMesh ref={nodeMesh} args={[null, null, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>
      {signalEdges.map((_, index) => (
        <mesh key={index} ref={(node) => { signalRefs.current[index] = node; }}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      ))}
      {CLUSTERS.map((_, index) => (
        <mesh key={`cluster-${index}`} position={nodes[index]} scale={1.35 + index * 0.12}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshBasicMaterial color={index % 2 ? "#6bdcff" : accent} wireframe transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
      {CLUSTERS.map((_, index) => <pointLight key={index} position={nodes[index]} color={index % 2 ? "#6bdcff" : accent} intensity={8} distance={9} />)}
    </group>
  );
}

export default function NeuralNetworkUniverse({ settings = {} }) {
  return <GpuExperience scene="neural-network-universe" World={NeuralNetworkWorld} settings={settings} accent="#8c7dff" background="#020209" eyebrow="10 — Connected intelligence" title={"Thought travels\nthrough structure."} description="Persistent synapses bind five neural clusters while visible activation signals race from node to node across the living graph." cta="Trigger a thought" action={() => {}} />;
}
