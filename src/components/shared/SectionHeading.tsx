import MascotScene, { type MascotSceneKind } from "./MascotScene";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ReactNode } from "react";
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  mascot?: ProfileSlug;
  mascotScene?: MascotSceneKind;
  children?: ReactNode;
  mascotWide?: boolean;
}

const SectionHeading = ({ eyebrow, title, description, id, mascot, mascotScene = "closing", children, mascotWide = false }: SectionHeadingProps) => {
  const { t } = useLanguage();
  const heading = <div className={`min-w-0 flex-1 ${mascotWide ? "col-span-2 lg:col-span-1" : ""}`}>
    {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
    <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{t(title)}</h2>
    {description && <p className="reading-copy mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(description)}</p>}
  </div>;

  if (mascot && children) return <div id={id} data-mascot-interlude={mascot} data-integrated-mascot className={`grid scroll-mt-24 grid-cols-[minmax(0,1fr)_6.5rem] items-end gap-x-4 gap-y-5 sm:grid-cols-[minmax(0,1fr)_10rem] lg:items-center lg:gap-x-8 ${mascotWide ? "lg:grid-cols-[minmax(0,1fr)_minmax(20rem,40%)]" : "lg:grid-cols-[minmax(0,1fr)_20rem]"}`}>
    {heading}
    <MascotScene profile={mascot} scene={mascotScene} className={mascotWide ? "col-span-2 col-start-1 row-start-2 w-full max-w-sm justify-self-center lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:max-w-none lg:self-end [&_img]:max-h-96" : `col-start-2 row-start-1 w-full justify-self-end self-end lg:row-span-2 lg:self-end ${mascotScene === "closing" ? "max-w-56" : "max-w-80 [&_img]:max-h-80"}`} />
    <div data-mascot-content className="col-span-2 min-w-0 lg:col-span-1 lg:col-start-1 lg:row-start-2">{children}</div>
  </div>;
  return (
    <div id={id} data-mascot-interlude={mascot} className="mb-8 flex scroll-mt-24 flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      {heading}
      {mascot && <MascotScene profile={mascot} scene={mascotScene} className={mascotScene === "closing" ? "w-52 self-center sm:w-64 sm:self-auto lg:w-72" : "w-60 self-center sm:w-72 sm:self-auto lg:w-80"} />}
    </div>
  );
};

export default SectionHeading;
