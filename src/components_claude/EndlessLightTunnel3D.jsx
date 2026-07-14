import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Physics, RigidBody, InstancedRigidBodies, CuboidCollider } from "@react-three/rapier";
import {
  BatchedRenderer, ParticleSystem, RenderMode, SphereEmitter,
  ApplyForce, ColorOverLife, ConstantValue, IntervalValue, ColorRange,
  Vector3 as QVector3, Vector4 as QVector4,
} from "three.quarks";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from "three-mesh-bvh";
import * as THREE from "three";
import CanvasStage, { useSpeed } from "./CanvasStage";
import { seeded } from "../utils/procedural";
import "./EndlessLightTunnel3D.css";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const FRAME_SPACING = 5.5;
const FLOOR_Y = -1.4;
const FLOOR_HALF = [8.5, 0.05, 62.5];
const RAIL_HALF = [0.08, 0.6, 62.5];
const RAIL_X = 6.15;
const TUNNEL_CENTER_Z = -48;
const DEBRIS_RECYCLE_Z = 12;
const DEBRIS_FAR_Z = -112;

function Sun({ onReady }) {
  return (
    <mesh ref={onReady} position={[0, 3.25, -150]}>
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshBasicMaterial color="#ffedc4" toneMapped={false} />
    </mesh>
  );
}

function useFrameGeometry() {
  return useMemo(() => {
    const outer = new THREE.Shape();
    outer.moveTo(-6.3, -4.1);
    outer.lineTo(6.3, -4.1);
    outer.lineTo(6.3, 4.1);
    outer.lineTo(-6.3, 4.1);
    outer.closePath();

    const opening = new THREE.Path();
    opening.moveTo(-5.95, -3.78);
    opening.lineTo(-5.95, 3.78);
    opening.lineTo(5.95, 3.78);
    opening.lineTo(5.95, -3.78);
    opening.closePath();
    outer.holes.push(opening);

    const geometry = new THREE.ExtrudeGeometry(outer, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    geometry.center();
    geometry.computeBoundsTree();
    return geometry;
  }, []);
}

function Frames({ count, accent, onFrameClick }) {
  const group = useRef();
  const geometry = useFrameGeometry();
  const speed = useSpeed();

  useFrame((_, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05) * speed * 7;
    group.current.children.forEach((frame) => {
      frame.position.z += step;
      if (frame.position.z > 10) frame.position.z -= count * FRAME_SPACING;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, index) => (
        <mesh
          key={index}
          geometry={geometry}
          position={[0, 2.75, 7 - index * FRAME_SPACING]}
          onClick={(event) => { event.stopPropagation(); onFrameClick(event.point); }}
        >
          <meshStandardMaterial
            color="#171007"
            emissive={accent}
            emissiveIntensity={2.8}
            metalness={0.92}
            roughness={0.22}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
}

function LightStreaks({ count, accent }) {
  const speed = useSpeed();

  const { renderer, system } = useMemo(() => {
    const tint = new THREE.Color(accent);
    const bright = new QVector4(tint.r, tint.g, tint.b, 0.95);
    const dim = new QVector4(tint.r, tint.g, tint.b, 0);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const particleSystem = new ParticleSystem({
      duration: 1,
      looping: true,
      startLife: new IntervalValue(1.1, 2),
      startSpeed: new IntervalValue(0.1, 0.6),
      startSize: new IntervalValue(0.045, 0.1),
      startColor: new ColorRange(bright, bright),
      emissionOverTime: new ConstantValue(count),
      shape: new SphereEmitter({ radius: 5.6, thickness: 1, arc: Math.PI * 2 }),
      material,
      renderMode: RenderMode.StretchedBillBoard,
      worldSpace: true,
    });
    particleSystem.addBehavior(new ApplyForce(new QVector3(0, 0, 1), new ConstantValue(24)));
    particleSystem.addBehavior(new ColorOverLife(new ColorRange(bright, dim)));

    const batchRenderer = new BatchedRenderer();
    batchRenderer.addSystem(particleSystem);
    particleSystem.emitter.position.set(0, 2.7, -118);

    return { renderer: batchRenderer, system: particleSystem };
  }, [count, accent]);

  useEffect(() => () => {
    system.dispose();
    renderer.deleteSystem(system);
  }, [renderer, system]);

  useFrame((_, delta) => {
    renderer.update(Math.min(delta, 0.05) * speed);
  });

  return <primitive object={renderer} />;
}

function ReflectiveCorridor({ accent }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.36, TUNNEL_CENTER_Z]}>
        <planeGeometry args={[17, 125]} />
        <MeshReflectorMaterial
          blur={[320, 110]}
          resolution={512}
          mixBlur={1.2}
          mixStrength={38}
          roughness={0.72}
          depthScale={1.1}
          color="#050301"
          metalness={0.72}
        />
      </mesh>
      {[-RAIL_X, RAIL_X].map((x) => (
        <mesh key={x} position={[x, -1.24, TUNNEL_CENTER_Z]}>
          <boxGeometry args={[0.045, 0.045, 125]} />
          <meshBasicMaterial color={accent} transparent opacity={0.72} toneMapped={false} />
        </mesh>
      ))}
      <pointLight color={accent} intensity={32} distance={48} position={[0, 2.8, -18]} />
    </>
  );
}

function buildDebrisInstances(count) {
  return Array.from({ length: count }, (_, index) => ({
    key: `debris-${index}`,
    position: [
      (seeded(index, 910) - 0.5) * 10.5,
      1.6 + seeded(index, 911) * 2.6,
      7 - seeded(index, 912) * 118,
    ],
    rotation: [seeded(index, 913) * Math.PI, seeded(index, 914) * Math.PI, seeded(index, 915) * Math.PI],
    linearVelocity: [
      (seeded(index, 916) - 0.5) * 0.6,
      -0.2 - seeded(index, 917) * 0.3,
      1.4 + seeded(index, 918) * 1.6,
    ],
  }));
}

function TunnelDebris({ count, accent, speed, shockwave }) {
  const bodiesRef = useRef([]);
  const lastShockwaveId = useRef(0);
  const instances = useMemo(() => buildDebrisInstances(count), [count]);

  useFrame(() => {
    const bodies = bodiesRef.current;
    if (!bodies) return;

    bodies.forEach((body) => {
      if (!body) return;
      const translation = body.translation();
      if (translation.z > DEBRIS_RECYCLE_Z) {
        body.setTranslation({ x: (Math.random() - 0.5) * 10.5, y: 1.6 + Math.random() * 2.6, z: DEBRIS_FAR_Z }, true);
        body.setLinvel({ x: (Math.random() - 0.5) * 0.6, y: -0.2 - Math.random() * 0.3, z: 1.4 + Math.random() * 1.6 }, true);
        body.setAngvel({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 }, true);
      }
    });

    if (shockwave && shockwave.id !== lastShockwaveId.current) {
      lastShockwaveId.current = shockwave.id;
      bodies.forEach((body) => {
        if (!body) return;
        const translation = body.translation();
        const dx = translation.x - shockwave.point.x;
        const dy = translation.y - shockwave.point.y;
        const dz = translation.z - shockwave.point.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 36) {
          const dist = Math.max(0.4, Math.sqrt(distSq));
          const force = (1 - dist / 6) * 5.5;
          body.applyImpulse({ x: (dx / dist) * force, y: (dy / dist) * force + 1.2, z: (dz / dist) * force }, true);
        }
      });
    }
  });

  return (
    <Physics gravity={[0, -1.6, 0]} paused={speed === 0}>
      <RigidBody type="fixed" position={[0, FLOOR_Y, TUNNEL_CENTER_Z]} colliders={false}>
        <CuboidCollider args={FLOOR_HALF} friction={0.6} restitution={0.35} />
      </RigidBody>
      <RigidBody type="fixed" position={[-RAIL_X, -0.8, TUNNEL_CENTER_Z]} colliders={false}>
        <CuboidCollider args={RAIL_HALF} friction={0.4} restitution={0.55} />
      </RigidBody>
      <RigidBody type="fixed" position={[RAIL_X, -0.8, TUNNEL_CENTER_Z]} colliders={false}>
        <CuboidCollider args={RAIL_HALF} friction={0.4} restitution={0.55} />
      </RigidBody>
      <InstancedRigidBodies ref={bodiesRef} instances={instances} colliders="hull" restitution={0.4} friction={0.5}>
        <instancedMesh args={[undefined, undefined, instances.length]} count={instances.length}>
          <icosahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#454c5c" metalness={0.7} roughness={0.4} emissive={accent} emissiveIntensity={0.25} />
        </instancedMesh>
      </InstancedRigidBodies>
    </Physics>
  );
}

