import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import {
  clamp, color, dot, mix, mul, oneMinus, pow, mx_fractal_noise_float,
  normalView, positionViewDirection, positionLocal, uniform, vec2, vec3, Fn,
} from "three/tsl";
import { getProject } from "@theatre/core";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from "three-mesh-bvh";
import { seeded } from "../utils/procedural";
import "./ProceduralOcean.css";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// Theatre.js: a tunable registry for the choreography's constants (camera framing,
// lightning cadence, storm-peak darkness) — read live each frame, not GUI-authored
// keyframes (that needs @theatre/studio's interactive-only transaction API).
const theatreProject = getProject("Procedural Ocean");
const weatherSheet = theatreProject.sheet("Weather");
const tuning = weatherSheet.object("Tuning", {
  cameraHeight: 2.4,
  cameraDistance: 0.5,
  lightningMinGap: 3,
  lightningMaxGap: 9,
  stormDarkness: 0.55,
});

const OCEAN_SIZE = 220;
const OCEAN_SEGMENTS = 90;

// The GPU-side wave shape (TSL, driving real vertex displacement) and this plain-JS
// mirror (driving the vessel's buoyancy) are deliberately two different formulas —
// TSL's mx_fractal_noise_float has no JS-callable equivalent, so the vessel bobs on
// a same-character sine approximation rather than a bit-exact match to the shader.
function jsWaveHeight(x, z, time, windStrength, swellHeight) {
  const swell = (
    Math.sin(x * 0.05 + z * 0.03 + time * 0.6) * 0.6
    + Math.sin(x * -0.07 + z * 0.09 + time * 0.42) * 0.4
  ) * swellHeight * 1.6;
  const chop = Math.sin(x * 0.18 - time * 1.4) * Math.cos(z * 0.16 + time * 1.1) * 0.5 * windStrength;
  return swell + chop;
}

function useOceanMaterial({ windUniform, swellUniform, skyColorUniform, deepColorUniform, sunGlintUniform }) {
  return useMemo(() => {
    const timeUniform = uniform(0);
    const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.32, metalness: 0.02, side: THREE.DoubleSide });

    const heightNode = Fn(() => {
      const px = positionLocal.x;
      const pz = positionLocal.y;
      const swell = mx_fractal_noise_float(
        vec2(mul(px, 0.05).add(mul(timeUniform, 0.06)), mul(pz, 0.05).add(mul(timeUniform, 0.04))),
        2, 2.0, 0.5, 1,
      );
      const chop = mx_fractal_noise_float(
        vec2(mul(px, 0.18).mul(1).sub(mul(timeUniform, 0.15)), mul(pz, 0.18).add(mul(timeUniform, 0.12))),
        3, 2.0, 0.5, 1,
      );
      return mul(swell, mul(swellUniform, 1.7)).add(mul(chop, mul(windUniform, 0.6)));
    })();

    material.positionNode = positionLocal.add(vec3(0, 0, heightNode));

    const heightNorm = clamp(mul(heightNode, 0.4).add(0.5), 0, 1);
    const foamMix = clamp(mul(heightNode.sub(0.85), 3), 0, 1);
    const foamColor = color("#dff4ff");
    const baseColor = mix(deepColorUniform, mix(deepColorUniform, color("#123246"), heightNorm), 0.7);
    const litColor = mix(baseColor, foamColor, foamMix);

    const fresnel = pow(oneMinus(clamp(dot(normalView, positionViewDirection), 0, 1)), 3);
    const shaded = mix(litColor, skyColorUniform, mul(fresnel, 0.55));

    // Sun-glint: bright, high-frequency sparkle points on wave crests that fade in as the
    // weather clears — a cheap stand-in for real reflections (this scene's WebGPURenderer
    // can't use drei's MeshReflectorMaterial, which patches raw GLSL and isn't TSL/Node-based).
    // Frequency must be much higher than the swell/chop noise (which shapes the whole 220-unit
    // plane) — a low frequency here produced huge soft white blobs instead of fine sparkle.
    const glintPx = positionLocal.x;
    const glintPz = positionLocal.y;
    const glintNoise = mx_fractal_noise_float(
      vec2(mul(glintPx, 9).add(mul(timeUniform, 0.6)), mul(glintPz, 9).sub(mul(timeUniform, 0.5))),
      2, 2.0, 0.5, 1,
    );
    const glintMask = mul(pow(clamp(glintNoise, 0, 1), 22), clamp(mul(heightNorm.sub(0.6), 4), 0, 1));
    const glintColor = color("#ffe9c0");
    material.colorNode = shaded.add(mul(glintColor, mul(glintMask, mul(sunGlintUniform, 0.6))));
    material.emissiveNode = mul(foamColor, mul(foamMix, 0.35));

    return { material, timeUniform };
  }, []);
}

