import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Edges,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import {
  BatchedRenderer,
  Bezier,
  ConstantColor,
  ConstantValue,
  IntervalValue,
  ParticleSystem,
  PiecewiseBezier,
  RenderMode,
  SizeOverLife,
  SphereEmitter,
} from "three.quarks";
import * as THREE from "three";
import { WEBGL_DPR, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import AnimationReadout from "./AnimationReadout";
import "./PrismPulse.css";

const DICE = ["D4", "D6", "D8", "D12", "D20"];
const SPECTRUM = ["#ff365f", "#ff8e3a", "#ffe86a", "#63f6ad", "#53c9ff", "#a978ff"];

// The whole rig (die, light beam, spectral fan, motes, reflective bench) is built around
// one shared x anchor, offset right of center on desktop to clear the left-anchored text
// copy. Below the 900px breakpoint (matching PrismPulse.css) the copy moves to the bottom
// and no longer competes for horizontal space, so the rig should sit centered instead —
// otherwise it stays pinned off to the right for no reason on phones.
function useDieX() {
  return useMemo(() => (window.matchMedia("(max-width: 900px)").matches ? 0 : 2.8), []);
}

function DieGeometry({ die }) {
  const d6 = useMemo(() => {
    const geometry = new THREE.BoxGeometry(3.05, 3.05, 3.05);
    // MeshRefractionMaterial accepts a single BVH root. BoxGeometry creates
    // one group per face, which three-mesh-bvh promotes to multiple roots.
    geometry.clearGroups();
    return geometry;
  }, []);
  useEffect(() => () => d6.dispose(), [d6]);

  if (die === "D4") return <tetrahedronGeometry args={[2.2, 0]} />;
  if (die === "D6") return <primitive object={d6} attach="geometry" />;
  if (die === "D8") return <octahedronGeometry args={[2.35, 0]} />;
  if (die === "D12") return <dodecahedronGeometry args={[1.92, 0]} />;
  return <icosahedronGeometry args={[2.05, 0]} />;
}

function ProceduralEnvironment({ onReady }) {
  const scene = useThree((state) => state.scene);
  const delivered = useRef(null);

  useFrame(() => {
    if (scene.environment && delivered.current !== scene.environment) {
      delivered.current = scene.environment;
      onReady(scene.environment);
    }
  });

  return (
    <Environment resolution={256} frames={1} environmentIntensity={1.35}>
      <Lightformer intensity={5.5} color="#fff8e9" position={[-6, 4, 3]} scale={[3, 9, 1]} />
      <Lightformer intensity={3.2} color="#65d9ff" position={[5, -1, 2]} scale={[4, 5, 1]} />
      <Lightformer intensity={3.8} color="#ff5f9e" position={[1, 5, -5]} scale={[7, 2, 1]} />
      <Lightformer intensity={2.4} color="#9b76ff" position={[-2, -5, -2]} scale={[5, 3, 1]} />
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[24, 18]} />
        <meshBasicMaterial color="#02030a" />
      </mesh>
    </Environment>
  );
}

