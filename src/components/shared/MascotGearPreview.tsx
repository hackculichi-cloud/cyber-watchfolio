import type { ProfileSlug } from "@/data/profiles";
import { mascotGear, toolArtwork } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Names describe the floating objects without adding a visible tool panel. */
export default function MascotGearPreview({ profile, id }: { profile: ProfileSlug; id?: string }) {
  const { t } = useLanguage();
  return <ul id={id} data-gear-preview={profile} className="sr-only">
    {mascotGear[profile].map(tool => <li key={tool}>{t(toolArtwork[tool].label)}</li>)}
  </ul>;
}
