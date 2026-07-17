import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import usePinchZoom from "../hooks/usePinchZoom";
import AnimationReadout from "./AnimationReadout";
import { seeded } from "../utils/procedural";
import "./RiverOfWishes.css";

const MAX_CRANES = 100000;
const MOBILE_MAX_CRANES = 4500;
const MOBILE_QUERY = "(max-width: 700px)";
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
  const width = 1
    + Math.exp(-(wideDist ** 2) / (2 * 0.05 ** 2))
    - 0.55 * Math.exp(-(chokeDist ** 2) / (2 * 0.035 ** 2));
  return THREE.MathUtils.clamp(width, 0.4, 2.1);
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
  // NearestFilter, not Linear: sampling a FloatType texture with linear filtering needs the
  // OES_texture_float_linear extension, which most desktop GPUs support but plenty of mobile
  // GPUs don't. Where it's missing, WebGL treats the texture as "incomplete" and every sample
  // silently returns (0,0,0,0) — every crane's position collapsing to the origin, which is why
  // this rendered fine on desktop and not on phone. At 512 samples along the path the nearest-
  // neighbor step between texels is a fraction of a unit, well below what's visible in motion.
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;

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

function makeStoneTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#5a5650";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 300; i += 1) {
    const x = seeded(i, 801) * size;
    const y = seeded(i, 802) * size;
    ctx.fillStyle = `rgba(30, 28, 24, ${0.06 + seeded(i, 803) * 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + seeded(i, 804) * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
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

      uniform sampler2D uPathTexture;
      // highp: uTime keeps growing for the whole session, and mediump — which plenty of
      // mobile GPUs use by default, unlike desktop where highp is nearly universal — runs
      // out of mantissa bits for a large, ever-growing float, quantizing sin()/fract() into
      // big jumps instead of smooth motion. That's what "camera is smooth but crane motion
      // looks like 1-2fps" actually was: the camera's own motion lives in a JS ref (always
      // full 64-bit precision), so it never degrades, while this uniform did.
      uniform highp float uTime;
      uniform float uFlowSpeed;
      uniform float uRiverWidth;
      uniform float uWingFlutter;

      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      vec3 riverRotateAroundAxis(vec3 p, vec3 axis, float angle) {
        return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
      }

      void riverApplyFlap(inout vec3 p, inout vec3 n, int group, float openT) {
        vec3 pivot = vec3(0.0);
        vec3 axis = vec3(0.0, 0.0, 1.0);
        float closedAngle = 0.0;
        if (group == 1) { pivot = vec3(-0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
        else if (group == 2) { pivot = vec3(0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
        else { return; }
        float angle = mix(closedAngle, 0.0, openT);
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
      float riverTimeFrac = fract(aPathPhase + uTime * uFlowSpeed);
      // Direct closed-spline phase avoids the old lookup texture's 1-to-0
      // interpolation seam, which could teleport and blink individual cranes.
      float riverU = riverTimeFrac;
      vec4 riverHereSample = texture2D(uPathTexture, vec2(riverU, 0.5));
      vec3 riverCenterHere = riverHereSample.xyz;
      float riverWidthHere = riverHereSample.w;
      float riverUAhead = fract(riverU + 0.004);
      float riverUBehind = fract(riverU - 0.004);
      vec3 riverCenterAhead = texture2D(uPathTexture, vec2(riverUAhead, 0.5)).xyz;
      vec3 riverCenterBehind = texture2D(uPathTexture, vec2(riverUBehind, 0.5)).xyz;
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
      float riverOpenT = 0.72 + sin(uTime * aFlapSpeed + aFlapPhase) * 0.28 * uWingFlutter;
      riverApplyFlap(riverLocalPos, riverLocalNormal, riverGroup, clamp(riverOpenT, 0.0, 1.0));

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
      float riverSat = mix(0.35, 0.85, fract(vColorSeedV * 9.13 + 0.41));
      float riverLight = mix(0.045, 0.3, fract(vColorSeedV * 17.7 + 0.63));
      vec3 riverColor = riverHsl2rgb(vec3(riverHue, riverSat, riverLight));
      float riverFiber = riverPaperNoise(vPaperCoordV + vColorSeedV * 7.0);
      riverColor *= mix(0.88, 1.08, riverFiber);
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
  }

  geometry.setAttribute("aPathPhase", new THREE.InstancedBufferAttribute(pathPhase, 1));
  geometry.setAttribute("aLaneX", new THREE.InstancedBufferAttribute(laneX, 1));
  geometry.setAttribute("aLaneY", new THREE.InstancedBufferAttribute(laneY, 1));
  geometry.setAttribute("aFlapPhase", new THREE.InstancedBufferAttribute(flapPhase, 1));
  geometry.setAttribute("aFlapSpeed", new THREE.InstancedBufferAttribute(flapSpeed, 1));
  geometry.setAttribute("aColorSeed", new THREE.InstancedBufferAttribute(colorSeed, 1));
  geometry.setAttribute("aWeavePhase", new THREE.InstancedBufferAttribute(weavePhase, 1));
  geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(instanceScale, 1));
  geometry.instanceCount = count;
  return geometry;
}

function RiverScene({ settings, onStats, mobile }) {
  const { camera, gl } = useThree();
  const speed = useSpeed();
  // Mobile GPUs are far weaker at exactly what this piece is heavy on: a complex per-vertex
  // shader plus full PBR lighting against several real lights, evaluated across tens of
  // thousands of instances. Camera drift is slow enough to still look fine at a reduced
  // frame rate; the cranes' faster wing-flap/weave motion is what actually reads as choppy,
  // so this is the lever that matters — same reduced-instance-count-on-mobile pattern
  // ThreadBuildsSystem already uses for its particle field.
  const craneCap = mobile ? MOBILE_MAX_CRANES : MAX_CRANES;
  const craneCount = Math.round(THREE.MathUtils.clamp(settings.craneCount ?? 6000, 2000, craneCap));
  const flowSpeedMul = (settings.flowSpeed ?? 1) * 0.016;
  const riverWidthMul = (settings.riverWidth ?? 100) / 100;
  const wingFlutter = 2.5;
  const lampHeight = settings.lampHeight ?? 11.5;
  const lampIntensity = settings.lampIntensity ?? 220;
  const lampRange = settings.lampRange ?? 82;
  const lampFalloff = settings.lampFalloff ?? 1.65;

  const craneGeometry = useMemo(() => buildCraneGeometry(), []);
  const { curve, texture: pathTexture } = useMemo(() => buildPath(), []);
  const riverGeometry = useMemo(
    () => buildRiverGeometry(craneGeometry, craneCount),
    [craneGeometry, craneCount],
  );

  // Real MeshStandardMaterial now (not a raw ShaderMaterial) — onBeforeCompile injects the
  // GPU-driven instance motion into its vertex shader while leaving Three's own PBR lighting
  // chunks intact, so every real light in the scene (the lamp's pointLight below included)
  // lights the cranes for real, the same way Mechanical Planetarium's sun lights its planets.
  const compiledShaderRef = useRef(null);
  const riverMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.86,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    material.onBeforeCompile = (shader) => {
      configureRiverShader(shader, { pathTexture, flowSpeedMul, riverWidthMul, wingFlutter });
      compiledShaderRef.current = shader;
    };
    return material;
  }, [pathTexture, flowSpeedMul, riverWidthMul, wingFlutter]);

  useEffect(() => () => { riverGeometry.dispose(); }, [riverGeometry]);
  useEffect(() => () => { riverMaterial.dispose(); }, [riverMaterial]);

  const woodTexture = useMemo(() => makeWoodTexture(), []);
  const stoneTexture = useMemo(() => makeStoneTexture(), []);
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: woodTexture, color: "#c9a878", roughness: 0.78, metalness: 0.04 }), [woodTexture]);
  const stoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: stoneTexture, color: "#8f8a80", roughness: 0.85, metalness: 0.05 }), [stoneTexture]);
  const groundMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: stoneTexture,
    bumpMap: stoneTexture,
    bumpScale: 0.18,
    color: "#171a24",
    roughness: 0.94,
    metalness: 0.01,
  }), [stoneTexture]);

  const pillars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const t = 0.02 + (i / 10) * 0.42;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = i % 2 ? 1 : -1;
      const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(3.4 * side);
      list.push(point.clone().add(perp).setY(0));
    }
    return list;
  }, [curve]);

  const gardenLanterns = useMemo(() => {
    const list = [];
    for (let i = 0; i < 5; i += 1) {
      const t = 0.68 + (i / 5) * 0.3;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = i % 2 ? 1 : -1;
      const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(2.6 * side);
      list.push(point.clone().add(perp).setY(0));
    }
    return list;
  }, [curve]);

  const dragRef = useDragOrbit({ pitchMin: -0.85, pitchMax: 0.85 });
  const travelRef = useRef(0.08);
  const overviewYawRef = useRef(0.42);
  const distanceRef = useRef(62);
  const targetDistanceRef = useRef(62);
  const statsTimerRef = useRef({ frames: 0, time: 0 });

  useEffect(() => {
    camera.position.set(23, 36, 43);
    camera.lookAt(1, 8.5, -3);
  }, [camera]);

  usePinchZoom({ targetDistanceRef, min: 18, max: 115 });

  useFrame((state, rawDelta) => {
    // Wrapped well below where float precision would ever bite, even on a device that
    // doesn't fully honor the highp qualifier above — every uTime-driven motion here is
    // periodic (sin/fract), so wrapping the clock itself is inaudible/invisible.
    const elapsed = (state.clock.elapsedTime * speed) % 3600;
    const shader = compiledShaderRef.current;
    if (shader) {
      shader.uniforms.uTime.value = elapsed;
      shader.uniforms.uFlowSpeed.value = flowSpeedMul;
      shader.uniforms.uRiverWidth.value = riverWidthMul;
      shader.uniforms.uWingFlutter.value = wingFlutter;
    }

    travelRef.current = (travelRef.current + Math.min(rawDelta, 0.05) * speed * 0.01) % 1;
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
      <directionalLight position={[8, 10, 6]} intensity={0.09} color="#7186b8" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[40, 96]} />
        <primitive object={groundMaterial} attach="material" />
      </mesh>

      {MAIN_LAMPS.map((lamp, index) => (
        <group key={`main-lamp-${index}`} position={lamp.position}>
          <mesh position={[0, 5.1, 0]} castShadow={!mobile} receiveShadow={!mobile}>
            <cylinderGeometry args={[0.32, 0.7, 10.2, 10]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 10.35, 0]} castShadow={!mobile}>
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
            castShadow={!mobile}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={-0.0004}
          />
        </group>
      ))}

      {pillars.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.32, 0.38, 4.4, 8]} />
            <primitive object={woodMaterial} attach="material" />
          </mesh>
        </group>
      ))}

      {gardenLanterns.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 6]} />
            <meshStandardMaterial color="#3a3a3e" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.34, 0.3, 0.34]} />
            <meshStandardMaterial color="#2e2e32" roughness={0.6} />
          </mesh>
          <pointLight position={[0, 1.35, 0]} intensity={2.4} distance={5} color="#9db6e8" />
        </group>
      ))}

      <mesh geometry={riverGeometry} material={riverMaterial} frustumCulled={false} />
    </group>
  );
}

export default function RiverOfWishes({ settings = {} }) {
  const [stats, setStats] = useState({ fps: 60, gpu: "—", cranes: 0, zone: "TEMPLE COURTYARD" });
  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));
  const mobile = useMemo(() => window.matchMedia?.(MOBILE_QUERY).matches ?? false, []);

  return (
    <section className="atmosphere river-of-wishes" style={{ "--experiment-accent": "#e6c88a" }}>
      <CanvasStage
        camera={{ position: [23, 36, 43], fov: 46, near: 0.1, far: 150 }}
        speed={settings.speed ?? 1}
        shadows={!mobile}
        bloom={{ intensity: 0.8, threshold: 0.6 }}
      >
        <color attach="background" args={[SKY_COLOR]} />
        <fogExp2 attach="fog" args={[SKY_COLOR, 0.009]} />
        <RiverScene settings={settings} onStats={onStats} mobile={mobile} />
      </CanvasStage>

      <div className="experiment-copy river-of-wishes__copy">
        <p>26 — A river suspended in midair</p>
        <h1>The River<br />of Wishes.</h1>
        <span>Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping.</span>
      </div>

      <div className="river-of-wishes__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit the river</span></div></div>
        <div><i>&#8645;</i><div><b>Pinch / Scroll</b><span>Zoom in and out</span></div></div>
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
