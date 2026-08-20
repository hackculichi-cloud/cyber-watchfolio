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

const profile = profileBySlug("cybersecurity");

const Cybersecurity = () => {
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [playbookId, setPlaybookId] = useState<string | null>(null);

  const incident = investigations.find((i) => i.id === incidentId) ?? null;
  const playbook = playbooks.find((p) => p.id === playbookId) ?? null;

  return (
    <>
      <Seo
        title={`Cybersecurity | ${site.shortName}`}
        description="Blue-team focused cybersecurity work: SOC fundamentals, detection playbooks and documented incident investigations."
        path="/cybersecurity"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#investigations">View investigations</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#labs">Security labs</a>
        </Button>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Overview"
          title="SOC / Blue Team direction"
          description="Security fundamentals, networking and Linux, monitoring and detection, and investigations documented end to end."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Detect", body: "Log sources, SIEM search and alert triage on realistic detection scenarios.", tag: "Focus" },
            { title: "Investigate", body: "Structured analysis: evidence, IOCs, MITRE mapping and verdicts.", tag: "Focus" },
            { title: "Document", body: "Repeatable playbooks and write-ups so the process is reproducible.", tag: "Focus" },
          ].map((c) => (
            <div key={c.title} className="panel-glow hover:-translate-y-1">
              <Tag variant="primary">{c.tag}</Tag>
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Skills" title="What I am building competence in" />
          <div className="grid gap-4 md:grid-cols-3">
            {cybersecuritySkills.map((group) => (
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
        </div>
      </section>

      <section id="investigations" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Investigations"
          title="Incident investigations"
          description="Each case follows the same structure: summary, detection, analysis, evidence, outcome and lessons learned."
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
            eyebrow="Playbooks"
            title="Detection playbooks"
            description="Repeatable investigation workflows with objective, prerequisites, steps and expected outcomes."
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
          eyebrow="Labs"
          title="Security labs & CTFs"
          description="Hands-on practice environments with objective, tooling, difficulty and outcome."
        />
        {labs.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Labs are being documented"
            description="Completed labs will be published here with objective, technologies, difficulty and results."
          />
        )}
      </section>

      <section id="projects" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Projects"
            title="Security projects & write-ups"
            description="Visual project cards with objective, environment, tooling, evidence screenshots and results."
          />
          <WorkGrid
            items={worksFor("cybersecurity")}
            emptyTitle="Security projects coming soon"
            emptyDescription="Each slot becomes a project card with lab screenshots, tooling, results and a write-up link."
          />
        </div>
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Gallery" title="Lab & tooling screenshots" />
          <Gallery
            items={galleryFor("cybersecurity")}
            emptyTitle="No screenshots published yet"
            emptyDescription="Add lab screenshots or dashboards to the gallery data file and they appear here."
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow="Tools" title="Tooling I work with" />
        <ProfileTools groups={toolsByProfile.cybersecurity} />
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="CV" title="CV for this profile" />
          <ProfileCvBlock cvIds={profile.cvIds} />
        </div>
      </section>

      <DetailModal
        open={!!incident}
        onOpenChange={(o) => !o && setIncidentId(null)}
        title={incident?.title ?? ""}
        subtitle={incident ? `${incident.caseInfo.caseId} · ${incident.caseInfo.date ?? ""}` : ""}
      >
        {incident && <InvestigationDetail data={incident} />}
      </DetailModal>

      <DetailModal
        open={!!playbook}
        onOpenChange={(o) => !o && setPlaybookId(null)}
        title={playbook?.name ?? ""}
        subtitle={playbook?.tags?.join(" · ")}
      >
        {playbook && <PlaybookDetail data={playbook} />}
      </DetailModal>
    </>
  );
};

export default Cybersecurity;
