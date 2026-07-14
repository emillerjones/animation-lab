import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
  uniform vec2 center;
  uniform float strength;
  uniform float radius;

  void mainUv(inout vec2 uv) {
    vec2 delta = uv - center;
    float dist = length(delta);
    float pull = smoothstep(radius, 0.0, dist) * strength;
    uv -= delta * pull / max(dist, 0.06);
  }
`;

export class LensingEffectImpl extends Effect {
  constructor({ center, strength = 0.12, radius = 0.4 } = {}) {
    super("LensingEffect", fragmentShader, {
      uniforms: new Map([
        ["center", new Uniform(center ?? new Vector2(0.5, 0.5))],
        ["strength", new Uniform(strength)],
        ["radius", new Uniform(radius)],
      ]),
    });
  }
}
