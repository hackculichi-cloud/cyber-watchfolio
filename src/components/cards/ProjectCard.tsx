import { useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ExternalLink, Github, Code2, Workflow, Maximize2, Check } from "lucide-react";
import type { SoftwareProject } from "@/data/softwareProjects";
import { screenshotsForProject } from "@/data/softwareScreenshots";
import Tag from "@/components/shared/Tag";
import DetailModal from "@/components/shared/DetailModal";

const ProjectCard = ({ project }: { project: SoftwareProject }) => {
  const { t } = useLanguage();
  const screenshots = screenshotsForProject(project.id);
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const openProject = (event: MouseEvent<HTMLButtonElement>) => { returnFocus.current = event.currentTarget; setOpen(true); };
  const [selected, setSelected] = useState(0);
  const image = screenshots[selected];
  const links = <div className="flex flex-wrap items-center gap-4 text-sm">
    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-1.5 text-primary hover:underline"><Github className="h-4 w-4" aria-hidden />{t(" Repository")}</a>}
    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-1.5 text-primary hover:underline"><ExternalLink className="h-4 w-4" aria-hidden />{t(" Live demo")}</a>}
  </div>;
  return <>
    <article data-software-project={project.id} className="flex h-full flex-col overflow-hidden rounded-xl border border-primary/25 bg-background/95 transition-colors hover:border-primary/65 focus-within:border-primary">
      {screenshots[0] && <button type="button" onClick={openProject} aria-label={`${t("Explore project")}: ${t(project.name)}`} className="group relative block aspect-[3/2] w-full overflow-hidden border-b border-border bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
        <img src={screenshots[0].thumbnail} alt={t(screenshots[0].alt)} width={720} height={480} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        <span aria-hidden className="absolute bottom-3 right-3 rounded-lg border border-primary/40 bg-background/95 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground"><Maximize2 className="h-4 w-4" /></span>
      </button>}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <h3 className="flex items-center gap-3 text-xl font-bold">{project.category === "Automation" ? <Workflow className="h-6 w-6 shrink-0 text-primary" aria-hidden /> : <Code2 className="h-6 w-6 shrink-0 text-primary" aria-hidden />}{t(project.name)}</h3>
          <Tag variant="primary">{t(project.status)}</Tag>
        </header>
        <p className="reading-copy text-base leading-relaxed text-foreground/85">{t(project.description)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{project.stack.map(s => <Tag key={s}>{t(s)}</Tag>)}</div>
        {project.features && <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/90">{project.features.map(feature => <li key={feature} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /><span>{t(feature)}</span></li>)}</ul>}
        <div className="mt-auto pt-5">
          {!!screenshots.length && <button type="button" onClick={openProject} className="mb-3 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 font-semibold text-primary hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary"><Maximize2 className="h-4 w-4" aria-hidden />{t("Explore project")}</button>}
          <div className="border-t border-border pt-2">{links}</div>
        </div>
      </div>
    </article>
    <DetailModal returnFocusRef={returnFocus} open={open} onOpenChange={setOpen} title={project.name} subtitle="Screenshots & implementation" profile="development">
      {image && <>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t("Project screenshots")}>{screenshots.map((shot, index) => <button key={shot.id} type="button" onClick={() => setSelected(index)} aria-pressed={index === selected} className={`min-h-11 rounded-lg border px-3 py-2 text-sm ${index === selected ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/60"}`}>{t(shot.title)}</button>)}</div>
        <figure className="rounded-lg border border-border bg-secondary/40 p-2">
          <img src={image.src} alt={t(image.alt)} width={image.width} height={image.height} className="max-h-[60dvh] w-full object-contain" />
          <figcaption className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">{t("Actual interface captured from a local repository build.")}</figcaption>
        </figure>
      </>}
      <p className="reading-copy text-base leading-relaxed">{t(project.scope ?? project.description)}</p>
      {project.features && <div><h3 className="mb-3 font-semibold">{t("What I built")}</h3><ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{project.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul></div>}
      <div className="flex flex-wrap gap-2">{project.stack.map(item => <Tag key={item}>{item}</Tag>)}</div>
      {links}
      {project.previousRepo && <a href={project.previousRepo} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground underline underline-offset-4">{t("Previous version on GitHub")}<ExternalLink className="h-3 w-3" aria-hidden /></a>}
    </DetailModal>
  </>;
};

export default ProjectCard;
