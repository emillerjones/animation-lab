import { Texture } from "three";

// Shared defaults for every WebGL experience. Keep new render pipelines wired
// to these values so image quality stays consistent across the library.
export const WEBGL_DPR = [1, 2];
export const WEBGL_DPR_MAX = WEBGL_DPR[1];
export const WEBGL_MSAA_SAMPLES = 8;

// Every texture created after this (canvas-based wood grain, tile floors, wall panels,
// etc.) picks this up automatically as its default anisotropy — three.js clamps it down
// to whatever the GPU actually supports when it uploads the texture, so it's safe to set
// generously here once instead of passing `anisotropy` at every texture call site. This
// is what keeps things like the floor tiles sharp instead of blurring into a smear as
// they recede toward the vanishing point.
Texture.DEFAULT_ANISOTROPY = 8;
