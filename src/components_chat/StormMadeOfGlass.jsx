import { useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import {
  MeshBasicNodeMaterial,
  MeshPhysicalNodeMaterial,
  PostProcessing,
  WebGPURenderer,
} from "three/webgpu";
import {
  color,
  float,
  mix,
  mx_fractal_noise_float,
  pass,
  positionLocal,
  sin,
  smoothstep,
  time,
  uniform,
  vec3,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { acceleratedRaycast, MeshBVH } from "three-mesh-bvh";
import { WEBGL_DPR_MAX } from "../rendering/quality";
import "./StormMadeOfGlass.css";

const STAGES = [
  "CALM CHAMBER",
  "FIRST DROPLET",
  "RISING WIND",
  "ROTATING STORM",
  "ELECTRICAL PEAK",
  "CHAMBER FRACTURE",
  "WEATHER RELEASED",
];

const project = getProject("Storm Made of Glass", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = project.sheet("Storm Containment Sequence");
theatreSheet.object("Weather Artifact", {
  containment: 1,
  storm: 0,
  fracture: 0,
});

const clamp = THREE.MathUtils.clamp;

function createGlassMaterial(stormUniform, refractionUniform) {
  const material = new MeshPhysicalNodeMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    transmission: 0.92,
    thickness: 1.2,
    ior: 1.38,
    roughness: 0.12,
    metalness: 0.02,
  });
  const condensation = mx_fractal_noise_float(
    positionLocal.mul(vec3(1.8, 3.5, 1.8)).add(vec3(0, time.mul(-0.045), 0)),
    4,
  ).mul(0.5).add(0.5);
  const rivulets = sin(positionLocal.x.mul(18).add(condensation.mul(7)).sub(time.mul(0.12)))
    .mul(0.5).add(0.5).pow(7);
  const wetness = smoothstep(0.46, 0.82, condensation).add(rivulets.mul(0.5));
  material.colorNode = mix(color("#07131a"), color("#b8ebef"), wetness.mul(0.42).add(0.03));
  material.opacityNode = wetness.mul(0.15).add(0.045).mul(refractionUniform).add(stormUniform.mul(0.018));
  material.roughnessNode = mix(float(0.04), float(0.31), wetness);
  material.metalnessNode = float(0.03);
  return material;
}

function createCloudMaterial(stormUniform, mistUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const flow = mx_fractal_noise_float(
    positionLocal.mul(1.62).add(vec3(time.mul(0.14), time.mul(-0.09), time.mul(0.07))),
    5,
  ).mul(0.5).add(0.5);
  const stormBand = smoothstep(0.35, 0.82, flow);
  const lightningVeins = smoothstep(0.94, 0.995, sin(flow.mul(43).add(time.mul(0.7))).mul(0.5).add(0.5));
  material.colorNode = mix(color("#07141c"), color("#4c7180"), stormBand)
    .add(color("#b9f9ff").mul(lightningVeins).mul(stormUniform));
  material.opacityNode = stormBand.mul(0.09).mul(mistUniform).add(lightningVeins.mul(0.035).mul(stormUniform));
  return material;
}

function createStormCoreMaterial(stormUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const turbulence = mx_fractal_noise_float(
    positionLocal.mul(3.4).add(vec3(time.mul(0.2), time.mul(-0.15), time.mul(0.12))),
    4,
  ).mul(0.5).add(0.5);
  const pulse = sin(time.mul(1.8)).mul(0.5).add(0.5);
  material.colorNode = mix(color("#184657"), color("#d8feff"), turbulence.pow(4).mul(pulse))
    .mul(stormUniform);
  material.opacityNode = turbulence.pow(2).mul(0.2).add(0.03).mul(stormUniform);
  return material;
}

function createVortexPoints(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const icy = new THREE.Color("#bfefff");
  const dark = new THREE.Color("#173746");
  for (let index = 0; index < count; index += 1) {
    const radius = Math.pow(Math.random(), 0.58) * 4.35;
    const angle = Math.random() * Math.PI * 2 + radius * 1.8;
    const height = (Math.random() - 0.5) * (7.4 - radius * 0.6);
    const i3 = index * 3;
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = height;
    positions[i3 + 2] = Math.sin(angle) * radius * 0.7;
    const sample = dark.clone().lerp(icy, Math.random() * 0.75);
    colors[i3] = sample.r;
    colors[i3 + 1] = sample.g;
    colors[i3 + 2] = sample.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function createCracks() {
  const positions = [];
  for (let crack = 0; crack < 54; crack += 1) {
    const onSide = crack % 3 === 0;
    const start = new THREE.Vector3(
      onSide ? (crack % 2 ? -5.01 : 5.01) : (Math.random() - 0.5) * 9.2,
      (Math.random() - 0.5) * 8.2,
      onSide ? (Math.random() - 0.5) * 6 : 3.51,
    );
    let cursor = start.clone();
    const segments = 3 + Math.floor(Math.random() * 5);
    for (let segment = 0; segment < segments; segment += 1) {
      const next = cursor.clone().add(new THREE.Vector3(
        onSide ? 0 : (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.65,
        onSide ? (Math.random() - 0.5) * 0.72 : 0,
      ));
      positions.push(cursor.x, cursor.y, cursor.z, next.x, next.y, next.z);
      cursor = next;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: "#c8f8ff",
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  return new THREE.LineSegments(geometry, material);
}

function createBolt(start, end, intensity = 1) {
  const positions = [];
  const direction = end.clone().sub(start);
  const length = direction.length();
  const segments = 28;
  let previous = start.clone();
  for (let index = 1; index <= segments; index += 1) {
    const t = index / segments;
    const taper = Math.sin(t * Math.PI);
    const next = start.clone().lerp(end, t).add(new THREE.Vector3(
      (Math.random() - 0.5) * length * 0.09 * taper,
      (Math.random() - 0.5) * length * 0.09 * taper,
      (Math.random() - 0.5) * length * 0.055 * taper,
    ));
    positions.push(previous.x, previous.y, previous.z, next.x, next.y, next.z);
    if (index > 4 && index < segments - 4 && index % 6 === 0) {
      const branch = next.clone().add(new THREE.Vector3(
        (Math.random() - 0.5) * 1.3,
        (Math.random() - 0.5) * 1.3,
        (Math.random() - 0.5) * 0.8,
      ));
      positions.push(next.x, next.y, next.z, branch.x, branch.y, branch.z);
    }
    previous = next;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: intensity > 1.25 ? "#ffffff" : "#9eeeff",
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const bolt = new THREE.LineSegments(geometry, material);
  bolt.userData.life = 1;
  bolt.userData.intensity = intensity;
  return bolt;
}

function makeShardInitial(index) {
  const face = index % 4;
  if (face === 0) return new THREE.Vector3((Math.random() - 0.5) * 9.5, (Math.random() - 0.5) * 8.4, 3.45);
  if (face === 1) return new THREE.Vector3((Math.random() - 0.5) * 9.5, (Math.random() - 0.5) * 8.4, -3.45);
  if (face === 2) return new THREE.Vector3(4.95, (Math.random() - 0.5) * 8.4, (Math.random() - 0.5) * 6.5);
  return new THREE.Vector3(-4.95, (Math.random() - 0.5) * 8.4, (Math.random() - 0.5) * 6.5);
}

function createPhysicsShards(world, glassMaterial, count = 42) {
  const geometry = new THREE.TetrahedronGeometry(0.42, 0);
  const shards = [];
  for (let index = 0; index < count; index += 1) {
    const initial = makeShardInitial(index);
    const scale = new THREE.Vector3(
      0.35 + Math.random() * 1.2,
      0.45 + Math.random() * 1.6,
      0.08 + Math.random() * 0.18,
    );
    const mesh = new THREE.Mesh(geometry, glassMaterial);
    mesh.position.copy(initial);
    mesh.scale.copy(scale);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.visible = false;
    const initialQuaternion = mesh.quaternion.clone();
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(initial.x, initial.y, initial.z)
        .setLinearDamping(0.36)
        .setAngularDamping(0.28),
    );
    body.setRotation(initialQuaternion, true);
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(scale.x * 0.18, scale.y * 0.18, scale.z * 0.2)
        .setRestitution(0.66)
        .setFriction(0.15),
      body,
    );
    shards.push({ mesh, body, initial, initialQuaternion });
  }
  return { geometry, shards };
}

function resetShard(shard) {
  const { body, initial, initialQuaternion } = shard;
  body.setTranslation(initial, true);
  body.setRotation(initialQuaternion, true);
  body.setLinvel({ x: 0, y: 0, z: 0 }, true);
  body.setAngvel({ x: 0, y: 0, z: 0 }, true);
}

function buildStormScene(canvas, host, settingsRef, report) {
  let disposed = false;
  let frame = 0;
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const pointerWorld = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3.5);
  const lightning = [];
  const state = {
    progress: 0,
    progressTarget: 0,
    manualProgress: false,
    holding: false,
    holdStart: 0,
    compression: 0,
    blast: 0,
    flash: 0,
    nextStrike: 1.8,
    fractured: false,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#010305");
  scene.fog = new THREE.FogExp2("#02070a", 0.024);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.06, 120);
  camera.position.set(0, 1.2, 22);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const stormUniform = uniform(0.12);
  const mistUniform = uniform(0.6);
  const refractionUniform = uniform(0.7);
  const glassMaterial = createGlassMaterial(stormUniform, refractionUniform);
  const shardMaterial = new THREE.MeshPhysicalMaterial({
    color: "#a9e7ed",
    transparent: true,
    opacity: 0.34,
    transmission: 0.72,
    thickness: 0.35,
    ior: 1.42,
    roughness: 0.08,
    metalness: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  scene.add(new THREE.HemisphereLight("#6ca1b0", "#020306", 0.33));
  const museumLight = new THREE.SpotLight("#b9eef4", 48, 42, 0.54, 0.8, 1.5);
  museumLight.position.set(-5, 9, 11);
  museumLight.target.position.set(3, 0, 0);
  scene.add(museumLight, museumLight.target);
  const flashLight = new THREE.PointLight("#d9fcff", 0, 30, 1.25);
  flashLight.position.set(3, 1, 4);
  scene.add(flashLight);

  const artifact = new THREE.Group();
  artifact.position.x = 3.1;
  scene.add(artifact);

  const chamberGeometry = new THREE.BoxGeometry(10, 9, 7, 14, 14, 14);
  chamberGeometry.boundsTree = new MeshBVH(chamberGeometry, { maxLeafTris: 10 });
  const chamber = new THREE.Mesh(chamberGeometry, glassMaterial);
  chamber.raycast = acceleratedRaycast;
  artifact.add(chamber);
  const chamberEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(10.05, 9.05, 7.05)),
    new THREE.LineBasicMaterial({
      color: "#a8e1e8",
      transparent: true,
      opacity: 0.29,
      blending: THREE.AdditiveBlending,
    }),
  );
  artifact.add(chamberEdges);

  const cloudMaterial = createCloudMaterial(stormUniform, mistUniform);
  const coreMaterial = createStormCoreMaterial(stormUniform);
  const stormGroup = new THREE.Group();
  artifact.add(stormGroup);
  const firstDropletMaterial = new THREE.MeshPhysicalMaterial({
    color: "#c9f7fb",
    transparent: true,
    opacity: 0,
    transmission: 0.9,
    thickness: 0.65,
    ior: 1.4,
    roughness: 0.04,
    depthWrite: false,
  });
  const firstDroplet = new THREE.Mesh(new THREE.SphereGeometry(0.17, 28, 20), firstDropletMaterial);
  firstDroplet.scale.set(0.72, 1.7, 0.72);
  firstDroplet.position.y = -3.8;
  artifact.add(firstDroplet);
  for (let shellIndex = 0; shellIndex < 8; shellIndex += 1) {
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15 + shellIndex * 0.31, 4),
      shellIndex === 0 ? coreMaterial : cloudMaterial,
    );
    shell.scale.set(1 + shellIndex * 0.035, 1.2 - shellIndex * 0.045, 0.72 + shellIndex * 0.025);
    shell.rotation.set(shellIndex * 0.43, shellIndex * 0.67, shellIndex * 0.29);
    shell.userData.spin = (shellIndex % 2 ? -1 : 1) * (0.05 + shellIndex * 0.014);
    stormGroup.add(shell);
  }

  const vortexCount = host.clientWidth < 900 ? 11000 : 24000;
  const vortexGeometry = createVortexPoints(vortexCount);
  const vortexMaterial = new THREE.PointsMaterial({
    size: 0.028,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.58,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const vortex = new THREE.Points(vortexGeometry, vortexMaterial);
  stormGroup.add(vortex);

  const crackGroup = createCracks();
  artifact.add(crackGroup);
  const boltGroup = new THREE.Group();
  artifact.add(boltGroup);

  let world = null;
  let physicsShards = { geometry: null, shards: [] };

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(44, 30),
    new THREE.MeshStandardMaterial({ color: "#02070a", metalness: 0.72, roughness: 0.25 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(3.1, -4.7, 0);
  scene.add(floor);
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(5.7, 6.2, 0.42, 96),
    new THREE.MeshStandardMaterial({ color: "#060b0e", metalness: 0.84, roughness: 0.2 }),
  );
  pedestal.position.set(3.1, -4.55, 0);
  scene.add(pedestal);
  const pedestalRing = new THREE.Mesh(
    new THREE.TorusGeometry(5.5, 0.026, 7, 160),
    new THREE.MeshBasicMaterial({ color: "#83dbe5", transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }),
  );
  pedestalRing.rotation.x = Math.PI / 2;
  pedestalRing.position.set(3.1, -4.31, 0);
  scene.add(pedestalRing);

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 1.28, 0.18, 0.76);
  const post = new PostProcessing(renderer);
  post.outputNode = sceneColor.add(bloomPass);

  function resize() {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function updatePointer(event) {
    const bounds = host.getBoundingClientRect();
    pointerTarget.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointerTarget, camera);
    const chamberHit = raycaster.intersectObject(chamber, false)[0];
    if (chamberHit) pointerWorld.copy(chamberHit.point).sub(artifact.position);
    else if (raycaster.ray.intersectPlane(interactionPlane, pointerWorld)) pointerWorld.sub(artifact.position);
  }

  function strike(start, intensity = 1) {
    const bolt = createBolt(start, new THREE.Vector3(0, 0, 0), intensity);
    boltGroup.add(bolt);
    lightning.push(bolt);
    state.flash = Math.max(state.flash, intensity);
  }

  function onPointerMove(event) {
    updatePointer(event);
  }

  function onPointerDown(event) {
    updatePointer(event);
    state.holding = true;
    state.holdStart = performance.now();
    host.setPointerCapture?.(event.pointerId);
  }

  function onPointerUp(event) {
    const heldFor = performance.now() - state.holdStart;
    state.holding = false;
    state.blast = Math.max(state.blast, 0.9 + state.compression * 1.8);
    if (heldFor < 260) strike(pointerWorld.clone(), 1.45);
    host.releasePointerCapture?.(event.pointerId);
  }

  function onWheel(event) {
    if (!state.manualProgress) {
      state.manualProgress = true;
      state.progressTarget = state.progress;
    }
    state.progressTarget = clamp(state.progressTarget + event.deltaY * 0.00085, 0, 1);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);
  host.addEventListener("wheel", onWheel, { passive: true });
  resize();

  async function animate() {
    await Promise.all([renderer.init(), RAPIER.init?.()]);
    if (disposed) return;
    world = new RAPIER.World({ x: 0, y: 0, z: 0 });
    physicsShards = createPhysicsShards(world, shardMaterial, host.clientWidth < 900 ? 28 : 44);
    physicsShards.shards.forEach(({ mesh }) => artifact.add(mesh));
    renderer.setAnimationLoop(() => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.elapsedTime;
      const settings = settingsRef.current;
      const speed = Math.max(0.08, settings.speed ?? 1);
      const stormIntensity = clamp((settings.stormIntensity ?? 72) / 100, 0.1, 1);
      const glassRefraction = clamp((settings.glassRefraction ?? 68) / 100, 0.1, 1);
      const lightningRate = clamp((settings.lightningRate ?? 58) / 100, 0, 1);
      const mistDensity = clamp((settings.mistDensity ?? 65) / 100, 0.1, 1);
      const fracture = clamp((settings.fracture ?? 45) / 100, 0, 1);

      if (!state.manualProgress) {
        state.progressTarget = THREE.MathUtils.smoothstep(elapsed * speed, 0.5, 15.5) * 0.94;
      }
      state.progress = THREE.MathUtils.damp(state.progress, state.progressTarget, 2.3, delta);
      theatreSheet.sequence.position = state.progress * 14;
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 5));
      state.compression = THREE.MathUtils.damp(state.compression, state.holding ? 1 : 0, state.holding ? 2.7 : 5.4, delta);
      state.blast = THREE.MathUtils.damp(state.blast, 0, 3.1, delta);
      state.flash = THREE.MathUtils.damp(state.flash, 0, 12, delta);

      const stormAmount = clamp((state.progress - 0.08) / 0.7, 0, 1) * stormIntensity;
      const dropProgress = THREE.MathUtils.smoothstep(state.progress, 0.018, 0.125);
      firstDroplet.visible = state.progress > 0.012 && state.progress < 0.24;
      firstDroplet.position.y = THREE.MathUtils.lerp(-3.8, 3.7, dropProgress);
      firstDroplet.position.x = Math.sin(dropProgress * Math.PI * 1.4) * 0.18;
      firstDroplet.scale.y = 1.7 + Math.sin(dropProgress * Math.PI) * 1.25;
      firstDropletMaterial.opacity = Math.sin(clamp(dropProgress, 0, 1) * Math.PI) * 0.78;
      const compressedScale = THREE.MathUtils.lerp(1, 0.27, state.compression);
      const blastScale = 1 + state.blast;
      stormGroup.scale.setScalar(compressedScale * blastScale);
      stormGroup.position.x = pointer.x * (0.45 + stormIntensity * 0.7);
      stormGroup.position.y = pointer.y * (0.32 + stormIntensity * 0.5);
      stormGroup.rotation.z += delta * speed * (0.05 + stormAmount * 0.42) * (pointer.x < 0 ? 0.8 : 1.2);
      stormGroup.rotation.x = THREE.MathUtils.damp(stormGroup.rotation.x, pointer.y * 0.16, 3.2, delta);
      stormGroup.rotation.y = THREE.MathUtils.damp(stormGroup.rotation.y, pointer.x * 0.22, 3.2, delta);
      stormGroup.children.forEach((shell) => {
        if (shell.userData.spin) shell.rotation.y += delta * shell.userData.spin * speed * (0.5 + stormAmount * 2.3);
      });
      vortex.rotation.y -= delta * speed * (0.16 + stormAmount * 0.9);
      vortex.rotation.z = Math.sin(elapsed * 0.21) * 0.17 + pointer.x * 0.08;
      vortexMaterial.opacity = 0.16 + stormAmount * 0.62;
      vortexMaterial.size = 0.018 + stormIntensity * 0.026;

      stormUniform.value = 0.08 + stormAmount * (1.25 + state.flash * 0.32);
      mistUniform.value = 0.3 + mistDensity * 1.25;
      refractionUniform.value = 0.38 + glassRefraction * 1.18;
      glassMaterial.ior = 1.08 + glassRefraction * 0.52;
      glassMaterial.thickness = 0.28 + glassRefraction * 1.7;
      chamberEdges.material.opacity = (0.16 + glassRefraction * 0.25) * (1 - Math.max(0, state.progress - 0.78) * 3.2);

      state.nextStrike -= delta * speed * (0.24 + lightningRate * 1.6) * Math.max(0.1, stormAmount);
      if (state.nextStrike <= 0 && state.progress > 0.34) {
        strike(new THREE.Vector3(
          (Math.random() - 0.5) * 8.4,
          4.15,
          (Math.random() - 0.5) * 5.2,
        ), 0.7 + lightningRate * 0.9);
        state.nextStrike = 0.8 + Math.random() * (3.8 - lightningRate * 2.5);
      }

      for (let index = lightning.length - 1; index >= 0; index -= 1) {
        const bolt = lightning[index];
        bolt.userData.life -= delta * (4.2 + bolt.userData.intensity * 1.8);
        bolt.material.opacity = Math.max(0, bolt.userData.life);
        bolt.scale.setScalar(1 + (1 - bolt.userData.life) * 0.025);
        if (bolt.userData.life <= 0) {
          boltGroup.remove(bolt);
          bolt.geometry.dispose();
          bolt.material.dispose();
          lightning.splice(index, 1);
        }
      }
      flashLight.intensity = state.flash * (90 + lightningRate * 120);
      renderer.toneMappingExposure = 0.78 + stormAmount * 0.18 + state.flash * 0.4;

      const fractureThreshold = THREE.MathUtils.lerp(0.86, 0.61, fracture);
      const fractureAmount = THREE.MathUtils.smoothstep(state.progress, fractureThreshold - 0.13, fractureThreshold + 0.05);
      crackGroup.material.opacity = fractureAmount * (0.16 + fracture * 0.78);
      crackGroup.scale.setScalar(0.72 + fractureAmount * 0.28);
      const shouldFracture = state.progress >= fractureThreshold;
      if (shouldFracture && !state.fractured) {
        state.fractured = true;
        physicsShards.shards.forEach((shard) => {
          shard.mesh.visible = true;
          const direction = shard.initial.clone().normalize();
          const impulse = (0.9 + Math.random() * 2.3) * (0.45 + fracture * 1.45);
          shard.body.applyImpulse({
            x: direction.x * impulse + (Math.random() - 0.5) * 0.7,
            y: direction.y * impulse + (Math.random() - 0.5) * 0.7,
            z: direction.z * impulse + (Math.random() - 0.5) * 0.7,
          }, true);
          shard.body.applyTorqueImpulse({
            x: (Math.random() - 0.5) * impulse,
            y: (Math.random() - 0.5) * impulse,
            z: (Math.random() - 0.5) * impulse,
          }, true);
        });
        state.flash = Math.max(state.flash, 1.8);
        state.blast = Math.max(state.blast, 1.15);
      } else if (!shouldFracture && state.fractured) {
        state.fractured = false;
        physicsShards.shards.forEach((shard) => {
          resetShard(shard);
          shard.mesh.visible = false;
        });
      }

      if (state.fractured) {
        world.timestep = delta;
        world.step();
        physicsShards.shards.forEach(({ mesh, body }) => {
          const translation = body.translation();
          const rotation = body.rotation();
          mesh.position.set(translation.x, translation.y, translation.z);
          mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        });
      }

      chamber.visible = !state.fractured || state.progress < 0.92;
      chamber.scale.setScalar(1 + state.flash * 0.004);
      artifact.rotation.y = THREE.MathUtils.damp(artifact.rotation.y, pointer.x * 0.045, 2.6, delta);
      artifact.rotation.x = THREE.MathUtils.damp(artifact.rotation.x, -pointer.y * 0.025, 2.6, delta);
      const cameraPush = state.progress > 0.86 ? (state.progress - 0.86) * 18 : 0;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.42, 2.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.2 + pointer.y * 0.28, 2.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 22 - cameraPush, 2, delta);
      camera.lookAt(3.1 + pointer.x * 0.25, pointer.y * 0.16, 0);

      if (frame % 18 === 0) {
        const stageIndex = clamp(Math.floor(state.progress * STAGES.length), 0, STAGES.length - 1);
        report({
          progress: state.progress,
          stage: STAGES[stageIndex],
          particles: Math.round(160 + stormAmount * (1450 + mistDensity * 760)),
          fractured: state.fractured,
          compression: state.compression,
        });
      }
      frame += 1;
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
    lightning.forEach((bolt) => {
      bolt.geometry.dispose();
      bolt.material.dispose();
    });
    world?.free?.();
    const geometries = new Set();
    const materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (Array.isArray(object.material)) object.material.forEach((material) => materials.add(material));
      else if (object.material) materials.add(object.material);
    });
    geometries.forEach((geometry) => {
      geometry.boundsTree?.dispose?.();
      geometry.dispose?.();
    });
    materials.forEach((material) => material.dispose?.());
    post.dispose?.();
    renderer.dispose();
  };
}

