import { useMemo, useState } from "react";
import CanvasStage from "./CanvasStage";
import AnimationReadout from "./AnimationReadout";
import { TreeScene } from "./WishingTree";
import { seeded } from "../utils/procedural";
import "./WishingTree.css";

const MAX_TREES = 100;
const GROVE_RADIUS = 27;
const MIN_TREE_SPACING = 4.25;

function buildTreePlacements(count) {
  const placements = [{ x: 0, z: 0, rotation: 0, scale: 1 }];

  // Seeded best-candidate placement: every new tree chooses the emptiest of a
  // set of random candidates. This stays organic while avoiding obvious rows,
  // clumps, and trees growing through one another.
  for (let i = 1; i < count; i += 1) {
    let best = null;
    let bestClearance = -Infinity;

    for (let attempt = 0; attempt < 48; attempt += 1) {
      const seedIndex = i * 53 + attempt;
      const angle = seeded(seedIndex, 9101) * Math.PI * 2;
      const radius = Math.sqrt(seeded(seedIndex, 9102)) * GROVE_RADIUS;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const clearance = placements.reduce((nearest, tree) => (
        Math.min(nearest, Math.hypot(x - tree.x, z - tree.z))
      ), Infinity);

      if (clearance > bestClearance) {
        bestClearance = clearance;
        best = { x, z };
      }
      if (clearance >= MIN_TREE_SPACING) break;
    }

    placements.push({
      ...best,
      rotation: seeded(i, 9103) * Math.PI * 2,
      scale: 0.82 + seeded(i, 9104) * 0.28,
    });
  }

  return placements;
}

export default function WishingGrove({ settings = {} }) {
  const treeCount = Math.round(Math.max(1, Math.min(MAX_TREES, settings.treeCount ?? 12)));
  const placements = useMemo(() => buildTreePlacements(treeCount), [treeCount]);
  const [stats, setStats] = useState({ fps: 60, gpu: "—", petals: 0, totalPetals: 0, trees: treeCount, season: "SPRING" });
  const onStats = (patch) => setStats((current) => ({ ...current, ...patch }));

  return (
    <section className="atmosphere wishing-tree" style={{ "--experiment-accent": "#ffb7c5" }}>
      <CanvasStage
        camera={{ position: [0, 28, 72], fov: 48, near: 0.1, far: 180 }}
        speed={settings.speed ?? 1}
        bloom={{ intensity: 0.85, threshold: 0.62 }}
      >
        <fogExp2 attach="fog" args={["#f0ccd6", 0.009]} />
        <TreeScene
          settings={settings}
          onStats={onStats}
          treePlacements={placements}
          defaultCameraDistance={62}
          maxCameraDistance={110}
        />
      </CanvasStage>

      <div className="experiment-copy wishing-tree__copy">
        <p>03 — A forest of wishes, growing outward</p>
        <h1>The Wishing<br />Grove.</h1>
        <span>The first tree stands at the heart of the sand garden. Around it, an entire living grove takes root—each tree bearing its own impossible multitude of wishes.</span>
      </div>

      <div className="wishing-tree__legend">
        <div><i>&#8635;</i><div><b>Drag</b><span>Orbit around the grove</span></div></div>
      </div>

      <AnimationReadout
        eyebrow="Grove census"
        value={stats.season}
        stats={[
          { value: stats.trees.toLocaleString(), label: "TREES IN THE GROVE" },
          { value: stats.totalPetals.toLocaleString(), label: "TOTAL BLOSSOMS" },
        ]}
      />
    </section>
  );
}
