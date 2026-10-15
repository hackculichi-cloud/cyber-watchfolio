import { useLanguage } from "@/i18n/LanguageProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ElectricalModule } from "@/data/electrical";

type ElectricalCurriculumProps = {
  training: {
    title: string;
    provider: string;
    status: string;
    summary: string;
    modules: ElectricalModule[];
  };
};

const ElectricalCurriculum = ({ training }: ElectricalCurriculumProps) => {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6">
      <p className="text-sm leading-relaxed text-muted-foreground">{t(training.summary)}</p>
      <div className="panel overflow-hidden p-0">
        <Accordion type="multiple" className="w-full">
          {training.modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id} className="border-border px-5 last:border-b-0">
              <AccordionTrigger className="gap-4 text-left hover:no-underline">
                <span className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs text-primary">{t(String(index + 1).padStart(2, "0"))}</span>
                  <span className="text-sm font-semibold">{t(module.title)}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2 pb-1 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
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