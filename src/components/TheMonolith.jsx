import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Line, RoundedBox } from "@react-three/drei";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import useDragOrbit from "../hooks/useDragOrbit";
import { seeded } from "../utils/procedural";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import "./TheMonolith.css";

const particleVertex = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSpread;
  attribute vec3 aDirection;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aSize;
  varying float vAlpha;

  float ease(float value) { return value * value * (3.0 - 2.0 * value); }

  void main() {
    float release = ease(smoothstep(.50, 1.0, uProgress));
    float orbit = uTime * (.18 + aSpeed * .16) + aPhase;
    vec3 ambient = vec3(cos(orbit), sin(orbit * .73) * .65, sin(orbit)) * vec3(.8, 2.7, .72);
    ambient.y += mod(uTime * (.09 + aSpeed * .08) + aPhase, 5.5) - 2.75;
    vec3 eruption = aDirection * release * uSpread * (2.0 + aSpeed * 5.5);
    eruption.y += release * release * (1.5 + aSpeed * 4.2);
    eruption.xz += vec2(cos(orbit * 2.1), sin(orbit * 1.7)) * release * .42;
    vec3 transformed = mix(ambient, eruption, release);
    transformed.y += .35;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (1.0 + release * 1.9) * (85.0 / -mvPosition.z);
    vAlpha = release * (0.72 + sin(aPhase + uTime * 1.7) * .24);
  }
`;

const particleFragment = `
  varying float vAlpha;
  void main() {
    float distanceToCenter = length(gl_PointCoord - .5);
    float glow = 1.0 - smoothstep(.08, .5, distanceToCenter);
    vec3 color = mix(vec3(.24, .56, 1.0), vec3(.76, .35, 1.0), gl_PointCoord.y);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;

function ParticleRelease({ progressRef, settings }) {
  const materialRef = useRef();
  const count = Math.round(settings.particleCount ?? 3000);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      const theta = seeded(index, 2101) * Math.PI * 2;
      const lift = 0.15 + seeded(index, 2102) * 0.85;
      const radial = Math.sqrt(Math.max(0, 1 - lift * lift));
      directions.set([Math.cos(theta) * radial, lift, Math.sin(theta) * radial], index * 3);
      phases[index] = seeded(index, 2103) * Math.PI * 2;
      speeds[index] = 0.2 + seeded(index, 2104) * 0.8;
      sizes[index] = 0.55 + seeded(index, 2105) * 1.8;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("aDirection", new THREE.BufferAttribute(directions, 3));
    buffer.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    buffer.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    buffer.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return buffer;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uSpread: { value: settings.particleSpread ?? 1 },
  }), [settings.particleSpread]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * (settings.speed ?? 1);
    materialRef.current.uniforms.uProgress.value = progressRef.current;
    materialRef.current.uniforms.uSpread.value = settings.particleSpread ?? 1;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={particleVertex} fragmentShader={particleFragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

function Crack({ points, threshold, progressRef, energy }) {
  const lineRef = useRef();
  useFrame((state) => {
    if (!lineRef.current?.material) return;
    const reveal = THREE.MathUtils.smoothstep(progressRef.current, threshold, threshold + 0.18);
    const pulse = 0.72 + Math.sin(state.clock.elapsedTime * 2.8 + threshold * 19) * 0.28;
    lineRef.current.material.opacity = reveal * pulse * energy;
  });
  return <Line ref={lineRef} points={points} color="#84cfff" lineWidth={0.45 + energy * 0.45} transparent opacity={0} depthTest depthWrite={false} toneMapped={false} />;
}

function CrackField({ progressRef, settings }) {
  const cracks = useMemo(() => Array.from({ length: 19 }, (_, index) => {
    const side = index % 2 ? 1 : -1;
    const startY = -1.95 + seeded(index, 2201) * 4.7;
    const points = [new THREE.Vector3(side * 0.03, startY, 0.604)];
    let x = side * 0.03;
    let y = startY;
    for (let step = 0; step < 4; step += 1) {
      x += side * (0.13 + seeded(index * 4 + step, 2202) * 0.36);
      y += (seeded(index * 4 + step, 2203) - 0.5) * 0.72;
      points.push(new THREE.Vector3(x, y, 0.604));
    }
    return { points, threshold: 0.08 + index * 0.024 };
  }), []);
  const energy = (settings.crackEnergy ?? 100) / 100;
  return <group>{cracks.map((crack, index) => <Crack key={index} {...crack} progressRef={progressRef} energy={energy} />)}</group>;
}

function Monolith({ progressRef, settings, pulseRef }) {
  const rootRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const coreRef = useRef();
  const coreLightRef = useRef();
  const rotationRate = settings.rotationRate ?? 0.5;
  const coreEnergy = (settings.coreEnergy ?? 100) / 100;
  const dragRef = useDragOrbit();
  const autoYawRef = useRef(0);
  const orbitRef = useRef({ yaw: 0, pitch: 0 });

  useFrame((state, delta) => {
    const progress = progressRef.current;
    const opening = THREE.MathUtils.smoothstep(progress, 0.42, 1);
    const speed = settings.speed ?? 1;
    if (rootRef.current) {
      autoYawRef.current += Math.min(delta, 0.05) * rotationRate * speed * (0.07 + progress * 0.13);
      const orbit = orbitRef.current;
      orbit.yaw = THREE.MathUtils.damp(orbit.yaw, dragRef.current.targetYaw, 3, delta);
      orbit.pitch = THREE.MathUtils.damp(orbit.pitch, dragRef.current.targetPitch, 3, delta);
      rootRef.current.rotation.y = autoYawRef.current + orbit.yaw;
      rootRef.current.rotation.x = orbit.pitch;
      rootRef.current.rotation.z = THREE.MathUtils.damp(rootRef.current.rotation.z, -Math.sin(orbit.yaw) * 0.035, 3, delta);
    }
    if (leftRef.current && rightRef.current) {
      leftRef.current.position.x = -0.7 - opening * 0.48;
      rightRef.current.position.x = 0.7 + opening * 0.48;
      leftRef.current.rotation.y = opening * 0.14;
      rightRef.current.rotation.y = -opening * 0.14;
    }
    pulseRef.current = Math.max(0, pulseRef.current - delta * 1.8);
    const pulse = pulseRef.current;
    if (coreRef.current) coreRef.current.scale.set(0.12 + opening * 0.82 + pulse * 0.14, 1, 1);
    if (coreLightRef.current) coreLightRef.current.intensity = (8 + progress * 34 + opening * 70 + pulse * 75) * coreEnergy;
  });

  const slab = (
    <RoundedBox args={[1.38, 6.1, 1.2]} radius={0.07} smoothness={3}>
      <meshPhysicalMaterial color="#080d16" emissive="#06182d" emissiveIntensity={0.35} metalness={0.65} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
      <Edges color="#8bd8ff" threshold={18} opacity={0.82} transparent toneMapped={false} />
    </RoundedBox>
  );

  return (
    <group ref={rootRef} position={[0, 0.45, 0]}>
      <group ref={leftRef} position={[-0.7, 0, 0]}>{slab}</group>
      <group ref={rightRef} position={[0.7, 0, 0]}>{slab}</group>
      <mesh ref={coreRef} position={[0, 0, 0.615]} scale={[0.12, 1, 1]}>
        <boxGeometry args={[0.58, 5.5, 0.08]} />
        <meshBasicMaterial color="#b7e9ff" toneMapped={false} />
      </mesh>
      <pointLight ref={coreLightRef} color="#7976ff" intensity={8} distance={20} />
      <CrackField progressRef={progressRef} settings={settings} />
    </group>
  );
}

function MonolithWorld({ settings, progressRef, pulseRef }) {
  return (
    <>
      <ambientLight intensity={0.025} />
      <spotLight position={[-5, 7, 6]} color="#7dbbff" intensity={16} distance={28} angle={0.32} penumbra={0.92} />
      <spotLight position={[5, 1, -4]} color="#7947ff" intensity={11} distance={22} angle={0.42} penumbra={0.9} />
      <Monolith progressRef={progressRef} settings={settings} pulseRef={pulseRef} />
      <ParticleRelease progressRef={progressRef} settings={settings} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.63, 0]}>
        <circleGeometry args={[4.8, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.24} metalness={0.86} />
      </mesh>
      {[1.35, 2.35, 3.55].map((radius, index) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.615, 0]}>
          <torusGeometry args={[radius, 0.008, 4, 100]} />
          <meshBasicMaterial color={index % 2 ? "#6848ff" : "#43bfff"} transparent opacity={0.13 - index * 0.025} toneMapped={false} />
        </mesh>
      ))}
      <EffectComposer multisampling={WEBGL_MSAA_SAMPLES}>
        <Bloom mipmapBlur intensity={1.35} luminanceThreshold={0.12} luminanceSmoothing={0.3} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

