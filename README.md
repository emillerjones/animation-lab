# Animation Lab

A Vite + React gallery of 48 procedural motion experiments. The home page is
generated from the master catalog in `src/data/animations.js`; selecting an
experiment opens its own hash route, so no backend or server-side routing is
needed.

The gallery compares 28 ChatGPT experiments with 20 Claude experiments. The
seven closely related A/B pairs keep an in-place variant toggle; substantially
different ideas are standalone pages. Every experiment has live speed and
scene-specific controls.

No images, video files, canvas, WebGL, or animation libraries are used.

## Run it

Open a terminal inside the `animation-lab` folder:

```bash
npm install
npm run dev
```

Then open the local address Vite prints, usually:

```text
http://localhost:5173
```

Use the index to open an experiment and the floating back button to return.
