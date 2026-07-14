import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import * as THREE from "three/webgpu";
import {
  clamp,
  color,
  dot,
  mix,
  mul,
  mx_fractal_noise_float,
  normalView,
  oneMinus,
  positionViewDirection,
  pow,
  uniform,
  uv,
} from "three/tsl";
import { WEBGL_DPR } from "../rendering/quality";
import "./ImpossibleOrigamiCathedral.css";

const theatreProject = getProject("Origami Cathedral GPT", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = theatreProject.sheet("One Sheet / One Sanctuary");
const choreography = theatreSheet.object("Fold choreography", {
  duration: 8,
  firstFold: 0.08,
  wallsRise: 0.24,
  vaultCloses: 0.48,
  towersRise: 0.68,
  lightEnters: 0.76,
  cameraStartZ: 4.1,
  cameraEndZ: 16.5,
});

const PANEL_WIDTH = 3.15;
const WALL_HEIGHT = 4.25;
const WALL_TOP = 4.45;
const RIDGE_HEIGHT = 7.15;
const SECTION_DEPTH = 2.35;
const FRONT_Z = 2.1;
const SCENE_X = 2.15;
const tempObject = new THREE.Object3D();
const tempPosition = new THREE.Vector3();
const tempQuaternion = new THREE.Quaternion();
const tempScale = new THREE.Vector3();
const tempMatrix = new THREE.Matrix4();
const panelNormal = new THREE.Vector3();

if (THREE.Mesh.prototype.raycast !== acceleratedRaycast) {
  THREE.Mesh.prototype.raycast = acceleratedRaycast;
}

function saturate(value) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function smoother(value) {
  const t = saturate(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function makePanelQuaternion(axisU, axisV) {
  const u = axisU.clone().normalize();
  const v = axisV.clone().normalize();
  const normal = new THREE.Vector3().crossVectors(u, v).normalize();
  tempMatrix.makeBasis(u, v, normal);
  return new THREE.Quaternion().setFromRotationMatrix(tempMatrix);
}

function addRectangle(specs, options) {
  const {
    center,
    axisU,
    axisV,
    width,
    height,
    station,
    delay,
    kind,
  } = options;
  const quaternion = makePanelQuaternion(axisU, axisV);
  const flipped = quaternion.clone().multiply(
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI),
  );
  const scale = new THREE.Vector3(width, height, 1);

  specs.push({
    center: center.clone(),
    quaternion,
    scale: scale.clone(),
    station,
    delay,
    kind,
  });
  specs.push({
    center: center.clone(),
    quaternion: flipped,
    scale: scale.clone(),
    station,
    delay: delay + 0.012,
    kind,
  });
}

function buildPanelSpecs(stations) {
  const specs = [];
  const slantHeight = Math.hypot(PANEL_WIDTH, RIDGE_HEIGHT - WALL_TOP);
  const sectionAxis = new THREE.Vector3(0, 0, -1);

  for (let station = 0; station < stations; station += 1) {
    const z = FRONT_Z - station * SECTION_DEPTH;
    const timeline = station / Math.max(1, stations - 1);

    for (const side of [-1, 1]) {
      addRectangle(specs, {
        center: new THREE.Vector3(SCENE_X + side * PANEL_WIDTH, WALL_HEIGHT * 0.5 + 0.2, z),
        axisU: sectionAxis,
        axisV: new THREE.Vector3(0, 1, 0),
        width: SECTION_DEPTH * 0.96,
        height: WALL_HEIGHT,
        station,
        delay: 0.13 + timeline * 0.28 + (side > 0 ? 0.018 : 0),
        kind: "wall",
      });

      addRectangle(specs, {
        center: new THREE.Vector3(
          SCENE_X + side * PANEL_WIDTH * 0.5,
          WALL_TOP + (RIDGE_HEIGHT - WALL_TOP) * 0.5,
          z,
        ),
        axisU: sectionAxis,
        axisV: new THREE.Vector3(-side * PANEL_WIDTH, RIDGE_HEIGHT - WALL_TOP, 0),
        width: SECTION_DEPTH * 0.97,
        height: slantHeight,
        station,
        delay: 0.35 + timeline * 0.28 + (side > 0 ? 0.022 : 0),
        kind: "vault",
      });

      if (station % 2 === 0) {
        addRectangle(specs, {
          center: new THREE.Vector3(SCENE_X + side * (PANEL_WIDTH + 0.72), 2.45, z),
          axisU: sectionAxis,
          axisV: new THREE.Vector3(-side * 0.5, 1, 0),
          width: 0.5,
          height: 5.05,
          station,
          delay: 0.28 + timeline * 0.34,
          kind: "buttress",
        });
      }
    }

    addRectangle(specs, {
      center: new THREE.Vector3(SCENE_X, 0.12, z),
      axisU: sectionAxis,
      axisV: new THREE.Vector3(1, 0, 0),
      width: SECTION_DEPTH * 0.97,
      height: PANEL_WIDTH * 2,
      station,
      delay: 0.04 + timeline * 0.18,
      kind: "floor",
    });
  }

  for (const side of [-1, 1]) {
    for (let tier = 0; tier < 5; tier += 1) {
      const towerHeight = 1.05 + tier * 1.15;
      const radius = 1.05 - tier * 0.08;
      for (let face = 0; face < 4; face += 1) {
        const angle = face * Math.PI * 0.5 + Math.PI * 0.25;
        const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        const center = new THREE.Vector3(
          SCENE_X + side * 4.55 + normal.x * radius,
          towerHeight,
          FRONT_Z + 0.3 + normal.z * radius,
        );
        addRectangle(specs, {
          center,
          axisU: new THREE.Vector3(-normal.z, 0, normal.x),
          axisV: new THREE.Vector3(0, 1, 0),
          width: radius * 1.65,
          height: 2.2,
          station: side < 0 ? 0 : 1,
          delay: 0.57 + tier * 0.045 + face * 0.008,
          kind: "tower",
        });
      }
    }
  }

  const columns = Math.ceil(Math.sqrt(specs.length * 1.55));
  const rows = Math.ceil(specs.length / columns);
  return specs.map((spec, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      ...spec,
      startPosition: new THREE.Vector3(
        SCENE_X + (column - (columns - 1) * 0.5) * 0.42,
        0.16,
        2.35 + (row - (rows - 1) * 0.5) * 0.42,
      ),
      startQuaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI * 0.5, 0, 0)),
      startScale: new THREE.Vector3(0.43, 0.43, 1),
    };
  });
}

function createTriangleGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0], 3),
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3),
  );
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1], 2),
  );
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  computeBoundsTree.call(geometry, { maxLeafTris: 2 });
  return geometry;
}

function usePaperMaterial(glowLevel) {
  const glow = useMemo(() => uniform(glowLevel), []);
  const material = useMemo(() => {
    const paper = new THREE.MeshStandardNodeMaterial({
      side: THREE.DoubleSide,
      roughness: 0.84,
      metalness: 0.015,
      transparent: true,
      opacity: 0.985,
    });
    const broadFiber = mx_fractal_noise_float(uv().mul(54), 4, 2.05, 0.52, 1);
    const fineFiber = mx_fractal_noise_float(uv().mul(245), 2, 2, 0.48, 1);
    const fibers = broadFiber.mul(0.62).add(fineFiber.mul(0.23));
    const facing = clamp(dot(normalView, positionViewDirection).abs(), 0, 1);
    const translucentEdge = pow(oneMinus(facing), 2.35);
    paper.colorNode = mix(color("#c9b58f"), color("#fffaf0"), fibers.mul(0.62).add(0.32));
    paper.emissiveNode = mul(color("#ffd28a"), translucentEdge.mul(glow).mul(0.62));
    return paper;
  }, [glow]);

  useEffect(() => {
    glow.value = glowLevel;
  }, [glow, glowLevel]);

  useEffect(() => () => material.dispose(), [material]);
  return { material, glow };
}

