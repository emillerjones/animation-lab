import GpuExperience from "./webgl/GpuExperience";
import "./BlackHole.css";

export default function BlackHole({ settings = {} }) {
  return <GpuExperience scene="black-hole" settings={settings} accent="#ff9e58" background="#000000" eyebrow="22 — Event horizon" title={"Gravity\nbecomes visible."} description="Curved light and stellar matter spiral through a luminous accretion field toward perfect darkness." cta="Fall beyond the horizon" wheelInteraction />;
}
