import GpuExperience from "./webgl/GpuExperience";
import "./CircuitPulse.css";

export default function CircuitPulse({ settings = {} }) {
  return (
    <GpuExperience
      scene="circuit-pulse"
      settings={settings}
      accent="#55ffc0"
      background="#020806"
      eyebrow="29 — The city beneath the glass"
      title={"Every signal\nfinds a path."}
      description="A living processor routes light through a reflective circuit city, awakening towers and pathways one pulse at a time."
      cta="Send a signal"
    />
  );
}
