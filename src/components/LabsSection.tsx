import { useState } from "react";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaybookStep {
  title: string;
  where?: string;
  tools?: string;
  actions: string[];
  lookFor?: string[];
  why: string;
}

interface Playbook {
  id: string;
  title: string;
  tags: string[];
  steps: PlaybookStep[];
}

const playbooks: Playbook[] = [
  {
    id: "vpn",
    title: "Unauthorized Access Attempt (VPN / Login Alert)",
    tags: ["SIEM", "VPN", "MFA", "Authentication", "Threat Analysis"],
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        where: "SIEM / Alert Panel",
        actions: ["Extract: Username, Source IP, Timestamp, Target system (VPN, web portal)"],
        lookFor: ["Confirm it's a login/authentication event"],
        why: "Establish what type of access is being attempted.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        tools: "VirusTotal (IP), Whois / RDAP",
        actions: ["Search Source IP"],
        lookFor: ["Country", "ISP / ASN", "If IP belongs to VPN / Hosting provider"],
        why: "Identify if the origin is suspicious or external.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        tools: "VirusTotal, AbuseIPDB (optional)",
        actions: ["Review reputation"],
        lookFor: ["Malicious tags", "Suspicious activity", "VPN / Proxy indicators"],
        why: "Determine if the IP is used for attacks.",
      },
      {
        title: "Step 4 — Review Authentication Attempts",
        where: "SIEM logs, Firewall / Proxy logs, Authentication logs",
        actions: ["Search: Same IP, Same user, Time window"],
        lookFor: ["Multiple login attempts", "Failed logins", "OTP / MFA triggers"],
        why: "Detect unauthorized access attempt.",
      },
      {
        title: "Step 5 — Check MFA / Email Activity ⚠️",
        where: "Email logs / Notifications",
        actions: ["Verify MFA events"],
        lookFor: ["Multiple OTP requests", "OTP failures"],
        why: "Strong indicator of attack (credential abuse).",
      },
      {
        title: "Step 6 — Confirm Login Result",
        where: "Authentication logs",
        actions: ["Verify if login was successful"],
        lookFor: ["Success or failure"],
        why: "Determine if access was gained or only attempted.",
      },
      {
        title: "Step 7 — Correlate Behavior",
        actions: ["Evaluate: Is IP external or unusual?", "Are there multiple attempts?", "Is MFA being triggered abnormally?"],
        why: "Confirm if there is a real attack attempt.",
      },
      {
        title: "Step 8 — Determine Verdict",
        actions: [
          "TRUE POSITIVE: Login attempts + MFA abuse + suspicious behavior (even if login failed)",
          "FALSE POSITIVE: Normal user behavior, no abnormal attempts, no suspicious indicators",
        ],
        why: "Classify the incident based on evidence.",
      },
      {
        title: "Step 9 — Response",
        actions: [
          "If TP: Recommend password reset, session revocation, flag IP for monitoring/block",
          "If FP: Document and close",
        ],
        why: "Mitigate access attempt or close alert.",
      },
    ],
  },
  {
    id: "rdp",
    title: "RDP Brute Force Detection & Response",
    tags: ["SIEM", "RDP", "Windows", "Brute Force", "Threat Intel"],
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        where: "SIEM / Alert Panel",
        actions: ["Extract: Source IP, Destination IP / Hostname, Timestamp, Protocol (RDP), Alert name / rule"],
        why: "Establish context of the alert and identify the target system.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        tools: "VirusTotal (IP lookup), Whois / RDAP",
        actions: ["Investigate the source IP address"],
        lookFor: ["Country of origin", "ISP / Organization", "Known malicious activity", "Hosting/VPN provider"],
        why: "Determine if the source is suspicious or associated with known attacks.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        tools: "VirusTotal, AbuseIPDB (optional)",
        actions: ["Review reputation and threat intelligence"],
        lookFor: ["Malicious flags", "Brute force or scanning activity"],
        why: "Confirm whether the IP has a history of malicious behavior.",
      },
      {
        title: "Step 4 — Review Authentication Logs",
        where: "SIEM / Log Management, Windows Security Logs",
        actions: ["Filter logs by: Source IP, Destination host, Time range"],
        lookFor: ["Multiple failed login attempts", "Different usernames used", "Repeated authentication failures"],
        why: "Identify brute force patterns (automated login attempts).",
      },
      {
        title: "Step 5 — Confirm Attack Pattern",
        actions: ["Verify: High number of failed login attempts", "Multiple usernames targeted", "Rapid sequence of login attempts"],
        why: "Validate that the behavior matches brute force attack characteristics.",
      },
      {
        title: "Step 6 — Check for Successful Login",
        where: "Authentication logs (Windows Event ID 4624)",
        actions: ["Search for successful login events from the attacker IP"],
        lookFor: ["Any successful authentication from the attacker IP"],
        why: "Determine if the attacker gained access.",
      },
      {
        title: "Step 7 — Endpoint Verification",
        where: "Endpoint Security / EDR",
        actions: ["Investigate the affected host"],
        lookFor: ["Active sessions", "Suspicious processes", "Unusual activity after login attempts"],
        why: "Confirm whether the system was compromised.",
      },
      {
        title: "Step 8 — Correlate Findings",
        actions: ["Evaluate: IP reputation, Login attempt patterns, Authentication results, Endpoint activity"],
        why: "Make a decision based on full context.",
      },
      {
        title: "Step 9 — Determine Verdict",
        actions: [
          "TRUE POSITIVE: Multiple failed logins, multiple usernames, malicious IP, brute force confirmed",
          "FALSE POSITIVE: Normal user behavior, no abnormal login patterns",
        ],
        why: "Classify the incident.",
      },
      {
        title: "Step 10 — Response Actions",
        actions: [
          "If TP: Block source IP (Firewall), disable/protect targeted accounts, enforce lockout policies, monitor host, escalate if necessary",
          "If FP: Document findings and close alert",
        ],
        why: "Mitigate the threat or close the investigation.",
      },
    ],
  },
];

