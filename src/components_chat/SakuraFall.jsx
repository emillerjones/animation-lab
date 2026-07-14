import GpuExperience from "./webgl/GpuExperience";
import { seeded } from "../utils/procedural";
import "./SakuraFall.css";

const foregroundPetals = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  x: seeded(index, 221) * 100,
  delay: seeded(index, 222) * -13,
  duration: 8 + seeded(index, 223) * 8,
  size: 9 + seeded(index, 224) * 15,
  drift: (seeded(index, 225) - 0.5) * 38,
  blur: seeded(index, 226) * 3.5,
}));

export default function SakuraFall({ settings = {} }) {
  const foreground = (
    <div className="sakura-world__foreground" aria-hidden="true">
      {foregroundPetals.slice(0, Math.ceil((settings.petals ?? 110) / 6)).map((petal) => (
        <i key={petal.id} style={{ "--x": `${petal.x}%`, "--delay": `${petal.delay}s`, "--duration": `${petal.duration / (settings.speed ?? 1)}s`, "--size": `${petal.size}px`, "--drift": `${petal.drift}vw`, "--blur": `${petal.blur}px` }} />
      ))}
    </div>
  );
  return <GpuExperience scene="sakura-fall" settings={settings} accent="#ff9fc9" background="#09070d" eyebrow="25 — Hanami after dark" title={"Spring falls\nthrough moonlight."} description="Beyond the torii, lanterns burn beside black water while an entire canopy of sakura lets go into the night." cta="Enter the garden" foreground={foreground} />;
}
