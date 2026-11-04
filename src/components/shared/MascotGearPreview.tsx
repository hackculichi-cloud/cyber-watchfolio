import type { ProfileSlug } from "@/data/profiles";
import { mascotGear, toolArtwork } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Compact names identify the floating tools without repeating their artwork. */
export default function MascotGearPreview({ profile, id }: { profile: ProfileSlug; id?: string }) {
  const { t } = useLanguage();
  return <ul id={id} data-gear-preview={profile} data-profile={profile} className="mascot-gear-preview grid h-full grid-cols-3 items-center gap-2 text-primary">
    {mascotGear[profile].map(tool => <li key={tool} data-gear-item={tool} className="flex min-w-0 items-center justify-center rounded-lg border border-primary/20 bg-background/60 px-1 py-1 text-center">
      <span data-tool-label className="flex min-h-8 items-center justify-center text-[11px] font-medium leading-4 sm:text-xs">{t(toolArtwork[tool].label)}</span>
    </li>)}
  </ul>;
}
