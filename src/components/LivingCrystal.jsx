import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import {
  clamp, color, dot, mix, oneMinus, pow, positionLocal, normalView, positionViewDirection, uniform, uv, mx_fractal_noise_float,
} from "three/tsl";
import { getProject } from "@theatre/core";
import { seeded } from "../utils/procedural";
import useDragOrbit from "../hooks/useDragOrbit";
import AnimationReadout from "./AnimationReadout";
import "./LivingCrystal.css";

const theatreProject = getProject("Living Crystal");
const growthSheet = theatreProject.sheet("Growth");
const tuning = growthSheet.object("Tuning", {
  cameraStartDistance: 6.4,
  cameraEndDistance: 9.3,
  awakeningStart: 13.5,
  awakeningEnd: 18,
  idleFractureMinGap: 14,
  idleFractureMaxGap: 26,
});

const MAX_BRANCHES = 48;
const dummy = new THREE.Object3D();

// Branches are grouped by generation into three color zones (cool core, purple
// mid-forks, warm gold tips) — real mineral banding rather than a single flat
// gradient, and it's what a shared instancedMesh-per-material can render safely.
function groupOf(depth) {
  if (depth <= 1) return 0;
  if (depth === 2) return 1;
  return 2;
}

function buildBranches(density) {
  const branches = [];
  const total = Math.min(MAX_BRANCHES, 12 + Math.round(density * 1.8));

  // The hero shard establishes the tall, architectural silhouette. Everything
  // else grows from the mineral bed around it instead of resembling tree limbs.
  branches.push({
    id: 0, parentId: -1, depth: 0, attachT: 0,
    dir: new THREE.Vector3(-0.035, 1, 0.018).normalize(), length: 4.15, baseRadius: 0.72,
    basePos: new THREE.Vector3(0.25, -0.68, -0.15), stageStart: 0, stageDuration: 7.2,
  });

  for (let i = 1; i < total; i += 1) {
    const id = branches.length;
    const tier = i < 8 ? 1 : i < 22 ? 2 : 3;
    const azimuth = i * 2.399963 + seeded(i, 901) * 0.42;
    const elevation = THREE.MathUtils.degToRad(
      tier === 1 ? 53 + seeded(i, 902) * 25 : tier === 2 ? 34 + seeded(i, 902) * 32 : 18 + seeded(i, 902) * 32,
    );
    const dir = new THREE.Vector3(
      Math.cos(azimuth) * Math.cos(elevation),
      Math.sin(elevation),
      Math.sin(azimuth) * Math.cos(elevation),
    ).normalize();
    const radial = tier === 1 ? 0.28 + seeded(i, 903) * 0.34 : tier === 2 ? 0.72 + seeded(i, 903) * 0.68 : 1.25 + seeded(i, 903) * 1.05;
    const length = tier === 1 ? 2.25 + seeded(i, 904) * 1.55 : tier === 2 ? 1.15 + seeded(i, 904) * 1.45 : 0.55 + seeded(i, 904) * 0.9;
    const baseRadius = tier === 1 ? 0.28 + seeded(i, 905) * 0.22 : tier === 2 ? 0.15 + seeded(i, 905) * 0.16 : 0.08 + seeded(i, 905) * 0.11;
    branches.push({
      id, parentId: 0, depth: tier, attachT: 0, dir, length, baseRadius,
      basePos: new THREE.Vector3(Math.cos(azimuth) * radial, -0.68 + seeded(i, 906) * 0.16, Math.sin(azimuth) * radial),
      stageStart: 3.5 + tier * 2.8 + (i / total) * 15.5,
      stageDuration: 3.4 + seeded(i, 907) * 2.8,
    });
  }

  const groupCounters = [0, 0, 0];
  branches.forEach((b) => {
    b.originalDir = b.dir.clone();
    b.renderDir = b.dir.clone();
    b.groupIndex = groupOf(b.depth);
    b.localIndex = groupCounters[b.groupIndex];
    groupCounters[b.groupIndex] += 1;
  });

  return { branches, groupCounts: groupCounters };
}

