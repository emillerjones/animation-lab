import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CubeCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import AnimationReadout from "./AnimationReadout";
import { WishingTreeModel } from "./WishingTree";
import { seeded } from "../utils/procedural";
import "./RiverOfWishes.css";

const MAX_CRANES = 10000;
const PATH_SAMPLES = 512;
const PATH_FOOTPRINT = 0.87;
const MAIN_LAMPS = [
  { position: [-18, 0, 14], color: "#ffd18a" },
  { position: [18, 0, 14], color: "#ffc078" },
  { position: [18, 0, -16], color: "#ffe0a0" },
  { position: [-18, 0, -16], color: "#ffb96e" },
];

// A fixed dark blue-purple sky — previously this cycled warm/cool by camera position along
// the path; now it just holds still at what used to be the "cool" end of that cycle.
const SKY_COLOR = "#090d20";

// Where the river narrows to ~half width (coincides with the bridge crossing) and where it
// widens to ~2x (out in the garden). Used both to bake the visual lane-width taper and to
// drive the "traffic" speed profile below (narrower = slower = cranes bunch up approaching
// the choke; wider = faster = they spread out).
const CHOKE_U = 0.58;
const WIDE_U = 0.85;

function circularDistance(a, b) {
  const d = Math.abs(a - b) % 1;
  return Math.min(d, 1 - d);
}

function widthProfileAt(u) {
  const chokeDist = circularDistance(u, CHOKE_U);
  const wideDist = circularDistance(u, WIDE_U);
  const broadPulse = Math.sin(u * Math.PI * 4 - 0.7) * 0.18;
  const width = 1
    + broadPulse
    + 0.72 * Math.exp(-(wideDist ** 2) / (2 * 0.065 ** 2))
    - 0.48 * Math.exp(-(chokeDist ** 2) / (2 * 0.045 ** 2));
  return THREE.MathUtils.clamp(width, 0.52, 1.82);
}

// ---------------------------------------------------------------------------
// Crane geometry — same construction as The Wishing Tree (kept as its own
// local copy since every piece here is self-contained): primitives in the
// proportions of the hand-tuned crane in OrigamiFold.jsx (#15) — a
// flattened elongated octahedron body, wide flat kite-shaped wings, a thin
// cone neck capped with a small head, and a short tail cone. Wings flap
// continuously here (no fold-in lifecycle, this piece is a constant flow).
// ---------------------------------------------------------------------------
function addHingeAttribute(geo, group) {
  const count = geo.attributes.position.count;
  geo.setAttribute("aHingeGroup", new THREE.Float32BufferAttribute(new Float32Array(count).fill(group), 1));
  return geo;
}

function buildWingGeometry(mirror) {
  const s = mirror ? -1 : 1;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute([
    0, 0, 0, s * 1.55, 0, 0.1, s * 0.32, 0, 1.05,
    0, 0, 0, s * 0.32, 0, 1.05, s * 0.06, 0, 0.36,
  ], 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0], 2));
  geo.computeVertexNormals();
  return geo;
}

function buildLegacyCraneGeometry() {
  const body = new THREE.OctahedronGeometry(0.5, 0).toNonIndexed();
  body.scale(0.56, 0.34, 1.35);
  body.rotateX(Math.PI / 2);
  body.computeVertexNormals();
  addHingeAttribute(body, 0);

  const wingL = buildWingGeometry(true);
  wingL.translate(-0.12, 0.22, -0.15);
  addHingeAttribute(wingL, 1);
  const wingR = buildWingGeometry(false);
  wingR.translate(0.12, 0.22, -0.15);
  addHingeAttribute(wingR, 2);

  const neck = new THREE.ConeGeometry(0.16, 0.68, 4).toNonIndexed();
  neck.rotateX(Math.PI / 2.6);
  neck.translate(0, 0.26, 0.62);
  neck.computeVertexNormals();
  const head = new THREE.OctahedronGeometry(0.14, 0).toNonIndexed();
  head.scale(0.85, 0.6, 1.3);
  head.translate(0, 0.4, 0.98);
  head.computeVertexNormals();
  const neckHead = mergeGeometries([neck, head]);
  addHingeAttribute(neckHead, 3);

  const tail = new THREE.ConeGeometry(0.13, 0.5, 4).toNonIndexed();
  tail.rotateX(-Math.PI / 2.35);
  tail.translate(0, 0.09, -0.5);
  tail.computeVertexNormals();
  addHingeAttribute(tail, 4);

  const merged = mergeGeometries([body, wingL, wingR, neckHead, tail]);
  [body, wingL, wingR, neck, head, neckHead, tail].forEach((g) => g.dispose());
  return merged;
}

