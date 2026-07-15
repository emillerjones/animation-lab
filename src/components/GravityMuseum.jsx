import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { getProject } from "@theatre/core";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import * as THREE from "three/webgpu";
import { WebGLRenderer } from "three";
import { WebGLPathTracer } from "three-gpu-pathtracer";
import useDragOrbit from "../hooks/useDragOrbit";
import { WEBGL_DPR } from "../rendering/quality";
import "./GravityMuseum.css";

const GALLERY_X = 2.25;
const GALLERY_HALF_WIDTH = 10.8;
const GALLERY_FLOOR = -2.15;
const GALLERY_CEILING = 10.5;
const GALLERY_DEPTH = 64;
const GALLERY_CENTER_Y = (GALLERY_FLOOR + GALLERY_CEILING) / 2;
// Slow — like a front-load dryer drum, not a carnival ride. One full turn every ~50s at 1x speed.
const ROOM_ROTATION_RATE = 0.3;
const DRUM_SEGMENTS = 24;
const tempVector = new THREE.Vector3();
const tempDirection = new THREE.Vector3();
const tempObject = new THREE.Object3D();
const diceNumberTextures = new Map();

function diceNumberTexture(value) {
  if (diceNumberTextures.has(value)) return diceNumberTextures.get(value);
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, 128, 128);
  context.fillStyle = "#17191a";
  context.font = "700 72px ui-sans-serif, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(String(value), 64, 68);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  diceNumberTextures.set(value, texture);
  return texture;
}

const theatreProject = getProject("Gravity Museum — ChatGPT", {
  state: { sheetsById: {}, definitionVersion: "0.4.0", revisionHistory: [] },
});
const theatreSheet = theatreProject.sheet("Exhibition collapse");
const choreography = theatreSheet.object("Gallery chronology", {
  glideEnds: 3.1,
  pulseAt: 3.45,
  gravityAt: 4.25,
  sidewaysAt: 9.4,
  upwardAt: 14.2,
  cycleEnds: 20.5,
  cameraStartZ: 21,
  cameraEndZ: 13.5,
});

if (THREE.Mesh.prototype.raycast !== acceleratedRaycast) {
  THREE.Mesh.prototype.raycast = acceleratedRaycast;
}

function seeded(index, salt = 1) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function makeArtifactDescriptors(density, lightCount = 3) {
  const count = Math.round(density);
  const lightDepths = [-40, -24, -12, -32, -7, -46, -18, -28];
  return Array.from({ length: count }, (_, index) => {
    const lane = (index % 5) - 2;
    const row = Math.floor(index / 5);
    const scale = 0.48 + seeded(index, 5) * 0.78;
    return {
      id: `artifact-${index}`,
      isLight: index < lightCount,
      lightIndex: index < lightCount ? index : -1,
      type: index % 12,
      material: [0, 1, 2, 3, 0, 1, 4, 4, 4, 4, 4, 4][index % 12],
      position: index < lightCount
        ? [
          GALLERY_X + ((index % 3) - 1) * 4.3,
          1.2 + (index % 2) * 4.4,
          lightDepths[index],
        ]
        : [
          GALLERY_X + lane * 3.35 + (seeded(index, 8) - 0.5) * 1.3,
          0.5 + seeded(index, 11) * 8.2,
          4 - row * 5.25 - seeded(index, 17) * 2.5,
        ],
      rotation: [seeded(index, 21) * Math.PI, seeded(index, 22) * Math.PI, seeded(index, 23) * Math.PI],
      scale,
      radius: typeRadius(index % 6),
    };
  });
}

function typeRadius(type) {
  return [1.2, 1.05, 1, 1.35, 1.18, 1.25, 1.05, 1.05, 1.05, 1.08, 1.08, 1.05][type] ?? 1.1;
}

