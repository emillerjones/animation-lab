import { useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import { acceleratedRaycast, MeshBVH } from "three-mesh-bvh";
import gsap from "gsap";
import * as THREE from "three";
import { MeshBasicNodeMaterial, PostProcessing, WebGPURenderer } from "three/webgpu";
import { color, mix, pass, sin, time, uniform, uv } from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { WEBGL_DPR_MAX } from "../rendering/quality";
import "./CityThatBuildsItself.css";

const CITY_SIDE = 19;
const MAX_BUILDINGS = CITY_SIDE * CITY_SIDE;
const theatreProject = getProject("The City That Builds Itself", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = theatreProject.sheet("Continuous Assembly");
theatreSheet.object("Construction Director", {
  gridExpansion: 0,
  towerWave: 0,
  bridgeReveal: 0,
  transitEnergy: 0,
  corruption: 0,
});

const clamp01 = (value) => THREE.MathUtils.clamp(value, 0, 1);
const hash = (x, z) => {
  const value = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

function createCityData() {
  const buildings = [];
  const half = (CITY_SIDE - 1) / 2;
  for (let gx = 0; gx < CITY_SIDE; gx += 1) {
    for (let gz = 0; gz < CITY_SIDE; gz += 1) {
      const xIndex = gx - half;
      const zIndex = gz - half;
      const seed = hash(gx, gz);
      const distance = Math.hypot(xIndex, zIndex) / (half * 1.42);
      const avenue = gx % 4 === 1 || gz % 4 === 1;
      const centerBoost = Math.pow(1 - Math.min(distance, 1), 1.65);
      buildings.push({
        x: xIndex * 3.85 + (hash(gx + 8, gz) - 0.5) * 0.48,
        z: zIndex * 3.85 + (hash(gx, gz + 17) - 0.5) * 0.48,
        width: avenue ? 1.25 + seed * 0.55 : 1.65 + seed * 0.9,
        depth: avenue ? 1.2 + hash(gx + 2, gz + 3) * 0.65 : 1.6 + hash(gx + 2, gz + 3) * 0.85,
        height: avenue ? 2.8 + seed * 7 : 4 + seed * 13 + centerBoost * 20,
        distance,
        seed,
        phase: hash(gx + 42, gz + 91) * Math.PI * 2,
        avenue,
      });
    }
  }
  return buildings.sort((a, b) => a.distance - b.distance);
}

function makeRoadMaterial(energyUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const pulse = sin(uv().y.mul(72).sub(time.mul(energyUniform))).mul(0.5).add(0.5).pow(10);
  material.colorNode = mix(color("#06444c"), color("#8affef"), pulse);
  material.opacityNode = pulse.mul(0.82).add(0.08);
  return material;
}

function makeHologramMaterial() {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const scan = sin(uv().y.mul(110).sub(time.mul(3.2))).mul(0.5).add(0.5).pow(7);
  material.colorNode = mix(color("#042d38"), color("#8bf8ff"), scan);
  material.opacityNode = scan.mul(0.36).add(0.035);
  return material;
}

function makeRain(count) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;
    positions[i3] = (Math.random() - 0.5) * 105;
    positions[i3 + 1] = Math.random() * 40;
    positions[i3 + 2] = (Math.random() - 0.5) * 105;
    speeds[index] = 15 + Math.random() * 25;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.userData.speeds = speeds;
  const material = new THREE.PointsMaterial({
    color: "#aeefff",
    size: 0.048,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  return { points: new THREE.Points(geometry, material), geometry, material };
}

function buildCity(canvas, host, settingsRef, report) {
  let disposed = false;
  let frame = 0;
  const clock = new THREE.Clock();
  const disposables = [];
  const transient = new Set();
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const dummy = new THREE.Object3D();
  const buildingData = createCityData();
  const state = {
    progress: 0.07,
    velocity: 0,
    autoReveal: 0,
    holding: false,
    corrupted: false,
    selected: new Map(),
    pointerDownAt: 0,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#010305");
  scene.fog = new THREE.FogExp2("#02080b", 0.018);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.08, 260);
  camera.position.set(0, 7.5, 34);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.86;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight("#6bb7c7", "#030203", 0.5));
  const keyLight = new THREE.DirectionalLight("#b8fff6", 3.2);
  keyLight.position.set(-15, 28, 14);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const cityRoot = new THREE.Group();
  scene.add(cityRoot);

  const floorGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
  floorGeometry.rotateX(-Math.PI / 2);
  floorGeometry.boundsTree = new MeshBVH(floorGeometry);
  const floorMaterial = new THREE.MeshPhysicalMaterial({
    color: "#020708",
    metalness: 0.94,
    roughness: 0.17,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.raycast = acceleratedRaycast;
  floor.receiveShadow = true;
  cityRoot.add(floor);
  disposables.push(floorGeometry, floorMaterial);

  const roadEnergyUniform = uniform(3.2);
  const roadMaterial = makeRoadMaterial(roadEnergyUniform);
  const roadGeometry = new THREE.PlaneGeometry(0.12, 170, 1, 1);
  const roadGroup = new THREE.Group();
  roadGroup.position.y = 0.025;
  cityRoot.add(roadGroup);
  for (let index = -11; index <= 11; index += 1) {
    const offset = index * 3.85;
    const vertical = new THREE.Mesh(roadGeometry, roadMaterial);
    vertical.rotation.x = -Math.PI / 2;
    vertical.position.x = offset;
    roadGroup.add(vertical);
    const horizontal = new THREE.Mesh(roadGeometry, roadMaterial);
    horizontal.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    horizontal.position.z = offset;
    roadGroup.add(horizontal);
  }
  disposables.push(roadGeometry, roadMaterial);

  const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: "#061014",
    metalness: 0.82,
    roughness: 0.3,
    emissive: "#06242b",
    emissiveIntensity: 0.5,
    vertexColors: true,
  });
  const buildings = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, MAX_BUILDINGS);
  buildings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  buildings.castShadow = true;
  buildings.receiveShadow = true;
  buildingData.forEach((building, index) => {
    const tint = new THREE.Color().setHSL(0.49 + building.seed * 0.055, 0.52, 0.1 + building.seed * 0.055);
    buildings.setColorAt(index, tint);
  });
  cityRoot.add(buildings);
  disposables.push(buildingGeometry, buildingMaterial);

  const windowPositions = [];
  const windowMeta = [];
  buildingData.forEach((building, buildingIndex) => {
    const rows = Math.min(15, Math.max(2, Math.floor(building.height / 1.1)));
    for (let row = 0; row < rows; row += 1) {
      if (hash(buildingIndex, row) < 0.25) continue;
      windowPositions.push(building.x, 0.65 + row * 0.85, building.z + building.depth * 0.505);
      windowMeta.push(buildingIndex, row, building.phase);
    }
  });
  const windowGeometry = new THREE.BufferGeometry();
  windowGeometry.setAttribute("position", new THREE.Float32BufferAttribute(windowPositions, 3));
  windowGeometry.userData.meta = windowMeta;
  const windowMaterial = new THREE.PointsMaterial({
    color: "#8fffe7",
    size: 0.105,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const windows = new THREE.Points(windowGeometry, windowMaterial);
  cityRoot.add(windows);
  disposables.push(windowGeometry, windowMaterial);

  const transitCount = 950;
  const transitPositions = new Float32Array(transitCount * 3);
  const transitMeta = new Float32Array(transitCount * 4);
  for (let index = 0; index < transitCount; index += 1) {
    const i3 = index * 3;
    const i4 = index * 4;
    const axis = index % 2;
    const lane = (Math.floor(Math.random() * 17) - 8) * 3.85;
    const along = (Math.random() - 0.5) * 100;
    transitPositions[i3] = axis ? along : lane;
    transitPositions[i3 + 1] = 0.12 + Math.random() * 0.16;
    transitPositions[i3 + 2] = axis ? lane : along;
    transitMeta[i4] = axis;
    transitMeta[i4 + 1] = lane;
    transitMeta[i4 + 2] = along;
    transitMeta[i4 + 3] = 0.5 + Math.random() * 1.4;
  }
  const transitGeometry = new THREE.BufferGeometry();
  transitGeometry.setAttribute("position", new THREE.BufferAttribute(transitPositions, 3));
  transitGeometry.userData.meta = transitMeta;
  const transitMaterial = new THREE.PointsMaterial({
    color: "#72f6ff",
    size: 0.075,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const transit = new THREE.Points(transitGeometry, transitMaterial);
  cityRoot.add(transit);
  disposables.push(transitGeometry, transitMaterial);

  const hologramMaterial = makeHologramMaterial();
  const hologramGeometry = new THREE.CylinderGeometry(0.04, 1.2, 22, 28, 1, true);
  const holograms = [];
  [
    [-17, 12, -19],
    [18, 9, -12],
    [-8, 16, -30],
    [24, 13, -27],
  ].forEach(([x, y, z], index) => {
    const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
    hologram.position.set(x, y / 2, z);
    hologram.scale.setScalar(0.65 + index * 0.12);
    cityRoot.add(hologram);
    holograms.push(hologram);
  });
  disposables.push(hologramGeometry, hologramMaterial);

  const rain = makeRain(9500);
  scene.add(rain.points);
  disposables.push(rain.geometry, rain.material);

  const cameraPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 7.5, 34),
    new THREE.Vector3(-14, 5.7, 18),
    new THREE.Vector3(9, 9, 2),
    new THREE.Vector3(-8, 13, -17),
    new THREE.Vector3(12, 19, -37),
    new THREE.Vector3(0, 30, -58),
  ], false, "catmullrom", 0.38);
  const cameraLookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 5, 3),
    new THREE.Vector3(-6, 6, -2),
    new THREE.Vector3(4, 8, -15),
    new THREE.Vector3(0, 10, -30),
    new THREE.Vector3(0, 13, -50),
    new THREE.Vector3(0, 11, -80),
  ]);

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 0.76, 0.32, 0.85);
  const post = new PostProcessing(renderer);
  post.outputNode = sceneColor.add(bloomPass);

  function resize() {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  function updatePointer(event) {
    const rect = host.getBoundingClientRect();
    pointerTarget.setX(((event.clientX - rect.left) / rect.width) * 2 - 1);
    if (event.pointerType !== "touch") {
      pointerTarget.setY(-((event.clientY - rect.top) / rect.height) * 2 + 1);
    }
  }

  function createShockwave(point, strong = false) {
    const geometry = new THREE.RingGeometry(0.7, 0.77, 96);
    const material = new THREE.MeshBasicMaterial({
      color: strong ? "#ff467e" : "#7effed",
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 2;
    wave.position.copy(point).setY(0.09);
    cityRoot.add(wave);
    transient.add(wave);
    gsap.to(wave.scale, { x: strong ? 24 : 13, y: strong ? 24 : 13, duration: strong ? 1.8 : 1.2, ease: "power2.out" });
    gsap.to(material, {
      opacity: 0,
      duration: strong ? 1.8 : 1.2,
      ease: "power1.in",
      onComplete: () => {
        cityRoot.remove(wave);
        transient.delete(wave);
        geometry.dispose();
        material.dispose();
      },
    });
  }

  function pick(event) {
    updatePointer(event);
    pointer.copy(pointerTarget);
    raycaster.setFromCamera(pointer, camera);
    const buildingHit = raycaster.intersectObject(buildings, false)[0];
    if (buildingHit?.instanceId != null) {
      state.selected.set(buildingHit.instanceId, 0.001);
      const building = buildingData[buildingHit.instanceId];
      createShockwave(new THREE.Vector3(building.x, 0, building.z));
      return;
    }
    const groundHit = raycaster.intersectObject(floor, false)[0];
    if (groundHit) createShockwave(groundHit.point, state.holding);
  }

  function onPointerMove(event) {
    updatePointer(event);
    if (state.holding && frame % 7 === 0) pick(event);
  }

  function onPointerDown(event) {
    state.holding = true;
    state.pointerDownAt = performance.now();
    host.setPointerCapture?.(event.pointerId);
    pick(event);
  }

  function onPointerUp(event) {
    state.holding = false;
    host.releasePointerCapture?.(event.pointerId);
  }

  function onDoubleClick(event) {
    updatePointer(event);
    state.corrupted = !state.corrupted;
    const rect = host.getBoundingClientRect();
    raycaster.setFromCamera(pointerTarget, camera);
    const hit = raycaster.intersectObject(floor, false)[0];
    createShockwave(hit?.point || new THREE.Vector3(), true);
  }

  function onWheel(event) {
    event.preventDefault();
    state.velocity += THREE.MathUtils.clamp(event.deltaY, -180, 180) * 0.0039;
  }

  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);
  host.addEventListener("dblclick", onDoubleClick);
  host.addEventListener("wheel", onWheel, { passive: false });

  function updateBuildings(elapsed, delta, reveal, corruption, density) {
    const visibleCount = Math.floor(MAX_BUILDINGS * THREE.MathUtils.lerp(0.28, 1, density));
    buildingData.forEach((building, index) => {
      const selected = state.selected.get(index) || 0;
      const localReveal = clamp01((reveal * 1.42 - building.distance * 0.68 - building.seed * 0.18) * 2.4);
      const eased = localReveal * localReveal * (3 - 2 * localReveal);
      const hidden = index >= visibleCount;
      const glitchGate = corruption > 0.03 && hash(index, Math.floor(elapsed * 3)) < corruption * 0.12;
      const glitch = glitchGate ? corruption * (hash(index + 9, Math.floor(elapsed * 8)) - 0.5) : 0;
      const open = selected > 0 ? Math.sin(selected * Math.PI) : 0;
      dummy.position.set(
        building.x + glitch * 3 + open * Math.sign(building.x || 1) * 0.7,
        hidden ? -20 : building.height * eased * 0.5 - (1 - eased) * 1.8,
        building.z + glitch * 2,
      );
      dummy.rotation.set(glitch * 0.32, glitch * 1.4 + open * 0.12, glitch * 0.18);
      dummy.scale.set(
        hidden ? 0.001 : building.width * (1 + open * 0.18),
        hidden ? 0.001 : Math.max(0.015, building.height * eased),
        hidden ? 0.001 : building.depth * (1 + open * 0.18),
      );
      dummy.updateMatrix();
      buildings.setMatrixAt(index, dummy.matrix);
      if (selected > 0) {
        const next = selected + delta * 0.52;
        if (next >= 1) state.selected.delete(index);
        else state.selected.set(index, next);
      }
    });
    buildings.instanceMatrix.needsUpdate = true;
  }

  function updateRain(delta, rainDensity) {
    const positions = rain.geometry.attributes.position.array;
    const speeds = rain.geometry.userData.speeds;
    const activeCount = Math.floor(speeds.length * rainDensity);
    rain.geometry.setDrawRange(0, activeCount);
    for (let index = 0; index < activeCount; index += 1) {
      const i3 = index * 3;
      positions[i3 + 1] -= speeds[index] * delta;
      positions[i3] += delta * 2.4;
      if (positions[i3 + 1] < 0) {
        positions[i3 + 1] = 32 + Math.random() * 12;
        positions[i3] = (Math.random() - 0.5) * 105;
        positions[i3 + 2] = (Math.random() - 0.5) * 105;
      }
    }
    rain.geometry.attributes.position.needsUpdate = true;
  }

  function updateTransit(delta, energy) {
    const positions = transit.geometry.attributes.position.array;
    const meta = transit.geometry.userData.meta;
    for (let index = 0; index < transitCount; index += 1) {
      const i3 = index * 3;
      const i4 = index * 4;
      meta[i4 + 2] += delta * meta[i4 + 3] * energy;
      if (meta[i4 + 2] > 52) meta[i4 + 2] = -52;
      if (meta[i4] > 0.5) positions[i3] = meta[i4 + 2];
      else positions[i3 + 2] = meta[i4 + 2];
    }
    transit.geometry.attributes.position.needsUpdate = true;
  }

  async function animate() {
    await renderer.init();
    if (disposed) return;
    renderer.setAnimationLoop(() => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.elapsedTime;
      const settings = settingsRef.current;
      const speed = settings.speed ?? 1;
      const density = THREE.MathUtils.clamp((settings.cityDensity ?? 78) / 100, 0.3, 1);
      const buildRate = settings.buildRate ?? 0.9;
      const rainDensity = THREE.MathUtils.clamp((settings.rainDensity ?? 55) / 100, 0, 1);
      const roadEnergy = (settings.roadEnergy ?? 100) / 100;
      const corruptionSetting = THREE.MathUtils.clamp((settings.corruption ?? 35) / 100, 0, 1);

      state.autoReveal = Math.min(1, state.autoReveal + delta * 0.055 * buildRate * speed);
      state.velocity *= Math.exp(-delta * 4.2);
      state.progress = THREE.MathUtils.clamp(state.progress + state.velocity * speed * delta, 0, 1);
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 4));
      const sequenceStage = Math.max(state.autoReveal, state.progress) * 14;
      theatreSheet.sequence.position = Math.min(sequenceStage, 10);
      const reveal = THREE.MathUtils.smoothstep(sequenceStage, 0.3, 12.5);
      const corruption = corruptionSetting * (state.corrupted ? 1 : 0.12);

      updateBuildings(elapsed, delta, reveal, corruption, density);
      updateRain(delta * speed, rainDensity);
      updateTransit(delta * speed, THREE.MathUtils.lerp(5, 18, roadEnergy));
      roadEnergyUniform.value = THREE.MathUtils.lerp(2.2, 8.5, roadEnergy);

      const pathPosition = cameraPath.getPointAt(state.progress);
      const lookPosition = cameraLookPath.getPointAt(state.progress);
      camera.position.lerp(
        pathPosition.add(new THREE.Vector3(pointer.x * 1.25, pointer.y * 0.6, 0)),
        1 - Math.exp(-delta * 3.8),
      );
      camera.lookAt(lookPosition.x + pointer.x * 1.1, lookPosition.y + pointer.y * 0.5, lookPosition.z);
      cityRoot.rotation.y = Math.sin(elapsed * 0.06) * 0.006 + corruption * Math.sin(elapsed * 9) * 0.007;
      holograms.forEach((hologram, index) => {
        hologram.rotation.y = elapsed * (0.07 + index * 0.012);
        hologram.scale.y = 0.7 + reveal * 0.3;
      });
      windowMaterial.opacity = 0.58 + Math.sin(elapsed * 2.2) * 0.12 + roadEnergy * 0.22;
      renderer.toneMappingExposure = 0.74 + roadEnergy * 0.18;

      frame += 1;
      if (frame % 18 === 0) {
        report({
          progress: state.progress,
          stage: state.corrupted ? "DISTRICT INSTABILITY" : reveal < 0.98 ? "CITY ASSEMBLING" : "CITY ONLINE",
          districts: Math.round(visibleCountFor(density)),
          corrupted: state.corrupted,
        });
      }
      post.render();
    });
  }

  const visibleCountFor = (density) => MAX_BUILDINGS * THREE.MathUtils.lerp(0.28, 1, density);
  animate().catch((error) => report({ error: error.message }));

  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointerup", onPointerUp);
    host.removeEventListener("pointercancel", onPointerUp);
    host.removeEventListener("dblclick", onDoubleClick);
    host.removeEventListener("wheel", onWheel);
    transient.forEach((mesh) => {
      gsap.killTweensOf(mesh.scale);
      gsap.killTweensOf(mesh.material);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    floorGeometry.disposeBoundsTree?.();
    disposables.forEach((item) => item.dispose?.());
    post.dispose?.();
    renderer.dispose();
  };
}