// Re-rolls a branch's shape/position each time it respawns into a new generation, using the
// same tier-based distribution as the initial layout so "baby" facets stay visually
// consistent with their role (small tips stay smallish, major limbs stay major) while still
// looking like a fresh, slightly different growth each life. The hero shard (depth 0) keeps
// its fixed silhouette — it's the permanent core the rest of the crystal grows around.
function randomizeBranchShape(branch, generation) {
  if (branch.depth === 0) return;
  const salt = 4000 + generation * 41;
  const i = branch.id;
  const tier = branch.depth;
  const azimuth = i * 2.399963 + seeded(i, salt + 1) * Math.PI * 2;
  const elevation = THREE.MathUtils.degToRad(
    tier === 1 ? 53 + seeded(i, salt + 2) * 25 : tier === 2 ? 34 + seeded(i, salt + 2) * 32 : 18 + seeded(i, salt + 2) * 32,
  );
  const dir = new THREE.Vector3(
    Math.cos(azimuth) * Math.cos(elevation),
    Math.sin(elevation),
    Math.sin(azimuth) * Math.cos(elevation),
  ).normalize();
  const radial = tier === 1 ? 0.28 + seeded(i, salt + 3) * 0.34 : tier === 2 ? 0.72 + seeded(i, salt + 3) * 0.68 : 1.25 + seeded(i, salt + 3) * 1.05;
  const length = tier === 1 ? 2.25 + seeded(i, salt + 4) * 1.55 : tier === 2 ? 1.15 + seeded(i, salt + 4) * 1.45 : 0.55 + seeded(i, salt + 4) * 0.9;
  const baseRadius = tier === 1 ? 0.28 + seeded(i, salt + 5) * 0.22 : tier === 2 ? 0.15 + seeded(i, salt + 5) * 0.16 : 0.08 + seeded(i, salt + 5) * 0.11;
  branch.originalDir.copy(dir);
  branch.renderDir.copy(dir);
  branch.length = length;
  branch.baseRadius = baseRadius;
  branch.basePos.set(Math.cos(azimuth) * radial, -0.68 + seeded(i, salt + 6) * 0.16, Math.sin(azimuth) * radial);
}

// Grow/breathe/dormant durations for one life of a facet. Tier 1 branches live long, full
// lives; tier 3 tips are quick "babies" that cycle rapidly. fractureRateMul (0-1, from the
// Fracture frequency slider) shortens breathe time — more frequent dying/respawning — and
// growthSpeedMul speeds up the grow phase itself.
function phaseDurationsFor(tier, growthSpeedMul = 1, fractureRateMul = 0.5) {
  const breatheRange = tier === 1 ? [11, 20] : tier === 2 ? [7, 14] : [4, 9];
  const dormantRange = tier === 1 ? [1.4, 3] : tier === 2 ? [0.9, 2.2] : [0.5, 1.5];
  const growRange = tier === 1 ? [3.2, 5.4] : tier === 2 ? [2, 3.6] : [1.1, 2.3];
  const breathe = THREE.MathUtils.lerp(breatheRange[1], breatheRange[0], fractureRateMul);
  return {
    grow: THREE.MathUtils.lerp(growRange[0], growRange[1], Math.random()) / growthSpeedMul,
    breathe,
    dormant: THREE.MathUtils.lerp(dormantRange[0], dormantRange[1], Math.random()),
  };
}

function useSharedCrystalUniforms() {
  return useMemo(() => ({
    pulseTime: uniform(-10),
    timeUniform: uniform(0),
    awakening: uniform(0),
  }), []);
}

function useCrystalMaterial(deepHex, hotHex, shared) {
  return useMemo(() => {
    const { pulseTime, timeUniform, awakening } = shared;

    const material = new THREE.MeshPhysicalNodeMaterial({
      color: new THREE.Color(deepHex),
      transmission: 0.94,
      thickness: 1.4,
      ior: 1.78,
      roughness: 0.075,
      metalness: 0,
      iridescence: 1,
      iridescenceIOR: 1.48,
      dispersion: 0.42,
      attenuationDistance: 1.8,
      attenuationColor: new THREE.Color(deepHex),
      side: THREE.DoubleSide,
      transparent: true,
    });
    material.iridescenceThicknessRange = [120, 720];

    const tipGlow = positionLocal.y;
    const fresnel = pow(oneMinus(clamp(dot(normalView, positionViewDirection), 0, 1)), 2.4);
    const pulseAge = timeUniform.sub(pulseTime);
    const pulseGlow = clamp(oneMinus(pulseAge.mul(0.7)), 0, 1);
    const veinNoise = mx_fractal_noise_float(uv().mul(13), 4, 2.35, 0.58, 1);
    const veins = pow(clamp(veinNoise.mul(0.5).add(0.5), 0, 1), 4.2);

    const energy = clamp(
      awakening.mul(tipGlow).mul(0.8)
        .add(pulseGlow.mul(0.7))
        .add(fresnel.mul(0.58))
        .add(veins.mul(awakening).mul(0.82)),
      0, 1,
    );

    material.colorNode = mix(color(deepHex), color(hotHex), energy);
    material.emissiveNode = color(hotHex).mul(energy).mul(energy).mul(2.25)
      .add(color(hotHex).mul(veins).mul(awakening).mul(1.15));

    return material;
  }, [deepHex, hotHex, shared]);
}

