import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import { seeded } from "../utils/procedural";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import AnimationReadout from "./AnimationReadout";
import "./ThreadBuildsSystem.css";

const MOBILE_QUERY = "(max-width: 700px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const GOLD = "#d5a85b";
const IVORY = "#ead9b6";
const CYAN = "#75d9d0";
const clamp01 = (value) => THREE.MathUtils.clamp(value, 0, 1);
const smooth = (value) => THREE.MathUtils.smoothstep(clamp01(value), 0, 1);

function CameraRig({ pointerRef, influence, mobile }) {
  const base = useMemo(() => new THREE.Vector3(mobile ? 0 : 1.15, mobile ? 1.2 : 1.4, mobile ? 14.8 : 14.2), [mobile]);
  useFrame((state, delta) => {
    const amount = influence / 100;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, base.x + pointerRef.current.x * amount * 1.05, 2.5, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, base.y + pointerRef.current.y * amount * 0.48, 2.5, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, base.z - Math.abs(pointerRef.current.x) * amount * 0.22, 2.5, delta);
    state.camera.lookAt(mobile ? 0 : 1.5, mobile ? 0.7 : 0.15, -0.8);
  });
  return null;
}

function Core({ progressRef, energy }) {
  const rootRef = useRef();
  const innerRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    const reveal = smooth(progressRef.current / 0.24);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.35) * 0.045;
    if (rootRef.current) {
      rootRef.current.scale.lerp(new THREE.Vector3(reveal * pulse, reveal * pulse, reveal * pulse), 1 - Math.exp(-delta * 6));
      rootRef.current.rotation.y += delta * 0.07;
      rootRef.current.rotation.x += delta * 0.025;
    }
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.18;
    if (haloRef.current) {
      haloRef.current.rotation.z -= delta * 0.035;
      haloRef.current.material.opacity = (0.16 + Math.sin(state.clock.elapsedTime * 1.1) * 0.04) * reveal;
    }
  });

  return (
    <group ref={rootRef} scale={0}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.74, 5]} />
        <meshStandardMaterial color="#3b2613" emissive="#ffd58a" emissiveIntensity={4.8 * energy} roughness={0.24} metalness={0.22} />
      </mesh>
      <mesh scale={1.42}>
        <icosahedronGeometry args={[0.74, 2]} />
        <MeshTransmissionMaterial color="#c8e8df" thickness={0.36} roughness={0.08} transmission={0.94} ior={1.38} chromaticAberration={0.035} transparent opacity={0.84} />
      </mesh>
      <mesh ref={haloRef} rotation={[Math.PI / 2.25, 0.18, 0]}>
        <torusGeometry args={[1.38, 0.022, 8, 160]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} toneMapped={false} />
      </mesh>
      <pointLight color="#ffd797" intensity={56 * energy} distance={18} decay={2} />
    </group>
  );
}

function FoldedBody({ accent = IVORY }) {
  return (
    <group rotation={[0.18, -0.4, 0.18]}>
      <mesh rotation={[0, 0.28, 0]}>
        <tetrahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color="#eee2cd" roughness={0.74} metalness={0.02} flatShading side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.42, 0.02, 0]} rotation={[0.1, -0.25, 0.22]} scale={[1.25, 0.18, 0.72]}>
        <tetrahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color={accent} roughness={0.82} flatShading side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.42, 0.02, 0]} rotation={[-0.1, 0.25, -0.22]} scale={[1.25, 0.18, 0.72]}>
        <tetrahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#d7c6aa" roughness={0.86} flatShading side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function OrbitalArtifact({ artifact, index, progressRef, orbitRate }) {
  const anchorRef = useRef();
  const bodyRef = useRef();
  const ringRef = useRef();
  const targetScale = artifact.size;

  useFrame((state, delta) => {
    const reveal = smooth((progressRef.current - artifact.birth) / 0.16);
    const angle = artifact.phase + state.clock.elapsedTime * artifact.speed * orbitRate;
    if (anchorRef.current) {
      anchorRef.current.position.set(
        Math.cos(angle) * artifact.radius,
        Math.sin(angle * 0.73 + artifact.phase) * artifact.lift,
        Math.sin(angle) * artifact.radius * artifact.depth,
      );
    }
    if (bodyRef.current) {
      const scale = reveal * targetScale;
      bodyRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-delta * 7));
      bodyRef.current.rotation.x += delta * artifact.spin * 0.55;
      bodyRef.current.rotation.y += delta * artifact.spin;
    }
    if (ringRef.current?.material) ringRef.current.material.opacity = reveal * 0.12;
  });

  return (
    <>
      <mesh ref={ringRef} rotation={[Math.PI / 2 + artifact.tilt, 0, artifact.bank]} scale={[1, artifact.depth, 1]}>
        <torusGeometry args={[artifact.radius, 0.006, 5, 180]} />
        <meshBasicMaterial color={index % 3 === 0 ? CYAN : GOLD} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={anchorRef}>
        <group ref={bodyRef} scale={0}>
          {artifact.kind === "paper" && <FoldedBody accent={index % 2 ? IVORY : "#c5ad88"} />}
          {artifact.kind === "glass" && (
            <mesh rotation={[0.3, 0.5, 0]}>
              <torusKnotGeometry args={[0.34, 0.105, 96, 16, 2, 3]} />
              <MeshTransmissionMaterial color="#91dcd4" thickness={0.5} roughness={0.09} transmission={0.92} ior={1.32} chromaticAberration={0.04} />
            </mesh>
          )}
          {artifact.kind === "archive" && (
            <RoundedBox args={[0.8, 1.02, 0.16]} radius={0.035} smoothness={3} rotation={[0.08, -0.24, 0.08]}>
              <meshStandardMaterial color="#d7c4a0" roughness={0.65} metalness={0.08} />
            </RoundedBox>
          )}
          {artifact.kind === "brass" && (
            <group>
              <mesh>
                <dodecahedronGeometry args={[0.43, 1]} />
                <meshPhysicalMaterial color="#a87430" emissive="#4b2608" emissiveIntensity={0.3} roughness={0.24} metalness={0.92} clearcoat={0.8} />
              </mesh>
              {[0, 1].map((ring) => (
                <mesh key={ring} rotation={[ring ? Math.PI / 2 : 0.4, ring * 0.8, 0]}>
                  <torusGeometry args={[0.58, 0.026, 8, 80]} />
                  <meshStandardMaterial color="#d2ae6c" metalness={0.95} roughness={0.2} />
                </mesh>
              ))}
            </group>
          )}
          {artifact.kind === "signal" && (
            <group>
              <mesh>
                <octahedronGeometry args={[0.42, 2]} />
                <meshStandardMaterial color="#183c40" emissive={CYAN} emissiveIntensity={1.7} roughness={0.3} metalness={0.55} />
              </mesh>
              <pointLight color={CYAN} intensity={9} distance={4} />
            </group>
          )}
        </group>
      </group>
    </>
  );
}

