# Culichi — Blender source

`culichi.blend` and `public/models/culichi.glb` are authored by `scripts/build-culichi-model.py` using Blender 4.3.2. The character is an original orange fox with one brush tail, green eyes and a serious expression. `design-reference.png` is the AI-generated **2D visual reference**, not an animated model or a screenshot of the exported mesh. The shipped model is stylized; it does not reproduce the reference's dense groomed fur or cinematic render quality.

Rebuild from the repository root:

```sh
blender --background --factory-startup --python scripts/build-culichi-model.py
```

The script saves the editable Blender scene, exports a self-contained GLB with packed fur/fabric normal maps, and renders `/tmp/culichi-model-preview.png` from the actual geometry. It requires Blender's bundled NumPy; no remote asset or model service is used. Studio lights/camera stay in the `.blend`; they are excluded from the web asset. Cycles denoising is disabled for builds without OpenImageDenoise.

Web interaction uses the named head/shoulder/elbow/wrist/tail pivots. Accessory groups carry an `outfit` extra for six profiles, with shared named cloth/accent materials. Objects with the same parent and materials are batched, retaining these pivots and extras. The file is about 3 MB, with 66 mesh batches; it is loaded only with the interactive mascot. The browser renders on demand and retains a local illustration when WebGL or model loading fails.

The rendered preview is for review, not a substitute for testing the model in Three.js. A professional sculpt, richer fur groom/bake and a fully skinned character remain possible future art improvements.

`model-preview.webp` is a studio render of the actual exported geometry. The browser uses its own lighting; it is not the AI design reference.
