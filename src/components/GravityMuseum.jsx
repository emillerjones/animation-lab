import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { getProject } from "@theatre/core";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import * as THREE from "three/webgpu";
import {
  color,
  mix,
  mx_fractal_noise_float,
  positionLocal,
  sin,
  time,
} from "three/tsl";
import useDragOrbit from "../hooks/useDragOrbit";
import { WEBGL_DPR } from "../rendering/quality";
import "./GravityMuseum.css";

const GALLERY_X = 2.25;
const GALLERY_HALF_WIDTH = 11.5;
const GALLERY_FLOOR = -2.15;
const GALLERY_CEILING = 10.5;
const GALLERY_DEPTH = 64;
const tempVector = new THREE.Vector3();
const tempDirection = new THREE.Vector3();
const tempObject = new THREE.Object3D();

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

function makeArtifactDescriptors(density) {
  const count = Math.round(18 + density * 0.42);
  return Array.from({ length: count }, (_, index) => {
    const lane = (index % 5) - 2;
    const row = Math.floor(index / 5);
    const scale = 0.48 + seeded(index, 5) * 0.78;
    return {
      id: `artifact-${index}`,
      type: index % 6,
      material: [0, 1, 2, 3, 0, 1][index % 6],
      position: [
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
  return [1.2, 1.05, 1, 1.35, 1.18, 1.25][type] ?? 1.1;
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
    };
    Object.values(geometries).forEach((geometry) => {
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      computeBoundsTree.call(geometry, { maxLeafTris: 8 });
    });

    const metal = new THREE.MeshStandardNodeMaterial({
      roughness: 0.23,
      metalness: 0.92,
    });
    const metalBands = sin(positionLocal.y.mul(5.2).add(time.mul(0.42))).mul(0.5).add(0.5);
    metal.colorNode = mix(color("#17181d"), color("#a27849"), metalBands.mul(0.72));
    metal.emissiveNode = color("#ffb75f").mul(metalBands.pow(9).mul(0.18));

    const glass = new THREE.MeshPhysicalNodeMaterial({
      roughness: 0.08,
      metalness: 0.06,
      transmission: 0.78,
      thickness: 1.15,
      ior: 1.36,
      transparent: true,
      opacity: 0.84,
      side: THREE.DoubleSide,
    });
    const iris = sin(positionLocal.x.mul(2.7).add(positionLocal.y.mul(3.1)).add(time.mul(0.55))).mul(0.5).add(0.5);
    glass.colorNode = mix(color("#62d9ff"), color("#f0a2ff"), iris);
    glass.emissiveNode = mix(color("#04273b"), color("#35123d"), iris).mul(0.22);

    const marble = new THREE.MeshStandardNodeMaterial({
      roughness: 0.62,
      metalness: 0.03,
    });
    const veins = mx_fractal_noise_float(positionLocal.mul(1.7), 5, 2.05, 0.52, 1);
    marble.colorNode = mix(color("#17171b"), color("#d5d0c4"), veins.pow(2.1));

    const cracked = new THREE.MeshStandardNodeMaterial({
      roughness: 0.36,
      metalness: 0.52,
    });
    const crackNoise = mx_fractal_noise_float(positionLocal.mul(3.8).add(time.mul(0.06)), 4, 2.1, 0.5, 1);
    const crackPulse = sin(crackNoise.mul(31).sub(time.mul(1.1))).mul(0.5).add(0.5).pow(11);
    cracked.colorNode = mix(color("#07080b"), color("#343744"), crackNoise);
    cracked.emissiveNode = color("#ff6243").mul(crackPulse.mul(2.6));

    const backgroundMaterial = new THREE.MeshStandardMaterial({
      color: "#262a32",
      roughness: 0.42,
      metalness: 0.72,
      transparent: true,
      opacity: 0.24,
    });

    return {
      geometries,
      materials: [metal, glass, marble, cracked],
      backgroundMaterial,
    };
  }, []);

  useEffect(() => () => {
    Object.values(assets.geometries).forEach((geometry) => {
      geometry.boundsTree?.dispose?.();
      geometry.dispose();
    });
    assets.materials.forEach((material) => material.dispose());
    assets.backgroundMaterial.dispose();
  }, [assets]);

  return assets;
}

function ArtifactShape({ descriptor, assets, frozen }) {
  const material = assets.materials[descriptor.material];
  const outline = frozen ? "#fff8df" : "#8ca1b2";

  if (descriptor.type === 0) {
    return (
      <group>
        <mesh geometry={assets.geometries.ring} material={material} />
        <mesh geometry={assets.geometries.ring} rotation={[Math.PI * 0.5, 0.4, 0]} scale={0.67}>
          <meshBasicMaterial color={outline} wireframe transparent opacity={frozen ? 0.74 : 0.17} toneMapped={false} />
        </mesh>
      </group>
    );
  }

  if (descriptor.type === 1) {
    return (
      <group>
        <mesh geometry={assets.geometries.cube} material={material} />
        {[0, 1, 2].map((index) => (
          <mesh key={index} geometry={assets.geometries.shard} material={assets.materials[3]} position={[(index - 1) * 0.48, index * 0.19 - 0.2, 0.32 - index * 0.2]} scale={0.22 + index * 0.04} />
        ))}
      </group>
    );
  }

  if (descriptor.type === 2) {
    return (
      <group>
        <mesh geometry={assets.geometries.sphere} material={material} />
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
          />
        ))}
      </group>
    );
  }

  if (descriptor.type === 4) {
    return (
      <group>
        <mesh geometry={assets.geometries.knot} material={material} />
        <pointLight color="#ff8a56" intensity={frozen ? 4.8 : 2.1} distance={4} decay={2} />
      </group>
    );
  }

  return (
    <group>
      <mesh geometry={assets.geometries.shard} material={material} />
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
}) {
  const body = useRef();
  const releaseTimer = useRef();
  const [frozen, setFrozen] = useState(false);

  const register = useCallback((instance) => {
    body.current = instance;
    bodyRegistry.current[index] = instance;
  }, [bodyRegistry, index]);

  useEffect(() => () => {
    clearTimeout(releaseTimer.current);
    bodyRegistry.current[index] = null;
  }, [bodyRegistry, index]);

  const freeze = useCallback((event) => {
    event.stopPropagation();
    const rigidBody = body.current;
    if (!rigidBody) return;
    clearTimeout(releaseTimer.current);
    setFrozen(true);
    rigidBody.setGravityScale(0, true);
    rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    releaseTimer.current = window.setTimeout(() => {
      rigidBody.setGravityScale(1, true);
      rigidBody.wakeUp();
      setFrozen(false);
    }, 1800);
  }, []);

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
      <group onClick={freeze}>
        <ArtifactShape descriptor={descriptor} assets={assets} frozen={frozen} />
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
      const target = elapsedRef.current > 1 + index * 0.52 ? 13 : 0;
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
          color={index % 2 ? "#8ec7ff" : "#ffd9a1"}
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

function GalleryShell({ setGravityDirection, marbleMaterial }) {
  const choose = (direction, label) => (event) => {
    event.stopPropagation();
    setGravityDirection(direction, label);
  };

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[GALLERY_HALF_WIDTH, 0.18, GALLERY_DEPTH * 0.5]} position={[GALLERY_X, GALLERY_FLOOR - 0.18, -GALLERY_DEPTH * 0.5 + 6]} />
      <CuboidCollider args={[GALLERY_HALF_WIDTH, 0.18, GALLERY_DEPTH * 0.5]} position={[GALLERY_X, GALLERY_CEILING + 0.18, -GALLERY_DEPTH * 0.5 + 6]} />
      <CuboidCollider args={[0.18, 6.5, GALLERY_DEPTH * 0.5]} position={[GALLERY_X - GALLERY_HALF_WIDTH - 0.18, 4.1, -GALLERY_DEPTH * 0.5 + 6]} />
      <CuboidCollider args={[0.18, 6.5, GALLERY_DEPTH * 0.5]} position={[GALLERY_X + GALLERY_HALF_WIDTH + 0.18, 4.1, -GALLERY_DEPTH * 0.5 + 6]} />

      <mesh
        position={[GALLERY_X, GALLERY_FLOOR, -GALLERY_DEPTH * 0.5 + 6]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        onClick={choose([0, -1, 0], "FLOOR")}
      >
        <planeGeometry args={[GALLERY_HALF_WIDTH * 2, GALLERY_DEPTH, 18, 48]} />
        <primitive object={marbleMaterial} attach="material" />
      </mesh>
      <mesh
        position={[GALLERY_X, GALLERY_CEILING, -GALLERY_DEPTH * 0.5 + 6]}
        rotation={[Math.PI * 0.5, 0, 0]}
        onClick={choose([0, 1, 0], "CEILING")}
      >
        <planeGeometry args={[GALLERY_HALF_WIDTH * 2, GALLERY_DEPTH]} />
        <meshStandardMaterial color="#07080c" roughness={0.7} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[GALLERY_X - GALLERY_HALF_WIDTH, 4.1, -GALLERY_DEPTH * 0.5 + 6]}
        rotation={[0, Math.PI * 0.5, 0]}
        onClick={choose([-1, 0, 0], "WEST WALL")}
      >
        <planeGeometry args={[GALLERY_DEPTH, 13]} />
        <meshStandardMaterial color="#08090d" roughness={0.53} metalness={0.34} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[GALLERY_X + GALLERY_HALF_WIDTH, 4.1, -GALLERY_DEPTH * 0.5 + 6]}
        rotation={[0, -Math.PI * 0.5, 0]}
        onClick={choose([1, 0, 0], "EAST WALL")}
      >
        <planeGeometry args={[GALLERY_DEPTH, 13]} />
        <meshStandardMaterial color="#08090d" roughness={0.53} metalness={0.34} side={THREE.DoubleSide} />
      </mesh>

      {Array.from({ length: 10 }, (_, index) => (
        <group key={index} position={[GALLERY_X + ((index % 5) - 2) * 4.1, GALLERY_FLOOR + 0.55, 0 - Math.floor(index / 5) * 18]}>
          <CuboidCollider args={[1.05, 0.55, 1.05]} />
          <mesh>
            <boxGeometry args={[2.1, 1.1, 2.1]} />
            <primitive object={marbleMaterial} attach="material" />
          </mesh>
        </group>
      ))}
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
    const elapsed = state.clock.elapsedTime * speed;
    elapsedRef.current = elapsed;
    const cycle = elapsed < choreography.value.cycleEnds
      ? elapsed
      : choreography.value.gravityAt + ((elapsed - choreography.value.gravityAt) % (choreography.value.cycleEnds - choreography.value.gravityAt));
    theatreSheet.sequence.position = Math.min(cycle, choreography.value.cycleEnds);

    const interaction = interactionRef.current;
    const cursor = tempVector.set(interaction.pointer.x, interaction.pointer.y, 0.28).unproject(state.camera);
    tempDirection.copy(cursor).sub(state.camera.position).normalize();
    const targetZ = state.camera.position.z - 9;
    const distance = Math.abs((targetZ - state.camera.position.z) / Math.min(-0.08, tempDirection.z));
    interaction.worldPoint.copy(state.camera.position).addScaledVector(tempDirection, Math.min(30, distance));

    let target = interaction.gravityTarget;
    let stage = "SUSPENDED";
    const usingManual = performance.now() < interaction.manualUntil;

    if (!usingManual) {
      if (cycle < choreography.value.gravityAt) {
        target = tempVector.set(0, 0, 0);
        stage = cycle > choreography.value.pulseAt ? "THE PULSE" : "SUSPENDED";
      } else if (cycle < choreography.value.sidewaysAt) {
        target = tempVector.set(0, -1, 0);
        stage = "GRAVITY: FLOOR";
      } else if (cycle < choreography.value.upwardAt) {
        target = tempVector.set(1, -0.08, 0);
        stage = "GRAVITY: EAST WALL";
      } else {
        target = tempVector.set(0.06, 1, 0.04);
        stage = "GRAVITY: CEILING";
      }
    } else {
      stage = `GRAVITY: ${interaction.gravityLabel}`;
    }

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

    if (interaction.holding || interaction.pointerEnergy > 0.002) {
      const radius = interaction.holding ? 7.2 : 4.2;
      const strength = interaction.holding ? (2.6 + impact * 2.8) : interaction.pointerEnergy * 1.4 * disturbance;
      bodyRegistry.current.filter(Boolean).forEach((body) => {
        const position = body.translation();
        tempDirection.set(position.x, position.y, position.z).sub(interaction.worldPoint);
        const distanceToField = tempDirection.length();
        if (distanceToField <= 0.001 || distanceToField > radius) return;
        const falloff = 1 - distanceToField / radius;
        tempDirection.multiplyScalar(1 / distanceToField);
        const impulse = strength * falloff * delta;
        body.applyImpulse({ x: tempDirection.x * impulse, y: tempDirection.y * impulse, z: tempDirection.z * impulse }, true);
      });
    }
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
  const density = THREE.MathUtils.clamp(settings.artifactDensity ?? 72, 30, 100);
  const sparks = THREE.MathUtils.clamp(settings.sparks ?? 65, 10, 100);
  const impactEnergy = THREE.MathUtils.clamp(settings.impactEnergy ?? 90, 20, 160) / 100;
  const speed = Math.max(0.05, settings.speed ?? 1);
  const descriptors = useMemo(() => makeArtifactDescriptors(density), [density]);
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

  const setGravityDirection = useCallback((direction, label) => {
    interactionRef.current.gravityTarget.set(...direction).normalize();
    interactionRef.current.gravityLabel = label;
    interactionRef.current.manualUntil = performance.now() + 4600;
  }, [interactionRef]);

  return (
    <>
      <ambientLight intensity={0.055} />
      <directionalLight color="#bfdcff" intensity={1.2} position={[GALLERY_X - 7, 12, 14]} />
      <GalleryLights elapsedRef={elapsedRef} />
      <BackgroundArtifacts density={density} assets={assets} />
      <MuseumPulse elapsedRef={elapsedRef} />
      <AntiGravityField interactionRef={interactionRef} />
      <ImpactSparks impactRef={impactRef} amount={sparks} impactEnergy={impactEnergy} speed={speed} />

      <Physics gravity={[0, 0, 0]} timeStep="vary" interpolate>
        <GravityDirector
          settings={settings}
          interactionRef={interactionRef}
          bodyRegistry={bodyRegistry}
          elapsedRef={elapsedRef}
          onStage={onStage}
        />
        <GalleryShell setGravityDirection={setGravityDirection} marbleMaterial={assets.materials[2]} />
        {descriptors.map((descriptor, index) => (
          <Artifact
            key={descriptor.id}
            descriptor={descriptor}
            index={index}
            assets={assets}
            bodyRegistry={bodyRegistry}
            impactEnergy={impactEnergy}
            reportImpact={reportImpact}
          />
        ))}
      </Physics>
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
  renderer.toneMappingExposure = 1.04;
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
  });
  const [stage, setStage] = useState("SUSPENDED");
  const [holding, setHolding] = useState(false);

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

  const pointerDown = useCallback((event) => {
    updatePointer(event);
    interactionRef.current.holding = true;
    setHolding(true);
  }, [updatePointer]);

  const pointerUp = useCallback(() => {
    interactionRef.current.holding = false;
    setHolding(false);
  }, []);

  return (
    <section
      className={`atmosphere gravity-museum-pro ${holding ? "is-holding" : ""}`}
      onPointerMove={updatePointer}
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onPointerLeave={pointerUp}
      style={{ "--experiment-accent": "#9fdcff" }}
    >
      <Canvas
        className="gravity-museum-pro__canvas"
        gl={createWebGPURenderer}
        dpr={WEBGL_DPR}
        camera={{ position: [GALLERY_X + 2.7, 4.3, 21], fov: 47, near: 0.06, far: 180 }}
        onCreated={({ raycaster }) => {
          raycaster.firstHitOnly = true;
        }}
      >
        <color attach="background" args={["#020308"]} />
        <fogExp2 attach="fog" args={["#04060c", 0.022]} />
        <Suspense fallback={null}>
          <MuseumScene settings={settings} interactionRef={interactionRef} onStage={setStage} />
        </Suspense>
      </Canvas>

      <div className="gravity-museum-pro__veil" />
      <div className="gravity-museum-pro__copy experiment-copy">
        <p>18 — Impossible mechanics</p>
        <h1>Gravity is<br />only a curator.</h1>
        <span>The collection begins perfectly still. Then the room chooses a new down. Touch an artifact to suspend it; hold anywhere to reject gravity entirely.</span>
      </div>
      <div className="gravity-museum-pro__state" aria-live="polite">
        <span>Current law</span>
        <strong>{stage}</strong>
        <i />
      </div>
      <div className="gravity-museum-pro__hint" aria-hidden="true">
        {holding ? "ANTI-GRAVITY FIELD ACTIVE" : "CLICK A SURFACE · HOLD TO REPEL · CLICK ART TO FREEZE"}
      </div>
    </section>
  );
}
