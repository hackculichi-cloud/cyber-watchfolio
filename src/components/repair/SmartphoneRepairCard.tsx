import { useLanguage } from "@/i18n/LanguageProvider";
import WorkImageGallery from "@/components/shared/WorkImageGallery";
import type { SmartphoneRepair } from "@/data/smartphoneRepair";
import WorkProcess from "@/components/work/WorkProcess";

/**
 * Reusable documented smartphone repair card.
 * Confirmed case data and its process record render without per-device UI changes.
 * The same component works for future laptop/console cases.
 */
const SmartphoneRepairCard = ({ repair }: { repair: SmartphoneRepair }) => {
  const { t } = useLanguage();
  const photos = repair.photos ?? [repair.before, repair.during, repair.after, ...(repair.evidence ?? [])].filter((image) => image !== undefined);

  const facts: { label: string; value?: string | string[] }[] = [
    { label: "Device model", value: repair.device },
    { label: "Repair record", value: repair.ref },
    { label: "Date", value: repair.date },
    { label: "Issue", value: repair.issue ?? "Reported symptom not documented." },
    { label: "Initial inspection", value: repair.initialInspection ?? "Initial inspection details pending documentation." },
    { label: "Diagnosis", value: repair.diagnosis ?? "Diagnosis details pending documentation." },
    { label: "Work performed", value: repair.work },
    { label: "Tools", value: repair.tools },
    { label: "Components", value: repair.components },
    { label: "Confirmed precautions", value: repair.precautions },
    { label: "Post-repair checks performed", value: repair.tests },
    { label: "Result", value: repair.result },
  ];

  return (
    <article data-repair-case={repair.id} className="space-y-5">
      <div data-repair-outcome className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-left">
        <h3 className="font-semibold text-primary">{t("Result")}</h3>
        {repair.result && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(repair.result)}</p>}
        {repair.components?.length ? <p className="mt-2 text-sm">{repair.components.map(component=>t(component)).join(" · ")}</p> : null}
        {repair.tests?.length ? <p className="mt-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{t("Post-repair checks performed")}: </span>{repair.tests.map(check=>t(check)).join(" · ")}</p> : null}
      </div>
      <WorkImageGallery images={photos} title={repair.device} presentation />
      <details data-repair-technical className="rounded-xl border border-border p-4">
        <summary className="min-h-11 cursor-pointer font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Technical details and checks")}</summary>
      <dl className="mt-4 grid gap-4 md:grid-cols-2">
        {facts.filter(f => Array.isArray(f.value) ? f.value.length : Boolean(f.value)).map((f) => (
          <div key={f.label} className="rounded-lg border border-border bg-surface-2/40 p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{t(f.label)}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {Array.isArray(f.value) ? (
                  <ul className="space-y-1">
                    {f.value.map((v) => (
                      <li key={v} className="flex gap-2">
                        <span className="text-primary">·</span>
                        <span>{t(v)}</span>
                      </li>
                    ))}
                  </ul>
              ) : t(f.value)}
            </dd>
          </div>
        ))}
      </dl>
      {repair.notes && <p className="text-sm leading-relaxed text-muted-foreground">{t(repair.notes)}</p>}

      <WorkProcess showImages={false} documentedSteps={repair.documentedSteps} protocol={repair.protocol} documentationNeeded={repair.documentationNeeded} />


      {repair.learned?.length ? (
        <div className="border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{t("What I learned")}</p>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
            {repair.learned.map((l) => (
              <li key={l}>· {t(l)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      </details>
    </article>
  );
};

export default SmartphoneRepairCard;