export default function StormMadeOfGlass({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const [telemetry, setTelemetry] = useState({
    progress: 0,
    stage: STAGES[0],
    particles: 0,
    fractured: false,
    compression: 0,
  });
  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildStormScene(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  return (
    <section
      ref={hostRef}
      className={`storm-made-of-glass ${telemetry.fractured ? "is-fractured" : ""} ${telemetry.compression > 0.55 ? "is-compressed" : ""}`}
      aria-label="Interactive procedural storm inside a glass chamber"
    >
      <canvas ref={canvasRef} className="storm-made-of-glass__canvas" />
      <div className="storm-made-of-glass__vignette" aria-hidden="true" />
      <div className="storm-made-of-glass__caustics" aria-hidden="true" />
      <div className="storm-made-of-glass__grain" aria-hidden="true" />

      <div className="storm-made-of-glass__copy">
        <p>ADVANCED STUDY — CONTAINED WEATHER</p>
        <h1>A storm<br />made of glass.</h1>
        <span>A museum artifact holds an entire weather system—until pressure, light, and curiosity become too much.</span>
      </div>

      <div className="storm-made-of-glass__status" aria-live="polite">
        <small>CONTAINMENT SEQUENCE</small>
        <strong>{telemetry.stage}</strong>
        <i style={{ "--storm-progress": telemetry.progress }} />
        <span>{telemetry.particles.toLocaleString()} ACTIVE PARTICLES</span>
      </div>

      <div className="storm-made-of-glass__hint" aria-hidden="true">
        <i />
        <span>CLICK TO CALL LIGHTNING<br />HOLD TO COMPRESS THE STORM<br />SCROLL UP OR DOWN THROUGH DISASTER</span>
      </div>

      {telemetry.error && (
        <div className="storm-made-of-glass__error" role="status">
          WebGPU initialization failed<br /><small>{telemetry.error}</small>
        </div>
      )}
    </section>
  );
}
