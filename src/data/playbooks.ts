import type { Playbook } from "@/types/soc";

export const playbooks: Playbook[] = [
  {
    id: "vpn",
    name: "Unauthorized Access Attempt (VPN / Login Alert)",
    tags: ["SIEM", "VPN", "MFA", "Authentication", "Threat Analysis"],
    difficulty: "Intermediate",
    estimatedTime: "30-45 min",
    objective:
      "Triage suspicious VPN / authentication alerts and determine whether a real credential-abuse attempt has occurred.",
    scope: "Applies to any VPN or SSO authentication alert flagged by the SIEM.",
    prerequisites: [
      "Access to SIEM with authentication data",
      "IAM / IdP log visibility",
      "Threat-intel enrichment (VirusTotal, AbuseIPDB)",
    ],
    tools: ["SIEM", "VPN logs", "IdP / MFA logs", "VirusTotal", "Whois / RDAP"],
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        where: "SIEM / Alert Panel",
        actions: ["Extract: username, source IP, timestamp, target system"],
        lookFor: ["Confirm it's a login/authentication event"],
        why: "Establish what type of access is being attempted.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        tools: "VirusTotal, Whois / RDAP",
        actions: ["Search source IP"],
        lookFor: ["Country", "ISP / ASN", "VPN / Hosting provider"],
        why: "Identify if the origin is suspicious or external.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        tools: "VirusTotal, AbuseIPDB",
        actions: ["Review reputation"],
        lookFor: ["Malicious tags", "Suspicious activity"],
        why: "Determine if the IP is used for attacks.",
      },
      {
        title: "Step 4 — Review Authentication Attempts",
        where: "SIEM / IdP",
        actions: ["Search: same IP, same user, time window"],
        lookFor: ["Multiple login attempts", "Failed logins", "OTP / MFA triggers"],
        why: "Detect unauthorized access attempt.",
      },
      {
        title: "Step 5 — Check MFA / OTP Activity",
        where: "IdP / Email logs",
        actions: ["Verify MFA events"],
        lookFor: ["Multiple OTP requests", "OTP failures"],
        why: "Strong indicator of credential abuse.",
      },
      {
        title: "Step 6 — Confirm Login Result",
        where: "Authentication logs",
        actions: ["Verify if login succeeded"],
        why: "Determine if access was gained or only attempted.",
      },
    ],
    decisionTree: {
      truePositive: "Login attempts + MFA abuse + suspicious behavior (even if login failed).",
      falsePositive: "Normal user behavior, no abnormal attempts, no suspicious indicators.",
      benignPositive: "Legitimate user traveling / on new network with valid re-authentication.",
    },
    containment: ["Block source IP at edge", "Force user password reset"],
    eradication: ["Revoke sessions and refresh tokens"],
    recovery: ["Re-enroll MFA if compromised", "Notify user"],
    escalation: [
      "Escalate to IR if successful auth is observed",
      "Escalate if attempt is part of a broader campaign against multiple users",
    ],
    mitre: [
      { tactic: "Credential Access", technique: "Brute Force", id: "T1110" },
      { tactic: "Credential Access", technique: "MFA Request Generation", id: "T1621" },
    ],
    detectionOpportunities: [
      "Alert on OTP flood without preceding failed auth",
      "Impossible-travel detection on VPN logins",
    ],
    lessonsLearned: {
      operational: ["Standardize IAM handoff for OTP flood scenarios"],
      detectionImprovements: ["Number-matching MFA reduces OTP-flood success"],
    },
    references: [
      { label: "MITRE T1621", url: "https://attack.mitre.org/techniques/T1621/" },
    ],
  },
  {
    id: "rdp",
    name: "RDP Brute Force Detection & Response",
    tags: ["SIEM", "RDP", "Windows", "Brute Force", "Threat Intel"],
    difficulty: "Intermediate",
    estimatedTime: "30-40 min",
    objective:
      "Detect, validate and respond to RDP brute-force attempts against Windows hosts.",
    scope: "Applies to any RDP authentication alert on Windows endpoints or servers.",
    prerequisites: [
      "Windows Security Logs (4624/4625) ingested into SIEM",
      "EDR visibility on the target host",
      "Firewall block capability",
    ],
    tools: ["SIEM", "Windows Security Logs", "EDR", "VirusTotal", "AbuseIPDB"],
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        where: "SIEM",
        actions: ["Extract source IP, destination host, timestamp, protocol, rule name"],
        why: "Establish alert context and identify the target system.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        tools: "VirusTotal, Whois / RDAP",
        lookFor: ["Country", "ISP / Organization", "Hosting/VPN provider"],
        why: "Determine if source is associated with known attacks.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        tools: "VirusTotal, AbuseIPDB",
        lookFor: ["Malicious flags", "Brute force / scanning activity"],
        why: "Confirm history of malicious behavior.",
      },
      {
        title: "Step 4 — Review Authentication Logs",
        where: "Windows Security Logs",
        actions: ["Filter by source IP, host, time range"],
        lookFor: ["Multiple 4625 events", "Different usernames", "Rapid failures"],
        why: "Identify brute-force patterns.",
      },
      {
        title: "Step 5 — Check for Successful Login",
        where: "Event ID 4624",
        actions: ["Search for success from attacker IP"],
        why: "Determine if the attacker gained access.",
      },
      {
        title: "Step 6 — Endpoint Verification",
        where: "EDR",
        lookFor: ["Active sessions", "Suspicious processes", "Post-logon activity"],
        why: "Confirm whether the system was compromised.",
      },
    ],
    decisionTree: {
      truePositive: "Multiple failed logons + multiple usernames + malicious IP.",
      falsePositive: "Normal user behavior, no abnormal login patterns.",
      benignPositive: "Legitimate admin script misconfigured with stale credentials.",
    },
    containment: ["Block source IP at firewall", "Restrict RDP to VPN / bastion"],
    eradication: ["Terminate any suspicious sessions", "Reset targeted account credentials"],
    recovery: ["Enforce lockout policy review", "Rotate exposed service accounts"],
    escalation: [
      "Escalate to IR immediately on any 4624 success from attacker IP",
      "Escalate if multiple hosts are targeted",
    ],
    mitre: [
      { tactic: "Credential Access", technique: "Brute Force: Password Guessing", id: "T1110.001" },
      { tactic: "Initial Access", technique: "External Remote Services", id: "T1133" },
    ],
    detectionOpportunities: [
      "Threshold rule on >5 unique usernames from single IP in 60s",
      "Alert on any 4624 from an IP with prior 4625 burst",
    ],
    lessonsLearned: {
      technical: ["RDP should never be internet-exposed"],
      detectionImprovements: ["Auto-block firewall action on high-confidence TP"],
    },
    references: [
      { label: "MITRE T1110.001", url: "https://attack.mitre.org/techniques/T1110/001/" },
    ],
  },
  {
    id: "phishing",
    name: "Phishing Email Triage & Response",
    tags: ["Email Security", "Phishing", "Malware", "User Report", "DFIR"],
    difficulty: "Intermediate",
    estimatedTime: "45-60 min",
    objective:
      "Triage user-reported and gateway-detected phishing emails, determine malicious intent, and contain the campaign across the organization.",
    scope:
      "Applies to any suspicious email received via user PhishAlert reports or Email Security Gateway alerts.",
    prerequisites: [
      "Access to Email Security Gateway with message trace and purge capability",
      "Sandbox environment for attachment/URL detonation",
      "Threat-intel enrichment (VirusTotal, URLScan, AbuseIPDB)",
      "SIEM visibility into proxy, DNS, and EDR",
    ],
    tools: ["Email Security Gateway", "SIEM", "EDR", "Sandbox (any.run / Cuckoo)", "VirusTotal", "URLScan", "AbuseIPDB"],
    steps: [
      {
        title: "Step 1 — Review Email",
        where: "Email Security / User Report",
        actions: ["Inspect sender, subject, body, attachments, and links"],
        lookFor: ["Lookalike domains", "Urgency / social engineering", "Password-protected attachments", "Mismatched display name"],
        why: "Establish whether the email exhibits phishing characteristics.",
      },
      {
        title: "Step 2 — Header Analysis",
        where: "Raw email headers",
        actions: ["Check SPF, DKIM, DMARC", "Extract originating IP and Received chain"],
        lookFor: ["Authentication failures", "Suspicious sending infrastructure"],
        why: "Confirm spoofing and identify true origin.",
      },
      {
        title: "Step 3 — Threat Intelligence",
        tools: "VirusTotal, URLScan, AbuseIPDB",
        actions: ["Enrich sender domain, IPs, URLs, and file hashes"],
        lookFor: ["Known-bad reputation", "Campaign attribution", "Sibling infrastructure"],
        why: "Determine whether the campaign is documented and how widespread.",
      },
      {
        title: "Step 4 — Attachment / URL Sandbox",
        tools: "any.run / Cuckoo / URLScan",
        actions: ["Detonate attachments and URLs in isolated environment"],
        lookFor: ["Process tree", "Network callbacks", "Dropped files", "Persistence"],
        why: "Understand payload behavior without endpoint risk.",
      },
      {
        title: "Step 5 — Log Correlation",
        where: "SIEM (proxy, DNS, EDR)",
        actions: ["Search for callbacks, DNS resolutions, and execution artifacts across all recipients"],
        lookFor: ["Clicks", "Downloads", "Process execution", "C2 traffic"],
        why: "Determine if any user interacted with the payload.",
      },
      {
        title: "Step 6 — Mailbox Sweep",
        where: "Email Security / Message Trace",
        actions: ["Search org-wide for all copies of the campaign", "Purge from mailboxes"],
        why: "Contain the campaign across the entire organization.",
      },
      {
        title: "Step 7 — Endpoint Verification",
        where: "EDR",
        lookFor: ["Suspicious child processes", "Persistence artifacts", "Beaconing"],
        why: "Confirm no downstream compromise on recipient endpoints.",
      },
    ],
    decisionTree: {
      truePositive:
        "Malicious sender / payload / URL confirmed via reputation, sandbox, or logs — regardless of whether a user clicked.",
      falsePositive:
        "Legitimate business communication misclassified. Sender verified, authentication passes, no malicious indicators.",
      benignPositive:
        "Marketing or bulk mail that looks phishy but is legitimate and expected. Educate user and tune filter.",
    },
    containment: [
      "Purge all copies from mailboxes org-wide",
      "Block sender domain, IPs, and callback URLs at gateway and proxy",
      "Isolate any endpoint that executed the payload",
    ],
    eradication: [
      "Remove persistence artifacts and dropped files on compromised hosts",
      "Reset credentials of any user who submitted them via a phishing page",
    ],
    recovery: [
      "Reimage compromised endpoints when malware execution is confirmed",
      "Re-enable user accounts after credential rotation and MFA re-enrollment",
      "Send user comms with sample screenshot and reporting reminder",
    ],
    escalation: [
      "Escalate to IR if any recipient executed the payload or submitted credentials",
      "Escalate if the campaign targets executives or privileged accounts",
      "Escalate if IOCs match known APT infrastructure",
    ],
    mitre: [
      { tactic: "Initial Access", technique: "Phishing: Spearphishing Attachment", id: "T1566.001" },
      { tactic: "Initial Access", technique: "Phishing: Spearphishing Link", id: "T1566.002" },
      { tactic: "Defense Evasion", technique: "Obfuscated Files or Information", id: "T1027" },
      { tactic: "Credential Access", technique: "Credentials from Password Stores", id: "T1555" },
    ],
    detectionOpportunities: [
      "External sender + password-protected archive + password in body",
      "Newly-registered lookalike domains sending to multiple users",
      "First-time-seen sender with attachment and urgency keywords",
      "DMARC fail from a domain resembling a known vendor",
    ],
    lessonsLearned: {
      technical: ["Auto-detonate encrypted attachments using body-extracted passwords"],
      operational: ["Standardize PhishAlert SLA at 5 min for high-severity user reports"],
      detectionImprovements: ["Correlate mailbox purges with EDR sweeps to auto-confirm no execution"],
    },
    references: [
      { label: "MITRE T1566 — Phishing", url: "https://attack.mitre.org/techniques/T1566/" },
      { label: "CISA — Phishing Guidance", url: "https://www.cisa.gov/news-events/news/phishing-guidance-stopping-attack-cycle-phase-one" },
    ],
  },
];
