import { useLanguage } from "@/i18n/LanguageProvider";
import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => {
  const { t } = useLanguage();
  return (
    <section className="grid-bg border-b border-border">
      <div className="page-heading container mx-auto px-4 py-16 md:py-20">
        {eyebrow && <p className="eyebrow animate-fade-in-up">{t(eyebrow)}</p>}
        <h1 className="animate-fade-in-up delay-100 mt-3 max-w-3xl text-3xl font-bold md:text-4xl">{t(title)}</h1>
        {description && (
          <p className="reading-copy animate-fade-in-up delay-200 mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t(description)}
          </p>
        )}
        {children && <div className="animate-fade-in-up delay-300 mt-8">{children}</div>}
      </div>
    </section>
  );
};

export default PageHeader;
