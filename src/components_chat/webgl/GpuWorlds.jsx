import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, MeshReflectorMaterial, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { seeded } from "../../utils/procedural";

const range = (count) => Array.from({ length: count }, (_, index) => index);
const color = (value) => new THREE.Color(value);

function Dust({ count = 180, scale = [30, 18, 80], color: tint = "#ffffff", size = 1.2, speed = .18 }) {
  return <Sparkles count={count} scale={scale} color={tint} size={size} speed={speed} opacity={.75} noise={1.2} />;
}

function Tunnel({ settings, accent, architectural = false }) {
  const group = useRef();
  const frameMetric = settings.frames ?? settings.depth ?? Math.round((settings.density ?? 78) / 3);
  const count = Math.min(44, Math.max(18, Math.round(frameMetric * 1.15)));
  useFrame((_, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, .05) * (settings.speed ?? 1) * (architectural ? 1.15 : 2.2);
    group.current.children.forEach((child) => {
      child.position.z += step * 5;
      if (child.position.z > 12) child.position.z -= count * 5.5;
      child.rotation.z += step * (architectural ? .008 : .07);
    });
  });
  return (
    <group ref={group}>
      {range(count).map((index) => (
        <mesh key={index} position={[0, architectural ? 2.8 : 1.5, 8 - index * 5.5]} rotation={[0, 0, architectural ? 0 : index * .035]}>
          <boxGeometry args={[architectural ? 15 : 12, architectural ? 9 : 8, .08]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={architectural ? .3 : .42} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
      {architectural && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, -48]}>
            <planeGeometry args={[18, 125, 12, 80]} />
            <meshBasicMaterial color={accent} wireframe transparent opacity={.075} blending={THREE.AdditiveBlending} />
          </mesh>
          {[-7.2, 7.2].map((x) => <mesh key={x} position={[x, -1.62, -48]}><boxGeometry args={[.035, .035, 125]} /><meshBasicMaterial color={accent} transparent opacity={.72} /></mesh>)}
        </>
      )}
      <Dust count={Math.max(120, (settings.dust ?? settings.particles ?? settings.density ?? 80) * 3)} color={accent} scale={[16, 11, count * 5]} size={1.1} speed={.35} />
      <pointLight color={accent} intensity={36} distance={55} position={[0, 2, -18]} />
    </group>
  );
}

const dawnSkyVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dawnSkyFragment = `
  varying vec2 vUv;
  uniform float uDawn;
  void main() {
    vec3 nightTop = vec3(.003, .008, .035);
    vec3 nightBottom = vec3(.025, .035, .09);
    vec3 dayTop = vec3(.22, .56, .84);
    vec3 dayBottom = vec3(.98, .68, .43);
    vec3 night = mix(nightBottom, nightTop, smoothstep(0.0, 1.0, vUv.y));
    vec3 day = mix(dayBottom, dayTop, smoothstep(0.0, .88, vUv.y));
    float horizon = exp(-pow((vUv.y - .22) * 5.2, 2.0)) * uDawn;
    vec3 sky = mix(night, day, uDawn) + vec3(1.0, .39, .12) * horizon * .16;
    gl_FragColor = vec4(sky, 1.0);
  }
`;