function makeSurfaceTexture(kind, colors, repeat = [3, 3]) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, kind === "metal" ? 0 : 512, 512);
  colors.forEach((color, index) => gradient.addColorStop(index / (colors.length - 1), color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  if (kind === "wood") {
    for (let line = 0; line < 38; line += 1) {
      const y = line * 14 + seeded(line, 404) * 10;
      context.beginPath();
      for (let x = -20; x <= 532; x += 8) {
        const wave = Math.sin(x * 0.025 + line * 0.72) * (5 + seeded(line, 405) * 8);
        const knot = Math.sin(x * 0.008 - line) * 4;
        if (x === -20) context.moveTo(x, y + wave + knot);
        else context.lineTo(x, y + wave + knot);
      }
      context.strokeStyle = `rgba(48, 22, 8, ${0.1 + seeded(line, 406) * 0.22})`;
      context.lineWidth = 1 + seeded(line, 407) * 3;
      context.stroke();
    }
  } else if (kind === "stone") {
    for (let vein = 0; vein < 14; vein += 1) {
      context.beginPath();
      const base = seeded(vein, 511) * 560 - 24;
      for (let y = -20; y <= 532; y += 12) {
        const x = base + y * (seeded(vein, 512) - 0.5) * 0.65 + Math.sin(y * 0.025 + vein) * 18;
        if (y === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(42, 46, 45, ${0.08 + seeded(vein, 513) * 0.18})`;
      context.lineWidth = 2 + seeded(vein, 514) * 7;
      context.stroke();
    }
  } else {
    // Long brushed streaks read as machining marks under moving highlights, not TV noise.
    for (let line = 0; line < 92; line += 1) {
      const y = seeded(line, 601) * 512;
      const x = seeded(line, 602) * 180 - 40;
      context.strokeStyle = `rgba(255, 246, 222, ${0.025 + seeded(line, 603) * 0.11})`;
      context.lineWidth = 0.5 + seeded(line, 604) * 1.6;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 280 + seeded(line, 605) * 260, y + (seeded(line, 606) - 0.5) * 2);
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.anisotropy = 8;
  return texture;
}

function useMuseumAssets() {
  const assets = useMemo(() => {
    const geometries = {
      ring: new THREE.TorusGeometry(0.82, 0.16, 12, 42),
      cube: new THREE.BoxGeometry(1.55, 1.55, 1.55, 2, 2, 2),
      sphere: new THREE.IcosahedronGeometry(1, 2),
      knot: new THREE.TorusKnotGeometry(0.68, 0.16, 72, 9, 2, 3),
      shard: new THREE.OctahedronGeometry(1.1, 1),
      stair: new THREE.BoxGeometry(1, 1, 1),
      d4: new THREE.TetrahedronGeometry(1.08, 0),
      d6: new THREE.BoxGeometry(1.48, 1.48, 1.48),
      d8: new THREE.OctahedronGeometry(1.12, 0),
      d10: new THREE.CylinderGeometry(0.78, 0.78, 1.55, 10, 1),
      d12: new THREE.DodecahedronGeometry(1.08, 0),
      d20: new THREE.IcosahedronGeometry(1.12, 0),
    };
    Object.values(geometries).forEach((geometry) => {
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      computeBoundsTree.call(geometry, { maxLeafTris: 8 });
    });

    const bronzeMap = makeSurfaceTexture("metal", ["#4b2c16", "#a8783e", "#5b351b"], [4, 2]);
    const steelMap = makeSurfaceTexture("metal", ["#4d5557", "#aeb7b8", "#626b6d"], [2, 12]);
    const woodMap = makeSurfaceTexture("wood", ["#3a1d0d", "#8b542a", "#4c2813"], [2, 5]);
    const stoneMap = makeSurfaceTexture("stone", ["#4c504d", "#96978f", "#626661"], [3, 3]);
    const ceramicMap = makeSurfaceTexture("stone", ["#bdb5a6", "#f0e6d1", "#cbc0ab"], [2, 2]);

    const metal = new THREE.MeshStandardMaterial({
      map: bronzeMap,
      bumpMap: bronzeMap,
      bumpScale: 0.035,
      color: "#a98255",
      roughness: 0.23,
      metalness: 0.92,
      emissive: "#2b1406",
      emissiveIntensity: 0.12,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: "#79c8d8",
      roughness: 0.08,
      metalness: 0.06,
      transmission: 0.78,
      thickness: 1.15,
      ior: 1.36,
      transparent: true,
      opacity: 0.84,
      side: THREE.DoubleSide,
    });

    const marble = new THREE.MeshStandardMaterial({
      map: woodMap,
      bumpMap: woodMap,
      bumpScale: 0.055,
      color: "#c28a59",
      roughness: 0.62,
      metalness: 0.03,
    });

    const stone = new THREE.MeshStandardMaterial({
      map: stoneMap,
      bumpMap: stoneMap,
      bumpScale: 0.07,
      color: "#a5aaa4",
      roughness: 0.78,
      metalness: 0.04,
    });

    const dice = new THREE.MeshStandardMaterial({
      map: ceramicMap,
      bumpMap: ceramicMap,
      bumpScale: 0.025,
      color: "#fff8e9",
      roughness: 0.34,
      metalness: 0.08,
    });

    const backgroundMaterial = new THREE.MeshStandardMaterial({
      map: steelMap,
      color: "#262a32",
      roughness: 0.42,
      metalness: 0.72,
      transparent: true,
      opacity: 0.24,
    });

    return {
      geometries,
      materials: [metal, glass, marble, stone, dice],
      backgroundMaterial,
      shellMaterials: {
        drum: new THREE.MeshStandardMaterial({ map: steelMap, bumpMap: steelMap, bumpScale: 0.018, color: "#c4cbca", roughness: 0.3, metalness: 0.74 }),
        ribs: new THREE.MeshStandardMaterial({ map: woodMap, bumpMap: woodMap, bumpScale: 0.065, color: "#b77d42", roughness: 0.42, metalness: 0.28 }),
        luminousRib: new THREE.MeshStandardMaterial({
          map: ceramicMap,
          bumpMap: ceramicMap,
          bumpScale: 0.018,
          color: "#fff1c4",
          roughness: 0.24,
          metalness: 0.18,
          emissive: "#ffb347",
          emissiveIntensity: 4.5,
        }),
        trim: new THREE.MeshStandardMaterial({ map: bronzeMap, bumpMap: bronzeMap, bumpScale: 0.025, color: "#e2b875", roughness: 0.27, metalness: 0.82, emissive: "#5a2c0d", emissiveIntensity: 0.12 }),
        back: new THREE.MeshStandardMaterial({
          map: steelMap,
          bumpMap: steelMap,
          bumpScale: 0.045,
          color: "#7a8285",
          roughness: 0.48,
          metalness: 0.42,
        }),
        hub: new THREE.MeshStandardMaterial({
          map: steelMap,
          bumpMap: steelMap,
          bumpScale: 0.02,
          color: "#596264",
          roughness: 0.27,
          metalness: 0.88,
          emissive: "#f4ecd6",
          emissiveIntensity: 0.55,
        }),
      },
      textures: [bronzeMap, steelMap, woodMap, stoneMap, ceramicMap],
    };
  }, []);

  useEffect(() => () => {
    Object.values(assets.geometries).forEach((geometry) => {
      geometry.boundsTree?.dispose?.();
      geometry.dispose();
    });
    assets.materials.forEach((material) => material.dispose());
    assets.backgroundMaterial.dispose();
    Object.values(assets.shellMaterials).forEach((material) => material.dispose());
    assets.textures.forEach((texture) => texture.dispose());
  }, [assets]);

  return assets;
}

function ArtifactShape({ descriptor, assets, frozen }) {
  const material = assets.materials[descriptor.material];
  const outline = frozen ? "#fff8df" : "#8ca1b2";

  if (descriptor.isLight) {
    return (
      <group rotation={[0, 0, -0.18]}>
        <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.9, 32, 22]} />
          <meshPhysicalMaterial color="#fff7dc" transmission={0.72} thickness={0.18} roughness={0.06} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.18, 0]} scale={[0.2, 0.46, 0.2]}>
          <sphereGeometry args={[1, 18, 12]} />
          <meshStandardMaterial color="#fff4b5" emissive="#ff9f24" emissiveIntensity={12} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.43, 0.92, 24]} />
          <meshStandardMaterial color="#90816a" metalness={0.92} roughness={0.25} />
        </mesh>
        {[-0.86, -0.66, -0.46, -0.26].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[0.48, 0.058, 8, 28]} />
            <meshStandardMaterial color="#c4b79b" metalness={0.94} roughness={0.22} />
          </mesh>
        ))}
        <pointLight
          position={[0, 0.25, 0]}
          color={descriptor.lightIndex % 2 ? "#ffd18a" : "#ffad42"}
          intensity={38}
          distance={20}
          decay={1.85}
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0015}
        />
      </group>
    );
  }

  if (descriptor.type >= 6) {
    const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"];
    const sides = [4, 6, 8, 10, 12, 20];
    const diceIndex = descriptor.type - 6;
    const value = 1 + (Math.floor(seeded(descriptor.type + descriptor.position[2], 913) * sides[diceIndex]));
    return (
      <group>
        <mesh geometry={assets.geometries[diceTypes[diceIndex]]} material={assets.materials[4]} castShadow receiveShadow />
        <mesh position={[0, 0, 1.13]}>
          <circleGeometry args={[0.34, 24]} />
          <meshBasicMaterial map={diceNumberTexture(value)} transparent polygonOffset polygonOffsetFactor={-2} />
        </mesh>
      </group>
    );
  }

  if (descriptor.type === 0) {
    return (
      <group>
        <mesh geometry={assets.geometries.ring} material={material} castShadow receiveShadow />
        <mesh geometry={assets.geometries.ring} rotation={[Math.PI * 0.5, 0.4, 0]} scale={0.67}>
          <meshBasicMaterial color={outline} wireframe transparent opacity={frozen ? 0.74 : 0.17} toneMapped={false} />
        </mesh>
      </group>
    );
  }

  if (descriptor.type === 1) {
    return (
      <group>
        <mesh geometry={assets.geometries.cube} material={material} castShadow receiveShadow />
        {[0, 1, 2].map((index) => (
          <mesh key={index} geometry={assets.geometries.shard} material={assets.materials[3]} position={[(index - 1) * 0.48, index * 0.19 - 0.2, 0.32 - index * 0.2]} scale={0.22 + index * 0.04} />
        ))}
      </group>
    );
  }

  if (descriptor.type === 2) {
    return (
      <group>
        <mesh geometry={assets.geometries.sphere} material={material} castShadow receiveShadow />
        <mesh geometry={assets.geometries.sphere} scale={0.58}>
          <meshBasicMaterial color="#d9fbff" wireframe transparent opacity={0.25} toneMapped={false} />
        </mesh>
      </group>
    );
  }

  if (descriptor.type === 3) {
    return (
      <group position={[-0.7, -0.55, 0]}>
        {Array.from({ length: 6 }, (_, index) => (
          <mesh
            key={index}
            geometry={assets.geometries.stair}
            material={material}
            position={[index * 0.27, index * 0.2, 0]}
            scale={[0.32, 0.2, 1.15]}
            castShadow
            receiveShadow
          />
        ))}
      </group>
    );
  }

  if (descriptor.type === 4) {
    const isLightArtifact = descriptor.isLight;
    if (isLightArtifact) {
      return (
        <group rotation={[0, 0, -0.18]}>
          <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.82, 32, 22]} />
            <meshPhysicalMaterial color="#fff4d3" transmission={0.82} thickness={0.16} roughness={0.08} transparent opacity={0.72} />
          </mesh>
          <mesh position={[0, 0.18, 0]} scale={[0.18, 0.42, 0.18]}>
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial color="#fff0a5" emissive="#ffae36" emissiveIntensity={9} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.48, 0.42, 0.9, 24]} />
            <meshStandardMaterial color="#7a6d58" metalness={0.9} roughness={0.28} />
          </mesh>
          {[-0.86, -0.66, -0.46, -0.26].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
              <torusGeometry args={[0.47, 0.055, 8, 28]} />
              <meshStandardMaterial color="#b6aa91" metalness={0.92} roughness={0.24} />
            </mesh>
          ))}
          <pointLight
            position={[0, 0.25, 0]}
            color="#ffb65b"
            intensity={58}
            distance={26}
            decay={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0015}
          />
        </group>
      );
    }
    return (
      <group>
        <mesh geometry={assets.geometries.knot} material={material} castShadow receiveShadow />
      </group>
    );
  }

  return (
    <group>
      <mesh geometry={assets.geometries.shard} material={material} castShadow receiveShadow />
      <mesh geometry={assets.geometries.ring} rotation={[0.6, 0.2, 0.3]} scale={1.16}>
        <meshBasicMaterial color="#8ee8ff" transparent opacity={0.18} wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}

function Artifact({
  descriptor,
  index,
  assets,
  bodyRegistry,
  impactEnergy,
  reportImpact,
  interactionRef,
}) {
  const body = useRef();

  const register = useCallback((instance) => {
    body.current = instance;
    bodyRegistry.current[index] = instance;
  }, [bodyRegistry, index]);

  useEffect(() => () => {
    bodyRegistry.current[index] = null;
  }, [bodyRegistry, index]);

  const beginDrag = useCallback((event) => {
    event.stopPropagation();
    const rigidBody = body.current;
    if (!rigidBody) return;
    interactionRef.current.draggedBody = rigidBody;
    interactionRef.current.dragDepth = rigidBody.translation().z;
    rigidBody.setBodyType(2, true);
    rigidBody.setGravityScale(0, true);
    rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }, [interactionRef]);

  useFrame(() => {
    const rigidBody = body.current;
    if (!rigidBody || interactionRef.current.draggedBody !== rigidBody) return;
    const point = interactionRef.current.worldPoint;
    rigidBody.setNextKinematicTranslation({ x: point.x, y: point.y, z: interactionRef.current.dragDepth });
  });

  const collision = useCallback(() => {
    if (!body.current) return;
    const position = body.current.translation();
    const velocity = body.current.linvel();
    const energy = Math.hypot(velocity.x, velocity.y, velocity.z) * impactEnergy;
    if (energy > 1.3) reportImpact(position, energy);
  }, [impactEnergy, reportImpact]);

  return (
    <RigidBody
      ref={register}
      position={descriptor.position}
      rotation={descriptor.rotation}
      scale={descriptor.scale}
      colliders={false}
      mass={0.75 + descriptor.scale * 1.6}
      linearDamping={0.24}
      angularDamping={0.34}
      restitution={0.28 + impactEnergy * 0.18}
      friction={0.58}
      canSleep={false}
      ccd
      onCollisionEnter={collision}
    >
      <BallCollider args={[descriptor.radius]} />
      <group onPointerDown={beginDrag}>
        <ArtifactShape descriptor={descriptor} assets={assets} frozen={false} />
      </group>
    </RigidBody>
  );
}

function BackgroundArtifacts({ density, assets }) {
  const mesh = useRef();
  const count = Math.round(80 + density * 1.65);

  useEffect(() => {
    if (!mesh.current) return;
    for (let index = 0; index < count; index += 1) {
      const side = index % 2 ? 1 : -1;
      tempObject.position.set(
        GALLERY_X + side * (8.5 + seeded(index, 41) * 2.4),
        -0.4 + seeded(index, 42) * 10.2,
        5 - seeded(index, 43) * GALLERY_DEPTH,
      );
      tempObject.rotation.set(seeded(index, 44) * 3, seeded(index, 45) * 3, seeded(index, 46) * 3);
      const scale = 0.12 + seeded(index, 47) * 0.44;
      tempObject.scale.set(scale, scale * (0.5 + seeded(index, 48)), scale);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(index, tempObject.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.008;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[assets.geometries.shard, assets.backgroundMaterial, count]}
      frustumCulled={false}
    />
  );
}

function ImpactSparks({ impactRef, amount, impactEnergy, speed }) {
  const points = useRef();
  const setup = useMemo(() => {
    const count = Math.floor(24 + amount * 1.9);
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const life = new Float32Array(count);
    positions.fill(-1000);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.userData.velocities = velocities;
    geometry.userData.life = life;
    const material = new THREE.PointsMaterial({
      color: "#ffc26b",
      transparent: true,
      opacity: 0.92,
      size: 0.055,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    return { count, geometry, material, serial: -1 };
  }, [amount, impactEnergy]);

  useFrame((_, delta) => {
    if (setup.serial !== impactRef.current.serial) {
      setup.serial = impactRef.current.serial;
      points.current?.position.copy(impactRef.current.position);
      const positions = setup.geometry.attributes.position.array;
      const velocities = setup.geometry.userData.velocities;
      const life = setup.geometry.userData.life;
      for (let index = 0; index < setup.count; index += 1) {
        const i3 = index * 3;
        const direction = new THREE.Vector3(
          Math.random() - 0.5,
          0.25 + Math.random() * 0.9,
          Math.random() - 0.5,
        ).normalize().multiplyScalar(1.2 + Math.random() * (2.2 + impactEnergy * 3.8));
        positions[i3] = 0;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = 0;
        velocities[i3] = direction.x;
        velocities[i3 + 1] = direction.y;
        velocities[i3 + 2] = direction.z;
        life[index] = 0.2 + Math.random() * 0.65;
      }
    }
    const step = Math.min(delta, 0.04) * speed;
    const positions = setup.geometry.attributes.position.array;
    const velocities = setup.geometry.userData.velocities;
    const life = setup.geometry.userData.life;
    for (let index = 0; index < setup.count; index += 1) {
      if (life[index] <= 0) continue;
      const i3 = index * 3;
      life[index] -= step;
      velocities[i3 + 1] -= 4.2 * step;
      positions[i3] += velocities[i3] * step;
      positions[i3 + 1] += velocities[i3 + 1] * step;
      positions[i3 + 2] += velocities[i3 + 2] * step;
      if (life[index] <= 0) positions[i3 + 1] = -1000;
    }
    setup.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => () => {
    setup.geometry.dispose();
    setup.material.dispose();
  }, [setup]);

  return <points ref={points} geometry={setup.geometry} material={setup.material} frustumCulled={false} />;
}

const MAX_SAND = 16000;

function SandField({ amount, speed }) {
  const points = useRef();
  const drumAngle = useRef(0);
  const simulation = useMemo(() => {
    const positions = new Float32Array(MAX_SAND * 3);
    const velocities = new Float32Array(MAX_SAND * 2);
    for (let index = 0; index < MAX_SAND; index += 1) {
      const i3 = index * 3;
      positions[i3] = GALLERY_X + (seeded(index, 1201) - 0.5) * 15;
      positions[i3 + 1] = GALLERY_CENTER_Y - GALLERY_HALF_WIDTH + 0.7 + seeded(index, 1202) * 4.2;
      positions[i3 + 2] = 3 - seeded(index, 1203) * 34;
      velocities[index * 2] = (seeded(index, 1204) - 0.5) * 0.25;
      velocities[index * 2 + 1] = 0;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: "#b88a46",
      size: 0.075,
      sizeAttenuation: true,
      roughness: 1,
    });
    return { positions, velocities, geometry, material };
  }, []);

  useFrame((_, delta) => {
    const count = Math.min(MAX_SAND, Math.max(0, Math.round(amount)));
    simulation.geometry.setDrawRange(0, count);
    const step = Math.min(delta, 0.025) * speed;
    drumAngle.current += step * ROOM_ROTATION_RATE;
    const innerRadius = GALLERY_HALF_WIDTH - 0.52;
    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const i2 = index * 2;
      let x = simulation.positions[i3];
      let y = simulation.positions[i3 + 1];
      let vx = simulation.velocities[i2];
      let vy = simulation.velocities[i2 + 1] - 9.81 * step;
      x += vx * step;
      y += vy * step;
      const dx = x - GALLERY_X;
      const dy = y - GALLERY_CENTER_Y;
      const distance = Math.hypot(dx, dy);
      if (distance > innerRadius) {
        const nx = dx / distance;
        const ny = dy / distance;
        x = GALLERY_X + nx * innerRadius;
        y = GALLERY_CENTER_Y + ny * innerRadius;
        const normalSpeed = vx * nx + vy * ny;
        if (normalSpeed > 0) {
          vx -= normalSpeed * nx * 1.35;
          vy -= normalSpeed * ny * 1.35;
        }
        vx += -ny * ROOM_ROTATION_RATE * 1.8 * step;
        vy += nx * ROOM_ROTATION_RATE * 1.8 * step;
      }
      // Six physical lifter ribs rotate with the drum. Near the shell, grains caught on
      // the leading face inherit the rib's tangential velocity until gravity makes them
      // avalanche off higher in the rotation.
      if (distance > innerRadius - 2.15) {
        const theta = Math.atan2(dy, dx);
        const spacing = Math.PI / 3;
        // GalleryShell authors ribs at theta = PI/2 - k*PI/3, then rotates the body by
        // drumAngle. Match that exact basis rather than assuming the first rib is at 0.
        const ribOrigin = Math.PI * 0.5 + drumAngle.current;
        const local = theta - ribOrigin;
        const nearestRib = Math.round(local / spacing) * spacing + ribOrigin;
        const ribDelta = Math.atan2(Math.sin(theta - nearestRib), Math.cos(theta - nearestRib));
        if (Math.abs(ribDelta) < 0.16) {
          const tangentX = -dy / Math.max(distance, 0.001);
          const tangentY = dx / Math.max(distance, 0.001);
          const carrySpeed = ROOM_ROTATION_RATE * distance * 1.16;
          vx = THREE.MathUtils.lerp(vx, tangentX * carrySpeed, 0.32);
          vy = THREE.MathUtils.lerp(vy, tangentY * carrySpeed, 0.32);
          x -= (dx / distance) * 0.035;
          y -= (dy / distance) * 0.035;
        }
      }
      vx *= 0.998;
      vy *= 0.997;
      simulation.positions[i3] = x;
      simulation.positions[i3 + 1] = y;
      simulation.velocities[i2] = vx;
      simulation.velocities[i2 + 1] = vy;
    }
    simulation.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => () => {
    simulation.geometry.dispose();
    simulation.material.dispose();
  }, [simulation]);

  return <points ref={points} geometry={simulation.geometry} material={simulation.material} frustumCulled={false} />;
}

const SAND_GRID = 164;
const SAND_CELL = ((GALLERY_HALF_WIDTH - 0.55) * 2) / SAND_GRID;

// A dense 2D granular solver projected through the depth of the drum. Unlike the old
// independent points, every grain owns a grid cell, blocks its neighbors, falls into
// diagonal gaps, and forms stable slopes. Moving ribs are solid cells that push grains
// tangentially, so the whole mass lifts and avalanches like thousands of tiny bodies.
function GranularSandField({ amount, speed }) {
  const drumAngle = useRef(0);
  const grainMesh = useRef();
  const grainTransform = useMemo(() => new THREE.Object3D(), []);
  const simulation = useMemo(() => {
    const occupancy = new Int32Array(SAND_GRID * SAND_GRID);
    occupancy.fill(-1);
    const cells = new Int32Array(MAX_SAND);
    cells.fill(-1);
    const depths = new Float32Array(MAX_SAND);
    const positions = new Float32Array(MAX_SAND * 3);
    positions.fill(-1000);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.MeshStandardMaterial({ color: "#bd8840", roughness: 0.86, metalness: 0.02 });
    return { occupancy, cells, depths, positions, geometry, material, count: 0, flip: false };
  }, []);

  const insideDrum = useCallback((gx, gy) => {
    const half = SAND_GRID * 0.5;
    const dx = gx + 0.5 - half;
    const dy = gy + 0.5 - half;
    return dx * dx + dy * dy < (half - 1.5) * (half - 1.5);
  }, []);

  useFrame((_, delta) => {
    const targetCount = Math.min(MAX_SAND, Math.max(0, Math.round(amount)));
    const { occupancy, cells, depths, positions } = simulation;

    while (simulation.count < targetCount) {
      const index = simulation.count;
      let placed = false;
      for (let attempt = 0; attempt < 80 && !placed; attempt += 1) {
        const gx = 8 + Math.floor(seeded(index + attempt * 17, 1301) * (SAND_GRID - 16));
        const gy = 3 + Math.floor(seeded(index + attempt * 31, 1302) * (SAND_GRID * 0.48));
        const cell = gy * SAND_GRID + gx;
        if (insideDrum(gx, gy) && occupancy[cell] === -1) {
          occupancy[cell] = index;
          cells[index] = cell;
          // Keep the granular body shallow in camera depth. A deep scatter turns a valid
          // pile into a perspective-expanded star field instead of one coherent mass.
          depths[index] = -14.2 - seeded(index, 1303) * 1.4;
          placed = true;
        }
      }
      if (!placed) break;
      simulation.count += 1;
    }
    while (simulation.count > targetCount) {
      simulation.count -= 1;
      const cell = cells[simulation.count];
      if (cell >= 0) occupancy[cell] = -1;
      cells[simulation.count] = -1;
    }

    const step = Math.min(delta, 0.03) * speed;
    drumAngle.current += step * ROOM_ROTATION_RATE;
    simulation.flip = !simulation.flip;
    const direction = simulation.flip ? 1 : -1;
    const ribOrigin = Math.PI * 0.5 + drumAngle.current;
    const spacing = Math.PI / 3;
    const half = SAND_GRID * 0.5;

    for (let order = 0; order < simulation.count; order += 1) {
      const index = direction > 0 ? order : simulation.count - 1 - order;
      const cell = cells[index];
      if (cell < 0) continue;
      let gx = cell % SAND_GRID;
      let gy = Math.floor(cell / SAND_GRID);
      const dx = gx + 0.5 - half;
      const dy = gy + 0.5 - half;
      const radius = Math.hypot(dx, dy);
      const theta = Math.atan2(dy, dx);
      const local = theta - ribOrigin;
      const nearestRib = Math.round(local / spacing) * spacing + ribOrigin;
      const ribDelta = Math.atan2(Math.sin(theta - nearestRib), Math.cos(theta - nearestRib));

      let targetX = gx;
      let targetY = gy - 1;
      if (radius > half - 18 && Math.abs(ribDelta) < 0.115) {
        targetX = gx + Math.round(-Math.sin(theta) * 1.4);
        targetY = gy + Math.round(Math.cos(theta) * 1.4);
      } else if (targetY < 0 || occupancy[targetY * SAND_GRID + targetX] !== -1 || !insideDrum(targetX, targetY)) {
        const first = simulation.flip ? -1 : 1;
        const diagonalA = gx + first;
        const diagonalB = gx - first;
        if (insideDrum(diagonalA, gy - 1) && occupancy[(gy - 1) * SAND_GRID + diagonalA] === -1) {
          targetX = diagonalA;
          targetY = gy - 1;
        } else if (insideDrum(diagonalB, gy - 1) && occupancy[(gy - 1) * SAND_GRID + diagonalB] === -1) {
          targetX = diagonalB;
          targetY = gy - 1;
        } else {
          continue;
        }
      }

      if (!insideDrum(targetX, targetY)) continue;
      const targetCell = targetY * SAND_GRID + targetX;
      if (occupancy[targetCell] !== -1) continue;
      occupancy[cell] = -1;
      occupancy[targetCell] = index;
      cells[index] = targetCell;
    }

    for (let index = 0; index < simulation.count; index += 1) {
      const cell = cells[index];
      const gx = cell % SAND_GRID;
      const gy = Math.floor(cell / SAND_GRID);
      const i3 = index * 3;
      positions[i3] = GALLERY_X + (gx + 0.5 - half) * SAND_CELL;
      positions[i3 + 1] = GALLERY_CENTER_Y + (gy + 0.5 - half) * SAND_CELL;
      positions[i3 + 2] = depths[index];
    }
    simulation.geometry.setDrawRange(0, simulation.count);
    simulation.geometry.attributes.position.needsUpdate = true;
    if (grainMesh.current) {
      grainMesh.current.count = simulation.count;
      for (let index = 0; index < simulation.count; index += 1) {
        const i3 = index * 3;
        grainTransform.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        const scale = 0.052 + seeded(index, 1311) * 0.026;
        grainTransform.scale.set(scale * 1.15, scale, scale);
        grainTransform.rotation.set(index * 0.37, index * 0.19, index * 0.11);
        grainTransform.updateMatrix();
        grainMesh.current.setMatrixAt(index, grainTransform.matrix);
      }
      grainMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  useEffect(() => () => {
    simulation.geometry.dispose();
    simulation.material.dispose();
  }, [simulation]);

  return (
    <instancedMesh ref={grainMesh} args={[undefined, undefined, MAX_SAND]} frustumCulled={false} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 0]} />
      <primitive object={simulation.material} attach="material" />
    </instancedMesh>
  );
}

function FluidPool({ speed }) {
  const fluid = useRef();
  const scoops = useRef([]);
  useFrame((state) => {
    if (!fluid.current) return;
    const t = state.clock.elapsedTime * speed;
    fluid.current.rotation.z = Math.sin(t * 0.72) * 0.055;
    fluid.current.scale.y = 1.05 + Math.sin(t * 1.3) * 0.08;
    fluid.current.position.x = GALLERY_X + Math.sin(t * 0.51) * 0.42;
    scoops.current.forEach((scoop, index) => {
      if (!scoop) return;
      // This is the same transform as the physical rib: base panel angle minus the
      // positive body rotation, converted from the shell's sin/cos coordinate basis.
      const angle = index * Math.PI / 3 - t * ROOM_ROTATION_RATE;
      const lift = Math.max(0.08, Math.min(1, (Math.cos(angle) + 1.15) * 0.55));
      scoop.position.set(
        GALLERY_X + Math.sin(angle) * (GALLERY_HALF_WIDTH - 1.35),
        GALLERY_CENTER_Y + Math.cos(angle) * (GALLERY_HALF_WIDTH - 1.35),
        -7 - (index % 3) * 4.8,
      );
      scoop.rotation.z = -angle;
      scoop.scale.set(1.55 * lift, 0.24 + lift * 0.42, 2.4 * lift);
      scoop.material.opacity = 0.18 + lift * 0.5;
    });
  });
  return (
    <group>
      <mesh ref={fluid} position={[GALLERY_X, GALLERY_CENTER_Y - GALLERY_HALF_WIDTH + 1.05, -10]} scale={[7.7, 1.05, 10]} receiveShadow>
        <sphereGeometry args={[1, 48, 24]} />
        <meshPhysicalMaterial color="#397f8b" transmission={0.62} thickness={1.8} roughness={0.1} metalness={0.02} transparent opacity={0.82} />
      </mesh>
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} ref={(node) => { scoops.current[index] = node; }}>
          <sphereGeometry args={[1, 28, 14]} />
          <meshPhysicalMaterial color="#4a929e" transmission={0.58} thickness={0.8} roughness={0.08} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function PhysicalSand({ amount }) {
  const count = Math.min(6000, Math.max(0, Math.round(amount)));
  const instances = useMemo(() => Array.from({ length: count }, (_, index) => {
    const depthBand = index % 12;
    return {
      key: `grain-${index}`,
      position: [
        GALLERY_X + (seeded(index, 1401) - 0.5) * 13.5,
        GALLERY_CENTER_Y - 6.8 + seeded(index, 1402) * 9.5,
        1.5 - depthBand * 3.7 - seeded(index, 1403) * 1.4,
      ],
      rotation: [seeded(index, 1404) * 3, seeded(index, 1405) * 3, seeded(index, 1406) * 3],
      scale: [
        0.075 + seeded(index, 1407) * 0.035,
        0.065 + seeded(index, 1408) * 0.03,
        0.075 + seeded(index, 1409) * 0.035,
      ],
    };
  }), [count]);

  if (!count) return null;
  return (
    <InstancedRigidBodies
      key={count}
      instances={instances}
      colliders="ball"
      mass={0.018}
      friction={0.86}
      restitution={0.04}
      linearDamping={0.12}
      angularDamping={0.18}
    >
      <instancedMesh args={[undefined, undefined, count]} castShadow receiveShadow frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#bd8840" roughness={0.88} metalness={0.01} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

const MAX_VISUAL_SAND = 97000;

function VisualSandMass({ amount }) {
  const points = useRef();
  const fakeCount = Math.min(MAX_VISUAL_SAND, Math.max(0, Math.round(amount) - 3000));
  const setup = useMemo(() => {
    const positions = new Float32Array(MAX_VISUAL_SAND * 3);
    const colors = new Float32Array(MAX_VISUAL_SAND * 3);
    const dark = new THREE.Color("#6f4723");
    const light = new THREE.Color("#c28b43");
    const mixed = new THREE.Color();
    for (let index = 0; index < MAX_VISUAL_SAND; index += 1) {
      const i3 = index * 3;
      const z = 1.2 - seeded(index, 1601) * 47;
      const depthT = Math.abs(z) / 47;
      const width = 7.8 - depthT * 0.7;
      const x = (seeded(index, 1602) * 2 - 1) * width;
      const mound = 1 - Math.pow(Math.abs(x) / width, 1.55);
      const y = GALLERY_CENTER_Y - GALLERY_HALF_WIDTH + 0.7
        + seeded(index, 1603) * (1.1 + mound * 2.25);
      positions[i3] = GALLERY_X + x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      mixed.copy(dark).lerp(light, seeded(index, 1604) * 0.82);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.045,
      sizeAttenuation: true,
      depthWrite: true,
      transparent: false,
    });
    return { geometry, material };
  }, []);

  useFrame(() => {
    setup.geometry.setDrawRange(0, fakeCount);
  });

  useEffect(() => () => {
    setup.geometry.dispose();
    setup.material.dispose();
  }, [setup]);

  if (!fakeCount) return null;
  return <points ref={points} geometry={setup.geometry} material={setup.material} frustumCulled={false} />;
}

function PhysicalWater() {
  const count = 720;
  const instances = useMemo(() => Array.from({ length: count }, (_, index) => {
    const depthBand = index % 10;
    const scale = 0.12 + seeded(index, 1501) * 0.045;
    return {
      key: `water-${index}`,
      position: [
        GALLERY_X + (seeded(index, 1502) - 0.5) * 11.5,
        GALLERY_CENTER_Y - 7.4 + seeded(index, 1503) * 5.8,
        -1 - depthBand * 4.3 - seeded(index, 1504),
      ],
      rotation: [seeded(index, 1505) * 3, seeded(index, 1506) * 3, seeded(index, 1507) * 3],
      scale: [scale * 1.22, scale * 0.86, scale * 1.08],
    };
  }), []);

  return (
    <InstancedRigidBodies
      instances={instances}
      colliders="ball"
      mass={0.035}
      friction={0.03}
      restitution={0.015}
      linearDamping={0.42}
      angularDamping={0.3}
    >
      <instancedMesh args={[undefined, undefined, count]} castShadow receiveShadow frustumCulled={false}>
        <sphereGeometry args={[1, 10, 7]} />
        <meshPhysicalMaterial
          color="#2f93b2"
          transmission={0.58}
          thickness={0.45}
          roughness={0.08}
          metalness={0.01}
          transparent
          opacity={0.78}
        />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

function PathTracingController({ enabled }) {
  const { gl, scene, camera } = useThree();
  const tracerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !gl.isWebGLRenderer) return undefined;
    scene.updateMatrixWorld(true);
    camera.lookAt(GALLERY_X, 3.1, -13.5);
    camera.updateMatrixWorld(true);
    const tracer = new WebGLPathTracer(gl);
    tracer.bounces = 5;
    tracer.renderScale = Math.min(0.8, window.devicePixelRatio > 1 ? 0.62 : 0.78);
    tracer.tiles.set(2, 2);
    tracer.dynamicLowRes = true;
    tracer.lowResScale = 0.3;
    tracer.minSamples = 2;
    tracer.rasterizeScene = true;
    tracer.setScene(scene, camera);
    tracerRef.current = tracer;
    return () => {
      tracerRef.current = null;
      tracer.dispose();
    };
  }, [camera, enabled, gl, scene]);

  useFrame(() => {
    if (enabled) tracerRef.current?.renderSample();
  }, enabled ? 1 : 0);

  return null;
}

function GalleryLights({ elapsedRef }) {
  const strips = useRef([]);
  const points = useRef([]);

  useFrame((_, delta) => {
    strips.current.forEach((strip, index) => {
      if (!strip) return;
      const target = elapsedRef.current > 0.7 + index * 0.22 ? 1 : 0;
      strip.material.opacity = THREE.MathUtils.damp(strip.material.opacity, target * 0.78, 6, delta);
    });
    points.current.forEach((light, index) => {
      if (!light) return;
      const target = elapsedRef.current > 1 + index * 0.52 ? 28 : 4;
      light.intensity = THREE.MathUtils.damp(light.intensity, target, 5, delta);
    });
  });

  return (
    <group>
      {Array.from({ length: 14 }, (_, index) => (
        <mesh
          key={`strip-${index}`}
          ref={(node) => { strips.current[index] = node; }}
          position={[GALLERY_X + (index % 2 ? 6.8 : -6.8), 9.55, 4 - Math.floor(index / 2) * 8.5]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <planeGeometry args={[4.6, 0.08]} />
          <meshBasicMaterial color="#d8edff" transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <pointLight
          key={`point-${index}`}
          ref={(node) => { points.current[index] = node; }}
          color={index % 2 ? "#d9edff" : "#ffe4b8"}
          intensity={0}
          distance={18}
          decay={1.9}
          position={[GALLERY_X + (index % 2 ? 5.5 : -5.5), 8.5, 2 - index * 8.2]}
        />
      ))}
    </group>
  );
}

function MuseumPulse({ elapsedRef }) {
  const ring = useRef();
  useFrame(() => {
    if (!ring.current) return;
    const t = THREE.MathUtils.clamp((elapsedRef.current - choreography.value.pulseAt) / 1.25, 0, 1);
    ring.current.scale.setScalar(0.1 + t * 17);
    ring.current.material.opacity = Math.sin(t * Math.PI) * 0.56;
  });
  return (
    <mesh ref={ring} position={[GALLERY_X, 0.2, -5]} rotation={[-Math.PI * 0.5, 0, 0]} scale={0.01}>
      <torusGeometry args={[1, 0.028, 6, 128]} />
      <meshBasicMaterial color="#b7e8ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function AntiGravityField({ interactionRef }) {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const interaction = interactionRef.current;
    mesh.current.position.lerp(interaction.worldPoint, 1 - Math.exp(-delta * 12));
    const target = interaction.holding ? 1 : 0;
    const scale = THREE.MathUtils.damp(mesh.current.scale.x, target, 8, delta);
    mesh.current.scale.setScalar(scale);
    mesh.current.rotation.x += delta * 0.38;
    mesh.current.rotation.y -= delta * 0.52;
    mesh.current.material.opacity = target * 0.12;
  });
  return (
    <mesh ref={mesh} scale={0.001}>
      <icosahedronGeometry args={[2.4, 3]} />
      <meshBasicMaterial color="#8feaff" wireframe transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

// The single shadow-casting key light. Its target is set imperatively and added to the
// scene graph by hand (rather than the R3F `target-position` shorthand) so the target is
// guaranteed to be present before the shadow camera first computes its frustum.
function GalleryKeyLight() {
  const light = useRef();

  useEffect(() => {
    const current = light.current;
    if (!current) return undefined;
    current.target.position.set(GALLERY_X, 2.2, -18);
    current.parent?.add(current.target);
    current.target.updateMatrixWorld();
    return () => current.parent?.remove(current.target);
  }, []);

  return (
    <spotLight
      ref={light}
      color="#fff1d6"
      intensity={105}
      position={[GALLERY_X - 5.5, 10.5, 8]}
      angle={0.62}
      penumbra={0.58}
      distance={78}
      decay={1.7}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-camera-left={-15}
      shadow-camera-right={15}
      shadow-camera-top={13}
      shadow-camera-bottom={-4}
      shadow-camera-near={1}
      shadow-camera-far={55}
      shadow-bias={-0.0018}
    />
  );
}

// The gallery shell is a kinematic body (not fixed) so it can be spun continuously — a
// front-load-dryer drum, with the artifacts as free dynamic bodies tumbling wherever
// gravity and the sweeping walls push them. Everything below is authored relative to the
// room's own center (GALLERY_X, GALLERY_CENTER_Y) rather than the world origin, so rotating
// the RigidBody spins the room in place instead of swinging it through a huge arc.
function GalleryShell({ speed, materials }) {
  const shellRef = useRef(null);
  const angleRef = useRef(0);
  const quatRef = useRef(new THREE.Quaternion());
  const axisRef = useRef(new THREE.Vector3(0, 0, 1));

  useFrame((_, delta) => {
    if (!shellRef.current) return;
    angleRef.current += delta * ROOM_ROTATION_RATE * speed;
    quatRef.current.setFromAxisAngle(axisRef.current, angleRef.current);
    shellRef.current.setNextKinematicRotation({
      x: quatRef.current.x,
      y: quatRef.current.y,
      z: quatRef.current.z,
      w: quatRef.current.w,
    });
  });

  return (
    <RigidBody ref={shellRef} type="kinematicPosition" colliders={false} position={[GALLERY_X, GALLERY_CENTER_Y, 0]}>
      {Array.from({ length: DRUM_SEGMENTS }, (_, index) => {
        const angle = (index / DRUM_SEGMENTS) * Math.PI * 2;
        const radius = GALLERY_HALF_WIDTH;
        const panelWidth = 2 * radius * Math.tan(Math.PI / DRUM_SEGMENTS) * 1.08;
        return (
          <group
            key={index}
            position={[Math.sin(angle) * radius, Math.cos(angle) * radius, -GALLERY_DEPTH * 0.5 + 6]}
            rotation={[0, 0, -angle]}
          >
            <CuboidCollider args={[panelWidth * 0.5, 0.24, GALLERY_DEPTH * 0.5]} friction={1.15} restitution={0.12} />
            <mesh receiveShadow>
              <boxGeometry args={[panelWidth, 0.38, GALLERY_DEPTH]} />
              <primitive object={materials.drum} attach="material" />
            </mesh>
            {index % 4 === 0 && (
              <group position={[0, -0.62, 0]}>
                <CuboidCollider args={[0.62, 0.34, GALLERY_DEPTH * 0.47]} friction={1.35} />
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[1.24, 0.68, GALLERY_DEPTH * 0.94]} />
                  {/* Two lit ribs, opposite each other (index 0 and index 12, 180 degrees
                      apart) — one alone read as an isolated accent; a matching rib on the
                      far side of the drum makes the light feel like it belongs to the room. */}
                  <primitive object={index === 0 || index === 12 ? materials.luminousRib : materials.ribs} attach="material" />
                </mesh>
                {(index === 0 || index === 12) && [-18, 0, 18].map((z, lightIndex) => (
                  <pointLight
                    key={z}
                    position={[0, -0.9, z]}
                    color={lightIndex === 1 ? "#fff0c2" : "#ffc46b"}
                    intensity={lightIndex === 1 ? 28 : 18}
                    distance={24}
                    decay={1.8}
                    castShadow={lightIndex === 1}
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0015}
                  />
                ))}
              </group>
            )}
          </group>
        );
      })}
      {[-3, -22, -41].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[GALLERY_HALF_WIDTH - 0.35, 0.18, 8, 96]} />
          <primitive object={materials.trim} attach="material" />
        </mesh>
      ))}
      <CuboidCollider args={[GALLERY_HALF_WIDTH, GALLERY_HALF_WIDTH, 0.22]} position={[0, 0, -GALLERY_DEPTH + 6]} friction={0.8} />
      <group position={[0, 0, -GALLERY_DEPTH + 6.18]}>
        <mesh receiveShadow>
          <circleGeometry args={[GALLERY_HALF_WIDTH, 96]} />
          <primitive object={materials.back} attach="material" />
        </mesh>
        {/* The back plate reads as a light fixture, not just a light-colored wall, only if
            these actually throw light out to the 6 rib tips converging on it (radius ~10.8) —
            at the old intensity/decay they faded to nothing well before reaching that far. */}
        {[-5.2, 0, 5.2].map((x, index) => (
          <pointLight
            key={x}
            position={[x, index === 1 ? 1.4 : -1.2, 1.1]}
            color={index === 1 ? "#ffe3b0" : "#d7b07a"}
            intensity={index === 1 ? 34 : 18}
            distance={32}
            decay={1.65}
            castShadow={index === 1}
            shadow-mapSize={[512, 512]}
            shadow-bias={-0.0015}
          />
        ))}
        {/* Hexagonal, not round — a circle looks identical at every angle, so it would never
            read as spinning with the drum. Six flat sides make the rotation obvious. */}
        {[2.3, 5.1, 8.1].map((radius) => (
          <mesh key={radius} position={[0, 0, 0.06]}>
            <torusGeometry args={[radius, 0.12, 8, 6]} />
            <primitive object={materials.trim} attach="material" />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI * 0.5, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.28, 32]} />
          <primitive object={materials.hub} attach="material" />
        </mesh>
        {/* A real light, not just an emissive texture — tuned to reach the walls (radius
            ~10.8) so the hub actually contributes to the room instead of only glowing
            itself. This is the fix for the drum interior reading as generally too dark. */}
        <pointLight position={[0, 0, 0.6]} color="#f4ecd6" intensity={30} distance={42} decay={1.6} />
      </group>
    </RigidBody>
  );
}

function GravityDirector({
  settings,
  interactionRef,
  bodyRegistry,
  elapsedRef,
  onStage,
}) {
  const { world } = useRapier();
  const dragRef = useDragOrbit();
  const currentGravity = useRef(new THREE.Vector3());
  const lastStage = useRef("");
  const lastAutoStage = useRef("");
  const force = THREE.MathUtils.clamp(settings.gravityForce ?? 100, 30, 180) / 100;
  const impact = THREE.MathUtils.clamp(settings.impactEnergy ?? 90, 20, 160) / 100;
  const disturbance = THREE.MathUtils.clamp(settings.disturbance ?? 55, 0, 100) / 100;
  const speed = Math.max(0.05, settings.speed ?? 1);

  useFrame((state, delta) => {
    if (settings.pathTracing) {
      state.camera.lookAt(GALLERY_X, 3.1, -13.5);
      return;
    }
    const elapsed = state.clock.elapsedTime * speed;
    elapsedRef.current = elapsed;
    const cycle = elapsed < choreography.value.cycleEnds
      ? elapsed
      : choreography.value.gravityAt + ((elapsed - choreography.value.gravityAt) % (choreography.value.cycleEnds - choreography.value.gravityAt));
    theatreSheet.sequence.position = Math.min(cycle, choreography.value.cycleEnds);

    const interaction = interactionRef.current;
    const cursor = tempVector.set(interaction.pointer.x, interaction.pointer.y, 0.28).unproject(state.camera);
    tempDirection.copy(cursor).sub(state.camera.position).normalize();
    const targetZ = interaction.draggedBody ? interaction.dragDepth : state.camera.position.z - 9;
    const distance = Math.abs((targetZ - state.camera.position.z) / Math.min(-0.08, tempDirection.z));
    interaction.worldPoint.copy(state.camera.position).addScaledVector(tempDirection, Math.min(30, distance));

    // The chamber turns, but down never does. Keeping this in world/screen space is what
    // makes the artifacts behave like clothes in a front-loading dryer.
    const target = tempVector.set(0, -1, 0);
    const stage = "GRAVITY: SCREEN DOWN";

    if (stage !== lastStage.current) {
      lastStage.current = stage;
      onStage(stage);
    }

    const gravityMagnitude = 9.81 * force;
    const desired = tempDirection.copy(target).normalize().multiplyScalar(target.lengthSq() > 0 ? gravityMagnitude : 0);
    currentGravity.current.x = THREE.MathUtils.damp(currentGravity.current.x, desired.x, 3.7, delta);
    currentGravity.current.y = THREE.MathUtils.damp(currentGravity.current.y, desired.y, 3.7, delta);
    currentGravity.current.z = THREE.MathUtils.damp(currentGravity.current.z, desired.z, 3.7, delta);
    world.gravity.x = currentGravity.current.x;
    world.gravity.y = currentGravity.current.y;
    world.gravity.z = currentGravity.current.z;

    if (stage !== lastAutoStage.current && stage.startsWith("GRAVITY")) {
      lastAutoStage.current = stage;
      bodyRegistry.current.filter(Boolean).forEach((body, index) => {
        const scatter = (seeded(index, Math.floor(elapsed) + 80) - 0.5) * impact;
        body.applyTorqueImpulse({ x: scatter * 0.7, y: scatter, z: -scatter * 0.55 }, true);
        body.wakeUp();
      });
    }

    if (cycle > choreography.value.pulseAt && cycle < choreography.value.pulseAt + 0.16 && !interaction.pulseFired) {
      interaction.pulseFired = true;
      bodyRegistry.current.filter(Boolean).forEach((body) => {
        const position = body.translation();
        tempDirection.set(position.x - GALLERY_X, position.y - 2.5, position.z + 5).normalize();
        body.applyImpulse({ x: tempDirection.x * impact * 0.22, y: tempDirection.y * impact * 0.22, z: tempDirection.z * impact * 0.22 }, true);
      });
    }
    if (cycle < choreography.value.pulseAt - 0.2) interaction.pulseFired = false;

    interaction.pointerEnergy = THREE.MathUtils.damp(interaction.pointerEnergy, 0, 5.5, delta);

    const opening = THREE.MathUtils.smoothstep(elapsed, 0, choreography.value.glideEnds);
    const cameraZ = THREE.MathUtils.lerp(choreography.value.cameraStartZ, choreography.value.cameraEndZ, opening);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, GALLERY_X + 2.7 + Math.sin(dragRef.current.targetYaw) * 0.45, 2.8, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 4.3 + dragRef.current.targetPitch * 0.3, 2.8, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraZ - Math.sin(elapsed * 0.06) * 1.2, 2.4, delta);
    state.camera.lookAt(GALLERY_X, 3.1, -13.5);
  });

  return null;
}

function MuseumScene({ settings, interactionRef, onStage }) {
  const density = THREE.MathUtils.clamp(settings.artifactDensity ?? 76, 24, 140);
  const sparks = 48;
  const impactEnergy = 0.82;
  const speed = Math.max(0.05, settings.speed ?? 1);
  const lightCount = THREE.MathUtils.clamp(Math.round(settings.lightObjects ?? 3), 0, 8);
  const descriptors = useMemo(() => makeArtifactDescriptors(density, lightCount), [density, lightCount]);
  const assets = useMuseumAssets();
  const bodyRegistry = useRef([]);
  const elapsedRef = useRef(0);
  const impactRef = useRef({ serial: 0, position: new THREE.Vector3(0, -100, 0), last: 0 });

  const reportImpact = useCallback((position, energy) => {
    const now = performance.now();
    if (now - impactRef.current.last < Math.max(42, 130 - sparks)) return;
    impactRef.current.last = now;
    impactRef.current.serial += 1;
    impactRef.current.position.set(position.x, position.y, position.z);
    interactionRef.current.lastImpact = Math.min(1, energy * 0.1);
  }, [interactionRef, sparks]);

  return (
    <>
      <color attach="background" args={["#343a3c"]} />
      <ambientLight color="#fff4df" intensity={0.025} />
      <hemisphereLight args={["#dce8ea", "#403a35", 0.045]} />
      <GalleryKeyLight />
      <ImpactSparks impactRef={impactRef} amount={sparks} impactEnergy={impactEnergy} speed={speed} />
      <mesh position={[GALLERY_X - 5.5, 9.8, 4.5]} rotation={[0.2, 0, -0.18]}>
        <boxGeometry args={[4.8, 0.28, 1.2]} />
        <meshStandardMaterial color="#f4e7cb" emissive="#ffe8b8" emissiveIntensity={1.8} toneMapped={false} />
      </mesh>

      <Physics gravity={[0, 0, 0]} timeStep="vary" interpolate paused={Boolean(settings.pathTracing)}>
        <GravityDirector
          settings={settings}
          interactionRef={interactionRef}
          bodyRegistry={bodyRegistry}
          elapsedRef={elapsedRef}
          onStage={onStage}
        />
        <GalleryShell speed={speed} materials={assets.shellMaterials} />
        <PhysicalSand amount={settings.physicalSand ?? 1200} />
        {descriptors.map((descriptor, index) => (
          <Artifact
            key={descriptor.id}
            descriptor={descriptor}
            index={index}
            assets={assets}
            bodyRegistry={bodyRegistry}
            impactEnergy={impactEnergy}
            reportImpact={reportImpact}
            interactionRef={interactionRef}
          />
        ))}
      </Physics>
      <PathTracingController enabled={Boolean(settings.pathTracing)} />
    </>
  );
}

async function createWebGPURenderer(props) {
  const renderer = new THREE.WebGPURenderer({
    ...props,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  await renderer.init();
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

function createPathTracingRenderer(props) {
  const renderer = new WebGLRenderer({
    ...props,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export default function GravityMuseum({ settings = {} }) {
  const interactionRef = useRef({
    pointer: new THREE.Vector2(),
    previousPointer: new THREE.Vector2(),
    pointerEnergy: 0,
    worldPoint: new THREE.Vector3(GALLERY_X, 3, 2),
    gravityTarget: new THREE.Vector3(0, -1, 0),
    gravityLabel: "FLOOR",
    manualUntil: 0,
    holding: false,
    pulseFired: false,
    lastImpact: 0,
    draggedBody: null,
    dragDepth: 0,
  });
  const [stage, setStage] = useState("SUSPENDED");
  const objectCount = Math.round(THREE.MathUtils.clamp(settings.artifactDensity ?? 76, 24, 140));
  const lightCount = THREE.MathUtils.clamp(Math.round(settings.lightObjects ?? 3), 0, 8);
  const sandCount = Math.min(6000, Math.max(0, Math.round(settings.physicalSand ?? 1200)));

  const updatePointer = useCallback((event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    const interaction = interactionRef.current;
    interaction.previousPointer.copy(interaction.pointer);
    interaction.pointer.set(x, y);
    interaction.pointerEnergy = Math.min(
      1,
      interaction.pointerEnergy + interaction.pointer.distanceTo(interaction.previousPointer) * 1.8,
    );
  }, []);

  const releaseObject = useCallback(() => {
    const interaction = interactionRef.current;
    const rigidBody = interaction.draggedBody;
    if (!rigidBody) return;
    rigidBody.setBodyType(0, true);
    rigidBody.setGravityScale(1, true);
    rigidBody.wakeUp();
    interaction.draggedBody = null;
  }, []);

  return (
    <section
      className="atmosphere gravity-museum-pro"
      onPointerMove={updatePointer}
      onPointerUp={releaseObject}
      onPointerCancel={releaseObject}
      onPointerLeave={releaseObject}
      style={{ "--experiment-accent": "#9fdcff" }}
    >
      <Canvas
        key={settings.pathTracing ? "path-traced" : "webgpu"}
        className="gravity-museum-pro__canvas"
        gl={settings.pathTracing ? createPathTracingRenderer : createWebGPURenderer}
        dpr={WEBGL_DPR}
        camera={{ position: [GALLERY_X + 2.7, 4.3, 21], fov: 47, near: 0.06, far: 180 }}
        onCreated={({ raycaster }) => {
          raycaster.firstHitOnly = true;
        }}
      >
        <color attach="background" args={["#343a3c"]} />
        <fogExp2 attach="fog" args={["#343a3c", 0.004]} />
        <Suspense fallback={null}>
          <MuseumScene settings={settings} interactionRef={interactionRef} onStage={setStage} />
        </Suspense>
      </Canvas>

      <div className="gravity-museum-pro__copy experiment-copy">
        <p>18 — Impossible mechanics</p>
        <h1>Gravity is<br />only a curator.</h1>
        <span>The chamber turns, but down never moves. Its ribs lift the collection until gravity pulls every object back into the tumbling pile below.</span>
      </div>
      <div className="gravity-museum-pro__state" aria-live="polite">
        <span>Current law</span>
        <strong>{stage}</strong>
        <i />
        <span>{objectCount.toLocaleString()} OBJECTS</span>
        <span>{lightCount.toLocaleString()} LIGHT SOURCES</span>
        <span>{sandCount.toLocaleString()} SAND GRAINS</span>
      </div>
      <div className="gravity-museum-pro__hint" aria-hidden="true">
        CLICK AND DRAG AN OBJECT · RELEASE TO DROP
      </div>
    </section>
  );
}
