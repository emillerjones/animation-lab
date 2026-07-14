import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import "./InfiniteDataOcean.css";

function InfiniteDataOceanWorld({ settings, accent, actionActive }) {
  const surface = useRef();
  const pulseRefs = useRef([]);
  const scanRef = useRef();
  const rows = Math.max(16, Math.min(48, Math.round(settings.lines ?? 42)));
  const columns = Math.max(28, Math.min(96, Math.round((settings.vertices ?? 160) * 0.52)));
  const geometry = useMemo(() => {
    const positions = new Float32Array(rows * columns * 3);
    const indices = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        positions[index * 3] = THREE.MathUtils.lerp(-18, 18, column / (columns - 1));
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = THREE.MathUtils.lerp(10, -62, row / (rows - 1));
        if (column < columns - 1) indices.push(index, index + 1);
      }
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setIndex(indices);
    return buffer;
  }, [rows, columns]);

  useFrame((state) => {
    if (!surface.current) return;
    const speed = settings.speed ?? 1;
    const time = state.clock.elapsedTime * speed;
    const positions = surface.current.geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const z = positions.getZ(index);
      const carrier = Math.sin(x * 0.48 + z * 0.12 - time * 1.25) * 0.34;
      const packet = Math.exp(-Math.pow(((z + time * 5.5) % 52) - 26, 2) / 28) * Math.sin(x * 0.8 - time * 2.4) * 1.35;
      positions.setY(index, carrier + packet);
    }
    positions.needsUpdate = true;
    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;
      const cycle = (time * (actionActive ? 0.16 : 0.075) + index * 0.31) % 1;
      pulse.position.z = 6 - cycle * 66;
      const scale = 0.65 + cycle * 4.6;
      pulse.scale.setScalar(scale);
      pulse.material.opacity = (1 - cycle) * (actionActive ? 0.46 : 0.2);
    });
    if (scanRef.current) scanRef.current.position.z = 8 - ((time * (actionActive ? 9 : 4.5)) % 70);
  });

  return (
    <group position={[2.5, -2.1, -12]}>
      <lineSegments ref={surface} geometry={geometry}>
        <lineBasicMaterial color={accent} transparent opacity={0.42} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points geometry={geometry}>
        <pointsMaterial color="#d8fbff" size={0.055} transparent opacity={0.58} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
      </points>
      <mesh ref={scanRef} position={[0, 0.12, 8]}>
        <boxGeometry args={[36, 0.025, 0.08]} />
        <meshBasicMaterial color="#d6fbff" transparent opacity={0.72} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      {Array.from({ length: 4 }, (_, index) => (
        <mesh key={index} ref={(node) => { pulseRefs.current[index] = node; }} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, -index * 14]}>
          <ringGeometry args={[1.8, 1.86, 72]} />
          <meshBasicMaterial color={index % 2 ? "#8177ff" : accent} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function InfiniteDataOcean({ settings = {} }) {
  return <GpuExperience scene="infinite-data-ocean" World={InfiniteDataOceanWorld} settings={settings} accent="#44d7ff" background="#00050a" eyebrow="09 — Signal seascape" title={"An ocean made\nof information."} description="Parallel data traces rise like waves while scan lines and expanding packets cross the surface toward a vanished horizon." cta="Transmit a wave" action={() => {}} />;
}
