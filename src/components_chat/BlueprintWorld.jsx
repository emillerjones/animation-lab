import GpuExperience from "./webgl/GpuExperience";
import "./BlueprintWorld.css";

export default function BlueprintWorld({ settings = {} }) {
  return <GpuExperience scene="blueprint-world" settings={settings} accent="#68cfff" background="#01070d" eyebrow="23 — Continuous construction" title={"The drawing\nbuilds itself."} description="Measured wireframes rotate, scale, and lock into a technical world that never stops drafting." cta="Begin the assembly" />;
}
