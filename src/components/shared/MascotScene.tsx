import type { ProfileSlug } from "@/data/profiles";
import actionAtlas from "@/assets/culichi-action-scenes.webp";
import practiceAtlas from "@/assets/culichi-practice-scenes.webp";
import closingAtlas from "@/assets/culichi-closing-scenes.webp";
import actionPreview from "@/assets/mascot-previews/culichi-action-scenes-768.webp";
import practicePreview from "@/assets/mascot-previews/culichi-practice-scenes-768.webp";
import closingPreview from "@/assets/mascot-previews/culichi-closing-scenes-768.webp";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import scenes from "@/data/mascotScenes.json";
import cyberDetail from "@/assets/mascot-scenes/cybersecurity.webp";
import softwareDetail from "@/assets/mascot-scenes/development.webp";
import electricalDetail from "@/assets/mascot-scenes/electrical-tool-wall.webp";
import electronicsDetail from "@/assets/mascot-scenes/electronics.webp";
import repairDetail from "@/assets/mascot-scenes/repair.webp";
import serviceDetail from "@/assets/mascot-scenes/customer-service.webp";
import barberDetail from "@/assets/mascot-scenes/barbering.webp";

export type MascotSceneKind = "action" | "closing" | "detail" | "practice";
const details: Record<ProfileSlug, [string, number, number]> = {
  cybersecurity: [cyberDetail, 1024, 1536], development: [softwareDetail, 1024, 1536], electrical: [electricalDetail, 1536, 1024],
  electronics: [electronicsDetail, 1147, 1371], repair: [repairDetail, 1145, 1374], "customer-service": [serviceDetail, 1024, 1536],
  barbering: [barberDetail, 1024, 1536],
};
const atlases = {
  action: { full: actionAtlas, preview: actionPreview },
  practice: { full: practiceAtlas, preview: practicePreview },
  closing: { full: closingAtlas, preview: closingPreview },
};
/** Decorative illustrations, separate from real project evidence and measurements. */
const MascotScene = ({ profile, scene, className }: { profile: ProfileSlug; scene: MascotSceneKind; className?: string }) => {
  if (profile === "cybersecurity") return <Reveal from="left" className={cn("shrink-0", className)}><img src={cyberDetail} width={1024} height={1536} alt="" aria-hidden loading="lazy" decoding="async" data-masked-mascot data-mascot={profile} data-mascot-scene={scene} data-scene-profile={profile} className="h-auto w-full object-contain" /></Reveal>;
  if (profile === "barbering") return <Reveal from="right" className={cn("shrink-0", className)}><img src={barberDetail} width={1024} height={1536} alt="" aria-hidden loading="lazy" decoding="async" data-mascot={profile} data-mascot-scene={scene} data-scene-profile={profile} className="h-auto w-full object-contain" /></Reveal>;
  if (scene === "detail") {
    const [src, width, height] = details[profile];
    return <Reveal from="left" className={cn("shrink-0", className)}><img src={src} width={width} height={height} alt="" aria-hidden loading="lazy" decoding="async" data-mascot={profile} data-mascot-scene="detail" data-scene-profile={profile} className="h-auto w-full object-contain" /></Reveal>;
  }
  const atlas = scenes[scene];
  const artwork = atlases[scene];
  const [x, y, width, height] = atlas.regions[profile];
  return <Reveal from={scene === "action" ? "left" : "right"} className={cn("shrink-0", className)}>
    <span aria-hidden data-mascot={profile} data-mascot-scene={scene} data-scene-profile={profile} data-mascot-atlas={scene} className="relative block w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Native lazy loading waits for the actual crop, without a scroll observer. */}
      <img src={artwork.full} srcSet={`${artwork.preview} 768w, ${artwork.full} ${atlas.width}w`}
        sizes={`auto, (max-width:767px) ${Math.ceil(80 * atlas.width / width)}px, ${Math.ceil(320 * atlas.width / width)}px`}
        width={atlas.width} height={atlas.height} alt="" aria-hidden loading="lazy" decoding="async" data-mascot-atlas-image
        className="absolute block max-w-none"
        style={{ width: `${atlas.width / width * 100}%`, height: `${atlas.height / height * 100}%`, maxHeight: "none", left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
    </span>
  </Reveal>;
};
export default MascotScene;
