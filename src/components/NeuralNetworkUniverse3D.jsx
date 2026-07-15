import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Physics, InstancedRigidBodies } from "@react-three/rapier";
import {
  BatchedRenderer, ParticleSystem, RenderMode, SphereEmitter,
  ApplyForce, ColorOverLife, ConstantValue, IntervalValue, ColorRange,
  Vector3 as QVector3, Vector4 as QVector4,
} from "three.quarks";
import { getProject } from "@theatre/core";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import { seeded } from "../utils/procedural";
import "./NeuralNetworkUniverse3D.css";

const theatreProject = getProject("Neural Network Universe");
const tuningSheet = theatreProject.sheet("Network");
const tuning = tuningSheet.object("Tuning", {
  orbitSpeed: 0.22,
  orbitRadius: 15,
  pulseSpeed: 2.6,
  restoringStrength: 1,
  glowDecay: 2.6,
});

const ACCENT = new THREE.Color("#b286ff");
const PULSE_COLOR = new THREE.Color("#ffffff");
const LAYER_FRACTIONS = [0.3, 0.24, 0.2, 0.16, 0.1];
const SHELL_RADII = [1.6, 3.4, 5.2, 7, 8.8];
const OUT_DEGREE = 5;
const MAX_ACTIVE_PULSES = 200;
const MAX_FANOUT = 4;
const MAX_BURSTS = 24;
const BURST_LIFE = 0.5;

const dummy = new THREE.Object3D();

// Layers are nested spherical shells (small inner shell = input, large outer
// shell = output) instead of a flat card — reads as a "universe," not a diagram.
function buildLayers(count) {
  const layerCount = LAYER_FRACTIONS.length;
  const sizes = LAYER_FRACTIONS.map((fraction) => Math.max(4, Math.round(count * fraction)));
  const golden = Math.PI * (3 - Math.sqrt(5));

  const positions = [];
  const layerStart = [];
  sizes.forEach((size, layerIndex) => {
    layerStart.push(positions.length);
    const radius = SHELL_RADII[layerIndex];
    for (let i = 0; i < size; i += 1) {
      const y = 1 - (i / Math.max(1, size - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i + seeded(i + layerIndex * 97, 404) * 0.3;
      const jitter = 1 + (seeded(i + layerIndex * 131, 405) - 0.5) * 0.08;
      positions.push(new THREE.Vector3(
        Math.cos(theta) * r * radius * jitter,
        y * radius * jitter,
        Math.sin(theta) * r * radius * jitter,
      ));
    }
  });

  // Sparse random connectivity (fixed out-degree) instead of a full bipartite
  // mesh between layers — a 170-node full mesh was ~4800 edges rewritten every
  // frame to track physics-driven positions, which is almost certainly what
  // pushed the renderer into "Context Lost." A capped out-degree also reads as
  // real selective activation instead of one hazy connected blob.
  const edges = [];
  const outgoing = positions.map(() => []);
  for (let layerIndex = 0; layerIndex < layerCount - 1; layerIndex += 1) {
    const start = layerStart[layerIndex];
    const end = layerStart[layerIndex + 1];
    const nextEnd = layerIndex + 2 < layerCount ? layerStart[layerIndex + 2] : positions.length;
    const nextLayerSize = nextEnd - end;
    for (let a = start; a < end; a += 1) {
      const targets = new Set();
      const wanted = Math.min(OUT_DEGREE, nextLayerSize);
      let attempt = 0;
      while (targets.size < wanted && attempt < wanted * 5) {
        targets.add(end + Math.floor(seeded(a * 13 + attempt, 812) * nextLayerSize));
        attempt += 1;
      }
      targets.forEach((b) => {
        const edgeIndex = edges.length;
        const weight = 0.3 + seeded(edgeIndex, 711) * 0.8;
        edges.push({ a, b, weight });
        outgoing[a].push(edgeIndex);
      });
    }
  }

  const layer0 = Array.from({ length: sizes[0] }, (_, i) => i);
  return { positions, layerCount, edges, outgoing, layer0 };
}

function pickRandomSubset(list, maxCount) {
  if (list.length <= maxCount) return list;
  const pool = list.slice();
  const chosen = [];
  for (let i = 0; i < maxCount && pool.length; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return chosen;
}

function useEdgeGeometry(graph) {
  return useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const posArr = new Float32Array(graph.edges.length * 6);
    const colorArr = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(({ a, b, weight }, index) => {
      const pa = graph.positions[a];
      const pb = graph.positions[b];
      posArr.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], index * 6);
      const c = ACCENT.clone().multiplyScalar(0.35 + weight * 0.9);
      colorArr.set([c.r, c.g, c.b, c.r, c.g, c.b], index * 6);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorArr, 3));
    return geo;
  }, [graph]);
}

