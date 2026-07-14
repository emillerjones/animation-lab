import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./NeuralNetworkUniverse3D.css";

const ACCENT = new THREE.Color("#b286ff");
const PULSE = new THREE.Color("#ffffff");
const LAYER_FRACTIONS = [0.3, 0.24, 0.2, 0.16, 0.1];
const LAYER_SPACING = 2.6;

function buildLayers(count) {
  const layerCount = LAYER_FRACTIONS.length;
  const sizes = LAYER_FRACTIONS.map((fraction) => Math.max(3, Math.round(count * fraction)));

  const positions = [];
  const layerOf = [];
  const layerStart = [];
  sizes.forEach((size, layerIndex) => {
    layerStart.push(positions.length);
    const cols = Math.ceil(Math.sqrt(size));
    for (let i = 0; i < size; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const spread = cols > 1 ? cols - 1 : 1;
      const x = (layerIndex - (layerCount - 1) / 2) * LAYER_SPACING;
      const y = (row - spread / 2) * 0.55 + (seeded(i + layerIndex * 97, 404) - 0.5) * 0.15;
      const z = (col - spread / 2) * 0.55 + (seeded(i + layerIndex * 97, 405) - 0.5) * 0.15;
      positions.push(new THREE.Vector3(x, y, z));
      layerOf.push(layerIndex);
    }
  });

  const edges = [];
  for (let layerIndex = 0; layerIndex < layerCount - 1; layerIndex += 1) {
    const start = layerStart[layerIndex];
    const end = layerStart[layerIndex + 1];
    const nextEnd = layerIndex + 2 < layerCount ? layerStart[layerIndex + 2] : positions.length;
    for (let a = start; a < end; a += 1) {
      for (let b = end; b < nextEnd; b += 1) {
        edges.push([a, b]);
      }
    }
  }

  return { positions, layerOf, layerCount, edges };
}

function Synapses({ positions, edges }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], index) => {
      points.set([positions[a].x, positions[a].y, positions[a].z, positions[b].x, positions[b].y, positions[b].z], index * 6);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return geo;
  }, [positions, edges]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#b286ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function Nodes({ positions, layerOf, layerCount, waveStart }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    state.raycaster.setFromCamera(state.pointer, state.camera);
    const pointerTarget = state.raycaster.ray.at(9, new THREE.Vector3());
    const time = state.clock.elapsedTime;
    const waveElapsed = waveStart === null ? null : (time - waveStart) * speed;

    positions.forEach((base, index) => {
      const toPointer = pointerTarget.distanceTo(base);
      const pull = THREE.MathUtils.clamp(1 - toPointer / 4, 0, 1) * 0.35;
      const direction = pointerTarget.clone().sub(base).normalize();
      dummy.position.copy(base).addScaledVector(direction, pull);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);

      let color = ACCENT;
      if (waveElapsed !== null) {
        const active = waveElapsed - layerOf[index] * 0.35;
        if (active > 0 && active < 0.7) {
          color = ACCENT.clone().lerp(PULSE, 1 - active / 0.7);
        }
      }
      meshRef.current.setColorAt(index, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

function NetworkScene({ settings }) {
  const { clock } = useThree();
  const [waveStart, setWaveStart] = useState(null);
  const count = Math.max(30, Math.min(170, settings.nodes ?? 150));
  const graph = useMemo(() => buildLayers(count), [count]);

  const triggerWave = (event) => {
    event.stopPropagation();
    setWaveStart(clock.elapsedTime);
  };

  return (
    <group position={[1.4, 0.4, -2]} onPointerDown={triggerWave}>
      <mesh>
        <sphereGeometry args={[7, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Synapses positions={graph.positions} edges={graph.edges} />
      <Nodes positions={graph.positions} layerOf={graph.layerOf} layerCount={graph.layerCount} waveStart={waveStart} />
      <pointLight color="#b286ff" intensity={20} distance={22} />
    </group>
  );
}

export default function NeuralNetworkUniverse3D({ settings = {} }) {
  return (
    <section className="atmosphere neural-network-universe-3d">
      <CanvasStage camera={{ position: [0, 0.5, 11], fov: 48 }} speed={settings.speed ?? 1} bloom={{ intensity: 1.2 }}>
        <ambientLight intensity={0.1} />
        <NetworkScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>19B — Intelligence study, structured like a real net</p>
        <h1>A mind, laid<br />out in layers.</h1>
        <span>A real layered architecture — click anywhere to send an actual forward pass rippling from input to output.</span>
      </div>
    </section>
  );
}
