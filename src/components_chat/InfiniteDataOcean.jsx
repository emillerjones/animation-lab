import GpuExperience from "./webgl/GpuExperience";
import "./InfiniteDataOcean.css";

export default function InfiniteDataOcean({ settings = {} }) {
  return <GpuExperience scene="infinite-data-ocean" settings={settings} accent="#44d7ff" background="#00050a" eyebrow="18 — Synthetic seascape" title={"The surface\nis thinking."} description="Thousands of luminous vertices breathe as one ocean while large signals travel toward a vanished horizon." cta="Send a pulse" />;
}
