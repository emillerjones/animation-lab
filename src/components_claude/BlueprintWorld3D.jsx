import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./BlueprintWorld3D.css";

function ConstructBlock({ index, accent }) {
  const ref = useRef();
  const speed = useSpeed();
  const edges = useMemo(() => {
    const size = [0.6 + seeded(index, 1701) * 3, 0.6 + seeded(index, 1702) * 3, 0.6 + seeded(index, 1703) * 3];
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(...size));
  }, [index]);
  const vertexCount = edges.attributes.position.count;
  const delay = useMemo(() => seeded(index, 1710) * 0.4, [index]);

  useFrame((state) => {
    if (!ref.current) return;
    const period = 6;
    const phase = (((state.clock.elapsedTime * speed) / period) + delay) % 1;
    const drawProgress = THREE.MathUtils.clamp(phase / 0.55, 0, 1);
    const pairCount = Math.floor((drawProgress * vertexCount) / 2) * 2;
    edges.setDrawRange(0, phase < 0.55 ? pairCount : vertexCount);
  });

  return (
    <group
      position={[(seeded(index, 1704) - 0.5) * 18, (seeded(index, 1705) - 0.35) * 11, (seeded(index, 1706) - 0.5) * 15]}
      rotation={[seeded(index, 1707), seeded(index, 1708), seeded(index, 1709)]}
    >
      <lineSegments ref={ref} geometry={edges}>
        <lineBasicMaterial color={accent} transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
}

const DRAFT_SEGMENTS = 24;

function DraftingLine({ index, accent }) {
  const ref = useRef();
  const speed = useSpeed();
  const delay = useMemo(() => seeded(index, 1720) * 0.5, [index]);
  const geometry = useMemo(() => {
    const points = [];
    for (let step = 0; step <= DRAFT_SEGMENTS; step += 1) {
      const y = -5 + (12 * step) / DRAFT_SEGMENTS;
      points.push(new THREE.Vector3(-11 + index, y, -4));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [index]);

  useFrame((state) => {
    if (!ref.current) return;
    const period = 5;
    const phase = (((state.clock.elapsedTime * speed) / period) + delay) % 1;
    const drawProgress = THREE.MathUtils.clamp(phase / 0.6, 0, 1);
    const count = Math.floor(drawProgress * DRAFT_SEGMENTS);
    geometry.setDrawRange(0, phase < 0.6 ? count : DRAFT_SEGMENTS + 1);
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={accent} transparent opacity={0.22} />
    </line>
  );
}

export default function BlueprintWorld3D({ settings = {} }) {
  const count = Math.max(10, Math.min(30, settings.blocks ?? 24));
  const measurements = Math.max(6, Math.min(28, settings.measurements ?? 18));
  return (
    <section className="atmosphere blueprint-world-3d">
      <CanvasStage camera={{ position: [1.6, 0.6, 10], fov: 48 }} speed={settings.speed ?? 1} bloom={{ intensity: 0.7 }}>
        <ambientLight intensity={0.1} />
        <group position={[1.6, 0, -2]}>
          {Array.from({ length: count }).map((_, index) => <ConstructBlock key={index} index={index} accent="#78e8ff" />)}
          {Array.from({ length: measurements }).map((_, index) => <DraftingLine key={index} index={index} accent="#78e8ff" />)}
          <pointLight color="#78e8ff" intensity={20} distance={20} />
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>23B — Construction study, actually drawing itself</p>
        <h1>Lines that<br />draw themselves.</h1>
        <span>Every edge is traced stroke by stroke by an invisible hand, instead of just fading or scaling into view.</span>
      </div>
    </section>
  );
}