function TunnelScene({ settings, onSunReady }) {
  const speed = useSpeed();
  const frameCount = Math.max(24, Math.min(64, settings.frames ?? 56));
  const streakCount = Math.max(40, Math.min(140, settings.dust ?? 120));
  const debrisCount = Math.max(8, Math.min(36, settings.debris ?? 20));
  const [shockwave, setShockwave] = useState(null);
  const shockwaveId = useRef(0);

  const handleFrameClick = (point) => {
    shockwaveId.current += 1;
    setShockwave({ id: shockwaveId.current, point: point.clone() });
  };

  return (
    <group>
      <Sun onReady={onSunReady} />
      <ReflectiveCorridor accent="#e8c17a" />
      <Frames count={frameCount} accent="#e8c17a" onFrameClick={handleFrameClick} />
      <LightStreaks count={streakCount} accent="#ffd99c" />
      <TunnelDebris count={debrisCount} accent="#ffd99c" speed={speed} shockwave={shockwave} />
    </group>
  );
}

export default function EndlessLightTunnel3D({ settings = {} }) {
  const [sun, setSun] = useState(null);
  return (
    <section className="atmosphere endless-light-tunnel-3d">
      <CanvasStage
        camera={{ position: [0, 2.6, 10], fov: 56 }}
        orbitEnabled
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.55, threshold: 0.38 }}
        vignette={{ darkness: 0.96 }}
        extraEffects={sun ? (
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            samples={45}
            density={0.75}
            decay={0.91}
            weight={0.24}
            exposure={0.3}
            clampMax={0.85}
            kernelSize={KernelSize.SMALL}
            blur
          />
        ) : null}
      >
        <ambientLight intensity={0.08} />
        <TunnelScene settings={settings} onSunReady={setSun} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>Claude — Architecture at velocity, now with real physics</p>
        <h1>One corridor.<br />No ending.</h1>
        <span>Beveled luminous frames rush past a mirrored floor while GPU-batched light streaks tear toward you. Click a frame to send physically simulated debris scattering off the rails.</span>
      </div>
    </section>
  );
}
