import { useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import { acceleratedRaycast, MeshBVH } from "three-mesh-bvh";
import gsap from "gsap";
import * as THREE from "three";
import { MeshBasicNodeMaterial, PostProcessing, WebGPURenderer } from "three/webgpu";
import {
  color,
  mix,
  mx_fractal_noise_float,
  pass,
  sin,
  smoothstep,
  time,
  uniform,
  uv,
  vec2,
  vec3,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { WEBGL_DPR_MAX } from "../rendering/quality";
import "./ColossusAwakens.css";

const theatreProject = getProject("The Colossus Awakens", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = theatreProject.sheet("Awakening and Inner World");
theatreSheet.object("Cinematic Director", {
  approach: 0,
  awakening: 0,
  eyePass: 0,
  gravityFailure: 0,
  finalEye: 0,
});

const clamp01 = (value) => THREE.MathUtils.clamp(value, 0, 1);
const ease = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

function getQualityTier() {
  const cores = navigator.hardwareConcurrency || 6;
  const memory = navigator.deviceMemory || 8;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || cores <= 4 || memory <= 4) return { scale: 0.5, shadows: 512, label: "ADAPTIVE" };
  if (cores <= 8 || memory <= 8) return { scale: 0.72, shadows: 1024, label: "BALANCED" };
  return { scale: 1, shadows: 1536, label: "CINEMATIC" };
}

function makeEyeMaterial(energyUniform, focusUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const centered = uv().sub(vec2(0.5));
  const radius = centered.length();
  const turbulence = mx_fractal_noise_float(
    vec3(centered.mul(9), time.mul(0.42)),
    5,
    2.05,
    0.53,
    1,
  );
  const iris = sin(radius.mul(138).sub(time.mul(3.5)).add(turbulence.mul(20)))
    .mul(0.5)
    .add(0.5)
    .pow(4);
  const pupil = smoothstep(0.075, 0.14, radius).oneMinus();
  const rim = smoothstep(0.26, 0.5, radius).oneMinus().mul(smoothstep(0.08, 0.18, radius));
  const eyeColor = mix(color("#7c160d"), color("#ff6d1b"), iris)
    .mix(color("#fff5c7"), pupil.add(focusUniform.mul(0.28)));
  material.colorNode = eyeColor.mul(energyUniform);
  material.opacityNode = rim.mul(iris.mul(0.62).add(0.38)).add(pupil);
  return material;
}

function makeEnergyMaterial(energyUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const flow = sin(uv().x.mul(90).sub(time.mul(4.2))).mul(0.5).add(0.5).pow(8);
  material.colorNode = mix(color("#381109"), color("#ffd384"), flow).mul(energyUniform);
  material.opacityNode = flow.mul(0.72).add(0.07);
  return material;
}

function createSand(count) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;
    positions[i3] = (Math.random() - 0.5) * 150;
    positions[i3 + 1] = Math.random() * 2.3;
    positions[i3 + 2] = -95 + Math.random() * 145;
    speeds[index] = 1.5 + Math.random() * 5.5;
    phases[index] = Math.random() * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.userData.speeds = speeds;
  geometry.userData.phases = phases;
  const material = new THREE.PointsMaterial({
    color: "#ad7d43",
    size: 0.045,
    transparent: true,
    opacity: 0.54,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  return { points: new THREE.Points(geometry, material), geometry, material };
}

function addBVHInteraction(mesh, kind, interactives, disposables) {
  mesh.geometry.boundsTree = new MeshBVH(mesh.geometry);
  mesh.raycast = acceleratedRaycast;
  mesh.userData.kind = kind;
  interactives.push(mesh);
  disposables.push(mesh.geometry, mesh.material);
  return mesh;
}

function createColossus(energyUniform, focusUniform, interactives, disposables) {
  const root = new THREE.Group();
  root.position.set(0, -19, -31);

  const darkMetal = new THREE.MeshStandardMaterial({
    color: "#090807",
    metalness: 0.94,
    roughness: 0.26,
  });
  const edgeMetal = new THREE.MeshStandardMaterial({
    color: "#20170f",
    metalness: 0.9,
    roughness: 0.2,
    emissive: "#2d1105",
    emissiveIntensity: 0.55,
  });
  disposables.push(darkMetal, edgeMetal);

  const rings = [];
  [12.5, 10.7, 8.8, 6.9].forEach((radius, index) => {
    const geometry = new THREE.TorusGeometry(radius, 0.24 + index * 0.055, 12, 180);
    const ring = new THREE.Mesh(geometry, index % 2 ? edgeMetal : darkMetal);
    ring.position.y = 13;
    ring.rotation.set(index * 0.18, index * 0.13, index * 0.27);
    ring.castShadow = true;
    ring.userData.speed = (index % 2 ? -1 : 1) * (0.025 + index * 0.018);
    ring.userData.baseIndex = index;
    addBVHInteraction(ring, "ring", interactives, disposables);
    root.add(ring);
    rings.push(ring);
  });

  const plateCount = 128;
  const plateGeometry = new THREE.BoxGeometry(1, 1, 0.5);
  const plateMaterial = new THREE.MeshStandardMaterial({
    color: "#100d09",
    metalness: 0.96,
    roughness: 0.32,
    emissive: "#1a0903",
    emissiveIntensity: 0.42,
  });
  const plates = new THREE.InstancedMesh(plateGeometry, plateMaterial, plateCount);
  plates.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  plates.castShadow = true;
  const plateData = [];
  const dummy = new THREE.Object3D();
  for (let index = 0; index < plateCount; index += 1) {
    const tier = index % 4;
    const angle = (index / plateCount) * Math.PI * 2 * 4 + tier * 0.4;
    const radius = 7.4 + tier * 1.52;
    const y = 13 + Math.sin(angle * 0.5) * (2.2 + tier * 0.4);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius * 0.34;
    plateData.push({ x, y, z, angle, tier, phase: Math.random() * Math.PI * 2 });
    dummy.position.set(x, y, z);
    dummy.rotation.set(Math.sin(angle) * 0.18, angle + Math.PI / 2, Math.cos(angle) * 0.24);
    dummy.scale.set(1.35 + tier * 0.25, 0.72 + tier * 0.18, 0.48);
    dummy.updateMatrix();
    plates.setMatrixAt(index, dummy.matrix);
  }
  root.add(plates);
  disposables.push(plateGeometry, plateMaterial);

  const ribs = [];
  for (let index = 0; index < 11; index += 1) {
    const geometry = new THREE.TorusGeometry(4.2 + index * 0.55, 0.075, 7, 86, Math.PI * 1.18);
    const rib = new THREE.Mesh(geometry, edgeMetal);
    rib.position.set(0, 12.6, -1.2 - index * 0.08);
    rib.rotation.set(0, 0, -Math.PI * 0.59);
    rib.scale.y = 1.25;
    root.add(rib);
    ribs.push(rib);
    disposables.push(geometry);
  }

  const limbGeometry = new THREE.BoxGeometry(5, 16, 4);
  const limbs = [];
  [-1, 1].forEach((side) => {
    const limb = new THREE.Mesh(limbGeometry, darkMetal);
    limb.position.set(side * 12.8, 3.5, 0.4);
    limb.rotation.set(0, side * -0.16, side * -0.32);
    limb.castShadow = true;
    root.add(limb);
    limbs.push(limb);
  });
  disposables.push(limbGeometry);

  const eyeGroup = new THREE.Group();
  eyeGroup.position.set(0, 13, 1.12);
  root.add(eyeGroup);

  const eyeMaterial = makeEyeMaterial(energyUniform, focusUniform);
  const eye = new THREE.Mesh(new THREE.CircleGeometry(4.25, 192), eyeMaterial);
  addBVHInteraction(eye, "eye", interactives, disposables);
  eyeGroup.add(eye);

  const irisRings = [];
  for (let index = 0; index < 7; index += 1) {
    const geometry = new THREE.TorusGeometry(0.72 + index * 0.48, 0.025 + index * 0.008, 8, 128);
    const material = new THREE.MeshBasicMaterial({
      color: index % 2 ? "#ff6a1b" : "#ffdda0",
      transparent: true,
      opacity: 0.34 + index * 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.z = 0.04 + index * 0.018;
    ring.userData.speed = (index % 2 ? -1 : 1) * (0.14 + index * 0.025);
    eyeGroup.add(ring);
    irisRings.push(ring);
    disposables.push(geometry, material);
  }

  const pupilMaterial = new THREE.MeshBasicMaterial({ color: "#fff3cc", toneMapped: false });
  const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.34, 96), pupilMaterial);
  pupil.position.z = 0.18;
  eyeGroup.add(pupil);
  disposables.push(pupil.geometry, pupilMaterial);

  const energyMaterial = makeEnergyMaterial(energyUniform);
  const channelGeometry = new THREE.PlaneGeometry(18, 0.12, 90, 1);
  const channels = [];
  for (let index = 0; index < 8; index += 1) {
    const channel = new THREE.Mesh(channelGeometry, energyMaterial);
    channel.position.set(0, 13, -0.4);
    channel.rotation.z = (index / 8) * Math.PI * 2;
    root.add(channel);
    channels.push(channel);
  }
  disposables.push(channelGeometry, energyMaterial);

  const beamMaterial = new THREE.MeshBasicMaterial({
    color: "#ffd796",
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(0.15, 42, 32, 1, true), beamMaterial);
  beam.rotation.x = Math.PI / 2;
  beam.position.z = 21;
  eyeGroup.add(beam);
  disposables.push(beam.geometry, beamMaterial);

  return {
    root,
    rings,
    plates,
    plateData,
    ribs,
    limbs,
    eyeGroup,
    irisRings,
    pupil,
    beam,
    dummy,
  };
}

function createInternalWorld(energyUniform, disposables) {
  const root = new THREE.Group();
  root.position.set(0, 13, -82);
  root.visible = false;

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: "#17110b",
    metalness: 0.96,
    roughness: 0.2,
    emissive: "#401608",
    emissiveIntensity: 0.8,
  });
  disposables.push(ringMaterial);
  const rings = [];
  for (let index = 0; index < 34; index += 1) {
    const radius = 5 + (index % 9) * 1.4 + Math.floor(index / 9) * 2.1;
    const geometry = new THREE.TorusGeometry(radius, 0.055 + (index % 3) * 0.035, 8, 96);
    const ring = new THREE.Mesh(geometry, ringMaterial);
    ring.position.set(
      Math.sin(index * 2.31) * 21,
      Math.cos(index * 1.27) * 14,
      -index * 5.4,
    );
    ring.rotation.set(index * 0.31, index * 0.23, index * 0.17);
    ring.userData.speed = (index % 2 ? -1 : 1) * (0.018 + (index % 7) * 0.006);
    root.add(ring);
    rings.push(ring);
    disposables.push(geometry);
  }

  const bridgeGeometry = new THREE.BoxGeometry(0.18, 0.18, 34);
  const bridges = [];
  for (let index = 0; index < 16; index += 1) {
    const bridge = new THREE.Mesh(bridgeGeometry, ringMaterial);
    bridge.position.set((index % 2 ? -1 : 1) * (5 + (index % 5) * 3), Math.sin(index) * 9, -index * 8);
    bridge.rotation.z = Math.sin(index * 0.7) * 0.5;
    root.add(bridge);
    bridges.push(bridge);
  }
  disposables.push(bridgeGeometry);

  const sunGroup = new THREE.Group();
  sunGroup.position.set(0, 0, -178);
  root.add(sunGroup);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: "#ffb44f",
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(5.2, 64, 40), sunMaterial);
  sunGroup.add(sun);
  disposables.push(sun.geometry, sunMaterial);
  const finalIris = new THREE.Mesh(
    new THREE.TorusGeometry(6.1, 0.14, 12, 160),
    new THREE.MeshBasicMaterial({
      color: "#fff0bd",
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  finalIris.scale.y = 0.08;
  sunGroup.add(finalIris);
  disposables.push(finalIris.geometry, finalIris.material);

  const streamCount = 18000;
  const streamPositions = new Float32Array(streamCount * 3);
  const streamMeta = new Float32Array(streamCount * 4);
  for (let index = 0; index < streamCount; index += 1) {
    const i3 = index * 3;
    const i4 = index * 4;
    const depth = Math.random() * 205;
    const radius = 3 + Math.random() * 17;
    const angle = Math.random() * Math.PI * 2;
    streamPositions[i3] = Math.cos(angle) * radius;
    streamPositions[i3 + 1] = Math.sin(angle) * radius;
    streamPositions[i3 + 2] = -depth;
    streamMeta[i4] = radius;
    streamMeta[i4 + 1] = angle;
    streamMeta[i4 + 2] = depth;
    streamMeta[i4 + 3] = 0.2 + Math.random() * 1.4;
  }
  const streamGeometry = new THREE.BufferGeometry();
  streamGeometry.setAttribute("position", new THREE.BufferAttribute(streamPositions, 3));
  streamGeometry.userData.meta = streamMeta;
  const streamMaterial = new THREE.PointsMaterial({
    color: "#ff9a3a",
    size: 0.055,
    transparent: true,
    opacity: 0.74,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const streams = new THREE.Points(streamGeometry, streamMaterial);
  root.add(streams);
  disposables.push(streamGeometry, streamMaterial);

  return { root, rings, bridges, sunGroup, sun, finalIris, streams };
}

async function createPhysicsDebris(scene, count, disposables) {
  const RAPIER = await import("@dimforge/rapier3d-compat");
  await RAPIER.init();
  const world = new RAPIER.World({ x: 0, y: -7.5, z: 0 });
  const ground = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.6, -25));
  world.createCollider(RAPIER.ColliderDesc.cuboid(70, 0.5, 85), ground);
  const geometry = new THREE.DodecahedronGeometry(0.28, 0);
  const material = new THREE.MeshStandardMaterial({
    color: "#302317",
    metalness: 0.88,
    roughness: 0.34,
    emissive: "#280d03",
    emissiveIntensity: 0.4,
  });
  disposables.push(geometry, material);
  const objects = [];
  for (let index = 0; index < count; index += 1) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(0.55 + Math.random() * 1.6);
    mesh.castShadow = true;
    scene.add(mesh);
    const x = (Math.random() - 0.5) * 25;
    const y = 2 + Math.random() * 14;
    const z = -20 - Math.random() * 24;
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y, z)
        .setLinearDamping(0.55)
        .setAngularDamping(0.38),
    );
    world.createCollider(RAPIER.ColliderDesc.ball(0.25 * mesh.scale.x).setRestitution(0.25), body);
    body.applyImpulse({ x: (Math.random() - 0.5) * 2, y: Math.random() * 2, z: (Math.random() - 0.5) * 2 }, true);
    objects.push({ mesh, body });
  }
  return {
    world,
    objects,
    gravityMode: 0,
    update(delta, gravityFailure) {
      world.integrationParameters.dt = Math.min(delta, 1 / 30);
      if (gravityFailure > 0.45 && gravityFailure < 0.72) world.gravity = { x: 0, y: 0, z: 0 };
      else if (gravityFailure >= 0.72) world.gravity = { x: 8, y: -1.4, z: 0 };
      else world.gravity = { x: 0, y: -7.5, z: 0 };
      world.step();
      objects.forEach(({ mesh, body }) => {
        const translation = body.translation();
        const rotation = body.rotation();
        mesh.position.set(translation.x, translation.y, translation.z);
        mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
      });
    },
    impulse(origin, strength = 8) {
      objects.forEach(({ body }) => {
        const p = body.translation();
        const dx = p.x - origin.x;
        const dy = p.y - origin.y;
        const dz = p.z - origin.z;
        const distance = Math.max(1.2, Math.hypot(dx, dy, dz));
        if (distance < 18) body.applyImpulse({ x: (dx / distance) * strength, y: Math.abs(dy / distance) * strength + 3, z: (dz / distance) * strength }, true);
      });
    },
    dispose() {
      objects.forEach(({ mesh }) => scene.remove(mesh));
      world.free();
    },
  };
}

function buildExperience(canvas, host, settingsRef, report) {
  let disposed = false;
  let frame = 0;
  let physics = null;
  const quality = getQualityTier();
  const clock = new THREE.Clock();
  const disposables = [];
  const transient = new Set();
  const interactives = [];
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const state = {
    started: false,
    progress: 0,
    velocity: 0,
    awakening: 0,
    focused: 0,
    holding: false,
    ringDirection: 1,
    failure: 0,
    armorPulse: 0,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#010100");
  scene.fog = new THREE.FogExp2("#030201", 0.0135);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.06, 520);
  camera.position.set(0, 1.05, 36);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.58;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight("#392816", "#000000", 0.22));
  const sweepLight = new THREE.SpotLight("#ffd9a0", 12, 180, 0.21, 0.68, 1.4);
  sweepLight.position.set(-38, 12, 25);
  sweepLight.target.position.set(0, 10, -32);
  sweepLight.castShadow = true;
  sweepLight.shadow.mapSize.set(quality.shadows, quality.shadows);
  scene.add(sweepLight, sweepLight.target);
  const eyeLight = new THREE.PointLight("#ff6f1e", 0, 62, 1.45);
  eyeLight.position.set(0, 13, -28);
  scene.add(eyeLight);

  const groundGeometry = new THREE.PlaneGeometry(260, 260, 1, 1);
  groundGeometry.rotateX(-Math.PI / 2);
  groundGeometry.boundsTree = new MeshBVH(groundGeometry);
  const groundMaterial = new THREE.MeshPhysicalMaterial({
    color: "#030302",
    metalness: 0.96,
    roughness: 0.13,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.raycast = acceleratedRaycast;
  ground.receiveShadow = true;
  scene.add(ground);
  disposables.push(groundGeometry, groundMaterial);

  const energyUniform = uniform(0.6);
  const focusUniform = uniform(0);
  const colossus = createColossus(energyUniform, focusUniform, interactives, disposables);
  scene.add(colossus.root);
  const internal = createInternalWorld(energyUniform, disposables);
  scene.add(internal.root);

  const sand = createSand(Math.floor(36000 * quality.scale));
  scene.add(sand.points);
  disposables.push(sand.geometry, sand.material);

  createPhysicsDebris(scene, Math.max(12, Math.floor(38 * quality.scale)), disposables)
    .then((created) => {
      if (disposed) created.dispose();
      else physics = created;
    })
    .catch(() => {
      // Physics is secondary motion; the authored machine remains available if WASM cannot initialize.
    });

  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.05, 36),
    new THREE.Vector3(-7, 2.4, 21),
    new THREE.Vector3(5, 8.5, 2),
    new THREE.Vector3(-2, 13.2, -14),
    new THREE.Vector3(0, 13, -24.5),
    new THREE.Vector3(0, 13, -29.8),
    new THREE.Vector3(0, 13, -54),
    new THREE.Vector3(0, 13, -108),
    new THREE.Vector3(0, 13, -212),
  ], false, "catmullrom", 0.2);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2, -28),
    new THREE.Vector3(0, 8, -30),
    new THREE.Vector3(0, 13, -30),
    new THREE.Vector3(0, 13, -31),
    new THREE.Vector3(0, 13, -36),
    new THREE.Vector3(0, 13, -64),
    new THREE.Vector3(0, 13, -110),
    new THREE.Vector3(0, 13, -190),
    new THREE.Vector3(0, 13, -280),
  ], false, "catmullrom", 0.18);

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 1.08, 0.22, 0.86);
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
    state.started = true;
  }

  function pulseAt(point, colorValue = "#ff9d47") {
    const geometry = new THREE.SphereGeometry(0.35, 18, 12);
    const material = new THREE.MeshBasicMaterial({
      color: colorValue,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const pulse = new THREE.Mesh(geometry, material);
    pulse.position.copy(point);
    scene.add(pulse);
    transient.add(pulse);
    gsap.to(pulse.scale, { x: 12, y: 12, z: 12, duration: 1.15, ease: "power2.out" });
    gsap.to(material, {
      opacity: 0,
      duration: 1.15,
      ease: "power2.in",
      onComplete: () => {
        scene.remove(pulse);
        transient.delete(pulse);
        geometry.dispose();
        material.dispose();
      },
    });
  }

  function pick(event) {
    updatePointer(event);
    pointer.copy(pointerTarget);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactives, false)[0];
    if (hit?.object.userData.kind === "eye") {
      state.focused = 1;
      pulseAt(hit.point, "#fff0bb");
      physics?.impulse(hit.point, 12);
    } else if (hit?.object.userData.kind === "ring") {
      state.ringDirection *= -1;
      hit.object.userData.speed *= -1;
      pulseAt(hit.point);
      physics?.impulse(hit.point, 8);
    } else {
      const plateHit = raycaster.intersectObject(colossus.plates, false)[0];
      if (plateHit) {
        state.armorPulse = 1;
        pulseAt(plateHit.point, "#ffb35d");
        physics?.impulse(plateHit.point, 10);
        return;
      }
      const groundHit = raycaster.intersectObject(ground, false)[0];
      if (groundHit) {
        pulseAt(groundHit.point, "#9b6a3d");
        physics?.impulse(groundHit.point, 6);
      }
    }
  }

  function onPointerMove(event) {
    updatePointer(event);
    if (state.holding && frame % 10 === 0) physics?.impulse(camera.position, 2.5);
  }
  function onPointerDown(event) {
    state.holding = true;
    host.setPointerCapture?.(event.pointerId);
    pick(event);
  }
  function onPointerUp(event) {
    state.holding = false;
    host.releasePointerCapture?.(event.pointerId);
  }
  function onWheel(event) {
    event.preventDefault();
    state.started = true;
    state.velocity += THREE.MathUtils.clamp(event.deltaY, -180, 180) * 0.00312;
  }

  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);
  host.addEventListener("wheel", onWheel, { passive: false });

  function updateSand(delta, elapsed, density, awakening) {
    const positions = sand.geometry.attributes.position.array;
    const speeds = sand.geometry.userData.speeds;
    const phases = sand.geometry.userData.phases;
    const activeCount = Math.floor(speeds.length * density);
    sand.geometry.setDrawRange(0, activeCount);
    for (let index = 0; index < activeCount; index += 1) {
      const i3 = index * 3;
      positions[i3] += delta * speeds[index] * (1 + awakening * 2.4);
      positions[i3 + 1] = 0.08 + Math.abs(Math.sin(elapsed * 1.2 + phases[index])) * (0.2 + awakening * 2.5);
      if (positions[i3] > 76) positions[i3] = -76;
    }
    sand.geometry.attributes.position.needsUpdate = true;
  }

  function updateColossus(delta, elapsed, awakening, mechanismDensity, eyeEnergy) {
    const rise = ease((awakening - 0.08) / 0.76);
    colossus.root.position.y = THREE.MathUtils.lerp(-19, 0, rise);
    colossus.root.rotation.x = (1 - rise) * -0.13 + Math.sin(elapsed * 0.11) * 0.004;
    const visiblePlates = Math.floor(colossus.plateData.length * mechanismDensity);
    colossus.plates.count = visiblePlates;
    state.armorPulse = THREE.MathUtils.damp(state.armorPulse, 0, 1.35, delta);
    for (let index = 0; index < visiblePlates; index += 1) {
      const plate = colossus.plateData[index];
      const breath = Math.sin(elapsed * 0.42 + plate.phase) * (0.025 + awakening * 0.065);
      const open = state.armorPulse * Math.pow(Math.max(0, Math.sin(plate.angle * 2.5)), 2) * 0.72;
      const radial = 1 + breath + open;
      colossus.dummy.position.set(plate.x * radial, plate.y + open * 0.4, plate.z + open * 1.5);
      colossus.dummy.rotation.set(
        Math.sin(plate.angle) * 0.18 + open * 0.12,
        plate.angle + Math.PI / 2,
        Math.cos(plate.angle) * 0.24 + open * 0.2,
      );
      colossus.dummy.scale.set(1.35 + plate.tier * 0.25, 0.72 + plate.tier * 0.18, 0.48);
      colossus.dummy.updateMatrix();
      colossus.plates.setMatrixAt(index, colossus.dummy.matrix);
    }
    colossus.plates.instanceMatrix.needsUpdate = true;
    colossus.rings.forEach((ring, index) => {
      ring.rotation.z += delta * ring.userData.speed * (0.2 + awakening * 1.8);
      ring.rotation.y += delta * ring.userData.speed * 0.38;
      ring.visible = index / colossus.rings.length < mechanismDensity + 0.22;
    });
    colossus.irisRings.forEach((ring, index) => {
      ring.rotation.z += delta * ring.userData.speed * eyeEnergy;
      ring.scale.y = THREE.MathUtils.damp(ring.scale.y, 0.14 + awakening * 0.86, 2.5 + index * 0.2, delta);
    });
    colossus.ribs.forEach((rib, index) => {
      rib.rotation.y = Math.sin(elapsed * 0.12 + index * 0.28) * 0.035 * awakening;
    });
    colossus.limbs.forEach((limb, index) => {
      limb.rotation.z += Math.sin(elapsed * 0.15 + index * 2) * delta * 0.0025;
    });
    colossus.eyeGroup.position.x = THREE.MathUtils.damp(colossus.eyeGroup.position.x, pointer.x * 0.48, 2.4, delta);
    colossus.eyeGroup.position.y = THREE.MathUtils.damp(colossus.eyeGroup.position.y, 13 + pointer.y * 0.28, 2.1, delta);
    colossus.pupil.position.x = THREE.MathUtils.damp(colossus.pupil.position.x, pointer.x * 0.34, 3.4, delta);
    colossus.pupil.position.y = THREE.MathUtils.damp(colossus.pupil.position.y, pointer.y * 0.24, 3, delta);
    colossus.beam.material.opacity = awakening > 0.78 ? (0.045 + state.focused * 0.12) * eyeEnergy : 0;
    state.focused = THREE.MathUtils.damp(state.focused, 0, 0.8, delta);
  }

  function updateInternal(delta, elapsed, progress, mechanismDensity) {
    const enter = THREE.MathUtils.smoothstep(progress, 0.68, 0.76);
    internal.root.visible = enter > 0.01;
    if (!internal.root.visible) {
      state.failure = 0;
      return;
    }
    internal.rings.forEach((ring, index) => {
      ring.visible = index / internal.rings.length < mechanismDensity + 0.18;
      ring.rotation.x += delta * ring.userData.speed;
      ring.rotation.z -= delta * ring.userData.speed * 0.7;
    });
    const failure = THREE.MathUtils.smoothstep(progress, 0.82, 0.91);
    state.failure = failure;
    internal.bridges.forEach((bridge, index) => {
      bridge.rotation.x = failure * Math.sin(elapsed * 2.2 + index) * 0.38;
      bridge.position.x += Math.sin(elapsed * 0.6 + index) * delta * failure * 0.08;
    });
    const positions = internal.streams.geometry.attributes.position.array;
    const meta = internal.streams.geometry.userData.meta;
    for (let index = 0; index < positions.length / 3; index += 1) {
      const i3 = index * 3;
      const i4 = index * 4;
      const direction = failure > 0.45 && failure < 0.72 ? 0.06 : 1;
      meta[i4 + 1] += delta * meta[i4 + 3] * direction;
      positions[i3] = Math.cos(meta[i4 + 1]) * meta[i4];
      positions[i3 + 1] = Math.sin(meta[i4 + 1]) * meta[i4];
    }
    internal.streams.geometry.attributes.position.needsUpdate = true;
    const finalReveal = THREE.MathUtils.smoothstep(progress, 0.94, 0.995);
    internal.finalIris.scale.y = THREE.MathUtils.lerp(0.08, 1, finalReveal);
    internal.sun.scale.setScalar(1 + finalReveal * 0.25 + Math.sin(elapsed * 2) * 0.03);
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
      const awakeningRate = settings.awakeningRate ?? 0.8;
      const sandDensity = THREE.MathUtils.clamp((settings.sandDensity ?? 72) / 100, 0.2, 1);
      const eyeEnergy = THREE.MathUtils.clamp((settings.eyeEnergy ?? 105) / 100, 0.2, 1.6);
      const mechanismDensity = THREE.MathUtils.clamp((settings.mechanismDensity ?? 82) / 100, 0.3, 1);
      const distortion = THREE.MathUtils.clamp((settings.distortion ?? 48) / 100, 0, 1);

      if (state.started) state.awakening = Math.min(1, state.awakening + delta * 0.052 * awakeningRate * speed);
      state.velocity *= Math.exp(-delta * 3.8);
      state.progress = THREE.MathUtils.clamp(state.progress + state.velocity * speed * delta, 0, 1);
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 3.2));
      theatreSheet.sequence.position = Math.min(Math.max(state.progress, state.awakening * 0.38) * 24, 10);

      updateSand(delta * speed, elapsed, sandDensity, state.awakening);
      updateColossus(delta, elapsed, state.awakening, mechanismDensity, eyeEnergy);
      updateInternal(delta, elapsed, state.progress, mechanismDensity);
      physics?.update(delta, state.failure);

      energyUniform.value = THREE.MathUtils.lerp(0.22, 1.35 * eyeEnergy, ease((state.awakening - 0.52) / 0.45));
      focusUniform.value = state.focused;
      eyeLight.intensity = ease((state.awakening - 0.55) / 0.42) * 38 * eyeEnergy;
      sweepLight.position.x = Math.sin(elapsed * 0.19) * 46;
      sweepLight.intensity = 3 + ease(state.awakening) * 12;
      const rapidDistortion = Math.min(1, Math.abs(state.velocity) * 0.64);
      const pathPosition = path.getPointAt(state.progress);
      const lookPosition = lookPath.getPointAt(state.progress);
      const shake = distortion * rapidDistortion * 0.08 + state.failure * distortion * 0.045;
      camera.position.lerp(
        pathPosition.add(new THREE.Vector3(pointer.x * 0.72 + Math.sin(elapsed * 37) * shake, pointer.y * 0.32, Math.cos(elapsed * 29) * shake)),
        1 - Math.exp(-delta * 3.2),
      );
      camera.lookAt(lookPosition.x + pointer.x * 0.42, lookPosition.y + pointer.y * 0.22, lookPosition.z);
      scene.fog.density = THREE.MathUtils.lerp(0.0135, 0.004, THREE.MathUtils.smoothstep(state.progress, 0.68, 0.82));
      renderer.toneMappingExposure = 0.5 + state.awakening * 0.38 + state.progress * 0.12;

      frame += 1;
      if (frame % 18 === 0) {
        let stage = "DORMANT / SIGNAL ABSENT";
        if (state.started) {
          if (state.awakening < 0.36) stage = "SUBSURFACE PULSE";
          else if (state.awakening < 0.82) stage = "MASS DISPLACEMENT";
          else if (state.progress < 0.68) stage = "EYE ONLINE / APPROACH";
          else if (state.progress < 0.82) stage = "THRESHOLD TRANSIT";
          else if (state.progress < 0.94) stage = "GRAVITY FAILURE";
          else stage = "INTERNAL SCALE: UNKNOWN";
        }
        report({
          stage,
          progress: state.progress,
          awakening: state.awakening,
          started: state.started,
          quality: quality.label,
        });
      }
      post.render();
    });
  }

  animate().catch((error) => report({ error: error.message }));

  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointerup", onPointerUp);
    host.removeEventListener("pointercancel", onPointerUp);
    host.removeEventListener("wheel", onWheel);
    transient.forEach((mesh) => {
      gsap.killTweensOf(mesh.scale);
      gsap.killTweensOf(mesh.material);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    interactives.forEach((mesh) => mesh.geometry.disposeBoundsTree?.());
    groundGeometry.disposeBoundsTree?.();
    physics?.dispose();
    disposables.forEach((item) => item.dispose?.());
    post.dispose?.();
    renderer.dispose();
  };
}

