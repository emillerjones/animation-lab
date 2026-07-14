import { seeded } from "../utils/procedural";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import "./RainWindow.css";

const foregroundDrops = Array.from({ length: 58 }, (_, id) => ({
  id,
  x: seeded(id, 601) * 108,
  length: 7 + seeded(id, 602) * 17,
  delay: seeded(id, 603) * -2.4,
  duration: .46 + seeded(id, 604) * .72,
  opacity: .18 + seeded(id, 605) * .46,
  width: seeded(id, 606) > .72 ? 2 : 1,
}));

const glassDrops = Array.from({ length: 42 }, (_, id) => ({
  id,
  x: 2 + seeded(id, 620) * 96,
  y: seeded(id, 621) * 92,
  size: 2 + seeded(id, 622) * 5,
  trail: 10 + seeded(id, 623) * 48,
  delay: seeded(id, 624) * -9,
  duration: 4.5 + seeded(id, 625) * 8,
  opacity: .2 + seeded(id, 626) * .42,
}));

export default function RainWindow({ settings = {} }) {
  const intensity = (settings.chatRain ?? 76) / 100;
  const wind = settings.chatWind ?? .9;
  const count = Math.max(8, Math.round((settings.chatRain ?? 76) * .58));
  const glassCount = Math.max(8, Math.round((settings.chatGlass ?? 68) * .42));
  const foreground = (
    <>
      <div className="storm-window-frame" aria-hidden="true" />
      <div className="storm-glass-haze" aria-hidden="true" style={{ "--haze": (settings.chatHaze ?? 58) / 100 }} />
      <div className="glass-droplets" aria-hidden="true">
        {glassDrops.slice(0, glassCount).map((drop) => (
          <i key={drop.id} style={{
            "--drop-x": `${drop.x}%`,
            "--drop-y": `${drop.y}%`,
            "--drop-size": `${drop.size}px`,
            "--drop-trail": `${drop.trail}px`,
            "--drop-delay": `${drop.delay}s`,
            "--drop-duration": `${drop.duration / (.82 + intensity * .3)}s`,
            "--drop-opacity": drop.opacity,
          }} />
        ))}
      </div>
      <div className="rain-foreground" aria-hidden="true" style={{ "--storm-wind": wind }}>
        {foregroundDrops.slice(0, count).map((drop) => (
          <i key={drop.id} style={{
            "--rain-x": `${drop.x}%`,
            "--rain-length": `${drop.length}vh`,
            "--rain-delay": `${drop.delay}s`,
            "--rain-duration": `${drop.duration / (.72 + intensity * .5)}s`,
            "--rain-opacity": drop.opacity * (.55 + intensity * .62),
            "--rain-width": `${drop.width}px`,
          }} />
        ))}
      </div>
    </>
  );

  const background = new THREE.Color("#07111c").lerp(new THREE.Color("#010205"), intensity);
  return <GpuExperience scene="rain-window" settings={settings} accent="#69d7ff" background={background} eyebrow="04 — Weather study" title={"The city\nexhales."} description="Rain falls through the page itself—behind the words, across the glass, and between you and the city." cta="Step into the rain" foreground={foreground} />;
}