function ProgressDriver({ progressRef, targetRef }) {
  useFrame((_, delta) => {
    progressRef.current = THREE.MathUtils.damp(progressRef.current, targetRef.current, 3.4, Math.min(delta, 0.05));
  });
  return null;
}

export default function TheMonolith({ settings = {} }) {
  const sectionRef = useRef(null);
  const progressRef = useRef(0.18);
  const targetRef = useRef(0.18);
  const pulseRef = useRef(0);

  // React attaches its synthetic onWheel listener as passive, so calling preventDefault
  // from a JSX onWheel prop throws ("Unable to preventDefault inside passive event
  // listener invocation") and silently fails to stop the page from scrolling underneath —
  // a native listener with passive:false is the only way to actually block it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const handleWheel = (event) => {
      event.preventDefault();
      targetRef.current = THREE.MathUtils.clamp(targetRef.current + event.deltaY * 0.00075, 0, 1);
    };
    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, []);

  const awaken = () => {
    targetRef.current = 1;
    pulseRef.current = 1;
  };

  return (
    <section className="atmosphere monolith-experience" ref={sectionRef}>
      <Canvas className="monolith-experience__canvas" dpr={WEBGL_DPR} camera={{ fov: 42, near: 0.1, far: 80, position: [0, 0.5, 11] }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.outputColorSpace = THREE.SRGBColorSpace; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; }}>
        <color attach="background" args={["#000000"]} />
        <fogExp2 attach="fog" args={["#000000", 0.035]} />
        <ProgressDriver progressRef={progressRef} targetRef={targetRef} />
        <MonolithWorld settings={settings} progressRef={progressRef} pulseRef={pulseRef} />
      </Canvas>

      <div className="monolith-experience__copy">
        <p>26 — OLED study</p>
        <h1>The<br />Monolith.</h1>
        <span>Something sealed inside the dark has begun to answer.</span>
        <button type="button" onClick={awaken}>Break the seal<i>→</i></button>
      </div>
      <div className="monolith-experience__scroll"><i /><span>Scroll to open · reverse to seal</span></div>
    </section>
  );
}
