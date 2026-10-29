import type { ProfileSlug } from "@/data/profiles";
import { mascotGear, toolArtwork } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotToolProp from "./MascotToolProp";

export default function MascotGearPreview({ profile, id, compact = false }: { profile: ProfileSlug; id?: string; compact?: boolean }) {
  const { t } = useLanguage();
  return <div id={id} data-gear-preview={profile} data-profile={profile} className={`mascot-gear-preview rounded-xl border border-primary/25 bg-background/90 ${compact ? "flex h-full items-center px-3" : "mt-3 p-3"}`}>
    {!compact && <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">{t("Tools & focus")}</p>}
    <ul className="grid w-full grid-cols-3 gap-2">
      {mascotGear[profile].map(tool => <li key={tool} className={`flex min-w-0 items-center justify-center gap-1.5 text-foreground/95 ${compact ? "text-[11px] leading-snug" : "text-xs leading-relaxed"}`}>
        <span data-tool-flight={tool} className={`mascot-tool-flight ${compact ? "w-8" : "w-10"} shrink-0`}><span className="mascot-tool-float block"><MascotToolProp tool={tool} /></span></span><span className="mascot-tool-name min-w-0 [overflow-wrap:anywhere]">{t(toolArtwork[tool].label)}</span>
      </li>)}
    </ul>
  </div>;
}
