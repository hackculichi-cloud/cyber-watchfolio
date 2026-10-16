import type { ProfileSlug } from "@/data/profiles";
import { mascotGear, toolArtwork } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotToolProp from "./MascotToolProp";

export default function MascotGearPreview({ profile, id, compact = false }: { profile: ProfileSlug; id?: string; compact?: boolean }) {
  const { t } = useLanguage();
  return <div id={id} data-gear-preview={profile} data-profile={profile} className={`mascot-gear-preview rounded-xl border border-primary/25 bg-background/90 ${compact ? "flex h-full items-center px-3" : "mt-3 p-3"}`}>
    {!compact && <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">{t("Tools & focus")}</p>}
    <ul className="grid w-full grid-cols-2 gap-3">
      {mascotGear[profile].map(tool => <li key={tool} className="flex min-w-0 items-center justify-center gap-2 text-xs leading-relaxed text-foreground/95">
        <span className={`${compact ? "w-8" : "w-12"} shrink-0`}><MascotToolProp tool={tool} /></span><span className="[overflow-wrap:anywhere]">{t(toolArtwork[tool].label)}</span>
      </li>)}
    </ul>
  </div>;
}
