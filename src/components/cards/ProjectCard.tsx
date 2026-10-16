import { useLanguage } from "@/i18n/LanguageProvider";
import { ExternalLink, Github, Code2, Workflow } from "lucide-react";
import type { SoftwareProject } from "@/data/softwareProjects";
import Tag from "@/components/shared/Tag";

const ProjectCard = ({ project }: { project: SoftwareProject }) => {
  const { t } = useLanguage();
  return (
    <article data-software-project={project.id} className="panel-glow flex h-full flex-col hover:-translate-y-1">
      <header className="mb-3 flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-3 text-xl font-bold">{project.category === "Automation" ? <Workflow className="h-6 w-6 shrink-0 text-primary" aria-hidden /> : <Code2 className="h-6 w-6 shrink-0 text-primary" aria-hidden />}{t(project.name)}</h3>
        <Tag variant="primary">{t(project.status)}</Tag>
      </header>

      <p className="reading-copy text-base leading-relaxed text-foreground/85">{t(project.description)}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{t(s)}</Tag>
        ))}
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <Github className="h-3.5 w-3.5" />{t(" Repository")}</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <ExternalLink className="h-3.5 w-3.5" />{t(" Live demo")}</a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
