import { useLanguage } from "@/i18n/LanguageProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ElectricalModule } from "@/data/electrical";

type ElectricalCurriculumProps = {
  relatedModuleIds?: string[];
  showSummary?: boolean;
  training: {
    title: string;
    provider: string;
    status: string;
    summary: string;
    modules: ElectricalModule[];
  };
};

const ElectricalCurriculum = ({ training, relatedModuleIds, showSummary = true }: ElectricalCurriculumProps) => {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6">
      {showSummary && <p className="reading-copy text-base leading-7 text-foreground/90">{t(training.summary)}</p>}
      <div className="panel overflow-hidden p-0">
        <Accordion type="multiple" className="w-full">
          {training.modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id} data-electrical-module={module.id} data-related-module={relatedModuleIds?.includes(module.id) || undefined} className="border-border px-3 last:border-b-0 sm:px-5">
              <AccordionTrigger className="gap-4 text-left hover:no-underline">
                <span className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="space-y-1 text-base font-semibold"><span className="block">{t(module.title)}</span>{relatedModuleIds?.includes(module.id) && <span className="block text-xs font-medium text-primary">{t("Related to this specialty")}</span>}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 pb-1 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="reading-copy flex gap-2 text-base leading-7 text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                      {t(topic)}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ElectricalCurriculum;