function PhotonMotes({ count, speed, dieX }) {
  const setup = useMemo(() => {
    const batch = new BatchedRenderer();
    const material = new THREE.MeshBasicMaterial({
      color: "#d9f8ff",
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const system = new ParticleSystem({
      duration: 4,
      looping: true,
      worldSpace: true,
      shape: new SphereEmitter({ radius: 2.8, thickness: 0.72 }),
      startLife: new IntervalValue(1.2, 3.2),
      startSpeed: new IntervalValue(0.06, 0.42),
      startSize: new IntervalValue(0.025, 0.1),
      startColor: new ConstantColor(new THREE.Vector4(0.62, 0.9, 1, 0.9)),
      emissionOverTime: new ConstantValue(count),
      renderMode: RenderMode.BillBoard,
      material,
      behaviors: [
        new SizeOverLife(new PiecewiseBezier([[new Bezier(0, 1, 0.7, 0), 0]])),
      ],
    });
    system.emitter.position.set(dieX, 0.45, 0);
    batch.addSystem(system);
    system.play();
    return { batch, material, system };
  }, [count, dieX]);

  useFrame((_, delta) => setup.batch.update(Math.min(delta, 0.05) * speed));
  useEffect(() => () => {
    setup.batch.deleteSystem(setup.system);
    setup.system.dispose();
    setup.material.dispose();
  }, [setup]);

  return (
    <>
      <primitive object={setup.system.emitter} />
      <primitive object={setup.batch} />
    </>
  );
}

function IncidentLight({ strength, dieX }) {
  const light = useRef();
  const target = useRef();
  const source = useMemo(() => new THREE.Vector3(-9, 4.2, 4.4), []);
  const destination = useMemo(() => new THREE.Vector3(dieX, 0.45, 0), [dieX]);
  const beam = useMemo(() => {
    const direction = destination.clone().sub(source);
    const midpoint = source.clone().add(destination).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
    return { length: direction.length(), midpoint, quaternion };
  }, [destination, source]);

  useEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);

  return (
    <group>
      <object3D ref={target} position={destination} />
      <spotLight
        ref={light}
        position={source}
        color="#fff7de"
        intensity={38 * strength}
        distance={34}
        angle={0.24}
        penumbra={0.72}
        decay={1.55}
      />
      <mesh position={beam.midpoint} quaternion={beam.quaternion} renderOrder={-2}>
        <cylinderGeometry args={[0.12, 1.15, beam.length, 32, 1, true]} />
        <meshBasicMaterial
          color="#dff8ff"
          transparent
          opacity={0.065 * strength}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={beam.midpoint} quaternion={beam.quaternion} renderOrder={-1}>
        <cylinderGeometry args={[0.025, 0.16, beam.length, 16, 1, true]} />
        <meshBasicMaterial color="#fffef5" transparent opacity={0.32 * strength} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SpectralFan({ body, dispersion, dieX }) {
  const group = useRef();

  useFrame(() => {
    if (!body.current || !group.current) return;
    const rotation = body.current.rotation();
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, rotation.z * 0.65 + rotation.x * 0.18, 4, 1 / 60);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, rotation.y * 0.12, 4, 1 / 60);
    const energy = 0.72 + Math.abs(rotation.y) * 0.28;
    group.current.children.forEach((ray, index) => {
      ray.material.opacity = (0.08 + index * 0.008) * dispersion * energy;
    });
  });

  return (
    <group ref={group} position={[dieX, 0.45, -0.15]}>
      {SPECTRUM.map((color, index) => (
        <mesh key={color} position={[5.6, (index - 2.5) * 0.32, index * -0.035]} rotation={[0, 0, (index - 2.5) * 0.035]}>
          <planeGeometry args={[11.2, 0.22 + index * 0.012]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function CrystalRig({ die, envMap, dispersion, speed, onDraggingChange, dieX }) {
  const body = useRef();
  const drag = useRef(null);
  const initialized = useRef(false);

  useFrame(() => {
    if (!body.current || initialized.current) return;
    body.current.setAngvel({ x: 0.025 * speed, y: 0.09 * speed, z: 0.015 * speed }, true);
    initialized.current = true;
  });

  useEffect(() => { initialized.current = false; }, [die]);

  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  const beginDrag = (event) => {
    event.stopPropagation();
    event.target.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, moved: false };
    body.current?.setAngvel({ x: 0, y: 0, z: 0 }, true);
    document.body.style.cursor = "grabbing";
    onDraggingChange(true);
  };

  const moveDrag = (event) => {
    if (!drag.current || !body.current) return;
    event.stopPropagation();
    const deltaX = event.clientX - drag.current.x;
    const deltaY = event.clientY - drag.current.y;
    drag.current = { x: event.clientX, y: event.clientY, moved: drag.current.moved || Math.abs(deltaX) + Math.abs(deltaY) > 1 };
    body.current.setAngvel({
      x: THREE.MathUtils.clamp(deltaY * 0.035, -2.4, 2.4),
      y: THREE.MathUtils.clamp(deltaX * 0.035, -2.4, 2.4),
      z: THREE.MathUtils.clamp((deltaX - deltaY) * 0.006, -0.65, 0.65),
    }, true);
  };

  const endDrag = (event) => {
    if (!drag.current) return;
    drag.current = null;
    try { event.target.releasePointerCapture(event.pointerId); } catch { /* Pointer capture may already be released. */ }
    document.body.style.cursor = "grab";
    onDraggingChange(false);
  };

  return (
    <>
      <SpectralFan body={body} dispersion={dispersion} dieX={dieX} />
      <RigidBody
        ref={body}
        key={die}
        position={[dieX, 0.45, 0]}
        rotation={[0.42, -0.58, 0.18]}
        colliders={false}
        gravityScale={0}
        linearDamping={8}
        angularDamping={0.55}
        enabledTranslations={[false, false, false]}
      >
        <BallCollider args={[1.45]} sensor />
        <mesh
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerOver={() => { if (!drag.current) document.body.style.cursor = "grab"; }}
          onPointerOut={() => { if (!drag.current) document.body.style.cursor = ""; }}
        >
          <DieGeometry die={die} />
          <MeshRefractionMaterial
            envMap={envMap}
            bounces={8}
            ior={1.45}
            fresnel={0.42}
            aberrationStrength={0.028 + dispersion * 0.072}
            fastChroma={false}
            color="#d9f8ff"
            transparent
            opacity={0.76}
            toneMapped={false}
          />
          <Edges scale={1.002} threshold={8} color="#d9f8ff" />
        </mesh>
        <mesh scale={0.35}>
          <DieGeometry die={die} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <pointLight color="#bcecff" intensity={8 + dispersion * 14} distance={8} />
      </RigidBody>
    </>
  );
}

function OpticalBench({ dieX }) {
  return (
    <group>
      <mesh position={[dieX, -2.55, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[31, 22]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[280, 90]}
          mixBlur={1.2}
          mixStrength={16}
          roughness={0.72}
          depthScale={0.45}
          color="#020309"
          metalness={0.48}
        />
      </mesh>
      {[3.6, 4.8, 6.2].map((radius, index) => (
        <mesh key={radius} position={[dieX, 0.45, -2.6]} rotation={[0, 0, index * 0.45]}>
          <torusGeometry args={[radius, 0.012, 5, 160]} />
          <meshBasicMaterial color={index === 1 ? "#ff6f91" : "#75dfff"} transparent opacity={0.13 - index * 0.025} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function PrismScene({ settings, onDraggingChange }) {
  const [envMap, setEnvMap] = useState(null);
  const dieIndex = THREE.MathUtils.clamp(Math.round(settings.die ?? 2), 0, DICE.length - 1);
  const die = DICE[dieIndex];
  const dispersion = THREE.MathUtils.clamp((settings.dispersion ?? 68) / 100, 0, 1);
  const light = THREE.MathUtils.clamp((settings.light ?? 76) / 100, 0.2, 1);
  const speed = settings.speed ?? 1;
  const dieX = useDieX();

  return (
    <>
      <color attach="background" args={["#010208"]} />
      <fogExp2 attach="fog" args={["#010208", 0.028]} />
      <ProceduralEnvironment onReady={setEnvMap} />
      <ambientLight intensity={0.08} />
      <IncidentLight strength={light} dieX={dieX} />
      <OpticalBench dieX={dieX} />
      <PhotonMotes count={Math.round(settings.motes ?? 44)} speed={speed} dieX={dieX} />
      {envMap && (
        <Physics gravity={[0, 0, 0]} timeStep={1 / 60} interpolate>
          <CrystalRig
            die={die}
            envMap={envMap}
            dispersion={dispersion}
            speed={speed}
            onDraggingChange={onDraggingChange}
            dieX={dieX}
          />
        </Physics>
      )}
      <EffectComposer multisampling={WEBGL_MSAA_SAMPLES}>
        <Bloom mipmapBlur intensity={0.95 + light * 0.6} luminanceThreshold={0.32} luminanceSmoothing={0.5} />
        <SMAA />
      </EffectComposer>
      <AdaptiveDpr />
    </>
  );
}

export default function PrismPulse({ settings = {} }) {
  const [dragging, setDragging] = useState(false);
  const die = DICE[THREE.MathUtils.clamp(Math.round(settings.die ?? 2), 0, DICE.length - 1)];
  const motes = Math.round(settings.motes ?? 44);
  const dispersion = Math.round(THREE.MathUtils.clamp((settings.dispersion ?? 68) / 100, 0, 1) * 100);

  return (
    <section className={`atmosphere prism-pulse-lab ${dragging ? "is-dragging" : ""}`} style={{ "--experiment-accent": "#77dcff" }}>
      <Canvas
        className="prism-pulse-lab__canvas"
        dpr={WEBGL_DPR}
        camera={{ position: [0, 0.75, 9.4], fov: 43, near: 0.1, far: 90 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        <Suspense fallback={null}>
          <PrismScene settings={settings} onDraggingChange={setDragging} />
        </Suspense>
      </Canvas>

      <div className="prism-pulse-lab__veil" />
      <div className="experiment-copy">
        <p>12 — Refractive geometry / {die}</p>
        <h1>Hold the<br />light itself.</h1>
        <span>A multi-bounce crystal die catches an off-camera beam, splitting the room into spectral paths. Drag the die and watch the light answer.</span>
      </div>
      <div className="prism-pulse-lab__hint" aria-hidden="true">
        <i />
        <span>{dragging ? "Release to carry the momentum" : "Drag the crystal to turn it"}</span>
      </div>
      <AnimationReadout
        eyebrow="Refractive optics"
        value={`${motes} PHOTON MOTES`}
        stats={[{ value: die, label: "Geometry" }, { value: `${dispersion}%`, label: "Dispersion" }]}
      />
    </section>
  );
}
