import { useLanguage } from "@/i18n/LanguageProvider";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import ProjectCard from "@/components/cards/ProjectCard";
import EmptyState from "@/components/shared/EmptyState";
import Gallery from "@/components/shared/Gallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { softwareProjects } from "@/data/softwareProjects";
import { softwareSkills } from "@/data/skills";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import WorkGrid from "@/components/work/WorkGrid";
import { worksFor } from "@/data/works";
import { site } from "@/data/site";

const profile = profileBySlug("development");

const SoftwareDevelopment = () => {
  const { t } = useLanguage();
  const projects = softwareProjects.filter((p) => p.category === "Software" || p.category === "Automation");

  return (
    <>
      <Seo
        title={t(`Software Development | ${site.shortName}`)}
        description={t("Web development, APIs and automation projects built with a maintainable, version-controlled workflow.")}
        path="/software-development"
      />
      <ProfileHero profile={profile}>
        <Button asChild variant="outline">
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            <Github className="h-4 w-4" /> {t(site.githubHandle)}
          </a>
        </Button>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Overview")}
          title={t("How I build")}
          description={t("Readable code, small reusable components, and everything version controlled on GitHub.")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Web", body: "React and TypeScript interfaces with a consistent design system.", tag: "Focus" },
            { title: "APIs & backend", body: "Practical API and backend work with clear data models.", tag: "Focus" },
            { title: "Automation", body: "Scripts and tooling that remove repetitive manual work.", tag: "Focus" },
          ].map((c) => (
            <div key={c.title} className="panel-glow hover:-translate-y-1">
              <Tag variant="primary">{t(c.tag)}</Tag>
              <h3 className="mt-3 text-base font-semibold">{t(c.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(c.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Skills")} title={t("Stack & practices")} />
          <div className="grid gap-4 md:grid-cols-2">
            {softwareSkills.map((group) => (
              <div key={group.title} className="panel-glow hover:-translate-y-1">
                <h3 className="text-sm font-semibold">{t(group.title)}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <Tag key={s}>{t(s)}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Projects")}
          title={t("Development projects")}
          description={t("Image-first project cards: screenshots, stack, live demo, repository and what I learned.")}
        />
        <WorkGrid
          items={worksFor("development")}
          emptyTitle={t("Screenshots coming soon")}
          emptyDescription={t("Each slot becomes a project card with real screenshots, stack, demo link and takeaways.")}
        />

        {projects.length ? (
          <>
            <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("Repositories")}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title={t("No development projects published yet")}
            description={t("Projects appear here as soon as they are added to the projects data file.")}
          />
        )}
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Gallery")} title={t("Screenshots & interfaces")} />
          <Gallery
            items={galleryFor("development")}
            emptyTitle={t("No screenshots published yet")}
            emptyDescription={t("Add project screenshots to the gallery data file and they appear here automatically.")}
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow={t("Tools")} title={t("Tooling I work with")} />
        <ProfileTools groups={toolsByProfile.development} />
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("CV")} title={t("CV for this profile")} />
          <ProfileCvBlock cvIds={profile.cvIds} />
        </div>
      </section>
    </>
  );
};

export default SoftwareDevelopment;
