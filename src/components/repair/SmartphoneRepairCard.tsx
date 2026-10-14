import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import WorkImageGallery from "@/components/shared/WorkImageGallery";
import type { SmartphoneRepair } from "@/data/smartphoneRepair";

const Pending = ({ label }: { label: string }) => {
  const { t } = useLanguage();
  return (
    <span className="text-muted-foreground/70">{t(label)}{t(" — pending documentation")}</span>
  );
};

/**
 * Reusable documented smartphone repair card.
 * Add entries to `smartphoneRepairs` — no UI change needed.
 * The same component works for future laptop/console cases.
 */
const SmartphoneRepairCard = ({ repair }: { repair: SmartphoneRepair }) => {
  const { t } = useLanguage();
  const photos = repair.photos ?? [repair.before, repair.during, repair.after, ...(repair.evidence ?? [])].filter((image) => image !== undefined);

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
    <article className="panel-glow space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{t(repair.ref)}</p>
          <h3 className="mt-1 text-lg font-semibold">{t(repair.device)}</h3>
          {repair.date && <p className="mt-1 text-xs text-muted-foreground">{t(repair.date)}</p>}
        </div>
        <Tag variant="primary">{t(repair.repairType)}</Tag>
      </header>

      <dl className="grid gap-4 md:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="rounded-lg border border-border bg-surface-2/40 p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{t(f.label)}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {Array.isArray(f.value) ? (
                f.value.length ? (
                  <ul className="space-y-1">
                    {f.value.map((v) => (
                      <li key={v} className="flex gap-2">
                        <span className="text-primary">·</span>
                        <span>{t(v)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending label={t(f.label)} />
                )
              ) : f.value ? (
                t(f.value)
              ) : (
                <Pending label={t(f.label)} />
              )}
            </dd>
          </div>
        ))}
      </dl>
      {repair.notes && <p className="text-sm leading-relaxed text-muted-foreground">{t(repair.notes)}</p>}

      <WorkImageGallery images={photos} title={repair.device} compact />

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
