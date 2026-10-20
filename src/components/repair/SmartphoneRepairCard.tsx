import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
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
  const stagedPhotos = new Set(repair.documentedSteps?.flatMap(step => step.images?.map(image => image.src) ?? []));
  const otherPhotos = photos.filter(image => !stagedPhotos.has(image.src));

  const facts: { label: string; value?: string | string[] }[] = [
    { label: "Issue", value: repair.issue },
    { label: "Diagnosis", value: repair.diagnosis },
    { label: "Work performed", value: repair.work },
    { label: "Tools", value: repair.tools },
    { label: "Components", value: repair.components },
    { label: "Confirmed precautions", value: repair.precautions },
    { label: "Post-repair checks performed", value: repair.tests },
    { label: "Result", value: repair.result },
  ];

  return (
    <article data-repair-case={repair.id} className="space-y-6 rounded-xl border border-border bg-surface/70 p-4 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{t(repair.ref)}</p>
          <h3 className="mt-1 text-lg font-semibold">{t(repair.device)}</h3>
          {repair.date && <p className="mt-1 text-xs text-muted-foreground">{t(repair.date)}</p>}
        </div>
        <Tag variant="primary">{t(repair.repairType)}</Tag>
      </header>

      <dl className="grid gap-4 md:grid-cols-2">
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

      <WorkProcess documentedSteps={repair.documentedSteps} protocol={repair.protocol} documentationNeeded={repair.documentationNeeded} />
      {otherPhotos.length > 0 && <WorkImageGallery images={otherPhotos} title={repair.device} compact />}

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

    </article>
  );
};

export default SmartphoneRepairCard;
