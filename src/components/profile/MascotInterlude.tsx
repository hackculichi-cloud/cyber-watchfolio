import { ArrowDown } from "lucide-react";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import Reveal from "@/components/shared/Reveal";
import atlas from "@/assets/culichi-companion-atlas.webp";

const cells: Record<ProfileSlug, number> = { cybersecurity: 0, development: 1, electrical: 2, electronics: 3, repair: 4, "customer-service": 5 };
/** A scroll-revealed illustration within document flow, never covering the content. */
const MascotInterlude = ({ profile, cv = false }: { profile: ProfileSlug; cv?: boolean }) => {
  const { t } = useLanguage();
  const cell = cells[profile];
  return <div className="container mx-auto px-4 py-6" data-mascot-interlude={profile}>
    <Reveal from={cv ? "right" : "left"} className={`flex items-center gap-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:gap-8 sm:px-8 ${cv ? "flex-row-reverse text-right" : ""}`}>
      <span aria-hidden className="block aspect-square w-24 shrink-0 overflow-hidden rounded-2xl sm:w-36" style={{ backgroundImage: `url(${atlas})`, backgroundSize: "300% 200%", backgroundPosition: `${(cell % 3) * 50}% ${Math.floor(cell / 3) * 100}%` }} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary">Culichi</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(cv ? "Explore the CV for this professional area." : "Explore the training and documented work in this area.")}</p>
        {cv && <a href="#cv" className="mt-3 inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary">{t("View CV")}<ArrowDown className="h-4 w-4" aria-hidden /></a>}
      </div>
    </Reveal>
  </div>;
};
export default MascotInterlude;
