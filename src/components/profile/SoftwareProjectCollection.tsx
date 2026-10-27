import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { softwareProjects } from "@/data/softwareProjects";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function SoftwareProjectCollection() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  return <div data-software-projects>
    <div id="software-repositories" className="grid gap-5 md:grid-cols-2">
      {(expanded ? softwareProjects : softwareProjects.slice(0, 2)).map(project => <ProjectCard key={project.id} project={project} />)}
    </div>
    <button type="button" aria-controls="software-repositories" aria-expanded={expanded} onClick={() => setExpanded(value => !value)} className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-5 py-3 font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">
      {expanded ? t("Show featured projects") : t("Explore all {count} projects").replace("{count}", String(softwareProjects.length))}<ChevronDown className={`h-5 w-5 ${expanded ? "rotate-180" : ""}`} aria-hidden />
    </button>
  </div>;
}
