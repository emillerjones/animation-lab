// Orbital Sunrise: the Earth at the horizon, live in WebGL. NASA imagery
// (Blue Marble day, Black Marble city lights, a MODIS cloud map), lit by the
// sun and moon where they really are (or shifted by the time control), under
// a ray-marched atmosphere. Opens on a sunrise over the planet's edge; drag
// to turn the planet, scroll to fly in to orbit height or out to the whole
// globe. Ported from the Horizon Records sign-in page.
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import AnimationReadout from "./AnimationReadout";
import "./OrbitalSunrise.css";

const TEXTURES = import.meta.env.BASE_URL + "earth/";
const FOREGROUND = ".experiment-copy, .animation-readout";

const DEG = Math.PI / 180;
const ATMOSPHERE_TOP = 1.035; // planet radius is 1

// Shared light model: Rayleigh + Mie scattering with exponential density and
// a Chapman-style approximation of the sunlight's path through the air.
const AIR = /* glsl */ `
  const float RA = ${ATMOSPHERE_TOP.toFixed(3)};
  const float HR = 0.00875;          // Rayleigh scale height
  const float HM = 0.0026;           // Mie (haze) scale height
  const vec3 BR = vec3(5.3, 12.3, 30.0);
  const float BM = 2.2;
  const float PI = 3.14159265;
  float pathTo(float mu, float k) { return 0.5 * (mu + sqrt(mu * mu + k)); }
  // Optical depth (Rayleigh, Mie) from a point at height h toward the sun.
  vec2 sunDepth(float h, float mu) {
    float m = mu + sqrt(2.0 * max(h, 0.0)) * 0.9; // higher points see past the horizon
    return vec2(HR * exp(-h / HR) / pathTo(m, 8.0 * HR / PI),
                HM * exp(-h / HM) / pathTo(m, 8.0 * HM / PI));
  }
  vec3 extinction(vec2 od) { return exp(-(BR * od.x + BM * 1.1 * od.y)); }
`;

const earthVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vP;
  varying vec3 vO;
  void main() {
    vUv = uv;
    vO = position;
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 p = modelMatrix * vec4(position, 1.0);
    vP = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`;

const earthFragment = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D lightsMap;
  uniform sampler2D surfaceMap; // r: water, g: clouds
  uniform vec3 uSun;
  uniform vec3 uNorth;
  uniform float uSunI;
  uniform float uCloudShift;
  uniform float uLights;
  uniform float uClouds;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vP;
  varying vec3 vO;
  ${AIR}
  // Small-scale noise that roughens cloud edges finer than the satellite
  // map can resolve (fixed to the planet, so it never seams).
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1) * 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
                   mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                   mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }
  float detail(vec3 p) {
    float v = 0.0, a = 0.5;
    p *= 140.0;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.07; a *= 0.5; }
    return v - 0.47;
  }
  float clouds(vec2 uv, float d) {
    float c = texture2D(surfaceMap, uv).g;
    return smoothstep(0.1, 0.85, c + d * 0.5 * (4.0 * c * (1.0 - c) + 0.08));
  }
  void main() {
    vec3 N = normalize(vN);
    vec3 V = normalize(cameraPosition - vP);
    vec3 L = uSun;
    float mu = dot(N, L);
    vec3 albedo = texture2D(dayMap, vUv).rgb;
    float water = texture2D(surfaceMap, vUv).r;
    vec2 cuv = vec2(vUv.x + uCloudShift, vUv.y);
    float d = detail(vO) * smoothstep(0.05, 0.4, dot(N, V));
    float cloud = clouds(cuv, d) * uClouds;

    // Cloud shadows: look up the cloud between this point and the sun.
    vec3 east = normalize(cross(uNorth, N) + 1e-5);
    vec3 north = cross(N, east);
    float lat = (vUv.y - 0.5) * PI;
    vec2 toSun = vec2(dot(L, east) / max(cos(lat), 0.2) / (2.0 * PI), dot(L, north) / PI);
    float shade = clouds(cuv - toSun * 0.0045, d) * uClouds;

    // Sunlight reaching the ground, reddened near the terminator.
    vec3 sun = uSunI * extinction(sunDepth(0.0, mu));
    float diffuse = max(mu, 0.0);
    albedo = mix(albedo, albedo * vec3(0.7, 0.85, 1.15), water * 0.6);
    vec3 ground = albedo * diffuse * sun * (1.0 - 0.6 * shade * smoothstep(0.0, 0.2, mu));

    // Sun glint on open water.
    vec3 H = normalize(L + V);
    float nh = max(dot(N, H), 0.0);
    float fresnel = 0.02 + 0.98 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    float glint = pow(nh, 220.0) * 5.0 + pow(nh, 24.0) * 0.12;
    ground += sun * glint * (0.3 + fresnel) * water * (1.0 - cloud) * smoothstep(0.0, 0.06, mu);

    // Clouds sit a little higher, so they catch the light a little longer.
    vec3 cloudSun = uSunI * extinction(sunDepth(0.0016, mu));
    vec3 cloudLit = vec3(0.92) * max(mu + 0.05, 0.0) * cloudSun;
    vec3 col = mix(ground, cloudLit, cloud * 0.93);

    // City lights on the night side, softened under cloud.
    float night = smoothstep(0.1, -0.12, mu);
    float lights = texture2D(lightsMap, vUv).r;
    vec3 sodium = vec3(1.0, 0.6, 0.28);
    col += sodium * pow(lights, 1.5) * 2.4 * uLights * night * (1.0 - 0.82 * cloud);
    col += sodium * lights * cloud * 0.18 * night * uLights;
    // A trace of earthshine so the night side isn't a void.
    col += (albedo * 0.6 + cloud * 0.25) * vec3(0.004, 0.006, 0.011) * night;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const airVertex = /* glsl */ `
  varying vec3 vP;
  void main() {
    vec4 p = modelMatrix * vec4(position, 1.0);
    vP = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`;

const airFragment = /* glsl */ `
  uniform vec3 uSun;
  uniform float uSunI;
  varying vec3 vP;
  ${AIR}
  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vP - ro);
    float b = dot(ro, rd);
    float c = dot(ro, ro) - RA * RA;
    float disc = b * b - c;
    if (disc <= 0.0) discard;
    disc = sqrt(disc);
    float t0 = max(-b - disc, 0.0);
    float t1 = -b + disc;
    float cp = dot(ro, ro) - 1.0;
    float dp = b * b - cp;
    if (dp > 0.0) {
      float tp = -b - sqrt(dp);
      if (tp > 0.0) t1 = min(t1, tp);
    }
    float dt = (t1 - t0) / float(STEPS);
    vec2 odView = vec2(0.0);
    vec3 sumR = vec3(0.0), sumM = vec3(0.0);
    for (int i = 0; i < STEPS; i++) {
      vec3 p = ro + rd * (t0 + dt * (float(i) + 0.5));
      float r = length(p);
      float h = r - 1.0;
      vec2 dens = vec2(exp(-h / HR), exp(-h / HM));
      odView += dens * dt;
      vec3 T = extinction(odView + sunDepth(h, dot(p / r, uSun)));
      sumR += dens.x * dt * T;
      sumM += dens.y * dt * T;
    }
    float cosT = dot(rd, uSun);
    float phaseR = 3.0 / (16.0 * PI) * (1.0 + cosT * cosT);
    float g = 0.76;
    float phaseM = 3.0 / (8.0 * PI) * ((1.0 - g * g) * (1.0 + cosT * cosT)) /
      ((2.0 + g * g) * pow(1.0 + g * g - 2.0 * g * cosT, 1.5));
    vec3 light = uSunI * (sumR * BR * phaseR + sumM * BM * phaseM);
    vec3 through = extinction(odView);
    // Premultiplied: what's behind is dimmed by the air, plus the glow.
    gl_FragColor = vec4(light, dot(through, vec3(0.3333)));
  }