export default function ColossusAwakens({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const [telemetry, setTelemetry] = useState({
    stage: "DORMANT / SIGNAL ABSENT",
    progress: 0,
    awakening: 0,
    started: false,
    quality: "ADAPTIVE",
  });
  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildExperience(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  const inside = telemetry.progress > 0.76;
  return (
    <section
      ref={hostRef}
      className={`colossus-awakens ${telemetry.started ? "is-awake" : ""} ${inside ? "is-inside" : ""}`}
      aria-label="Cinematic interactive awakening of an ancient mechanical colossus"
    >
      <canvas ref={canvasRef} className="colossus-awakens__canvas" />
      <div className="colossus-awakens__vignette" aria-hidden="true" />
      <div className="colossus-awakens__grain" aria-hidden="true" />

      <div className="colossus-awakens__prompt" aria-hidden="true">
        <i />
        <span>{telemetry.started ? "SCROLL TO APPROACH" : "MOVE TO WAKE"}</span>
      </div>

      <div className="colossus-awakens__status" aria-hidden="true">
        <span>{telemetry.stage}</span>
        <i style={{ "--awakening": Math.max(telemetry.awakening, telemetry.progress) }} />
        <small>{telemetry.quality} RENDER / MECHANISM 01</small>
      </div>

      <div className="colossus-awakens__inside-message" aria-hidden="true">
        INTERNAL SCALE: UNKNOWN
      </div>

      {telemetry.error && (
        <div className="colossus-awakens__error" role="status">
          Renderer initialization failed<br /><small>{telemetry.error}</small>
        </div>
      )}
    </section>
  );
}
