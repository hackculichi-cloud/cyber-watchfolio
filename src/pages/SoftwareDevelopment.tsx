import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import ProfileCertificates from "@/components/profile/ProfileCertificates";
import InstitutionLink from "@/components/profile/InstitutionLink";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import SoftwareProjectCollection from "@/components/profile/SoftwareProjectCollection";
import Gallery from "@/components/shared/Gallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { softwareSkills } from "@/data/skills";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

const profile = profileBySlug("development");

const SoftwareDevelopment = () => {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t(`Software Development | ${site.shortName}`)}
        description={t("Web development, APIs and automation projects built with a maintainable, version-controlled workflow.")}
        path="/software-development"
      />
      <ProfileHero profile={profile}>
        <Button asChild><a href="#projects">{t("Explore my projects")}</a></Button>
        <Button asChild variant="outline">
          <a href={site.github} target="_blank" rel="noreferrer noopener">
            <Github className="h-4 w-4" /> {t(site.githubHandle)}
          </a>
        </Button>
        <InstitutionLink profile="development" />
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <section id="projects" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug} mascotScene="action"
          eyebrow={t("Projects")}
          title={t("Two projects that show how I build")}
          description={t("Ronny’s Food Truck and this portfolio: working interfaces, source code and the decisions behind each project.")}
        />
        <SoftwareProjectCollection />
      </section>

      <SpecialtyExplorer profile={profile.slug} />

      <ProfileCapabilities profile={profile.slug} />

      <section id="skills" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Skills")} title={t("Stack & practices")} />
          <div className="grid gap-4 md:grid-cols-2">
            {softwareSkills.map((group) => (
              <div key={group.title} className="panel-glow hover:-translate-y-1">
                <h3 className="text-sm font-semibold">{t(group.title)}</h3>
                {group.note && <p className="reading-copy mt-2 text-sm leading-relaxed text-muted-foreground">{t(group.note)}</p>}
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

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Gallery")} title={t("Screenshots & interfaces")} />
          <Gallery
            items={galleryFor("development")}
            emptyTitle={t("No screenshots published yet")}
            emptyDescription={t("Original project screenshots will appear here when available.")}
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading mascot={profile.slug} mascotScene="detail" eyebrow={t("Tools")} title={t("Tooling I work with")}><ProfileTools groups={toolsByProfile.development} profile={profile.slug} /></SectionHeading>
      </section>

      <ProfileCertificates profile={profile.slug} />
      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
        </div>
      </section>
    </>
  );
};

export default SoftwareDevelopment;