`;

const starVertex = /* glsl */ `
  attribute float size;
  attribute vec3 tint;
  attribute float phase;
  uniform float uTime;
  uniform float uScale;
  uniform float uFade;
  varying vec3 vTint;
  void main() {
    float tw = 0.82 + 0.18 * sin(uTime * (0.6 + phase * 1.7) + phase * 40.0);
    vTint = tint * tw * uFade;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uScale;
    gl_Position = projectionMatrix * mv;
  }
`;
const starFragment = /* glsl */ `
  varying vec3 vTint;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.0, length(d));
    gl_FragColor = vec4(vTint * a * a, 1.0);
  }
`;

const sunFragment = /* glsl */ `
  uniform float uSunI;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.1, 0.06, d) * 60.0;
    float glow = exp(-d * 9.0) * 4.0 + exp(-d * 3.0) * 0.3;
    gl_FragColor = vec4(vec3(1.0, 0.96, 0.9) * (core + glow) * uSunI * 0.3, 1.0);
  }
`;

// Lens flare for the sun at the planet's edge: a long horizontal streak, a
// soft starburst and a warm halo, drawn over the whole screen.
const flareVertex = /* glsl */ `
  varying vec2 vP;
  void main() {
    vP = position.xy;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
const flareFragment = /* glsl */ `
  uniform vec2 uSunPos;
  uniform float uAspect;
  uniform float uVis;
  uniform float uScale;
  varying vec2 vP;
  void main() {
    vec2 d = (vP - uSunPos) / uScale;
    d.x *= uAspect;
    float r = length(d);
    float a = atan(d.y, d.x);
    float streak = exp(-abs(d.y) * 160.0) * exp(-abs(d.x) * 1.3) * 1.1
                 + exp(-abs(d.y) * 34.0) * exp(-abs(d.x) * 3.2) * 0.22;
    float rays = (pow(abs(cos(a * 3.0 + 0.4)), 90.0) * 0.32 + pow(abs(cos(a * 5.0 - 0.2)), 160.0) * 0.16)
                 * exp(-r * 12.0);
    float halo = exp(-r * 16.0) * 1.6 + exp(-r * 4.0) * 0.14;
    float ring = exp(-pow((r - 0.16) * 40.0, 2.0)) * 0.035;
    vec3 col = vec3(1.0, 0.93, 0.82) * (streak + rays) + vec3(1.0, 0.8, 0.6) * halo
             + vec3(0.6, 0.8, 1.0) * ring;
    gl_FragColor = vec4(col * uVis, 1.0);
  }
`;

const moonVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const moonFragment = /* glsl */ `
  uniform sampler2D moonMap;
  uniform vec3 uSun;
  uniform float uSunI;
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vec3 albedo = texture2D(moonMap, vUv).rgb;
    float mu = dot(normalize(vN), uSun);
    vec3 col = albedo * (max(mu, 0.0) * uSunI * 0.9 + 0.004);
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Low-precision ephemerides (good to a fraction of a degree): where the sun
// and moon are right now, in the planet's frame (north +y, longitude 0 at
// +z, east toward +x).
function days(date) {
  return date.getTime() / 86400000 + 2440587.5 - 2451545.0; // since J2000
}
function toPlanet(lambda, beta, d) {
  const eps = 23.439 * DEG;
  const x = Math.cos(beta) * Math.cos(lambda);
  const y = Math.cos(eps) * Math.cos(beta) * Math.sin(lambda) - Math.sin(eps) * Math.sin(beta);
  const z = Math.sin(eps) * Math.cos(beta) * Math.sin(lambda) + Math.cos(eps) * Math.sin(beta);
  const ra = Math.atan2(y, x);
  const dec = Math.asin(z);
  const gmst = (280.46061837 + 360.98564736629 * d) * DEG;
  const lon = ra - gmst;
  return new THREE.Vector3(Math.cos(dec) * Math.sin(lon), Math.sin(dec), Math.cos(dec) * Math.cos(lon));
}
function sunNow(date = new Date()) {
  const d = days(date);
  const L = (280.46 + 0.9856474 * d) * DEG;
  const g = (357.528 + 0.9856003 * d) * DEG;
  return toPlanet(L + (1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * DEG, 0, d);
}
function moonNow(date = new Date()) {
  const d = days(date);
  const L = (218.316 + 13.176396 * d) * DEG;
  const M = (134.963 + 13.064993 * d) * DEG;
  const F = (93.272 + 13.22935 * d) * DEG;
  return toPlanet(L + 6.289 * DEG * Math.sin(M), 5.128 * DEG * Math.sin(F), d);
}

function makeStars() {
  const n = 7000;
  const pos = new Float32Array(n * 3),
    size = new Float32Array(n),
    tint = new Float32Array(n * 3),
    phase = new Float32Array(n);
  // A tilted band where stars crowd together, like the Milky Way.
  const band = new THREE.Vector3(0.3, 0.85, 0.42).normalize();
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    if (v.lengthSq() > 1 || v.lengthSq() < 0.01) {
      i--;
      continue;
    }
    v.normalize();
    if (i % 3 === 0) {
      // pull toward the band's plane
      const off = v.dot(band);
      v.addScaledVector(band, -off * 0.85).normalize();
    }
    v.multiplyScalar(90);
    pos.set([v.x, v.y, v.z], i * 3);
    const m = Math.pow(Math.random(), 7);
    size[i] = 1.1 + m * 4.5;
    const bright = 0.16 + m * 2.2 + Math.random() * 0.1;
    const t = Math.random();
    const col = t < 0.15 ? [0.75, 0.85, 1.0] : t > 0.9 ? [1.0, 0.85, 0.7] : [1.0, 0.98, 0.95];
    tint.set(col.map((x) => x * bright), i * 3);
    phase[i] = Math.random();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("size", new THREE.BufferAttribute(size, 1));
  g.setAttribute("tint", new THREE.BufferAttribute(tint, 3));
  g.setAttribute("phase", new THREE.BufferAttribute(phase, 1));
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uFade: { value: 1 } },
    vertexShader: starVertex,
    fragmentShader: starFragment,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });
  return new THREE.Points(g, m);
}

function buildScene(el, host, settingsRef, report) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, powerPreference: "high-performance" });
  } catch {
    report((t) => ({ ...t, error: "WebGL isn't available in this browser." }));
    return undefined;
  }
  const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const gl = renderer.capabilities;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 300);
  const planet = new THREE.Group(); // turns with drags and the slow spin
  scene.add(planet);

  const blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
  blank.needsUpdate = true;
  const sunI = 3.2;
  const earthMat = new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: blank },
      lightsMap: { value: blank },
      surfaceMap: { value: blank },
      uSun: { value: new THREE.Vector3() },
      uNorth: { value: new THREE.Vector3(0, 1, 0) },
      uSunI: { value: sunI },
      uCloudShift: { value: 0 },
      uLights: { value: 1 },
      uClouds: { value: 1 },
    },
    vertexShader: earthVertex,
    fragmentShader: earthFragment,
  });
  const sphere = new THREE.SphereGeometry(1, 320, 160);
  sphere.rotateY(-Math.PI / 2); // texture longitude 0 faces +z
  const earth = new THREE.Mesh(sphere, earthMat);
  planet.add(earth);

  const airMat = new THREE.ShaderMaterial({
    uniforms: { uSun: earthMat.uniforms.uSun, uSunI: earthMat.uniforms.uSunI },
    defines: { STEPS: small ? 10 : 14 },
    vertexShader: airVertex,
    fragmentShader: airFragment,
    side: THREE.BackSide,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.SrcAlphaFactor,
  });
  const air = new THREE.Mesh(new THREE.SphereGeometry(ATMOSPHERE_TOP * 1.02, 160, 80), airMat);
  air.renderOrder = 2;
  planet.add(air);

  const stars = makeStars();
  stars.renderOrder = -1;
  planet.add(stars);

  const sunGeo = new THREE.BufferGeometry();
  sunGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
  const sunMat = new THREE.ShaderMaterial({
    uniforms: { uSunI: earthMat.uniforms.uSunI, uScale: { value: 1 } },
    vertexShader: `uniform float uScale; void main(){ gl_PointSize = 120.0 * uScale; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: sunFragment,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });
  const sunPoint = new THREE.Points(sunGeo, sunMat);
  sunPoint.frustumCulled = false;
  sunPoint.renderOrder = 1;
  scene.add(sunPoint);

  // The Moon, where it really is and lit by the same sun (so its phase is
  // today's). Drawn 1.5x true size so it reads as the Moon.
  const moonMat = new THREE.ShaderMaterial({
    uniforms: { moonMap: { value: blank }, uSun: earthMat.uniforms.uSun, uSunI: earthMat.uniforms.uSunI },
    vertexShader: moonVertex,
    fragmentShader: moonFragment,
  });
  const moonGeo = new THREE.SphereGeometry(0.2727 * 1.5, 64, 32);
  moonGeo.rotateY(-Math.PI / 2);
  const moon = new THREE.Mesh(moonGeo, moonMat);
  planet.add(moon);

  const flareMat = new THREE.ShaderMaterial({
    uniforms: {
      uSunPos: { value: new THREE.Vector2() },
      uAspect: { value: 1 },
      uVis: { value: 0 },
      uScale: { value: 1 },
    },
    vertexShader: flareVertex,
    fragmentShader: flareFragment,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    transparent: true,
  });
  const flare = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), flareMat);
  flare.frustumCulled = false;
  flare.renderOrder = 10;
  scene.add(flare);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.5, 0.55, 1.0);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // ---- textures: a quick 2k set first, then sharper ones if the device can.
  const loader = new THREE.TextureLoader();
  const aniso = gl.getMaxAnisotropy();
  const load = (name, srgb, repeat) =>
    new Promise((resolve, reject) =>
      loader.load(
        TEXTURES + name,
        (t) => {
          t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          t.anisotropy = aniso;
          if (repeat) t.wrapS = THREE.RepeatWrapping;
          resolve(t);
        },
        undefined,
        reject,
      ),
    );
  let disposed = false;
  const owned = new Set();
  function use(slot, tex, mat = earthMat) {
    if (disposed) return tex.dispose();
    const old = mat.uniforms[slot].value;
    mat.uniforms[slot].value = tex;
    owned.add(tex);
    if (old !== blank) {
      owned.delete(old);
      // let the GPU finish with it first
      requestAnimationFrame(() => old.dispose());
    }
  }
  const big = gl.maxTextureSize >= 8192 && !small && !navigator.connection?.saveData;
  let ready = false;
  Promise.all([load("day-2k.jpg", true), load("lights-2k.jpg"), load("surface-2k.jpg", false, true)])
    .then(([d, l, s]) => {
      use("dayMap", d);
      use("lightsMap", l);
      use("surfaceMap", s);
      if (disposed) return;
      ready = true;
      el.classList.add("is-ready");
      const sharper = big
        ? [["dayMap", "day-8k.jpg", true], ["lightsMap", "lights-8k.jpg"], ["surfaceMap", "surface-4k.jpg", false, true]]
        : [["dayMap", "day-4k.jpg", true], ["surfaceMap", "surface-4k.jpg", false, true]];
      for (const [slot, file, srgb, rep] of sharper)
        load(file, srgb, rep).then((t) => use(slot, t)).catch(() => {});
      load("moon-1k.jpg", true).then((t) => use("moonMap", t, moonMat)).catch(() => {});
    })
    .catch(() => report((t) => ({ ...t, error: "The Earth imagery didn't load." })));

  // ---- view: the planet's edge arcs across the upper part of the screen,
  // and the scroll wheel moves the camera in (to about ISS height) or out
  // (until the whole planet floats in view).
  let w = 1, h = 1;
  // Sharpness cap; drops to 1 if the device can't keep up (see loop).
  let maxRatio = small ? 1.5 : 1.6;
  const HOME = 1.42; // camera distance in planet radii
  const NEAR = 1.1, FAR = 4.6;
  let distance = still ? HOME : 1.9;
  let zoom = HOME; // where the wheel wants the camera
  const camDir = new THREE.Vector3();
  function frameCamera() {
    const aspect = w / h;
    camera.aspect = aspect;
    // keep about 62 degrees across, within sensible vertical limits
    camera.fov = Math.min(72, Math.max(30, (2 * Math.atan(Math.tan(31 * DEG) / aspect)) / DEG));
    const limb = Math.asin(1 / distance);
    const horizonY = aspect < 0.9 ? 0.4 : 0.26; // up from screen center (NDC)
    const up = Math.atan(horizonY * Math.tan((camera.fov * DEG) / 2));
    // further out, the camera levels off and the planet centers itself
    const level = THREE.MathUtils.smoothstep(distance, HOME + 0.25, 3.6);
    camera.position.set(0, 0, distance);
    camera.rotation.set((limb - up) * (1 - level), 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    flareMat.uniforms.uAspect.value = aspect;
    flareMat.uniforms.uScale.value = Math.min(1.25, Math.max(0.7, 1400 / Math.max(w, 1)));
  }
  function size() {
    w = el.clientWidth || window.innerWidth;
    h = el.clientHeight || window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, maxRatio);
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h, false);
    composer.setPixelRatio(ratio);
    composer.setSize(w, h);
    stars.material.uniforms.uScale.value = ratio;
    sunMat.uniforms.uScale.value = ratio * Math.min(1.4, h / 900);
    frameCamera();
  }

  // ---- orientation. The opening is a sunrise: the planet turns until the
  // real sun climbs out from behind its edge, just right of center. After
  // that the planet turns slowly about the sun's direction, so the sun
  // holds its place while the ground slides by beneath the dawn line.
  const X = new THREE.Vector3(1, 0, 0),
    Y = new THREE.Vector3(0, 1, 0);
  const turnQ = new THREE.Quaternion();
  function turn(axis, angle) {
    turnQ.setFromAxisAngle(axis, angle);
    planet.quaternion.premultiply(turnQ);
  }
  const shifted = () => new Date(Date.now() + (settingsRef.current.hours ?? 0) * 3600000);
  let hoursSeen = settingsRef.current.hours ?? 0;
  const sunLocal = sunNow(shifted());
  const moonLocal = moonNow(shifted());
  function placeMoon() {
    moon.position.copy(moonLocal).multiplyScalar(60.3);
    planet.updateMatrixWorld();
    moon.lookAt(0, 0, 0); // the same face always toward the Earth
  }
  // A north-up start facing the night side, then nudged so the sun sits on
  // the planet's edge `below` radians under it (negative = above) and
  // `side` radians right of the top.
  const base = new THREE.Quaternion()
    .setFromAxisAngle(X, -10 * DEG)
    .multiply(new THREE.Quaternion().setFromAxisAngle(Y, -(Math.atan2(sunLocal.x, sunLocal.z) + Math.PI)));
  const want = new THREE.Vector3(),
    have = new THREE.Vector3(),
    fix = new THREE.Quaternion();
  function sunrise(below, side, dist) {
    const r = Math.asin(1 / dist) - below;
    want
      .set(0, 0, -Math.cos(r))
      .addScaledVector(X, Math.sin(r) * Math.sin(side))
      .addScaledVector(Y, Math.sin(r) * Math.cos(side))
      .normalize();
    have.copy(sunLocal).applyQuaternion(base);
    fix.setFromUnitVectors(have, want);
    planet.quaternion.copy(fix).multiply(base);
  }
  const INTRO = 7.5; // seconds
  const SIDE = 7 * DEG;
  let intro = still ? INTRO : 0;
  sunrise(-0.1 * DEG, SIDE, HOME);
  placeMoon();
  const view = { vx: 0, vy: 0, drag: null, spin: still ? 0 : 1 };
  function endIntro() {
    if (intro < INTRO) intro = INTRO;
  }

  const glow = 0;
  let time = 0, last = performance.now(), frame = 0, clock = 0;
  const sunW = new THREE.Vector3(),
    sunScreen = new THREE.Vector3();
  function draw(dt) {
    time += dt;
    const set = settingsRef.current;
    let fade = 1;
    if (intro < INTRO) {
      // hold until the imagery is in, then play the sunrise
      if (ready) intro += dt;
      const e = THREE.MathUtils.smootherstep(intro / INTRO, 0, 1);
      distance = THREE.MathUtils.lerp(1.9, HOME, THREE.MathUtils.smootherstep(intro / INTRO, 0, 0.85));
      zoom = HOME;
      sunrise(THREE.MathUtils.lerp(9 * DEG, -0.1 * DEG, e), SIDE + (1 - e) * 10 * DEG, distance);
      fade = THREE.MathUtils.smoothstep(intro, 0.3, 2.5);
    } else {
      distance += (zoom - distance) * Math.min(1, dt * (still ? 20 : 5));
      if (!view.drag) {
        turn(Y, view.vy * dt);
        turn(X, view.vx * dt);
        const decay = Math.exp(-dt * 1.4);
        view.vx *= decay;
        view.vy *= decay;
        if (!still) {
          view.spin = Math.min(1, view.spin + dt * 0.25);
          sunW.copy(sunLocal).applyQuaternion(planet.quaternion);
          turn(sunW, -0.35 * DEG * view.spin * dt * ((set.orbit ?? 100) / 100));
        }
      }
    }
    // The real sun and moon, refreshed every few seconds.
    clock += dt;
    if (clock > 5 || (set.hours ?? 0) !== hoursSeen) {
      clock = 0;
      hoursSeen = set.hours ?? 0;
      sunLocal.copy(sunNow(shifted()));
      moonLocal.copy(moonNow(shifted()));
      placeMoon();
    }
    const u = earthMat.uniforms;
    u.uSun.value.copy(sunLocal).applyQuaternion(planet.quaternion);
    u.uNorth.value.set(0, 1, 0).applyQuaternion(planet.quaternion);
    u.uCloudShift.value = time * 0.00004;
    u.uSunI.value = sunI * (1 + glow * 0.5);
    u.uLights.value = (set.lights ?? 100) / 100;
    u.uClouds.value = set.clouds === false ? 0 : 1;
    sunGeo.attributes.position.setXYZ(0, u.uSun.value.x * 80, u.uSun.value.y * 80, u.uSun.value.z * 80);
    sunGeo.attributes.position.needsUpdate = true;
    stars.material.uniforms.uTime.value = time;
    stars.material.uniforms.uFade.value = fade;
    frameCamera();
    // How much of the sun's disc clears the planet's edge, seen from here.
    camDir.copy(camera.position).negate().normalize();
    const above = Math.acos(Math.min(1, u.uSun.value.dot(camDir))) - Math.asin(1 / distance);
    sunScreen.copy(u.uSun.value).multiplyScalar(80).add(camera.position).project(camera);
    const onScreen = sunScreen.z < 1 && Math.abs(sunScreen.x) < 1.4 && Math.abs(sunScreen.y) < 1.4;
    flareMat.uniforms.uSunPos.value.set(sunScreen.x, sunScreen.y);
    flareMat.uniforms.uVis.value = onScreen
      ? THREE.MathUtils.smoothstep(above, -0.3 * DEG, 0.35 * DEG) * (1 + glow)
      : 0;
    bloom.strength = 0.5 + glow * 0.6;
    renderer.toneMappingExposure = 1 + glow * 0.45;
    composer.render(dt);
    tick += dt;
    if (tick > 0.25) {
      tick = 0;
      report((t) => ({
        ...t,
        progress: Math.min(1, intro / INTRO),
        sun: above / DEG,
        altitude: Math.round((distance - 1) * 6371),
        moon: Math.round(((1 - sunLocal.dot(moonLocal)) / 2) * 100),
      }));
    }
  }
  let tick = 0;
  let slow = 0;
  function loop(now) {
    const raw = (now - last) / 1000;
    const dt = Math.min(0.05, raw);
    last = now;
    // Struggling for a couple of seconds: render fewer pixels.
    if (raw < 0.5) slow = raw > 0.034 ? slow + raw : Math.max(0, slow - raw * 0.5);
    if (slow > 2 && maxRatio > 1) {
      maxRatio = 1;
      size();
    }
    draw(dt * (settingsRef.current.speed ?? 1));
    frame = requestAnimationFrame(loop);
  }
  function start() {
    cancelAnimationFrame(frame);
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }

  // ---- dragging the background turns the planet; the wheel zooms.
  const radPerPx = () => ((camera.fov / h) * 1.25 * DEG * (distance - 1)) / (HOME - 1);
  const down = (e) => {
    if (e.button !== 0 || e.target.closest?.(FOREGROUND)) return;
    endIntro();
    view.drag = { x: e.clientX, y: e.clientY, t: performance.now() };
    view.vx = view.vy = 0;
    view.spin = 0;
    document.documentElement.classList.add("is-orbiting");
  };
  const move = (e) => {
    const d = view.drag;
    if (!d) return;
    const k = radPerPx();
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    turn(Y, dx * k);
    turn(X, dy * k);
    const now = performance.now();
    const s = Math.max(0.008, (now - d.t) / 1000);
    view.vy = still ? 0 : (dx * k) / s;
    view.vx = still ? 0 : (dy * k) / s;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
  };
  const up = () => {
    const d = view.drag;
    if (!d) return;
    view.drag = null;
    document.documentElement.classList.remove("is-orbiting");
    if (performance.now() - d.t > 80) view.vx = view.vy = 0; // held still before letting go
  };
  const wheel = (e) => {
    e.preventDefault();
    endIntro();
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    zoom = Math.min(FAR, Math.max(NEAR, 1 + (zoom - 1) * Math.exp(dy * (e.ctrlKey ? 0.012 : 0.0016))));
  };
  const visibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());
  const lost = (e) => {
    e.preventDefault();
    report((t) => ({ ...t, error: "The graphics context was lost. Reload to try again." }));
  };

  size();
  start();
  const observer = new ResizeObserver(size);
  observer.observe(host);
  host.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);
  host.addEventListener("wheel", wheel, { passive: false });
  document.addEventListener("visibilitychange", visibility);
  el.addEventListener("webglcontextlost", lost);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    host.removeEventListener("pointerdown", down);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
    host.removeEventListener("wheel", wheel);
    document.removeEventListener("visibilitychange", visibility);
    el.removeEventListener("webglcontextlost", lost);
    document.documentElement.classList.remove("is-orbiting");
    for (const t of owned) t.dispose();
    blank.dispose();
    scene.traverse((o) => {
      o.geometry?.dispose();
      o.material?.dispose();
    });
    composer.dispose();
    renderer.dispose();
  };
}