// The same traditional folded silhouette used by The First Fold, with a
// hinge group attached to every vertex so the river shader can still animate
// the two wings independently across as many as 100,000 instances.
function buildCraneGeometry() {
  const positions = [];
  const hingeGroups = [];
  const foldedTri = (group, a, b, c) => {
    positions.push(...a, ...b, ...c);
    hingeGroups.push(group, group, group);
  };

  const ridge = [0, 0.58, 0.02];
  const keel = [0, -0.14, 0.02];
  const left = [-0.48, 0.2, 0.02];
  const right = [0.48, 0.2, 0.02];
  const front = [0, 0.22, 0.7];
  const back = [0, 0.22, -0.68];
  foldedTri(0, ridge, left, front);
  foldedTri(0, ridge, front, right);
  foldedTri(0, ridge, right, back);
  foldedTri(0, ridge, back, left);
  foldedTri(0, keel, front, left);
  foldedTri(0, keel, right, front);
  foldedTri(0, keel, back, right);
  foldedTri(0, keel, left, back);

  // Slightly exaggerated folded width keeps the neck visible edge-on when
  // each crane occupies only a few pixels in the distant river.
  const neckBaseL = [-0.13, 0.24, 0.58];
  const neckBaseR = [0.13, 0.24, 0.58];
  const neckKneeL = [-0.1, 0.82, 1.05];
  const neckKneeR = [0.1, 0.82, 1.05];
  const headBackL = [-0.09, 1.25, 1.38];
  const headBackR = [0.09, 1.25, 1.38];
  foldedTri(0, neckBaseL, neckBaseR, neckKneeR);
  foldedTri(0, neckBaseL, neckKneeR, neckKneeL);
  foldedTri(0, neckKneeL, neckKneeR, headBackR);
  foldedTri(0, neckKneeL, headBackR, headBackL);

  const crown = [0, 1.38, 1.53];
  const throat = [0, 1.18, 1.6];
  const beak = [0, 1.03, 2.02];
  foldedTri(0, headBackL, headBackR, crown);
  foldedTri(0, headBackL, throat, headBackR);
  foldedTri(0, crown, headBackR, beak);
  foldedTri(0, crown, beak, headBackL);
  foldedTri(0, headBackL, beak, throat);
  foldedTri(0, throat, beak, headBackR);

  const tailBaseL = [-0.06, 0.24, -0.57];
  const tailBaseR = [0.06, 0.24, -0.57];
  const tailFoldL = [-0.035, 0.58, -1.0];
  const tailFoldR = [0.035, 0.58, -1.0];
  const tailTip = [0, 0.82, -1.55];
  foldedTri(0, tailBaseL, tailBaseR, tailFoldR);
  foldedTri(0, tailBaseL, tailFoldR, tailFoldL);
  foldedTri(0, tailFoldL, tailFoldR, tailTip);

  function wing(sign, group) {
    const rootFront = [0.08 * sign, 0.48, 0.5];
    const rootBack = [0.08 * sign, 0.48, -0.48];
    const shoulderFront = [0.82 * sign, 0.42, 0.62];
    const shoulderBack = [0.92 * sign, 0.4, -0.62];
    const tip = [2.12 * sign, 0.18, -0.04];
    const crease = [1.0 * sign, 0.66, 0.02];
    if (sign > 0) {
      foldedTri(group, rootFront, shoulderFront, crease);
      foldedTri(group, shoulderFront, tip, crease);
      foldedTri(group, crease, tip, shoulderBack);
      foldedTri(group, crease, shoulderBack, rootBack);
      foldedTri(group, rootFront, crease, rootBack);
    } else {
      foldedTri(group, rootFront, crease, shoulderFront);
      foldedTri(group, shoulderFront, crease, tip);
      foldedTri(group, crease, shoulderBack, tip);
      foldedTri(group, crease, rootBack, shoulderBack);
      foldedTri(group, rootFront, rootBack, crease);
    }
  }
  wing(-1, 1);
  wing(1, 2);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aHingeGroup", new THREE.Float32BufferAttribute(hingeGroups, 1));
  const uvs = new Float32Array((positions.length / 3) * 2);
  for (let i = 0; i < positions.length / 3; i += 1) {
    uvs[i * 2] = positions[i * 3] * 0.32 + 0.5;
    uvs[i * 2 + 1] = positions[i * 3 + 2] * 0.32 + positions[i * 3 + 1] * 0.12 + 0.5;
  }
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

// ---------------------------------------------------------------------------
// The river's path: a closed loop threading through an entrance courtyard
// (pillars), a bridge crossing, and a garden — authored once as control
// points, then baked to a small DataTexture so the vertex shader can sample
// "position along the river" for any of the 10,000 instances without any
// per-frame CPU work (arbitrary curves aren't natively evaluable in a vertex
// shader, so baking to a texture is the standard technique for GPU-side
// curve-following motion at scale).
// ---------------------------------------------------------------------------
// Closed curve (see `true` below) already wraps the last point back to the first on its
// own — an explicit duplicate of the first point at the end used to create a zero-length
// closing segment. Right at that seam the curve's parametric speed collapsed to ~0, so the
// vertex shader's finite-difference tangent (centerAhead - centerHere) normalized a
// near-zero vector into an unstable, near-arbitrary direction — that's what read as cranes
// bunching up and spiraling around a single fixed point. No duplicate point here.
//
// Roughly twice the length of the original loop, with real elevation change (a low duck
// under the bridge around t=0.58, a high sweep over the courtyard around t=0.18) instead of
// the ~4-unit-tall, mostly-flat original — but the same overall footprint as the original
// (radius from center maxing out in the mid-30s, same as before): the extra length comes
// from more winding and more up/down travel, not a bigger scene. t=0.02-0.4 is the courtyard
// (pillars), t=0.58 is the bridge crossing, t=0.68-0.98 is the garden — same zones the
// architecture below places itself in.
const PATH_CONTROL_POINTS = [
  [-24, 10.2, 18], [-19, 11.2, 23], [-12, 10.4, 18], [-7, 9.4, 9],
  [0, 10.3, 14], [9, 11.4, 21], [18, 10.7, 20], [24, 10.1, 14],
  [19, 11.1, 8], [10, 10.3, 4], [15, 9.5, -2], [24, 10.4, -9],
  [23, 11.3, -17], [18, 10.6, -23], [10, 9.6, -18], [5, 10.5, -9],
  [0, 11.6, -14], [-9, 12.1, -23], [-18, 10.8, -22], [-24, 9.7, -16],
  [-21, 10.5, -8], [-12, 11.4, -4], [-17, 10.7, 2], [-25, 10.1, 9],
];

function buildPath() {
  const points = PATH_CONTROL_POINTS.map((p) => new THREE.Vector3(
    p[0] * PATH_FOOTPRINT,
    p[1],
    p[2] * PATH_FOOTPRINT,
  ));
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
  const sampled = curve.getPoints(PATH_SAMPLES);

  // Position texture's alpha channel (otherwise a constant unused 1) carries the local river
  // width multiplier at that arc position — the choke/wide taper, sampled once alongside
  // position instead of needing a whole second texture.
  const data = new Float32Array(PATH_SAMPLES * 4);
  for (let i = 0; i < PATH_SAMPLES; i += 1) {
    const p = sampled[i];
    data[i * 4] = p.x;
    data[i * 4 + 1] = p.y;
    data[i * 4 + 2] = p.z;
    data[i * 4 + 3] = widthProfileAt(i / PATH_SAMPLES);
  }
  const texture = new THREE.DataTexture(data, PATH_SAMPLES, 1, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  // Some mobile GPUs cannot linearly filter floating-point textures in a
  // vertex shader. Nearest float sampling is broadly supported; the shader
  // performs the interpolation itself so motion remains fully GPU-driven and
  // smooth instead of falling back to per-crane CPU updates.
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.generateMipmaps = false;

  return { curve, texture };
}

function makeWoodTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#3f2c1a";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 70; i += 1) {
    const y = i * 3.6 + seeded(i, 701) * 3;
    ctx.strokeStyle = `rgba(20, 12, 6, ${0.12 + seeded(i, 702) * 0.22})`;
    ctx.lineWidth = 1 + seeded(i, 703) * 2;
    ctx.beginPath();
    for (let x = 0; x <= size; x += 12) {
      const wave = Math.sin(x * 0.03 + i) * 4;
      if (x === 0) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  return texture;
}

// Draws a dot at (x, y) plus wrapped copies near any edge it overlaps, so
// speckle/grain textures built from many small circles still tile cleanly
// under RepeatWrapping instead of getting a stray half-circle cut off at
// the seam.
function paintSeamlessGrain(ctx, size, count, seedBase, colorFn, radiusRange = [0.35, 1.5]) {
  for (let i = 0; i < count; i += 1) {
    const x = seeded(i, seedBase) * size;
    const y = seeded(i, seedBase + 1) * size;
    const r = radiusRange[0] + seeded(i, seedBase + 2) * (radiusRange[1] - radiusRange[0]);
    ctx.fillStyle = colorFn(seeded(i, seedBase + 3));
    const dxs = x < r ? [0, size] : x > size - r ? [0, -size] : [0];
    const dys = y < r ? [0, size] : y > size - r ? [0, -size] : [0];
    dxs.forEach((dx) => {
      dys.forEach((dy) => {
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }
}

function makeStoneTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      // Integer frequencies on both axes so this tone field wraps with no seam
      // when the texture is repeated across a large surface like the pond ring.
      const blotch = Math.sin((u * 6 + v * 4) * Math.PI * 2) * 0.5
        + Math.sin((u * -3 + v * 7) * Math.PI * 2) * 0.32
        + Math.sin((u * 11 - v * 5) * Math.PI * 2) * 0.16;
      const tone = 1 + blotch * 0.1;
      const index = (y * size + x) * 4;
      image.data[index] = Math.min(255, 118 * tone);
      image.data[index + 1] = Math.min(255, 112 * tone);
      image.data[index + 2] = Math.min(255, 100 * tone);
      image.data[index + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  paintSeamlessGrain(ctx, size, 2000, 1601, (s) => `rgba(20, 18, 14, ${0.05 + s * 0.12})`, [0.4, 1.8]);
  paintSeamlessGrain(ctx, size, 900, 1701, (s) => `rgba(212, 204, 190, ${0.05 + s * 0.1})`, [0.3, 1.2]);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

function makeSandTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      const blotch = Math.sin((u * 5 + v * 3) * Math.PI * 2) * 0.5
        + Math.sin((u * -4 + v * 6) * Math.PI * 2) * 0.32
        + Math.sin((u * 9 - v * 2) * Math.PI * 2) * 0.18;
      const tone = 1 + blotch * 0.09;
      const index = (y * size + x) * 4;
      image.data[index] = Math.min(255, 150 * tone);
      image.data[index + 1] = Math.min(255, 130 * tone);
      image.data[index + 2] = Math.min(255, 98 * tone);
      image.data[index + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  paintSeamlessGrain(ctx, size, 3200, 1401, (s) => `rgba(255, 244, 214, ${0.04 + s * 0.1})`, [0.25, 0.9]);
  paintSeamlessGrain(ctx, size, 2200, 1501, (s) => `rgba(58, 44, 26, ${0.04 + s * 0.09})`, [0.25, 0.85]);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  return texture;
}

function makePaperNormalTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const fiberX = Math.sin(y * 0.72 + Math.sin(x * 0.09) * 1.7) * 7;
      const fiberY = Math.sin(x * 0.91 + Math.sin(y * 0.13)) * 4;
      image.data[index] = 128 + fiberX;
      image.data[index + 1] = 128 + fiberY;
      image.data[index + 2] = 246;
      image.data[index + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

// A heightfield made of several sine waves with random integer-vector
// frequencies (kx, ky) — integer components keep every individual wave
// exactly periodic over [0,1], so the sum is still seamless under
// RepeatWrapping, but random *orientation* (rather than picking terms along
// only the u and v axes) avoids the basket-weave/Moiré grid look a small set
// of axis-aligned waves produces. Amplitude falls off with frequency
// (roughly 1/|k|) so low frequencies read as big rolling swells and high
// frequencies as fine chop, the way real wind-driven water layers energy.
// The normal is the analytic gradient of that heightfield, not a
// finite-difference approximation.
function makeWaveNormalTexture({ size, waveCount, maxFreq, seedBase, strength }) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(size, size);

  const waves = [];
  for (let i = 0; i < waveCount; i += 1) {
    let kx = Math.round(THREE.MathUtils.lerp(-maxFreq, maxFreq, seeded(i, seedBase)));
    let ky = Math.round(THREE.MathUtils.lerp(-maxFreq, maxFreq, seeded(i, seedBase + 1)));
    if (kx === 0 && ky === 0) kx = 1;
    const freqLen = Math.hypot(kx, ky);
    const amp = 1 / freqLen ** 1.15;
    const phase = seeded(i, seedBase + 2) * Math.PI * 2;
    waves.push({ kx, ky, amp, phase });
  }
  const ampSum = waves.reduce((sum, w) => sum + w.amp, 0);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      let dx = 0;
      let dy = 0;
      waves.forEach((w) => {
        const grad = Math.cos((w.kx * u + w.ky * v) * Math.PI * 2 + w.phase) * w.amp;
        dx += grad * w.kx;
        dy += grad * w.ky;
      });
      dx = (dx / ampSum) * strength;
      dy = (dy / ampSum) * strength;
      const length = Math.hypot(dx, dy, 1);
      const index = (y * size + x) * 4;
      image.data[index] = 128 + (dx / length) * 90;
      image.data[index + 1] = 128 + (dy / length) * 90;
      image.data[index + 2] = 128 + (1 / length) * 120;
      image.data[index + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

function makeWaterNormalTexture() {
  const texture = makeWaveNormalTexture({
    size: 512, waveCount: 11, maxFreq: 8, seedBase: 2201, strength: 9,
  });
  texture.repeat.set(4, 4);
  return texture;
}

// A second, finer ripple layer sampled independently (different scale, own
// scroll speed) and blended into the primary normal in configureWaterShader
// below — the standard dual-layer trick real-time water shaders use so the
// surface doesn't read as one texture repeating, since the two layers are
// never in phase with each other.
function makeWaterDetailNormalTexture() {
  return makeWaveNormalTexture({
    size: 256, waveCount: 16, maxFreq: 27, seedBase: 2301, strength: 14,
  });
}

// Injects a second, independently-scrolling normal sample into
// MeshPhysicalMaterial's built-in normal-mapping chunk — `tbn` and
// `vNormalMapUv` are already in scope there (three.js sets them up earlier in
// the same fragment-shader function whenever a normalMap is present), so this
// only needs to add the extra sampler/uniforms and re-blend `normal`.
function configureWaterShader(shader, { detailTexture }) {
  shader.uniforms.uDetailNormalMap = { value: detailTexture };
  shader.uniforms.uDetailOffset = { value: new THREE.Vector2(0, 0) };
  shader.uniforms.uWaterTime = { value: 0 };
  shader.uniforms.uDetailScale = { value: 3.35 };
  shader.uniforms.uDetailStrength = { value: 0.24 };

  shader.fragmentShader = shader.fragmentShader
    .replace(
      "#include <common>",
      `
      uniform sampler2D uDetailNormalMap;
      uniform vec2 uDetailOffset;
      uniform float uWaterTime;
      uniform float uDetailScale;
      uniform float uDetailStrength;
      #include <common>
      `,
    )
    .replace(
      "#include <normal_fragment_maps>",
      `
      #include <normal_fragment_maps>
      vec2 waterUv = vNormalMapUv;
      float slowMorph = uWaterTime * 0.11;
      vec2 broadWarp = vec2(
        sin(waterUv.y * 1.17 + slowMorph) + sin((waterUv.x + waterUv.y) * 0.61 - slowMorph * 0.73),
        cos(waterUv.x * 1.31 - slowMorph * 0.81) + sin((waterUv.x - waterUv.y) * 0.77 + slowMorph * 0.57)
      ) * 0.31;
      broadWarp += vec2(
        sin(waterUv.y * 2.43 - uWaterTime * 0.043),
        cos(waterUv.x * 2.17 + uWaterTime * 0.037)
      ) * (0.11 + sin(uWaterTime * 0.067) * 0.035);
      vec2 detailUv = waterUv * uDetailScale + uDetailOffset + broadWarp;
      vec3 detailA = texture2D(uDetailNormalMap, detailUv).xyz * 2.0 - 1.0;
      vec3 detailB = texture2D(
        uDetailNormalMap,
        waterUv.yx * vec2(-4.17, 4.53) + uDetailOffset.yx * vec2(-0.63, 0.79)
          + broadWarp.yx * 1.37 + vec2(sin(slowMorph), cos(slowMorph * 0.83)) * 0.34
      ).xyz * 2.0 - 1.0;
      float fieldBlend = 0.42 + sin(uWaterTime * 0.083 + waterUv.x * 0.47 - waterUv.y * 0.39) * 0.16;
      vec3 waterDetailN = normalize(vec3(mix(detailA.xy, detailB.yx, fieldBlend), max(0.42, detailA.z * detailB.z)));
      waterDetailN.xy *= uDetailStrength;
      vec3 waterDetailWorld = normalize(tbn * normalize(waterDetailN));
      normal = normalize(normal + waterDetailWorld);
      `,
    );
}

// ---------------------------------------------------------------------------
// River flow field: GPU vertex-shader-driven, same "per-vertex shared /
// per-instance InstancedBufferAttribute, motion from uTime alone" scaffolding
// as Alien Dyson Swarm's satellite field. Each instance samples the baked
// path texture for its centerline position, offsets by a fixed per-instance
// lane (lateral+vertical), and flutters its wings continuously.
//
// Unlike the raw ShaderMaterial this used to be, this now injects that same
// motion logic into a real MeshStandardMaterial via onBeforeCompile — the
// same trick used to keep custom GPU-driven instancing while still letting
// Three's actual PBR lighting pipeline light the result. That means every
// real light already in the scene (the lamp's pointLight included) lights
// the cranes for real — proper falloff, proper decay, proper facing-based
// shading — the same way Mechanical Planetarium's sun lights its planets,
// rather than a hand-rolled distance formula standing in for one.
// ---------------------------------------------------------------------------
function configureRiverShader(shader, { pathTexture, flowSpeedMul, riverWidthMul, wingFlutter }) {
  shader.uniforms.uPathTexture = { value: pathTexture };
  shader.uniforms.uTime = { value: 0 };
  shader.uniforms.uFlowSpeed = { value: flowSpeedMul };
  shader.uniforms.uRiverWidth = { value: riverWidthMul };
  shader.uniforms.uWingFlutter = { value: wingFlutter };

  shader.vertexShader = shader.vertexShader
    .replace(
      "#include <common>",
      `
      attribute float aHingeGroup;
      attribute float aPathPhase;
      attribute float aLaneX;
      attribute float aLaneY;
      attribute float aFlapPhase;
      attribute float aFlapSpeed;
      attribute float aColorSeed;
      attribute float aWeavePhase;
      attribute float aScale;
      attribute float aSpeed;

      uniform sampler2D uPathTexture;
      uniform float uTime;
      uniform float uFlowSpeed;
      uniform float uRiverWidth;
      uniform float uWingFlutter;

      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      vec4 riverSamplePath(float u) {
        float samplePosition = fract(u) * ${PATH_SAMPLES.toFixed(1)};
        float sampleIndex = floor(samplePosition);
        float sampleMix = fract(samplePosition);
        float nextIndex = mod(sampleIndex + 1.0, ${PATH_SAMPLES.toFixed(1)});
        float uvA = (sampleIndex + 0.5) / ${PATH_SAMPLES.toFixed(1)};
        float uvB = (nextIndex + 0.5) / ${PATH_SAMPLES.toFixed(1)};
        vec4 sampleA = texture2D(uPathTexture, vec2(uvA, 0.5));
        vec4 sampleB = texture2D(uPathTexture, vec2(uvB, 0.5));
        return mix(sampleA, sampleB, sampleMix);
      }

      vec3 riverRotateAroundAxis(vec3 p, vec3 axis, float angle) {
        return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
      }

      void riverApplyFlap(inout vec3 p, inout vec3 n, int group, float signedFlap) {
        vec3 pivot = vec3(0.0);
        vec3 axis = vec3(0.0, 0.0, 1.0);
        float closedAngle = 0.0;
        if (group == 1) { pivot = vec3(-0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
        else if (group == 2) { pivot = vec3(0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
        else { return; }
        // signedFlap spans the complete wing stroke: positive rotates the
        // wings down, zero is level, and negative rotates them upward.
        float angle = closedAngle * signedFlap;
        vec3 local = p - pivot;
        p = riverRotateAroundAxis(local, axis, angle) + pivot;
        n = riverRotateAroundAxis(n, axis, angle);
      }
      #include <common>
      `,
    )
    .replace(
      "#include <beginnormal_vertex>",
      `
      // aPathPhase is each crane's own clock offset (time, not position) — the phase
      // texture maps "how far through one loop period" to the arc position that actually
      // corresponds to, given the variable speed profile below. Near the choke, arc
      // position advances slowly for a given time step (cranes bunch up); out in the wide
      // stretch it advances quickly (they spread out).
      float riverTimeFrac = fract(aPathPhase + uTime * uFlowSpeed * aSpeed);
      // Direct closed-spline phase avoids the old lookup texture's 1-to-0
      // interpolation seam, which could teleport and blink individual cranes.
      float riverU = riverTimeFrac;
      vec4 riverHereSample = riverSamplePath(riverU);
      vec3 riverCenterHere = riverHereSample.xyz;
      float riverWidthHere = riverHereSample.w;
      float riverUAhead = fract(riverU + 0.004);
      float riverUBehind = fract(riverU - 0.004);
      vec3 riverCenterAhead = riverSamplePath(riverUAhead).xyz;
      vec3 riverCenterBehind = riverSamplePath(riverUBehind).xyz;
      vec3 riverTangentDelta = riverCenterAhead - riverCenterBehind;
      vec3 riverTangent = riverTangentDelta / max(length(riverTangentDelta), 0.0001);

      vec3 riverWorldUp = abs(riverTangent.y) > 0.92
        ? vec3(0.0, 0.0, 1.0)
        : vec3(0.0, 1.0, 0.0);
      vec3 riverRightDelta = cross(riverWorldUp, riverTangent);
      vec3 riverRight = riverRightDelta / max(length(riverRightDelta), 0.0001);
      vec3 riverUp = normalize(cross(riverTangent, riverRight));

      int riverGroup = int(aHingeGroup + 0.5);
      vec3 riverLocalPos = position;
      vec3 riverLocalNormal = normal;
      float riverSignedFlap = sin(uTime * aFlapSpeed + aFlapPhase) * min(1.0, uWingFlutter * 0.4);
      riverApplyFlap(riverLocalPos, riverLocalNormal, riverGroup, riverSignedFlap);

      vec3 objectNormal = normalize(riverRight * riverLocalNormal.x + riverUp * riverLocalNormal.y + riverTangent * riverLocalNormal.z);
      `,
    )
    .replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      float riverWeave = sin(uTime * (0.32 + aFlapSpeed * 0.025) + aWeavePhase + riverU * 18.0);
      vec3 riverLaneOffset = riverRight * (aLaneX + riverWeave * 0.16) * uRiverWidth * riverWidthHere
        + riverUp * (aLaneY + cos(aWeavePhase + riverU * 14.0) * 0.08) * uRiverWidth * riverWidthHere;
      vec3 riverOrientedBody = riverRight * riverLocalPos.x + riverUp * riverLocalPos.y + riverTangent * riverLocalPos.z;
      transformed = riverCenterHere + riverLaneOffset + riverOrientedBody * (0.115 * aScale);
      vColorSeedV = aColorSeed;
      vPaperCoordV = riverLocalPos.xz * 5.0 + riverLocalPos.yy * 1.7;
      `,
    );

  shader.fragmentShader = shader.fragmentShader
    .replace(
      "#include <common>",
      `
      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      // One color per crane, drawn once from its own instance seed — never reinterpolated
      // by position along the river, so a crane's color stays fixed for its whole journey.
      vec3 riverHsl2rgb(vec3 hsl) {
        vec3 rgb = clamp(abs(mod(hsl.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0 * hsl.z - 1.0));
      }
      float riverPaperNoise(vec2 p) {
        float fibers = sin(p.x * 37.0 + sin(p.y * 9.0) * 2.0) * 0.5 + 0.5;
        float crossFibers = sin(p.y * 51.0 + p.x * 3.0) * 0.5 + 0.5;
        return fibers * 0.65 + crossFibers * 0.35;
      }
      float riverDotPattern(vec2 p) {
        vec2 cell = fract(p) - 0.5;
        return 1.0 - smoothstep(0.12, 0.2, length(cell));
      }
      #include <common>
      `,
    )
    .replace(
      "#include <color_fragment>",
      `
      #include <color_fragment>
      // Night sky: lightness stays low across the board so cranes read as dark silhouettes
      // except where a real light (the lamp, mainly) actually reaches them — hue and
      // saturation still vary per instance for the "standard colors, some dark" mix.
      float riverHue = fract(vColorSeedV * 3.7 + 0.15);
      float riverSat = mix(0.52, 0.92, fract(vColorSeedV * 9.13 + 0.41));
      float riverLight = mix(0.025, 0.18, fract(vColorSeedV * 17.7 + 0.63));
      vec3 riverColor = riverHsl2rgb(vec3(riverHue, riverSat, riverLight));
      float riverFiber = riverPaperNoise(vPaperCoordV + vColorSeedV * 7.0);
      riverColor *= mix(0.88, 1.08, riverFiber);

      // Half the flock receives one of three stable, seed-selected origami
      // paper patterns: fine stripes, a diamond lattice, or small ink dots.
      float riverPatternEnabled = step(0.5, fract(vColorSeedV * 19.73));
      float riverPatternChoice = floor(fract(vColorSeedV * 43.17) * 3.0);
      vec2 riverPatternUv = vPaperCoordV * mix(1.5, 3.2, fract(vColorSeedV * 8.9));
      float riverStripes = smoothstep(0.45, 0.58, sin((riverPatternUv.x + riverPatternUv.y * 0.24) * 10.0) * 0.5 + 0.5);
      float riverLattice = smoothstep(0.72, 0.9, max(
        abs(sin((riverPatternUv.x + riverPatternUv.y) * 5.0)),
        abs(sin((riverPatternUv.x - riverPatternUv.y) * 5.0))
      ));
      float riverDots = riverDotPattern(riverPatternUv * 1.7);
      float riverPattern = riverPatternChoice < 0.5
        ? riverStripes
        : (riverPatternChoice < 1.5 ? riverLattice : riverDots);
      float riverInkStrength = mix(0.38, 0.68, fract(vColorSeedV * 6.31));
      riverColor *= mix(1.0, mix(1.12, riverInkStrength, riverPattern), riverPatternEnabled);
      diffuseColor.rgb = riverColor;
      `,
    );
}

function buildRiverGeometry(craneGeometry, count) {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = craneGeometry.index;
  geometry.attributes.position = craneGeometry.attributes.position;
  geometry.attributes.normal = craneGeometry.attributes.normal;
  geometry.attributes.aHingeGroup = craneGeometry.attributes.aHingeGroup;

  const pathPhase = new Float32Array(count);
  const laneX = new Float32Array(count);
  const laneY = new Float32Array(count);
  const flapPhase = new Float32Array(count);
  const flapSpeed = new Float32Array(count);
  const colorSeed = new Float32Array(count);
  const weavePhase = new Float32Array(count);
  const instanceScale = new Float32Array(count);
  const instanceSpeed = new Float32Array(count);

  const laneCount = 64;
  const cranesPerLane = Math.ceil(count / laneCount);

  for (let i = 0; i < count; i += 1) {
    const laneIndex = i % laneCount;
    const slot = Math.floor(i / laneCount);
    // Each lane is evenly staggered along the route. A small seeded offset
    // keeps it organic without allowing neighboring cranes to share a slot.
    pathPhase[i] = (slot + seeded(i, 901) * 0.22 + laneIndex / laneCount) / cranesPerLane;
    const laneRadius = 0.28 + Math.sqrt((laneIndex + 0.5) / laneCount) * 2.8;
    const laneAngle = laneIndex * 2.399963229728653;
    laneX[i] = Math.cos(laneAngle) * laneRadius;
    laneY[i] = Math.sin(laneAngle) * laneRadius * 0.52;
    flapPhase[i] = seeded(i, 904) * Math.PI * 2;
    flapSpeed[i] = 2.2 + seeded(i, 905) * 1.6;
    colorSeed[i] = seeded(i, 906);
    weavePhase[i] = seeded(i, 907) * Math.PI * 2;
    instanceScale[i] = 1 + seeded(i, 908) * 0.1;
    instanceSpeed[i] = 0.94 + seeded(i, 909) * 0.12;
  }

  geometry.setAttribute("aPathPhase", new THREE.InstancedBufferAttribute(pathPhase, 1));
  geometry.setAttribute("aLaneX", new THREE.InstancedBufferAttribute(laneX, 1));
  geometry.setAttribute("aLaneY", new THREE.InstancedBufferAttribute(laneY, 1));
  geometry.setAttribute("aFlapPhase", new THREE.InstancedBufferAttribute(flapPhase, 1));
  geometry.setAttribute("aFlapSpeed", new THREE.InstancedBufferAttribute(flapSpeed, 1));
  geometry.setAttribute("aColorSeed", new THREE.InstancedBufferAttribute(colorSeed, 1));
  geometry.setAttribute("aWeavePhase", new THREE.InstancedBufferAttribute(weavePhase, 1));
  geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(instanceScale, 1));
  geometry.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(instanceSpeed, 1));
  geometry.instanceCount = count;
  return geometry;
}

// A miniature stone garden lantern (tōrō-style): pedestal, light chamber,
// and cap all carved from the same stone material, with a downward-aimed
// spotLight so its glow visibly pools on the sand below and — since the
// pond's CubeCamera captures whatever is actually lit in the scene — shows
// up in the water's reflection too, not just a flat ambient point light.
function GardenLantern({ position, stoneMaterial, lampColor }) {
  const lightRef = useRef(null);
  const targetRef = useRef(null);
  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.2, 1.0, 8]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.4, 0.42]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.24, 0.22, 0.24]} />
        <meshStandardMaterial color="#3a2410" emissive={lampColor} emissiveIntensity={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.42, 0]} castShadow>
        <coneGeometry args={[0.34, 0.32, 8]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>
      <pointLight position={[0, 1.1, 0]} color={lampColor} intensity={1.6} distance={4.5} decay={2} />
      <spotLight
        ref={lightRef}
        position={[0, 1.15, 0]}
        color={lampColor}
        intensity={9}
        distance={7}
        angle={Math.PI / 4.2}
        penumbra={0.65}
        decay={2}
      />
      <object3D ref={targetRef} position={[0, -0.6, 0]} />
    </group>
  );
}

function BambooCluster({ position, scale = 1, seed = 0 }) {
  const stalks = useMemo(() => Array.from({ length: 9 }, (_, index) => ({
    x: (seeded(index, 3100 + seed) - 0.5) * 2.8,
    z: (seeded(index, 3200 + seed) - 0.5) * 2.2,
    height: 5.5 + seeded(index, 3300 + seed) * 4.5,
    lean: (seeded(index, 3400 + seed) - 0.5) * 0.08,
  })), [seed]);

  return (
    <group position={position} scale={scale}>
      {stalks.map((stalk, index) => (
        <group key={index} position={[stalk.x, 0, stalk.z]} rotation={[stalk.lean, 0, -stalk.lean * 0.7]}>
          <mesh position={[0, stalk.height * 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.075, 0.105, stalk.height, 8]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#405d38" : "#567247"} roughness={0.8} />
          </mesh>
          {Array.from({ length: 5 }, (_, joint) => {
            const y = stalk.height * (0.22 + joint * 0.155);
            return (
              <group key={joint} position={[0, y, 0]} rotation={[0, joint * 2.1 + index, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.118, 0.118, 0.055, 8]} />
                  <meshStandardMaterial color="#293e29" roughness={0.88} />
                </mesh>
                {joint > 1 && (
                  <mesh position={[0.58, 0.12, 0]} rotation={[0, 0, -0.22]} castShadow>
                    <sphereGeometry args={[0.72, 7, 4]} />
                    <meshStandardMaterial color="#314d35" roughness={0.94} />
                  </mesh>
                )}
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function ZenGardenDetails({ stoneMaterial, woodMaterial }) {
  const shrubs = useMemo(() => [
    [-17, 0.7, 6.5, 1.5], [-14.8, 0.55, 5.5, 1.05],
    [15.5, 0.75, 7.2, 1.6], [18, 0.5, 5.9, 1.0],
    [-17.5, 0.65, -8.5, 1.35], [16.8, 0.6, -9.3, 1.25],
  ], []);

  return (
    <group>
      <BambooCluster position={[-22, 0, -6]} scale={1.05} seed={1} />
      <BambooCluster position={[21, 0, 5.5]} scale={0.92} seed={2} />
      <BambooCluster position={[18.5, 0, -13]} scale={0.72} seed={3} />
      {shrubs.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={[scale * 1.35, scale * 0.72, scale]} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={index % 2 ? "#263c2b" : "#304932"} roughness={0.98} />
        </mesh>
      ))}
      <group position={[-1, 0, 16.5]} rotation={[0, 0.08, 0]}>
        <mesh position={[-3.1, 3.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 6.8, 0.72]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[3.1, 3.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 6.8, 0.72]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 6.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.6, 0.58, 0.72]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 5.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.4, 0.42, 0.6]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
      </group>
      {[-6.5, -3.2, 3.4, 6.7].map((x, index) => (
        <mesh key={x} position={[x, 0.38, -14.4 + Math.sin(index) * 0.65]} scale={[1.45, 0.55, 0.9]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
          <primitive object={stoneMaterial} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function MoonlitGarden({ stoneMaterial }) {
  const speed = useSpeed();
  const isDesktop = useMemo(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    [],
  );
  const waterNormal = useMemo(() => makeWaterNormalTexture(), []);
  const waterDetailNormal = useMemo(() => makeWaterDetailNormalTexture(), []);
  useEffect(() => () => {
    waterNormal.dispose();
    waterDetailNormal.dispose();
  }, [waterNormal, waterDetailNormal]);
  const waterShaderRef = useRef(null);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed;
    // Wind speed/heading wander slowly via a few non-integer-ratio sine terms
    // so the drift reads as gently gusting rather than a fixed linear scroll.
    const windX = 0.012 + Math.sin(t * 0.021) * 0.004 + Math.sin(t * 0.053 + 1.7) * 0.003;
    const windY = -0.008 + Math.cos(t * 0.017 + 0.6) * 0.003 + Math.sin(t * 0.037 + 3.1) * 0.0025;
    waterNormal.offset.x = (waterNormal.offset.x + delta * windX + 1) % 1;
    waterNormal.offset.y = (waterNormal.offset.y + delta * windY + 1) % 1;
    waterNormal.rotation = Math.sin(t * 0.035) * 0.06
      + Math.sin(t * 0.081 + 2.4) * 0.03
      + Math.sin(t * 0.019 + 5.2) * 0.025;

    const shader = waterShaderRef.current;
    if (shader) {
      shader.uniforms.uWaterTime.value = t;
      const detailOffset = shader.uniforms.uDetailOffset.value;
      detailOffset.x = (detailOffset.x + delta * -0.045 * speed + 1) % 1;
      detailOffset.y = (detailOffset.y + delta * 0.031 * speed + 1) % 1;
    }
  });

  const steppingStones = useMemo(() => Array.from({ length: 17 }, (_, i) => {
    const t = i / 16;
    return {
      x: THREE.MathUtils.lerp(-10.5, 10.5, t),
      z: -1.4 + Math.sin(t * Math.PI * 2.2) * 2.1,
      rotation: seeded(i, 1201) * Math.PI,
      scale: 0.72 + seeded(i, 1202) * 0.38,
    };
  }), []);

  const rocks = useMemo(() => [
    [-12.8, 0.65, 7.8, 1.2], [-10.9, 0.42, 9.1, 0.75],
    [12.4, 0.72, -8.8, 1.35], [14.1, 0.38, -7.2, 0.68],
    [-3.8, 0.5, -12.6, 0.9], [5.2, 0.44, 11.8, 0.82],
  ], []);

  return (
    <group>
      <CubeCamera resolution={isDesktop ? 192 : 96} frames={1} near={0.5} far={180}>
        {(environmentMap) => (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -1.5]} scale={[1.45, 0.78, 1]} receiveShadow>
            <circleGeometry args={[9.6, 96]} />
            <meshPhysicalMaterial
              color="#07131f"
              envMap={environmentMap}
              envMapIntensity={0.78}
              normalMap={waterNormal}
              normalScale={[0.2, 0.2]}
              roughness={0.24}
              metalness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.2}
              reflectivity={0.82}
              onBeforeCompile={(shader) => {
                configureWaterShader(shader, { detailTexture: waterDetailNormal });
                waterShaderRef.current = shader;
              }}
            />
          </mesh>
        )}
      </CubeCamera>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -1.5]} scale={[1.45, 0.78, 1]} receiveShadow>
        <ringGeometry args={[9.55, 10.2, 80]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {steppingStones.map((stone, index) => (
        <mesh
          key={`step-${index}`}
          position={[stone.x, 0.16, stone.z]}
          rotation={[0, stone.rotation, 0]}
          scale={[stone.scale * 1.25, 1, stone.scale]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.65, 0.78, 0.28, 9]} />
          <primitive object={stoneMaterial} attach="material" />
        </mesh>
      ))}

      {rocks.map(([x, y, z, scale], index) => (
        <mesh key={`rock-${index}`} position={[x, y, z]} scale={[scale, scale * 0.72, scale]} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <primitive object={stoneMaterial} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function RiverScene({ settings, onStats }) {
  const { camera, gl } = useThree();
  const speed = useSpeed();
  const craneCount = Math.round(THREE.MathUtils.clamp(settings.craneCount ?? 6000, 2000, MAX_CRANES));
  const flowSpeedMul = (settings.flowSpeed ?? 1) * 0.0064;
  const riverWidthMul = (settings.riverWidth ?? 100) / 100;
  const wingFlutter = 2.5;
  const lampHeight = settings.lampHeight ?? 11.5;
  const lampIntensity = settings.lampIntensity ?? 220;
  const lampRange = settings.lampRange ?? 220;
  const lampFalloff = settings.lampFalloff ?? 2;
  const droneMode = settings.droneMode ?? false;
  const isDesktop = useMemo(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    [],
  );
  const shadowMapSize = isDesktop ? 1024 : 512;

  const craneGeometry = useMemo(() => buildCraneGeometry(), []);
  const { texture: pathTexture } = useMemo(() => buildPath(), []);
  const riverGeometry = useMemo(
    () => buildRiverGeometry(craneGeometry, craneCount),
    [craneGeometry, craneCount],
  );
  const paperNormalTexture = useMemo(() => makePaperNormalTexture(), []);

  // Real MeshStandardMaterial now (not a raw ShaderMaterial) — onBeforeCompile injects the
  // GPU-driven instance motion into its vertex shader while leaving Three's own PBR lighting
  // chunks intact, so every real light in the scene (the lamp's pointLight below included)
  // lights the cranes for real, the same way Mechanical Planetarium's sun lights its planets.
  const compiledShaderRef = useRef(null);
  const riverMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.78,
      metalness: 0.02,
      normalMap: paperNormalTexture,
      normalScale: new THREE.Vector2(0.32, 0.32),
      side: THREE.DoubleSide,
    });
    material.onBeforeCompile = (shader) => {
      configureRiverShader(shader, { pathTexture, flowSpeedMul, riverWidthMul, wingFlutter });
      compiledShaderRef.current = shader;
    };
    return material;
  }, [pathTexture, paperNormalTexture, flowSpeedMul, riverWidthMul, wingFlutter]);

  useEffect(() => () => { riverGeometry.dispose(); }, [riverGeometry]);
  useEffect(() => () => { riverMaterial.dispose(); }, [riverMaterial]);
  useEffect(() => () => { paperNormalTexture.dispose(); }, [paperNormalTexture]);

  useEffect(() => {
    const previousToneMapping = gl.toneMapping;
    const previousExposure = gl.toneMappingExposure;
    const previousColorSpace = gl.outputColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.82;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    return () => {
      gl.toneMapping = previousToneMapping;
      gl.toneMappingExposure = previousExposure;
      gl.outputColorSpace = previousColorSpace;
    };
  }, [gl]);

  const woodTexture = useMemo(() => makeWoodTexture(), []);
  const stoneTexture = useMemo(() => makeStoneTexture(), []);
  const sandTexture = useMemo(() => makeSandTexture(), []);
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: woodTexture, bumpMap: woodTexture, bumpScale: 0.14,
    color: "#c09a68", roughness: 0.82, metalness: 0.02,
  }), [woodTexture]);
  const stoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: stoneTexture, bumpMap: stoneTexture, bumpScale: 0.16,
    color: "#858078", roughness: 0.91, metalness: 0.015,
  }), [stoneTexture]);
  const groundMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: sandTexture,
    bumpMap: sandTexture,
    bumpScale: 0.06,
    color: "#e2d3ad",
    roughness: 0.95,
    metalness: 0.01,
  }), [sandTexture]);

  // Evenly spaced around the pond's ellipse (center [0, -1.5], matching
  // MoonlitGarden's water disc), rather than clustered along one stretch of
  // the river path — four posts, one per quadrant.
  const gardenLanterns = useMemo(() => {
    const centerX = 0;
    const centerZ = -1.5;
    const radiusX = 16.4;
    const radiusZ = 9.4;
    return [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle) => new THREE.Vector3(
      centerX + Math.cos(angle) * radiusX,
      0,
      centerZ + Math.sin(angle) * radiusZ,
    ));
  }, []);

  const dragRef = useDragOrbit({ pitchMin: -0.85, pitchMax: 0.85 });
  const travelRef = useRef(0.08);
  const overviewYawRef = useRef(0.42);
  const distanceRef = useRef(62);
  const targetDistanceRef = useRef(62);
  const statsTimerRef = useRef({ frames: 0, time: 0 });
  const droneKeysRef = useRef(new Set());
  const droneLookRef = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    camera.position.set(23, 36, 43);
    camera.lookAt(1, 8.5, -3);
  }, [camera]);

  useEffect(() => {
    if (droneMode) {
      const forward = camera.getWorldDirection(new THREE.Vector3());
      droneLookRef.current.yaw = Math.atan2(forward.x, forward.z);
      droneLookRef.current.pitch = Math.asin(THREE.MathUtils.clamp(forward.y, -1, 1));
    }
    dragRef.current.targetYaw = 0;
    dragRef.current.targetPitch = 0;
    droneKeysRef.current.clear();
  }, [camera, droneMode, dragRef]);

  useEffect(() => {
    const keys = droneKeysRef.current;
    const onKeyDown = (event) => {
      if (!droneMode || event.repeat) return;
      const key = event.code === "Space" ? "space" : event.key.toLowerCase();
      if (["w", "a", "s", "d", "q", "e", "space", "shift"].includes(key)) {
        keys.add(key);
        event.preventDefault();
      }
    };
    const onKeyUp = (event) => keys.delete(event.code === "Space" ? "space" : event.key.toLowerCase());
    const onBlur = () => keys.clear();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [droneMode]);

  useEffect(() => {
    const canvas = gl.domElement;
    let pinchStartDistance = 0;
    let pinchStartCameraDistance = targetDistanceRef.current;

    const onWheel = (event) => {
      if (droneMode) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      event.preventDefault();
      targetDistanceRef.current = THREE.MathUtils.clamp(
        targetDistanceRef.current * Math.exp(event.deltaY * 0.0012),
        18,
        115,
      );
    };

    const touchDistance = (touches) => Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY,
    );

    const onTouchStart = (event) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      // Suspend the one-finger orbit gesture while both fingers control zoom.
      dragRef.current.dragging = false;
      pinchStartDistance = Math.max(1, touchDistance(event.touches));
      pinchStartCameraDistance = targetDistanceRef.current;
    };

    const onTouchMove = (event) => {
      if (event.touches.length !== 2 || pinchStartDistance <= 0) return;
      event.preventDefault();
      dragRef.current.dragging = false;
      const currentDistance = Math.max(1, touchDistance(event.touches));
      targetDistanceRef.current = THREE.MathUtils.clamp(
        pinchStartCameraDistance * (pinchStartDistance / currentDistance),
        18,
        115,
      );
    };

    const onTouchEnd = (event) => {
      if (event.touches.length < 2) pinchStartDistance = 0;
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);
    return () => {
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [droneMode, gl]);

  useEffect(() => {
    const canvas = gl.domElement;
    const hideDroneCursor = (event) => {
      if (!droneMode || event.pointerType === "touch") return;
      canvas.style.cursor = "none";
    };
    const restoreDroneCursor = () => {
      canvas.style.cursor = "";
    };
    canvas.addEventListener("pointerdown", hideDroneCursor);
    canvas.addEventListener("pointerup", restoreDroneCursor);
    canvas.addEventListener("pointercancel", restoreDroneCursor);
    window.addEventListener("blur", restoreDroneCursor);
    return () => {
      restoreDroneCursor();
      canvas.removeEventListener("pointerdown", hideDroneCursor);
      canvas.removeEventListener("pointerup", restoreDroneCursor);
      canvas.removeEventListener("pointercancel", restoreDroneCursor);
      window.removeEventListener("blur", restoreDroneCursor);
    };
  }, [droneMode, gl]);

  useFrame((state, rawDelta) => {
    const elapsed = state.clock.elapsedTime * speed;
    const shader = compiledShaderRef.current;
    if (shader) {
      shader.uniforms.uTime.value = elapsed;
      shader.uniforms.uFlowSpeed.value = flowSpeedMul;
      shader.uniforms.uRiverWidth.value = riverWidthMul;
      shader.uniforms.uWingFlutter.value = wingFlutter;
    }

    travelRef.current = (travelRef.current + Math.min(rawDelta, 0.05) * speed * 0.01) % 1;
    if (droneMode) {
      const delta = Math.min(rawDelta, 0.05);
      const yaw = droneLookRef.current.yaw + dragRef.current.targetYaw;
      const pitch = THREE.MathUtils.clamp(
        droneLookRef.current.pitch - dragRef.current.targetPitch,
        -1.48,
        1.48,
      );
      const forward = new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch),
        Math.sin(pitch),
        Math.cos(yaw) * Math.cos(pitch),
      ).normalize();
      const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize();
      const movement = new THREE.Vector3();
      const keys = droneKeysRef.current;
      if (keys.has("w")) movement.add(forward);
      if (keys.has("s")) movement.sub(forward);
      if (keys.has("a")) movement.add(right);
      if (keys.has("d")) movement.sub(right);
      if (keys.has("e")) movement.y += 1;
      if (keys.has("q")) movement.y -= 1;
      if (keys.has("space")) movement.y += 1;
      if (keys.has("shift")) movement.y -= 1;
      if (movement.lengthSq() > 0) {
        camera.position.addScaledVector(movement.normalize(), 15 * delta);
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -120, 120);
        camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.8, 90);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -120, 120);
      }
      camera.lookAt(camera.position.clone().add(forward));
    } else {
      // Survey the entire current from far above; drag offsets this slow orbit.
      const yaw = dragRef.current.targetYaw;
      const pitch = dragRef.current.targetPitch;
      overviewYawRef.current += Math.min(rawDelta, 0.05) * speed * 0.018;
      const overviewYaw = overviewYawRef.current + yaw;
      const overviewPitch = 0.48 + pitch * 0.55;
      distanceRef.current = THREE.MathUtils.damp(
        distanceRef.current,
        targetDistanceRef.current,
        9,
        Math.min(rawDelta, 0.05),
      );
      const overviewDistance = distanceRef.current;
      const overviewFocus = new THREE.Vector3(1, 8.5, -3);
      camera.position.set(
        overviewFocus.x + Math.sin(overviewYaw) * Math.cos(overviewPitch) * overviewDistance,
        overviewFocus.y + Math.sin(overviewPitch) * overviewDistance,
        overviewFocus.z + Math.cos(overviewYaw) * Math.cos(overviewPitch) * overviewDistance,
      );
      camera.lookAt(overviewFocus);
    }

    // Zone label still tracks where the camera's slow auto-orbit is dwelling — only the sky
    // color itself no longer follows it.
    const warmth = 1 - THREE.MathUtils.smoothstep(travelRef.current, 0, 0.62);

    statsTimerRef.current.frames += 1;
    statsTimerRef.current.time += rawDelta;
    if (statsTimerRef.current.time >= 0.5) {
      onStats({
        fps: Math.round(statsTimerRef.current.frames / statsTimerRef.current.time),
        zone: warmth > 0.5 ? "TEMPLE COURTYARD" : "MOONLIT GARDEN",
      });
      statsTimerRef.current.frames = 0;
      statsTimerRef.current.time = 0;
    }
  });

  useEffect(() => {
    const backendName = gl?.constructor?.name ?? "WebGL2";
    onStats({ gpu: backendName.includes("WebGPU") ? "WebGPU" : "WebGL2", cranes: craneCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [craneCount]);

  return (
    <group>
      <ambientLight intensity={0.008} color="#b9c8e8" />
      <hemisphereLight color="#53658f" groundColor="#08070a" intensity={0.008} />
      <directionalLight position={[8, 10, 6]} intensity={0.05} color="#7186b8" />
      <directionalLight
        position={[-58, 70, -72]}
        intensity={0.22}
        color="#9eb7ea"
        castShadow={isDesktop}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-44}
        shadow-camera-right={44}
        shadow-camera-top={44}
        shadow-camera-bottom={-44}
        shadow-camera-near={20}
        shadow-camera-far={170}
        shadow-bias={-0.00025}
        shadow-normalBias={0.025}
      />
      <mesh position={[-58, 70, -72]}>
        <sphereGeometry args={[6.5, 40, 24]} />
        <meshBasicMaterial color="#d9e3f5" fog={false} toneMapped={false} />
      </mesh>
      <Stars radius={105} depth={38} count={900} factor={1.1} saturation={0.15} fade={false} speed={0} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[40, 96]} />
        <primitive object={groundMaterial} attach="material" />
      </mesh>
      <MoonlitGarden stoneMaterial={stoneMaterial} />
      <ZenGardenDetails stoneMaterial={stoneMaterial} woodMaterial={woodMaterial} />

      <WishingTreeModel
        position={[-10.5, 0, 9]}
        rotation={[0, 0.38, 0]}
        scale={0.68}
        petalCount={isDesktop ? 40000 : 9000}
        fallingPetals={isDesktop ? 600 : 180}
        windIntensity={0.7}
      />

      {Array.from({ length: 6 }, (_, index) => (
        <mesh
          key={`raked-ring-${index}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10.5, 0.018 + index * 0.0004, 9]}
          receiveShadow
        >
          <ringGeometry args={[2.1 + index * 0.72, 2.15 + index * 0.72, 80]} />
          <meshStandardMaterial color="#4b5260" roughness={0.96} />
        </mesh>
      ))}

      <group position={[11.8, 0, 8.8]}>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.2, 0.84, 12]} />
          <primitive object={stoneMaterial} attach="material" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.85, 0]}>
          <circleGeometry args={[0.82, 32]} />
          <meshPhysicalMaterial color="#081520" roughness={0.24} metalness={0.12} clearcoat={1} />
        </mesh>
      </group>

      {MAIN_LAMPS.map((lamp, index) => (
        <group key={`main-lamp-${index}`} position={lamp.position}>
          <mesh position={[0, 5.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.7, 10.2, 10]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 10.35, 0]} castShadow>
            <cylinderGeometry args={[1.15, 0.52, 0.65, 10]} />
            <primitive object={woodMaterial} attach="material" />
          </mesh>
          <mesh position={[0, lampHeight, 0]}>
            <sphereGeometry args={[0.72, 24, 16]} />
            <meshStandardMaterial
              color="#5a3518"
              emissive={lamp.color}
              emissiveIntensity={0.85}
              roughness={0.38}
            />
          </mesh>
          <pointLight
            position={[0, lampHeight, 0]}
            color={lamp.color}
            intensity={lampIntensity}
            distance={lampRange}
            decay={lampFalloff}
            castShadow={isDesktop}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-bias={-0.0004}
          />
          <pointLight
            position={[0, 0.35, 0]}
            color={lamp.color}
            intensity={lampIntensity * 0.055}
            distance={18}
            decay={2}
          />
        </group>
      ))}

      {gardenLanterns.map((p, i) => (
        <GardenLantern key={i} position={p} stoneMaterial={stoneMaterial} lampColor="#ffd9a0" />
      ))}

      <mesh geometry={riverGeometry} material={riverMaterial} frustumCulled={false} />
    </group>
  );
}

