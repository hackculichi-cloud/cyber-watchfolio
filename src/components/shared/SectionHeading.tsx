import CulichiBody from "./CulichiBody";
import Reveal from "./Reveal";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  mascot?: ProfileSlug;
}

const SectionHeading = ({ eyebrow, title, description, id, mascot }: SectionHeadingProps) => {
  const { t } = useLanguage();
  return (
    <div id={id} data-mascot-interlude={mascot} className="mb-8 flex scroll-mt-24 items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{t(title)}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(description)}</p>}
      </div>
      {mascot && <Reveal from="right" className="shrink-0"><CulichiBody profile={mascot} className="w-24 sm:w-36" /></Reveal>}
    </div>
  );
};

export default SectionHeading;
