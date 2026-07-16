import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import CanvasStage, { useSpeed } from "./CanvasStage";
import useDragOrbit from "../hooks/useDragOrbit";
import AnimationReadout from "./AnimationReadout";
import { seeded } from "../utils/procedural";
import "./WishingTree.css";

const MAX_PETALS = 1000000;
const MAX_FLYING = 240;
const dummy = new THREE.Object3D();

// ---------------------------------------------------------------------------
// Petal geometry — a small, soft, rounded shape (not faceted paper): a
// narrow base at the receptacle fanning out to a rounded tip, built as an
// indexed fan so normals interpolate smoothly across the surface instead of
// reading as flat facets. Unlike a bird, a petal has no "face" direction it
// needs to present to the camera — it looks like a petal from any angle, so
// instances can be fully randomly oriented without the readability problems
// the crane geometry had.
// ---------------------------------------------------------------------------
function buildPetalGeometry() {
  const positions = new Float32Array([
    0, 0, 0,
    -0.42, 0.03, 0.5,
    -0.16, 0.09, 0.97,
    0, 0.12, 1.08,
    0.16, 0.09, 0.97,
    0.42, 0.03, 0.5,
  ]);
  const indices = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  // Very, very small — a fine dusting of blossoms, not a bouquet of individually bold shapes.
  geo.scale(0.034, 0.034, 0.034);
  geo.computeVertexNormals();
  return geo;
}

// ---------------------------------------------------------------------------
// Procedural tree: a thick tapered trunk, a handful of primary limbs forking
// off its upper section, and several secondary branches forking off each
// primary limb — a real branching hierarchy rather than independent curves
// all radiating from one point, so it reads as a tree rather than a fan.
// Only the primary/secondary branches carry petal attach points (weighted
// toward the thinner, more numerous secondaries — canopy density lives at
// the branch tips, same as a real tree's foliage).
// ---------------------------------------------------------------------------
const PRIMARY_COUNT = 15;
const SECONDARY_PER_PRIMARY = 10;
const TERTIARY_PER_SECONDARY = 5;
const QUATERNARY_PER_TERTIARY = 15;