export default function OrbitalSunrise({ settings = {} }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const [t, setT] = useState({ progress: 0, sun: 0, altitude: 2676, moon: 0 });
  useEffect(() => buildScene(canvasRef.current, hostRef.current, settingsRef, setT), []);
  const stage = t.progress < 1 ? (t.sun < -0.3 ? "PRE-DAWN" : "SUNRISE") : t.sun > 0.3 ? "DAYLIGHT" : t.sun > -0.3 ? "SUNRISE" : "NIGHT SIDE";
  return (
    <section ref={hostRef} className="atmosphere orbital-sunrise" style={{ "--experiment-accent": "#ffc27a" }}>
      <canvas ref={canvasRef} className="orbital-sunrise__canvas" aria-label="The Earth at sunrise, seen from orbit" />
      <div className="experiment-copy">
        <p>Real sky / Atmospheric scattering</p>
        <h1>Orbital<br />sunrise.</h1>
        <span>The real sun climbs over the Earth's edge where it actually is right now, through a ray-marched atmosphere, over NASA imagery and city lights. Drag to turn the planet, scroll to fly in or out.</span>
      </div>
      <AnimationReadout
        eyebrow="Over the horizon"
        value={stage}
        progress={t.progress}
        stats={[
          { value: `${t.sun >= 0 ? "+" : ""}${t.sun.toFixed(1)}°`, label: "SUN ABOVE THE EDGE" },
          { value: t.altitude.toLocaleString() + " km", label: "ALTITUDE" },
          { value: t.moon + "%", label: "MOON LIT" },
        ]}
      />
      {t.error && <div className="orbital-sunrise__error" role="status">{t.error}</div>}
    </section>
  );
}
