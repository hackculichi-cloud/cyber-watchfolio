import type { Investigation } from "@/types/soc";
import SectionBlock from "@/components/shared/SectionBlock";
import DataTable from "@/components/shared/DataTable";

const nonEmpty = <T,>(v: T[] | undefined) => Array.isArray(v) && v.length > 0;

const KeyVal = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <span className="text-[10px] uppercase tracking-wider text-primary sm:w-40 shrink-0">{label}</span>
      <span className="text-xs text-muted-foreground font-mono break-all">{value}</span>
    </div>
  ) : null;

const List = ({ items }: { items?: string[] }) =>
  nonEmpty(items) ? (
    <ul className="space-y-1">
      {items!.map((i, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="text-primary shrink-0">→</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  ) : null;

const InvestigationDetail = ({ data }: { data: Investigation }) => {
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
      <SectionBlock title="case_information">
        <div className="grid sm:grid-cols-2 gap-2">
          <KeyVal label="Case ID" value={caseInfo.caseId} />
          <KeyVal label="Incident" value={caseInfo.incidentName} />
          <KeyVal label="Alert ID" value={caseInfo.alertId} />
          <KeyVal label="Date" value={caseInfo.date} />
          <KeyVal label="Analyst" value={caseInfo.analyst} />
        </div>
      </SectionBlock>

      <SectionBlock title="executive_summary">
        <KeyVal label="What happened" value={executiveSummary.whatHappened} />
        <KeyVal label="Why important" value={executiveSummary.whyImportant} />
        <KeyVal label="Final verdict" value={executiveSummary.finalVerdict} />
        <KeyVal label="Business impact" value={executiveSummary.businessImpact} />
      </SectionBlock>

      <SectionBlock title="alert_information" show={!!alertInfo}>
        <div className="grid sm:grid-cols-2 gap-2">
          <KeyVal label="Alert name" value={alertInfo?.alertName} />
          <KeyVal label="Severity" value={alertInfo?.severity} />
          <KeyVal label="Detection rule" value={alertInfo?.detectionRule} />
          <KeyVal label="Event time" value={alertInfo?.eventTime} />
          <KeyVal label="Source" value={alertInfo?.source} />
          <KeyVal label="Destination" value={alertInfo?.destination} />
          <KeyVal label="User" value={alertInfo?.user} />
          <KeyVal label="Host" value={alertInfo?.host} />
          <KeyVal label="Detection product" value={alertInfo?.detectionProduct} />
        </div>
      </SectionBlock>

      <SectionBlock title="detection_and_triage" show={!!triage}>
        <KeyVal label="Why triggered" value={triage?.whyTriggered} />
        <KeyVal label="Initial hypothesis" value={triage?.initialHypothesis} />
        <KeyVal label="Initial severity" value={triage?.initialSeverity} />
        <KeyVal label="Priority" value={triage?.priority} />
      </SectionBlock>

      <SectionBlock title="investigation_steps" show={nonEmpty(steps)}>
        <div className="space-y-3">
          {steps!.map((s, i) => (
            <div key={i} className="panel-glow p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-sm text-foreground">{s.title}</h4>
              </div>
              <div className="space-y-1 text-xs">
                <KeyVal label="Objective" value={s.objective} />
                <KeyVal label="Tool" value={s.tool} />
                <KeyVal label="Query" value={s.query} />
                {nonEmpty(s.evidence) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary">Evidence</span>
                    <List items={s.evidence} />
                  </div>
                )}
                <KeyVal label="Conclusion" value={s.conclusion} />
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="evidence_collected" show={nonEmpty(evidence)}>
        <div className="grid sm:grid-cols-2 gap-3">
          {evidence!.map((b, i) => (
            <div key={i} className="border border-border rounded p-2">
              <span className="text-[10px] uppercase tracking-wider text-primary">{b.category}</span>
              <List items={b.items} />
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="indicators_of_compromise" show={nonEmpty(iocs)}>
        <DataTable
          columns={["Type", "Value", "Description"]}
          rows={iocs!.map((i) => [i.type, i.value, i.description])}
        />
      </SectionBlock>

      <SectionBlock title="mitre_attack_mapping" show={nonEmpty(mitre)}>
        <DataTable
          columns={["Tactic", "Technique", "ID", "Evidence"]}
          rows={mitre!.map((m) => [m.tactic, m.technique, m.id, m.evidence])}
        />
      </SectionBlock>

      <SectionBlock title="timeline" show={nonEmpty(timeline)}>
        <DataTable
          columns={["Time", "Event", "Evidence"]}
          rows={timeline!.map((t) => [t.time, t.event, t.evidence])}
        />
      </SectionBlock>

      <SectionBlock title="analysis" show={!!analysis}>
        {nonEmpty(analysis?.facts) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">Facts</span>
            <List items={analysis!.facts} />
          </div>
        )}
        {nonEmpty(analysis?.assumptions) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">Assumptions</span>
            <List items={analysis!.assumptions} />
          </div>
        )}
        {nonEmpty(analysis?.supportingTP) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">Supporting TP</span>
            <List items={analysis!.supportingTP} />
          </div>
        )}
        {nonEmpty(analysis?.against) && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary">Against</span>
            <List items={analysis!.against} />
          </div>
        )}
        <KeyVal label="Confidence" value={analysis?.confidence} />
      </SectionBlock>

      <SectionBlock title="response_actions" show={!!responseActions}>
        <div className="grid sm:grid-cols-2 gap-3">
          {(["containment", "eradication", "recovery", "monitoring"] as const).map(
            (k) =>
              nonEmpty(responseActions?.[k]) && (
                <div key={k} className="border border-border rounded p-2">
                  <span className="text-[10px] uppercase tracking-wider text-primary">{k}</span>
                  <List items={responseActions![k]} />
                </div>
              ),
          )}
        </div>
      </SectionBlock>

      <SectionBlock title="additional_data_requested" show={nonEmpty(additionalDataRequested)}>
        <List items={additionalDataRequested} />
      </SectionBlock>

      <SectionBlock title="lessons_learned" show={!!lessonsLearned}>
        {(["technical", "operational", "detectionImprovements"] as const).map(
          (k) =>
            nonEmpty(lessonsLearned?.[k]) && (
              <div key={k}>
                <span className="text-[10px] uppercase tracking-wider text-primary">{k}</span>
                <List items={lessonsLearned![k]} />
              </div>
            ),
        )}
      </SectionBlock>

      <SectionBlock title="final_verdict">
        <KeyVal label="Verdict" value={finalVerdict.verdict} />
        <KeyVal label="Justification" value={finalVerdict.justification} />
      </SectionBlock>

      <SectionBlock title="analyst_notes" show={!!analystNotes}>
        <p className="italic">{analystNotes}</p>
      </SectionBlock>

      <SectionBlock title="references" show={nonEmpty(references)}>
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
                  {r.label}
                </a>
              ) : (
                <span>{r.label}</span>
              )}
            </li>
          ))}
        </ul>
      </SectionBlock>
    </>
  );
};

export default InvestigationDetail;
