import type { ReactNode } from "react";
import { Camera, CheckCircle2, ChevronDown, ClipboardList, Video } from "lucide-react";
import type { WorkProcessRecord } from "@/data/works";
import WorkImageGallery from "@/components/shared/WorkImageGallery";
import { useLanguage } from "@/i18n/LanguageProvider";

const timingLabels = {
  "Current condition": "Current photo or record",
  "Original record": "From the original work record",
  "Next session": "In a future documented session",
} as const;

/** One evidence-led process for electrical work and hands-on repairs. */
export default function WorkProcess({ documentedSteps, protocol, documentationNeeded, video }: WorkProcessRecord & { video?: ReactNode }) {
  const { t } = useLanguage();
  if (!documentedSteps?.length && !protocol?.length && !documentationNeeded?.length) return null;
  return <div data-work-process className="space-y-6">
    {documentedSteps?.length ? <section data-documented-steps className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t("Photographic process record")}</h4>
      <ol className="space-y-5">
        {documentedSteps.map((step, index) => {
          const hasPhotos = step.images?.some(image => image.src);
          const source = hasPhotos ? "photos" : step.video ? "video" : step.confirmed ? "confirmation" : "record";
          const Icon = hasPhotos ? Camera : step.video ? Video : CheckCircle2;
          return <li key={step.title} data-work-step data-step-source={source} className="min-w-0 border-l-2 border-primary/30 pl-3 sm:pl-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="text-base font-semibold leading-snug"><span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>{t(step.title)}</h5>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" aria-hidden />{t(hasPhotos ? "Photo evidence" : step.video ? "Video evidence" : step.confirmed ? "Confirmed by the author" : "No photo attached")}</span>
            </div>
            <p className="mb-3 mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.description)}</p>
            {hasPhotos && <WorkImageGallery images={step.images!} title={step.title} compact />}
            {step.video && video}
          </li>;
        })}
      </ol>
    </section> : null}

    {protocol?.length ? <section data-work-protocol className="rounded-lg border border-primary/30 bg-primary/5 p-4">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><ClipboardList className="h-4 w-4 shrink-0" aria-hidden />{t("Work protocol")}</h4>
      <p className="mb-3 mt-2 text-xs leading-relaxed text-muted-foreground">{t("Reference checklist. Performed actions and recorded results are described in the process above.")}</p>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {protocol.map(entry => <li key={entry} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{t(entry)}</span></li>)}
      </ul>
    </section> : null}

    {documentationNeeded?.length ? <details data-pending-documentation className="group rounded-lg border border-border bg-surface/40">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg p-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Camera className="h-4 w-4 shrink-0 text-primary" aria-hidden />{t("Documentation to complete")}
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">{documentationNeeded.length}</span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="space-y-4 px-4 pb-4">
        <p className="text-xs leading-relaxed text-muted-foreground">{t("A new photo records the current condition. Earlier stages need original records; completed work does not need reopening just for photos.")}</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {documentationNeeded.map(gap => <li key={gap.title} data-documentation-gap data-capture-timing={gap.timing} className="min-w-0 rounded-lg border border-border p-3">
            <p className="text-[11px] font-semibold text-primary">{t(timingLabels[gap.timing])}</p>
            <h5 className="mt-1 text-sm font-semibold">{t(gap.title)}</h5>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(gap.description)}</p>
          </li>)}
        </ul>
      </div>
    </details> : null}
  </div>;
}
