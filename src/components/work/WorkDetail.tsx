import { ExternalLink, Github, FileText } from "lucide-react";
import type { WorkItem } from "@/data/works";
import Tag from "@/components/shared/Tag";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import BeforeAfter from "@/components/shared/BeforeAfter";
import SmartImage from "@/components/shared/SmartImage";
import { useLanguage } from "@/i18n/LanguageProvider";

const List = ({ title, items }: { title: string; items?: string[] }) => {
  const { t } = useLanguage();
  return items?.length ? (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t(title)}</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {t(i)}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

/** Full project detail: hero image, metadata, process, results and gallery. */
const WorkDetail = ({ item }: { item: WorkItem }) => {
  const { t } = useLanguage();
  return (
  <div className="space-y-8">
    {item.cover?.src ? (
      <SmartImage src={item.cover.src} alt={t(item.cover.alt)} eager className="aspect-[16/10] w-full rounded-lg border border-border" />
    ) : (
      <PlaceholderImage className="aspect-[16/9] w-full" label={t("Project image pending")} />
    )}

    <div className="flex flex-wrap gap-1.5">
      <Tag variant="primary">{t(item.category)}</Tag>
      <Tag>{t(item.status)}</Tag>
      {item.difficulty && <Tag variant="accent">{t(item.difficulty)}</Tag>}
      {item.date && <Tag>{item.date}</Tag>}
      {item.environment && <Tag>{item.environment}</Tag>}
    </div>

    <p className="text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>

    {item.objective && (
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Objective")}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.objective)}</p>
      </div>
    )}

    <div className="grid gap-6 md:grid-cols-2">
      <List title="Skills practiced" items={item.skills} />
      <List title="What I did" items={item.did} />
      <List title="What I learned" items={item.learned} />
      <List title="Results" items={item.results} />
      <List title="Tools used" items={item.tools} />
      <List title="Technologies" items={item.technologies} />
    </div>

    {(item.before || item.after) && (
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Before / After")}</h4>
        <BeforeAfter before={item.before} after={item.after} />
      </div>
    )}

    {item.images?.length ? (
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Gallery")}</h4>
        <div className="columns-1 gap-3 sm:columns-2">
          {item.images.map((img) =>
            img.src ? (
              <figure key={img.alt} className="mb-3 break-inside-avoid">
                <SmartImage src={img.src} alt={t(img.alt)} className="aspect-[4/3] w-full rounded-lg border border-border" />
                {img.caption && <figcaption className="mt-1.5 text-xs text-muted-foreground">{t(img.caption)}</figcaption>}
              </figure>
            ) : (
              <PlaceholderImage key={img.alt} className="aspect-[4/3] w-full" label={t(img.alt)} />
            ),
          )}
        </div>
      </div>
    ) : null}

    {(item.repo || item.demo || item.writeup) && (
      <div className="flex flex-wrap items-center gap-5 border-t border-border pt-5 text-sm">
        {item.repo && (
          <a href={item.repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <Github className="h-4 w-4" /> {t("Repository")}
          </a>
        )}
        {item.demo && (
          <a href={item.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <ExternalLink className="h-4 w-4" /> {t("Live demo")}
          </a>
        )}
        {item.writeup && (
          <a href={item.writeup} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <FileText className="h-4 w-4" /> {t("Write-up")}
          </a>
        )}
      </div>
    )}
  </div>
  );
};

export default WorkDetail;
