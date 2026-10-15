import type { ProfileSlug } from "@/data/profiles";
import { mascotGear } from "@/data/mascotGear";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function MascotGearPreview({ profile, id }: { profile: ProfileSlug; id?: string }) {
  const { t } = useLanguage();
  return <div id={id} data-gear-preview={profile} data-profile={profile} className="mascot-gear-preview mt-3 rounded-xl border border-primary/25 bg-background/90 p-3">
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">{t("Tools & focus")}</p>
    <ul className="grid grid-cols-3 gap-2">
      {mascotGear[profile].map(({ label, icon: Icon }) => <li key={label} className="flex min-w-0 flex-col items-center gap-1.5 text-center text-[10px] leading-relaxed text-foreground/90 sm:text-xs">
        <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden /><span className="[overflow-wrap:anywhere]">{t(label)}</span>
      </li>)}
    </ul>
  </div>;
}
