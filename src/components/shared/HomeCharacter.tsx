import { Link } from "react-router-dom";
import type { ProfileSlug } from "@/data/profiles";
import { profileBySlug } from "@/data/profiles";
import MascotScene, { type MascotSceneKind } from "./MascotScene";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import electronicsBack from "@/assets/mascot-scenes/electronics-back.webp";
import repairPeeking from "@/assets/mascot-scenes/repair-peeking.webp";
import serviceLeaning from "@/assets/mascot-scenes/service-leaning.webp";
import hanging from "@/assets/mascot-scenes/cybersecurity-hanging.webp";
import electronicsBackPreview from "@/assets/mascot-previews/electronics-back-384.webp";
import repairPeekingPreview from "@/assets/mascot-previews/repair-peeking-384.webp";
import serviceLeaningPreview from "@/assets/mascot-previews/service-leaning-384.webp";
import hangingPreview from "@/assets/mascot-previews/cybersecurity-hanging-384.webp";

const poses = {
  "electronics-back": { src: electronicsBack, preview: electronicsBackPreview, width: 640, height: 764 },
  "repair-peeking": { src: repairPeeking, preview: repairPeekingPreview, width: 640, height: 768 },
  "service-leaning": { src: serviceLeaning, preview: serviceLeaningPreview, width: 640, height: 960 },
};

/** A single working figure anchored to its content; no paired mascot rows. */
export default function HomeCharacter({ profile, scene, className }: { profile: ProfileSlug; scene: MascotSceneKind | "hanging" | keyof typeof poses; className?: string }) {
  const { t } = useLanguage();
  const area = profileBySlug(profile);
  const pose = scene in poses ? poses[scene as keyof typeof poses] : undefined;
  return <Link to={area.path} data-profile={profile} data-home-character={profile} aria-label={t(area.label)}
    className={cn("group relative block w-32 shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-40", className)}>
    {pose ? <img src={pose.src} srcSet={`${pose.preview} 384w, ${pose.src} ${pose.width}w`} sizes="auto, (max-width:767px) 80px, 144px" width={pose.width} height={pose.height} alt="" aria-hidden loading="lazy" decoding="async" data-mascot-scene={scene} data-scene-profile={profile} className="h-auto w-full transition-transform duration-300 motion-safe:group-hover:-translate-y-1" /> : scene === "hanging" ? <img src={hanging} srcSet={`${hangingPreview} 384w, ${hanging} 1024w`} sizes="auto, (max-width:767px) 56px, 96px" alt="" aria-hidden width={1024} height={1536} loading="lazy" decoding="async" data-mascot-scene="hanging" data-scene-profile={profile} className="h-auto w-full origin-top transition-transform duration-300 motion-safe:group-hover:rotate-2" /> : <MascotScene profile={profile} scene={scene as MascotSceneKind} className="w-full transition-transform duration-300 motion-safe:group-hover:-translate-y-1" />}
    <span aria-hidden className="pointer-events-none absolute inset-x-8 bottom-0 -z-10 h-3 rounded-full bg-primary/20 blur-xl" />
  </Link>;
}
