import type { ProfileSlug } from "@/data/profiles";
import { mascotGear, toolArtwork } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotToolProp from "./MascotToolProp";

/** Names and small images below the orbit supplement its floating objects. */
export default function MascotGearPreview({ profile, id }: { profile: ProfileSlug; id?: string }) {
  const { t } = useLanguage();
  return <ul id={id} data-gear-preview={profile} data-profile={profile} className="mascot-gear-preview grid h-full grid-cols-3 gap-2 text-primary">
    {mascotGear[profile].map(tool => <li key={tool} data-gear-item={tool} className="flex min-w-0 flex-col items-center gap-1 text-center">
      <span data-tool-label className="flex min-h-8 items-center justify-center text-xs font-semibold leading-4 sm:min-h-10 sm:text-sm sm:leading-5">{t(toolArtwork[tool].label)}</span>
      <span className="block h-10 w-10 sm:h-14 sm:w-14"><MascotToolProp tool={tool} /></span>
    </li>)}
  </ul>;
}