function makeArtifacts(count) {
  const kinds = ["archive", "paper", "brass", "glass", "signal", "paper", "brass", "glass", "signal"];
  return Array.from({ length: count }, (_, index) => ({
    kind: kinds[index % kinds.length],
    radius: 2.05 + index * 0.54,
    depth: 0.42 + seeded(index, 8101) * 0.28,
    lift: 0.22 + seeded(index, 8102) * 0.62,
    size: 0.58 + seeded(index, 8103) * 0.38,
    speed: (0.12 + seeded(index, 8104) * 0.11) / (1 + index * 0.12),
    spin: (index % 2 ? -1 : 1) * (0.2 + seeded(index, 8105) * 0.38),
    phase: seeded(index, 8106) * Math.PI * 2,
    tilt: (seeded(index, 8107) - 0.5) * 0.34,
    bank: (seeded(index, 8108) - 0.5) * 0.22,
    birth: 0.2 + index * (0.58 / Math.max(1, count - 1)),
  }));
}

function ParticleField({ count, progressRef, orbitRate }) {
  const pointsRef = useRef();
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color(GOLD);
    const ivory = new THREE.Color("#fff0c6");
    const cyan = new THREE.Color(CYAN);
    for (let index = 0; index < count; index += 1) {
      const radius = 0.95 + Math.pow(seeded(index, 8201), 0.58) * 7.6;
      const angle = seeded(index, 8202) * Math.PI * 2;
      const thickness = (seeded(index, 8203) - 0.5) * (0.18 + radius * 0.12);
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = thickness + Math.sin(angle * 2.3) * 0.12;
      positions[index * 3 + 2] = Math.sin(angle) * radius * (0.38 + seeded(index, 8204) * 0.18);
      const color = index % 17 === 0 ? cyan : gold.clone().lerp(ivory, seeded(index, 8205) * 0.72);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    result.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return result;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const reveal = smooth((progressRef.current - 0.08) / 0.48);
    pointsRef.current.rotation.y += delta * 0.035 * orbitRate;
    pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
    pointsRef.current.material.opacity = reveal * 0.78;
  });

  return (
    <points ref={pointsRef} geometry={geometry} rotation={[0.12, 0, -0.04]}>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation toneMapped={false} />
    </points>
  );
}

