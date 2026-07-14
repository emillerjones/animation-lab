import GpuExperience from "./webgl/GpuExperience";
import "./BioluminescentTide.css";

export default function BioluminescentTide({ settings = {} }) {
  return <GpuExperience scene="bioluminescent-tide" settings={settings} accent="#38ffd1" background="#00080b" eyebrow="08 — Living ocean" title={"Light lives\ndown here."} description="A breathing surface of luminous organisms answers the current with waves of turquoise fire." cta="Wake the water" />;
}
