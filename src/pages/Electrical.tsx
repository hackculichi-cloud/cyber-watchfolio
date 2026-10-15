import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import ElectricalTrainingCertificates from "@/components/electrical/ElectricalTrainingCertificates";
import ElectricalPracticeGroups from "@/components/electrical/ElectricalPracticeGroups";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import ElectricalEvidenceGallery from "@/components/electrical/ElectricalEvidenceGallery";
import { Button } from "@/components/ui/button";
import {
  electricalSkills,
  electricalToolGroups,
} from "@/data/electrical";
import { electricalEvidence } from "@/data/electricalProjects";
import { profileBySlug } from "@/data/profiles";
import { site } from "@/data/site";

const profile = profileBySlug("electrical");

const Electrical = () => {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t(`Residential & Industrial Electrical Maintenance | ${site.shortName}`)}
        description={t("Electrical maintenance training, float-switch course exercises and real residential client work: outlet, switch and ceiling luminaire replacement.")}
        path="/electrical"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#projects">{t("View projects")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#tracks">{t("My training")}</a>
        </Button>
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electronics" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Electronics profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Technical repair profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <SpecialtyExplorer profile={profile.slug} />

      <ProfileCapabilities profile={profile.slug} />

      <ElectricalTrainingCertificates />

      <section id="skills" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Practical skills")}
          title={t("Electrical skills studied and practiced")}
          description={t("Foundation-level measurement, analysis and diagnostic activities developed through training and hands-on exercises.")}
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {electricalSkills.map((skill, index) => (
            <li key={skill} className="panel flex min-h-24 flex-col justify-between p-4">
              <span className="font-mono text-xs text-primary">{t(String(index + 1).padStart(2, "0"))}</span>
              <span className="mt-4 text-sm font-medium">{t(skill)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Projects")}
            title={t("Course practice & residential work")}
            description={t("Real photographs and video documenting float-switch training, outlet and switch replacement, and two replacement ceiling luminaires.")}
          />
          <span id="practice" className="scroll-mt-32" />
          <p className="mb-6 text-sm text-muted-foreground">{t("Choose an area, then a work type to explore each practice and its own photographs.")}</p>
          <ElectricalPracticeGroups />
        </div>
      </section>

      <section id="evidence" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Practical work / Evidence")}
          title={t("Installations, wiring & measurements")}
          description={t("Real photographs from course practice and residential client maintenance.")}
        />
        <ElectricalEvidenceGallery items={electricalEvidence} />
      </section>

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} mascotScene="detail" mascotWide
            eyebrow={t("Tools & equipment")}
            title={t("Equipment used in training and practice")}
            description={t("Measurement, installation, workshop and safety equipment used while developing electrical fundamentals.")}
          ><ProfileTools groups={electricalToolGroups} profile={profile.slug} /></SectionHeading>
        </div>
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
        </div>
      </section>
    </>
  );
};

export default Electrical;
