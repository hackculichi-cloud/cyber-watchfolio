import { useLanguage } from "@/i18n/LanguageProvider";
import type { Playbook } from "@/types/soc";
import SectionBlock from "@/components/shared/SectionBlock";
import DataTable from "@/components/shared/DataTable";

const nonEmpty = <T,>(v: T[] | undefined) => Array.isArray(v) && v.length > 0;

const List = ({ items }: { items?: string[] }) => {
  const { t } = useLanguage();
  return nonEmpty(items) ? (
    <ul className="space-y-1">
      {items!.map((i, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="text-primary shrink-0">→</span>
          <span>{t(i)}</span>
        </li>
      ))}
    </ul>
  ) : null;
};

const KeyVal = ({ label, value }: { label: string; value?: string }) => {
  const { t } = useLanguage();
  return value ? (
    <div>
      <span className="text-[10px] uppercase tracking-wider text-primary">{t(label)}</span>
      <p className="text-xs text-muted-foreground">{t(value)}</p>
    </div>
  ) : null;
};

const PlaybookDetail = ({ data }: { data: Playbook }) => {
  const { t } = useLanguage();
  return (
    <>
      <SectionBlock title={t("objective")}>
        <p>{t(data.objective)}</p>
      </SectionBlock>

      <SectionBlock title={t("scope")} show={!!data.scope}>
        <p>{t(data.scope)}</p>
      </SectionBlock>

      <SectionBlock title={t("prerequisites")} show={nonEmpty(data.prerequisites)}>
        <List items={data.prerequisites} />
      </SectionBlock>

      <SectionBlock title={t("required_tools")} show={nonEmpty(data.tools)}>
        <div className="flex flex-wrap gap-1.5">
          {data.tools!.map((entry) => (
            <span key={entry} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
              {t(entry)}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={t("investigation_procedure")}>
        <div className="space-y-3">
          {data.steps.map((s, i) => (
            <div key={i} className="panel-glow p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  {t(String(i + 1).padStart(2, "0"))}
                </span>
                <h4 className="font-display text-sm text-foreground">{t(s.title)}</h4>
              </div>
              <div className="space-y-2 text-xs">
                <KeyVal label={t("Purpose")} value={s.purpose} />
                <KeyVal label={t("Where")} value={s.where} />
                <KeyVal label={t("Tools")} value={s.tools} />
                {nonEmpty(s.actions) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">{t("Actions")}</span>
                    <List items={s.actions} />
                  </div>
                )}
                {nonEmpty(s.lookFor) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">{t("Look for")}</span>
                    <List items={s.lookFor} />
                  </div>
                )}
                {nonEmpty(s.evidence) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">{t("Evidence")}</span>
                    <List items={s.evidence} />
                  </div>
                )}
                <KeyVal label={t("Decision")} value={s.decision} />
                <KeyVal label={t("Why")} value={s.why} />
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={t("decision_tree")} show={!!data.decisionTree}>
        <div className="grid sm:grid-cols-3 gap-3">
          <KeyVal label={t("True Positive")} value={data.decisionTree?.truePositive} />
          <KeyVal label={t("False Positive")} value={data.decisionTree?.falsePositive} />
          <KeyVal label={t("Benign Positive")} value={data.decisionTree?.benignPositive} />
        </div>
      </SectionBlock>

      <SectionBlock title={t("containment")} show={nonEmpty(data.containment)}>
        <List items={data.containment} />
      </SectionBlock>
      <SectionBlock title={t("eradication")} show={nonEmpty(data.eradication)}>
        <List items={data.eradication} />
      </SectionBlock>
      <SectionBlock title={t("recovery")} show={nonEmpty(data.recovery)}>
        <List items={data.recovery} />
      </SectionBlock>
      <SectionBlock title={t("escalation_criteria")} show={nonEmpty(data.escalation)}>
        <List items={data.escalation} />
      </SectionBlock>

      <SectionBlock title={t("mitre_attack")} show={nonEmpty(data.mitre)}>
        <DataTable
          columns={["Tactic", "Technique", "ID", "Evidence"]}
          rows={data.mitre!.map((m) => [m.tactic, m.technique, m.id, m.evidence])}
        />
      </SectionBlock>

      <SectionBlock title={t("detection_opportunities")} show={nonEmpty(data.detectionOpportunities)}>
        <List items={data.detectionOpportunities} />
      </SectionBlock>

      <SectionBlock title={t("lessons_learned")} show={!!data.lessonsLearned}>
        {(["technical", "operational", "detectionImprovements"] as const).map(
          (k) =>
            nonEmpty(data.lessonsLearned?.[k]) && (
              <div key={k}>
                <span className="text-[10px] uppercase tracking-wider text-primary">{t(k)}</span>
                <List items={data.lessonsLearned![k]} />
              </div>
            ),
        )}
      </SectionBlock>

      <SectionBlock title={t("analyst_notes")} show={!!data.analystNotes}>
        <p className="italic">{t(data.analystNotes)}</p>
      </SectionBlock>

      <SectionBlock title={t("references")} show={nonEmpty(data.references)}>
        <ul className="space-y-1">
          {data.references!.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary shrink-0">→</span>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                  {t(r.label)}
                </a>
              ) : (
                <span>{t(r.label)}</span>
              )}
            </li>
          ))}
        </ul>
      </SectionBlock>
    </>
  );
};

export default PlaybookDetail;