function buildTreeStructure() {
  const trunk = {
    curve: new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, 6.0, -0.15),
      new THREE.Vector3(-0.1, 12.0, 0.1),
    ),
    baseRadius: 0.2,
    tipRadius: 0.13,
    canopyWeight: 0,
    generation: 0,
  };

  const primaries = [];
  for (let i = 0; i < PRIMARY_COUNT; i += 1) {
    const azimuth = (i / PRIMARY_COUNT) * Math.PI * 2 + seeded(i, 101) * 0.5;
    const riseAngle = THREE.MathUtils.degToRad(28 + seeded(i, 102) * 26);
    const length = 3.6 + seeded(i, 103) * 7.2;
    const startT = 0.55 + seeded(i, 108) * 0.4;
    const start = trunk.curve.getPoint(startT);
    const mid = start.clone().add(new THREE.Vector3(
      Math.cos(azimuth) * length * 0.4,
      Math.sin(riseAngle) * length * 0.5,
      Math.sin(azimuth) * length * 0.4,
    ));
    const end = start.clone().add(new THREE.Vector3(
      Math.cos(azimuth + seeded(i, 105) * 0.25) * length * 0.92,
      Math.sin(riseAngle) * length * 0.95 + seeded(i, 106) * 0.5,
      Math.sin(azimuth + seeded(i, 105) * 0.25) * length * 0.92,
    ));
    primaries.push({
      curve: new THREE.QuadraticBezierCurve3(start, mid, end),
      baseRadius: 0.067 + seeded(i, 107) * 0.02,
      tipRadius: 0.027,
      canopyWeight: 1,
      generation: 1,
    });
  }

  const secondaries = [];
  primaries.forEach((primary, pi) => {
    for (let j = 0; j < SECONDARY_PER_PRIMARY; j += 1) {
      const si = pi * SECONDARY_PER_PRIMARY + j;
      const startT = 0.38 + seeded(si, 301) * 0.42;
      const start = primary.curve.getPoint(startT);
      const parentTangent = primary.curve.getTangent(startT).normalize();
      const branchAzimuth = seeded(si, 302) * Math.PI * 2;
      const spread = new THREE.Vector3(Math.cos(branchAzimuth), 0.35 + seeded(si, 303) * 0.5, Math.sin(branchAzimuth));
      const perp = spread.addScaledVector(parentTangent, -spread.dot(parentTangent)).normalize();
      const length = 1.5 + seeded(si, 304) * 5.85;
      const mid = start.clone().addScaledVector(parentTangent, length * 0.3).addScaledVector(perp, length * 0.42);
      const end = start.clone()
        .addScaledVector(parentTangent, length * 0.55)
        .addScaledVector(perp, length * 0.95)
        .add(new THREE.Vector3(0, seeded(si, 305) * 0.6, 0));
      secondaries.push({
        curve: new THREE.QuadraticBezierCurve3(start, mid, end),
        baseRadius: 0.02 + seeded(si, 306) * 0.01,
        tipRadius: 0.007,
        canopyWeight: 2,
        generation: 2,
      });
    }
  });

  function growOuterGeneration(parents, childrenPerParent, config) {
    const children = [];
    parents.forEach((parent, parentIndex) => {
      for (let childIndex = 0; childIndex < childrenPerParent; childIndex += 1) {
        const index = parentIndex * childrenPerParent + childIndex;
        const seedIndex = index + config.seedOffset;
        const startT = config.startMin + seeded(seedIndex, 701) * (config.startMax - config.startMin);
        const start = parent.curve.getPoint(startT);
        const parentTangent = parent.curve.getTangent(startT).normalize();
        const azimuth = seeded(seedIndex, 702) * Math.PI * 2;
        const spread = new THREE.Vector3(
          Math.cos(azimuth),
          config.upwardBias + seeded(seedIndex, 703) * 0.45,
          Math.sin(azimuth),
        );
        const perpendicular = spread
          .addScaledVector(parentTangent, -spread.dot(parentTangent))
          .normalize();
        const length = config.lengthMin + seeded(seedIndex, 704) * (config.lengthMax - config.lengthMin);
        const mid = start.clone()
          .addScaledVector(parentTangent, length * 0.36)
          .addScaledVector(perpendicular, length * 0.28);
        const end = start.clone()
          .addScaledVector(parentTangent, length * 0.68)
          .addScaledVector(perpendicular, length * 0.72)
          .add(new THREE.Vector3(0, seeded(seedIndex, 705) * config.lift, 0));
        children.push({
          curve: new THREE.QuadraticBezierCurve3(start, mid, end),
          baseRadius: config.baseRadiusMin + seeded(seedIndex, 706) * config.baseRadiusVariation,
          tipRadius: config.tipRadius,
          canopyWeight: config.canopyWeight,
          generation: config.generation,
        });
      }
    });
    return children;
  }

  const tertiaries = growOuterGeneration(secondaries, TERTIARY_PER_SECONDARY, {
    seedOffset: 20000,
    startMin: 0.42,
    startMax: 0.9,
    upwardBias: 0.24,
    lengthMin: 0.8,
    lengthMax: 2.5,
    lift: 0.38,
    baseRadiusMin: 0.006,
    baseRadiusVariation: 0.003,
    tipRadius: 0.0024,
    canopyWeight: 6,
    generation: 3,
  });

  const quaternaries = growOuterGeneration(tertiaries, QUATERNARY_PER_TERTIARY, {
    seedOffset: 50000,
    startMin: 0.5,
    startMax: 0.94,
    upwardBias: 0.18,
    lengthMin: 0.38,
    lengthMax: 1.25,
    lift: 0.2,
    baseRadiusMin: 0.0022,
    baseRadiusVariation: 0.0012,
    tipRadius: 0.0007,
    canopyWeight: 16,
    generation: 4,
  });

  return {
    trunk,
    woody: [trunk, ...primaries, ...secondaries, ...tertiaries, ...quaternaries],
    canopyBranches: [...primaries, ...secondaries, ...tertiaries, ...quaternaries],
  };
}

