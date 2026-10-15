import type { ProfileSlug } from "@/data/profiles";
import actionAtlas from "@/assets/culichi-action-scenes.webp";
import practiceAtlas from "@/assets/culichi-practice-scenes.webp";
import closingAtlas from "@/assets/culichi-closing-scenes.webp";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import scenes from "@/data/mascotScenes.json";
import cyberDetail from "@/assets/mascot-scenes/cybersecurity.webp";
import softwareDetail from "@/assets/mascot-scenes/development.webp";
import electricalDetail from "@/assets/mascot-scenes/electrical.webp";
import electronicsDetail from "@/assets/mascot-scenes/electronics.webp";
import repairDetail from "@/assets/mascot-scenes/repair.webp";
import serviceDetail from "@/assets/mascot-scenes/customer-service.webp";

export type MascotSceneKind = "action" | "closing" | "detail" | "practice";
const details: Record<ProfileSlug, [string, number, number]> = {
  cybersecurity: [cyberDetail, 1024, 1536], development: [softwareDetail, 1024, 1536], electrical: [electricalDetail, 1024, 1536],
  electronics: [electronicsDetail, 1147, 1371], repair: [repairDetail, 1145, 1374], "customer-service": [serviceDetail, 1024, 1536],
};
/** Decorative illustrations, separate from real project evidence and measurements. */
const MascotScene = ({ profile, scene, className }: { profile: ProfileSlug; scene: MascotSceneKind; className?: string }) => {
  if (scene === "detail") {
    const [src, width, height] = details[profile];
    return <Reveal from="left" className={cn("shrink-0", className)}><img src={src} width={width} height={height} alt="" aria-hidden loading="lazy" decoding="async" data-mascot={profile} data-mascot-scene="detail" data-scene-profile={profile} className="h-auto w-full object-contain" /></Reveal>;
  }
  const atlas = scenes[scene];
  const [x, y, width, height] = atlas.regions[profile];
  return <Reveal from={scene === "action" ? "left" : "right"} className={cn("shrink-0", className)}>
    <span aria-hidden data-mascot={profile} data-mascot-scene={scene} data-scene-profile={profile} className="block w-full bg-no-repeat" style={{ aspectRatio: `${width} / ${height}`, backgroundImage: `url(${scene === "action" ? actionAtlas : scene === "practice" ? practiceAtlas : closingAtlas})`, backgroundSize: `${atlas.width / width * 100}% ${atlas.height / height * 100}%`, backgroundPosition: `${x / (atlas.width - width) * 100}% ${y / (atlas.height - height) * 100}%` }} />
  </Reveal>;
};
export default MascotScene;
