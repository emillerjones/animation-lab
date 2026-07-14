import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import {
  clamp, color, dot, mix, mul, add, oneMinus, pow, mx_fractal_noise_float, normalView, positionViewDirection, uniform, uv,
} from "three/tsl";
import { getProject } from "@theatre/core";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from "three-mesh-bvh";
import { seeded } from "../utils/procedural";
import "./ImpossibleOrigamiCathedral.css";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// Theatre.js: a real project/sheet/object registry of the choreography's tunable
// numbers. There are no Studio-authored keyframes here (Studio is an interactive,
// dev-only GUI this agent can't scrub by eye) — the actual per-frame interpolation
// below is authored in code, reading these as named, live-tunable parameters that
// a human can still override by opening @theatre/studio in dev.
const theatreProject = getProject("Impossible Origami Cathedral");
const introSheet = theatreProject.sheet("Intro");
const choreography = introSheet.object("Choreography", {
  foldDuration: 8,
  cameraStartZ: 1.35,
  cameraEndZ: 15,
  cameraStartY: 0.35,
  cameraEndY: 3.4,
  fovStart: 36,
  fovEnd: 54,
});

const STATION_COUNT = 8;
const STATION_SPACING = 2.7;
const NAVE_HALF_WIDTH = 2.5;
const WALL_HEIGHT = 3.3;
const RIDGE_HEIGHT = 5.4;
const ROOF_TILT_DEG = 42;
const TOWER_Z = 2.6;
const TOWER_HEIGHT = 6.2;
const ROOF_LENGTH = Math.sqrt(NAVE_HALF_WIDTH ** 2 + (RIDGE_HEIGHT - WALL_HEIGHT) ** 2);

const dummy = new THREE.Object3D();
const tempPos = new THREE.Vector3();
const tempQuat = new THREE.Quaternion();
const tempScale = new THREE.Vector3();

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

function eulerQuat(xDeg, yDeg, zDeg) {
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(
    THREE.MathUtils.degToRad(xDeg),
    THREE.MathUtils.degToRad(yDeg),
    THREE.MathUtils.degToRad(zDeg),
  ));
}

const STACKED_QUAT = eulerQuat(-90, 0, 0);
const STACKED_POS = new THREE.Vector3(0, 0.02, 0.45);
const STACKED_SCALE_RECT = new THREE.Vector3(1.7, 1.7, 1);
const STACKED_SCALE_TRI = new THREE.Vector3(0.3, 0.3, 1);

function buildRectPanels() {
  const panels = [];
  for (let s = 0; s < STATION_COUNT; s += 1) {
    const z = -s * STATION_SPACING;
    const delay = (s / STATION_COUNT) * 0.45;
    [-1, 1].forEach((side) => {
      panels.push({
        id: `wall-${s}-${side}`,
        group: "wall",
        delay,
        stacked: { position: STACKED_POS, quaternion: STACKED_QUAT, scale: STACKED_SCALE_RECT },
        deployed: {
          position: new THREE.Vector3(side * NAVE_HALF_WIDTH, WALL_HEIGHT / 2, z),
          quaternion: eulerQuat(0, 90, 0),
          scale: new THREE.Vector3(STATION_SPACING * 0.96, WALL_HEIGHT, 1),
        },
      });
      panels.push({
        id: `roof-${s}-${side}`,
        group: "roof",
        delay: delay + 0.04,
        stacked: { position: STACKED_POS, quaternion: STACKED_QUAT, scale: STACKED_SCALE_RECT },
        deployed: {
          position: new THREE.Vector3(side * NAVE_HALF_WIDTH * 0.5, (WALL_HEIGHT + RIDGE_HEIGHT) / 2, z),
          quaternion: eulerQuat(side * ROOF_TILT_DEG, 90, 0),
          scale: new THREE.Vector3(STATION_SPACING * 0.96, ROOF_LENGTH, 1),
        },
      });
    });
    if (s < STATION_COUNT - 1) {
      panels.push({
        id: `ridge-${s}`,
        group: "rib",
        delay: delay + 0.08,
        stacked: { position: STACKED_POS, quaternion: STACKED_QUAT, scale: STACKED_SCALE_RECT },
        deployed: {
          position: new THREE.Vector3(0, RIDGE_HEIGHT, z - STATION_SPACING / 2),
          quaternion: eulerQuat(0, 90, 0),
          scale: new THREE.Vector3(STATION_SPACING * 1.05, 0.22, 1),
        },
      });
    }
  }
  return panels;
}

