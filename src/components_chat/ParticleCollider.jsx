import GpuExperience from "./webgl/GpuExperience";
import "./ParticleCollider.css";

export default function ParticleCollider({ settings = {} }) {
  return <GpuExperience scene="particle-collider" settings={settings} accent="#55e7ff" background="#010208" eyebrow="28 — Collision instrument" title={"Make force\nvisible."} description="Charged beams cross inside an orbital instrument and scatter a storm of high-energy particles." cta="Initiate collision" />;
}
