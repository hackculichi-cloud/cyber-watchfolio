import type { ProfileSlug } from "@/data/profiles";
import actionAtlas from "@/assets/culichi-action-scenes.webp";
import closingAtlas from "@/assets/culichi-closing-scenes.webp";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import scenes from "@/data/mascotScenes.json";

export type MascotSceneKind = "action" | "closing";
/** Decorative illustrations, separate from real project evidence and measurements. */
const MascotScene = ({ profile, scene, className }: { profile: ProfileSlug; scene: MascotSceneKind; className?: string }) => {
  const atlas = scenes[scene];
  const [x, y, width, height] = atlas.regions[profile];
  return <Reveal from={scene === "action" ? "left" : "right"} className={cn("shrink-0", className)}>
    <span aria-hidden data-mascot={profile} data-mascot-scene={scene} data-scene-profile={profile} className="block w-full bg-no-repeat" style={{ aspectRatio: `${width} / ${height}`, backgroundImage: `url(${scene === "action" ? actionAtlas : closingAtlas})`, backgroundSize: `${atlas.width / width * 100}% ${atlas.height / height * 100}%`, backgroundPosition: `${x / (atlas.width - width) * 100}% ${y / (atlas.height - height) * 100}%` }} />
  </Reveal>;
};
export default MascotScene;
