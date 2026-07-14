import GpuExperience from "./webgl/GpuExperience";
import "./SolarFlare.css";

export default function SolarFlare({ settings = {} }) {
  return <GpuExperience scene="solar-flare" settings={settings} accent="#ff9b38" background="#080200" eyebrow="07 — Stellar weather" title={"A star\nbreaks open."} description="Incandescent loops erupt from a turbulent stellar surface and suspend themselves in orbit." cta="Approach the corona" />;
}
