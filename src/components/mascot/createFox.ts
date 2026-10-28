import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { ProfileSlug } from "@/data/profiles";

export type FoxOutfit = ProfileSlug | "home";
const palettes: Record<FoxOutfit, [string, string]> = {
  home: ["#172b40", "#2dd5f3"], cybersecurity: ["#142637", "#39cff4"],
  development: ["#193a2b", "#57e483"], electrical: ["#d8a520", "#ffe369"],
  electronics: ["#dbe2e9", "#ff943d"], repair: ["#513078", "#ba91ff"],
  "customer-service": ["#138b96", "#65e6dc"],
  barbering: ["#25202a", "#f5a2b2"],
};
export type FoxController = {
  root: THREE.Object3D;
  readonly outfit: FoxOutfit;
  setOutfit: (profile: FoxOutfit) => void;
  pose: (wave: number, elapsed: number, lookX: number, lookY: number, turn: number) => void;
  dispose: () => void;
};

// One immutable CPU template per app session; clones own their material state.
// Renderer/context disposal releases GPU buffers, while route changes reuse decoded mesh/textures.
let templatePromise: Promise<THREE.Object3D> | undefined;
const loadTemplate = () => templatePromise ??= new GLTFLoader().loadAsync("/models/culichi.glb")
  .then(gltf => gltf.scene).catch(error => { templatePromise = undefined; throw error; });

/** Blender-authored mesh and textures, served locally. All six costumes share articulated joints. */
export async function createFox(initial: FoxOutfit): Promise<FoxController> {
  const root = (await loadTemplate()).clone(true);
  const materialClones = new Map<THREE.Material, THREE.Material>();
  const materials = new Set<THREE.MeshStandardMaterial>();
  const costumes: THREE.Object3D[] = [];
  root.traverse(object => {
    if (object.userData.outfit) costumes.push(object);
    if (object instanceof THREE.Mesh) {
      const clone = (material: THREE.Material) => {
        if (!materialClones.has(material)) materialClones.set(material, material.clone());
        return materialClones.get(material)!;
      };
      object.material = Array.isArray(object.material) ? object.material.map(clone) : clone(object.material);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        if (material instanceof THREE.MeshStandardMaterial) materials.add(material);
      }
    }
  });
  const dispose = () => {
    // Shared geometry/images belong to the immutable template, not this route instance.
    for (const material of materialClones.values()) material.dispose();
  };
  const joints = ["head_joint", "wave_shoulder", "wave_elbow", "wave_wrist", "tail_joint"].map(name => root.getObjectByName(name));
  if (joints.some(joint => !joint)) {
    dispose();
    throw new Error("Culichi model is missing an articulated joint");
  }
  const [head, shoulder, elbow, wrist, tail] = joints as THREE.Object3D[];
  let outfit = initial;
  const setOutfit = (profile: FoxOutfit) => {
    outfit = profile;
    for (const costume of costumes) costume.visible = costume.userData.outfit === profile;
    for (const material of materials) {
      if (material.name === "culichi_cloth") material.color.set(palettes[profile][0]);
      if (material.name === "culichi_accent") material.color.set(palettes[profile][1]);
    }
  };
  setOutfit(initial);
  return {
    root, get outfit() { return outfit; }, setOutfit, dispose,
    pose(wave, elapsed, lookX, lookY, turn) {
      root.rotation.y = -.12 + turn;
      head.rotation.set(-lookY * .075, lookX * .18, wave * .035);
      // Ease the shoulder, bend the elbow, then articulate the wrist; no sliding bitmap.
      shoulder.rotation.z = -.1 - wave * 2.25;
      shoulder.rotation.x = wave * -.14;
      elbow.rotation.set(-wave * .22, 0, wave * .42);
      wrist.rotation.set(wave * .10, wave * .25, wave * Math.sin(elapsed * 12) * .23);
      tail.rotation.z = Math.sin(elapsed * 2.4) * wave * .045;
    },
  };
}