function useDustPool(count) {
  const meshRef = useRef();
  const motesRef = useRef([]);

  useEffect(() => {
    motesRef.current = Array.from({ length: count }, (_, index) => ({
      mode: "ambient",
      x: (seeded(index, 1101) - 0.5) * 1.8,
      y: seeded(index, 1102) * 1.8,
      z: (seeded(index, 1103) - 0.5) * 1.8,
      phase: seeded(index, 1104) * Math.PI * 2,
      speed: 0.15 + seeded(index, 1105) * 0.3,
      vx: 0, vy: 0, vz: 0,
      age: 999,
    }));
  }, [count]);

  const spawnBurst = (origin, amount) => {
    const motes = motesRef.current;
    for (let i = 0; i < amount && motes.length; i += 1) {
      const mote = motes[Math.floor(Math.random() * motes.length)];
      mote.mode = "debris";
      mote.x = origin.x; mote.y = origin.y; mote.z = origin.z;
      mote.vx = (Math.random() - 0.5) * 1.6;
      mote.vy = Math.random() * 1.4 + 0.3;
      mote.vz = (Math.random() - 0.5) * 1.6;
      mote.age = 0;
    }
  };

  useFrame((state, rawDelta) => {
    if (!meshRef.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    motesRef.current.forEach((mote, index) => {
      if (mote.mode === "debris") {
        mote.age += delta;
        mote.vy -= delta * 1.6;
        mote.x += mote.vx * delta;
        mote.y += mote.vy * delta;
        mote.z += mote.vz * delta;
        const life = Math.min(1, mote.age / 1.4);
        dummy.position.set(mote.x, mote.y, mote.z);
        dummy.scale.setScalar((1 - life) * 0.05);
        if (mote.age > 1.4) mote.mode = "ambient";
      } else {
        const bob = Math.sin(t * mote.speed + mote.phase) * 0.4;
        dummy.position.set(mote.x, mote.y + bob * 0.15 + 0.5, mote.z);
        dummy.scale.setScalar(0.007);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return { meshRef, spawnBurst, count };
}

function CrystalFragments({ material, count = 72 }) {
  const meshRef = useRef();
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.025, 0.65, 1, 5, 1, false);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);
  const fragments = useMemo(() => Array.from({ length: count }, (_, index) => {
    const angle = index * 2.399963 + seeded(index, 1201) * 0.7;
    const radius = 1.1 + seeded(index, 1202) * 3.25;
    return {
      position: new THREE.Vector3(Math.cos(angle) * radius, -0.72 + seeded(index, 1203) * 0.3, Math.sin(angle) * radius),
      direction: new THREE.Vector3(Math.cos(angle) * (0.35 + seeded(index, 1204) * 0.7), 0.28 + seeded(index, 1205) * 0.85, Math.sin(angle) * (0.35 + seeded(index, 1204) * 0.7)).normalize(),
      length: 0.12 + seeded(index, 1206) * 0.68,
      width: 0.025 + seeded(index, 1207) * 0.09,
      reveal: 0.28 + (index / count) * 0.69,
      phase: seeded(index, 1208) * Math.PI * 2,
      floating: index % 4 === 0,
    };
  }), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Ambient debris around the crystal fades in over its first ~12s alongside the initial
    // awakening — independent of any single branch's lifecycle, since these are scenery.
    const revealClock = Math.min(1, state.clock.elapsedTime / 12);
    fragments.forEach((fragment, index) => {
      const reveal = THREE.MathUtils.smoothstep(revealClock, fragment.reveal - 0.08, fragment.reveal + 0.08);
      const hover = fragment.floating ? Math.sin(state.clock.elapsedTime * 0.55 + fragment.phase) * 0.16 * reveal : 0;
      dummy.position.copy(fragment.position);
      dummy.position.y += hover;
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fragment.direction);
      dummy.scale.set(fragment.width * reveal, fragment.length * reveal, fragment.width * reveal);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />;
}

function CrystalScene({ settings, speedRef, onStats }) {
  const { camera, pointer, gl } = useThree();
  const branchDensity = settings.branchDensity ?? 12;
  const energyIntensity = (settings.energyIntensity ?? 100) / 100;
  const fractureRateMul = (settings.fractureRate ?? 50) / 100;
  const growthSpeedMul = settings.growthSpeed ?? 1;
  const dustCount = Math.max(10, Math.min(100, settings.dustAmount ?? 35));

  const { branches, groupCounts } = useMemo(() => buildBranches(branchDensity), [branchDensity]);
  const sharedUniforms = useSharedCrystalUniforms();
  const materialCyan = useCrystalMaterial("#0d2438", "#9beeff", sharedUniforms);
  const materialPurple = useCrystalMaterial("#2a1442", "#e8c8ff", sharedUniforms);
  const materialGold = useCrystalMaterial("#3a2408", "#ffdf9c", sharedUniforms);
  const materials = [materialCyan, materialPurple, materialGold];
  const { pulseTime, timeUniform, awakening } = sharedUniforms;
  const dust = useDustPool(dustCount);

  const meshRefs = useRef([null, null, null]);
  const stateRef = useRef(new Map());
  const cyclesRef = useRef(0);
  // Click/tap-drag to orbit, exactly like the other pieces — no more passive hover-parallax.
  const dragRef = useDragOrbit({ pitchMin: -0.5, pitchMax: 0.55 });
  const fpsRef = useRef({ frames: 0, time: 0 });

  const shardGeometry = useMemo(() => {
    const vertices = [];
    for (let side = 0; side < 6; side += 1) {
      const a = (side / 6) * Math.PI * 2;
      const b = ((side + 1) / 6) * Math.PI * 2;
      const bottomA = [Math.cos(a), 0, Math.sin(a)];
      const bottomB = [Math.cos(b), 0, Math.sin(b)];
      const shoulderA = [Math.cos(a) * 0.86, 0.76, Math.sin(a) * 0.86];
      const shoulderB = [Math.cos(b) * 0.86, 0.76, Math.sin(b) * 0.86];
      vertices.push(...bottomA, ...bottomB, ...shoulderB, ...bottomA, ...shoulderB, ...shoulderA);
      vertices.push(...shoulderA, ...shoulderB, 0, 1, 0);
      vertices.push(0, 0, 0, ...bottomB, ...bottomA);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    const triCount = shardGeometry.index ? shardGeometry.index.count / 3 : shardGeometry.attributes.position.count / 3;
    const backendName = gl?.backend?.constructor?.name ?? "";
    onStats({
      gpu: backendName.includes("WebGPU") ? "WebGPU" : "WebGL2",
      crystals: branches.length,
      particles: dustCount + 72,
      triangles: Math.round((branches.length + 72) * triCount + dustCount * 24),
    });
  }, [branches.length, dustCount, gl, onStats, shardGeometry]);

  // Each branch runs its own independent lifecycle: growing -> breathing -> dying -> dormant
  // -> (respawns as a new generation, back to growing). Generation 0 uses the hand-placed
  // stageStart/stageDuration from buildBranches for a nice staggered first bloom (hero shard
  // first, then tiers rippling outward); every life after that gets fresh tier-appropriate
  // timings from phaseDurationsFor. The hero shard (depth 0) never dies — it's the permanent
  // core the rest of the crystal grows around.
  useEffect(() => {
    branches.forEach((b) => {
      const rolled = phaseDurationsFor(b.depth, growthSpeedMul, fractureRateMul);
      stateRef.current.set(b.id, {
        phase: "growing",
        phaseStart: b.stageStart,
        scale: 0,
        generation: 0,
        nudged: false,
        durations: { grow: b.stageDuration, breathe: rolled.breathe, dormant: rolled.dormant },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches]);

  const triggerDeath = (branch, entry, now) => {
    entry.phase = "dying";
    entry.phaseStart = now;
    const tip = branch.basePos.clone().addScaledVector(branch.renderDir, branch.length);
    dust.spawnBurst(tip, 16);
  };

  useFrame((state, rawDelta) => {
    const realTime = state.clock.elapsedTime * speedRef.current;
    timeUniform.value = realTime;

    // The crystal's inner energy/veins glow wakes up gradually over the first ~15-18s after
    // load, independent of any single branch's lifecycle — the scene itself is "growing".
    const awakeningT = clampNumber(
      (realTime - tuning.value.awakeningStart) / (tuning.value.awakeningEnd - tuning.value.awakeningStart),
      0, 1,
    );
    awakening.value = (0.25 + 0.75 * awakeningT) * energyIntensity;

    let maxMatureDepth = 0;
    let aliveCount = 0;
    branches.forEach((b) => {
      const entry = stateRef.current.get(b.id);
      if (!entry) return;
      const elapsedInPhase = realTime - entry.phaseStart;

      if (entry.phase === "growing") {
        const t = clampNumber(elapsedInPhase / Math.max(0.001, entry.durations.grow), 0, 1);
        entry.scale = t * t * (3 - 2 * t);
        if (!entry.nudged && t > 0.02) {
          entry.nudged = true;
          const yaw = pointer.x * 0.6;
          const pitch = pointer.y * 0.4;
          const cursorDir = new THREE.Vector3(Math.sin(yaw), 0.3 + pitch, Math.cos(yaw)).normalize();
          b.renderDir.copy(b.originalDir).lerp(cursorDir, 0.22).normalize();
        }
        if (t >= 1) {
          entry.phase = "breathing";
          entry.phaseStart = realTime;
          entry.scale = 1;
          pulseTime.value = realTime;
        }
        aliveCount += 1;
      } else if (entry.phase === "breathing") {
        const breathe = Math.sin(realTime * 0.9 + b.id * 0.73) * 0.035 + Math.sin(realTime * 0.31 + b.id) * 0.018;
        entry.scale = 1 + breathe;
        aliveCount += 1;
        if (b.depth !== 0 && elapsedInPhase >= entry.durations.breathe) {
          triggerDeath(b, entry, realTime);
        }
      } else if (entry.phase === "dying") {
        const dieDuration = 0.55;
        const t = clampNumber(elapsedInPhase / dieDuration, 0, 1);
        const pop = Math.sin(t * Math.PI) * 0.22 * (1 - t);
        entry.scale = Math.max(0, (1 - t) + pop);
        if (t >= 1) {
          entry.phase = "dormant";
          entry.phaseStart = realTime;
          entry.scale = 0;
        }
      } else {
        entry.scale = 0;
        if (elapsedInPhase >= entry.durations.dormant) {
          entry.generation += 1;
          cyclesRef.current += 1;
          randomizeBranchShape(b, entry.generation);
          entry.durations = phaseDurationsFor(b.depth, growthSpeedMul, fractureRateMul);
          entry.phase = "growing";
          entry.phaseStart = realTime;
          entry.scale = 0;
          entry.nudged = false;
        }
      }

      if (entry.scale > 0.02 && b.depth <= 2) {
        maxMatureDepth = Math.max(maxMatureDepth, b.depth + Math.min(1, entry.scale));
      }

      dummy.position.copy(b.basePos);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.renderDir);
      dummy.scale.set(b.baseRadius * entry.scale, Math.max(0.0005, b.length * entry.scale), b.baseRadius * entry.scale);
      dummy.updateMatrix();
      const meshEl = meshRefs.current[b.groupIndex];
      if (meshEl) meshEl.setMatrixAt(b.localIndex, dummy.matrix);
    });
    meshRefs.current.forEach((el) => { if (el) el.instanceMatrix.needsUpdate = true; });

    fpsRef.current.frames += 1;
    fpsRef.current.time += rawDelta;
    if (fpsRef.current.time >= 0.5) {
      onStats({
        fps: Math.round(fpsRef.current.frames / fpsRef.current.time),
        growth: aliveCount / branches.length,
        cycles: cyclesRef.current,
      });
      fpsRef.current.frames = 0;
      fpsRef.current.time = 0;
    }

    const distance = THREE.MathUtils.lerp(
      tuning.value.cameraStartDistance,
      tuning.value.cameraEndDistance,
      clampNumber(maxMatureDepth / 3.4, 0, 1),
    );
    const yaw = 0.6 + dragRef.current.targetYaw;
    const pitch = 0.15 + dragRef.current.targetPitch;
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * distance,
      1.1 + Math.sin(pitch) * distance * 0.5,
      Math.cos(yaw) * Math.cos(pitch) * distance,
    );
    camera.lookAt(0, 1.15, 0);
  });

  return (
    <group>
      <ambientLight intensity={0.14} color="#4e6ca8" />
      <pointLight color="#5bdcff" intensity={32} distance={18} position={[-2.5, 1.8, 2.8]} />
      <pointLight color="#9b48ff" intensity={28} distance={18} position={[2.8, 0.4, 1.5]} />
      <pointLight color="#ffbf82" intensity={15} distance={14} position={[1.2, 4.8, -2.5]} />
      <spotLight color="#b9ecff" intensity={45} distance={30} angle={0.42} penumbra={0.8} position={[-4, 8, 5]} target-position={[0, 1, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.76, 0]}>
        <circleGeometry args={[5.8, 48]} />
        <meshStandardMaterial color="#03050c" emissive="#291459" emissiveIntensity={0.24} metalness={0.86} roughness={0.2} />
      </mesh>
      {[1.2, 2.2, 3.4, 4.7].map((radius, index) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, index * 0.3]} position={[0, -0.735, 0]}>
          <torusGeometry args={[radius, 0.012 + index * 0.004, 5, 80]} />
          <meshBasicMaterial color={index % 2 ? "#8f46ff" : "#38d8ff"} transparent opacity={0.26 - index * 0.035} toneMapped={false} />
        </mesh>
      ))}
      <instancedMesh ref={(el) => { meshRefs.current[0] = el; }} args={[shardGeometry, materials[0], groupCounts[0]]} frustumCulled={false} />
      <instancedMesh ref={(el) => { meshRefs.current[1] = el; }} args={[shardGeometry, materials[1], groupCounts[1]]} frustumCulled={false} />
      <instancedMesh ref={(el) => { meshRefs.current[2] = el; }} args={[shardGeometry, materials[2], groupCounts[2]]} frustumCulled={false} />
      <CrystalFragments material={materialPurple} />
      <instancedMesh ref={dust.meshRef} args={[undefined, undefined, dust.count]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#4d6b85" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

async function createWebGPURenderer(props) {
  const renderer = new THREE.WebGPURenderer({ ...props, antialias: true, powerPreference: "high-performance" });
  await renderer.init();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  return renderer;
}

export default function LivingCrystal({ settings = {} }) {
  const speedRef = useRef(settings.speed ?? 1);
  speedRef.current = settings.speed ?? 1;
  const [stats, setStats] = useState({ fps: 60, gpu: "—", crystals: 0, particles: 0, triangles: 0, growth: 0.56, cycles: 0 });

  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));

  return (
    <section className="atmosphere living-crystal">
      <div className="living-crystal__stage">
        <Canvas
          gl={createWebGPURenderer}
          camera={{ position: [0, 1.1, 1.6], fov: 42, near: 0.05, far: 60 }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <color attach="background" args={["#020103"]} />
          <fogExp2 attach="fog" args={["#020103", 0.05]} />
          <CrystalScene settings={settings} speedRef={speedRef} onStats={onStats} />
        </Canvas>
      </div>

      <div className="experiment-copy living-crystal__copy">
        <p>23 — Procedural mineral intelligence</p>
        <h1>Living<br />Crystal.</h1>
        <span>Facets grow from the seed, breathe with inner light once mature, then shatter and seed the next generation — on, and on. Drag to look around.</span>
      </div>

      <div className="living-crystal__legend">
        <div><i>&#9906;</i><div><b>Move cursor</b><span>Influence the direction of new growth</span></div></div>
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit around the crystal</span></div></div>
      </div>

      <div className="living-crystal__hud">
        <div><span>FPS</span><strong>{stats.fps}</strong></div>
        <div><span>GPU</span><strong className="is-accent">{stats.gpu}</strong></div>
        <div><span>PARTICLES</span><strong>{stats.particles.toLocaleString()}</strong></div>
        <div><span>CRYSTALS</span><strong>{stats.crystals}</strong></div>
        <div><span>TRIANGLES</span><strong>{stats.triangles.toLocaleString()}</strong></div>
      </div>

      <AnimationReadout
        eyebrow="CRYSTAL STATE"
        value={`${Math.round(stats.growth * 100)}% ALIVE`}
        progress={stats.growth}
        stats={[
          { value: stats.crystals.toLocaleString(), label: "BRANCHES" },
          { value: stats.particles.toLocaleString(), label: "DUST MOTES" },
          { value: stats.cycles.toLocaleString(), label: "CYCLES" },
        ]}
      />
    </section>
  );
}
