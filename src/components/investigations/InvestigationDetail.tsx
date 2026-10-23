import { useLanguage } from "@/i18n/LanguageProvider";
import type { Investigation } from "@/types/soc";
import SectionBlock from "@/components/shared/SectionBlock";
import DataTable from "@/components/shared/DataTable";

const nonEmpty = <T,>(v: T[] | undefined) => Array.isArray(v) && v.length > 0;

const KeyVal = ({ label, value, preserve }: { label: string; value?: string; preserve?: boolean }) => {
  const { t } = useLanguage();
  return value ? (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <span className="text-[10px] uppercase tracking-wider text-primary sm:w-40 shrink-0">{t(label)}</span>
      <span className="text-xs text-muted-foreground font-mono break-all">{preserve ? value : t(value)}</span>
    </div>
  ) : null;
};

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

const InvestigationDetail = ({ data }: { data: Investigation }) => {
  const { t } = useLanguage();
  const {
    caseInfo,
    executiveSummary,
    alertInfo,
    triage,
    steps,
    evidence,
    iocs,
    mitre,
    timeline,
    analysis,
    responseActions,
    additionalDataRequested,
    lessonsLearned,
    finalVerdict,
    analystNotes,
    references,
  } = data;

  return (
    <>
      {data.context && <div className="rounded-lg border border-primary/25 bg-primary/5 p-3 text-sm">
        <p className="font-medium text-primary">{t(data.context.kind)} · {data.context.platform}</p>
        {data.context.note && <p className="mt-1 text-muted-foreground">{t(data.context.note)}</p>}
      </div>}
      <SectionBlock title={t("Case information")}>
        <div className="grid sm:grid-cols-2 gap-2">
          <KeyVal label={t("Case ID")} value={caseInfo.caseId} />
          <KeyVal label={t("Incident")} value={caseInfo.incidentName} />
          <KeyVal label={t("Alert ID")} value={caseInfo.alertId} />
          <KeyVal label={t("Date")} value={caseInfo.date} />
          <KeyVal label={t("Analyst")} value={caseInfo.analyst} />
        </div>
      </SectionBlock>

      <SectionBlock title={t("Executive summary")}>
        <KeyVal label={t("What happened")} value={executiveSummary.whatHappened} />
        <KeyVal label={t("Why important")} value={executiveSummary.whyImportant} />
        <KeyVal label={t("Final verdict")} value={executiveSummary.finalVerdict} />
        <KeyVal label={t("Business impact")} value={executiveSummary.businessImpact} />
      </SectionBlock>

      <SectionBlock title={t("Alert information")} show={!!alertInfo}>
        <div className="grid sm:grid-cols-2 gap-2">
          <KeyVal label={t("Alert name")} value={alertInfo?.alertName} />
          <KeyVal label={t("Severity")} value={alertInfo?.severity} />
          <KeyVal label={t("Detection rule")} value={alertInfo?.detectionRule} />
          <KeyVal label={t("Event time")} value={alertInfo?.eventTime} />
          <KeyVal label={t("Source")} value={alertInfo?.source} />
          <KeyVal label={t("Destination")} value={alertInfo?.destination} />
          <KeyVal label={t("User")} value={alertInfo?.user} />
          <KeyVal label={t("Host")} value={alertInfo?.host} />
          <KeyVal label={t("Detection product")} value={alertInfo?.detectionProduct} />
        </div>
      </SectionBlock>

      <SectionBlock title={t("Detection and triage")} show={!!triage}>
        <KeyVal label={t("Why triggered")} value={triage?.whyTriggered} />
        <KeyVal label={t("Initial hypothesis")} value={triage?.initialHypothesis} />
        <KeyVal label={t("Initial severity")} value={triage?.initialSeverity} />
        <KeyVal label={t("Priority")} value={triage?.priority} />
      </SectionBlock>

      <SectionBlock title={t("Investigation steps")} show={nonEmpty(steps)}>
        <div className="space-y-3">
          {steps!.map((s, i) => (
            <div key={i} className="panel-glow p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  {t(String(i + 1).padStart(2, "0"))}
                </span>
                <h4 className="font-display text-sm text-foreground">{t(s.title)}</h4>
              </div>
              <div className="space-y-1 text-xs">
                <KeyVal label={t("Objective")} value={s.objective} />
                <KeyVal label={t("Tool")} value={s.tool} />
                <KeyVal label={t("Query")} value={s.query} preserve />
                {nonEmpty(s.evidence) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">{t("Evidence")}</span>
                    <List items={s.evidence} />
                  </div>
                )}
                <KeyVal label={t("Conclusion")} value={s.conclusion} />
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={t("Collected evidence")} show={nonEmpty(evidence)}>
        <div className="grid sm:grid-cols-2 gap-3">
          {evidence!.map((b, i) => (
            <div key={i} className="border border-border rounded p-2">
              <span className="text-[10px] uppercase tracking-wider text-primary">{t(b.category)}</span>
              <List items={b.items} />
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={t("Indicators of compromise")} show={nonEmpty(iocs)}>
        <DataTable
          columns={["Type", "Value", "Description"]}
          rows={iocs!.map((i) => [i.type, i.value, i.description])}
        />
      </SectionBlock>

      <SectionBlock title={t("MITRE ATT&CK mapping")} show={nonEmpty(mitre)}>
        <DataTable
          columns={["Tactic", "Technique", "ID", "Evidence"]}
          rows={mitre!.map((m) => [m.tactic, m.technique, m.id, m.evidence])}
        />
      </SectionBlock>

      <SectionBlock title={t("timeline")} show={nonEmpty(timeline)}>
        <DataTable
          columns={["Time", "Event", "Evidence"]}
          rows={timeline!.map((entry) => [entry.time, entry.event, entry.evidence])}
        />
      </SectionBlock>

      <SectionBlock title={t("analysis")} show={!!analysis}>
        {nonEmpty(analysis?.facts) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">{t("Facts")}</span>
            <List items={analysis!.facts} />
          </div>
        )}
        {nonEmpty(analysis?.assumptions) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">{t("Assumptions")}</span>
            <List items={analysis!.assumptions} />
          </div>
        )}
        {nonEmpty(analysis?.supportingTP) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">{t("Supporting TP")}</span>
            <List items={analysis!.supportingTP} />
          </div>
        )}
        {nonEmpty(analysis?.against) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">{t("Against")}</span>
            <List items={analysis!.against} />
          </div>
        )}
        <KeyVal label={t("Confidence")} value={analysis?.confidence} />
      </SectionBlock>

      <SectionBlock title={t("Response actions")} show={!!responseActions}>
        <div className="grid sm:grid-cols-2 gap-3">
          {(["containment", "eradication", "recovery", "monitoring"] as const).map(
            (k) =>
              nonEmpty(responseActions?.[k]) && (
                <div key={k} className="border border-border rounded p-2">
                  <span className="text-[10px] uppercase tracking-wider text-primary">{t(k)}</span>
                  <List items={responseActions![k]} />
                </div>
              ),
          )}
        </div>
      </SectionBlock>

      <SectionBlock title={t("Additional data requested")} show={nonEmpty(additionalDataRequested)}>
        <List items={additionalDataRequested} />
      </SectionBlock>

      <SectionBlock title={t("Lessons learned")} show={!!lessonsLearned}>
        {(["technical", "operational", "detectionImprovements"] as const).map(
          (k) =>
            nonEmpty(lessonsLearned?.[k]) && (
              <div key={k}>
                <span className="text-[10px] uppercase tracking-wider text-primary">{t(k)}</span>
                <List items={lessonsLearned![k]} />
              </div>
            ),
        )}
      </SectionBlock>

      <SectionBlock title={t("Final verdict")}>
        <KeyVal label={t("Verdict")} value={finalVerdict.verdict} />
        <KeyVal label={t("Justification")} value={finalVerdict.justification} />
      </SectionBlock>

      <SectionBlock title={t("Analyst notes")} show={!!analystNotes}>
        <p className="italic">{t(analystNotes)}</p>
      </SectionBlock>

      <SectionBlock title={t("references")} show={nonEmpty(references)}>
        <ul className="space-y-1">
          {references!.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary shrink-0">→</span>
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
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

export default InvestigationDetail;
