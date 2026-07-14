import GpuExperience from "./webgl/GpuExperience";
import "./OrigamiFold.css";

export default function OrigamiFold({ settings = {} }) {
  return (
    <GpuExperience
      scene="origami-fold"
      settings={settings}
      accent="#f1d5ad"
      background="#090806"
      eyebrow="28 — A quiet transformation"
      title={"Paper learns\nto breathe."}
      description="One illuminated sheet becomes a river, a mountain range, and a flock of cranes moving together on an invisible current."
      cta="Release the fold"
      wheelInteraction
    />
  );
}
