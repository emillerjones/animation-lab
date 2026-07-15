import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { WEBGL_DPR_MAX, WEBGL_MSAA_SAMPLES } from "../rendering/quality";
import { seeded } from "../utils/procedural";
import AnimationReadout from "./AnimationReadout";
import "./CathedralOfLight.css";

const GOLD = new THREE.Color().setRGB(1.7, 0.86, 0.28);
const PALE_GOLD = new THREE.Color().setRGB(2.35, 1.5, 0.72);

function addSegment(target, a, b) {
  target.push(a.x, a.y, a.z, b.x, b.y, b.z);
}

function addBoxEdges(target, x, y, z, width, height, depth) {
  const x0 = x - width / 2;
  const x1 = x + width / 2;
  const y0 = y;
  const y1 = y + height;
  const z0 = z - depth / 2;
  const z1 = z + depth / 2;
  const corners = [
    new THREE.Vector3(x0, y0, z0), new THREE.Vector3(x1, y0, z0),
    new THREE.Vector3(x1, y1, z0), new THREE.Vector3(x0, y1, z0),
    new THREE.Vector3(x0, y0, z1), new THREE.Vector3(x1, y0, z1),
    new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x0, y1, z1),
  ];
  [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
    .forEach(([a, b]) => addSegment(target, corners[a], corners[b]));
}

function addPointedArch(target, z, halfWidth, spring, apex) {
  const left = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-halfWidth, spring, z),
    new THREE.Vector3(-halfWidth * 0.78, apex - 1.2, z),
    new THREE.Vector3(0, apex, z),
  ).getPoints(14);
  const right = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, apex, z),
    new THREE.Vector3(halfWidth * 0.78, apex - 1.2, z),
    new THREE.Vector3(halfWidth, spring, z),
  ).getPoints(14);
  [left, right].forEach((curve) => curve.slice(1).forEach((point, index) => addSegment(target, curve[index], point)));
}

function lineSegments(positions, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.LineSegments(geometry, material);
}