// Ambient star-dust drifting through the whole structure — decorative, doesn't
// need to track the physics-driven nodes, so a standalone quarks system suits it.
function useAmbientDust() {
  const speed = useSpeed();
  const { renderer, system } = useMemo(() => {
    const bright = new QVector4(0.78, 0.68, 1, 0.5);
    const dim = new QVector4(0.78, 0.68, 1, 0);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const particleSystem = new ParticleSystem({
      duration: 1,
      looping: true,
      startLife: new IntervalValue(6, 10),
      startSpeed: new IntervalValue(0.02, 0.06),
      startSize: new IntervalValue(0.02, 0.05),
      startColor: new ColorRange(bright, bright),
      emissionOverTime: new ConstantValue(4),
      shape: new SphereEmitter({ radius: 10, thickness: 1, arc: Math.PI * 2 }),
      material,
      renderMode: RenderMode.BillBoard,
      worldSpace: true,
    });
    particleSystem.addBehavior(new ApplyForce(new QVector3(0, 1, 0), new ConstantValue(0.008)));
    particleSystem.addBehavior(new ColorOverLife(new ColorRange(bright, dim)));

    const batchRenderer = new BatchedRenderer();
    batchRenderer.addSystem(particleSystem);
    return { renderer: batchRenderer, system: particleSystem };
  }, []);

  useEffect(() => () => {
    system.dispose();
    renderer.deleteSystem(system);
  }, [renderer, system]);

  useFrame((_, delta) => {
    renderer.update(Math.min(delta, 0.05) * speed);
  });

  return renderer;
}

