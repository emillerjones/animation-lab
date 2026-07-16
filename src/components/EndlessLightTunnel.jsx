import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import AnimationReadout from "./AnimationReadout";
import GpuExperience from "./webgl/GpuExperience";
import { Dust, range } from "./webgl/GpuPrimitives";
import "./EndlessLightTunnel.css";

function EndlessLightTunnelWorld({ settings, accent }) {
  const group = useRef();
  const frameMetric = settings.frames ?? settings.depth ?? Math.round((settings.density ?? 78) / 3);
  const count = Math.min(64, Math.max(18, Math.round(frameMetric * 1.15)));

  useFrame((_, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05) * (settings.speed ?? 1) * 1.15;
    group.current.children.forEach((child) => {
      if (!child.userData.tunnelFrame) return;
      child.position.z += step * 5;
      if (child.position.z > 12) child.position.z -= count * 5.5;
      child.rotation.z += step * 0.008;
    });
  });

  return (
    <group ref={group}>
      {range(count).map((index) => (
        <group key={index} userData={{ tunnelFrame: true }} position={[0, 2.8, 8 - index * 5.5]}>
          <mesh>
            <boxGeometry args={[15, 9, 0.08]} />
            <meshBasicMaterial color="#000000" transparent opacity={0} depthWrite={false} />
            <Edges color={accent} threshold={15} transparent opacity={0.34} />
          </mesh>
          <mesh position={[0, -4.48, 0]}>
            <boxGeometry args={[15, 0.025, 0.075]} />
            <meshBasicMaterial color={accent} transparent opacity={0.34} blending={THREE.AdditiveBlending} />
          </mesh>
          {[-5, 0, 5].map((x) => (
            <mesh key={x} position={[x, -4.46, -2.75]}>
              <boxGeometry args={[0.025, 0.025, 5.5]} />
              <meshBasicMaterial color={accent} transparent opacity={0.11} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
      ))}
      {[-7.2, 7.2].map((x) => (
        <mesh key={x} position={[x, -1.62, -48]}>
          <boxGeometry args={[0.035, 0.035, 125]} />
          <meshBasicMaterial color={accent} transparent opacity={0.72} />
        </mesh>
      ))}
      <Dust count={Math.max(120, (settings.dust ?? settings.particles ?? settings.density ?? 80) * 3)} color={accent} scale={[16, 11, count * 5]} size={1.1} speed={0.35} />
      <pointLight color={accent} intensity={36} distance={55} position={[0, 2, -18]} />
      {/* A fixed point far past where the frames recycle — the fog (density .028) crushes it
          to a soft glow rather than a visible object, reading as "something waiting at the
          end" of what's otherwise an unbroken loop. */}
      <mesh position={[0, 2.8, -110]}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshBasicMaterial color={accent} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <pointLight color={accent} intensity={16} distance={42} position={[0, 2.8, -96]} />
    </group>
  );
}

export default function EndlessLightTunnel({ settings = {} }) {
  const frameMetric = settings.frames ?? settings.depth ?? Math.round((settings.density ?? 78) / 3);
  const frameCount = Math.min(64, Math.max(18, Math.round(frameMetric * 1.15)));
  const dustCount = Math.round(Math.max(120, (settings.dust ?? settings.particles ?? settings.density ?? 80) * 3));
  return (
    <GpuExperience
      scene="endless-light-tunnel"
      World={EndlessLightTunnelWorld}
      settings={settings}
      accent="#ffd08a"
      background="#050301"
      eyebrow="09 — Architecture at velocity"
      title={"Forward is\nthe only direction."}
      description="A reflective corridor, endless frames, and rushing particles collapse into one continuous flight through light."
      cta="Begin the crossing"
      foreground={
        <AnimationReadout
          eyebrow="Live scene"
          value={`${frameCount} FRAMES`}
          stats={[{ value: dustCount.toLocaleString(), label: "Particles" }]}
        />
      }
    />
  );
}
