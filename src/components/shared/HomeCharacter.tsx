import { Link } from "react-router-dom";
import type { ProfileSlug } from "@/data/profiles";
import { profileBySlug } from "@/data/profiles";
import MascotScene, { type MascotSceneKind } from "./MascotScene";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import hanging from "@/assets/mascot-scenes/cybersecurity-hanging.webp";

/** A single working figure anchored to its content; no paired mascot rows. */
export default function HomeCharacter({ profile, scene, className }: { profile: ProfileSlug; scene: MascotSceneKind | "hanging"; className?: string }) {
  const { t } = useLanguage();
  const area = profileBySlug(profile);
  return <Link to={area.path} data-profile={profile} data-home-character={profile} aria-label={t(area.label)}
    className={cn("group relative block w-44 shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-56", className)}>
    {scene === "hanging" ? <img src={hanging} alt="" aria-hidden width={1024} height={1536} loading="lazy" decoding="async" data-mascot-scene="hanging" data-scene-profile={profile} className="h-auto w-full origin-top transition-transform duration-300 motion-safe:group-hover:rotate-2" /> : <MascotScene profile={profile} scene={scene} className="w-full transition-transform duration-300 motion-safe:group-hover:-translate-y-1" />}
    <span aria-hidden className="pointer-events-none absolute inset-x-8 bottom-0 -z-10 h-3 rounded-full bg-primary/20 blur-xl" />
  </Link>;
}
