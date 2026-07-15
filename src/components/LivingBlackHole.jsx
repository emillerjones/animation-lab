import { useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import * as THREE from "three";
import { MeshBasicNodeMaterial, PostProcessing, WebGPURenderer } from "three/webgpu";
import { createDragOrbit } from "../utils/dragOrbit";
import { seeded } from "../utils/procedural";
import {
  atan,
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
import "./LivingBlackHole.css";

const MAX_STARS = 72000;
const DISK_PARTICLES = 115000;
const DISK_RADIUS_INNER = 3.15;
const DISK_RADIUS_SPAN = 14.5;
const DISK_RADIUS_OUTER = DISK_RADIUS_INNER + DISK_RADIUS_SPAN;
const project = getProject("Living Black Hole Interface", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = project.sheet("Event Horizon");
const theatreCamera = theatreSheet.object("Camera", {
  approach: 0,
  dive: 0,
  distortion: 0,
});

function randomNormal() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

function makeStarField(count = MAX_STARS) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const palette = [
    new THREE.Color("#8fb8ff"),
    new THREE.Color("#d9e8ff"),
    new THREE.Color("#fff4d3"),
    new THREE.Color("#ffb782"),
  ];

  for (let index = 0; index < count; index += 1) {
    const radius = 38 + Math.random() * 185;
    const theta = Math.random() * Math.PI * 2;
    const y = randomNormal() * 84;
    const i3 = index * 3;
    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = y;
    positions[i3 + 2] = -30 - Math.sin(theta) * radius - Math.random() * 170;
    const starColor = palette[Math.floor(Math.random() * palette.length)];
    colors[i3] = starColor.r;
    colors[i3 + 1] = starColor.g;
    colors[i3 + 2] = starColor.b;
    sizes[index] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.userData.basePositions = positions.slice();
  geometry.userData.sizes = sizes;
  return geometry;
}

function makeAccretionParticles(count = DISK_PARTICLES) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const meta = new Float32Array(count * 4);
  const hot = new THREE.Color("#ffffff");
  const middle = new THREE.Color("#aecdff");
  const outer = new THREE.Color("#1c3454");

  for (let index = 0; index < count; index += 1) {
    const u = Math.random();
    const radius = DISK_RADIUS_INNER + Math.pow(u, 0.62) * DISK_RADIUS_SPAN;
    const angle = Math.random() * Math.PI * 2;
    const heat = THREE.MathUtils.clamp(1 - (radius - DISK_RADIUS_INNER) / DISK_RADIUS_SPAN, 0, 1);
    const c = outer.clone().lerp(middle, heat).lerp(hot, Math.pow(heat, 4) * 0.8);
    const i3 = index * 3;
    const i4 = index * 4;
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = randomNormal() * (0.035 + radius * 0.052);
    positions[i3 + 2] = Math.sin(angle) * radius;
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
    meta[i4] = radius;
    meta[i4 + 1] = angle;
    meta[i4 + 2] = 0.3 + Math.random() * 1.8;
    meta[i4 + 3] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.userData.meta = meta;
  return geometry;
}

function makePhotonRing(radius, colorValue, opacity, thickness = 0.028) {
  const material = new THREE.MeshBasicMaterial({
    color: colorValue,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(radius, thickness, 8, 256),
    material,
  );
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

// A handful of orbiting bodies well outside the disk (radius 18) so the scene reads as
// a system with something else in it, not just an isolated hole — lit by a single point
// light at the singularity so each one shows a real day/night terminator rather than
// being a flat, self-lit blob like everything else here.
function makePlanets() {
  const configs = [
    { radius: 34, size: 1.5, color: "#9fb7ff", speed: 0.05, tilt: 0.1, phase: 0.4 },
    { radius: 47, size: 0.85, color: "#ffcf9e", speed: 0.037, tilt: -0.16, phase: 3.1 },
    { radius: 63, size: 2.1, color: "#d8e4ff", speed: 0.026, tilt: 0.06, phase: 5.2, ring: true },
    { radius: 80, size: 1.1, color: "#ff9d7a", speed: 0.019, tilt: -0.05, phase: 1.7 },
  ];
  const group = new THREE.Group();
  const disposables = [];
  const bodies = configs.map((config) => {
    const geometry = new THREE.SphereGeometry(config.size, 32, 24);
    const material = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: 0.6,
      metalness: 0.08,
      emissive: config.color,
      emissiveIntensity: 0.05,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    disposables.push(geometry, material);
    if (config.ring) {
      const ringGeometry = new THREE.RingGeometry(config.size * 1.7, config.size * 2.5, 48);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.4;
      mesh.add(ring);
      disposables.push(ringGeometry, ringMaterial);
    }
    return { mesh, ...config };
  });
  return { group, bodies, disposables };
}

function makeTslDiskMaterial(intensityUniform, turbulenceUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const centered = uv().sub(vec2(0.5));
  const radius = centered.length();
  const angle = atan(centered.y, centered.x);
  // Low-octave, low-frequency noise now only roughens the edges of each arm instead of
  // dominating the pattern — the old version (5 octaves at 10x frequency, mixed in at
  // amplitude 9) buried the spiral under fine-grained static, which read as "foggy" rather
  // than as a whirlpool.
  const turbulence = mx_fractal_noise_float(
    vec3(centered.mul(5), time.mul(0.09).mul(turbulenceUniform)),
    3,
    2.0,
    0.5,
    1,
  );
  // Three arms (the angle coefficient must stay an integer so the pattern is continuous
  // across the atan2 seam at +-PI). The time term is *added*, not subtracted: for a fixed
  // arm (constant phase), that means the radius satisfying that phase shrinks as time
  // increases, so the arms visibly drain toward the core instead of climbing outward.
  const spiralPhase = radius.mul(22)
    .sub(angle.mul(3))
    .add(time.mul(1.2))
    .add(turbulence.mul(2.2));
  const filaments = smoothstep(0.15, 0.85, sin(spiralPhase).mul(0.5).add(0.5));
  const body = smoothstep(0.08, 0.51, radius).oneMinus()
    .mul(smoothstep(0.035, 0.17, radius));
  // Kept tight to the inner rim (was 0.08-0.5, nearly the whole disk) and capped well below
  // full white so the arms stay legible as color all the way in, instead of the core's glow
  // bleeding out under bloom and washing the whole disk to a foggy white dome.
  const heat = smoothstep(0.08, 0.24, radius).oneMinus().pow(2.4);
  const plasma = mix(color("#0c1830"), color("#a8caff"), filaments)
    .mix(color("#fff3df"), heat.mul(0.55));
  material.colorNode = plasma.mul(intensityUniform);
  material.opacityNode = body.mul(filaments.mul(0.56).add(0.28)).mul(intensityUniform);
  return material;
}

function buildScene(canvas, host, settingsRef, report) {
  let disposed = false;
  let frame = 0;
  const disposables = [];
  const dynamicStars = [];
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const dragOrbit = createDragOrbit(host);
  const clock = new THREE.Clock();
  const state = {
    progress: 0.015,
    velocity: 0,
    distortion: 0,
    holding: false,
    holdClock: 0,
    lastPointerDown: 0,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#000002");
  scene.fog = new THREE.FogExp2("#000005", 0.0065);
  const camera = new THREE.PerspectiveCamera(54, 1, 0.05, 520);
  camera.position.set(0, 7.5, 27);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));

  const intensity = uniform(1.08);
  const turbulence = uniform(1);
  const lensPower = uniform(1);

  const starGeometry = makeStarField();
  const starMaterial = new THREE.PointsMaterial({
    size: 0.095,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  disposables.push(starGeometry, starMaterial);

  const galaxyGeometry = new THREE.BufferGeometry();
  const galaxyPositions = [];
  for (let galaxy = 0; galaxy < 11; galaxy += 1) {
    const gx = randomNormal() * 125;
    const gy = randomNormal() * 62;
    const gz = -95 - Math.random() * 160;
    for (let point = 0; point < 460; point += 1) {
      const arm = point % 3;
      const r = Math.pow(Math.random(), 0.62) * (2.5 + Math.random() * 6);
      const a = r * 1.25 + arm * Math.PI * 2 / 3 + Math.random() * 0.7;
      galaxyPositions.push(gx + Math.cos(a) * r, gy + randomNormal() * 0.35, gz + Math.sin(a) * r);
    }
  }
  galaxyGeometry.setAttribute("position", new THREE.Float32BufferAttribute(galaxyPositions, 3));
  const galaxyMaterial = new THREE.PointsMaterial({
    color: "#7594d8",
    size: 0.055,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial);
  scene.add(galaxies);
  disposables.push(galaxyGeometry, galaxyMaterial);

  const blackHole = new THREE.Group();
  blackHole.rotation.x = 0.16;
  blackHole.rotation.z = -0.035;
  scene.add(blackHole);

  const diskGeometry = new THREE.RingGeometry(2.95, 18, 512, 12);
  const diskMaterial = makeTslDiskMaterial(intensity, turbulence);
  const disk = new THREE.Mesh(diskGeometry, diskMaterial);
  disk.rotation.x = Math.PI / 2;
  disk.scale.y = 0.82;
  blackHole.add(disk);
  disposables.push(diskGeometry, diskMaterial);

  const lowerDisk = new THREE.Mesh(diskGeometry, diskMaterial);
  lowerDisk.rotation.x = Math.PI / 2;
  lowerDisk.position.y = -0.12;
  lowerDisk.scale.set(1.04, 0.76, 1.04);
  blackHole.add(lowerDisk);

  const particleGeometry = makeAccretionParticles();
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.048,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const diskParticles = new THREE.Points(particleGeometry, particleMaterial);
  blackHole.add(diskParticles);
  disposables.push(particleGeometry, particleMaterial);

  const coreGeometry = new THREE.SphereGeometry(3.02, 96, 64);
  const coreMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.scale.y = 0.97;
  blackHole.add(core);
  disposables.push(coreGeometry, coreMaterial);

  const photonRings = [
    makePhotonRing(3.07, "#fff4d1", 0.94, 0.035),
    makePhotonRing(3.18, "#ff8538", 0.48, 0.08),
    makePhotonRing(3.34, "#5e76ff", 0.16, 0.11),
  ];
  photonRings.forEach((ring) => {
    blackHole.add(ring);
    disposables.push(ring.geometry, ring.material);
  });

  const lensMaterial = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const lensRadius = uv().sub(vec2(0.5)).length();
  const lensBand = smoothstep(0.36, 0.5, lensRadius).oneMinus()
    .mul(smoothstep(0.25, 0.39, lensRadius));
  lensMaterial.colorNode = mix(color("#ff3d23"), color("#6a8cff"), sin(time.mul(0.8)).mul(0.5).add(0.5));
  lensMaterial.opacityNode = lensBand.mul(0.18).mul(lensPower);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(5.3, 256), lensMaterial);
  lens.position.z = 0.16;
  blackHole.add(lens);
  disposables.push(lens.geometry, lensMaterial);

  const holeLight = new THREE.PointLight("#ffd9a8", 55, 260, 1.4);
  scene.add(holeLight);
  const planets = makePlanets();
  scene.add(planets.group);
  disposables.push(...planets.disposables);

  const tunnel = new THREE.Group();
  tunnel.visible = false;
  scene.add(tunnel);
  for (let index = 0; index < 58; index += 1) {
    const hue = index % 3 === 0 ? "#ff642b" : index % 3 === 1 ? "#ffe2a1" : "#5a6dff";
    const ring = makePhotonRing(2.4 + index * 0.06, hue, 0, 0.012 + index * 0.0016);
    ring.position.z = -index * 1.45;
    ring.rotation.set(Math.PI / 2, 0, index * 0.19);
    ring.scale.set(1 + Math.sin(index * 1.7) * 0.28, 0.55 + Math.cos(index * 0.91) * 0.18, 1);
    tunnel.add(ring);
    disposables.push(ring.geometry, ring.material);
  }

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 1.35, 0.19, 0.82);
  const post = new PostProcessing(renderer);
  post.outputNode = sceneColor.add(bloomPass);

  function resize() {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function screenToPlane(event) {
    const bounds = host.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    return new THREE.Vector2(x, y);
  }

  function injectStar(force = 1) {
    const geometry = new THREE.SphereGeometry(0.06 + force * 0.035, 12, 8);
    const material = new THREE.MeshBasicMaterial({
      color: force > 1 ? "#fffbd8" : "#8fb6ff",
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const star = new THREE.Mesh(geometry, material);
    const angle = Math.atan2(pointer.y, pointer.x || 0.001);
    const radius = 14 + Math.random() * 7;
    star.position.set(Math.cos(angle) * radius, pointer.y * 5.4, Math.sin(angle) * radius);
    star.userData = {
      angle,
      radius,
      life: 0,
      speed: 0.55 + Math.random() * 0.7,
      force,
    };
    blackHole.add(star);
    dynamicStars.push(star);
  }

  function onPointerMove(event) {
    pointerTarget.copy(screenToPlane(event));
  }

  function onPointerDown(event) {
    state.holding = true;
    state.lastPointerDown = performance.now();
    pointerTarget.copy(screenToPlane(event));
    injectStar(1.8);
    host.setPointerCapture?.(event.pointerId);
  }

  function onPointerUp(event) {
    state.holding = false;
    host.releasePointerCapture?.(event.pointerId);
  }

  function onWheel(event) {
    const diveAcceleration = (settingsRef.current.diveAcceleration ?? 100) / 100;
    const impulse = THREE.MathUtils.clamp(event.deltaY * 0.0066 * diveAcceleration, -7.2, 7.2);
    state.velocity += impulse;
    state.distortion = Math.min(1, state.distortion + Math.abs(event.deltaY) * 0.0012);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);
  host.addEventListener("wheel", onWheel, { passive: true });
  resize();

  function updateDynamicStars(delta, speed) {
    for (let index = dynamicStars.length - 1; index >= 0; index -= 1) {
      const star = dynamicStars[index];
      star.userData.life += delta * speed;
      star.userData.radius -= delta * (0.55 + 3.8 / star.userData.radius) * star.userData.force;
      star.userData.angle += delta * (0.7 + 7 / star.userData.radius) * star.userData.speed;
      const { radius, angle, life } = star.userData;
      star.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2.3 + life) * radius * 0.035,
        Math.sin(angle) * radius,
      );
      star.scale.set(1 + Math.min(9, 10 / Math.max(radius, 1)), 1, 1);
      star.material.opacity = THREE.MathUtils.clamp((radius - 2.9) / 1.3, 0, 1);
      if (radius < 2.95 || life > 16) {
        blackHole.remove(star);
        star.geometry.dispose();
        star.material.dispose();
        dynamicStars.splice(index, 1);
      }
    }
  }

  // Real inward motion, not a rigid spin of the whole field: each particle keeps its own
  // radius and angle in `meta` and drifts inward every frame, picking up angular speed as
  // it falls the way real orbiting matter does (faster orbit at smaller radius). A particle
  // that reaches the inner edge respawns at the outer edge — the recolor to the dim outer
  // hue on respawn (same formula used at spawn time) keeps that reset from reading as a
  // bright pop, since it's additive-blended and the outer color is dark.
  function updateAccretionSpiral(delta, speed, accretionIntensity, activeCount) {
    const meta = particleGeometry.userData.meta;
    const positions = particleGeometry.attributes.position.array;
    const colors = particleGeometry.attributes.color.array;
    const inwardRate = 0.052 * speed * accretionIntensity;
    const angularRate = 1.1 * speed;
    for (let index = 0; index < activeCount; index += 1) {
      const i3 = index * 3;
      const i4 = index * 4;
      let radius = meta[i4];
      let angle = meta[i4 + 1];
      const speedMul = meta[i4 + 2];
      const seed = meta[i4 + 3];

      const normalized = (radius - DISK_RADIUS_INNER) / DISK_RADIUS_SPAN;
      angle += (angularRate * speedMul) / Math.max(radius, 1.2) * delta;
      radius -= inwardRate * (0.35 + (1 - normalized) * 1.5) * delta;
      if (radius < DISK_RADIUS_INNER) {
        radius = DISK_RADIUS_OUTER - seed * 3;
      }

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (seeded(index, 900) * 2 - 1) * (0.035 + radius * 0.052);
      positions[i3 + 2] = Math.sin(angle) * radius;

      const heat = THREE.MathUtils.clamp(1 - (radius - DISK_RADIUS_INNER) / DISK_RADIUS_SPAN, 0, 1);
      const heat4 = heat ** 4 * 0.8;
      const cr = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.109, 0.682, heat), 1, heat4);
      const cg = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.204, 0.804, heat), 1, heat4);
      const cb = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.329, 1, heat), 1, heat4);
      colors[i3] = cr;
      colors[i3 + 1] = cg;
      colors[i3 + 2] = cb;

      meta[i4] = radius;
      meta[i4 + 1] = angle;
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particleGeometry.attributes.color.needsUpdate = true;
  }

  function updateStarWarp(delta, lensingStrength) {
    stars.rotation.y += delta * 0.004;
    galaxies.rotation.y -= delta * 0.0015;
    const targetScale = 1 + state.distortion * 4.8 * lensingStrength + Math.max(0, state.progress - 0.78) * 14 * lensingStrength;
    stars.scale.z = THREE.MathUtils.damp(stars.scale.z, targetScale, 3.8, delta);
    starMaterial.opacity = THREE.MathUtils.lerp(0.8, 0.18, Math.max(0, state.progress - 0.76) / 0.24);
  }

  async function animate() {
    await renderer.init();
    if (disposed) return;
    renderer.setAnimationLoop(() => {
      if (disposed) return;
      try {
      const delta = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.elapsedTime;
      const currentSettings = settingsRef.current;
      const speed = currentSettings.speed ?? 1;
      const accretionIntensity = (currentSettings.accretionIntensity ?? 100) / 100;
      const stellarDensity = THREE.MathUtils.clamp((currentSettings.stellarDensity ?? 82) / 100, 0.12, 1);
      const lensingStrength = (currentSettings.lensingStrength ?? 100) / 100;
      const diveAcceleration = (currentSettings.diveAcceleration ?? 100) / 100;
      const plasmaTurbulence = (currentSettings.plasmaTurbulence ?? 100) / 100;
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 5));

      state.velocity *= Math.exp(-delta * 3.4);
      state.progress = THREE.MathUtils.clamp(state.progress + state.velocity * speed * delta, 0, 1);
      state.distortion = THREE.MathUtils.damp(
        state.distortion,
        Math.min(1, Math.abs(state.velocity) * 0.15 * lensingStrength),
        2.1,
        delta,
      );
      const stage = state.progress * 12;
      theatreSheet.sequence.position = Math.min(stage, 10);
      const approach = THREE.MathUtils.smoothstep(stage, 0, 8.5);
      const dive = THREE.MathUtils.smoothstep(stage, 8.5, 12);
      const cameraZ = THREE.MathUtils.lerp(27, 8.2, approach);
      const diveCurve = Math.pow(dive, THREE.MathUtils.lerp(2.15, 1.15, THREE.MathUtils.clamp(diveAcceleration / 2, 0, 1)));
      const diveZ = THREE.MathUtils.lerp(cameraZ, 1.15, diveCurve);
      const orbit = elapsed * 0.022;
      const orbitYaw = Math.sin(dragOrbit.state.targetYaw);
      const orbitPitch = dragOrbit.state.targetPitch;
      camera.position.x = Math.cos(orbit) * (1.35 - dive * 1.1) + orbitYaw * (1.2 - dive);
      camera.position.y = THREE.MathUtils.lerp(7.5, 1.1, approach) + orbitPitch * (0.7 - dive * 0.5);
      camera.position.z = diveZ;
      camera.lookAt(orbitYaw * 0.45, orbitPitch * 0.26, -Math.max(0, dive * 18));

      blackHole.rotation.y = -elapsed * 0.025;
      disk.rotation.z = elapsed * 0.028;
      lowerDisk.rotation.z = -elapsed * 0.022;
      starGeometry.setDrawRange(0, Math.floor(MAX_STARS * stellarDensity));
      const activeParticles = Math.floor(DISK_PARTICLES * THREE.MathUtils.clamp(0.35 + accretionIntensity * 0.55, 0.25, 1));
      particleGeometry.setDrawRange(0, activeParticles);
      updateAccretionSpiral(delta, speed, accretionIntensity, activeParticles);
      diskParticles.rotation.z = Math.sin(elapsed * 0.17) * 0.008;
      const ringReveal = THREE.MathUtils.smoothstep(elapsed, 0.18, 2.4);
      const diskReveal = THREE.MathUtils.smoothstep(elapsed, 1.1, 5.4);
      blackHole.scale.setScalar(THREE.MathUtils.lerp(0.82, 1, ringReveal));
      particleMaterial.opacity = diskReveal * 0.82 * THREE.MathUtils.clamp(accretionIntensity, 0.35, 1.45);
      photonRings.forEach((ring, index) => {
        ring.scale.setScalar(1 + Math.sin(elapsed * (0.65 + index * 0.2)) * 0.018 + state.distortion * 0.035);
        ring.material.opacity = [0.94, 0.48, 0.16][index] * ringReveal * lensingStrength * (1 + state.distortion * 0.6);
      });
      // Kept below the bloom threshold (0.82) at rest so the spiral arms stay legible as
      // color instead of blooming into one soft dome — distortion still pushes it hot during
      // a dive, which is the moment that deserves to blow out.
      intensity.value = diskReveal * accretionIntensity * (0.72 + state.distortion * 0.55);
      turbulence.value = plasmaTurbulence * (1 + state.distortion * 1.8);
      lensPower.value = lensingStrength;
      renderer.toneMappingExposure = 1.02 + state.distortion * 0.25;

      if (state.holding) {
        state.holdClock += delta;
        const cadence = 0.075 / Math.max(0.5, speed * accretionIntensity);
        while (state.holdClock > cadence) {
          state.holdClock -= cadence;
          injectStar(0.46 + Math.random() * 0.3);
        }
      } else {
        state.holdClock = 0;
      }

      updateDynamicStars(delta, speed);
      updateStarWarp(delta, lensingStrength);
      planets.bodies.forEach((body) => {
        const orbitPhase = elapsed * body.speed * speed + body.phase;
        body.mesh.position.set(
          Math.cos(orbitPhase) * body.radius,
          Math.sin(body.tilt) * body.radius * 0.18,
          Math.sin(orbitPhase) * body.radius,
        );
        body.mesh.rotation.y += delta * 0.25;
      });
      planets.group.visible = state.progress < 0.9;
      const tunnelAmount = THREE.MathUtils.smoothstep(state.progress, 0.79, 0.98);
      tunnel.visible = tunnelAmount > 0.002;
      tunnel.position.copy(camera.position);
      tunnel.position.z -= 2.5 + dive * 12;
      tunnel.rotation.z = elapsed * 0.18 + pointer.x * 0.14;
      tunnel.children.forEach((ring, index) => {
        ring.position.z += delta * speed * diveAcceleration * (3.8 + dive * 22);
        if (ring.position.z > 5) ring.position.z -= 84;
        ring.material.opacity = tunnelAmount * (0.08 + (index % 7 === 0 ? 0.2 : 0.055));
      });
      blackHole.visible = state.progress < 0.985;

      if (frame % 12 === 0) {
        report({
          progress: state.progress,
          distortion: state.distortion,
          particles: Math.floor(MAX_STARS * stellarDensity) + Math.floor(DISK_PARTICLES * THREE.MathUtils.clamp(0.35 + accretionIntensity * 0.55, 0.25, 1)) + dynamicStars.length,
          stage: state.progress > 0.79 ? "EVENT HORIZON" : state.progress > 0.36 ? "APPROACH" : "DEEP FIELD",
        });
      }
      frame += 1;
      post.render();
      } catch (error) {
        renderer.setAnimationLoop(null);
        report({ error: error instanceof Error ? error.message : String(error) });
      }
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
    dragOrbit.dispose();
    dynamicStars.forEach((star) => {
      star.geometry.dispose();
      star.material.dispose();
    });
    disposables.forEach((item) => item.dispose?.());
    post.dispose?.();
    renderer.dispose();
  };
}

export default function LivingBlackHole({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const [telemetry, setTelemetry] = useState({
    progress: 0,
    distortion: 0,
    particles: MAX_STARS + DISK_PARTICLES,
    stage: "DEEP FIELD",
  });

  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildScene(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  return (
    <section
      ref={hostRef}
      className={`living-black-hole ${telemetry.progress > 0.79 ? "is-crossing" : ""}`}
      aria-label="Interactive procedural black hole"
    >
      <canvas ref={canvasRef} className="living-black-hole__canvas" />
      <div className="living-black-hole__grain" aria-hidden="true" />

      <div className="living-black-hole__copy">
        <p>16 — LIVING GRAVITY</p>
        <h1>Nothing escapes.<br />Not even light.</h1>
        <span>Scroll toward the horizon. Hold to feed the singularity.</span>
      </div>

      <div className="living-black-hole__telemetry" aria-hidden="true">
        <span>{telemetry.stage}</span>
        <i style={{ "--progress": telemetry.progress }} />
        <small>{Math.round(telemetry.particles / 1000)}K PROCEDURAL BODIES</small>
      </div>

      <div className="living-black-hole__gesture" aria-hidden="true">
        <i />
        <span>CLICK TO CREATE A STAR<br />HOLD TO RELEASE MATTER</span>
      </div>

      {telemetry.error && (
        <div className="living-black-hole__error" role="status">
          WebGPU initialization failed<br /><small>{telemetry.error}</small>
        </div>
      )}
    </section>
  );
}