function IncomingThread({ progressRef }) {
  const pointsRef = useRef();
  const geometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const t = index / count;
      const angle = t * Math.PI * 7;
      const radius = (1 - t) * 1.5 + 0.08;
      positions[index * 3] = -9 + t * 9 + Math.cos(angle) * radius;
      positions[index * 3 + 1] = -2.1 + t * 2.1 + Math.sin(angle) * radius * 0.42;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const reveal = smooth(progressRef.current / 0.28);
    pointsRef.current.geometry.setDrawRange(0, Math.floor(reveal * 900));
    pointsRef.current.material.opacity = 0.9 - smooth((progressRef.current - 0.66) / 0.25) * 0.62;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#ffe1a1" size={0.047} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

function OrbitalWorld({ settings, pointerRef, mobile, reducedMotion, onProgress }) {
  const rootRef = useRef();
  const progressRef = useRef(reducedMotion ? 1 : 0);
  const frameRef = useRef(0);
  const density = settings.systemDensity ?? 72;
  const particleCount = Math.round((settings.particleDensity ?? 78) * (mobile ? 38 : 70));
  const artifactCount = Math.round(5 + density * 0.07);
  const artifacts = useMemo(() => makeArtifacts(artifactCount), [artifactCount]);
  const orbitRate = settings.orbitRate ?? 0.72;
  const energy = 0.7 + (settings.coreEnergy ?? 76) / 100;

  useFrame((state, delta) => {
    if (!reducedMotion) {
      progressRef.current = Math.min(1, progressRef.current + Math.min(delta, 0.05) * 0.145 * (settings.constructionRate ?? 1) * (settings.speed ?? 1));
    }
    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.012 * orbitRate * (settings.speed ?? 1);
      rootRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.075) * 0.015;
    }
    frameRef.current += 1;
    if (onProgress && frameRef.current % 6 === 0) onProgress(progressRef.current);
  });

  return (
    <>
      <color attach="background" args={["#05070a"]} />
      <fogExp2 attach="fog" args={["#05090c", 0.034]} />
      <ambientLight intensity={0.24} color="#d9d1c2" />
      <spotLight position={[-7, 9, 8]} color="#f7dfb2" intensity={42} distance={30} angle={0.35} penumbra={0.92} castShadow />
      <spotLight position={[8, 4, -4]} color="#6ad8d1" intensity={28} distance={26} angle={0.42} penumbra={0.9} />
      <CameraRig pointerRef={pointerRef} influence={settings.pointerInfluence ?? 42} mobile={mobile} />
      <group ref={rootRef} position={[mobile ? 0 : 2.15, mobile ? 1 : 0.2, -1]} rotation={[0.18, -0.08, 0.02]}>
        <IncomingThread progressRef={progressRef} />
        <Core progressRef={progressRef} energy={energy} />
        <ParticleField count={particleCount} progressRef={progressRef} orbitRate={orbitRate} />
        {artifacts.map((artifact, index) => (
          <OrbitalArtifact key={index} artifact={artifact} index={index} progressRef={progressRef} orbitRate={orbitRate * (settings.speed ?? 1)} />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[mobile ? 0 : 2.15, -3.5, -1]} receiveShadow>
        <planeGeometry args={[34, 25]} />
        <MeshReflectorMaterial blur={[300, 80]} resolution={mobile ? 256 : 512} mixBlur={1.2} mixStrength={1.6} mirror={0.3} depthScale={0.6} minDepthThreshold={0.25} color="#070a0b" metalness={0.72} roughness={0.32} />
      </mesh>
      <EffectComposer multisampling={WEBGL_MSAA_SAMPLES}>
        <Bloom mipmapBlur intensity={1.18 + energy * 0.22} luminanceThreshold={0.12} luminanceSmoothing={0.38} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

export default function ThreadBuildsSystem({ settings = {} }) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const reducedMotion = useMemo(() => window.matchMedia?.(REDUCED_QUERY).matches ?? false, []);
  const mobile = useMemo(() => window.matchMedia?.(MOBILE_QUERY).matches ?? false, []);
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const density = settings.systemDensity ?? 72;
  const particleCount = Math.round((settings.particleDensity ?? 78) * (mobile ? 38 : 70));
  const artifactCount = Math.round(5 + density * 0.07);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch" && Math.abs(event.movementY) > Math.abs(event.movementX)) return;
    pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <section className="atmosphere thread-system" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }}>
      <Canvas
        className="thread-system__canvas"
        dpr={WEBGL_DPR}
        shadows={!mobile}
        camera={{ fov: mobile ? 54 : 45, near: 0.1, far: 70, position: [mobile ? 0 : 1.15, mobile ? 1.2 : 1.4, mobile ? 14.8 : 14.2] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <OrbitalWorld settings={settings} pointerRef={pointerRef} mobile={mobile} reducedMotion={reducedMotion} onProgress={setProgress} />
      </Canvas>

      <div className="thread-system__copy">
        <p>24 — Systems study</p>
        <h1>The thread<br />finds its center.</h1>
        <span>Scattered records and signals are drawn into one living instrument—each piece distinct, each orbit carrying part of the work.</span>
      </div>

      <div className="thread-system__legend" aria-hidden="true"><i /><span>Move to shift the instrument</span></div>

      <AnimationReadout
        eyebrow="SYSTEM STATUS"
        value={`${Math.round(progress * 100)}% ASSEMBLED`}
        progress={progress}
        stats={[
          { value: artifactCount.toLocaleString(), label: "ORBITING BODIES" },
          { value: particleCount.toLocaleString(), label: "FIELD PARTICLES" },
        ]}
      />
    </section>
  );
}
