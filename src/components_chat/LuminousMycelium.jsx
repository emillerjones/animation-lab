import GpuExperience from "./webgl/GpuExperience";
import "./LuminousMycelium.css";

export default function LuminousMycelium({ settings = {} }) {
  return <GpuExperience scene="luminous-mycelium" settings={settings} accent="#9dff82" background="#010803" eyebrow="12 — Living network" title={"The earth\nis speaking."} description="Signals race through a dimensional fungal intelligence, waking nodes and fruiting lights beneath the forest." cta="Send a signal" />;
}