function PaperDust({ amount, speed }) {
  const points = useRef();
  const setup = useMemo(() => {
    const count = Math.floor(900 + amount * 3600);
    const positions = new Float32Array(count * 3);
    const drift = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      positions[i3] = SCENE_X + (Math.random() - 0.5) * 15;
      positions[i3 + 1] = Math.random() * 9;
      positions[i3 + 2] = 3 - Math.random() * 28;
      drift[i3] = (Math.random() - 0.5) * 0.045;
      drift[i3 + 1] = 0.025 + Math.random() * 0.09;
      drift[i3 + 2] = (Math.random() - 0.5) * 0.035;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.userData.drift = drift;
    const material = new THREE.PointsMaterial({
      color: "#ffe8bc",
      transparent: true,
      opacity: 0.66,
      size: 0.035,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    return { count, geometry, material };
  }, [amount]);

  useFrame((state, delta) => {
    const positions = setup.geometry.attributes.position.array;
    const drift = setup.geometry.userData.drift;
    const step = Math.min(delta, 0.04) * speed;
    for (let index = 0; index < setup.count; index += 1) {
      const i3 = index * 3;
      positions[i3] += drift[i3] * step;
      positions[i3 + 1] += drift[i3 + 1] * step;
      positions[i3 + 2] += drift[i3 + 2] * step;
      if (positions[i3 + 1] > 9.4) positions[i3 + 1] = -0.2;
    }
    setup.geometry.attributes.position.needsUpdate = true;
    if (points.current) points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.012;
  });

  useEffect(() => () => {
    setup.geometry.dispose();
    setup.material.dispose();
  }, [setup]);

  return <points ref={points} geometry={setup.geometry} material={setup.material} frustumCulled={false} />;
}

function VaultRibs({ stations, progressRef, breathing }) {
  const group = useRef();
  const curves = useMemo(() => Array.from({ length: stations }, (_, station) => {
    const z = FRONT_Z - station * SECTION_DEPTH - SECTION_DEPTH * 0.45;
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(SCENE_X - PANEL_WIDTH, 0.3, z),
      new THREE.Vector3(SCENE_X - PANEL_WIDTH, WALL_TOP, z),
      new THREE.Vector3(SCENE_X - PANEL_WIDTH * 0.54, 5.95, z),
      new THREE.Vector3(SCENE_X, RIDGE_HEIGHT, z),
      new THREE.Vector3(SCENE_X + PANEL_WIDTH * 0.54, 5.95, z),
      new THREE.Vector3(SCENE_X + PANEL_WIDTH, WALL_TOP, z),
      new THREE.Vector3(SCENE_X + PANEL_WIDTH, 0.3, z),
    ], false, "catmullrom", 0.12);
  }), [stations]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((rib, index) => {
      const reveal = smoother((progressRef.current - 0.44 - index / stations * 0.28) * 4.4);
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.35 * breathing + index * 0.7) * 0.006 * breathing;
      rib.scale.set(breath, reveal, breath);
      rib.material.opacity = reveal * 0.74;
    });
  });

  return (
    <group ref={group}>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 72, 0.034, 7, false]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#fff4d3" : "#d5a85d"}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function RoseWindow({ progressRef, glow }) {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const reveal = smoother((progressRef.current - 0.64) * 3.2);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, reveal, 5, delta));
    group.current.rotation.z = state.clock.elapsedTime * 0.035;
  });

  return (
    <group ref={group} position={[SCENE_X, 4.15, FRONT_Z + 1.28]} scale={0.001}>
      {[0.46, 0.88, 1.36].map((radius, index) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.025 + index * 0.008, 7, 96]} />
          <meshBasicMaterial color={index === 1 ? "#ffd58a" : "#fff4d0"} toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: 16 }, (_, index) => (
        <mesh key={index} rotation={[0, 0, index * Math.PI / 8]} position={[0, 0, 0]}>
          <boxGeometry args={[2.72, 0.018, 0.025]} />
          <meshBasicMaterial color="#e4b969" transparent opacity={0.76} toneMapped={false} />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.31, 1]} />
        <meshBasicMaterial color="#fff7dc" toneMapped={false} />
      </mesh>
      <pointLight color="#ffd091" intensity={18 * glow} distance={18} decay={1.8} />
    </group>
  );
}