// A continuous tapered tube swept along the branch's curve using Frenet frames — the same
// "one smooth cylindrical surface" quality the courtyard lamp posts have, extended to follow
// a bend. The earlier approach chained many short rigid cylinder segments end to end, and
// every joint between segments met at a slight angle with no shared surface, reading as a
// visible kink no matter how many radial sides each segment had — the lamp post looked smooth
// simply because it's a single unbent cylinder with no joints, not because of its resolution.
function buildTaperedTube(branch, steps = 22, radialSegments = 10) {
  const frames = branch.curve.computeFrenetFrames(steps, false);
  const positions = [];
  const normals = [];
  const indices = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const center = branch.curve.getPoint(t);
    const radius = THREE.MathUtils.lerp(branch.baseRadius, branch.tipRadius, t);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];
    for (let j = 0; j <= radialSegments; j += 1) {
      const angle = (j / radialSegments) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = normal.x * cos + binormal.x * sin;
      const ny = normal.y * cos + binormal.y * sin;
      const nz = normal.z * cos + binormal.z * sin;
      positions.push(center.x + nx * radius, center.y + ny * radius, center.z + nz * radius);
      normals.push(nx, ny, nz);
    }
  }
  const ring = radialSegments + 1;
  for (let i = 0; i < steps; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const a = i * ring + j;
      const b = a + ring;
      const c = a + 1;
      const d = b + 1;
      indices.push(a, b, c, b, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  return geo;
}

function buildTreeMesh(woody) {
  const tubes = woody.map((branch) => {
    if (branch.generation >= 4) return buildTaperedTube(branch, 7, 5);
    if (branch.generation === 3) return buildTaperedTube(branch, 10, 6);
    if (branch.generation === 2) return buildTaperedTube(branch, 14, 7);
    return buildTaperedTube(branch, 22, 10);
  });
  const merged = mergeGeometries(tubes);
  tubes.forEach((g) => g.dispose());
  return merged;
}

function buildAttachPoints(canopyBranches, count) {
  const pool = [];
  canopyBranches.forEach((branch) => {
    for (let w = 0; w < branch.canopyWeight; w += 1) pool.push(branch);
  });
  const points = new Array(count);
  for (let i = 0; i < count; i += 1) {
    const branch = pool[Math.floor(seeded(i, 201) * pool.length) % pool.length];
    // Weight toward the outer 65% of the branch (canopy tips), a light bias toward 1.
    const tBias = Math.pow(seeded(i, 202), 0.55);
    const t = 0.32 + tBias * 0.68;
    const point = branch.curve.getPoint(t);
    const tangent = branch.curve.getTangent(t).normalize();
    const away = new THREE.Vector3(seeded(i, 203) - 0.5, seeded(i, 204) * 0.6, seeded(i, 205) - 0.5);
    const outward = away.sub(tangent.clone().multiplyScalar(away.dot(tangent))).normalize();
    const jitter = 0.15 + seeded(i, 206) * 0.55;
    const pos = point.clone().addScaledVector(outward, jitter).addScaledVector(tangent, (seeded(i, 207) - 0.5) * 0.3);
    const normal = outward.lengthSq() > 0.0001 ? outward : new THREE.Vector3(0, 1, 0);
    points[i] = { position: pos, normal };
  }
  return points;
}

function makeBarkTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#3a2c22";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 120; i += 1) {
    const x = seeded(i, 301) * size;
    ctx.strokeStyle = `rgba(20, 14, 10, ${0.15 + seeded(i, 302) * 0.25})`;
    ctx.lineWidth = 1 + seeded(i, 303) * 3;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    let y = 0;
    while (y < size) {
      y += 8 + seeded(i + y, 304) * 10;
      ctx.lineTo(x + Math.sin(y * 0.05 + i) * 6, y);
    }
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 3);
  return texture;
}

function makeGravelTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#8f8577";
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2;
  const cy = size / 2;
  for (let ring = 0; ring < 40; ring += 1) {
    const r = 14 + ring * 11 + seeded(ring, 401) * 3;
    if (r > size * 0.72) break;
    ctx.strokeStyle = `rgba(60, 54, 46, ${0.1 + seeded(ring, 402) * 0.12})`;
    ctx.lineWidth = 1.4 + seeded(ring, 403) * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, seeded(ring, 404) * 0.6, Math.PI * 2 - seeded(ring, 405) * 0.6);
    ctx.stroke();
  }
  for (let i = 0; i < 400; i += 1) {
    const x = seeded(i, 406) * size;
    const y = seeded(i, 407) * size;
    ctx.fillStyle = `rgba(50, 46, 40, ${0.08 + seeded(i, 408) * 0.12})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.8 + seeded(i, 409) * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// ---------------------------------------------------------------------------
// Petal field: GPU-driven. Position/orientation/bud-open/breathe/fall state
// is computed entirely in the vertex shader from uTime and per-instance
// attributes — no per-frame JS work regardless of instance count, the same
// technique Alien Dyson Swarm's satellite field uses at 40,000 instances.
// Petals need no "face" direction (unlike a bird), so orientation can be
// fully random per instance without hurting readability.
// ---------------------------------------------------------------------------
const LEAF_VERTEX_SHADER = `
  attribute vec3 aBranchPos;
  attribute vec3 aBranchNormal;
  attribute float aCycleSeed;
  attribute float aCycleStart;
  attribute float aGrowDur;
  attribute float aBreatheDur;
  attribute float aDieDur;
  attribute float aDormantDur;
  attribute float aColorSeed;
  attribute float aScaleVar;
  attribute float aFallIndex;

  uniform float uTime;
  uniform float uWindIntensity;
  uniform float uFallingPetalCount;

  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vScale;

  vec3 rotateAroundAxis(vec3 p, vec3 axis, float angle) {
    return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
  }

  void main() {
    float cycleLen = aGrowDur + aBreatheDur + aDieDur + aDormantDur;
    float t = mod(uTime - aCycleStart, cycleLen);
    float scale = 0.0;
    float openT = 0.0;
    vec3 fallOffset = vec3(0.0);
    float fallSpin = 0.0;
    if (t < aGrowDur) {
      float growT = t / max(0.001, aGrowDur);
      scale = growT * growT * (3.0 - 2.0 * growT);
      openT = scale;
    } else if (t < aGrowDur + aBreatheDur) {
      // Attached and fully open — no idle animation layered on top, just sits as a real
      // petal would until it's time to fall.
      openT = 1.0;
      scale = 1.0;
    } else if (t < aGrowDur + aBreatheDur + aDieDur) {
      openT = 1.0;
      float dieT = (t - aGrowDur - aBreatheDur) / max(0.001, aDieDur);
      // Remain readable through the descent, then disappear only as the petal
      // reaches the ground instead of shrinking in mid-air.
      scale = 1.0 - smoothstep(0.9, 1.0, dieT);
      // A falling petal drifts and tumbles away rather than just shrinking in place — real
      // wind carries it further sideways as it falls.
      float wind = max(0.3, uWindIntensity);
      float fallDistance = max(0.0, aBranchPos.y - 0.05);
      fallOffset = vec3(
        sin(aCycleSeed * 12.1) * dieT * 1.5 * wind,
        -fallDistance * dieT * dieT,
        cos(aCycleSeed * 8.7) * dieT * 1.5 * wind
      );
      fallSpin = dieT * 7.0;
    } else {
      scale = 0.0;
    }

    // The control is an exact concurrent count. The selected instances loop
    // continuously from branch to ground; every other blossom remains attached.
    if (aFallIndex < uFallingPetalCount) {
      float controlledFallT = fract(uTime / 6.0 + aCycleSeed);
      float wind = max(0.3, uWindIntensity);
      float fallDistance = max(0.0, aBranchPos.y - 0.05);
      scale = 1.0 - smoothstep(0.9, 1.0, controlledFallT);
      openT = 1.0;
      fallOffset = vec3(
        sin(aCycleSeed * 12.1) * controlledFallT * 1.5 * wind,
        -fallDistance * controlledFallT * controlledFallT,
        cos(aCycleSeed * 8.7) * controlledFallT * 1.5 * wind
      );
      fallSpin = controlledFallT * 7.0;
    } else {
      scale = 1.0;
      openT = 1.0;
      fallOffset = vec3(0.0);
      fallSpin = 0.0;
    }

    // Bud opening: the petal rotates open from folded-against-receptacle to flat as it grows.
    vec3 localPos = position;
    vec3 localNormal = normal;
    float closedAngle = mix(1.35, 0.0, openT);
    localPos = rotateAroundAxis(localPos, vec3(1.0, 0.0, 0.0), closedAngle);
    localNormal = rotateAroundAxis(localNormal, vec3(1.0, 0.0, 0.0), closedAngle);
    localPos = rotateAroundAxis(localPos, vec3(0.3, 1.0, 0.2), fallSpin);
    localNormal = rotateAroundAxis(localNormal, vec3(0.3, 1.0, 0.2), fallSpin);
    localPos *= scale * aScaleVar;

    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 outward = vec3(aBranchNormal.x, 0.0, aBranchNormal.z);
    vec3 fwd = (dot(outward, outward) > 0.0001) ? normalize(outward) : vec3(1.0, 0.0, 0.0);
    vec3 right = normalize(cross(up, fwd));
    fwd = normalize(cross(right, up));
    // Petals have no "face" to keep readable, so unlike a bird they can be rotated fully
    // freely per instance — a natural, un-uniform scatter, like real blossoms on a branch.
    // Fixed per-instance orientation only — no idle time-based wobble on attached petals.
    float yaw = aCycleSeed * 6.2831;
    float cy = cos(yaw);
    float sy = sin(yaw);
    vec3 rotFwd = fwd * cy + right * sy;
    vec3 rotRight = right * cy - fwd * sy;
    float rollSeed = fract(aCycleSeed * 17.23 + 0.41);
    float roll = rollSeed * 6.2831;
    vec3 tiltUp = rotateAroundAxis(up, rotFwd, roll);
    vec3 tiltRight = rotateAroundAxis(rotRight, rotFwd, roll);
    vec3 worldOffset = tiltRight * localPos.x + tiltUp * localPos.y + rotFwd * localPos.z + fallOffset;
    vec3 worldPos = aBranchPos + worldOffset;
    vec3 worldNormal = normalize(tiltRight * localNormal.x + tiltUp * localNormal.y + rotFwd * localNormal.z);

    vNormal = normalize(normalMatrix * worldNormal);
    vColorSeed = aColorSeed;
    vScale = scale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
  }
`;

const LEAF_FRAGMENT_SHADER = `
  uniform vec3 uSeasonColorA;
  uniform vec3 uSeasonColorB;
  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vScale;

  void main() {
    if (vScale <= 0.004) discard;
    vec3 n = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.4, 1.0, 0.35));
    float lambert = max(dot(n, lightDir), 0.0);
    // Petals are thin and slightly translucent — a soft wrap term keeps the shadowed side
    // from going flat black, unlike a hard-shaded paper facet.
    float wrap = max(dot(n, -lightDir), 0.0) * 0.35;
    vec3 base = mix(uSeasonColorA, uSeasonColorB, fract(vColorSeed * 3.7));
    vec3 shaded = base * (0.4 + lambert * 0.55 + wrap);
    gl_FragColor = vec4(shaded, 1.0);
  }