export default function RiverOfWishes({ settings = {} }) {
  const [stats, setStats] = useState({ fps: 60, gpu: "—", cranes: 0, zone: "TEMPLE COURTYARD" });
  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));

  return (
    <section className="atmosphere river-of-wishes" style={{ "--experiment-accent": "#e6c88a" }}>
      <CanvasStage
        camera={{ position: [23, 36, 43], fov: 46, near: 0.1, far: 300 }}
        speed={settings.speed ?? 1}
        shadows
        bloom={{ intensity: 0.8, threshold: 0.6 }}
      >
        <color attach="background" args={[SKY_COLOR]} />
        <fogExp2 attach="fog" args={[SKY_COLOR, 0.009]} />
        <RiverScene settings={settings} onStats={onStats} />
      </CanvasStage>

      <div className="experiment-copy river-of-wishes__copy">
        <p>10 — A river suspended in midair</p>
        <h1>The River<br />of Wishes.</h1>
        <span>Ten thousand patterned paper cranes become a suspended river, flowing through a moonlit stone garden — never colliding, never stopping.</span>
      </div>

      <div className="river-of-wishes__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit the river</span></div></div>
      </div>

      <AnimationReadout
        eyebrow="Current position"
        value={stats.zone}
        stats={[
          { value: stats.cranes.toLocaleString(), label: "CRANES IN THE RIVER" },
          { value: stats.gpu, label: "RENDERER" },
        ]}
      />
    </section>
  );
}
