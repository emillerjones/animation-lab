import GpuExperience from "./webgl/GpuExperience";
import "./DreamingCity.css";

export default function DreamingCity({ settings = {} }) {
  return <GpuExperience scene="dreaming-city" settings={settings} accent="#ffc978" background="#050301" eyebrow="14 — Impossible urbanism" title={"The city\ndreams upward."} description="Dimensional towers stretch through a reflective grid where streets move and gravity has no fixed direction." cta="Enter the dreaming city" />;
}
