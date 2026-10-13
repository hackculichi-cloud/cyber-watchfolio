import { useLanguage } from "@/i18n/LanguageProvider";
import { Github } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import ProjectCard from "@/components/cards/ProjectCard";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { softwareProjects } from "@/data/softwareProjects";
import { site } from "@/data/site";

const Projects = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t(`Projects | ${site.shortName}`)}
        description={t("Technical projects across software development, security and automation, with repositories and current status.")}
        path="/projects"
      />
      <PageHeader
        eyebrow={t("Technology")}
        title={t("Projects")}
        description={t("Technical projects across software, security and automation — with an honest status for each one.")}
      >
        <Button asChild variant="outline">
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            <Github className="h-4 w-4" /> {t(site.githubHandle)}
          </a>
        </Button>
      </PageHeader>

      <section className="container mx-auto px-4 py-16">
        {softwareProjects.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {softwareProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState title={t("No projects published yet")} description={t("Add an entry to the projects data file and it appears here automatically.")} />
        )}
      </section>
    </>
  );
};

export default Projects;
