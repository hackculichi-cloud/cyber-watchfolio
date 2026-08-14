import { ExternalLink, Github } from "lucide-react";
import type { SoftwareProject } from "@/data/softwareProjects";
import Tag from "@/components/shared/Tag";

const ProjectCard = ({ project }: { project: SoftwareProject }) => (
  <article className="panel-glow flex h-full flex-col hover:-translate-y-1">
    <header className="mb-3 flex items-start justify-between gap-3">
      <h3 className="text-base font-semibold">{project.name}</h3>
      <Tag variant="primary">{project.status}</Tag>
    </header>

    <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

    <div className="mt-4 flex flex-wrap gap-1.5">
      {project.stack.map((s) => (
        <Tag key={s}>{s}</Tag>
      ))}
    </div>

    {(project.repo || project.demo) && (
      <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <Github className="h-3.5 w-3.5" /> Repository
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <ExternalLink className="h-3.5 w-3.5" /> Live demo
          </a>
        )}
      </div>
    )}
  </article>
);

export default ProjectCard;
