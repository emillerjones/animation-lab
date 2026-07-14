import GpuExperience from "./webgl/GpuExperience";
import "./NeuralNetworkUniverse.css";

export default function NeuralNetworkUniverse({ settings = {} }) {
  return <GpuExperience scene="neural-network-universe" settings={settings} accent="#8c7dff" background="#020209" eyebrow="19 — Living intelligence" title={"A universe\nlearns to think."} description="Clusters awaken, connect, and transmit light through a neural cosmos that reacts like a living mind." cta="Trigger a thought" />;
}
