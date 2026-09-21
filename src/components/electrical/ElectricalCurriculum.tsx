import { BookOpen, CheckCircle2, Layers3 } from "lucide-react";
import Tag from "@/components/shared/Tag";
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

const ElectricalCurriculum = ({ training }: ElectricalCurriculumProps) => (
  <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
    <div className="panel-glow h-fit">
      <div className="flex items-center gap-2 text-primary">
        <BookOpen className="h-5 w-5" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.16em]">Course summary</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{training.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{training.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Tag variant="primary">{training.provider}</Tag>
        <Tag variant="accent">
          <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden /> {training.status}
        </Tag>
        <Tag>
          <Layers3 className="mr-1 h-3 w-3" aria-hidden /> {training.modules.length} modules
        </Tag>
      </div>
    </div>

    <div className="panel overflow-hidden p-0">
      <Accordion type="multiple" className="w-full">
        {training.modules.map((module, index) => (
          <AccordionItem key={module.id} value={module.id} className="border-border px-5 last:border-b-0">
            <AccordionTrigger className="gap-4 text-left hover:no-underline">
              <span className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold">{module.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-2 pb-1 sm:grid-cols-2">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    {topic}
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

export default ElectricalCurriculum;