import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import ProjectCard from "@/components/cards/ProjectCard";
import EmptyState from "@/components/shared/EmptyState";
import { softwareProjects } from "@/data/softwareProjects";
import { softwareSkills } from "@/data/skills";
import { site } from "@/data/site";

const SoftwareDevelopment = () => {
  const projects = softwareProjects.filter((p) => p.category === "Software" || p.category === "Automation");

  return (
    <>
      <Seo
        title={`Software Development | ${site.shortName}`}
        description="Web development, APIs and automation projects built with a maintainable, version-controlled workflow."
        path="/software-development"
      />
      <PageHeader
        eyebrow="Technology"
        title="Software Development"
        description="Web development, APIs, backend logic and automation — built to be readable, maintainable and version controlled."
      />

      <section className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="Stack & practices" title="How I build" />
        <div className="grid gap-4 md:grid-cols-2">
          {softwareSkills.map((group) => (
            <div key={group.title} className="panel-glow hover:-translate-y-1">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Projects" title="Development projects" />
          {projects.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No development projects published yet"
              description="Projects appear here as soon as they are added to the projects data file."
            />
          )}
        </div>
      </section>
    </>
  );
};

export default SoftwareDevelopment;