function InnerLattice({ activeStation, speed }) {
  const group = useRef();
  const targetScale = activeStation >= 0 ? 1 : 0;

  useFrame((state, delta) => {
    if (!group.current) return;
    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 5.5, delta);
    group.current.scale.setScalar(scale);
    group.current.rotation.x += delta * 0.16 * speed;
    group.current.rotation.y -= delta * 0.24 * speed;
    group.current.children.forEach((child, index) => {
      if (child.isMesh) child.rotation.z = state.clock.elapsedTime * (0.08 + index * 0.035) * speed;
    });
  });

  return (
    <group
      ref={group}
      position={[SCENE_X, 3.35, FRONT_Z - Math.max(0, activeStation) * SECTION_DEPTH]}
      scale={0.001}
    >
      <mesh>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshBasicMaterial color="#ffce77" wireframe transparent opacity={0.82} toneMapped={false} />
      </mesh>
      {[1.5, 1.92, 2.35].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.55, index * 0.8, 0]}>
          <torusGeometry args={[radius, 0.018, 6, 96]} />
          <meshBasicMaterial color={index === 1 ? "#fff3cf" : "#d7a650"} transparent opacity={0.68} toneMapped={false} />
        </mesh>
      ))}
      <pointLight color="#ffbd68" intensity={28} distance={11} decay={1.7} />
    </group>
  );
}

