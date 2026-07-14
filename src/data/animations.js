import { lazy } from "react";

const load = (path) => lazy(() => path());

const EndlessLightTunnel = load(() => import("../components_chat/EndlessLightTunnel"));
const StarryNight = load(() => import("../components_chat/StarryNight"));
const RainWindow = load(() => import("../components_chat/RainWindow"));
const SolarFlare = load(() => import("../components_chat/SolarFlare"));
const BioluminescentTide = load(() => import("../components_chat/BioluminescentTide"));
const PrismPulse = load(() => import("../components_chat/PrismPulse"));
const LuminousMycelium = load(() => import("../components_chat/LuminousMycelium"));
const GlassHarmonics = load(() => import("../components_chat/GlassHarmonics"));
const DreamingCity = load(() => import("../components_chat/DreamingCity"));
const CathedralOfLight = load(() => import("../components_chat/CathedralOfLight"));
const CathedralAscent3D = load(() => import("../components_claude/CathedralAscent3D"));
const BlackHole3D = load(() => import("../components_claude/BlackHole3D"));
const MechanicalPlanetarium3D = load(() => import("../components_claude/MechanicalPlanetarium3D"));
const InfiniteDataOcean3D = load(() => import("../components_claude/InfiniteDataOcean3D"));
const NeuralNetworkUniverse3D = load(() => import("../components_claude/NeuralNetworkUniverse3D"));
const ParticleCollider3D = load(() => import("../components_claude/ParticleCollider3D"));
const EndlessLightTunnel3D = load(() => import("../components_claude/EndlessLightTunnel3D"));
const StarryNight3D = load(() => import("../components_claude/StarryNight3D"));
const RainWindow3D = load(() => import("../components_claude/RainWindow3D"));
const SolarFlare3D = load(() => import("../components_claude/SolarFlare3D"));
const BioluminescentTide3D = load(() => import("../components_claude/BioluminescentTide3D"));
const PrismPulse3D = load(() => import("../components_claude/PrismPulse3D"));
const LuminousMycelium3D = load(() => import("../components_claude/LuminousMycelium3D"));
const GlassHarmonics3D = load(() => import("../components_claude/GlassHarmonics3D"));
const DreamingCity3D = load(() => import("../components_claude/DreamingCity3D"));
const InfiniteLibrary3D = load(() => import("../components_claude/InfiniteLibrary3D"));
const BlueprintWorld3D = load(() => import("../components_claude/BlueprintWorld3D"));
const InfiniteDataOcean = load(() => import("../components_chat/InfiniteDataOcean"));
const NeuralNetworkUniverse = load(() => import("../components_chat/NeuralNetworkUniverse"));
const MechanicalPlanetarium = load(() => import("../components_chat/MechanicalPlanetarium"));
const InfiniteLibrary = load(() => import("../components_chat/InfiniteLibrary"));
const BlackHole = load(() => import("../components_chat/BlackHole"));
const BlueprintWorld = load(() => import("../components_chat/BlueprintWorld"));
const ParticleCollider = load(() => import("../components_chat/ParticleCollider"));
const SakuraFall = load(() => import("../components_chat/SakuraFall"));
const OrigamiFold = load(() => import("../components_chat/OrigamiFold"));
const CircuitPulse = load(() => import("../components_chat/CircuitPulse"));
const LivingBlackHole = load(() => import("../components_chat/LivingBlackHole"));
const ImpossibleOrigamiCathedralAdvanced = load(() => import("../components_chat/ImpossibleOrigamiCathedral"));
const GravityMuseum = load(() => import("../components_chat/GravityMuseum"));
const MechanicalSolarSystem = load(() => import("../components_chat/MechanicalSolarSystem"));
const StormMadeOfGlass = load(() => import("../components_chat/StormMadeOfGlass"));
const CityThatBuildsItself = load(() => import("../components_chat/CityThatBuildsItself"));
const ColossusAwakens = load(() => import("../components_chat/ColossusAwakens"));

const CircuitPulseClaude = load(() => import("../components_claude/CircuitPulse"));
const SakuraFallClaude = load(() => import("../components_claude/SakuraFall"));
const ImpossibleOrigamiCathedralClaude = load(() => import("../components_claude/ImpossibleOrigamiCathedral"));
const AlienDysonSwarm = load(() => import("../components_claude/AlienDysonSwarm"));

