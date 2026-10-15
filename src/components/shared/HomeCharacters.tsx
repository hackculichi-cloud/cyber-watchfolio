import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ProfileSlug } from "@/data/profiles";
import { profileBySlug } from "@/data/profiles";
import MascotScene, { type MascotSceneKind } from "./MascotScene";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Full figures live alongside the home content, rather than floating over it. */
export default function HomeCharacters({ profiles, scene }: { profiles: ProfileSlug[]; scene: MascotSceneKind }) {
  const { t } = useLanguage();
  return <div className="flex w-full max-w-lg shrink-0 items-end justify-center gap-3 self-center lg:w-[46%]" data-home-characters>
    {profiles.map(slug => {
      const area = profileBySlug(slug);
      return <Link key={slug} to={area.path} data-profile={slug} data-home-character={slug} aria-label={t(area.label)} className="group block w-[46%] max-w-60 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <MascotScene profile={slug} scene={scene} className="w-full transition-transform duration-300 motion-safe:group-hover:-translate-y-2" />
        <span className="mt-2 flex justify-center text-primary"><ArrowUpRight className="h-4 w-4" aria-hidden /></span>
      </Link>;
    })}
  </div>;
}
