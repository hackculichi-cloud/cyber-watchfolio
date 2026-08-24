// Shared SOC data model types. All optional fields render only when provided,
// so partial entries degrade gracefully in the UI.

export type Severity = "critical" | "high" | "medium" | "low";
export type Verdict = "True Positive" | "False Positive" | "Benign Positive";
export type Confidence = "High" | "Medium" | "Low";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Reference {
  label: string;
  url?: string;
}

/** Optional metadata shared by Investigations and Playbooks. */
export interface SharedMeta {
  difficulty?: Difficulty;
  estimatedTime?: string;
  references?: Reference[];
  analystNotes?: string;
}

// ---------- Investigation ----------

export interface CaseInfo {
  caseId: string;
  incidentName: string;
  alertId?: string;
  date?: string;
  analyst?: string;
}

export interface ExecutiveSummary {
  whatHappened: string;
  whyImportant?: string;
  finalVerdict: Verdict;
  businessImpact?: string;
}

export interface AlertInfo {
  alertName?: string;
  severity?: Severity;
  detectionRule?: string;
  eventTime?: string;
  source?: string;
  destination?: string;
  user?: string;
  host?: string;
  detectionProduct?: string;
}

export interface Triage {
  whyTriggered?: string;
  initialHypothesis?: string;
  initialSeverity?: Severity;
  priority?: string;
}

export interface InvestigationStep {
  title: string;
  objective?: string;
  tool?: string;
  query?: string;
  evidence?: string[];
  conclusion?: string;
}

export interface EvidenceBucket {
  category: string;
  items: string[];
}

export interface IOC {
  type: string;
  value: string;
  description?: string;
}

export interface MitreEntry {
  tactic: string;
  technique: string;
  id: string;
  evidence?: string;
}

export interface TimelineEntry {
  time: string;
  event: string;
  evidence?: string;
}

export interface Analysis {
  facts?: string[];
  assumptions?: string[];
  supportingTP?: string[];
  against?: string[];
  confidence?: Confidence;
}

export interface ResponseActions {
  containment?: string[];
  eradication?: string[];
  recovery?: string[];
  monitoring?: string[];
}

export interface LessonsLearned {
  technical?: string[];
  operational?: string[];
  detectionImprovements?: string[];
}

export interface FinalVerdict {
  verdict: Verdict;
  justification?: string;
}

export interface Investigation extends SharedMeta {
  id: string;
  title: string;
  severity: Severity;
  tools?: string[];
  shortDescription: string;
  caseInfo: CaseInfo;
  executiveSummary: ExecutiveSummary;
  alertInfo?: AlertInfo;
  triage?: Triage;
  steps?: InvestigationStep[];
  evidence?: EvidenceBucket[];
  iocs?: IOC[];
  mitre?: MitreEntry[];
  timeline?: TimelineEntry[];
  analysis?: Analysis;
  responseActions?: ResponseActions;
  additionalDataRequested?: string[];
  lessonsLearned?: LessonsLearned;
  finalVerdict: FinalVerdict;
}

// ---------- Playbook ----------

export interface PlaybookStep {
  title: string;
  purpose?: string;
  where?: string;
  tools?: string;
  actions?: string[];
  lookFor?: string[];
  evidence?: string[];
  decision?: string;
  why?: string;
}

export interface DecisionTree {
  truePositive?: string;
  falsePositive?: string;
  benignPositive?: string;
}

export interface Playbook extends SharedMeta {
  id: string;
  name: string;
  tags?: string[];
  objective: string;
  scope?: string;
  prerequisites?: string[];
  tools?: string[];
  steps: PlaybookStep[];
  decisionTree?: DecisionTree;
  containment?: string[];
  eradication?: string[];
  recovery?: string[];
  escalation?: string[];
  mitre?: MitreEntry[];
  detectionOpportunities?: string[];
  lessonsLearned?: LessonsLearned;
}
