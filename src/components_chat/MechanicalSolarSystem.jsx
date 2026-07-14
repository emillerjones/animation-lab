import { useEffect, useRef, useState } from "react";
import { getProject } from "@theatre/core";
import * as THREE from "three";
import {
  MeshBasicNodeMaterial,
  MeshStandardNodeMaterial,
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
  time,
  uniform,
  vec3,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { acceleratedRaycast, MeshBVH } from "three-mesh-bvh";
import { WEBGL_DPR_MAX } from "../rendering/quality";
import "./MechanicalSolarSystem.css";

const PLANET_NAMES = [
  "The Wire Moon",
  "The Gear World",
  "The Mercurial",
  "The Shattered Atlas",
  "The Heart Engine",
];

const project = getProject("Mechanical Solar System", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = project.sheet("Astronomical Assembly");
theatreSheet.object("Ancient Orrery", {
  assembly: 0,
  cameraPass: 0,
  illumination: 0,
});

const clamp = THREE.MathUtils.clamp;

function createGearGeometry(teeth = 18, innerRadius = 0.46, outerRadius = 0.72, depth = 0.16) {
  const shape = new THREE.Shape();
  const segments = teeth * 4;
  for (let index = 0; index <= segments; index += 1) {
    const phase = index % 4;
    const radius = phase === 1 || phase === 2 ? outerRadius : outerRadius * 0.84;
    const angle = (index / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: Math.min(0.035, depth * 0.2),
    bevelThickness: Math.min(0.03, depth * 0.2),
    curveSegments: 16,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function createBrassMaterial(energyUniform) {
  const material = new MeshStandardNodeMaterial();
  const grain = mx_fractal_noise_float(
    positionLocal.mul(vec3(7, 2.2, 7)).add(time.mul(0.035)),
    3,
  ).mul(0.5).add(0.5);
  material.colorNode = mix(color("#241509"), color("#d6a756"), grain.mul(0.8).add(0.08));
  material.roughnessNode = float(0.31);
  material.metalnessNode = float(0.94);
  material.emissiveNode = color("#5b2609").mul(energyUniform).mul(grain.pow(4));
  return material;
}

function createLiquidMetalMaterial(energyUniform) {
  const material = new MeshStandardNodeMaterial();
  const flow = mx_fractal_noise_float(
    positionLocal.mul(3.8).add(vec3(time.mul(0.17), time.mul(-0.11), time.mul(0.09))),
    4,
  ).mul(0.5).add(0.5);
  material.colorNode = mix(color("#19151b"), color("#f0d4a2"), flow.pow(1.8));
  material.roughnessNode = mix(float(0.08), float(0.4), flow);
  material.metalnessNode = float(1);
  material.emissiveNode = color("#c75d1a").mul(flow.pow(5)).mul(energyUniform);
  return material;
}

function createCoreMaterial(energyUniform) {
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const pulse = sin(time.mul(2.2)).mul(0.5).add(0.5);
  const noise = mx_fractal_noise_float(positionLocal.mul(5).add(time.mul(0.18)), 3).mul(0.5).add(0.5);
  material.colorNode = mix(color("#f06a23"), color("#fff4c5"), pulse.mul(0.62).add(noise.mul(0.26)))
    .mul(energyUniform);
  material.opacityNode = pulse.mul(0.18).add(0.72);
  return material;
}

function createOrbit(radius, eccentricity, material) {
  const points = [];
  for (let index = 0; index <= 256; index += 1) {
    const angle = (index / 256) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * eccentricity,
      Math.sin(angle) * radius * 0.17,
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbit = new THREE.Line(geometry, material);
  orbit.rotation.x = 0.18;
  return orbit;
}

function makeFragmentGeometry(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const warm = new THREE.Color("#f3bd65");
  const cool = new THREE.Color("#6d99c9");
  for (let index = 0; index < count; index += 1) {
    const radius = 4.8 + Math.pow(Math.random(), 0.55) * 14.5;
    const angle = Math.random() * Math.PI * 2;
    const i3 = index * 3;
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * (0.45 + radius * 0.08);
    positions[i3 + 2] = Math.sin(angle) * radius * 0.38;
    const sample = warm.clone().lerp(cool, Math.random() * 0.52);
    colors[i3] = sample.r;
    colors[i3 + 1] = sample.g;
    colors[i3 + 2] = sample.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function addRevealPart(part, revealParts, at, direction = new THREE.Vector3()) {
  part.userData.revealAt = at;
  part.userData.finalScale = part.scale.clone();
  part.userData.assemblyDirection = direction.clone();
  part.userData.finalPosition = part.position.clone();
  revealParts.push(part);
  return part;
}

function addOpenPart(part, planet, vector) {
  part.userData.closedPosition = part.position.clone();
  part.userData.openVector = vector.clone();
  planet.userData.openParts.push(part);
  return part;
}

function createPlanet(index, materials, hitMeshes, revealParts) {
  const planet = new THREE.Group();
  planet.userData = {
    index,
    open: 0,
    openTarget: 0,
    openParts: [],
    angle: index * 1.31 + 0.4,
    radius: 5.3 + index * 2.05,
    orbitSpeed: 0.22 / (1 + index * 0.19),
  };

  const size = 0.62 + index * 0.08;
  const hitGeometry = new THREE.SphereGeometry(size * 1.8, 28, 18);
  hitGeometry.boundsTree = new MeshBVH(hitGeometry, { maxLeafTris: 8 });
  const hit = new THREE.Mesh(
    hitGeometry,
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  );
  hit.raycast = acceleratedRaycast;
  hit.userData.planetIndex = index;
  planet.add(hit);
  hitMeshes.push(hit);

  if (index === 0) {
    const shellGeometry = new THREE.IcosahedronGeometry(size, 2);
    const shell = new THREE.Mesh(shellGeometry, new THREE.MeshBasicMaterial({
      color: "#dbb870",
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    }));
    planet.add(addOpenPart(shell, planet, new THREE.Vector3(0, 0.55, 0)));
    for (let ringIndex = 0; ringIndex < 3; ringIndex += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(size * (1.13 + ringIndex * 0.18), 0.018, 6, 96),
        materials.guide,
      );
      ring.rotation.set(ringIndex * 0.7, ringIndex * 1.05, 0.3);
      planet.add(addOpenPart(ring, planet, new THREE.Vector3(0, (ringIndex - 1) * 0.4, 0)));
    }
  } else if (index === 1) {
    for (let gearIndex = 0; gearIndex < 4; gearIndex += 1) {
      const gear = new THREE.Mesh(
        createGearGeometry(12 + gearIndex * 2, 0.2, size * (0.65 - gearIndex * 0.06), 0.13),
        materials.brass,
      );
      gear.position.set((gearIndex - 1.5) * 0.24, (gearIndex % 2 ? 1 : -1) * 0.21, gearIndex * 0.12 - 0.18);
      gear.rotation.set(Math.PI / 2, gearIndex * 0.4, 0);
      planet.add(addOpenPart(gear, planet, gear.position.clone().normalize().multiplyScalar(0.7)));
      gear.userData.gearDirection = gearIndex % 2 ? 1 : -1;
    }
  } else if (index === 2) {
    const liquid = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 7), materials.liquid);
    liquid.scale.set(1, 0.92, 1);
    planet.add(addOpenPart(liquid, planet, new THREE.Vector3(0, 0.8, 0)));
    const equator = new THREE.Mesh(new THREE.TorusGeometry(size * 1.16, 0.025, 8, 128), materials.guide);
    equator.rotation.x = Math.PI / 2;
    planet.add(addOpenPart(equator, planet, new THREE.Vector3(0, -0.42, 0)));
  } else if (index === 3) {
    const darkCore = new THREE.Mesh(new THREE.IcosahedronGeometry(size * 0.52, 2), materials.darkMetal);
    planet.add(darkCore);
    const count = 5400;
    const positions = new Float32Array(count * 3);
    for (let point = 0; point < count; point += 1) {
      const radius = size * (0.68 + Math.random() * 0.8);
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      positions[point * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[point * 3 + 1] = Math.cos(phi) * radius * 0.72;
      positions[point * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const fragments = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: "#e8b35b",
      size: 0.025,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    planet.add(addOpenPart(fragments, planet, new THREE.Vector3(0, 0.75, 0)));
    planet.userData.fragmentCloud = fragments;
  } else {
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(size * 0.56, 4), materials.core);
    planet.add(core);
    for (let cageIndex = 0; cageIndex < 4; cageIndex += 1) {
      const cage = new THREE.Mesh(
        new THREE.TorusGeometry(size * (0.88 + cageIndex * 0.1), 0.028, 8, 128),
        cageIndex % 2 ? materials.brass : materials.guide,
      );
      cage.rotation.set(cageIndex * 0.66, cageIndex * 0.83, cageIndex * 0.2);
      planet.add(addOpenPart(cage, planet, new THREE.Vector3(
        Math.cos(cageIndex) * 0.48,
        Math.sin(cageIndex * 1.7) * 0.48,
        Math.sin(cageIndex) * 0.32,
      )));
    }
    const light = new THREE.PointLight("#ff9f38", 18, 7, 1.7);
    planet.add(light);
    planet.userData.coreLight = light;
  }

  planet.traverse((child) => {
    if (child.isMesh && child !== hit) addRevealPart(child, revealParts, 0.38 + index * 0.085);
  });
  return planet;
}

function buildMechanicalScene(canvas, host, settingsRef, report) {
  let disposed = false;
  let frame = 0;
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const pointerWorld = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const screenPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hitMeshes = [];
  const revealParts = [];
  const densityParts = [];
  const state = {
    hovered: -1,
    selected: -1,
    wheelAccumulator: 0,
    dragging: false,
    dragDistance: 0,
    dragX: 0,
    dragY: 0,
    targetRotationX: 0.08,
    targetRotationY: -0.12,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#020202");
  scene.fog = new THREE.FogExp2("#030201", 0.019);
  const camera = new THREE.PerspectiveCamera(47, 1, 0.08, 170);
  camera.position.set(0, 7.4, 28);

  const renderer = new WebGPURenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, WEBGL_DPR_MAX));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  const energyUniform = uniform(1);
  const materials = {
    brass: createBrassMaterial(energyUniform),
    liquid: createLiquidMetalMaterial(energyUniform),
    core: createCoreMaterial(energyUniform),
    guide: new THREE.MeshBasicMaterial({
      color: "#f0bd6b",
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
    darkMetal: new THREE.MeshStandardMaterial({ color: "#100c09", metalness: 0.93, roughness: 0.3 }),
  };

  scene.add(new THREE.HemisphereLight("#7f95ba", "#160c04", 0.35));
  const keyLight = new THREE.PointLight("#ffd38c", 84, 38, 1.55);
  keyLight.position.set(3, 4.5, 8);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight("#6e9ed5", 2.6);
  rimLight.position.set(-6, 7, -5);
  scene.add(rimLight);

  const mechanism = new THREE.Group();
  mechanism.position.x = 3.2;
  scene.add(mechanism);

  const central = new THREE.Group();
  mechanism.add(central);
  const centralCore = addRevealPart(
    new THREE.Mesh(new THREE.IcosahedronGeometry(1.32, 5), materials.core),
    revealParts,
    0.06,
  );
  central.add(centralCore);
  const coreLight = new THREE.PointLight("#ff9b38", 55, 20, 1.7);
  central.add(coreLight);

  for (let ringIndex = 0; ringIndex < 13; ringIndex += 1) {
    const radius = 1.72 + ringIndex * 0.23;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, ringIndex % 4 === 0 ? 0.052 : 0.022, 7, 160),
      ringIndex % 3 === 0 ? materials.brass : materials.guide,
    );
    ring.rotation.set(
      ringIndex * 0.37 + Math.PI / 2,
      ringIndex * 0.51,
      ringIndex * 0.19,
    );
    central.add(addRevealPart(ring, revealParts, 0.1 + ringIndex * 0.018, new THREE.Vector3(0, 0, 0.6)));
    ring.userData.ringSpeed = (ringIndex % 2 ? -1 : 1) * (0.06 + ringIndex * 0.006);
    ring.userData.densityLevel = ringIndex / 12;
    densityParts.push(ring);
  }

  for (let gearIndex = 0; gearIndex < 32; gearIndex += 1) {
    const angle = (gearIndex / 32) * Math.PI * 2;
    const radius = 2.1 + (gearIndex % 5) * 0.42;
    const gear = new THREE.Mesh(
      createGearGeometry(10 + (gearIndex % 7), 0.1, 0.22 + (gearIndex % 3) * 0.055, 0.08),
      materials.brass,
    );
    gear.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.55, Math.sin(angle * 2.4) * 0.38);
    gear.rotation.set(Math.PI / 2, angle, angle * 0.7);
    gear.userData.gearDirection = gearIndex % 2 ? 1 : -1;
    gear.userData.densityLevel = gearIndex / 32;
    central.add(addRevealPart(gear, revealParts, 0.18 + gearIndex * 0.009, gear.position.clone().multiplyScalar(0.16)));
    densityParts.push(gear);
  }

  const orbitMaterial = new THREE.LineBasicMaterial({
    color: "#b68a47",
    transparent: true,
    opacity: 0.29,
    blending: THREE.AdditiveBlending,
  });
  const planets = [];
  for (let index = 0; index < PLANET_NAMES.length; index += 1) {
    const orbit = createOrbit(5.3 + index * 2.05, 0.54 + index * 0.035, orbitMaterial);
    orbit.userData.densityLevel = index * 0.08;
    mechanism.add(addRevealPart(orbit, revealParts, 0.3 + index * 0.055));
    densityParts.push(orbit);
    const planet = createPlanet(index, materials, hitMeshes, revealParts);
    mechanism.add(planet);
    planets.push(planet);
  }

  for (let armIndex = 0; armIndex < 18; armIndex += 1) {
    const angle = armIndex / 18 * Math.PI * 2;
    const length = 4 + (armIndex % 6) * 1.85;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(length, 0.025, 0.035), materials.guide);
    arm.position.set(Math.cos(angle) * length * 0.5, Math.sin(angle) * length * 0.28, -0.38);
    arm.rotation.z = angle;
    arm.userData.densityLevel = 0.36 + armIndex / 28;
    mechanism.add(addRevealPart(arm, revealParts, 0.27 + armIndex * 0.012));
    densityParts.push(arm);
  }

  const fragmentCount = host.clientWidth < 900 ? 6000 : 12000;
  const fragmentGeometry = makeFragmentGeometry(fragmentCount);
  const fragmentMaterial = new THREE.PointsMaterial({
    size: 0.034,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.68,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const fragments = new THREE.Points(fragmentGeometry, fragmentMaterial);
  mechanism.add(fragments);

  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode();
  const bloomPass = bloom(sceneColor, 1.05, 0.23, 0.72);
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
  }

  function pickPlanet() {
    raycaster.setFromCamera(pointerTarget, camera);
    return raycaster.intersectObjects(hitMeshes, false)[0]?.object?.userData?.planetIndex ?? -1;
  }

  function onPointerMove(event) {
    updatePointer(event);
    if (state.dragging) {
      const dx = event.clientX - state.dragX;
      const dy = event.clientY - state.dragY;
      state.dragX = event.clientX;
      state.dragY = event.clientY;
      state.dragDistance += Math.abs(dx) + Math.abs(dy);
      state.targetRotationY += dx * 0.004;
      state.targetRotationX = clamp(state.targetRotationX + dy * 0.0026, -0.55, 0.58);
      return;
    }
    const nextHover = pickPlanet();
    if (nextHover !== state.hovered) {
      state.hovered = nextHover;
      host.classList.toggle("is-hovering-planet", nextHover >= 0);
    }
  }

  function onPointerDown(event) {
    updatePointer(event);
    state.dragging = true;
    state.dragDistance = 0;
    state.dragX = event.clientX;
    state.dragY = event.clientY;
    host.setPointerCapture?.(event.pointerId);
  }

  function onPointerUp(event) {
    const clickedPlanet = state.dragDistance < 9 ? pickPlanet() : -1;
    state.dragging = false;
    host.releasePointerCapture?.(event.pointerId);
    if (clickedPlanet >= 0) {
      if (state.selected === clickedPlanet) {
        planets[clickedPlanet].userData.openTarget = planets[clickedPlanet].userData.openTarget > 0.5 ? 0 : 1;
      } else {
        state.selected = clickedPlanet;
        planets.forEach((planet, index) => { planet.userData.openTarget = index === clickedPlanet ? 0.2 : 0; });
      }
    }
  }

  function onWheel(event) {
    state.wheelAccumulator += event.deltaY;
    if (Math.abs(state.wheelAccumulator) < 54) return;
    const direction = Math.sign(state.wheelAccumulator);
    state.wheelAccumulator = 0;
    state.selected = clamp(state.selected + direction, -1, planets.length - 1);
    planets.forEach((planet, index) => { if (index !== state.selected) planet.userData.openTarget = 0; });
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
    await renderer.init();
    if (disposed) return;
    renderer.setAnimationLoop(() => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.elapsedTime;
      const settings = settingsRef.current;
      const speed = Math.max(0.08, settings.speed ?? 1);
      const density = clamp((settings.mechanismDensity ?? 78) / 100, 0.3, 1);
      const orbitRate = clamp(settings.orbitRate ?? 0.8, 0.2, 2);
      const energy = clamp((settings.coreEnergy ?? 100) / 100, 0.2, 1.6);
      const fragmentAmount = clamp((settings.fragments ?? 75) / 100, 0.2, 1);
      const magnetism = clamp((settings.magnetism ?? 55) / 100, 0, 1);

      const assembly = THREE.MathUtils.smoothstep(elapsed * speed, 0, 8.2);
      theatreSheet.sequence.position = assembly * 8;
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 5.5));
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(screenPlane, pointerWorld);

      mechanism.rotation.x = THREE.MathUtils.damp(mechanism.rotation.x, state.targetRotationX + pointer.y * 0.035, 3.4, delta);
      mechanism.rotation.y = THREE.MathUtils.damp(mechanism.rotation.y, state.targetRotationY + pointer.x * 0.045, 3.4, delta);

      revealParts.forEach((part) => {
        const reveal = THREE.MathUtils.smoothstep(assembly, part.userData.revealAt, part.userData.revealAt + 0.14);
        const finalScale = part.userData.finalScale;
        if (finalScale) part.scale.set(finalScale.x * reveal, finalScale.y * reveal, finalScale.z * reveal);
        const finalPosition = part.userData.finalPosition;
        const direction = part.userData.assemblyDirection;
        if (finalPosition && direction) {
          part.position.copy(finalPosition).addScaledVector(direction, 1 - reveal);
        }
      });
      densityParts.forEach((part) => { part.visible = (part.userData.densityLevel ?? 0) <= density; });

      central.rotation.y += delta * 0.035 * orbitRate * speed;
      central.children.forEach((part) => {
        if (part.userData.ringSpeed) part.rotation.z += delta * part.userData.ringSpeed * orbitRate * speed;
        if (part.userData.gearDirection) part.rotation.z += delta * part.userData.gearDirection * 0.42 * orbitRate * speed;
      });

      const worldTarget = new THREE.Vector3(3.2, 0, 0);
      planets.forEach((planet, index) => {
        const data = planet.userData;
        const hoverScale = state.hovered === index ? 0.18 : 1;
        data.angle += delta * data.orbitSpeed * orbitRate * speed * hoverScale;
        planet.position.set(
          Math.cos(data.angle) * data.radius,
          Math.sin(data.angle) * data.radius * (0.54 + index * 0.035),
          Math.sin(data.angle) * data.radius * 0.17,
        );
        planet.rotation.y += delta * (0.13 + index * 0.028) * orbitRate * speed * hoverScale;
        planet.rotation.x = Math.sin(elapsed * 0.12 + index) * 0.12;
        data.open = THREE.MathUtils.damp(data.open, data.openTarget, 4, delta);
        data.openParts.forEach((part) => {
          part.position.copy(part.userData.closedPosition).addScaledVector(part.userData.openVector, data.open);
        });
        planet.children.forEach((part) => {
          if (part.userData.gearDirection) part.rotation.z += delta * part.userData.gearDirection * 0.8 * orbitRate * speed * hoverScale;
        });
        if (data.fragmentCloud) data.fragmentCloud.rotation.y -= delta * 0.31 * orbitRate * speed;
        if (data.coreLight) data.coreLight.intensity = 12 + energy * 12;
        if (state.selected === index) planet.getWorldPosition(worldTarget);
      });

      const overviewPosition = new THREE.Vector3(0, 7.4, 28);
      const focusPosition = worldTarget.clone().add(new THREE.Vector3(0, 2.2, 7.8));
      const targetCamera = state.selected >= 0 ? focusPosition : overviewPosition;
      camera.position.lerp(targetCamera, 1 - Math.exp(-delta * 2.15));
      const lookTarget = state.selected >= 0 ? worldTarget : new THREE.Vector3(3.2, 0, 0);
      camera.lookAt(lookTarget);

      const magneticTarget = pointerWorld.clone();
      fragments.position.lerp(magneticTarget.sub(mechanism.position).multiplyScalar(magnetism * 0.045), 1 - Math.exp(-delta * 2.8));
      fragments.rotation.y += delta * orbitRate * speed * (0.025 + magnetism * 0.035);
      fragments.rotation.z = Math.sin(elapsed * 0.07) * 0.04;
      fragmentGeometry.setDrawRange(0, Math.floor(fragmentCount * fragmentAmount));
      fragmentMaterial.size = 0.026 + magnetism * 0.018;
      energyUniform.value = energy * (0.86 + Math.sin(elapsed * 1.7) * 0.08);
      coreLight.intensity = 28 + energy * 46;
      keyLight.intensity = 58 + energy * 38;
      renderer.toneMappingExposure = 0.92 + energy * 0.16;

      if (frame % 18 === 0) {
        report({
          assembly,
          selected: state.selected,
          hovered: state.hovered,
          fragments: Math.floor(fragmentCount * fragmentAmount),
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
    const geometries = new Set();
    const sceneMaterials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (Array.isArray(object.material)) object.material.forEach((material) => sceneMaterials.add(material));
      else if (object.material) sceneMaterials.add(object.material);
    });
    geometries.forEach((geometry) => {
      geometry.boundsTree?.dispose?.();
      geometry.dispose?.();
    });
    sceneMaterials.forEach((material) => material.dispose?.());
    post.dispose?.();
    renderer.dispose();
  };
}

export default function MechanicalSolarSystem({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const [telemetry, setTelemetry] = useState({
    assembly: 0,
    selected: -1,
    hovered: -1,
    fragments: 0,
  });
  settingsRef.current = settings;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return undefined;
    return buildMechanicalScene(canvasRef.current, hostRef.current, settingsRef, setTelemetry);
  }, []);

  const activePlanet = telemetry.selected >= 0 ? PLANET_NAMES[telemetry.selected] : null;

  return (
    <section
      ref={hostRef}
      className={`mechanical-solar-system ${telemetry.selected >= 0 ? "is-focused" : ""}`}
      aria-label="Interactive procedural mechanical solar system"
    >
      <canvas ref={canvasRef} className="mechanical-solar-system__canvas" />
      <div className="mechanical-solar-system__vignette" aria-hidden="true" />
      <div className="mechanical-solar-system__grain" aria-hidden="true" />

      <div className="mechanical-solar-system__copy">
        <p>ADVANCED STUDY — ANCIENT ASTRONOMY</p>
        <h1>The heavens<br />were engineered.</h1>
        <span>An impossible clock assembles a solar system from brass, light, and a memory older than its makers.</span>
      </div>

      <div className="mechanical-solar-system__readout" aria-live="polite">
        <small>{activePlanet ? "CURRENT ORBIT" : "ASTRONOMICAL ENGINE"}</small>
        <strong>{activePlanet ?? `${Math.round(telemetry.assembly * 100)}% ASSEMBLED`}</strong>
        <i style={{ "--assembly": telemetry.assembly }} />
        <span>{telemetry.fragments.toLocaleString()} MAGNETIC FRAGMENTS</span>
      </div>

      <div className="mechanical-solar-system__hint" aria-hidden="true">
        <i />
        <span>DRAG TO TURN THE HEAVENS<br />SCROLL BOTH WAYS BETWEEN WORLDS<br />CLICK TWICE TO OPEN A PLANET</span>
      </div>

      {telemetry.error && (
        <div className="mechanical-solar-system__error" role="status">
          WebGPU initialization failed<br /><small>{telemetry.error}</small>
        </div>
      )}
    </section>
  );
}
