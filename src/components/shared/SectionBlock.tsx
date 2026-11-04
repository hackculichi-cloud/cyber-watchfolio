import { useLanguage } from "@/i18n/LanguageProvider";
import ContentDetails from "./ContentDetails";
import { ReactNode } from "react";

interface SectionBlockProps {
  title: string;
  children: ReactNode;
  /** If false the block renders nothing. Use for auto-hide when data is empty. */
  show?: boolean;
  expanded?: boolean;
}

const SectionBlock = ({ title, children, show = true, expanded = false }: SectionBlockProps) => {
  const { t } = useLanguage();
  if (!show) return null;
  if (!expanded) return <ContentDetails title={title}><div className="space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div></ContentDetails>;
  return (
    <section className="space-y-2">
      <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider">
        {t(">")} {t(title)}
      </h3>
      <div className="w-8 h-px bg-primary/40 mb-2" />
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
};

export default SectionBlock;
