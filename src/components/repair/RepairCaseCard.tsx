import type { RepairCase } from "@/data/repairs";
import Tag from "@/components/shared/Tag";
import BeforeAfter from "@/components/shared/BeforeAfter";

const steps = (repair: RepairCase) => [
  { label: "Before", body: repair.problem },
  { label: "Diagnosis", body: repair.diagnosis },
  { label: "Repair", body: repair.work.join(" · ") },
  { label: "After", body: repair.result },
];

/** Documented repair case following BEFORE → DIAGNOSIS → REPAIR → AFTER. */
const RepairCaseCard = ({ repair }: { repair: RepairCase }) => (
  <article className="panel-glow space-y-6">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold">{repair.device}</h3>
        {repair.date && <p className="mt-1 text-xs text-muted-foreground">{repair.date}</p>}
      </div>
      <Tag variant="primary">{repair.deviceType}</Tag>
    </header>

    <ol className="grid gap-3 md:grid-cols-4">
      {steps(repair).map((s, i) => (
        <li key={s.label} className="rounded-lg border border-border bg-surface-2/40 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {String(i + 1).padStart(2, "0")} · {s.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>

    <BeforeAfter before={repair.before} during={repair.during} after={repair.after} />

    {(repair.tools?.length || repair.components?.length) && (
      <div className="flex flex-wrap gap-1.5 border-t border-border pt-4">
        {repair.tools?.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
        {repair.components?.map((c) => (
          <Tag key={c} variant="accent">
            {c}
          </Tag>
        ))}
      </div>
    )}

    {repair.notes && <p className="text-sm italic leading-relaxed text-muted-foreground">{repair.notes}</p>}
  </article>
);

export default RepairCaseCard;
