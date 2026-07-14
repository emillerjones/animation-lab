/**
 * Lazy WebGPU/TSL entry point for future high-density simulations and shaders.
 * Existing experiences remain on the proven WebGL pipeline until a scene opts in.
 */
export async function supportsWebGPU() {
  if (typeof navigator === "undefined" || !navigator.gpu) return false;

  const { default: WebGPU } = await import("three/addons/capabilities/WebGPU.js");
  return WebGPU.isAvailable();
}

export async function loadWebGPUToolkit() {
  if (!(await supportsWebGPU())) return null;

  const [three, tsl] = await Promise.all([
    import("three/webgpu"),
    import("three/tsl"),
  ]);

  return { three, tsl };
}

export async function createWebGPURenderer(options = {}) {
  const toolkit = await loadWebGPUToolkit();
  if (!toolkit) return null;

  const renderer = new toolkit.three.WebGPURenderer({
    antialias: true,
    powerPreference: "high-performance",
    ...options,
  });

  await renderer.init();
  return { renderer, tsl: toolkit.tsl, three: toolkit.three };
}