function LightShafts({ progressRef, glow }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const reveal = smoother((progressRef.current - 0.7) * 3.5);
    group.current.children.forEach((shaft, index) => {
      shaft.material.opacity = reveal * (0.025 + glow * 0.035) * (0.75 + Math.sin(state.clock.elapsedTime * 0.24 + index) * 0.2);
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((index) => (
        <mesh
          key={index}
          position={[SCENE_X + (index % 2 ? 1.5 : -1.5), 4.8, -2.5 - index * 5.1]}
          rotation={[0, 0, index % 2 ? -0.16 : 0.16]}
        >
          <cylinderGeometry args={[0.22, 1.65, 9.2, 24, 1, true]} />
          <meshBasicMaterial
            color="#ffe3a8"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CathedralScene({ settings, interactionRef, onFormed }) {
  const complexity = THREE.MathUtils.clamp(settings.foldComplexity ?? 78, 40, 100);
  const paperGlow = THREE.MathUtils.clamp(settings.paperGlow ?? 92, 20, 150) / 100;
  const dust = THREE.MathUtils.clamp(settings.dust ?? 70, 20, 100) / 100;
  const breathing = THREE.MathUtils.clamp(settings.breathing ?? 0.8, 0.2, 2);
  const scrollTravel = THREE.MathUtils.clamp(settings.scrollTravel ?? 100, 40, 160) / 100;
  const speed = Math.max(0.05, settings.speed ?? 1);
  const stations = Math.round(7 + complexity * 0.07);
  const specs = useMemo(() => buildPanelSpecs(stations), [stations]);
  const geometry = useMemo(createTriangleGeometry, []);
  const mesh = useRef();
  const sheet = useRef();
  const progressRef = useRef(0);
  const formedRef = useRef(false);
  const activeStationRef = useRef(-1);
  const [activeStation, setActiveStation] = useState(-1);
  const { material, glow } = usePaperMaterial(paperGlow);

  useEffect(() => () => {
    geometry.boundsTree?.dispose?.();
    geometry.dispose();
  }, [geometry]);

  useEffect(() => {
    activeStationRef.current = activeStation;
  }, [activeStation]);

  const revealFold = useCallback((event) => {
    event.stopPropagation();
    if (event.instanceId == null || progressRef.current < 0.82) return;
    const station = specs[event.instanceId]?.station ?? -1;
    setActiveStation((current) => current === station ? -1 : station);
  }, [specs]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime * speed;
    const intro = saturate(elapsed / choreography.value.duration);
    const easedIntro = smoother(intro);
    progressRef.current = intro;
    theatreSheet.sequence.position = intro * choreography.value.duration;

    if (intro >= 0.999 && !formedRef.current) {
      formedRef.current = true;
      onFormed();
    }

    const interaction = interactionRef.current;
    interaction.scroll = THREE.MathUtils.damp(interaction.scroll, interaction.scrollTarget, 4.5, delta);
    interaction.yaw = THREE.MathUtils.damp(interaction.yaw, interaction.yawTarget, 5, delta);
    interaction.pitch = THREE.MathUtils.damp(interaction.pitch, interaction.pitchTarget, 5, delta);

    if (intro < 0.999) {
      const cameraEase = smoother(intro);
      state.camera.position.set(
        SCENE_X + THREE.MathUtils.lerp(0.15, 1.8, cameraEase),
        THREE.MathUtils.lerp(0.72, 3.65, cameraEase),
        THREE.MathUtils.lerp(choreography.value.cameraStartZ, choreography.value.cameraEndZ, cameraEase),
      );
      state.camera.fov = THREE.MathUtils.lerp(34, 48, cameraEase);
      state.camera.updateProjectionMatrix();
      state.camera.lookAt(
        SCENE_X,
        THREE.MathUtils.lerp(0.2, 3.55, cameraEase),
        THREE.MathUtils.lerp(2.2, -7.5, cameraEase),
      );
    } else {
      const maxTravel = Math.min(stations * SECTION_DEPTH - 5, 24) * scrollTravel;
      const z = choreography.value.cameraEndZ - interaction.scroll * maxTravel;
      const pointerX = state.pointer.x * 0.28;
      const pointerY = state.pointer.y * 0.16;
      state.camera.position.set(
        SCENE_X + 1.8 + pointerX,
        3.65 + pointerY,
        z,
      );
      const lookDistance = 7.8;
      state.camera.lookAt(
        SCENE_X + Math.sin(interaction.yaw) * 4.8,
        3.55 + Math.sin(interaction.pitch) * 2.6,
        z - Math.cos(interaction.yaw) * lookDistance,
      );
    }

    glow.value = THREE.MathUtils.damp(
      glow.value,
      paperGlow * (0.8 + easedIntro * 0.35),
      3.5,
      delta,
    );

    if (sheet.current) {
      sheet.current.material.opacity = smoother(1 - intro * 5.2);
      sheet.current.visible = sheet.current.material.opacity > 0.004;
      sheet.current.rotation.z = Math.sin(elapsed * 0.22) * 0.012;
    }

    if (!mesh.current) return;
    specs.forEach((spec, index) => {
      const local = smoother((easedIntro - spec.delay) / Math.max(0.001, 1 - spec.delay));
      tempPosition.lerpVectors(spec.startPosition, spec.center, local);
      tempQuaternion.slerpQuaternions(spec.startQuaternion, spec.quaternion, local);
      tempScale.lerpVectors(spec.startScale, spec.scale, local);

      if (intro > 0.99) {
        const breath = Math.sin(elapsed * 0.34 * breathing + spec.station * 0.73 + index * 0.09);
        tempPosition.y += breath * 0.018 * breathing;
        if (spec.station === activeStationRef.current && spec.kind !== "floor") {
          panelNormal.set(0, 0, 1).applyQuaternion(spec.quaternion);
          tempPosition.addScaledVector(panelNormal, 0.38 + Math.abs(breath) * 0.11);
          tempScale.multiplyScalar(0.94);
        }
      }

      tempObject.position.copy(tempPosition);
      tempObject.quaternion.copy(tempQuaternion);
      tempObject.scale.copy(tempScale);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(index, tempObject.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.055 + paperGlow * 0.05} />
      <directionalLight color="#fff1d2" intensity={2.4 * paperGlow} position={[SCENE_X - 6, 12, 9]} />
      <pointLight color="#ffb958" intensity={16 * paperGlow} distance={32} decay={1.65} position={[SCENE_X, 5.8, -8]} />
      <pointLight color="#fff3ce" intensity={12 * paperGlow} distance={24} decay={1.8} position={[SCENE_X, 6.5, -22]} />

      <mesh ref={sheet} position={[SCENE_X, 0.15, 2.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.3, 5.25, 28, 20]} />
        <primitive object={material} attach="material" />
      </mesh>

      <instancedMesh
        ref={mesh}
        args={[geometry, material, specs.length]}
        frustumCulled={false}
        onClick={revealFold}
      />

      <VaultRibs stations={stations} progressRef={progressRef} breathing={breathing} />
      <RoseWindow progressRef={progressRef} glow={paperGlow} />
      <InnerLattice activeStation={activeStation} speed={speed} />
      <LightShafts progressRef={progressRef} glow={paperGlow} />
      <PaperDust amount={dust} speed={speed} />
    </>
  );
}

async function createWebGPURenderer(props) {
  const renderer = new THREE.WebGPURenderer({
    ...props,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  await renderer.init();
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  return renderer;
}

export default function ImpossibleOrigamiCathedral({ settings = {} }) {
  const interactionRef = useRef({
    scroll: 0,
    scrollTarget: 0,
    yaw: 0,
    yawTarget: 0,
    pitch: 0,
    pitchTarget: 0,
    dragging: false,
    moved: false,
    x: 0,
    y: 0,
  });
  const [formed, setFormed] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleWheel = useCallback((event) => {
    const interaction = interactionRef.current;
    interaction.scrollTarget = THREE.MathUtils.clamp(
      interaction.scrollTarget + event.deltaY * 0.00062,
      0,
      1,
    );
  }, []);

  const handlePointerDown = useCallback((event) => {
    const interaction = interactionRef.current;
    interaction.dragging = true;
    interaction.moved = false;
    interaction.x = event.clientX;
    interaction.y = event.clientY;
    setDragging(true);
  }, []);

  const handlePointerMove = useCallback((event) => {
    const interaction = interactionRef.current;
    if (!interaction.dragging) return;
    const dx = event.clientX - interaction.x;
    const dy = event.clientY - interaction.y;
    interaction.x = event.clientX;
    interaction.y = event.clientY;
    if (Math.abs(dx) + Math.abs(dy) > 2) interaction.moved = true;
    interaction.yawTarget = THREE.MathUtils.clamp(interaction.yawTarget - dx * 0.0025, -0.42, 0.42);
    interaction.pitchTarget = THREE.MathUtils.clamp(interaction.pitchTarget + dy * 0.0019, -0.24, 0.24);
  }, []);

  const handlePointerUp = useCallback(() => {
    interactionRef.current.dragging = false;
    setDragging(false);
  }, []);

  return (
    <section
      className={`atmosphere origami-cathedral-pro ${formed ? "is-formed" : "is-folding"} ${dragging ? "is-dragging" : ""}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ "--experiment-accent": "#e8bd76" }}
    >
      <Canvas
        className="origami-cathedral-pro__canvas"
        gl={createWebGPURenderer}
        dpr={WEBGL_DPR}
        camera={{ position: [SCENE_X, 0.72, 4.1], fov: 34, near: 0.045, far: 180 }}
        onCreated={({ raycaster }) => {
          raycaster.firstHitOnly = true;
        }}
      >
        <color attach="background" args={["#030201"]} />
        <fogExp2 attach="fog" args={["#050301", 0.016]} />
        <Suspense fallback={null}>
          <CathedralScene
            settings={settings}
            interactionRef={interactionRef}
            onFormed={() => setFormed(true)}
          />
        </Suspense>
      </Canvas>

      <div className="origami-cathedral-pro__veil" />
      <div className="origami-cathedral-pro__title" aria-hidden="true">
        <span>The Impossible</span>
        <strong>Origami Cathedral</strong>
      </div>
      <div className="origami-cathedral-pro__prompt" aria-hidden="true">
        <i />
        <span>{formed ? "Scroll both ways · drag · touch a wall" : "The first fold is beginning"}</span>
      </div>
    </section>
  );
}
