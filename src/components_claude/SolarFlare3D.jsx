import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./SolarFlare3D.css";

function useSunGeometry() {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 24);
    const base = geo.attributes.position.array.slice();
    return { geo, base };
  }, []);
}

function Sun({ onReady, energy }) {
  const meshRef = useRef();
  const { geo, base } = useSunGeometry();
  const speed = useSpeed();

  useEffect(() => {
    if (meshRef.current) onReady(meshRef.current);
  }, [onReady]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    const position = meshRef.current.geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const direction = new THREE.Vector3();
    for (let index = 0; index < position.count; index += 1) {
      vertex.set(base[index * 3], base[index * 3 + 1], base[index * 3 + 2]);
      direction.copy(vertex).normalize();
      const noise = Math.sin(vertex.x * 2 + t) * Math.cos(vertex.y * 2 - t * 0.7) * 0.06 * (energy / 100);
      vertex.addScaledVector(direction, noise);
      position.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.y += 0.0015 * speed;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial color="#ff6d16" emissive="#ffb347" emissiveIntensity={1.3} roughness={0.7} />
    </mesh>
  );
}

function CoronaRing({ index }) {
  const ref = useRef();
  const speed = useSpeed();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * (0.1 + index * 0.02) * speed; });
  return (
    <mesh ref={ref} rotation={[seeded(index, 951) * 3, seeded(index, 952) * 3, 0]}>
      <torusGeometry args={[3 + index * 0.3, 0.028, 6, 120, Math.PI * (0.5 + seeded(index, 953))]} />
      <meshBasicMaterial color="#fff0c8" transparent opacity={0.9} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}

export default function SolarFlare3D({ settings = {} }) {
  const [sun, setSun] = useState(null);
  const energy = settings.energy ?? 100;
  const flareCount = Math.max(4, Math.min(16, Math.round(energy / 8)));

  return (
    <section className="atmosphere solar-flare-3d">
      <CanvasStage
        camera={{ position: [1.2, 0.6, 9], fov: 46 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.6, threshold: 0.5 }}
        extraEffects={sun ? (
          <GodRays sun={sun} blendFunction={BlendFunction.SCREEN} samples={40} density={0.7} decay={0.92} weight={0.26} exposure={0.32} clampMax={0.8} kernelSize={KernelSize.SMALL} blur />
        ) : null}
      >
        <ambientLight intensity={0.05} />
        <group position={[1.2, 0.4, 0]}>
          <Sun onReady={setSun} energy={energy} />
          {Array.from({ length: flareCount }).map((_, index) => <CoronaRing key={index} index={index} />)}
          <pointLight color="#ffb14c" intensity={26} distance={30} />
        </group>
      </CanvasStage>
      <div className="experiment-copy">
        <p>07B — Orbit study, with a real living surface</p>
        <h1>A star that<br />actually churns.</h1>
        <span>The surface itself deforms in real time, and true volumetric rays pour out through the corona.</span>
      </div>
    </section>
  );
}