function OceanSurface({ onReady, windUniform, swellUniform, skyColorUniform, deepColorUniform, sunGlintUniform, speedRef }) {
  const meshRef = useRef();
  const { material, timeUniform } = useOceanMaterial({ windUniform, swellUniform, skyColorUniform, deepColorUniform, sunGlintUniform });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, OCEAN_SEGMENTS, OCEAN_SEGMENTS);
    geo.computeBoundsTree();
    return geo;
  }, []);

  useEffect(() => {
    if (meshRef.current) onReady(meshRef.current);
  }, [onReady]);

  useFrame((state) => {
    timeUniform.value = state.clock.elapsedTime * speedRef.current;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} />
  );
}

function useCloudTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function Clouds({ stormRef }) {
  const texture = useCloudTexture();
  const spritesRef = useRef([]);
  const clouds = useMemo(() => Array.from({ length: 14 }, (_, index) => ({
    x: (seeded(index, 501) - 0.5) * 160,
    z: -20 - seeded(index, 502) * 90,
    y: 24 + seeded(index, 503) * 14,
    scale: 22 + seeded(index, 504) * 30,
    darkness: seeded(index, 505),
  })), []);

  useFrame(() => {
    const stormIntensity = stormRef.current.intensity;
    clouds.forEach((cloud, index) => {
      const sprite = spritesRef.current[index];
      if (!sprite) return;
      const grey = 1 - stormIntensity * (0.55 + cloud.darkness * 0.35);
      sprite.material.color.setRGB(grey, grey, grey * 1.02);
      sprite.material.opacity = 0.18 + stormIntensity * 0.55;
    });
  });

  return clouds.map((cloud, index) => (
    <sprite
      key={index}
      ref={(el) => { spritesRef.current[index] = el; }}
      position={[cloud.x, cloud.y, cloud.z]}
      scale={[cloud.scale, cloud.scale * 0.55, 1]}
    >
      <spriteMaterial map={texture} transparent depthWrite={false} opacity={0.2} />
    </sprite>
  ));
}

