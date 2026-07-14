import GpuExperience from "./webgl/GpuExperience";
import "./EndlessLightTunnel.css";

export default function EndlessLightTunnel({ settings = {} }) {
  return <GpuExperience scene="endless-light-tunnel" settings={settings} accent="#ffd08a" background="#050301" eyebrow="01 — Architecture at velocity" title={"Forward is\nthe only direction."} description="A reflective corridor, endless frames, and rushing particles collapse into one continuous flight through light." cta="Begin the crossing" wheelInteraction />;
}
