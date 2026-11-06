import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import { electricalDetailHashes } from "@/data/electricalNavigation";
import SectionHeading from "@/components/shared/SectionHeading";
import ElectricalPracticeGroups from "./ElectricalPracticeGroups";

/** One collection per specialty; legacy project/photo links open the same cases. */
export default function ElectricalAreaPanel({ area }: { area: string }) {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const groupId = area === "electrical-control" ? "control" : area;
  useEffect(() => {
    if (!electricalDetailHashes.has(hash.slice(1))) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, area]);

  return <div data-electrical-area-content={area} className="mt-6 border-t border-primary/20 pt-5">
    <section id="projects" className="scroll-mt-48 px-1 py-4 sm:px-4">
      <span id="practice" aria-hidden="true" className="block scroll-mt-48" />
      <span id="evidence" aria-hidden="true" className="block scroll-mt-48" />
      <div className="text-center [&_p]:mx-auto"><SectionHeading title={t("Work & practice")} description={t("Choose a job to see its photographs.")} /></div>
      <ElectricalPracticeGroups key={groupId} areaId={groupId} />
    </section>
  </div>;
}
