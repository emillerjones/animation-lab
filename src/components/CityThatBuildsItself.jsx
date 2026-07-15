import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MeshBasicNodeMaterial, PostProcessing, WebGPURenderer } from "three/webgpu";
import { color, mix, pass, sin, time, uniform, uv } from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { createDragOrbit } from "../utils/dragOrbit";
import { WEBGL_DPR_MAX } from "../rendering/quality";
import "./CityThatBuildsItself.css";

const CITY_SIDE = 19;
const MAX_BUILDINGS = CITY_SIDE * CITY_SIDE;

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
        lifeOffset: hash(gx + 73, gz + 29),
        lifeSpan: 13 + hash(gx + 19, gz + 67) * 11,
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
  const dummy = new THREE.Object3D();
  const dragOrbit = createDragOrbit(host, { yawSpeed: 0.0052, pitchSpeed: 0.0034, pitchMin: -0.32, pitchMax: 0.48 });
  const buildingData = createCityData();
  const orbitTarget = new THREE.Vector3(0, 8, 0);
  const orbitPosition = new THREE.Vector3();
  const state = {
    progress: 0,
    orbitYaw: 0,
    orbitPitch: 0.08,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#02080c");
  scene.fog = new THREE.FogExp2("#06141a", 0.004);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.08, 260);
  camera.position.set(0, 19, 42);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight("#9eefff", "#071014", 1.35));
  const keyLight = new THREE.DirectionalLight("#d9fffa", 3.8);
  keyLight.position.set(-15, 28, 14);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight("#4ea7ff", 1.8);
  rimLight.position.set(22, 15, -32);
  scene.add(rimLight);

  const cityRoot = new THREE.Group();
  cityRoot.scale.setScalar(0.82);
  scene.add(cityRoot);

  const floorGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
  floorGeometry.rotateX(-Math.PI / 2);
  const floorMaterial = new THREE.MeshPhysicalMaterial({
    color: "#07171b",
    metalness: 0.72,
    roughness: 0.28,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
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
    color: "#24434a",
    metalness: 0.58,
    roughness: 0.36,
    emissive: "#0d3940",
    emissiveIntensity: 0.95,
    vertexColors: true,
  });
  const buildings = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, MAX_BUILDINGS);
  buildings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  buildings.castShadow = true;
  buildings.receiveShadow = true;
  buildingData.forEach((building, index) => {
    const tint = new THREE.Color().setHSL(0.48 + building.seed * 0.055, 0.42, 0.28 + building.seed * 0.12);
    buildings.setColorAt(index, tint);
  });
  cityRoot.add(buildings);
  disposables.push(buildingGeometry, buildingMaterial);

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

  const rain = makeRain(9500);
  scene.add(rain.points);
  disposables.push(rain.geometry, rain.material);

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 0.52, 0.38, 0.82);
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

  function updateBuildings(elapsed, density, buildRate, turnover) {
    const visibleCount = Math.floor(MAX_BUILDINGS * THREE.MathUtils.lerp(0.28, 1, density));
    buildingData.forEach((building, index) => {
      const hidden = index >= visibleCount;
      const life = (elapsed * buildRate / building.lifeSpan + building.lifeOffset) % 1;
      const heightBias = clamp01((building.height - 10) / 24);
      const growEnd = 0.18 + building.seed * 0.06;
      const matureEnd = 0.76 - turnover * 0.17 - heightBias * 0.08;
      const decayEnd = 0.91;
      let growth = 0;

      if (life < growEnd) {
        const sprout = THREE.MathUtils.smoothstep(life, 0, growEnd);
        growth = sprout * sprout * (3 - 2 * sprout);
      } else if (life < matureEnd) {
        growth = 1;
      } else if (life < decayEnd) {
        const decay = THREE.MathUtils.smoothstep(life, matureEnd, decayEnd);
        growth = THREE.MathUtils.lerp(1, 0.035, decay);
      }

      const currentHeight = building.height * growth;
      const widthGrowth = THREE.MathUtils.lerp(0.32, 1, Math.sqrt(growth));
      dummy.position.set(
        building.x,
        hidden || growth < 0.002 ? -20 : currentHeight * 0.5,
        building.z,
      );
      dummy.rotation.set(0, (building.seed - 0.5) * 0.04, 0);
      dummy.scale.set(
        hidden ? 0.001 : building.width * widthGrowth,
        hidden ? 0.001 : Math.max(0.015, currentHeight),
        hidden ? 0.001 : building.depth * widthGrowth,
      );
      dummy.updateMatrix();
      buildings.setMatrixAt(index, dummy.matrix);
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
      const turnover = THREE.MathUtils.clamp((settings.corruption ?? 35) / 100, 0, 1);

      state.progress = (elapsed * buildRate * speed / 18) % 1;
      updateBuildings(elapsed * speed, density, buildRate, turnover);
      updateRain(delta * speed, rainDensity);
      updateTransit(delta * speed, THREE.MathUtils.lerp(5, 18, roadEnergy));
      roadEnergyUniform.value = THREE.MathUtils.lerp(2.2, 8.5, roadEnergy);

      state.orbitYaw = THREE.MathUtils.damp(state.orbitYaw, dragOrbit.state.targetYaw, 7, delta);
      state.orbitPitch = THREE.MathUtils.damp(state.orbitPitch, dragOrbit.state.targetPitch, 7, delta);
      const radius = 72;
      const cosPitch = Math.cos(state.orbitPitch);
      orbitPosition.set(
        orbitTarget.x + Math.sin(state.orbitYaw) * radius * cosPitch,
        orbitTarget.y + 24 + Math.sin(state.orbitPitch) * 30,
        orbitTarget.z + Math.cos(state.orbitYaw) * radius * cosPitch,
      );
      camera.position.lerp(
        orbitPosition,
        1 - Math.exp(-delta * 7),
      );
      camera.lookAt(orbitTarget);
      renderer.toneMappingExposure = 1.02 + roadEnergy * 0.18;

      frame += 1;
      if (frame % 18 === 0) {
        report({
          progress: state.progress,
          stage: "URBAN ECOSYSTEM / RENEWING",
          districts: Math.round(visibleCountFor(density)),
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
    dragOrbit.dispose();
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
    progress: 0,
    stage: "URBAN ECOSYSTEM / AWAKENING",
    districts: 0,
  });

  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildCity(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  return (
    <section
      ref={hostRef}
      className="city-builds-itself"
      aria-label="A living procedural city growing and renewing itself; drag to orbit"
    >
      <canvas ref={canvasRef} className="city-builds-itself__canvas" />
      <div className="city-builds-itself__atmosphere" aria-hidden="true" />
      <div className="city-builds-itself__grain" aria-hidden="true" />

      <div className="city-builds-itself__copy">
        <p>21 — LIVING URBANISM</p>
        <h1>The city<br />writes itself.</h1>
        <span>Towers sprout, mature, fade, and return. Drag to orbit the living skyline.</span>
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