`;

function buildLeafGeometry(petalGeometry, attachPoints, count, growthSpeedMul) {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = petalGeometry.index;
  geometry.attributes.position = petalGeometry.attributes.position;
  geometry.attributes.normal = petalGeometry.attributes.normal;

  const branchPos = new Float32Array(count * 3);
  const branchNormal = new Float32Array(count * 3);
  const cycleSeed = new Float32Array(count);
  const cycleStart = new Float32Array(count);
  const growDur = new Float32Array(count);
  const breatheDur = new Float32Array(count);
  const dieDur = new Float32Array(count);
  const dormantDur = new Float32Array(count);
  const colorSeed = new Float32Array(count);
  const scaleVar = new Float32Array(count);
  const fallIndex = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const pt = attachPoints[i];
    branchPos[i * 3] = pt.position.x;
    branchPos[i * 3 + 1] = pt.position.y;
    branchPos[i * 3 + 2] = pt.position.z;
    branchNormal[i * 3] = pt.normal.x;
    branchNormal[i * 3 + 1] = pt.normal.y;
    branchNormal[i * 3 + 2] = pt.normal.z;
    cycleSeed[i] = seeded(i, 601);
    // Timings run ~3x slower than the first pass — a calmer, less busy pace overall.
    const g = (3.9 + seeded(i, 602) * 7.2) / growthSpeedMul;
    const b = 27 * (0.6 + seeded(i, 603) * 0.8);
    const d = 6.0;
    const dm = 2.4 + seeded(i, 604) * 6.6;
    growDur[i] = g;
    breatheDur[i] = b;
    dieDur[i] = d;
    dormantDur[i] = dm;
    cycleStart[i] = seeded(i, 605) * (g + b + d + dm);
    colorSeed[i] = seeded(i, 606);
    // Keep every blossom near the old maximum size (1.35), with just enough
    // variation that the canopy still feels organic rather than stamped out.
    scaleVar[i] = 2.4 + seeded(i, 607) * 0.04;
    fallIndex[i] = i;
  }

  geometry.setAttribute("aBranchPos", new THREE.InstancedBufferAttribute(branchPos, 3));
  geometry.setAttribute("aBranchNormal", new THREE.InstancedBufferAttribute(branchNormal, 3));
  geometry.setAttribute("aCycleSeed", new THREE.InstancedBufferAttribute(cycleSeed, 1));
  geometry.setAttribute("aCycleStart", new THREE.InstancedBufferAttribute(cycleStart, 1));
  geometry.setAttribute("aGrowDur", new THREE.InstancedBufferAttribute(growDur, 1));
  geometry.setAttribute("aBreatheDur", new THREE.InstancedBufferAttribute(breatheDur, 1));
  geometry.setAttribute("aDieDur", new THREE.InstancedBufferAttribute(dieDur, 1));
  geometry.setAttribute("aDormantDur", new THREE.InstancedBufferAttribute(dormantDur, 1));
  geometry.setAttribute("aFallIndex", new THREE.InstancedBufferAttribute(fallIndex, 1));
  geometry.setAttribute("aColorSeed", new THREE.InstancedBufferAttribute(colorSeed, 1));
  geometry.setAttribute("aScaleVar", new THREE.InstancedBufferAttribute(scaleVar, 1));
  geometry.instanceCount = count;
  return geometry;
}

// ---------------------------------------------------------------------------
// Drifting-petal pool: a small (~24) CPU-driven flock of petals caught on
// the breeze — spirals gently outward and down before fading, near a random
// mature-looking branch point. Deliberately not tracking a specific falling
// leaf instance (no CPU<->GPU state sync exists anywhere in this codebase;
// visual coincidence is the right call here, same as other pooled effects).
// ---------------------------------------------------------------------------
function FlyingPetals({ petalGeometry, attachPoints, material, focus }) {
  const meshRef = useRef();
  const speed = useSpeed();
  const flightsRef = useRef(
    Array.from({ length: MAX_FLYING }, () => ({ active: false, start: 0, duration: 0, center: new THREE.Vector3(), radius: 0, height: 0, phase: 0, tumbleAxis: new THREE.Vector3(1, 0, 0) })),
  );
  const spawnTimerRef = useRef(1);

  useFrame((state, rawDelta) => {
    if (!meshRef.current) return;
    const delta = Math.min(rawDelta, 0.05) * speed;
    const elapsed = state.clock.elapsedTime * speed;
    const flights = flightsRef.current;

    spawnTimerRef.current -= delta;
    if (spawnTimerRef.current <= 0) {
      spawnTimerRef.current = 0.6 + Math.random() * 1.2;
      const slot = flights.findIndex((f) => !f.active);
      if (slot !== -1) {
        const pt = attachPoints[Math.floor(Math.random() * attachPoints.length)];
        flights[slot] = {
          active: true,
          start: elapsed,
          duration: 13 + Math.random() * 10,
          center: focus.clone().lerp(pt.position, 0.55),
          radius: 1.2 + Math.random() * 2.8,
          height: pt.position.y,
          phase: Math.random() * Math.PI * 2,
          tumbleAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        };
      }
    }

    flights.forEach((flight, i) => {
      if (!flight.active) {
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        return;
      }
      const t = (elapsed - flight.start) / flight.duration;
      if (t >= 1) {
        flight.active = false;
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        return;
      }
      const spiralRadius = flight.radius * (0.5 + t * 0.7);
      const angle = flight.phase + t * Math.PI * 0.6;
      const x = flight.center.x + Math.cos(angle) * spiralRadius;
      const z = flight.center.z + Math.sin(angle) * spiralRadius;
      const y = flight.height - t * t * 3.4 + Math.sin(t * 3.0 + flight.phase) * 0.12;
      const fade = Math.sin(Math.PI * Math.min(1, t / 0.12)) * Math.sin(Math.PI * Math.min(1, (1 - t) / 0.3 + 0.7));
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.quaternion.setFromAxisAngle(flight.tumbleAxis, elapsed * 0.65 + flight.phase * 4.0);
      dummy.scale.setScalar(Math.max(0, fade) * 1.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[petalGeometry, material, MAX_FLYING]} frustumCulled={false} />;
}

// Petal colors lean into the blossom theme year-round rather than shifting to leaf-green —
// cherry blossom pink, deep rose, dried amber petals, frost-pale winter bloom.
const SEASONS = [
  { sky: "#3a1f2c", fogColor: "#3a1f2c", colorA: "#f7c6d9", colorB: "#e895b3", ground: "#7fa06a" },
  { sky: "#3a1428", fogColor: "#3a1428", colorA: "#e8547a", colorB: "#b81f4a", ground: "#4f8a4a" },
  { sky: "#3a2110", fogColor: "#3a2110", colorA: "#e8a05c", colorB: "#a8481f", ground: "#8a6a34" },
  { sky: "#141c28", fogColor: "#141c28", colorA: "#f5f0ea", colorB: "#c8d4e0", ground: "#8a94a0" },
];

function TreeScene({ settings, onStats }) {
  const { camera, gl } = useThree();
  const speed = useSpeed();
  const petalCount = Math.round(THREE.MathUtils.clamp(settings.petalCount ?? 60000, 2000, MAX_PETALS));
  const seasonSpeedMul = settings.seasonSpeed ?? 1;
  const windIntensity = (settings.windIntensity ?? 100) / 100;
  const fallingPetalCount = Math.round(THREE.MathUtils.clamp(settings.flightFrequency ?? 1000, 0, petalCount));

  const petalGeometry = useMemo(() => buildPetalGeometry(), []);
  const { woody, canopyBranches } = useMemo(() => buildTreeStructure(), []);
  const attachPoints = useMemo(() => buildAttachPoints(canopyBranches, MAX_PETALS), [canopyBranches]);
  const activeAttachPoints = useMemo(() => attachPoints.slice(0, petalCount), [attachPoints, petalCount]);
  const leafGeometry = useMemo(
    () => buildLeafGeometry(petalGeometry, activeAttachPoints, petalCount, 1),
    [petalGeometry, activeAttachPoints, petalCount],
  );

  const seasonColorA = useMemo(() => new THREE.Color(SEASONS[0].colorA), []);
  const seasonColorB = useMemo(() => new THREE.Color(SEASONS[0].colorB), []);

  const leafMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: LEAF_VERTEX_SHADER,
    fragmentShader: LEAF_FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
      uWindIntensity: { value: windIntensity },
      uFallingPetalCount: { value: fallingPetalCount },
      uSeasonColorA: { value: seasonColorA },
      uSeasonColorB: { value: seasonColorB },
    },
    side: THREE.DoubleSide,
  }), [seasonColorA, seasonColorB, windIntensity]);

  useEffect(() => () => { leafGeometry.dispose(); }, [leafGeometry]);
  useEffect(() => () => { leafMaterial.dispose(); }, [leafMaterial]);

  const barkTexture = useMemo(() => makeBarkTexture(), []);
  const gravelTexture = useMemo(() => makeGravelTexture(), []);
  const barkMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: barkTexture, color: "#a9917c", roughness: 0.86, metalness: 0.05 }), [barkTexture]);
  const groundMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: gravelTexture, color: "#ffffff", roughness: 0.92, metalness: 0.02 }), [gravelTexture]);

  const treeMesh = useMemo(() => buildTreeMesh(woody), [woody]);
  useEffect(() => () => { treeMesh.dispose(); }, [treeMesh]);

  const dragRef = useDragOrbit({ pitchMin: -0.45, pitchMax: 0.5 });
  const baseAngleRef = useRef(0.4);
  const distanceRef = useRef(32);
  const targetDistanceRef = useRef(32);
  const seasonIndexRef = useRef({ value: 0 });
  const statsTimerRef = useRef({ frames: 0, time: 0 });

  useEffect(() => {
    camera.position.set(0, 18, 52);
    camera.lookAt(0, 17, 0);
  }, [camera]);

  useEffect(() => {
    const canvas = gl.domElement;
    const onWheel = (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      event.preventDefault();
      const zoomFactor = Math.exp(event.deltaY * 0.0012);
      targetDistanceRef.current = THREE.MathUtils.clamp(
        targetDistanceRef.current * zoomFactor,
        15,
        68,
      );
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [gl]);

  useFrame((state, rawDelta) => {
    const elapsed = state.clock.elapsedTime * speed;
    leafMaterial.uniforms.uTime.value = elapsed;
    leafMaterial.uniforms.uWindIntensity.value = windIntensity;
    leafMaterial.uniforms.uFallingPetalCount.value = fallingPetalCount;

    const cycleSeconds = 200 / Math.max(0.05, seasonSpeedMul);
    const raw = (elapsed % cycleSeconds) / cycleSeconds;
    const seasonFloat = raw * SEASONS.length;
    const idx = Math.floor(seasonFloat) % SEASONS.length;
    const nextIdx = (idx + 1) % SEASONS.length;
    const localT = THREE.MathUtils.smoothstep(seasonFloat - idx, 0.55, 1);
    const current = SEASONS[idx];
    const next = SEASONS[nextIdx];

    seasonColorA.set(current.colorA).lerp(new THREE.Color(next.colorA), localT);
    seasonColorB.set(current.colorB).lerp(new THREE.Color(next.colorB), localT);
    const skyColor = new THREE.Color(current.sky).lerp(new THREE.Color(next.sky), localT);
    const fogColor = new THREE.Color(current.fogColor).lerp(new THREE.Color(next.fogColor), localT);
    state.scene.background = skyColor;
    if (state.scene.fog) state.scene.fog.color.copy(fogColor);
    const displayIdx = localT > 0.5 ? nextIdx : idx;
    seasonIndexRef.current.value = displayIdx;

    baseAngleRef.current += Math.min(rawDelta, 0.05) * 0.015 * speed;
    const yaw = baseAngleRef.current + dragRef.current.targetYaw;
    const pitch = 0.18 + dragRef.current.targetPitch;
    distanceRef.current = THREE.MathUtils.damp(
      distanceRef.current,
      targetDistanceRef.current,
      9,
      Math.min(rawDelta, 0.05),
    );
    const distance = distanceRef.current;
    const focus = new THREE.Vector3(0, 12, 0);
    camera.position.set(
      focus.x + Math.sin(yaw) * Math.cos(pitch) * distance,
      focus.y + Math.sin(pitch) * distance * 0.55,
      focus.z + Math.cos(yaw) * Math.cos(pitch) * distance,
    );
    camera.lookAt(focus);

    statsTimerRef.current.frames += 1;
    statsTimerRef.current.time += rawDelta;
    if (statsTimerRef.current.time >= 0.5) {
      onStats({
        fps: Math.round(statsTimerRef.current.frames / statsTimerRef.current.time),
        season: ["SPRING", "SUMMER", "AUTUMN", "WINTER"][displayIdx],
      });
      statsTimerRef.current.frames = 0;
      statsTimerRef.current.time = 0;
    }
  });

  useEffect(() => {
    const backendName = gl?.constructor?.name ?? "WebGL2";
    onStats({ gpu: backendName.includes("WebGPU") ? "WebGPU" : "WebGL2", petals: petalCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petalCount]);

  return (
    <group>
      <ambientLight intensity={0.14} color="#f4e6d4" />
      <hemisphereLight color="#e8ddc8" groundColor="#3a3226" intensity={0.16} />
      <directionalLight position={[6, 12, 4]} intensity={0.5} color="#fff2d8" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[32, 64]} />
        <primitive object={groundMaterial} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[30.8, 31.8, 64]} />
        <meshStandardMaterial color="#5c534a" roughness={0.7} />
      </mesh>

      {[
        [-6.2, 5.5], [6.2, 5.5], [-6.2, -5.5], [6.2, -5.5],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.14, 0.16, 1.3, 6]} />
            <meshStandardMaterial color="#4a473e" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[0.42, 0.32, 0.42]} />
            <meshStandardMaterial color="#3d3a32" roughness={0.75} />
          </mesh>
          <pointLight position={[0, 1.45, 0]} intensity={2.2} distance={5} color="#ffb066" />
        </group>
      ))}

      <mesh geometry={treeMesh} material={barkMaterial} />

      <mesh geometry={leafGeometry} material={leafMaterial} frustumCulled={false} />
    </group>
  );
}

export default function WishingTree({ settings = {} }) {
  const [stats, setStats] = useState({ fps: 60, gpu: "—", petals: 0, season: "SPRING" });
  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));

  return (
    <section className="atmosphere wishing-tree" style={{ "--experiment-accent": "#ffb7c5" }}>
      <CanvasStage
        camera={{ position: [0, 18, 52], fov: 45, near: 0.1, far: 130 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.85, threshold: 0.62 }}
      >
        <fogExp2 attach="fog" args={["#f0ccd6", 0.012]} />
        <TreeScene settings={settings} onStats={onStats} />
      </CanvasStage>

      <div className="experiment-copy wishing-tree__copy">
        <p>02 — Ten thousand blossoms, one wish each</p>
        <h1>The Wishing<br />Tree.</h1>
        <span>An ancient tree bears tiny blossoms instead of leaves — each one buds, breathes, and eventually falls away on the wind, while another quietly opens elsewhere on the branch. The seasons turn slowly around it, and it never stops renewing.</span>
      </div>

      <div className="wishing-tree__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit around the tree</span></div></div>
      </div>

      <AnimationReadout
        eyebrow="Grove census"
        value={stats.season}
        stats={[
          { value: stats.petals.toLocaleString(), label: "BLOSSOMS ON THE TREE" },
        ]}
      />
    </section>
  );
}
