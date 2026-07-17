import useLiveFps from "../hooks/useLiveFps";
import "./AnimationReadout.css";

// A live telemetry readout for the top-right corner (vacated when the provider/title badge
// was removed). Every value passed in must be a real, currently-live number pulled from the
// scene — not a decorative placeholder — so it re-renders correctly as the motion-control
// sliders change. `progress` (0-1) is optional: only pass it for pieces that actually build
// up or load in over time; pieces with nothing to "assemble" should omit it.
export default function AnimationReadout({ eyebrow, value, progress, stats = [], className = "" }) {
  const fps = useLiveFps();

  return (
    <div className={`animation-readout ${className}`} aria-live="polite">
      <small>{eyebrow}</small>
      <strong>{value}</strong>
      {progress != null && <i style={{ "--progress": Math.max(0, Math.min(1, progress)) }} />}
      {stats.map((stat) => (
        <span key={stat.label}>{stat.value} {stat.label}</span>
      ))}
      <span>{fps ?? "—"} FPS</span>
    </div>
  );
}
