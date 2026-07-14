import GpuExperience from "./webgl/GpuExperience";
import "./MechanicalPlanetarium.css";

export default function MechanicalPlanetarium({ settings = {} }) {
  return <GpuExperience scene="mechanical-planetarium" settings={settings} accent="#d6ad66" background="#050301" eyebrow="20 — Celestial machinery" title={"The heavens\nwere engineered."} description="Brass orbital rings, illuminated guide paths, and mechanical worlds turn at independent speeds." cta="Set the sky in motion" />;
}