function buildCathedral(scene, bayCount, dustCount, variant2) {
  const architecture = new THREE.Group();
  scene.add(architecture);

  const structure = [];
  const details = [];
  const floorLines = [];
  const firstZ = 16;
  const endZ = -178;
  const spacing = (firstZ - endZ) / Math.max(1, bayCount - 1);

  for (let bay = 0; bay < bayCount; bay += 1) {
    const z = firstZ - bay * spacing;
    addPointedArch(structure, z, 10.5, 18.5, 25.5);

    [-10.5, 10.5].forEach((x) => {
      const height = 18.5;
      addBoxEdges(structure, x, 0, z, .72, height, .72);
      addBoxEdges(details, x, 0, z, 1.8, 1.05, 1.8);
      addBoxEdges(details, x, height - .7, z, 1.3, .72, 1.3);
      if (!variant2 && bay % 2 === 0) addBoxEdges(details, x, 5.2, z, 1.1, 1.1, 1.1);
    });

    addSegment(details, new THREE.Vector3(0, 25.5, z), new THREE.Vector3(0, 28.2, z));
  }

  for (let x = -16; x <= 16; x += 2) {
    addSegment(floorLines, new THREE.Vector3(x, .025, 24), new THREE.Vector3(x * .35, .025, endZ - 12));
  }
  for (let z = 24; z >= endZ - 12; z -= Math.max(3.6, spacing / 2)) {
    addSegment(floorLines, new THREE.Vector3(-17, .025, z), new THREE.Vector3(17, .025, z));
  }

  const primaryMaterial = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .6, blending: THREE.AdditiveBlending });
  const detailMaterial = new THREE.LineBasicMaterial({ color: PALE_GOLD, transparent: true, opacity: .26, blending: THREE.AdditiveBlending });
  const floorMaterial = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .17, blending: THREE.AdditiveBlending });
  architecture.add(lineSegments(structure, primaryMaterial));
  architecture.add(lineSegments(details, detailMaterial));
  architecture.add(lineSegments(floorLines, floorMaterial));

  const reflected = lineSegments(structure.map((value, index) => index % 3 === 1 ? -value : value), new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .075, blending: THREE.AdditiveBlending, depthWrite: false }));
  architecture.add(reflected);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(70, Math.max(260, bayCount * spacing + 60)),
    new THREE.MeshPhysicalMaterial({ color: 0x030303, metalness: .92, roughness: .2, transparent: true, opacity: .82, depthWrite: false }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -80);
  architecture.add(floor);

  // Variant 2's "raytracing" pass: a real-time planar reflector laid just above the
  // existing dark floor, so the arches, columns, and light beam actually mirror in the
  // ground instead of the floor only ever faking depth through a metalness value.
  let reflector = null;
  if (variant2) {
    reflector = new Reflector(
      new THREE.PlaneGeometry(70, Math.max(260, bayCount * spacing + 60)),
      { clipBias: 0.003, textureWidth: 1024, textureHeight: 1024, color: 0x2a2015 },
    );
    reflector.rotation.x = -Math.PI / 2;
    reflector.position.set(0, 0.015, -80);
    architecture.add(reflector);
  }

  const columnGeometry = new THREE.BoxGeometry(.66, 1, .66);
  const columnMaterial = new THREE.MeshStandardMaterial({ color: 0x100a03, metalness: .9, roughness: .26, emissive: 0x1d0d01, emissiveIntensity: .6 });
  const columns = new THREE.InstancedMesh(columnGeometry, columnMaterial, bayCount * 2);
  const matrix = new THREE.Matrix4();
  let instance = 0;
  for (let bay = 0; bay < bayCount; bay += 1) {
    const z = firstZ - bay * spacing;
    [-10.5, 10.5].forEach((x) => {
      const height = 18.5;
      matrix.compose(new THREE.Vector3(x, height / 2, z), new THREE.Quaternion(), new THREE.Vector3(1, height, 1));
      columns.setMatrixAt(instance, matrix);
      instance += 1;
    });
  }
  architecture.add(columns);

  const lightBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(.07, .32, 35, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: PALE_GOLD, transparent: true, opacity: .72, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  lightBeam.position.set(0, 17, endZ - 5);
  architecture.add(lightBeam);

  const lightVolume = new THREE.Mesh(
    new THREE.CylinderGeometry(.4, 7.5, 40, 24, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xffc968, transparent: true, opacity: .035, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }),
  );
  lightVolume.position.copy(lightBeam.position);
  architecture.add(lightVolume);

  const portal = new THREE.Group();
  portal.position.set(0, 0, endZ + 0.5);
  const portalPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 13.5),
    new THREE.MeshBasicMaterial({ color: PALE_GOLD, transparent: true, opacity: .16, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
  );
  portalPlane.position.y = 6.75;
  portal.add(portalPlane);
  const rose = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, .13, 10, 72),
    new THREE.MeshBasicMaterial({ color: PALE_GOLD, transparent: true, opacity: .82, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
  );
  rose.position.y = 14.5;
  portal.add(rose);
  const roseCore = new THREE.Mesh(
    new THREE.CircleGeometry(3.95, 64),
    new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: .075, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
  );
  roseCore.position.set(0, 14.5, .02);
  portal.add(roseCore);
  architecture.add(portal);

  const altar = new THREE.PointLight(0xffbe58, 68, 115, 1.3);
  altar.position.set(0, 6, endZ + 3);
  architecture.add(altar);

  const particles = Math.max(180, dustCount * 5);
  const dustPositions = new Float32Array(particles * 3);
  const dustBaseX = new Float32Array(particles);
  const dustSeeds = new Float32Array(particles);
  for (let index = 0; index < particles; index += 1) {
    dustBaseX[index] = (seeded(index, 411) - .5) * 33;
    dustPositions[index * 3] = dustBaseX[index];
    dustPositions[index * 3 + 1] = seeded(index, 412) * 27;
    dustPositions[index * 3 + 2] = 24 - seeded(index, 413) * (24 - endZ + 30);
    dustSeeds[index] = seeded(index, 414);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: PALE_GOLD, size: .085, transparent: true, opacity: .78, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  architecture.add(dust);

  return { architecture, dust, dustBaseX, dustSeeds, lightBeam, lightVolume, reflector };
}

export default function CathedralOfLight({ settings = {} }) {
  const canvasRef = useRef(null);
  const speedRef = useRef(settings.speed ?? 1);
  const arches = Math.round(settings.arches ?? 30);
  const dust = Math.round(settings.dust ?? 110);
  const variant2 = Boolean(settings.variant2);
  const dustParticles = Math.max(180, dust * 5);

  useEffect(() => { speedRef.current = settings.speed ?? 1; }, [settings.speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, WEBGL_DPR_MAX));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010101);
    scene.fog = new THREE.FogExp2(0x050301, .012);

    const camera = new THREE.PerspectiveCamera(51, host.clientWidth / host.clientHeight, .1, 420);
    camera.position.set(0, 7.4, 28);
    camera.lookAt(0, 9.4, -55);

    scene.add(new THREE.AmbientLight(0x6b3b14, .34));
    const warmLight = new THREE.PointLight(0xffc16a, 40, 74, 1.5);
    warmLight.position.set(0, 17, 5);
    scene.add(warmLight);

    const cathedral = buildCathedral(scene, arches, dust, variant2);
    const composer = new EffectComposer(renderer);
    composer.renderTarget1.samples = WEBGL_MSAA_SAMPLES;
    composer.renderTarget2.samples = WEBGL_MSAA_SAMPLES;
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), variant2 ? 1.3 : 1.05, .62, variant2 ? .15 : .18);
    composer.addPass(bloom);
    const smaa = new SMAAPass(host.clientWidth * renderer.getPixelRatio(), host.clientHeight * renderer.getPixelRatio());
    composer.addPass(smaa);

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let wheelEnergy = 0;
    let elapsed = 0;
    let frame = 0;
    let lastTime = performance.now();

    const onPointerMove = (event) => {
      pointerTarget.x = (event.clientX / window.innerWidth - .5) * 2;
      pointerTarget.y = (event.clientY / window.innerHeight - .5) * 2;
    };
    const onWheel = (event) => {
      wheelEnergy = THREE.MathUtils.clamp(wheelEnergy + event.deltaY * .006, -8, 8);
    };
    const onResize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, WEBGL_DPR_MAX));
      renderer.setSize(width, height, false);
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(host);

    const animate = (now) => {
      const delta = Math.min((now - lastTime) / 1000, .05) * speedRef.current;
      lastTime = now;
      elapsed += delta;
      wheelEnergy *= Math.pow(.84, delta * 60);

      pointer.lerp(pointerTarget, 1 - Math.pow(.93, delta * 60));
      const forward = wheelEnergy;
      camera.position.x += (pointer.x * 1.1 - camera.position.x) * Math.min(1, delta * 1.9);
      camera.position.y += (7.4 - pointer.y * .42 - camera.position.y) * Math.min(1, delta * 1.9);
      camera.position.z = 28 + Math.sin(elapsed * .18) * .65 - forward;
      camera.lookAt(pointer.x * .75, 9.6 - pointer.y * .28, -58);

      cathedral.architecture.rotation.y = Math.sin(elapsed * .11) * .0018;
      cathedral.lightBeam.material.opacity = .62 + Math.sin(elapsed * .7) * .13;
      cathedral.lightVolume.material.opacity = .028 + Math.sin(elapsed * .48) * .009;

      const position = cathedral.dust.geometry.attributes.position;
      for (let index = 0; index < position.count; index += 1) {
        let y = position.getY(index) + delta * (.08 + cathedral.dustSeeds[index] * .22);
        if (y > 28) y = 0;
        position.setY(index, y);
        position.setX(index, cathedral.dustBaseX[index] + Math.sin(elapsed * (.18 + cathedral.dustSeeds[index] * .2) + index) * .08);
      }
      position.needsUpdate = true;

      composer.render();
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      // The reflector (variant 2 only) owns its own render target and needs its own
      // dispose() call — the generic geometry/material pass above doesn't reach it.
      cathedral.reflector?.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [arches, dust, variant2]);

  return (
    <section className="atmosphere cathedral-webgl">
      <canvas ref={canvasRef} className="cathedral-webgl__canvas" aria-hidden="true" />
      <div className="cathedral-webgl__veil" aria-hidden="true" />
      <div className="experiment-copy cathedral-webgl__copy">
        <p>08 — Luminous architecture</p>
        <h1>Cathedral<br />of Light.</h1>
        <span>An endless nave drawn in gold, dust, reflection, and a single line of intent.</span>
      </div>
      <div className="cathedral-webgl__hint" aria-hidden="true"><i />Move to drift · scroll to approach</div>
      <AnimationReadout
        eyebrow={variant2 ? "Sacred geometry · variant 2" : "Sacred geometry"}
        value={`${arches} ARCHES`}
        stats={[{ value: dustParticles.toLocaleString(), label: "Dust motes" }]}
      />
    </section>
  );
}
