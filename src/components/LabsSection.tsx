import { useState } from "react";
import { playbooks } from "@/data/playbooks";
import PlaybookCard from "@/components/playbooks/PlaybookCard";
import PlaybookDetail from "@/components/playbooks/PlaybookDetail";
import DetailModal from "@/components/shared/DetailModal";

const LabsSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = playbooks.find((p) => p.id === openId) ?? null;

  return (
    <section id="labs" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">{">"} detection_playbooks</h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid gap-6 md:grid-cols-2">
          {playbooks.map((pb) => (
            <PlaybookCard key={pb.id} playbook={pb} onOpen={() => setOpenId(pb.id)} />
          ))}
        </div>

        <DetailModal
          open={!!active}
          onOpenChange={(o) => !o && setOpenId(null)}
          title={active?.name ?? ""}
          subtitle={active?.tags?.join(" · ")}
        >
          {active && <PlaybookDetail data={active} />}
        </DetailModal>
      </div>
    </section>
  );
};

export default LabsSection;
