import { seeded } from "../utils/procedural";
import "./CircuitPulse.css";

const pulses = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  y: 5 + seeded(index, 171) * 90,
  delay: seeded(index, 172) * -6,
  duration: 2.5 + seeded(index, 173) * 3,
}));

export default function CircuitPulse({ settings = {} }) {
  return (
    <section className="atmosphere circuit-pulse">
      <div className="circuit-pulse__board" aria-hidden="true" />
      <div className="circuit-pulse__pulses" aria-hidden="true">
        {pulses.slice(0, settings.pulses ?? pulses.length).map((pulse) => (
          <i key={pulse.id} style={{ "--y": `${pulse.y}%`, "--delay": `${pulse.delay}s`, "--duration": `${pulse.duration}s` }} />
        ))}
      </div>
      <div className="circuit-pulse__core" aria-hidden="true" />
      <div className="experiment-copy"><p>23 — Data study</p><h1>Signal, always<br />moving somewhere.</h1><span>Glowing traces on a dark board carry pulses of signal outward, branch by branch.</span></div>
    </section>
  );
}