export default function CityThatBuildsItself({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const [telemetry, setTelemetry] = useState({
    progress: 0.07,
    stage: "GRID GENESIS",
    districts: 0,
    corrupted: false,
  });

  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildCity(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  return (
    <section
      ref={hostRef}
      className={`city-builds-itself ${telemetry.corrupted ? "is-corrupted" : ""}`}
      aria-label="Interactive procedural city constructing itself"
    >
      <canvas ref={canvasRef} className="city-builds-itself__canvas" />
      <div className="city-builds-itself__atmosphere" aria-hidden="true" />
      <div className="city-builds-itself__grain" aria-hidden="true" />

      <div className="city-builds-itself__copy">
        <p>ADVANCED STUDY — SELF-ASSEMBLING URBANISM</p>
        <h1>The city<br />writes itself.</h1>
        <span>Scroll to fly. Click to open a tower. Double-click to corrupt the grid.</span>
      </div>

      <div className="city-builds-itself__telemetry" aria-hidden="true">
        <span>{telemetry.stage}</span>
        <i style={{ "--city-progress": telemetry.progress }} />
        <small>{telemetry.districts} STRUCTURES / LIVE GENERATION</small>
      </div>

      <div className="city-builds-itself__coordinate" aria-hidden="true">
        <b>∞</b>
        <span>DISTRICT<br />LIMIT</span>
      </div>

      {telemetry.error && (
        <div className="city-builds-itself__error" role="status">
          Renderer initialization failed<br /><small>{telemetry.error}</small>
        </div>
      )}
    </section>
  );
}
