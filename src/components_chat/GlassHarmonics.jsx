import GpuExperience from "./webgl/GpuExperience";
import "./GlassHarmonics.css";

export default function GlassHarmonics({ settings = {} }) {
  return <GpuExperience scene="glass-harmonics" settings={settings} accent="#83e9ff" background="#010608" eyebrow="13 — Resonant matter" title={"Sound becomes\nsomething you can see."} description="Transmissive glass membranes flex in a field of pressure, color, and suspended vibration." cta="Strike the first note" />;
}
