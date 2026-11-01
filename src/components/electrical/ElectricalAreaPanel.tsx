import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FolderOpen, Images } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { electricalDetailHashes, isElectricalSharedHash } from "@/data/electricalNavigation";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalEvidence } from "@/data/electricalProjects";
import SectionHeading from "@/components/shared/SectionHeading";
import ElectricalPracticeGroups from "./ElectricalPracticeGroups";
import ElectricalEvidenceGallery from "./ElectricalEvidenceGallery";

const tabs = [
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "evidence", label: "Completed work", icon: Images },
] as const;
const sectionTab = (hash: string) => {
  const id = hash.slice(1);
  if (["overview", "skills", "practice"].includes(id)) return "projects";
  return tabs.some(tab => tab.id === id) ? id : "projects";
};

/** One area at a time; courses and original photographs are opened intentionally. */
export default function ElectricalAreaPanel({ area }: { area: string }) {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(() => sectionTab(hash));
  const groupId = area === "electrical-control" ? "control" : area;
  const group = electricalPracticeGroups.find(item => item.id === groupId)!;
  const projectIds = new Set(group.categories.flatMap(item => item.projectIds));
  const photos = electricalEvidence.filter(item => projectIds.has(item.projectId));
  const openTab = (value: string) => {
    setTab(value);
    navigate({ hash: `#${value}` }, { replace: true });
  };

  useEffect(() => {
    const target = hash.slice(1);
    if (target === area || electricalDetailHashes.has(target)) setTab(sectionTab(hash));
  }, [hash, area]);
  useEffect(() => {
    const target = hash.slice(1);
    if (!electricalDetailHashes.has(target)) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionTab(hash))?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, tab]);

  return <div data-electrical-area-content={area} className="mt-6 border-t border-primary/20 pt-5">
    <Tabs value={tab} onValueChange={openTab}>
      <TabsList aria-label={`${t("Explore this area")}: ${t(group.title)}`} className="sticky top-44 z-20 grid h-auto w-full grid-cols-2 sm:top-40 gap-1 rounded-xl border border-primary/20 bg-background p-1">
        {tabs.map(item => <TabsTrigger key={item.id} value={item.id} data-area-tab={item.id} onClick={() => { if (tab === item.id && isElectricalSharedHash(hash.slice(1))) openTab(item.id); }} className="menu-choice min-h-11 min-w-0 flex-col gap-1 whitespace-normal px-1 text-sm font-semibold sm:flex-row sm:gap-2 sm:px-3 data-[state=active]:bg-primary/15 data-[state=active]:text-primary"><item.icon className="h-4 w-4 shrink-0" aria-hidden /><span className="max-w-full break-words">{t(item.label)}</span></TabsTrigger>)}
      </TabsList>
      <TabsContent value="projects">
        <section id="projects" className="scroll-mt-32 px-1 py-6 sm:px-4">
          <span id="practice" className="scroll-mt-32" />
          <SectionHeading eyebrow={t("Projects")} title={t("Course practice & residential work")} description={t("Choose a work type to explore its practices and original photographs.")} />
          <ElectricalPracticeGroups key={groupId} areaId={groupId} />
        </section>
      </TabsContent>
      <TabsContent value="evidence">
        <section id="evidence" className="scroll-mt-32 px-1 py-6 sm:px-4">
          <SectionHeading eyebrow={t("Work & practical experience")} title={t("Installations, wiring & measurements")} description={t("Real photographs from course practice and residential client maintenance.")} />
          {photos.length ? <ElectricalEvidenceGallery items={photos} /> : <p className="rounded-lg border border-dashed border-primary/25 p-5 text-sm text-muted-foreground">{t("No completed practices documented in this category yet. Training topics are listed with their courses and certificates.")}</p>}
        </section>
      </TabsContent>
    </Tabs>
  </div>;
}
