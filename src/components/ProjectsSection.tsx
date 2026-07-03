import { useState } from "react";
import { investigations } from "@/data/investigations";
import InvestigationCard from "@/components/investigations/InvestigationCard";
import InvestigationDetail from "@/components/investigations/InvestigationDetail";
import DetailModal from "@/components/shared/DetailModal";

const ProjectsSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = investigations.find((i) => i.id === openId) ?? null;

  return (
    <section id="projects" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">{">"} security_incidents</h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid gap-6 md:grid-cols-2">
          {investigations.map((inc) => (
            <InvestigationCard key={inc.id} investigation={inc} onOpen={() => setOpenId(inc.id)} />
          ))}
        </div>

        <DetailModal
          open={!!active}
          onOpenChange={(o) => !o && setOpenId(null)}
          title={active?.title ?? ""}
          subtitle={active ? `${active.caseInfo.caseId} · ${active.caseInfo.date ?? ""}` : ""}
        >
          {active && <InvestigationDetail data={active} />}
        </DetailModal>
      </div>
    </section>
  );
};

export default ProjectsSection;
