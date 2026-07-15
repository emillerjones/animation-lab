import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const range = (count) => Array.from({ length: count }, (_, index) => index);
export const color = (value) => new THREE.Color(value);

export function Dust({
  count = 180,
  scale = [30, 18, 80],
  color: tint = "#ffffff",
  size = 1.2,
  speed = 0.18,
  opacity = 0.75,
}) {
  return <Sparkles count={count} scale={scale} color={tint} size={size} speed={speed} opacity={opacity} noise={1.2} />;
}
