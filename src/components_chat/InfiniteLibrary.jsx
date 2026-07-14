import GpuExperience from "./webgl/GpuExperience";
import "./InfiniteLibrary.css";

export default function InfiniteLibrary({ settings = {} }) {
  return <GpuExperience scene="infinite-library" settings={settings} accent="#e4b56f" background="#050301" eyebrow="21 — Endless archive" title={"Every aisle\nholds another world."} description="Procedural shelves repeat beyond sight while dust and warm reading lights drift through the stacks." cta="Find the unwritten book" />;
}
