import { useEffect, useState } from "react";

export default function useLiveFps() {
  const [fps, setFps] = useState(null);

  useEffect(() => {
    let animationFrame = 0;
    let frames = 0;
    let sampleStart = performance.now();
    let smoothedFps = 60;

    const measure = (now) => {
      frames += 1;
      const elapsed = now - sampleStart;
      if (elapsed >= 500) {
        const measuredFps = (frames * 1000) / elapsed;
        smoothedFps = smoothedFps * 0.35 + measuredFps * 0.65;
        setFps(Math.round(smoothedFps));
        frames = 0;
        sampleStart = now;
      }
      animationFrame = requestAnimationFrame(measure);
    };

    animationFrame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return fps;
}
