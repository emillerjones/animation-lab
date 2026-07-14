import { seeded } from "../utils/procedural";
import "./SakuraFall.css";

const petals = Array.from({ length: 90 }, (_, index) => ({
  id: index,
  x: seeded(index, 181) * 100,
  delay: seeded(index, 182) * -10,
  duration: 6 + seeded(index, 183) * 6,
  size: 6 + seeded(index, 184) * 8,
  rotate: seeded(index, 185) * 360,
  sway: 20 + seeded(index, 186) * 40,
}));

export default function SakuraFall({ settings = {} }) {
  return (
    <section className="atmosphere sakura-fall">
      <div className="sakura-fall__branch" aria-hidden="true" />
      <div className="sakura-fall__petals" aria-hidden="true">
        {petals.slice(0, settings.petals ?? petals.length).map((petal) => (
          <i key={petal.id} style={{ "--x": `${petal.x}%`, "--delay": `${petal.delay}s`, "--duration": `${petal.duration}s`, "--size": `${petal.size}px`, "--rotate": `${petal.rotate}deg`, "--sway": `${petal.sway}px` }} />
        ))}
      </div>
      <div className="experiment-copy"><p>24 — Petal study</p><h1>Spring, letting<br />go slowly.</h1><span>Cherry-blossom petals spiral down through soft morning light, tumbling on the air.</span></div>
    </section>
  );
}