// The single source of truth for the gallery, its order, and every detail route.
export const animations = [
  {
    id: "endless-light-tunnel",
    provider: "chatgpt",
    title: "Endless Light Tunnel",
    category: "Architecture / Velocity",
    description: "A reflective architectural corridor, endless luminous frames, and rushing particles merge into one continuous flight through impossible depth.",
    accent: "#e8c17a",
    accentRgb: "232 193 122",
    component: EndlessLightTunnel,
    variantComponent: EndlessLightTunnel3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "frames", label: "Architectural frames", min: 24, max: 64, step: 4, default: 56 },
      { key: "dust", label: "Rushing particles", min: 40, max: 140, step: 10, default: 120 },
      { key: "debris", label: "Physics debris", min: 8, max: 36, step: 2, default: 20 },
    ],
  },
  {
    id: "starry-night",
    provider: "chatgpt",
    title: "Starry Night",
    category: "Sky / Parallax",
    description: "A hundred and fifty twinkling stars, drifting clouds, and slow meteors layered over a silhouetted ridge and its still reflection.",
    accent: "#88bfff",
    accentRgb: "136 191 255",
    component: StarryNight,
    variantComponent: StarryNight3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "density", label: "Star density", min: 35, max: 150, step: 5, default: 150 },
      { key: "clouds", label: "Cloud cover", min: 20, max: 100, step: 5, default: 72, suffix: "%" },
    ],
  },
  {
    id: "rain-window",
    provider: "chatgpt",
    title: "After the Rain",
    category: "Weather / Glass",
    description: "Streaking raindrops race down an unseen pane of glass while a blurred city glow smears behind the condensation.",
    accent: "#69d7ff",
    accentRgb: "105 215 255",
    component: RainWindow,
    variantComponent: RainWindow3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    chatControls: [
      { key: "chatRain", label: "Rain intensity", min: 10, max: 100, step: 1, default: 76, suffix: "%" },
      { key: "chatClouds", label: "Storm cloud cover", min: 15, max: 100, step: 1, default: 82, suffix: "%" },
      { key: "chatWind", label: "Crosswind", min: 0.2, max: 2, step: 0.1, default: 0.9, suffix: "×" },
      { key: "chatGlass", label: "Window droplets", min: 10, max: 100, step: 1, default: 68, suffix: "%" },
      { key: "chatHaze", label: "Rain haze", min: 0, max: 100, step: 1, default: 58, suffix: "%" },
      { key: "chatLightningRate", label: "Lightning frequency", min: 1, max: 10, step: 1, default: 6 },
      { key: "chatLightning", label: "Lightning", type: "toggle", default: true },
    ],
    claudeControls: [
      { key: "claudeRain", label: "Rain intensity", min: 10, max: 100, step: 1, default: 68, suffix: "%" },
      { key: "claudeClouds", label: "Storm cloud cover", min: 15, max: 100, step: 1, default: 72, suffix: "%" },
      { key: "claudeGlass", label: "Glass distortion", min: 10, max: 100, step: 1, default: 66, suffix: "%" },
      { key: "claudeLightning", label: "Lightning", type: "toggle", default: true },
    ],
  },
  {
    id: "solar-flare",
    provider: "chatgpt",
    title: "Solar Flare",
    category: "Plasma / Orbit",
    description: "A churning plasma surface erupts with flares while a lone body orbits the roiling light at a careful distance.",
    accent: "#ffb13b",
    accentRgb: "255 177 59",
    component: SolarFlare,
    variantComponent: SolarFlare3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [{ key: "energy", label: "Flare energy", min: 50, max: 150, step: 5, default: 100, suffix: "%" }],
  },
  {
    id: "bioluminescent-tide",
    provider: "chatgpt",
    title: "Bioluminescent Tide",
    category: "Ocean / Organism",
    description: "Glowing plankton wash and swirl with the tide, lighting up dark water in trails of blue-green bioluminescence.",
    accent: "#38ffd1",
    accentRgb: "56 255 209",
    component: BioluminescentTide,
    variantComponent: BioluminescentTide3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "density", label: "Plankton density", min: 15, max: 70, step: 5, default: 60 },
      { key: "hue", label: "Glow hue", min: 0, max: 360, step: 5, default: 166 },
    ],
  },
  {
    id: "prism-pulse",
    provider: "chatgpt",
    title: "Prism Pulse",
    category: "Color / Refraction",
    description: "White light splits through a rotating stack of prism planes, casting pulsing bands of spectral color outward.",
    accent: "#ff6f91",
    accentRgb: "255 111 145",
    component: PrismPulse,
    variantComponent: PrismPulse3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    chatControls: [
      { key: "die", label: "Crystal geometry", min: 0, max: 5, step: 1, default: 2, values: ["D4", "D6", "D8", "D10", "D12", "D20"] },
      { key: "dispersion", label: "Spectral dispersion", min: 0, max: 100, step: 1, default: 68, suffix: "%" },
      { key: "light", label: "Incident light", min: 20, max: 100, step: 1, default: 76, suffix: "%" },
      { key: "motes", label: "Photon motes", min: 12, max: 72, step: 4, default: 44 },
    ],
    claudeControls: [{ key: "planes", label: "Prism planes", min: 4, max: 12, step: 1, default: 12 }],
  },
  {
    id: "luminous-mycelium",
    provider: "chatgpt",
    title: "Luminous Mycelium",
    category: "Biology / Intelligence",
    description: "A fungal intelligence sends waves of light through an underground network and wakes a forest of glowing forms.",
    accent: "#9dff82",
    accentRgb: "157 255 130",
    component: LuminousMycelium,
    variantComponent: LuminousMycelium3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [{ key: "nodes", label: "Network nodes", min: 4, max: 144, step: 4, default: 64 }],
  },
  {
    id: "glass-harmonics",
    provider: "chatgpt",
    title: "Glass Harmonics",
    category: "Sound / Matter",
    description: "Resonant glass membranes make invisible sound visible as waves of pressure, refraction, and suspended liquid bells.",
    accent: "#78e9ff",
    accentRgb: "120 233 255",
    component: GlassHarmonics,
    variantComponent: GlassHarmonics3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [{ key: "plates", label: "Resonant plates", min: 6, max: 18, step: 1, default: 16 }],
  },
  {
    id: "dreaming-city",
    provider: "chatgpt",
    title: "Dreaming City",
    category: "Architecture / Gravity",
    description: "An impossible skyline stretches, turns, and mirrors itself across a glowing axis where no ground exists.",
    accent: "#ffc978",
    accentRgb: "255 201 120",
    component: DreamingCity,
    variantComponent: DreamingCity3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [{ key: "towers", label: "Dreaming towers", min: 8, max: 22, step: 1, default: 20 }],
  },
  {
    id: "cathedral-of-light",
    provider: "chatgpt",
    title: "Cathedral of Light",
    category: "Architecture / Sacred Geometry",
    description: "A monumental gold-line cathedral assembles chamber by chamber from advancing arches, massive pillars, volumetric shafts, and suspended dust.",
    accent: "#e2b665", accentRgb: "226 182 101",
    component: CathedralOfLight,
    variantComponent: CathedralAscent3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "arches", label: "Endless arches", min: 12, max: 34, step: 2, default: 30 },
      { key: "dust", label: "Sacred dust", min: 30, max: 130, step: 10, default: 110 },
    ],
  },
  {
    id: "infinite-data-ocean",
    provider: "chatgpt",
    title: "Infinite Data Ocean",
    category: "Data / Seascape",
    description: "An ocean constructed from breathing signal lines, shimmering vertices, bottomless reflections, and periodic traveling pulses.",
    accent: "#5ef3ff", accentRgb: "94 243 255",
    component: InfiniteDataOcean,
    variantComponent: InfiniteDataOcean3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "lines", label: "Wave lines", min: 16, max: 48, step: 4, default: 42 },
      { key: "vertices", label: "Glowing vertices", min: 50, max: 180, step: 10, default: 160 },
    ],
  },
  {
    id: "neural-network-universe",
    provider: "chatgpt",
    title: "Neural Network Universe",
    category: "Intelligence / Cosmos",
    description: "A responsive universe of living nodes and temporary synapses bends toward the pointer and propagates an activation wave when clicked.",
    accent: "#b286ff", accentRgb: "178 134 255",
    component: NeuralNetworkUniverse,
    variantComponent: NeuralNetworkUniverse3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [{ key: "nodes", label: "Thinking nodes", min: 50, max: 170, step: 10, default: 150 }],
  },
  {
    id: "mechanical-planetarium",
    provider: "chatgpt",
    title: "Mechanical Planetarium",
    category: "Clockwork / Astronomy",
    description: "Brass rings, independent planetary orbits, guide lines, and a giant turning gear form an observatory from three centuries ahead.",
    accent: "#e0b56a", accentRgb: "224 181 106",
    component: MechanicalPlanetarium,
    variantComponent: MechanicalPlanetarium3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "rings", label: "Orrery rings", min: 1, max: 8, step: 1, default: 8 },
      { key: "planets", label: "Orbiting bodies", min: 4, max: 11, step: 1, default: 9 },
    ],
  },
  {
    id: "infinite-library",
    provider: "chatgpt",
    title: "Infinite Library",
    category: "Archive / Perspective",
    description: "Repeating shelves glide toward the viewer through floating lamps and dust while wandering books quietly return themselves.",
    accent: "#e0ba79", accentRgb: "224 186 121",
    component: InfiniteLibrary,
    variantComponent: InfiniteLibrary3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "shelves", label: "Shelf bays", min: 10, max: 300, step: 10, default: 120 },
      { key: "books", label: "Books on the shelves", min: 200, max: 10000, step: 200, default: 4000 },
    ],
  },
  {
    id: "black-hole",
    provider: "chatgpt",
    title: "Black Hole",
    category: "Gravity / Event Horizon",
    description: "Curved light, stretched stars, layered accretion rings, and a slowly breathing horizon turn gravitational collapse into something beautiful.",
    accent: "#ffbb6f", accentRgb: "255 187 111",
    component: BlackHole,
    variantComponent: BlackHole3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "rings", label: "Lensing rings", min: 8, max: 26, step: 2, default: 22 },
      { key: "stars", label: "Falling stars", min: 50, max: 170, step: 10, default: 150 },
    ],
  },
  {
    id: "blueprint-world",
    provider: "chatgpt",
    title: "Blueprint World",
    category: "Engineering / Construction",
    description: "Animated SVG drafting lines, measurements, labels, and rotating wireframe blocks continuously construct and erase an impossible structure.",
    accent: "#78e8ff", accentRgb: "120 232 255",
    component: BlueprintWorld,
    variantComponent: BlueprintWorld3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "measurements", label: "Measurements", min: 6, max: 18, step: 2, default: 16 },
      { key: "blocks", label: "Constructing blocks", min: 6, max: 20, step: 2, default: 18 },
    ],
  },
  {
    id: "particle-collider",
    provider: "chatgpt",
    title: "Particle Collider",
    category: "Physics / Collision",
    description: "Opposing charged beams collide inside rotating guide rings and convert invisible force into an expanding field of sparks.",
    accent: "#b0ff72", accentRgb: "176 255 114",
    component: ParticleCollider,
    variantComponent: ParticleCollider3D,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "rings", label: "Guide rings", min: 6, max: 18, step: 1, default: 14 },
      { key: "sparks", label: "Collision sparks", min: 20, max: 64, step: 4, default: 52 },
    ],
  },
  {
    id: "sakura-fall",
    provider: "chatgpt",
    title: "Sakura Fall",
    category: "Nature / Hanami",
    description: "A moonlit Japanese garden where cherry blossoms drift past a vermilion torii, glowing lanterns, and their reflections in black water.",
    accent: "#ff9fc9",
    accentRgb: "255 159 201",
    component: SakuraFall,
    variantComponent: SakuraFallClaude,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "petals", label: "Falling petals", min: 30, max: 150, step: 10, default: 110 },
      { key: "breeze", label: "Evening breeze", min: 0.4, max: 2, step: 0.1, default: 1 },
    ],
  },
  {
    id: "origami-fold",
    provider: "chatgpt",
    title: "Origami Fold",
    category: "Paper / Transformation",
    description: "A luminous sheet flows into folded mountains and articulated paper cranes, all moving together on a slow invisible current.",
    accent: "#f1d5ad",
    accentRgb: "241 213 173",
    component: OrigamiFold,
    variantComponent: ImpossibleOrigamiCathedralClaude,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "facets", label: "Floating forms", min: 6, max: 18, step: 1, default: 14 },
      { key: "flow", label: "Paper current", min: 0.3, max: 1.8, step: 0.1, default: 0.8 },
    ],
  },
  {
    id: "circuit-pulse",
    provider: "chatgpt",
    title: "Circuit Pulse",
    category: "Technology / Signal",
    description: "A reflective circuit-board city routes luminous signals from a living central processor into rising data towers.",
    accent: "#55ffc0",
    accentRgb: "85 255 192",
    component: CircuitPulse,
    variantComponent: CircuitPulseClaude,
    variantLabel: "ChatGPT",
    variantBLabel: "Claude",
    controls: [
      { key: "pulses", label: "Traveling signals", min: 6, max: 30, step: 2, default: 24 },
      { key: "branches", label: "Circuit branches", min: 12, max: 32, step: 2, default: 26 },
    ],
  },
  {
    id: "living-black-hole",
    provider: "chatgpt",
    collection: "advanced",
    title: "Living Black Hole",
    category: "Gravity / Impossible Space",
    description: "A living event horizon draws stars, matter, and the camera into a turbulent procedural accretion disk before collapsing space into a tunnel of warped light.",
    accent: "#ff7a38",
    accentRgb: "255 122 56",
    component: LivingBlackHole,
    controls: [
      { key: "accretionIntensity", label: "Accretion intensity", min: 35, max: 150, step: 5, default: 100, suffix: "%" },
      { key: "stellarDensity", label: "Stellar density", min: 15, max: 100, step: 5, default: 82, suffix: "%" },
      { key: "lensingStrength", label: "Lensing strength", min: 20, max: 160, step: 5, default: 100, suffix: "%" },
      { key: "diveAcceleration", label: "Dive acceleration", min: 40, max: 180, step: 5, default: 100, suffix: "%" },
      { key: "plasmaTurbulence", label: "Plasma turbulence", min: 20, max: 180, step: 5, default: 100, suffix: "%" },
    ],
  },
  {
    id: "impossible-origami-cathedral",
    provider: "chatgpt",
    collection: "advanced",
    title: "Impossible Origami Cathedral",
    category: "WebGPU / Paper Architecture",
    description: "One ivory sheet folds itself into a breathing gothic sanctuary of translucent ribs, warm internal light, drifting paper fragments, and impossible scale.",
    accent: "#f0c986",
    accentRgb: "240 201 134",
    component: ImpossibleOrigamiCathedralAdvanced,
    controls: [
      { key: "foldComplexity", label: "Fold complexity", min: 40, max: 100, step: 5, default: 78, suffix: "%" },
      { key: "paperGlow", label: "Internal paper light", min: 20, max: 150, step: 5, default: 92, suffix: "%" },
      { key: "dust", label: "Paper fragments", min: 20, max: 100, step: 5, default: 70, suffix: "%" },
      { key: "breathing", label: "Fold breathing", min: 0.2, max: 2, step: 0.1, default: 0.8, suffix: "×" },
      { key: "scrollTravel", label: "Interior travel", min: 40, max: 160, step: 5, default: 100, suffix: "%" },
    ],
  },
  {
    id: "gravity-museum",
    provider: "chatgpt",
    collection: "advanced",
    title: "Gravity Museum",
    category: "Rapier / Impossible Physics",
    description: "A frozen gallery of procedural artifacts breaks loose as gravity falls, turns sideways, and reverses through a controlled architectural collapse.",
    accent: "#a7b9ff",
    accentRgb: "167 185 255",
    component: GravityMuseum,
    controls: [
      { key: "artifactDensity", label: "Artifact density", min: 30, max: 100, step: 5, default: 72, suffix: "%" },
      { key: "gravityForce", label: "Gravity force", min: 30, max: 180, step: 5, default: 100, suffix: "%" },
      { key: "impactEnergy", label: "Impact energy", min: 20, max: 160, step: 5, default: 90, suffix: "%" },
      { key: "sparks", label: "Impact particles", min: 10, max: 100, step: 5, default: 65, suffix: "%" },
      { key: "disturbance", label: "Cursor disturbance", min: 0, max: 100, step: 5, default: 55, suffix: "%" },
    ],
  },
  {
    id: "mechanical-solar-system",
    provider: "chatgpt",
    collection: "advanced",
    title: "Mechanical Solar System",
    category: "TSL / Astronomical Clockwork",
    description: "Brass rings unfold into an ancient astronomical machine whose planets contain gears, liquid metal, wireframe shells, magnetic debris, and luminous cores.",
    accent: "#e0ae64",
    accentRgb: "224 174 100",
    component: MechanicalSolarSystem,
    controls: [
      { key: "mechanismDensity", label: "Mechanism density", min: 30, max: 100, step: 5, default: 78, suffix: "%" },
      { key: "orbitRate", label: "Orbital rate", min: 0.2, max: 2, step: 0.1, default: 0.8, suffix: "×" },
      { key: "coreEnergy", label: "Core energy", min: 20, max: 160, step: 5, default: 100, suffix: "%" },
      { key: "fragments", label: "Orbiting fragments", min: 20, max: 100, step: 5, default: 75, suffix: "%" },
      { key: "magnetism", label: "Cursor magnetism", min: 0, max: 100, step: 5, default: 55, suffix: "%" },
    ],
  },
  {
    id: "storm-made-of-glass",
    provider: "chatgpt",
    collection: "advanced",
    title: "Storm Made of Glass",
    category: "WebGPU / Refractive Weather",
    description: "An inverted droplet becomes a rotating glass storm, lightning travels through its particles, and its museum chamber fractures into physical shards.",
    accent: "#8de5f2",
    accentRgb: "141 229 242",
    component: StormMadeOfGlass,
    controls: [
      { key: "stormIntensity", label: "Storm intensity", min: 10, max: 100, step: 5, default: 72, suffix: "%" },
      { key: "glassRefraction", label: "Glass refraction", min: 10, max: 100, step: 5, default: 68, suffix: "%" },
      { key: "lightningRate", label: "Lightning frequency", min: 0, max: 100, step: 5, default: 58, suffix: "%" },
      { key: "mistDensity", label: "Mist density", min: 10, max: 100, step: 5, default: 65, suffix: "%" },
      { key: "fracture", label: "Fracture threshold", min: 0, max: 100, step: 5, default: 45, suffix: "%" },
    ],
  },
  {
    id: "city-that-builds-itself",
    provider: "chatgpt",
    collection: "advanced",
    title: "The City That Builds Itself",
    category: "Instancing / Living Architecture",
    description: "A reflective grid grows into an endless procedural city of assembling towers, energy roads, transit trails, weather, and repairable corruption.",
    accent: "#63f2e7",
    accentRgb: "99 242 231",
    component: CityThatBuildsItself,
    controls: [
      { key: "cityDensity", label: "City density", min: 30, max: 100, step: 5, default: 78, suffix: "%" },
      { key: "buildRate", label: "Construction rate", min: 0.2, max: 2, step: 0.1, default: 0.9, suffix: "×" },
      { key: "rainDensity", label: "Rain density", min: 0, max: 100, step: 5, default: 55, suffix: "%" },
      { key: "roadEnergy", label: "Road energy", min: 20, max: 160, step: 5, default: 100, suffix: "%" },
      { key: "corruption", label: "Corruption severity", min: 0, max: 100, step: 5, default: 35, suffix: "%" },
    ],
  },
  {
    id: "colossus-awakens",
    provider: "chatgpt",
    collection: "advanced",
    title: "The Colossus Awakens",
    category: "Cinematic / Procedural Machine",
    description: "An architectural machine rises beneath a reflective desert, studies the viewer through a living mechanical eye, and opens into an impossible internal world.",
    accent: "#ff8247",
    accentRgb: "255 130 71",
    component: ColossusAwakens,
    controls: [
      { key: "awakeningRate", label: "Awakening rate", min: 0.3, max: 2, step: 0.1, default: 0.8, suffix: "×" },
      { key: "sandDensity", label: "Metallic sand", min: 20, max: 100, step: 5, default: 72, suffix: "%" },
      { key: "eyeEnergy", label: "Central eye energy", min: 20, max: 160, step: 5, default: 105, suffix: "%" },
      { key: "mechanismDensity", label: "Mechanical density", min: 30, max: 100, step: 5, default: 82, suffix: "%" },
      { key: "distortion", label: "Energy distortion", min: 0, max: 100, step: 5, default: 48, suffix: "%" },
    ],
  },
  {
    id: "alien-dyson-swarm",
    provider: "claude",
    collection: "advanced",
    title: "Alien Dyson Swarm",
    category: "Instancing / Megastructure",
    description: "An ancient, still-functioning swarm of collectors, habitats, and trusses orbits a living star its builders vanished millions of years ago.",
    accent: "#ffb95c",
    accentRgb: "255 185 92",
    component: AlienDysonSwarm,
    controls: [
      { key: "swarmDensity", label: "Swarm density", min: 20, max: 160, step: 10, default: 90 },
      { key: "debrisDensity", label: "Debris density", min: 200, max: 3000, step: 100, default: 1600 },
      { key: "starIntensity", label: "Star intensity", min: 40, max: 200, step: 5, default: 110, suffix: "%" },
      { key: "orbitSpeed", label: "Orbital rate", min: 0.1, max: 2, step: 0.1, default: 0.6, suffix: "×" },
      { key: "droneTraffic", label: "Drone traffic", min: 0, max: 40, step: 2, default: 16 },
    ],
  },
].map((animation, index) => ({ ...animation, index }));
