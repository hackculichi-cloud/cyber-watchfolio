import { ArrowRight, Calendar, ExternalLink, Github } from "lucide-react";
import type { WorkItem } from "@/data/works";
import Tag from "@/components/shared/Tag";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/shared/SmartImage";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Image-first project card: large visual area, metadata, and a detail entry point. */
const WorkCard = ({ item, onOpen }: { item: WorkItem; onOpen: (id: string) => void }) => {
  const { t } = useLanguage();
  return (
  <article className="group panel-glow flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1">
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border">
      {item.cover?.src ? (
        <button type="button" onClick={() => onOpen(item.id)} className="block h-full w-full" aria-label={t("View project")}>
          <SmartImage src={item.cover.src} alt={t(item.cover.alt)} fit="cover" className="h-full w-full" imgClassName="transition-transform duration-500 group-hover:scale-105" />
        </button>
      ) : (
        <PlaceholderImage className="h-full w-full rounded-none border-0 border-b-0" />
      )}
      <span className="absolute left-3 top-3">
        <Tag variant="primary" className="bg-background/80 backdrop-blur-sm">
          {t(item.category)}
        </Tag>
      </span>
      <span className="absolute right-3 top-3">
        <Tag className="bg-background/80 backdrop-blur-sm">{t(item.status)}</Tag>
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-base font-semibold">{t(item.title)}</h3>
      {item.date && (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" aria-hidden /> {item.date}
        </p>
      )}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>

      {(item.skills?.length || item.technologies?.length || item.tools?.length) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(item.skills ?? item.technologies ?? item.tools ?? []).slice(0, 5).map((x) => (
            <Tag key={x}>{t(x)}</Tag>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="link"
          onClick={() => onOpen(item.id)}
          className="h-auto p-0 text-sm"
        >
          {t("View project")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
        <span className="flex items-center gap-3 text-muted-foreground">
          {item.repo && (
            <a href={item.repo} target="_blank" rel="noreferrer noopener" aria-label={t("Repository")} className="hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
          )}
          {item.demo && (
            <a href={item.demo} target="_blank" rel="noreferrer noopener" aria-label={t("Live demo")} className="hover:text-primary">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </span>
      </div>
    </div>
  </article>
  );
};

export default WorkCard;