function NetworkScene({ settings }) {
  const { camera } = useThree();
  const dragRef = useDragOrbit();
  const speed = useSpeed();
  const count = Math.max(30, Math.min(170, settings.nodes ?? 150));
  const pulseRateMul = settings.pulseRate ?? 0.9;
  const graph = useMemo(() => buildLayers(count), [count]);
  const edgeGeometry = useEdgeGeometry(graph);
  const dustRenderer = useAmbientDust();

  const bodiesRef = useRef([]);
  const nodeMeshRef = useRef();
  const pulseMeshRef = useRef();
  const burstMeshRef = useRef();
  const nodeFlashRef = useRef(new Float32Array(graph.positions.length));
  const pulsesRef = useRef([]);
  const burstsRef = useRef([]);
  const ambientTimerRef = useRef(0);
  const orbitRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    nodeFlashRef.current = new Float32Array(graph.positions.length);
    pulsesRef.current = [];
    burstsRef.current = [];
  }, [graph]);

  const instances = useMemo(() => graph.positions.map((p, index) => ({
    key: `node-${index}`,
    position: [p.x, p.y, p.z],
  })), [graph]);

  const fireNode = (nodeIndex, spawnList) => {
    nodeFlashRef.current[nodeIndex] = 1;
    const body = bodiesRef.current[nodeIndex];
    let bx; let by; let bz;
    if (body) {
      const translation = body.translation();
      bx = translation.x; by = translation.y; bz = translation.z;
    } else {
      const home = graph.positions[nodeIndex];
      bx = home.x; by = home.y; bz = home.z;
    }
    if (burstsRef.current.length >= MAX_BURSTS) burstsRef.current.shift();
    burstsRef.current.push({ x: bx, y: by, z: bz, age: 0 });

    const chosen = pickRandomSubset(graph.outgoing[nodeIndex], MAX_FANOUT);
    chosen.forEach((edgeIndex) => {
      if (pulsesRef.current.length + spawnList.length < MAX_ACTIVE_PULSES) {
        spawnList.push({ edgeIndex, t: 0 });
      }
    });
  };

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05) * speed;
    const bodies = bodiesRef.current;
    // When the node-count slider changes, graph.positions.length changes and the
    // physics subtree remounts (key={count} below) — for a frame or two the ref
    // array can be empty or briefly mismatched during that teardown/rebuild. Any
    // stale/freed Rapier body handle touched here panics the WASM module, so skip
    // the frame entirely until the body count actually matches the current graph.
    if (!bodies.length || bodies.length !== graph.positions.length) return;
    const t = state.clock.elapsedTime;

    // Restoring impulse toward home shell position, plus a small continuous
    // per-node wander so the structure visibly shimmers even when idle — real
    // Rapier integration (mass, damping), not a scripted lerp.
    bodies.forEach((body, index) => {
      if (!body) return;
      const home = graph.positions[index];
      const translation = body.translation();
      const px = translation.x; const py = translation.y; const pz = translation.z;
      const k = 0.02 * tuning.value.restoringStrength;
      const wx = Math.sin(t * 0.7 + index * 12.9) * 0.006;
      const wy = Math.cos(t * 0.5 + index * 7.3) * 0.006;
      const wz = Math.sin(t * 0.6 + index * 3.1) * 0.006;
      body.applyImpulse({ x: (home.x - px) * k + wx, y: (home.y - py) * k + wy, z: (home.z - pz) * k + wz }, true);
    });

    ambientTimerRef.current -= delta;
    if (ambientTimerRef.current <= 0) {
      ambientTimerRef.current = THREE.MathUtils.lerp(2.2, 0.3, THREE.MathUtils.clamp(pulseRateMul / 3, 0, 1));
      const startNode = graph.layer0[Math.floor(Math.random() * graph.layer0.length)];
      const spawned = [];
      fireNode(startNode, spawned);
      pulsesRef.current = pulsesRef.current.concat(spawned);
    }

    const remaining = [];
    const spawnedThisFrame = [];
    pulsesRef.current.forEach((pulse) => {
      const edge = graph.edges[pulse.edgeIndex];
      pulse.t += delta * tuning.value.pulseSpeed * (0.6 + edge.weight);
      if (pulse.t >= 1) {
        const targetBody = bodies[edge.b];
        if (targetBody) {
          targetBody.applyImpulse({ x: (Math.random() - 0.5) * 0.025, y: (Math.random() - 0.5) * 0.025, z: (Math.random() - 0.5) * 0.025 }, true);
        }
        fireNode(edge.b, spawnedThisFrame);
      } else {
        remaining.push(pulse);
      }
    });
    pulsesRef.current = remaining.concat(spawnedThisFrame).slice(0, MAX_ACTIVE_PULSES);

    if (nodeMeshRef.current) {
      const flash = nodeFlashRef.current;
      for (let i = 0; i < flash.length; i += 1) {
        flash[i] = Math.max(0, flash[i] - delta * tuning.value.glowDecay);
        nodeMeshRef.current.setColorAt(i, ACCENT.clone().lerp(PULSE_COLOR, flash[i]));
      }
      if (nodeMeshRef.current.instanceColor) nodeMeshRef.current.instanceColor.needsUpdate = true;
    }

    // Rapier's translation() returns a live view into WASM memory, not a copy —
    // holding two of them at once (one per edge endpoint) is what triggered the
    // "recursive use of an object... unsafe aliasing" panic. Each call's values
    // are pulled out into plain numbers before the next translation() call runs.
    const posAttr = edgeGeometry.attributes.position;
    graph.edges.forEach(({ a, b }, index) => {
      const bodyA = bodies[a];
      const bodyB = bodies[b];
      if (!bodyA || !bodyB) return;
      const ta = bodyA.translation();
      const ax = ta.x; const ay = ta.y; const az = ta.z;
      const tb = bodyB.translation();
      const bx = tb.x; const by = tb.y; const bz = tb.z;
      posAttr.array[index * 6] = ax; posAttr.array[index * 6 + 1] = ay; posAttr.array[index * 6 + 2] = az;
      posAttr.array[index * 6 + 3] = bx; posAttr.array[index * 6 + 4] = by; posAttr.array[index * 6 + 5] = bz;
    });
    posAttr.needsUpdate = true;

    if (pulseMeshRef.current) {
      pulsesRef.current.forEach((pulse, index) => {
        const edge = graph.edges[pulse.edgeIndex];
        const bodyA = bodies[edge.a];
        const bodyB = bodies[edge.b];
        if (!bodyA || !bodyB) return;
        const ta = bodyA.translation();
        const ax = ta.x; const ay = ta.y; const az = ta.z;
        const tb = bodyB.translation();
        const bx = tb.x; const by = tb.y; const bz = tb.z;
        dummy.position.set(
          THREE.MathUtils.lerp(ax, bx, pulse.t),
          THREE.MathUtils.lerp(ay, by, pulse.t),
          THREE.MathUtils.lerp(az, bz, pulse.t),
        );
        dummy.scale.setScalar(0.08);
        dummy.updateMatrix();
        pulseMeshRef.current.setMatrixAt(index, dummy.matrix);
      });
      for (let i = pulsesRef.current.length; i < MAX_ACTIVE_PULSES; i += 1) {
        dummy.position.set(0, 9999, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        pulseMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      pulseMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (burstMeshRef.current) {
      burstsRef.current = burstsRef.current.filter((burst) => burst.age < BURST_LIFE);
      burstsRef.current.forEach((burst, index) => {
        burst.age += delta;
        const life = burst.age / BURST_LIFE;
        dummy.position.set(burst.x, burst.y, burst.z);
        dummy.scale.setScalar(0.15 + life * 0.9);
        dummy.updateMatrix();
        burstMeshRef.current.setMatrixAt(index, dummy.matrix);
        burstMeshRef.current.setColorAt(index, PULSE_COLOR.clone().multiplyScalar(1 - life));
      });
      for (let i = burstsRef.current.length; i < MAX_BURSTS; i += 1) {
        dummy.position.set(0, 9999, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        burstMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      burstMeshRef.current.instanceMatrix.needsUpdate = true;
      if (burstMeshRef.current.instanceColor) burstMeshRef.current.instanceColor.needsUpdate = true;
    }

    orbitRef.current += delta * tuning.value.orbitSpeed;
    const radius = tuning.value.orbitRadius;
    const yaw = orbitRef.current + dragRef.current.targetYaw;
    const pitch = Math.sin(t * 0.09) * 0.35 + dragRef.current.targetPitch;
    camera.position.set(
      Math.sin(yaw) * radius * Math.cos(pitch),
      2 + Math.sin(pitch) * radius * 0.5,
      Math.cos(yaw) * radius * Math.cos(pitch),
    );
    camera.lookAt(0, 1, 0);
  });

  return (
    <group>
      <Physics key={count} gravity={[0, 0, 0]} paused={speed === 0}>
        <InstancedRigidBodies ref={bodiesRef} instances={instances} colliders={false} linearDamping={2.2} angularDamping={4}>
          <instancedMesh
            ref={nodeMeshRef}
            args={[undefined, undefined, instances.length]}
            count={instances.length}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (event.instanceId == null) return;
              const spawned = [];
              fireNode(event.instanceId, spawned);
              pulsesRef.current = pulsesRef.current.concat(spawned);
            }}
          >
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial vertexColors toneMapped={false} />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>

      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <instancedMesh ref={pulseMeshRef} args={[undefined, undefined, MAX_ACTIVE_PULSES]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={burstMeshRef} args={[undefined, undefined, MAX_BURSTS]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </instancedMesh>

      <primitive object={dustRenderer} />
      <pointLight color="#b286ff" intensity={22} distance={28} position={[0, 1, 0]} />
    </group>
  );
}

export default function NeuralNetworkUniverse3D({ settings = {} }) {
  return (
    <section className="atmosphere neural-network-universe-3d">
      <CanvasStage camera={{ position: [0, 2, 15], fov: 50 }} speed={settings.speed ?? 1} bloom={{ intensity: 1.2 }}>
        <ambientLight intensity={0.08} />
        <NetworkScene settings={settings} />
      </CanvasStage>
      <div className="experiment-copy">
        <p>10 — Intelligence study, now with a real nervous system</p>
        <h1>A mind, laid<br />out in layers.</h1>
        <span>Nested shells of physically simulated nodes drift on real inertia while the camera circles the whole structure — click a node and watch an actual cascading forward pass ripple outward through the graph.</span>
      </div>
    </section>
  );
}