function buildRadialCluster({ id, centerX, centerY, centerZ, count, radius, height, group, delay }) {
  const panels = [];
  for (let i = 0; i < count; i += 1) {
    panels.push({
      id: `${id}-${i}`,
      group,
      clusterId: id,
      delay: delay + i * 0.015,
      stacked: { position: STACKED_POS, quaternion: STACKED_QUAT, scale: STACKED_SCALE_TRI },
      deployed: {
        position: new THREE.Vector3(centerX, centerY, centerZ),
        quaternion: eulerQuat(0, (i / count) * 360, 0),
        scale: new THREE.Vector3(radius, height, 1),
      },
    });
  }
  return panels;
}

function buildTriPanels() {
  const towerLeft = buildRadialCluster({
    id: "tower-left", centerX: -NAVE_HALF_WIDTH * 1.35, centerY: TOWER_HEIGHT / 2, centerZ: TOWER_Z,
    count: 4, radius: 1.3, height: TOWER_HEIGHT, group: "tower", delay: 0.5,
  });
  const towerRight = buildRadialCluster({
    id: "tower-right", centerX: NAVE_HALF_WIDTH * 1.35, centerY: TOWER_HEIGHT / 2, centerZ: TOWER_Z,
    count: 4, radius: 1.3, height: TOWER_HEIGHT, group: "tower", delay: 0.5,
  });
  const rosetteA = buildRadialCluster({
    id: "rosette-a", centerX: -NAVE_HALF_WIDTH, centerY: WALL_HEIGHT * 0.6, centerZ: -STATION_SPACING * 2.2,
    count: 8, radius: 0.42, height: 0.9, group: "rosette", delay: 0.6,
  });
  const rosetteB = buildRadialCluster({
    id: "rosette-b", centerX: NAVE_HALF_WIDTH, centerY: WALL_HEIGHT * 0.6, centerZ: -STATION_SPACING * 5.2,
    count: 8, radius: 0.42, height: 0.9, group: "rosette", delay: 0.62,
  });
  return [...towerLeft, ...towerRight, ...rosetteA, ...rosetteB];
}

const RECT_PANELS = buildRectPanels();
const TRI_PANELS = buildTriPanels();
const ROSETTE_CLUSTER_IDS = ["rosette-a", "rosette-b"];
const GLOW_CORES = ROSETTE_CLUSTER_IDS.map((clusterId) => {
  const source = TRI_PANELS.find((panel) => panel.clusterId === clusterId);
  return { clusterId, position: source.deployed.position.clone() };
});

function usePaperMaterial() {
  const glow = useMemo(() => uniform(1), []);
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardNodeMaterial({ roughness: 0.82, metalness: 0.02, side: THREE.DoubleSide });
    const fiber = mx_fractal_noise_float(mul(uv(), 46), 3, 2, 0.55, 1);
    const shadeFactor = clamp(add(mul(fiber, 0.5), 0.12), 0, 1);
    mat.colorNode = mix(color(0xf4ead8), color(0xd9c39a), shadeFactor);
    const rim = pow(oneMinus(clamp(dot(normalView, positionViewDirection), 0, 1)), 2.2);
    mat.emissiveNode = mul(mul(color(0xffd9a0), rim), glow);
    return mat;
  }, [glow]);
  return { material, glow };
}

function useDustField(count) {
  return useMemo(() => Array.from({ length: count }, (_, index) => ({
    base: new THREE.Vector3(
      (seeded(index, 3001) - 0.5) * 7,
      0.6 + seeded(index, 3002) * 5.4,
      -seeded(index, 3003) * STATION_COUNT * STATION_SPACING,
    ),
    speed: 0.06 + seeded(index, 3004) * 0.12,
    phase: seeded(index, 3005) * Math.PI * 2,
    size: 0.012 + seeded(index, 3006) * 0.02,
  })), [count]);
}

