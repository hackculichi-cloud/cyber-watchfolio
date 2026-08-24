import type { Playbook } from "@/types/soc";
import SectionBlock from "@/components/shared/SectionBlock";
import DataTable from "@/components/shared/DataTable";

const nonEmpty = <T,>(v: T[] | undefined) => Array.isArray(v) && v.length > 0;

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

const KeyVal = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div>
      <span className="text-[10px] uppercase tracking-wider text-primary">{label}</span>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  ) : null;

const PlaybookDetail = ({ data }: { data: Playbook }) => (
  <>
    <SectionBlock title="objective">
      <p>{data.objective}</p>
    </SectionBlock>

    <SectionBlock title="scope" show={!!data.scope}>
      <p>{data.scope}</p>
    </SectionBlock>

    <SectionBlock title="prerequisites" show={nonEmpty(data.prerequisites)}>
      <List items={data.prerequisites} />
    </SectionBlock>

    <SectionBlock title="required_tools" show={nonEmpty(data.tools)}>
      <div className="flex flex-wrap gap-1.5">
        {data.tools!.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
            {t}
          </span>
        ))}
      </div>
    </SectionBlock>

    <SectionBlock title="investigation_procedure">
      <div className="space-y-3">
        {data.steps.map((s, i) => (
          <div key={i} className="panel-glow p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-sm text-foreground">{s.title}</h4>
            </div>
            <div className="space-y-2 text-xs">
              <KeyVal label="Purpose" value={s.purpose} />
              <KeyVal label="Where" value={s.where} />
              <KeyVal label="Tools" value={s.tools} />
              {nonEmpty(s.actions) && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-primary">Actions</span>
                  <List items={s.actions} />
                </div>
              )}
              {nonEmpty(s.lookFor) && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-primary">Look for</span>
                  <List items={s.lookFor} />
                </div>
              )}
              {nonEmpty(s.evidence) && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-primary">Evidence</span>
                  <List items={s.evidence} />
                </div>
              )}
              <KeyVal label="Decision" value={s.decision} />
              <KeyVal label="Why" value={s.why} />
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>

    <SectionBlock title="decision_tree" show={!!data.decisionTree}>
      <div className="grid sm:grid-cols-3 gap-3">
        <KeyVal label="True Positive" value={data.decisionTree?.truePositive} />
        <KeyVal label="False Positive" value={data.decisionTree?.falsePositive} />
        <KeyVal label="Benign Positive" value={data.decisionTree?.benignPositive} />
      </div>
    </SectionBlock>

    <SectionBlock title="containment" show={nonEmpty(data.containment)}>
      <List items={data.containment} />
    </SectionBlock>
    <SectionBlock title="eradication" show={nonEmpty(data.eradication)}>
      <List items={data.eradication} />
    </SectionBlock>
    <SectionBlock title="recovery" show={nonEmpty(data.recovery)}>
      <List items={data.recovery} />
    </SectionBlock>
    <SectionBlock title="escalation_criteria" show={nonEmpty(data.escalation)}>
      <List items={data.escalation} />
    </SectionBlock>

    <SectionBlock title="mitre_attack" show={nonEmpty(data.mitre)}>
      <DataTable
        columns={["Tactic", "Technique", "ID", "Evidence"]}
        rows={data.mitre!.map((m) => [m.tactic, m.technique, m.id, m.evidence])}
      />
    </SectionBlock>

    <SectionBlock title="detection_opportunities" show={nonEmpty(data.detectionOpportunities)}>
      <List items={data.detectionOpportunities} />
    </SectionBlock>

    <SectionBlock title="lessons_learned" show={!!data.lessonsLearned}>
      {(["technical", "operational", "detectionImprovements"] as const).map(
        (k) =>
          nonEmpty(data.lessonsLearned?.[k]) && (
            <div key={k}>
              <span className="text-[10px] uppercase tracking-wider text-primary">{k}</span>
              <List items={data.lessonsLearned![k]} />
            </div>
          ),
      )}
    </SectionBlock>

    <SectionBlock title="analyst_notes" show={!!data.analystNotes}>
      <p className="italic">{data.analystNotes}</p>
    </SectionBlock>

    <SectionBlock title="references" show={nonEmpty(data.references)}>
      <ul className="space-y-1">
        {data.references!.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary shrink-0">→</span>
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
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

export default PlaybookDetail;