function StarWorld({ settings, accent, actionActive }) {
  const progress = useRef(0);
  const sky = useRef();
  const stars = useRef();
  const moon = useRef();
  const moonLight = useRef();
  const sun = useRef();
  const sunLight = useRef();
  const clouds = useRef();
  const skyUniforms = useMemo(() => ({ uDawn: { value: 0 } }), []);

  useFrame((_, delta) => {
    progress.current = THREE.MathUtils.damp(progress.current, actionActive ? 1 : 0, .62, delta);
    const dawn = progress.current;
    if (sky.current) sky.current.uniforms.uDawn.value = dawn;
    if (stars.current?.material) stars.current.material.opacity = Math.max(0, 1 - dawn * 1.3);
    if (moon.current) {
      moon.current.position.y = 5.2 - dawn * 15;
      moon.current.rotation.z = dawn * .35;
    }
    if (moonLight.current) moonLight.current.intensity = 55 * (1 - dawn);
    if (sun.current) sun.current.position.y = -8 + dawn * 13;
    if (sunLight.current) sunLight.current.intensity = dawn * 72;
    if (clouds.current) {
      clouds.current.position.x = dawn * 38;
      clouds.current.rotation.y += delta * .018 * (settings.speed ?? 1);
      clouds.current.children.forEach((child) => { child.material.opacity = .3 * (1 - dawn); });
    }
  });

  return (
    <group>
      <mesh position={[0, 2, -42]} scale={[100, 52, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial ref={sky} uniforms={skyUniforms} vertexShader={dawnSkyVertex} fragmentShader={dawnSkyFragment} depthWrite={false} />
      </mesh>
      <Stars ref={stars} radius={90} depth={70} count={Math.max(1000, (settings.density ?? settings.stars ?? 80) * 28)} factor={3.2} saturation={.18} fade speed={.18} />
      <group ref={moon} position={[5.8, 5.2, -15]}>
        <mesh><sphereGeometry args={[2.2, 48, 48]} /><meshBasicMaterial color="#fff1c2" /></mesh>
      </group>
      <pointLight ref={moonLight} position={[5.8, 5.2, -11]} color="#ffe2a2" intensity={55} distance={32} />
      <group ref={sun} position={[5.8, -8, -16]}>
        <mesh><sphereGeometry args={[2.35, 48, 48]} /><meshBasicMaterial color="#fff4bf" toneMapped={false} /></mesh>
        <mesh><sphereGeometry args={[3.8, 32, 24]} /><meshBasicMaterial color="#ffb259" transparent opacity={.08} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      </group>
      <pointLight ref={sunLight} position={[5.8, 4, -10]} color="#ffd089" intensity={0} distance={58} />
      <group ref={clouds} position={[0, 4, -9]}>
        {range(Math.min(24, settings.clouds ?? 18)).map((index) => <mesh key={index} position={[(seeded(index, 2) - .5) * 24, (seeded(index, 3) - .5) * 3, (seeded(index, 4) - .5) * 8]} scale={[2.5 + seeded(index, 5) * 3.5, .7 + seeded(index, 6), 1.2]}><sphereGeometry args={[1, 18, 10]} /><meshStandardMaterial color="#18233a" transparent opacity={.3} roughness={1} /></mesh>)}
      </group>
      <Dust count={100} color={accent} scale={[30, 14, 30]} speed={.08} />
    </group>
  );
}

const stormCloudVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const stormCloudFragment = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uCover;
  uniform float uOffset;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0;
    float amp = .55;
    for (int i = 0; i < 6; i++) {
      value += noise(p) * amp;
      p = p * 2.03 + 7.31;
      amp *= .49;
    }
    return value;
  }
  void main() {
    vec2 p = vec2(vUv.x * 3.3 + uTime * .022 + uOffset, vUv.y * 2.1 - uTime * .006);
    float large = fbm(p);
    float detail = fbm(p * 2.15 - 3.8);
    float cloud = smoothstep(.72 - uCover * .34, .88, large * .78 + detail * .22);
    float bottom = smoothstep(.02, .24, vUv.y);
    float edge = smoothstep(0.0, .09, vUv.x) * smoothstep(1.0, .91, vUv.x);
    vec3 shadow = vec3(.018, .026, .034);
    vec3 silver = vec3(.19, .23, .26);
    vec3 cloudColor = mix(shadow, silver, smoothstep(.48, .95, large) * .52);
    gl_FragColor = vec4(cloudColor, cloud * bottom * edge * (.58 + uCover * .38));
  }
`;

function StormCloudLayer({ settings, position, scale, offset, speed }) {
  const material = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCover: { value: (settings.chatClouds ?? 82) / 100 },
    uOffset: { value: offset },
  }), [offset, settings.chatClouds]);
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime * speed * (settings.chatWind ?? .9);
  });
  return (
    <mesh position={position} scale={scale} renderOrder={2}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={stormCloudVertex} fragmentShader={stormCloudFragment} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function StormClouds({ settings }) {
  return (
    <group>
      <StormCloudLayer settings={settings} position={[0, 7.2, -28]} scale={[58, 20, 1]} offset={0} speed={1} />
      <StormCloudLayer settings={settings} position={[-4, 7.8, -19]} scale={[48, 16, 1]} offset={4.7} speed={1.35} />
      <StormCloudLayer settings={settings} position={[5, 8.8, -11]} scale={[38, 12, 1]} offset={9.2} speed={1.7} />
    </group>
  );
}

function StormLightning({ settings }) {
  const bolt = useRef();
  const flashScreen = useRef();
  const flashLight = useRef();
  const skyLight = useRef();
  const nextFlash = useRef(1.1);
  const flash = useRef(0);
  const rainLevel = (settings.chatRain ?? 76) / 100;
  const frequency = (settings.chatLightningRate ?? 6) / 10;
  const enabled = settings.chatLightning !== false;
  const positions = useMemo(() => {
    const points = [];
    let x = 7.5;
    let y = 12.5;
    for (let index = 0; index < 9; index += 1) {
      const nextX = x + (seeded(index, 340) - .55) * 2.2;
      const nextY = y - 1.35 - seeded(index, 341) * .8;
      points.push(x, y, -10, nextX, nextY, -10);
      x = nextX;
      y = nextY;
    }
    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (enabled && time > nextFlash.current) {
      flash.current = .7 + rainLevel * .45;
      const stormInterval = Math.max(.9, 7.7 - frequency * 5.1 - rainLevel * 1.35);
      nextFlash.current = time + stormInterval * (.72 + seeded(Math.floor(time * 10), 342) * .78);
    }
    flash.current = Math.max(0, flash.current - delta * (5.8 - rainLevel * 1.8));
    const pulse = flash.current > .3 ? flash.current * (1 + Math.sin(time * 92) * .18) : flash.current;
    if (bolt.current) bolt.current.opacity = enabled ? pulse : 0;
    if (flashScreen.current) flashScreen.current.opacity = enabled ? pulse * (.055 + rainLevel * .07) : 0;
    if (flashLight.current) flashLight.current.intensity = pulse * (55 + rainLevel * 135);
    if (skyLight.current) skyLight.current.intensity = pulse * (1.5 + rainLevel * 3.5);
  });

  return (
    <group>
      <mesh position={[0, 3, 5.5]} renderOrder={20}>
        <planeGeometry args={[42, 25]} />
        <meshBasicMaterial ref={flashScreen} color="#c7d9e5" transparent opacity={0} depthTest={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <lineBasicMaterial ref={bolt} color="#e9f7ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <pointLight ref={flashLight} position={[6, 8, -8]} color="#d8ecff" intensity={0} distance={70} decay={1.3} />
      <directionalLight ref={skyLight} position={[4, 12, 2]} color="#b7d8ff" intensity={0} />
    </group>
  );
}

function RainHorizon({ settings }) {
  const haze = (settings.chatHaze ?? 58) / 100;
  return (
    <group>
      <mesh position={[0, -2.4, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[54, 48]} />
        <meshStandardMaterial color="#020405" roughness={.42} metalness={.28} />
      </mesh>
      {range(16).map((index) => {
        const height = 3.2 + seeded(index, 360) * 8.5;
        const width = 1.2 + seeded(index, 361) * 1.7;
        const x = (index - 7.5) * 2.45;
        const z = -17 - seeded(index, 362) * 17;
        return (
          <group key={index} position={[x, -2 + height / 2, z]}>
            <mesh>
              <boxGeometry args={[width, height, 1.5]} />
              <meshStandardMaterial color={index % 3 === 0 ? "#080b0d" : "#040708"} roughness={.94} metalness={.05} />
            </mesh>
            {range(index % 4 === 0 ? 3 : 1).map((light) => (
              <mesh key={light} position={[(light - .7) * width * .28, height * .18 - light * .7, .77]}>
                <planeGeometry args={[.13, .2]} />
                <meshBasicMaterial color={light % 2 ? "#b8a77e" : "#d8c28c"} transparent opacity={.28 + seeded(index + light, 363) * .38} toneMapped={false} />
              </mesh>
            ))}
          </group>
        );
      })}
      {range(4).map((layer) => (
        <mesh key={layer} position={[(layer % 2 ? -2 : 3), .1 + layer * .55, -9 - layer * 7]} scale={[48 + layer * 7, 4.5 + layer, 1]} renderOrder={5}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#7d8d93" transparent opacity={haze * (.025 + layer * .012)} depthWrite={false} />
        </mesh>
      ))}
      <pointLight position={[-8, -.2, -13]} color="#d9b77b" intensity={3.5} distance={13} />
      <pointLight position={[10, .4, -18]} color="#c5b181" intensity={2.5} distance={12} />
    </group>
  );
}

function RainWorld({ settings, accent }) {
  const rain = useRef();
  const rainLevel = (settings.chatRain ?? 76) / 100;
  const wind = settings.chatWind ?? .9;
  const count = Math.round(180 + rainLevel * 760);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 6);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 6;
      const x = (seeded(index, 31) - .5) * 34;
      const y = seeded(index, 32) * 23 - 6;
      const z = seeded(index, 33) * -45 + 7;
      const length = .35 + seeded(index, 34) * 1.4;
      values[offset] = x;
      values[offset + 1] = y;
      values[offset + 2] = z;
      values[offset + 3] = x - .16;
      values[offset + 4] = y - length;
      values[offset + 5] = z;
    }
    return values;
  }, [count]);
  useFrame((_, delta) => {
    if (!rain.current) return;
    const attr = rain.current.geometry.attributes.position;
    for (let index = 0; index < count; index += 1) {
      const head = index * 2;
      const tail = head + 1;
      const fall = delta * (settings.speed ?? 1) * (9 + seeded(index, 35) * 16);
      let headY = attr.getY(head) - fall;
      let tailY = attr.getY(tail) - fall;
      let headX = attr.getX(head) - delta * wind * 2.2;
      let tailX = attr.getX(tail) - delta * wind * 2.2;
      if (tailY < -7) {
        const length = .35 + seeded(index, 34) * 1.4;
        headY = 16 + seeded(index, 36) * 5;
        tailY = headY - length;
        headX = (seeded(index + Math.floor(headY * 10), 37) - .5) * 34;
        tailX = headX - .16 * wind;
      }
      if (headX < -18) { headX = 18; tailX = 18 - .16 * wind; }
      attr.setY(head, headY);
      attr.setY(tail, tailY);
      attr.setX(head, headX);
      attr.setX(tail, tailX);
    }
    attr.needsUpdate = true;
  });
  return (
    <group>
      <mesh position={[0, 3, -41]}><planeGeometry args={[76, 38]} /><meshBasicMaterial color={new THREE.Color("#07111c").lerp(new THREE.Color("#010205"), rainLevel)} /></mesh>
      <StormClouds settings={settings} />
      <StormLightning settings={settings} />
      <lineSegments ref={rain}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color="#d8f4ff" transparent opacity={.35 + rainLevel * .55} blending={THREE.AdditiveBlending} depthWrite={false} /></lineSegments>
      <RainHorizon settings={settings} />
      <mesh position={[0, 0, 5]}><planeGeometry args={[40, 24]} /><meshPhysicalMaterial color="#07121c" transparent opacity={.1 + (settings.chatGlass ?? 68) * .0012} roughness={.08 + (settings.chatGlass ?? 68) * .0015} transmission={.18} /></mesh>
    </group>
  );
}

const fogVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fogFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOffset;
  uniform float uOpacity;
  uniform vec3 uColor;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x), mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int octave = 0; octave < 5; octave++) {
      value += amplitude * noise(p);
      p = p * 2.04 + 8.17;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 flow = vec2(vUv.x * 3.4 + uTime * 0.025 + uOffset, vUv.y * 2.2 - uTime * 0.008);
    float body = smoothstep(0.28, 0.82, fbm(flow));
    float breakup = smoothstep(0.18, 0.78, fbm(flow * 1.7 - 4.2));
    float verticalFade = smoothstep(0.0, 0.28, vUv.y) * smoothstep(1.0, 0.58, vUv.y);
    float horizontalFade = smoothstep(0.0, 0.13, vUv.x) * smoothstep(1.0, 0.87, vUv.x);
    float alpha = body * (0.58 + breakup * 0.42) * verticalFade * horizontalFade * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function FogSheet({ position, scale, opacity, offset, speed }) {
  const material = useRef();
  const mesh = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOffset: { value: offset },
    uOpacity: { value: opacity },
    uColor: { value: new THREE.Color("#c6ddd8") },
  }), [offset, opacity]);
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    if (mesh.current) mesh.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * .055 + offset) * 1.4;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale} renderOrder={8}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={fogVertexShader} fragmentShader={fogFragmentShader} transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.NormalBlending} />
    </mesh>
  );
}

function Ridge({ depth, layer, accent }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 40 + layer * 4;
    const segments = 18;
    shape.moveTo(-width / 2, -5);
    for (let index = 0; index <= segments; index += 1) {
      const x = -width / 2 + (index / segments) * width;
      const broad = Math.sin(index * .78 + layer * 1.7) * (1.5 + layer * .12);
      const sharp = Math.abs(Math.sin(index * 1.83 + layer * .91)) * (2.4 + seeded(index + layer, 710) * 3.8);
      const valley = Math.exp(-Math.pow(x / 6.5, 2)) * (5.2 + layer * .18);
      shape.lineTo(x, broad + sharp - valley - 1.4);
    }
    shape.lineTo(width / 2, -5);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [layer]);
  const shade = new THREE.Color(accent).multiplyScalar(.09 + layer * .012);
  return (
    <mesh geometry={geometry} position={[3, -1.5 - layer * .08, depth]}>
      <meshStandardMaterial color={shade} emissive={shade} emissiveIntensity={.12} roughness={1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FogSanctuary({ settings, accent }) {
  const world = useRef();
  const density = Math.min(12, settings.density ?? 10);
  useFrame((state) => {
    if (!world.current) return;
    world.current.rotation.y = Math.sin(state.clock.elapsedTime * .045) * .008;
    world.current.position.z = Math.sin(state.clock.elapsedTime * .07) * .45;
  });
  return (
    <group ref={world}>
      {range(9).map((layer) => <Ridge key={layer} layer={layer} depth={-8 - layer * 6.2} accent={accent} />)}

      <mesh position={[3, -3.05, -29]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 64]} />
        <meshPhysicalMaterial color="#7faeb0" emissive="#5c9a9d" emissiveIntensity={.32} metalness={.45} roughness={.16} transparent opacity={.34} />
      </mesh>

      {range(density).map((layer) => <FogSheet key={layer} position={[3, -.5 + layer * .38, -4 - layer * 5]} scale={[42 + layer * 2.5, 8 + layer * .35, 1]} opacity={.18 + (layer % 3) * .045} offset={layer * 3.17} speed={(settings.speed ?? 1) * (.65 + layer * .035)} />)}

      {range(18).map((index) => {
        const side = index % 2 ? 1 : -1;
        const height = 2.8 + seeded(index, 721) * 6;
        return <group key={index} position={[3 + side * (5.5 + seeded(index, 722) * 10), -2.6 + height / 2, -5 - seeded(index, 723) * 46]}><mesh><cylinderGeometry args={[.035, .13, height, 5]} /><meshStandardMaterial color="#07100e" roughness={1} /></mesh><mesh position={[0, height * .32, 0]}><coneGeometry args={[.65 + height * .08, height * .62, 7]} /><meshStandardMaterial color="#0a1714" roughness={1} /></mesh></group>;
      })}

      <group position={[3, 1.1, -50]}>
        <mesh><boxGeometry args={[.28, 8.5, .28]} /><meshBasicMaterial color="#dff9ef" /></mesh>
        <mesh position={[0, 2.8, 0]}><torusGeometry args={[2.3, .055, 8, 80, Math.PI]} /><meshBasicMaterial color="#caeee3" blending={THREE.AdditiveBlending} /></mesh>
        <pointLight color="#caffed" intensity={52} distance={48} />
      </group>

      {range(4).map((index) => <mesh key={`ray${index}`} position={[-5 + index * 6.5, 7, -16 - index * 8]} rotation={[0, 0, -.18 + index * .08]} renderOrder={3}><planeGeometry args={[2.2, 28]} /><meshBasicMaterial color="#d8f5e9" transparent opacity={.025 + index * .008} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} /></mesh>)}

      <Dust count={220 + density * 18} color="#d9f2ea" scale={[38, 14, 70]} size={1.35} speed={.09} />
    </group>
  );
}

function BlackHoleWorld({ settings, accent }) {
  const group = useRef();
  const rings = settings.rings ?? 22;
  useFrame((_, delta) => { if (group.current) { group.current.rotation.z -= delta * .12 * (settings.speed ?? 1); group.current.rotation.x = -.42 + Math.sin(performance.now() * .00015) * .05; } });
  return (
    <group ref={group} position={[3.5, 2, -8]} rotation={[-.42, 0, 0]}>
      {range(Math.min(38, rings)).map((index) => <mesh key={index} scale={[1, .42 + index * .014, 1]} rotation={[Math.PI / 2, 0, index * .38]}><torusGeometry args={[2.5 + index * .19, .018 + (index % 4) * .008, 6, 150]} /><meshBasicMaterial color={index % 3 ? accent : "#ffbd72"} transparent opacity={.2 + (index % 5) * .05} blending={THREE.AdditiveBlending} /></mesh>)}
      <mesh><sphereGeometry args={[2.25, 64, 64]} /><meshBasicMaterial color="#000000" /></mesh>
      <pointLight color={accent} intensity={45} distance={35} />
      <Dust count={Math.max(240, (settings.stars ?? settings.particles ?? 90) * 5)} color={accent} scale={[16, 7, 16]} size={1.5} speed={.55} />
    </group>
  );
}

function Solar({ settings, accent }) {
  const star = useRef();
  useFrame((state, delta) => { if (star.current) { star.current.rotation.y += delta * .12 * (settings.speed ?? 1); star.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.3) * .018); } });
  return <group position={[3, 1.8, -10]}><mesh ref={star}><icosahedronGeometry args={[4.2, 7]} /><meshStandardMaterial color="#ff6d16" emissive={accent} emissiveIntensity={3.2} roughness={.7} /></mesh><pointLight color={accent} intensity={120} distance={70} /><mesh rotation={[1.1, .2, .4]}><torusGeometry args={[6.2, .07, 8, 180]} /><meshBasicMaterial color="#ffd074" transparent opacity={.7} blending={THREE.AdditiveBlending} /></mesh>{range(Math.min(16, Math.round((settings.energy ?? 100) / 8))).map((i) => <mesh key={i} rotation={[seeded(i, 51) * 3, seeded(i, 52) * 3, seeded(i, 53) * 3]}><torusGeometry args={[4.4 + seeded(i, 54) * 1.8, .025, 5, 90, Math.PI * (.4 + seeded(i, 55))]} /><meshBasicMaterial color="#fff0a4" transparent opacity={.55} blending={THREE.AdditiveBlending} /></mesh>)}<Dust count={280} color="#ffb14c" scale={[22, 18, 22]} speed={.45} /></group>;
}

function Ocean({ settings, accent, organic = false }) {
  const mesh = useRef();
  const segments = organic ? 55 : Math.min(100, Math.max(36, Math.round((settings.vertices ?? 800) / 10)));
  const lineOpacity = organic ? .18 : Math.min(.48, .12 + (settings.lines ?? 60) * .004);
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime * (settings.speed ?? 1);
    const positions = mesh.current.geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      positions.setZ(index, Math.sin(x * .65 + time) * .28 + Math.cos(y * .35 - time * .7) * .42);
    }
    positions.needsUpdate = true;
  });
  return <group position={[2, -2.2, -16]} rotation={[-Math.PI / 2.65, 0, 0]}><mesh ref={mesh}><planeGeometry args={[34, 48, segments, segments]} /><meshBasicMaterial color={accent} wireframe transparent opacity={lineOpacity} blending={THREE.AdditiveBlending} /></mesh>{organic && range(7).map((index) => <Float key={index} speed={.7 + index * .08} floatIntensity={1.5}><mesh position={[(seeded(index, 61) - .5) * 20, (seeded(index, 62) - .5) * 28, 1 + seeded(index, 63) * 3]}><sphereGeometry args={[.25 + seeded(index, 64) * .75, 24, 16]} /><meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={2} transparent opacity={.65} roughness={.2} /></mesh></Float>)}<Dust count={Math.max(180, (settings.density ?? 60) * 5)} color={accent} scale={[35, 50, 8]} size={1.5} speed={.25} /></group>;
}

function Network({ settings, accent, organic = false, magnetic = false }) {
  const group = useRef();
  const count = Math.min(72, settings.nodes ?? settings.particles ?? 52);
  const nodes = useMemo(() => range(count).map((index) => new THREE.Vector3((seeded(index, 71) - .5) * 24, (seeded(index, 72) - .5) * 13 + 2, -seeded(index, 73) * 34)), [count]);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * .025 * (settings.speed ?? 1); group.current.position.y = Math.sin(state.clock.elapsedTime * .25) * .2; } });
  const lines = nodes.flatMap((node, index) => index > 0 && index % 3 !== 0 ? [[node, nodes[Math.floor(index * .62)]]] : []);
  return <group ref={group}>{magnetic && range(12).map((i) => <mesh key={`ring${i}`} position={[0, 1.5, -10]} rotation={[Math.PI / 2, i * .18, 0]} scale={[1, .45 + i * .04, 1]}><torusGeometry args={[4 + i * .35, .018, 5, 120]} /><meshBasicMaterial color={accent} transparent opacity={.32} blending={THREE.AdditiveBlending} /></mesh>)}{lines.map(([a, b], index) => <Line key={index} points={[a, b]} color={accent} transparent opacity={.16 + (index % 4) * .06} lineWidth={.45} />)}{nodes.map((node, index) => <Float key={index} speed={.4 + seeded(index, 74)} floatIntensity={organic ? .8 : .25}><mesh position={node} scale={organic ? [.14, .3 + seeded(index, 75), .14] : [.11, .11, .11]}><sphereGeometry args={[1, 10, 10]} /><meshBasicMaterial color={index % 7 === 0 ? "#ffffff" : accent} /></mesh></Float>)}<Dust count={160} color={accent} scale={[28, 16, 45]} speed={.15} /></group>;
}

function GlassWorld({ settings, accent, bells = false }) {
  const group = useRef();
  const count = Math.min(22, settings.plates ?? settings.drops ?? settings.membranes ?? settings.bells ?? 14);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * .045 * (settings.speed ?? 1); group.current.children.forEach((child, index) => { child.scale.y = 1 + Math.sin(state.clock.elapsedTime * (1 + index * .03) + index) * .08; }); } });
  return <group ref={group} position={[3, 1.5, -9]}>{range(count).map((index) => <Float key={index} speed={.5 + seeded(index, 91)} floatIntensity={.75}><mesh position={[(seeded(index, 92) - .5) * 14, (seeded(index, 93) - .5) * 9, (seeded(index, 94) - .5) * 10]} rotation={[seeded(index, 95) * 2, seeded(index, 96) * 2, 0]}>{bells ? <sphereGeometry args={[.55 + seeded(index, 97), 28, 20, 0, Math.PI * 2, 0, Math.PI * .7]} /> : <torusGeometry args={[.55 + seeded(index, 97) * 1.2, .08, 12, 60]} />}<meshPhysicalMaterial color={index % 3 ? accent : "#ff86da"} transmission={.72} thickness={1.1} roughness={.08} transparent opacity={.72} emissive={accent} emissiveIntensity={.45} side={THREE.DoubleSide} /></mesh></Float>)}<pointLight color={accent} intensity={55} distance={35} /><Dust count={130} color={accent} scale={[24, 16, 30]} /></group>;
}

function City({ settings, accent, library = false }) {
  const group = useRef();
  const count = library ? Math.min(64, (settings.shelves ?? 21) * 2) : Math.min(28, settings.towers ?? 20);
  useFrame((state, delta) => { if (group.current) { group.current.position.z = Math.sin(state.clock.elapsedTime * .12) * 1.2; group.current.rotation.y += delta * .008 * (settings.speed ?? 1); } });
  return <group ref={group} position={[3, -2.6, -13]}>{range(count).map((index) => {
    const side = index % 2 ? 1 : -1;
    const z = library ? -Math.floor(index / 2) * 2.3 : -seeded(index, 101) * 30;
    const x = library ? side * 7 : (seeded(index, 102) - .5) * 22;
    const height = library ? 5.8 : 2 + seeded(index, 103) * 12;
    return <group key={index} position={[x, height / 2, z]}><mesh><boxGeometry args={[library ? 1.6 : .8 + seeded(index, 104) * 2, height, library ? 1.8 : .8 + seeded(index, 105) * 2]} /><meshStandardMaterial color="#06080a" emissive={accent} emissiveIntensity={index % 6 === 0 ? .8 : .12} metalness={.65} roughness={.35} /></mesh><mesh scale={[1.03, 1.01, 1.03]}><boxGeometry args={[library ? 1.6 : .8 + seeded(index, 104) * 2, height, library ? 1.8 : .8 + seeded(index, 105) * 2]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.22} /></mesh></group>;
  })}<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -16]}><planeGeometry args={[34, 70, 18, 35]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.12} /></mesh><Dust count={library ? Math.max(120, (settings.books ?? 40) * 4) : 180} color={accent} scale={[30, 18, 65]} speed={.12} /></group>;
}

function Orrery({ settings, accent, time = false }) {
  const group = useRef();
  const rings = Math.min(18, settings.rings ?? 12);
  useFrame((_, delta) => { if (group.current) { group.current.rotation.y += delta * .08 * (settings.speed ?? 1); group.current.rotation.z += delta * .018; group.current.children.forEach((child, index) => { child.rotation.x += delta * (.025 + index * .003); child.rotation.z -= delta * (.018 + index * .002); }); } });
  const planetCount = settings.planets ?? Math.ceil(rings / 2);
  const memories = settings.memories ?? 12;
  return <group ref={group} position={[3, 2, -9]}>{range(rings).map((index) => <group key={index} rotation={[seeded(index, 111) * Math.PI, seeded(index, 112) * Math.PI, seeded(index, 113) * Math.PI]}><mesh><torusGeometry args={[2 + index * .42, .025 + index % 3 * .012, 8, 130]} /><meshStandardMaterial color={index % 4 ? accent : "#fff1b6"} emissive={accent} emissiveIntensity={1.2} metalness={.8} roughness={.25} /></mesh>{index < planetCount && <mesh position={[2 + index * .42, 0, 0]}><sphereGeometry args={[.12 + index * .018, 18, 18]} /><meshBasicMaterial color="#fff4d4" /></mesh>}</group>)}<mesh><sphereGeometry args={[.55, 32, 32]} /><meshStandardMaterial color="#37200d" emissive={accent} emissiveIntensity={2.8} /></mesh>{time && range(Math.min(24, memories)).map((index) => <Line key={index} points={[[0, 0, 0], [(seeded(index, 114) - .5) * 15, (seeded(index, 115) - .5) * 12, (seeded(index, 116) - .5) * 10]]} color={accent} transparent opacity={.28} lineWidth={.7} />)}<pointLight color={accent} intensity={45} distance={40} /><Dust count={130} color={accent} scale={[28, 22, 30]} /></group>;
}

function Blueprint({ settings, accent }) {
  const group = useRef();
  const count = Math.min(30, settings.blocks ?? settings.components ?? 24);
  const measurements = Math.min(28, settings.measurements ?? 18);
  useFrame((state) => { if (group.current) group.current.children.forEach((child, index) => { const phase = (state.clock.elapsedTime * (settings.speed ?? 1) * .35 + index * .12) % 1; child.scale.setScalar(.15 + THREE.MathUtils.smoothstep(phase, 0, .55) * .85); }); });
  return <group ref={group} position={[3, 0, -10]}>{range(count).map((index) => <mesh key={index} position={[(seeded(index, 121) - .5) * 18, (seeded(index, 122) - .35) * 11, (seeded(index, 123) - .5) * 15]} rotation={[seeded(index, 124), seeded(index, 125), seeded(index, 126)]}><boxGeometry args={[.6 + seeded(index, 127) * 3, .6 + seeded(index, 128) * 3, .6 + seeded(index, 129) * 3]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.72} blending={THREE.AdditiveBlending} /></mesh>)}{range(measurements).map((i) => <Line key={`measure${i}`} points={[[-11 + i, -5, -4], [-11 + i, 7, -4]]} color={accent} transparent opacity={.08} lineWidth={.4} />)}<Dust count={90} color={accent} scale={[26, 16, 28]} /></group>;
}

function GoldenTrees({ count }) {
  const trunks = useRef();
  const crowns = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const palette = useMemo(() => ["#d7a43c", "#c96928", "#8f301f", "#efbd52"].map(color), []);
  useLayoutEffect(() => {
    if (!trunks.current || !crowns.current) return;
    range(count).forEach((index) => {
      const depth = seeded(index, 301);
      const side = index % 2 ? 1 : -1;
      const x = side * (5.8 + seeded(index, 302) * 10.5) + (depth > .72 ? (seeded(index, 303) - .5) * 8 : 0);
      const z = -4 - depth * 59;
      const height = 10 + seeded(index, 304) * 13;
      const width = .38 + seeded(index, 305) * .62;
      dummy.position.set(x, -2.7 + height / 2, z);
      dummy.rotation.set(0, seeded(index, 306) * .35, (seeded(index, 307) - .5) * .045);
      dummy.scale.set(width, height, width);
      dummy.updateMatrix();
      trunks.current.setMatrixAt(index, dummy.matrix);
      trunks.current.setColorAt(index, new THREE.Color(depth > .72 ? "#3a2517" : "#24130b"));
      range(4).forEach((cluster) => {
        const crownIndex = index * 4 + cluster;
        dummy.position.set(x + (seeded(crownIndex, 308) - .5) * (5 + width * 3), -2 + height * (.72 + seeded(crownIndex, 309) * .27), z + (seeded(crownIndex, 310) - .5) * 5);
        dummy.rotation.set(seeded(crownIndex, 311), seeded(crownIndex, 312), seeded(crownIndex, 313));
        dummy.scale.set(2.5 + seeded(crownIndex, 314) * 3.8, 1.3 + seeded(crownIndex, 315) * 2.4, 2.2 + seeded(crownIndex, 316) * 3.2);
        dummy.updateMatrix();
        crowns.current.setMatrixAt(crownIndex, dummy.matrix);
        crowns.current.setColorAt(crownIndex, palette[(index + cluster) % palette.length]);
      });
    });
    trunks.current.instanceMatrix.needsUpdate = true;
    crowns.current.instanceMatrix.needsUpdate = true;
    trunks.current.instanceColor.needsUpdate = true;
    crowns.current.instanceColor.needsUpdate = true;
  }, [count, dummy, palette]);
  return <group><instancedMesh ref={trunks} args={[undefined, undefined, count]}><cylinderGeometry args={[.52, 1, 1, 7]} /><meshStandardMaterial roughness={1} vertexColors /></instancedMesh><instancedMesh ref={crowns} args={[undefined, undefined, count * 4]}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial roughness={1} vertexColors transparent opacity={.7} /></instancedMesh></group>;
}

function SpiritLights({ count, accent, settings }) {
  const cores = useRef();
  const halos = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lights = useMemo(() => range(count).map((index) => ({ x: (seeded(index, 321) - .42) * 29, y: -.4 + seeded(index, 322) * 11, z: 5 - seeded(index, 323) * 56, phase: seeded(index, 324) * Math.PI * 2, drift: .18 + seeded(index, 325) * .42, size: .045 + seeded(index, 326) * .105 })), [count]);
  useFrame((state) => {
    if (!cores.current || !halos.current) return;
    const time = state.clock.elapsedTime * (settings.speed ?? 1);
    lights.forEach((light, index) => {
      const x = light.x + Math.sin(time * light.drift + light.phase) * (1.1 + index % 3);
      const y = light.y + Math.cos(time * light.drift * 1.3 + light.phase) * .72;
      const z = light.z + Math.sin(time * light.drift * .5 + light.phase) * 1.15;
      const breathe = .72 + Math.sin(time * 1.15 + light.phase) * .28;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(light.size * breathe);
      dummy.updateMatrix();
      cores.current.setMatrixAt(index, dummy.matrix);
      dummy.scale.setScalar(light.size * (4.2 + breathe * 2.4));
      dummy.updateMatrix();
      halos.current.setMatrixAt(index, dummy.matrix);
    });
    cores.current.instanceMatrix.needsUpdate = true;
    halos.current.instanceMatrix.needsUpdate = true;
  });
  return <group><instancedMesh ref={halos} args={[undefined, undefined, count]} frustumCulled={false}><sphereGeometry args={[1, 10, 10]} /><meshBasicMaterial color={accent} transparent opacity={.12} blending={THREE.AdditiveBlending} depthWrite={false} /></instancedMesh><instancedMesh ref={cores} args={[undefined, undefined, count]} frustumCulled={false}><sphereGeometry args={[1, 10, 10]} /><meshBasicMaterial color="#fff1b0" toneMapped={false} /></instancedMesh></group>;
}

function AmberMist() {
  const mist = useRef();
  useFrame((state) => { if (mist.current) mist.current.children.forEach((bank, index) => { bank.position.x = Math.sin(state.clock.elapsedTime * (.035 + index * .008) + index) * 5; }); });
  return <group ref={mist}>{range(7).map((index) => <mesh key={index} position={[(index - 3) * 4, -1 + index % 3, -8 - index * 7]} scale={[11 + index * 1.8, 1.6 + index * .3, 4]}><sphereGeometry args={[1, 20, 10]} /><meshBasicMaterial color={index % 2 ? "#c99b62" : "#ead1a0"} transparent opacity={.035 + index * .006} depthWrite={false} /></mesh>)}</group>;
}

function Forest({ settings, accent }) {
  const treeCount = Math.max(12, Math.min(32, settings.trees ?? 28));
  const lightCount = Math.max(30, Math.min(100, settings.fireflies ?? 84));
  const path = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(3, -2.7, 10), new THREE.Vector3(6, -2.75, -2), new THREE.Vector3(1.5, -2.72, -14), new THREE.Vector3(6.5, -2.7, -31), new THREE.Vector3(2.5, -2.65, -58)]), []);
  return <group><GoldenTrees count={treeCount} /><mesh><tubeGeometry args={[path, 120, .15, 8, false]} /><meshBasicMaterial color="#eebf62" transparent opacity={.7} toneMapped={false} /></mesh><mesh><tubeGeometry args={[path, 120, .72, 8, false]} /><meshBasicMaterial color="#b46626" transparent opacity={.08} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh><AmberMist /><SpiritLights count={lightCount} accent={accent} settings={settings} /><mesh position={[7, 7, -22]}><coneGeometry args={[8, 24, 32, 1, true]} /><meshBasicMaterial color="#f4c979" transparent opacity={.025} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} /></mesh><pointLight color="#ffb84d" intensity={42} distance={42} position={[7, 8, -13]} /><pointLight color="#9f3520" intensity={18} distance={28} position={[-8, 3, -20]} /><Sparkles count={120} scale={[32, 14, 64]} color="#f4c979" size={.55} speed={.08} opacity={.2} /></group>;
}

function Collider({ settings, accent }) {
  const group = useRef();
  const count = Math.min(90, settings.sparks ?? settings.particles ?? 54);
  const rings = Math.min(14, settings.rings ?? 8);
  useFrame((_, delta) => { if (group.current) { group.current.rotation.y += delta * .1 * (settings.speed ?? 1); group.current.rotation.z -= delta * .035; } });
  return <group ref={group} position={[3, 2, -8]}>{range(rings).map((index) => <mesh key={index} rotation={[index * .35, index * .22, index * .4]}><torusGeometry args={[2.5 + index * .48, .03, 8, 150]} /><meshBasicMaterial color={index % 2 ? accent : "#ff4f9c"} transparent opacity={.42} blending={THREE.AdditiveBlending} /></mesh>)}<mesh rotation={[0, 0, Math.PI / 4]}><cylinderGeometry args={[.045, .045, 18, 8]} /><meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} /></mesh><mesh rotation={[0, 0, -Math.PI / 4]}><cylinderGeometry args={[.045, .045, 18, 8]} /><meshBasicMaterial color={accent} blending={THREE.AdditiveBlending} /></mesh><mesh><sphereGeometry args={[.55, 32, 32]} /><meshBasicMaterial color="#ffffff" /></mesh><pointLight color={accent} intensity={70} distance={40} /><Dust count={count * 6} color={accent} scale={[19, 16, 20]} size={1.8} speed={.75} /></group>;
}

function SakuraPetals({ count, breeze, accent, settings }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => range(count).map((index) => ({
    x: (seeded(index, 211) - .5) * 30,
    y: seeded(index, 212) * 20 - 4,
    z: 8 - seeded(index, 213) * 55,
    phase: seeded(index, 214) * Math.PI * 2,
    fall: .35 + seeded(index, 215) * .8,
    size: .65 + seeded(index, 216) * 1.3,
  })), [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const speed = settings.speed ?? 1;
    particles.forEach((petal, index) => {
      petal.y -= Math.min(delta, .05) * speed * petal.fall;
      petal.x += Math.sin(time * .45 * breeze + petal.phase) * delta * breeze * .22;
      if (petal.y < -4.2) {
        petal.y = 15 + seeded(index, Math.floor(time) + 217) * 5;
        petal.x = (seeded(index, Math.floor(time) + 218) - .5) * 30;
      }
      const tumble = time * speed * petal.fall + petal.phase;
      dummy.position.set(petal.x, petal.y, petal.z);
      dummy.rotation.set(tumble * .9, tumble * 1.35, tumble * .55);
      dummy.scale.set(petal.size * 1.15, petal.size * .24, petal.size * .72);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[.105, 6, 4]} />
      <meshPhysicalMaterial color={accent} emissive="#9f254f" emissiveIntensity={.35} roughness={.56} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function SakuraTree({ position, scale = 1, flip = 1 }) {
  const branchesRef = useRef();
  const blossomsRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tree = useMemo(() => {
    const branches = [];
    const tips = [];
    let branchId = flip < 0 ? 420 : 520;
    const grow = (start, direction, length, radius, depth) => {
      const end = start.clone().add(direction.clone().multiplyScalar(length));
      branches.push({ start, end, radius });
      if (depth === 0) { tips.push(end); return; }
      const children = depth > 2 ? 3 : 2;
      range(children).forEach((child) => {
        branchId += 1;
        const angle = seeded(branchId, 421 + child) * Math.PI * 2;
        const outward = new THREE.Vector3(Math.cos(angle) * (.58 + seeded(branchId, 422) * .36), .38 + seeded(branchId, 423) * .45, Math.sin(angle) * (.58 + seeded(branchId, 424) * .36));
        const nextDirection = direction.clone().multiplyScalar(.42).add(outward).normalize();
        grow(end, nextDirection, length * (.61 + seeded(branchId, 425) * .12), radius * .62, depth - 1);
      });
    };
    grow(new THREE.Vector3(), new THREE.Vector3(flip * .035, 1, 0).normalize(), 6.7, .55, 4);
    const blossoms = tips.flatMap((tip, tipIndex) => range(6).map((cluster) => ({
      position: tip.clone().add(new THREE.Vector3((seeded(tipIndex * 6 + cluster, 426) - .5) * 1.9, (seeded(tipIndex * 6 + cluster, 427) - .5) * 1.25, (seeded(tipIndex * 6 + cluster, 428) - .5) * 1.7)),
      size: .16 + seeded(tipIndex * 6 + cluster, 429) * .27,
      shade: (tipIndex + cluster) % 4,
    })));
    return { branches, blossoms };
  }, [flip]);

  useLayoutEffect(() => {
    if (!branchesRef.current || !blossomsRef.current) return;
    const up = new THREE.Vector3(0, 1, 0);
    tree.branches.forEach((branch, index) => {
      const direction = branch.end.clone().sub(branch.start);
      dummy.position.copy(branch.start).add(branch.end).multiplyScalar(.5);
      dummy.quaternion.setFromUnitVectors(up, direction.clone().normalize());
      dummy.scale.set(branch.radius, direction.length(), branch.radius);
      dummy.updateMatrix();
      branchesRef.current.setMatrixAt(index, dummy.matrix);
    });
    tree.blossoms.forEach((blossom, index) => {
      dummy.position.copy(blossom.position);
      dummy.quaternion.setFromEuler(new THREE.Euler(seeded(index, 430) * 2, seeded(index, 431) * 2, seeded(index, 432) * 2));
      dummy.scale.setScalar(blossom.size);
      dummy.updateMatrix();
      blossomsRef.current.setMatrixAt(index, dummy.matrix);
      blossomsRef.current.setColorAt(index, new THREE.Color(["#fff0f5", "#ffc5da", "#f59abd", "#ffdce8"][blossom.shade]));
    });
    branchesRef.current.instanceMatrix.needsUpdate = true;
    blossomsRef.current.instanceMatrix.needsUpdate = true;
    blossomsRef.current.instanceColor.needsUpdate = true;
  }, [dummy, tree]);

  return <group position={position} scale={scale}><instancedMesh ref={branchesRef} args={[undefined, undefined, tree.branches.length]}><cylinderGeometry args={[.62, 1, 1, 9]} /><meshStandardMaterial color="#241216" roughness={.96} /></instancedMesh><instancedMesh ref={blossomsRef} args={[undefined, undefined, tree.blossoms.length]}><sphereGeometry args={[1, 9, 7]} /><meshStandardMaterial vertexColors roughness={.86} emissive="#7a243f" emissiveIntensity={.12} /></instancedMesh></group>;
}

function ToriiGate() {
  const crown = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-5.3, 8.2, 0), new THREE.Vector3(-3.4, 8.55, 0), new THREE.Vector3(0, 8.35, 0), new THREE.Vector3(3.4, 8.55, 0), new THREE.Vector3(5.3, 8.2, 0)]), []);
  return (
    <group position={[5.4, -2.25, -18]}>
      {[-3.25, 3.25].map((x) => (
        <group key={x} position={[x, 3.8, 0]}>
          <mesh><cylinderGeometry args={[.3, .46, 8.2, 18]} /><meshStandardMaterial color="#7d1417" emissive="#8f1015" emissiveIntensity={.22} roughness={.3} metalness={.08} /></mesh>
          <mesh position={[0, -4.05, 0]}><cylinderGeometry args={[.7, .84, .32, 18]} /><meshStandardMaterial color="#180b0c" roughness={.75} /></mesh>
        </group>
      ))}
      <mesh position={[0, 7.7, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.26, .26, 8.8, 16]} /><meshStandardMaterial color="#8d181b" emissive="#a7181d" emissiveIntensity={.25} roughness={.28} /></mesh>
      <mesh><tubeGeometry args={[crown, 72, .25, 12, false]} /><meshStandardMaterial color="#3b0b0f" emissive="#89151a" emissiveIntensity={.2} roughness={.35} /></mesh>
      <mesh position={[0, 6.7, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.14, .14, 7.2, 14]} /><meshStandardMaterial color="#9c1a1d" emissive="#b7191d" emissiveIntensity={.18} /></mesh>
      <pointLight position={[0, 4, 2]} color="#ff564e" intensity={18} distance={17} />
    </group>
  );
}

function Lantern({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, .9, 0]}><boxGeometry args={[.18, 1.8, .18]} /><meshStandardMaterial color="#160e0b" /></mesh>
      <mesh position={[0, 1.8, 0]}><boxGeometry args={[.64, .82, .64]} /><meshStandardMaterial color="#ffcf83" emissive="#ff9d45" emissiveIntensity={3.4} transparent opacity={.88} /></mesh>
      <mesh position={[0, 2.27, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[.62, .3, 4]} /><meshStandardMaterial color="#1b0e0d" /></mesh>
      <pointLight position={[0, 1.8, 0]} color="#ffb562" intensity={8} distance={8} />
    </group>
  );
}

const sakuraSkyVertex = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const sakuraSkyFragment = `
  varying vec2 vUv;
  float ridge(float x, float detail, float shift){ return .22 + sin(x*5.2+shift)*.035 + sin(x*11.7-shift)*.018 + detail; }
  void main(){
    vec3 bottom=vec3(.47,.24,.30); vec3 top=vec3(.055,.045,.085);
    vec3 col=mix(bottom,top,smoothstep(.05,.92,vUv.y));
    float glow=max(0.0,1.0-distance(vUv,vec2(.73,.68))*2.4);
    col+=vec3(.34,.18,.14)*glow*glow;
    float sun=1.0-smoothstep(.085,.092,distance(vUv,vec2(.73,.7)));
    col=mix(col,vec3(1.0,.78,.65),sun*.82);
    float farLine=ridge(vUv.x,.12,1.4); if(vUv.y<farLine) col=mix(vec3(.14,.10,.16),col,.08);
    float nearLine=ridge(vUv.x,.045,4.2); if(vUv.y<nearLine) col=vec3(.055,.045,.065);
    float haze=smoothstep(.1,.34,vUv.y)*(1.0-smoothstep(.34,.57,vUv.y));
    col=mix(col,vec3(.61,.38,.40),haze*.13);
    gl_FragColor=vec4(col,1.0);
  }
`;

function SakuraBackdrop() {
  return <mesh position={[3, 5, -52]}><planeGeometry args={[74, 38]} /><shaderMaterial vertexShader={sakuraSkyVertex} fragmentShader={sakuraSkyFragment} depthWrite={false} /></mesh>;
}

function SakuraWorld({ settings, accent }) {
  const count = Math.max(30, Math.min(150, settings.petals ?? 110));
  const breeze = settings.breeze ?? 1;
  return (
    <group>
      <SakuraBackdrop />
      <pointLight position={[7.2, 7.5, -28]} color="#ffd9c7" intensity={34} distance={48} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -2.85, -20]}>
        <planeGeometry args={[36, 70]} />
        <MeshReflectorMaterial blur={[340, 120]} resolution={512} mixBlur={1.4} mixStrength={34} roughness={.7} depthScale={1.05} color="#09070b" metalness={.42} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -.02]} position={[5.3, -2.78, -16]}><planeGeometry args={[3.4, 42, 2, 14]} /><meshStandardMaterial color="#24171a" roughness={.96} /></mesh>
      <ToriiGate />
      <SakuraTree position={[-9.5, -2.8, -13]} scale={1.34} flip={-1} />
      <SakuraTree position={[13.5, -2.9, -22]} scale={1.22} />
      <SakuraTree position={[11.5, -2.7, -5]} scale={.76} />
      <Lantern position={[1.2, -2.7, -8]} />
      <Lantern position={[8.8, -2.7, -10.5]} />
      <Lantern position={[2.8, -2.7, -20]} />
      <Lantern position={[8, -2.7, -23]} />
      {range(5).map((index) => <mesh key={`mist-${index}`} position={[-9 + index * 6, -1 + index % 2, -12 - index * 8]} scale={[9 + index * 2, 1.1 + index * .2, 3]}><sphereGeometry args={[1, 20, 10]} /><meshBasicMaterial color="#e9c8cf" transparent opacity={.025 + index * .006} depthWrite={false} /></mesh>)}
      <SakuraPetals count={count} breeze={breeze} accent={accent} settings={settings} />
      <Sparkles count={75} scale={[30, 14, 45]} color="#ffd5e6" size={.6} speed={.06} opacity={.2} />
    </group>
  );
}

function usePaperWingGeometry() {
  return useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([
      0, 0, 0, 3.5, 0, .25, .75, 0, 2.35,
      0, 0, 0, .75, 0, 2.35, .14, 0, .82,
    ], 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function OrigamiCrane({ position, scale, phase, accent }) {
  const crane = useRef();
  const leftWing = useRef();
  const rightWing = useRef();
  const wingGeometry = usePaperWingGeometry();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const flap = Math.sin(time * .72 + phase) * .24;
    if (leftWing.current) leftWing.current.rotation.z = .08 + flap;
    if (rightWing.current) rightWing.current.rotation.z = -.08 - flap;
    if (crane.current) {
      crane.current.position.y = position[1] + Math.sin(time * .38 + phase) * .42;
      crane.current.rotation.z = Math.sin(time * .24 + phase) * .06;
      crane.current.rotation.y = -.18 + Math.sin(time * .18 + phase) * .12;
    }
  });

  return (
    <group ref={crane} position={position} scale={scale}>
      <mesh scale={[.56, .34, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
        <octahedronGeometry args={[.72, 0]} />
        <meshStandardMaterial color="#f4ecdf" roughness={.84} flatShading />
      </mesh>
      <mesh ref={leftWing} geometry={wingGeometry} rotation={[0, -.2, .08]}>
        <meshStandardMaterial color="#fff8ed" roughness={.88} flatShading side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightWing} geometry={wingGeometry} scale={[-1, 1, 1]} rotation={[0, .2, -.08]}>
        <meshStandardMaterial color="#e2d3c0" roughness={.9} flatShading side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, .18, 1.45]} rotation={[Math.PI / 3.2, 0, 0]}>
        <coneGeometry args={[.25, 2.25, 3]} />
        <meshStandardMaterial color="#eee2d3" roughness={.9} flatShading />
      </mesh>
      <mesh position={[0, .7, 2.3]} scale={[.42, .28, .64]}>
        <octahedronGeometry args={[.48, 0]} />
        <meshStandardMaterial color="#fff8ed" roughness={.85} flatShading />
      </mesh>
      <mesh position={[0, .68, 2.86]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[.16, .72, 3]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.12} roughness={.8} />
      </mesh>
      <mesh position={[0, .08, -1.65]} rotation={[-Math.PI / 2.4, 0, 0]}>
        <coneGeometry args={[.3, 2.5, 3]} />
        <meshStandardMaterial color="#d9c7b3" roughness={.94} flatShading />
      </mesh>
    </group>
  );
}

function PaperCurrent({ flow, accent }) {
  const sheet = useRef();
  useFrame((state) => {
    if (!sheet.current) return;
    const time = state.clock.elapsedTime * flow;
    const positions = sheet.current.geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      positions.setZ(index, Math.sin(y * .34 + time) * .26 + Math.cos(x * .7 - time * .55) * .11);
    }
    positions.needsUpdate = true;
    sheet.current.geometry.computeVertexNormals();
  });
  return (
    <group position={[3, -2.35, -15]} rotation={[-Math.PI / 2.55, 0, 0]}>
      <mesh ref={sheet}>
        <planeGeometry args={[20, 52, 18, 42]} />
        <meshStandardMaterial color="#ded1bf" emissive={accent} emissiveIntensity={.025} roughness={.96} side={THREE.DoubleSide} flatShading />
      </mesh>
      <mesh position={[0, 0, .025]}>
        <planeGeometry args={[20.1, 52.1, 9, 22]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={.07} />
      </mesh>
    </group>
  );
}

function OrigamiFlow({ settings, accent }) {
  const count = Math.max(6, Math.min(18, settings.facets ?? 14));
  const flow = settings.flow ?? .8;
  return (
    <group>
      <PaperCurrent flow={flow * (settings.speed ?? 1)} accent={accent} />
      {range(9).map((index) => (
        <mesh key={index} position={[-10 + index * 3.5, -.8 + seeded(index, 251) * .9, -28 - seeded(index, 252) * 15]} scale={[2.2 + seeded(index, 253) * 2.7, 3.1 + seeded(index, 254) * 4.8, 2.4]} rotation={[0, seeded(index, 255) * .6, 0]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color={index % 3 ? "#b9aa96" : "#e8dccb"} roughness={1} flatShading />
        </mesh>
      ))}
      {range(count).map((index) => (
        <OrigamiCrane
          key={index}
          position={[(seeded(index, 256) - .42) * 22, 1 + seeded(index, 257) * 9, -5 - seeded(index, 258) * 28]}
          scale={.36 + seeded(index, 259) * .46}
          phase={seeded(index, 260) * Math.PI * 2}
          accent={index % 5 === 0 ? accent : "#d6baa0"}
        />
      ))}
      <mesh position={[7.5, 7.2, -39]}><circleGeometry args={[3.7, 64]} /><meshBasicMaterial color="#f4dfbf" transparent opacity={.76} /></mesh>
      <pointLight position={[6, 7, -18]} color="#ffe0b7" intensity={32} distance={45} />
      <Sparkles count={70} scale={[28, 14, 45]} color={accent} size={.7} speed={.08} opacity={.28} />
    </group>
  );
}

function CircuitSignal({ points, phase, speed, accent }) {
  const signal = useRef();
  const halo = useRef();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", .02), [points]);
  const point = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const progress = (state.clock.elapsedTime * speed + phase) % 1;
    curve.getPointAt(progress, point);
    if (signal.current) signal.current.position.copy(point);
    if (halo.current) {
      halo.current.position.copy(point);
      const pulse = 1 + Math.sin(progress * Math.PI) * 1.8;
      halo.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={signal}>
        <sphereGeometry args={[.12, 12, 12]} />
        <meshBasicMaterial color="#effff9" toneMapped={false} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[.19, 10, 10]} />
        <meshBasicMaterial color={accent} transparent opacity={.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function CircuitProcessor({ accent }) {
  const crown = useRef();
  useFrame((state, delta) => {
    if (!crown.current) return;
    crown.current.rotation.y += delta * .12;
    crown.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * .7) * .14;
  });
  return (
    <group position={[4, -1.55, -13]}>
      <mesh position={[0, .4, 0]}>
        <boxGeometry args={[5.2, .8, 5.2]} />
        <meshStandardMaterial color="#03100c" emissive={accent} emissiveIntensity={.16} metalness={.86} roughness={.22} />
      </mesh>
      <mesh position={[0, .85, 0]}>
        <boxGeometry args={[3.6, .38, 3.6]} />
        <meshStandardMaterial color="#071d16" emissive={accent} emissiveIntensity={.52} metalness={.72} roughness={.18} />
      </mesh>
      <mesh position={[0, 1.07, 0]}>
        <boxGeometry args={[2.65, .12, 2.65]} />
        <meshBasicMaterial color="#baffdf" transparent opacity={.9} toneMapped={false} />
      </mesh>
      <group ref={crown} position={[0, 1.2, 0]}>
        {[1.9, 2.5, 3.1].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2 + index * .18, index * .5, 0]}>
            <torusGeometry args={[radius, .025, 6, 100]} />
            <meshBasicMaterial color={index === 1 ? "#9effdf" : accent} transparent opacity={.58 - index * .1} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
      {range(22).map((index) => {
        const side = index % 4;
        const offset = -2.3 + (index % 6) * .92;
        const position = side === 0 ? [offset, .35, -3.1] : side === 1 ? [offset, .35, 3.1] : side === 2 ? [-3.1, .35, offset] : [3.1, .35, offset];
        return <mesh key={index} position={position}><boxGeometry args={[side < 2 ? .42 : 1.15, .12, side < 2 ? 1.15 : .42]} /><meshBasicMaterial color={accent} transparent opacity={.72} /></mesh>;
      })}
      <pointLight position={[0, 2.2, 0]} color={accent} intensity={42} distance={24} />
    </group>
  );
}

function CircuitWorld({ settings, accent }) {
  const branchCount = Math.max(12, Math.min(32, settings.branches ?? 26));
  const pulseCount = Math.max(6, Math.min(30, settings.pulses ?? 24));
  const paths = useMemo(() => range(branchCount).map((index) => {
    const quadrant = index % 4;
    const reach = 8 + seeded(index, 271) * 12;
    const spread = -12 + seeded(index, 272) * 24;
    const endX = quadrant < 2 ? 4 + (quadrant === 0 ? -reach : reach) : 4 + spread;
    const endZ = quadrant >= 2 ? -13 + (quadrant === 2 ? -reach : reach) : -13 + spread;
    const y = -1.72;
    const elbowFirst = index % 2 === 0;
    return [
      new THREE.Vector3(4, y, -13),
      new THREE.Vector3(elbowFirst ? endX : 4, y, elbowFirst ? -13 : endZ),
      new THREE.Vector3(endX, y, endZ),
    ];
  }), [branchCount]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -1.86, -18]}>
        <planeGeometry args={[42, 65]} />
        <MeshReflectorMaterial blur={[220, 70]} resolution={512} mixBlur={1.1} mixStrength={20} roughness={.7} depthScale={.72} color="#020a07" metalness={.76} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -1.8, -18]}>
        <planeGeometry args={[42, 65, 28, 40]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={.035} />
      </mesh>
      {paths.map((points, index) => (
        <Line key={index} points={points} color={index % 5 === 0 ? "#c9ffec" : accent} transparent opacity={.2 + (index % 4) * .08} lineWidth={index % 5 === 0 ? 1.4 : .8} />
      ))}
      {paths.map((points, index) => {
        const end = points[2];
        const height = .35 + seeded(index, 273) * 3.8;
        return (
          <group key={`tower-${index}`} position={[end.x, -1.72 + height / 2, end.z]}>
            <mesh><boxGeometry args={[.5 + seeded(index, 274) * .65, height, .5 + seeded(index, 275) * .65]} /><meshStandardMaterial color="#03110c" emissive={accent} emissiveIntensity={index % 4 === 0 ? .7 : .17} metalness={.82} roughness={.28} /></mesh>
            <mesh scale={[1.04, 1.01, 1.04]}><boxGeometry args={[.5 + seeded(index, 274) * .65, height, .5 + seeded(index, 275) * .65]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.28} /></mesh>
          </group>
        );
      })}
      {range(pulseCount).map((index) => (
        <CircuitSignal key={index} points={paths[index % paths.length]} phase={seeded(index, 276)} speed={(settings.speed ?? 1) * (.075 + seeded(index, 277) * .09)} accent={accent} />
      ))}
      <CircuitProcessor accent={accent} />
      <Sparkles count={95} scale={[38, 10, 58]} color={accent} size={.7} speed={.12} opacity={.26} />
    </group>
  );
}

export function World({ type, settings, accent, actionActive = false }) {
  switch (type) {
    case "endless-light-tunnel": return <Tunnel settings={settings} accent={accent} architectural />;
    case "starry-night": return <StarWorld settings={settings} accent={accent} actionActive={actionActive} />;
    case "rain-window": return <RainWorld settings={settings} accent={accent} />;
    case "fog-valley": return <FogSanctuary settings={settings} accent={accent} />;
    case "black-hole": return <BlackHoleWorld settings={settings} accent={accent} />;
    case "solar-flare": return <Solar settings={settings} accent={accent} />;
    case "bioluminescent-tide": return <Ocean settings={settings} accent={accent} organic />;
    case "infinite-data-ocean": return <Ocean settings={settings} accent={accent} />;
    case "magnetic-field": return <Network settings={settings} accent={accent} magnetic />;
    case "neural-network-universe": return <Network settings={settings} accent={accent} />;
    case "luminous-mycelium": return <Network settings={settings} accent={accent} organic />;
    case "glass-harmonics": return <GlassWorld settings={settings} accent={accent} />;
    case "dreaming-city": return <City settings={settings} accent={accent} />;
    case "infinite-library": return <City settings={settings} accent={accent} library />;
    case "mechanical-planetarium": return <Orrery settings={settings} accent={accent} />;
    case "time-machine": return <Orrery settings={settings} accent={accent} time />;
    case "blueprint-world": return <Blueprint settings={settings} accent={accent} />;
    case "forest-of-light": return <Forest settings={settings} accent={accent} />;
    case "particle-collider": return <Collider settings={settings} accent={accent} />;
    case "sakura-fall": return <SakuraWorld settings={settings} accent={accent} />;
    case "origami-fold": return <OrigamiFlow settings={settings} accent={accent} />;
    case "circuit-pulse": return <CircuitWorld settings={settings} accent={accent} />;
    default: return <Dust count={250} color={accent} scale={[30, 20, 60]} />;
  }
}
