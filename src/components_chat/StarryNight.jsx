import GpuExperience from "./webgl/GpuExperience";
import "./StarryNight.css";

export default function StarryNight({ settings = {} }) {
  return <GpuExperience scene="starry-night" settings={settings} accent="#a9c9ff" background="#01030c" eyebrow="03 — Nocturne" title={"The moon\nkeeps watch."} description="Cloud banks cross a living starfield while moonlight swells and disappears behind their weight." cta="Stay after midnight" action="dawn" />;
}
