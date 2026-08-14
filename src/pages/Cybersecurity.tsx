import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import DetailModal from "@/components/shared/DetailModal";
import InvestigationCard from "@/components/investigations/InvestigationCard";
import InvestigationDetail from "@/components/investigations/InvestigationDetail";
import PlaybookCard from "@/components/playbooks/PlaybookCard";
import PlaybookDetail from "@/components/playbooks/PlaybookDetail";
import { investigations } from "@/data/investigations";
import { playbooks } from "@/data/playbooks";
import { cybersecuritySkills } from "@/data/skills";
import { site } from "@/data/site";

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
      <PageHeader
        eyebrow="Technology"
        title="Cybersecurity"
        description="Blue-team oriented work: security fundamentals, monitoring and detection, and structured investigations documented end to end."
      />

      <section className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="Focus areas" title="What I am building competence in" />
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
      </section>

      <section className="border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            id="investigations"
            eyebrow="Investigations"
            title="Incident investigations"
            description="Each case follows the same structure: summary, detection, analysis, evidence, outcome and lessons learned."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {investigations.map((inc) => (
              <InvestigationCard key={inc.id} investigation={inc} onOpen={() => setIncidentId(inc.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          id="playbooks"
          eyebrow="Playbooks"
          title="Detection playbooks"
          description="Repeatable investigation workflows with objective, prerequisites, steps and expected outcomes."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {playbooks.map((pb) => (
            <PlaybookCard key={pb.id} playbook={pb} onOpen={() => setPlaybookId(pb.id)} />
          ))}
        </div>

        <Link to="/labs" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          See security labs <ArrowRight className="h-3.5 w-3.5" />
        </Link>
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