function GlowCores({ revealed }) {
  return GLOW_CORES.map((core) => {
    const active = revealed.has(core.clusterId);
    return (
      <mesh key={core.clusterId} position={core.position} scale={active ? 1 : 0.001}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#ffe1a8" transparent opacity={0.85} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    );
  });
}

function ClickProxies({ proxyRefs }) {
  const wallPanels = useMemo(() => RECT_PANELS.filter((panel) => panel.group === "wall"), []);
  return wallPanels.map((panel, index) => (
    <mesh
      key={panel.id}
      ref={(node) => { if (node) proxyRefs.current[index] = { node, panel }; }}
      position={panel.deployed.position}
      quaternion={panel.deployed.quaternion}
      scale={panel.deployed.scale}
      visible={false}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial />
    </mesh>
  ));
}

function CathedralScene({ speedRef, onIntroStarted }) {
  const { camera } = useThree();
  const rectMeshRef = useRef();
  const triMeshRef = useRef();
  const dustMeshRef = useRef();
  const coverRef = useRef();
  const introStartedRef = useRef(false);
  const scrollProgressRef = useRef(0);
  const dragRef = useRef({ yaw: 0, pitch: 0 });
  const proxyRefs = useRef([]);
  const [revealed, setRevealed] = useState(() => new Set());

  const { material: paperMaterial, glow } = usePaperMaterial();
  const dust = useDustField(220);

  useEffect(() => {
    proxyRefs.current.forEach((entry) => {
      if (entry?.node?.geometry && !entry.node.geometry.boundsTree) {
        entry.node.geometry.computeBoundsTree();
      }
    });
  }, []);

  useEffect(() => {
    const canvasEl = document.querySelector(".impossible-origami-cathedral canvas");
    if (!canvasEl) return undefined;

    let dragging = false;
    let dragMoved = false;
    let lastX = 0;
    let lastY = 0;

    const onWheel = (event) => {
      event.preventDefault();
      scrollProgressRef.current = THREE.MathUtils.clamp(scrollProgressRef.current + event.deltaY * 0.0006, 0, 1);
    };
    const onPointerDown = (event) => {
      dragging = true;
      dragMoved = false;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
      lastX = event.clientX;
      lastY = event.clientY;
      dragRef.current.yaw = THREE.MathUtils.clamp(dragRef.current.yaw - dx * 0.002, -0.26, 0.26);
      if (event.pointerType !== "touch") {
        dragRef.current.pitch = THREE.MathUtils.clamp(dragRef.current.pitch - dy * 0.0015, -0.18, 0.18);
      }
    };
    const onPointerUp = (event) => {
      if (dragging && !dragMoved) {
        const rect = canvasEl.getBoundingClientRect();
        const ndc = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(ndc, camera);
        const targets = proxyRefs.current.filter(Boolean).map((entry) => entry.node);
        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length) {
          const hitEntry = proxyRefs.current.find((entry) => entry?.node === hits[0].object);
          if (hitEntry) {
            const hitZ = hitEntry.panel.deployed.position.z;
            const nearestCluster = ROSETTE_CLUSTER_IDS.reduce((best, clusterId) => {
              const core = GLOW_CORES.find((entry) => entry.clusterId === clusterId);
              const dist = Math.abs(core.position.z - hitZ);
              return dist < best.dist ? { clusterId, dist } : best;
            }, { clusterId: ROSETTE_CLUSTER_IDS[0], dist: Infinity });
            setRevealed((current) => {
              const next = new Set(current);
              if (next.has(nearestCluster.clusterId)) next.delete(nearestCluster.clusterId);
              else next.add(nearestCluster.clusterId);
              return next;
            });
          }
        }
      }
      dragging = false;
    };

    canvasEl.addEventListener("wheel", onWheel, { passive: false });
    canvasEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      canvasEl.removeEventListener("wheel", onWheel);
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [camera]);

  useFrame((state) => {
    const speed = speedRef.current;
    const elapsed = state.clock.elapsedTime * speed;
    const introT = Math.min(elapsed / choreography.value.foldDuration, 1);
    const eased = easeInOutCubic(introT);

    if (introT > 0.01 && !introStartedRef.current) {
      introStartedRef.current = true;
      onIntroStarted();
    }
    glow.value = 0.6 + eased * 0.6 + (introT >= 1 ? Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.15 : 0);

    if (introT < 1) {
      camera.position.set(
        0,
        THREE.MathUtils.lerp(choreography.value.cameraStartY, choreography.value.cameraEndY, eased),
        THREE.MathUtils.lerp(choreography.value.cameraStartZ, choreography.value.cameraEndZ, eased),
      );
      camera.fov = THREE.MathUtils.lerp(choreography.value.fovStart, choreography.value.fovEnd, eased);
      camera.updateProjectionMatrix();
      camera.lookAt(0, WALL_HEIGHT * 0.6 * eased, -STATION_SPACING * (STATION_COUNT * 0.5) * eased);
    } else {
      const travel = scrollProgressRef.current * (STATION_COUNT * STATION_SPACING * 0.82);
      const baseZ = choreography.value.cameraEndZ - travel;
      const parallaxX = state.pointer.x * 0.35;
      const parallaxY = state.pointer.y * 0.18;
      camera.position.set(parallaxX, choreography.value.cameraEndY + parallaxY, baseZ);
      const yaw = dragRef.current.yaw;
      const pitch = dragRef.current.pitch;
      tempPos.set(Math.sin(yaw) * 6, choreography.value.cameraEndY + Math.sin(pitch) * 2.4, baseZ - Math.cos(yaw) * 6);
      camera.lookAt(tempPos);
    }

    if (coverRef.current) {
      const coverOpacity = THREE.MathUtils.clamp(1 - introT / 0.16, 0, 1);
      coverRef.current.material.opacity = coverOpacity;
      coverRef.current.visible = coverOpacity > 0.01;
    }

    if (rectMeshRef.current) {
      RECT_PANELS.forEach((panel, index) => {
        const localT = THREE.MathUtils.clamp((eased - panel.delay) / (1 - panel.delay), 0, 1);
        const smoothT = easeInOutCubic(localT);
        tempPos.lerpVectors(panel.stacked.position, panel.deployed.position, smoothT);
        tempQuat.slerpQuaternions(panel.stacked.quaternion, panel.deployed.quaternion, smoothT);
        tempScale.lerpVectors(panel.stacked.scale, panel.deployed.scale, smoothT);
        if (introT >= 1) {
          tempPos.y += Math.sin(elapsed * 0.4 + index) * 0.01;
        }
        dummy.position.copy(tempPos);
        dummy.quaternion.copy(tempQuat);
        dummy.scale.copy(tempScale);
        dummy.updateMatrix();
        rectMeshRef.current.setMatrixAt(index, dummy.matrix);
      });
      rectMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (triMeshRef.current) {
      TRI_PANELS.forEach((panel, index) => {
        const localT = THREE.MathUtils.clamp((eased - panel.delay) / (1 - panel.delay), 0, 1);
        let smoothT = easeInOutCubic(localT);
        if (panel.group === "rosette" && revealed.has(panel.clusterId)) {
          smoothT = Math.min(1.35, smoothT + 0.35);
        }
        tempPos.lerpVectors(panel.stacked.position, panel.deployed.position, Math.min(smoothT, 1));
        tempQuat.slerpQuaternions(panel.stacked.quaternion, panel.deployed.quaternion, Math.min(smoothT, 1));
        tempScale.lerpVectors(panel.stacked.scale, panel.deployed.scale, Math.min(smoothT, 1)).multiplyScalar(
          panel.group === "rosette" && revealed.has(panel.clusterId) ? 1 + Math.max(0, smoothT - 1) : 1,
        );
        if (introT >= 1) {
          tempPos.y += Math.sin(elapsed * 0.5 + index) * 0.012;
        }
        dummy.position.copy(tempPos);
        dummy.quaternion.copy(tempQuat);
        dummy.scale.copy(tempScale);
        dummy.updateMatrix();
        triMeshRef.current.setMatrixAt(index, dummy.matrix);
      });
      triMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (dustMeshRef.current) {
      dust.forEach((mote, index) => {
        const bob = Math.sin(elapsed * mote.speed * 4 + mote.phase) * 0.4;
        tempPos.set(mote.base.x, mote.base.y + bob, mote.base.z + Math.cos(elapsed * mote.speed * 2 + mote.phase) * 0.3);
        const distToCamera = tempPos.distanceTo(camera.position);
        if (distToCamera < 2.4) {
          const push = (1 - distToCamera / 2.4) * 0.6;
          tempPos.addScaledVector(tempPos.clone().sub(camera.position).normalize(), push);
        }
        dummy.position.copy(tempPos);
        dummy.scale.setScalar(mote.size * (introT >= 1 ? 1 : eased));
        dummy.updateMatrix();
        dustMeshRef.current.setMatrixAt(index, dummy.matrix);
      });
      dustMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.12} />
      <pointLight color="#ffd9a0" intensity={18} distance={26} position={[0, WALL_HEIGHT * 1.4, -STATION_SPACING * 2]} />
      <pointLight color="#ffcf8a" intensity={10} distance={30} position={[0, RIDGE_HEIGHT + 1, -STATION_SPACING * (STATION_COUNT - 1)]} />

      <mesh ref={coverRef} position={[0, 0.5, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshStandardMaterial color="#f4ead8" roughness={0.85} transparent opacity={1} side={THREE.DoubleSide} />
      </mesh>

      <instancedMesh ref={rectMeshRef} args={[undefined, undefined, RECT_PANELS.length]} material={paperMaterial} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
      </instancedMesh>

      <instancedMesh ref={triMeshRef} args={[undefined, undefined, TRI_PANELS.length]} material={paperMaterial} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-0.5, 0, 0, 0.5, 0, 0, 0, 1, 0]), 3]} />
          <bufferAttribute attach="attributes-normal" args={[new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]), 3]} />
        </bufferGeometry>
      </instancedMesh>

      <instancedMesh ref={dustMeshRef} args={[undefined, undefined, dust.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#ffe9c4" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </instancedMesh>

      <GlowCores revealed={revealed} />
      <ClickProxies proxyRefs={proxyRefs} />
    </group>
  );
}

async function createWebGPURenderer(props) {
  const renderer = new THREE.WebGPURenderer({ ...props, antialias: true, powerPreference: "high-performance" });
  await renderer.init();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  return renderer;
}

export default function ImpossibleOrigamiCathedral({ settings = {} }) {
  const speedRef = useRef(settings.speed ?? 1);
  speedRef.current = settings.speed ?? 1;
  const [introStarted, setIntroStarted] = useState(false);

  return (
    <section className="atmosphere impossible-origami-cathedral">
      <div className="impossible-origami-cathedral__stage">
        <Canvas
          gl={createWebGPURenderer}
          camera={{ position: [0, 0.35, 1.35], fov: 36, near: 0.05, far: 220 }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <color attach="background" args={["#040302"]} />
          <fogExp2 attach="fog" args={["#040302", 0.012]} />
          <CathedralScene speedRef={speedRef} onIntroStarted={() => setIntroStarted(true)} />
        </Canvas>
      </div>
      <div className="experiment-copy">
        <p>Claude — Sacred geometry, folded from a single sheet</p>
        <h1>The Impossible<br />Origami Cathedral.</h1>
        <span>One sheet of paper folds itself into a gothic nave. Scroll to move deeper inside; drag to look around; click a wall to see what glows behind it.</span>
      </div>
      <div className={`impossible-origami-cathedral__prompt ${introStarted ? "is-hidden" : ""}`}>Scroll to enter</div>
    </section>
  );
}
