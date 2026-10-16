import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import ProfileCertificates from "@/components/profile/ProfileCertificates";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useState } from "react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import DetailModal from "@/components/shared/DetailModal";
import EmptyState from "@/components/shared/EmptyState";
import Gallery from "@/components/shared/Gallery";
import LabCard from "@/components/cards/LabCard";
import InvestigationCard from "@/components/investigations/InvestigationCard";
import InvestigationDetail from "@/components/investigations/InvestigationDetail";
import PlaybookCard from "@/components/playbooks/PlaybookCard";
import PlaybookDetail from "@/components/playbooks/PlaybookDetail";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import { investigations } from "@/data/investigations";
import { playbooks } from "@/data/playbooks";
import { labs } from "@/data/labs";
import { cybersecuritySkills } from "@/data/skills";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import WorkGrid from "@/components/work/WorkGrid";
import { worksFor } from "@/data/works";
import { site } from "@/data/site";
import { Github, Terminal } from "lucide-react";

const profile = profileBySlug("cybersecurity");

const Cybersecurity = () => {
  const { t } = useLanguage();
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [playbookId, setPlaybookId] = useState<string | null>(null);

  const incident = investigations.find((i) => i.id === incidentId) ?? null;
  const playbook = playbooks.find((p) => p.id === playbookId) ?? null;

  return (
    <>
      <Seo
        title={t(`Cybersecurity | ${site.shortName}`)}
        description={t("Blue-team focused cybersecurity work: SOC fundamentals, detection playbooks and documented incident investigations.")}
        path="/cybersecurity"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#investigations">{t("View investigations")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#labs">{t("Security labs")}</a>
        </Button>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <SpecialtyExplorer profile={profile.slug} />

      <ProfileCapabilities profile={profile.slug} />

      <section id="skills" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Skills")} title={t("What I am building competence in")} />
          <div className="grid gap-4 md:grid-cols-3">
            {cybersecuritySkills.map((group) => (
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

      <section id="investigations" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug} mascotScene="action"
          eyebrow={t("Investigations")}
          title={t("Incident investigations")}
          description={t("Each case follows the same structure: summary, detection, analysis, evidence, outcome and lessons learned.")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {investigations.map((inc) => (
            <InvestigationCard key={inc.id} investigation={inc} onOpen={() => setIncidentId(inc.id)} />
          ))}
        </div>
      </section>

      <section id="playbooks" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Playbooks")}
            title={t("Detection playbooks")}
            description={t("Repeatable investigation workflows with objective, prerequisites, steps and expected outcomes.")}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {playbooks.map((pb) => (
              <PlaybookCard key={pb.id} playbook={pb} onOpen={() => setPlaybookId(pb.id)} />
            ))}
          </div>
        </div>
      </section>

      <section id="labs" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Labs")}
          title={t("Security labs & CTFs")}
          description={t("Hands-on practice environments with objective, tooling, difficulty and outcome.")}
        />
        {labs.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t("Labs are being documented")}
            description={t("Completed labs will be published here with objective, technologies, difficulty and results.")}
          />
        )}
      </section>

      <section id="projects" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Projects")}
            title={t("Security projects & write-ups")}
            description={t("Visual project cards with objective, environment, tooling, evidence screenshots and results.")}
          />
          <WorkGrid
            items={worksFor("cybersecurity")}
            emptyTitle={t("Security projects coming soon")}
            emptyDescription={t("Each slot becomes a project card with lab screenshots, tooling, results and a write-up link.")}
          />
        </div>
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Gallery")} title={t("Lab & tooling screenshots")} />
          <Gallery
            items={galleryFor("cybersecurity")}
            emptyTitle={t("No screenshots published yet")}
            emptyDescription={t("Add lab screenshots or dashboards to the gallery data file and they appear here.")}
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading mascot={profile.slug} mascotScene="detail" eyebrow={t("Tools")} title={t("Tooling I work with")}><ProfileTools groups={toolsByProfile.cybersecurity} profile={profile.slug} /></SectionHeading>
        <article data-complementary-code className="mt-6 rounded-xl border border-primary/30 bg-card p-5 sm:p-6">
          <h3 className="flex items-center gap-3 text-xl font-bold"><Terminal className="h-6 w-6 shrink-0 text-primary" aria-hidden />{t("Code that supports my learning")}</h3>
          <p className="reading-copy mt-3 max-w-3xl text-base leading-relaxed text-foreground/85">{t("Culichi-Metrics is my Python project for Excel KPI reports. It adds scripting and data-handling practice alongside my educational SOC investigations and Linux studies.")}</p>
          <a href="https://github.com/ByCulichi/Culichi-Metrics" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4"><Github className="h-5 w-5" aria-hidden />Culichi-Metrics</a>
        </article>
      </section>

      <ProfileCertificates profile={profile.slug} />
      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
        </div>
      </section>

      <DetailModal
        open={!!incident}
        onOpenChange={(o) => !o && setIncidentId(null)}
        title={t(incident?.title ?? "")}
        subtitle={t(incident ? `${incident.caseInfo.caseId} · ${incident.caseInfo.date ?? ""}` : "")}
      >
        {incident && <InvestigationDetail data={incident} />}
      </DetailModal>

      <DetailModal
        open={!!playbook}
        onOpenChange={(o) => !o && setPlaybookId(null)}
        title={t(playbook?.name ?? "")}
        subtitle={t(playbook?.tags?.join(" · "))}
      >
        {playbook && <PlaybookDetail data={playbook} />}
      </DetailModal>
    </>
  );
};

export default Cybersecurity;
