import { useState } from "react";
import { ExternalLink, Github, FileText } from "lucide-react";
import type { WorkItem } from "@/data/works";
import Tag from "@/components/shared/Tag";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import BeforeAfter from "@/components/shared/BeforeAfter";
import WorkImageGallery from "@/components/shared/WorkImageGallery";
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
  const [videoError, setVideoError] = useState(false);
  return (
    <div className="reading-copy space-y-8">
      {item.cover?.src ? (
        <SmartImage src={item.cover.src} alt={t(item.cover.alt)} eager className="aspect-[16/10] w-full rounded-lg border border-border" />
      ) : (
        <PlaceholderImage className="aspect-[16/9] w-full" label={t("Project image pending")} />
      )}

      <div className="flex flex-wrap gap-1.5">
        <Tag variant="primary">{t(item.category)}</Tag>
        <Tag>{t(item.status)}</Tag>
        {item.difficulty && <Tag variant="accent">{t(item.difficulty)}</Tag>}
        {item.date && <Tag>{t(item.date)}</Tag>}
        {item.environment && <Tag>{t(item.environment)}</Tag>}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>

      {item.objective && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Objective")}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.objective)}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <List title={t("Skills practiced")} items={item.skills} />
        <List title={t("What I did")} items={item.did} />
        <List title={t("What I learned")} items={item.learned} />
        <List title={t("Results")} items={item.results} />
        <List title={t("Tools used")} items={item.tools} />
        <List title={t("Technologies")} items={item.technologies} />
      </div>

      {item.procedure?.length ? <section className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Procedure")}</h4>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {item.procedure.map((step, index) => <li key={index}>{t(step)}</li>)}
        </ol>
      </section> : null}
      {item.documentedSteps?.length ? <section data-documented-steps className="space-y-5">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Photographic process record")}</h4>
        <ol className="space-y-6">
          {item.documentedSteps.map((step, index) => <li key={step.title} className="border-l border-primary/30 pl-4">
            <h5 className="text-sm font-semibold"><span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>{t(step.title)}</h5>
            <p className="mb-3 mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.description)}</p>
            {step.images?.length ? <WorkImageGallery images={step.images} title={step.title} compact /> : null}
          </li>)}
        </ol>
      </section> : null}
      {item.protocol?.length ? <section data-work-protocol className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{t("Reference checklist. Performed actions and recorded results are described in the process above.")}</p>
        <List title="Work protocol" items={item.protocol} />
      </section> : null}
      {item.technicalExplanation && <section className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Technical explanation")}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{t(item.technicalExplanation)}</p>
      </section>}

      {(item.before || item.after) && (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Before / After")}</h4>
          <BeforeAfter before={item.before} after={item.after} />
        </div>
      )}

      {item.images?.length ? (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Gallery")}</h4>
          <WorkImageGallery images={item.images} title={item.title} compact collapsible />
        </div>
      ) : null}

      {item.video && (
        <section className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t(item.video.title)}</h4>
          <video
            key={item.video.src}
            controls
            playsInline
            preload="metadata"
            poster={item.video.poster}
            aria-label={t(item.video.title)}
            className="aspect-video w-full rounded-lg border border-border bg-background object-contain"
            onError={() => setVideoError(true)}
          >
            {item.video.webmSrc && <source src={item.video.webmSrc} type="video/webm" />}
            <source src={item.video.src} type="video/mp4" />
            {t("Your browser cannot play this video.")}
          </video>
          {videoError && <p role="status" className="text-sm text-muted-foreground">{t("Video unavailable")}</p>}
          <a href={item.video.src} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            <ExternalLink className="h-4 w-4" aria-hidden />{t("Open video")}
          </a>
        </section>
      )}

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
