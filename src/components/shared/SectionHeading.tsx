import MascotScene, { type MascotSceneKind } from "./MascotScene";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  mascot?: ProfileSlug;
  mascotScene?: MascotSceneKind;
}

const SectionHeading = ({ eyebrow, title, description, id, mascot, mascotScene = "closing" }: SectionHeadingProps) => {
  const { t } = useLanguage();
  return (
    <div id={id} data-mascot-interlude={mascot} className="mb-8 flex scroll-mt-24 flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{t(title)}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(description)}</p>}
      </div>
      {mascot && <MascotScene profile={mascot} scene={mascotScene} className={mascotScene === "closing" ? "w-40 self-center sm:w-52 sm:self-auto lg:w-64" : "w-48 self-center sm:w-60 sm:self-auto lg:w-72"} />}
    </div>
  );
};

export default SectionHeading;
