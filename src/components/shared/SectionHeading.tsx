import { useLanguage } from "@/i18n/LanguageProvider";
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

const SectionHeading = ({ eyebrow, title, description, id }: SectionHeadingProps) => {
  const { t } = useLanguage();
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
      <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{t(title)}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(description)}</p>}
    </div>
  );
};

export default SectionHeading;