function Rain({ settings, stormRef, speedRef }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const maxCount = 2200;
  const drops = useMemo(() => Array.from({ length: maxCount }, (_, index) => ({
    x: (seeded(index, 601) - 0.5) * 90,
    z: (seeded(index, 602) - 0.5) * 90,
    y: seeded(index, 603) * 30,
    fall: 14 + seeded(index, 604) * 8,
    phase: seeded(index, 605) * 40,
  })), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const rainIntensity = (settings.rainDensity / 100) * Math.max(0.15, stormRef.current.intensity);
    const activeCount = Math.round(maxCount * rainIntensity);
    const elapsed = state.clock.elapsedTime * speedRef.current;
    drops.forEach((drop, index) => {
      if (index >= activeCount) {
        dummy.position.set(0, -999, 0);
        dummy.scale.setScalar(0);
      } else {
        const y = ((drop.y + drop.phase - elapsed * drop.fall) % 30 + 30) % 30;
        dummy.position.set(drop.x, y, drop.z);
        dummy.rotation.set(0.18, 0, 0);
        dummy.scale.set(0.02, 0.7, 0.02);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, maxCount]} frustumCulled={false}>
      <cylinderGeometry args={[1, 1, 1, 4]} />
      <meshBasicMaterial color="#bcd6e6" transparent opacity={0.45} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

function SeaSpray({ settings, stormRef, speedRef }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 400;
  const specks = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (seeded(index, 701) - 0.5) * 70,
    z: (seeded(index, 702) - 0.5) * 70,
    speed: 0.6 + seeded(index, 703) * 1.4,
    phase: seeded(index, 704) * Math.PI * 2,
    rise: 1.2 + seeded(index, 705) * 2.2,
  })), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const sprayIntensity = (settings.foamAmount / 100) * Math.max(0.12, stormRef.current.intensity);
    const elapsed = state.clock.elapsedTime * speedRef.current;
    specks.forEach((speck, index) => {
      const active = index < count * sprayIntensity;
      if (!active) {
        dummy.position.set(0, -999, 0);
        dummy.scale.setScalar(0);
      } else {
        const t = ((elapsed * speck.speed + speck.phase) % 1);
        const arc = Math.sin(t * Math.PI) * speck.rise;
        dummy.position.set(speck.x, arc, speck.z);
        dummy.scale.setScalar(0.05 * (1 - t * 0.5));
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#eaf6ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

// Rapier's physics step reliably stalled the whole R3F render loop within a
// couple of frames whenever it shared a canvas with this WebGPU-labeled
// renderer (reproduced with a clean dev server and a fresh browser context, so
// not just environment noise) — confirmed by removing Physics/RigidBody
// entirely and watching the frame count jump from ~2-4 stuck frames to a
// healthy continuous rate. The brief treats Rapier as optional ("may be used"),
// so the vessel instead bobs kinematically: same wave-height/slope math, same
// believable response, just applied directly to a group transform each frame
// instead of through impulses on a rigid body.
const VESSEL_HOME = { x: 3.5, z: -6 };

function Vessel({ windStrengthRef, swellHeightRef, speedRef }) {
  const groupRef = useRef();
  const velocityRef = useRef(0.15);

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.05) * speedRef.current;
    const t = state.clock.elapsedTime * speedRef.current;
    const wind = windStrengthRef.current;
    const swell = swellHeightRef.current;
    const { x: px, z: pz } = VESSEL_HOME;
    const target = jsWaveHeight(px, pz, t, wind, swell) + 0.15;

    const eps = 0.7;
    const slopeX = jsWaveHeight(px + eps, pz, t, wind, swell) - jsWaveHeight(px - eps, pz, t, wind, swell);
    const slopeZ = jsWaveHeight(px, pz + eps, t, wind, swell) - jsWaveHeight(px, pz - eps, t, wind, swell);

    const springStiffness = 8;
    const damping = 4.5;
    const acceleration = (target - group.position.y) * springStiffness - velocityRef.current * damping;
    velocityRef.current += acceleration * delta;
    group.position.set(px, group.position.y + velocityRef.current * delta, pz);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -slopeX * 0.18, 0.08);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, slopeZ * 0.18, 0.08);
  });

  return (
    <group ref={groupRef} position={[VESSEL_HOME.x, 0.3, VESSEL_HOME.z]}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.7, 0.22, 10]} />
        <meshStandardMaterial color="#5a4128" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.04, 0.9, 0.04]} />
        <meshStandardMaterial color="#2c1f14" roughness={0.8} />
      </mesh>
      <mesh position={[0.16, 0.85, 0]}>
        <planeGeometry args={[0.32, 0.22]} />
        <meshBasicMaterial color="#d8c9a3" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function RippleBursts({ ripplesRef }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const maxRipples = 10;

  useFrame(() => {
    if (!meshRef.current) return;
    ripplesRef.current = ripplesRef.current.filter((ripple) => ripple.age < 1.6);
    for (let i = 0; i < maxRipples; i += 1) {
      const ripple = ripplesRef.current[i];
      if (!ripple) {
        dummy.position.set(0, -999, 0);
        dummy.scale.setScalar(0);
      } else {
        ripple.age += 0.016;
        const life = ripple.age / 1.6;
        dummy.position.set(ripple.x, 0.05, ripple.z);
        dummy.rotation.set(-Math.PI / 2, 0, 0);
        dummy.scale.setScalar(0.4 + life * 5);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      const opacity = ripple ? Math.max(0, 1 - ripple.age / 1.6) : 0;
      meshRef.current.setColorAt(i, new THREE.Color(1, 1, 1).multiplyScalar(opacity));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, maxRipples]} frustumCulled={false}>
      <ringGeometry args={[0.7, 0.85, 32]} />
      <meshBasicMaterial vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function OceanScene({ settings, speedRef, onSunReady }) {
  const { camera, gl } = useThree();
  const windUniform = useMemo(() => uniform(0.7), []);
  const swellUniform = useMemo(() => uniform(1), []);
  // uniform() needs a real THREE.Color to wrap and mutate per frame — the TSL
  // color() node builder is for constants inside shader expressions, not values
  // handed to uniform(). Using it here left .value as a node, not a Color, so
  // the per-frame skyColorUniform.value.copy(...) below threw on every tick.
  const skyColorUniform = useMemo(() => uniform(new THREE.Color("#0a0d14")), []);
  const deepColorUniform = useMemo(() => uniform(new THREE.Color("#020a12")), []);
  const sunGlintUniform = useMemo(() => uniform(0), []);

  const windStrengthRef = useRef(0.7);
  const swellHeightRef = useRef(1);
  const stormRef = useRef({ intensity: 0, progress: 0 });
  const ripplesRef = useRef([]);
  const [oceanMesh, setOceanMesh] = useState(null);

  // Starts partway into the weather (not pure predawn black) and climbs on its own toward
  // a lively storm-clearing state — this used to only advance via desktop mouse-wheel, so
  // mobile (no wheel event) was stuck at progress=0 forever. Wheel/scroll still works and
  // takes over manual control once used.
  const INITIAL_PROGRESS = 0.3;
  const AUTO_TARGET_PROGRESS = 0.82;
  const AUTO_CLIMB_SECONDS = 25;
  const stormProgressRef = useRef(INITIAL_PROGRESS);
  const manualProgressRef = useRef(false);
  const dragRef = useRef({ yaw: 0, pitch: 0 });
  const lightningRef = useRef({ nextStrike: 3, flash: 0 });
  const sunRef = useRef();
  const skyColorObj = useMemo(() => new THREE.Color(), []);
  const calmColor = useMemo(() => new THREE.Color("#101b2c"), []);
  const stormColor = useMemo(() => new THREE.Color("#232a3c"), []);
  const clearColor = useMemo(() => new THREE.Color("#c99a5b"), []);
  const deepCalm = useMemo(() => new THREE.Color("#081a28"), []);
  const deepClear = useMemo(() => new THREE.Color("#0a2f38"), []);

  useEffect(() => {
    const canvasEl = gl.domElement;
    let dragging = false;
    let dragMoved = false;
    let lastX = 0;
    let lastY = 0;

    const onWheel = (event) => {
      event.preventDefault();
      manualProgressRef.current = true;
      stormProgressRef.current = THREE.MathUtils.clamp(stormProgressRef.current + event.deltaY * 0.00035, 0, 1);
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
      dragRef.current.yaw = THREE.MathUtils.clamp(dragRef.current.yaw - dx * 0.0025, -0.5, 0.5);
      dragRef.current.pitch = THREE.MathUtils.clamp(dragRef.current.pitch - dy * 0.0018, -0.25, 0.2);
    };
    const onPointerUp = (event) => {
      if (dragging && !dragMoved && oceanMesh) {
        const rect = canvasEl.getBoundingClientRect();
        const ndc = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObject(oceanMesh, false);
        if (hits.length) {
          const point = hits[0].point;
          ripplesRef.current.push({ x: point.x, z: point.z, age: 0 });
          if (ripplesRef.current.length > 10) ripplesRef.current.shift();
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
  }, [camera, gl, oceanMesh]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05) * speedRef.current;
    const elapsed = state.clock.elapsedTime * speedRef.current;
    if (!manualProgressRef.current) {
      const climbT = THREE.MathUtils.smoothstep(elapsed, 0, AUTO_CLIMB_SECONDS);
      stormProgressRef.current = THREE.MathUtils.lerp(INITIAL_PROGRESS, AUTO_TARGET_PROGRESS, climbT);
    }
    const progress = stormProgressRef.current;
    const intensity = Math.pow(Math.max(0, Math.sin(Math.min(progress, 1) * Math.PI)), 0.8);
    stormRef.current.progress = progress;
    stormRef.current.intensity = intensity;

    const windStrength = (settings.windStrength / 100) * (0.42 + intensity * 0.85);
    const swellHeight = (settings.swellHeight / 100) * (0.6 + intensity * 0.75);
    windStrengthRef.current = windStrength;
    swellHeightRef.current = swellHeight;
    windUniform.value = windStrength;
    swellUniform.value = swellHeight;

    if (progress < 0.7) {
      skyColorObj.copy(calmColor).lerp(stormColor, THREE.MathUtils.clamp(intensity * tuning.value.stormDarkness * 2, 0, 1));
    } else {
      const clearT = THREE.MathUtils.clamp((progress - 0.7) / 0.3, 0, 1);
      skyColorObj.copy(stormColor).lerp(clearColor, clearT);
    }
    skyColorUniform.value.copy(skyColorObj);
    deepColorUniform.value.copy(deepCalm).lerp(deepClear, THREE.MathUtils.clamp(progress, 0, 1) * 0.6);
    sunGlintUniform.value = THREE.MathUtils.clamp((progress - 0.35) * 1.1, 0, 1);

    if (gl.background === undefined || true) {
      state.scene.background = skyColorObj;
      if (state.scene.fog) state.scene.fog.color.copy(skyColorObj);
    }

    // Lightning: frequency scales with storm intensity, silent at calm start/clear end.
    lightningRef.current.nextStrike -= delta;
    if (lightningRef.current.nextStrike <= 0) {
      const gapRange = tuning.value.lightningMaxGap - tuning.value.lightningMinGap;
      const strikeChance = Math.max(0.05, intensity) * (settings.lightningRate / 100);
      lightningRef.current.nextStrike = tuning.value.lightningMinGap + gapRange * (1 - strikeChance);
      if (strikeChance > 0.04 && Math.random() < strikeChance) {
        lightningRef.current.flash = 1;
      }
    }
    lightningRef.current.flash = Math.max(0, lightningRef.current.flash - delta * 3);
    if (sunRef.current) {
      sunRef.current.intensity = 1.1 + intensity * 0.3 + lightningRef.current.flash * 6;
    }

    const yaw = dragRef.current.yaw + state.pointer.x * 0.05;
    const pitch = dragRef.current.pitch + state.pointer.y * 0.03;
    const distance = tuning.value.cameraDistance + intensity * 0.4;
    camera.position.set(
      Math.sin(yaw) * distance,
      tuning.value.cameraHeight - pitch * 2,
      2.6 + Math.cos(yaw) * distance,
    );
    camera.lookAt(Math.sin(yaw) * 4, 1.4, -18);
    camera.fov = 52 + intensity * 6;
    camera.updateProjectionMatrix();
  });

  return (
    <group>
      <ambientLight intensity={0.34} />
      <directionalLight ref={sunRef} position={[8, 14, -6]} intensity={1.4} color="#ffe9c4" />
      <OceanSurface
        onReady={setOceanMesh}
        windUniform={windUniform}
        swellUniform={swellUniform}
        skyColorUniform={skyColorUniform}
        deepColorUniform={deepColorUniform}
        sunGlintUniform={sunGlintUniform}
        speedRef={speedRef}
      />
      <Clouds stormRef={stormRef} />
      <Rain settings={settings} stormRef={stormRef} speedRef={speedRef} />
      <SeaSpray settings={settings} stormRef={stormRef} speedRef={speedRef} />
      <Vessel windStrengthRef={windStrengthRef} swellHeightRef={swellHeightRef} speedRef={speedRef} />
      <RippleBursts ripplesRef={ripplesRef} />
    </group>
  );
}

async function createWebGPURenderer(props) {
  const renderer = new THREE.WebGPURenderer({ ...props, antialias: true, powerPreference: "high-performance" });
  await renderer.init();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  return renderer;
}

export default function ProceduralOcean({ settings = {} }) {
  const speedRef = useRef(settings.speed ?? 1);
  speedRef.current = settings.speed ?? 1;
  const resolvedSettings = {
    windStrength: settings.windStrength ?? 70,
    swellHeight: settings.swellHeight ?? 100,
    rainDensity: settings.rainDensity ?? 60,
    lightningRate: settings.lightningRate ?? 55,
    foamAmount: settings.foamAmount ?? 80,
  };

  return (
    <section className="atmosphere procedural-ocean">
      <div className="procedural-ocean__stage">
        <Canvas
          gl={createWebGPURenderer}
          camera={{ position: [0, 2.4, 3.1], fov: 52, near: 0.1, far: 300 }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <fogExp2 attach="fog" args={["#05070c", 0.012]} />
          <OceanScene settings={resolvedSettings} speedRef={speedRef} />
        </Canvas>
      </div>
      <div className="experiment-copy">
        <p>Claude — Weather that actually arrives</p>
        <h1>Procedural<br />Ocean.</h1>
        <span>A predawn sea builds through wind, rain, and swell on its own as warm light breaks through. Scroll to steer the weather yourself, drag to look around, click the water to send out a ripple.</span>
      </div>
    </section>
  );
}