const StepCard = ({ step, index }: { step: PlaybookStep; index: number }) => (
  <div className="panel-glow p-5 h-full flex flex-col transition-transform duration-300 hover:scale-[1.03] cursor-default min-w-0">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="font-display font-semibold text-sm text-foreground truncate">{step.title}</h4>
    </div>

    {step.where && (
      <div className="mb-2">
        <span className="text-[10px] text-primary uppercase tracking-wider">Where:</span>
        <p className="text-xs text-muted-foreground">{step.where}</p>
      </div>
    )}

    {step.tools && (
      <div className="mb-2">
        <span className="text-[10px] text-primary uppercase tracking-wider">Tools:</span>
        <p className="text-xs text-muted-foreground">{step.tools}</p>
      </div>
    )}

    <div className="mb-2">
      <span className="text-[10px] text-primary uppercase tracking-wider">Actions:</span>
      <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
        {step.actions.map((a, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-primary shrink-0">→</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>

    {step.lookFor && step.lookFor.length > 0 && (
      <div className="mb-2">
        <span className="text-[10px] text-primary uppercase tracking-wider">Look for:</span>
        <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
          {step.lookFor.map((l, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-primary shrink-0">•</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="mt-auto pt-2 border-t border-border">
      <span className="text-[10px] text-primary uppercase tracking-wider">Why:</span>
      <p className="text-xs text-muted-foreground">{step.why}</p>
    </div>
  </div>
);

const PlaybookCarousel = ({ playbook }: { playbook: Playbook }) => {
  const [current, setCurrent] = useState(0);
  const total = playbook.steps.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary shrink-0" />
        <h3 className="font-display font-bold text-base text-foreground">{playbook.title}</h3>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {playbook.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
            {tag}
          </span>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {playbook.steps.map((step, i) => (
            <div key={i} className="w-full shrink-0 px-1">
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button variant="neon-outline" size="sm" onClick={prev} className="gap-1">
          <ChevronLeft className="w-4 h-4" /> Prev
        </Button>
        <div className="flex gap-1.5">
          {playbook.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        <Button variant="neon-outline" size="sm" onClick={next} className="gap-1">
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const LabsSection = () => {
  return (
    <section id="labs" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} detection_playbooks
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        {playbooks.map((pb) => (
          <PlaybookCarousel key={pb.id} playbook={pb} />
        ))}
      </div>
    </section>
  );
};

export default LabsSection;
