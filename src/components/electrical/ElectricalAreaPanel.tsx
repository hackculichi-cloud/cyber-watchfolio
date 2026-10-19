import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, FolderOpen, Images, Award, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { electricalDetailHashes } from "@/data/electricalNavigation";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalEvidence } from "@/data/electricalProjects";
import { electricalSkills, electricalToolGroups } from "@/data/electrical";
import { profileCapabilities } from "@/data/profileCapabilities";
import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileTools from "@/components/profile/ProfileTools";
import ElectricalPracticeGroups from "./ElectricalPracticeGroups";
import ElectricalEvidenceGallery from "./ElectricalEvidenceGallery";
import ElectricalTrainingCertificates from "./ElectricalTrainingCertificates";
import ElectricalAreaLearning from "./ElectricalAreaLearning";

const tabs = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "evidence", label: "Completed work", icon: Images },
  { id: "certificate", label: "Certifications", icon: Award },
  { id: "tools", label: "Tools", icon: Wrench },
] as const;
const sectionTab = (hash: string) => {
  const id = hash.slice(1);
  if (id === "tracks" || id === "certifications") return "certificate";
  if (id === "skills") return "overview";
  if (id === "practice") return "projects";
  return tabs.some(tab => tab.id === id) ? id : "overview";
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
  const capabilityIndices = area === "residential" ? [0, 1, 2] : area === "industrial" ? [0, 2, 3, 4] : [0, 2, 3];
  const capabilities = profileCapabilities.electrical?.filter((_, index) => capabilityIndices.includes(index));
  const openTab = (value: string) => { setTab(value); navigate({ hash: `#${value}` }, { replace: true }); };

  useEffect(() => { setTab(sectionTab(hash)); }, [hash]);
  useEffect(() => {
    const target = hash.slice(1);
    if (!electricalDetailHashes.has(target)) return;
    const frame = requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: "start", behavior: "auto" }));
    return () => cancelAnimationFrame(frame);
  }, [hash, tab]);

  return <div data-electrical-area-content={area} className="mt-6 border-t border-primary/20 pt-5">
    <Tabs value={tab} onValueChange={openTab}>
      <TabsList aria-label={`${t("Explore this area")}: ${t(group.title)}`} className="sticky top-44 z-20 grid h-auto w-full grid-cols-2 sm:top-40 gap-1 rounded-xl border border-primary/20 bg-background/90 p-1 min-[440px]:grid-cols-3 lg:grid-cols-5">
        {tabs.map(item => <TabsTrigger key={item.id} value={item.id} data-area-tab={item.id} className="min-h-11 gap-2 whitespace-normal text-sm data-[state=active]:bg-primary/15 data-[state=active]:text-primary"><item.icon className="h-4 w-4 shrink-0" aria-hidden />{t(item.label)}</TabsTrigger>)}
      </TabsList>
      <TabsContent value="overview">
        <ProfileCapabilities profile="electrical" entries={capabilities} />
        <ElectricalAreaLearning area={area} onOpen={openTab} />
        <section id="skills" className="scroll-mt-32 px-4 pb-6">
          <h4 className="text-lg font-semibold">{t("Electrical skills studied and practiced")}</h4>
          <ul className="mt-4 flex flex-wrap gap-2">{electricalSkills.map(skill => <li key={skill} className="rounded-md border border-primary/20 bg-background/70 px-3 py-2 text-sm">{t(skill)}</li>)}</ul>
        </section>
      </TabsContent>
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
      <TabsContent value="certificate"><ElectricalTrainingCertificates /></TabsContent>
      <TabsContent value="tools">
        <section id="tools" className="scroll-mt-32 px-1 py-6 sm:px-4">
          <SectionHeading mascot="electrical" mascotScene="detail" mascotWide eyebrow={t("Tools & equipment")} title={t("Equipment used in training and practice")} description={t("Measurement, installation, workshop and safety equipment used while developing electrical fundamentals.")}>
            <ProfileTools groups={electricalToolGroups} profile="electrical" />
          </SectionHeading>
        </section>
      </TabsContent>
    </Tabs>
  </div>;
}
