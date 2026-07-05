import type { Investigation } from "@/types/soc";

export const investigations: Investigation[] = [
  {
    id: "INC-2024-002",
    title: "VPN Unauthorized Access Attempt",
    severity: "medium",
    tools: ["SIEM", "Firewall", "VPN", "MFA"],
    difficulty: "Intermediate",
    estimatedTime: "45 min",
    shortDescription:
      "Multiple failed login attempts detected from an external IP triggering abnormal MFA (OTP) activity on a VPN account.",
    caseInfo: {
      caseId: "INC-2024-002",
      incidentName: "VPN Unauthorized Access Attempt",
      alertId: "ALRT-VPN-8842",
      date: "2024-06-14",
      analyst: "Christian Velasco",
    },
    executiveSummary: {
      whatHappened:
        "An external IP triggered repeated VPN authentication attempts against a corporate user account, generating abnormal MFA (OTP) activity within a short time window.",
      whyImportant:
        "MFA abuse and repeated auth failures are strong precursors to account takeover and initial access to internal networks.",
      finalVerdict: "True Positive",
      businessImpact:
        "No successful authentication was observed; access to internal resources was not gained. Impact contained to alerting and IAM cleanup.",
    },
    alertInfo: {
      alertName: "Suspicious VPN Login with MFA Abuse",
      severity: "medium",
      detectionRule: "vpn_auth_failures_with_mfa_flood",
      eventTime: "2024-06-14 03:12 UTC",
      source: "203.0.113.44 (external)",
      destination: "vpn-gw-01",
      user: "j.perez",
      host: "N/A (network edge)",
      detectionProduct: "SIEM (Splunk) + VPN logs",
    },
    triage: {
      whyTriggered:
        "Correlation rule matched multiple failed VPN auth events plus repeated OTP requests from the same source IP.",
      initialHypothesis: "Credential stuffing / MFA fatigue attempt.",
      initialSeverity: "medium",
      priority: "P2",
    },
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        objective: "Establish scope of the alert.",
        tool: "SIEM",
        evidence: ["Username, source IP, timestamp, target = VPN gateway"],
        conclusion: "Confirmed a user-authentication event on the VPN.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        objective: "Identify the origin of the traffic.",
        tool: "VirusTotal, Whois / RDAP",
        evidence: ["IP registered to a hosting provider outside the org's operating region"],
        conclusion: "Origin is external and geographically unusual for this user.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        objective: "Determine reputation.",
        tool: "VirusTotal, AbuseIPDB",
        evidence: ["Multiple reports for brute force / VPN abuse in last 30 days"],
        conclusion: "IP has a history of credential-abuse behavior.",
      },
      {
        title: "Step 4 — Review Authentication Attempts",
        objective: "Look for repeated failures on the same account.",
        tool: "SIEM + VPN logs",
        evidence: ["12 failed logins in 4 minutes against user j.perez"],
        conclusion: "Pattern is consistent with automated attempts.",
      },
      {
        title: "Step 5 — Check MFA / OTP Activity",
        objective: "Detect MFA fatigue.",
        tool: "Identity provider logs",
        evidence: ["7 OTP push requests in same window, none approved"],
        conclusion: "MFA abuse confirmed — attacker attempting user approval.",
      },
      {
        title: "Step 6 — Confirm Login Result",
        objective: "Determine if access was obtained.",
        tool: "VPN logs",
        evidence: ["No successful authentication event"],
        conclusion: "Access was attempted but not gained.",
      },
    ],
    evidence: [
      { category: "Authentication Logs", items: ["12 VPN auth failures for j.perez from 203.0.113.44"] },
      { category: "IPs", items: ["203.0.113.44 — flagged malicious in threat intel"] },
      { category: "MFA / OTP", items: ["7 push requests, 0 approvals"] },
    ],
    iocs: [
      { type: "IP", value: "203.0.113.44", description: "Source of authentication abuse" },
      { type: "User", value: "j.perez", description: "Targeted account" },
    ],
    mitre: [
      { tactic: "Credential Access", technique: "Brute Force: Password Spraying", id: "T1110.003", evidence: "Repeated failed VPN logins" },
      { tactic: "Credential Access", technique: "Multi-Factor Authentication Request Generation", id: "T1621", evidence: "OTP flood against target user" },
    ],
    timeline: [
      { time: "03:12", event: "First failed VPN login from 203.0.113.44" },
      { time: "03:14", event: "SIEM correlation alert fired" },
      { time: "03:16", event: "MFA push flood begins" },
      { time: "03:22", event: "Analyst triage started" },
      { time: "03:47", event: "Verdict reached — TP, no successful auth" },
      { time: "03:55", event: "Password reset + IP block requested" },
    ],
    analysis: {
      facts: [
        "12 failed VPN logins from a single external IP",
        "7 unapproved MFA push requests to the targeted user",
        "IP flagged malicious in multiple threat intel sources",
      ],
      assumptions: ["Credentials likely obtained from a prior leak / infostealer log"],
      supportingTP: ["Volume + timing + MFA abuse + malicious IP reputation"],
      against: ["No successful authentication — access not gained"],
      confidence: "High",
    },
    responseActions: {
      containment: ["Block 203.0.113.44 at edge firewall", "Force password reset for j.perez"],
      eradication: ["Revoke active sessions and refresh tokens for the user"],
      recovery: ["Re-enroll MFA device", "Notify user of the attempt"],
      monitoring: ["Add IP to watchlist for 30 days", "Tune correlation rule threshold"],
    },
    additionalDataRequested: [
      "EDR timeline for user's workstation",
      "Recent email activity for phishing precursors",
      "Prior 90-day auth baseline for j.perez",
    ],
    lessonsLearned: {
      technical: ["Number-matching MFA would have blocked OTP flood earlier"],
      operational: ["Faster IAM handoff process needed for OTP flood scenarios"],
      detectionImprovements: ["Add rule variant that fires on OTP-only floods without failed auth"],
    },
    finalVerdict: {
      verdict: "True Positive",
      justification:
        "Confirmed credential abuse attempt from a known-malicious IP with MFA push flooding. No successful auth, no downstream compromise.",
    },
    analystNotes:
      "MFA fatigue is now the dominant follow-up pattern after credential-stuffing. Recommend org-wide move to number-matching.",
    references: [
      { label: "MITRE T1621 — MFA Request Generation", url: "https://attack.mitre.org/techniques/T1621/" },
      { label: "CISA — Implementing Number Matching in MFA Applications", url: "https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf" },
    ],
  },
  {
    id: "INC-2024-003",
    title: "RDP Brute Force Attack Detected",
    severity: "high",
    tools: ["SIEM", "RDP", "Windows", "Threat Intel"],
    difficulty: "Intermediate",
    estimatedTime: "40 min",
    shortDescription:
      "Multiple failed RDP login attempts detected from a malicious external IP targeting a Windows host using different usernames.",
    caseInfo: {
      caseId: "INC-2024-003",
      incidentName: "RDP Brute Force Attack",
      alertId: "ALRT-RDP-1177",
      date: "2024-07-02",
      analyst: "Christian Velasco",
    },
    executiveSummary: {
      whatHappened:
        "A single external IP performed high-volume RDP authentication attempts against a Windows host using multiple usernames.",
      whyImportant:
        "RDP brute force is a common initial-access technique that frequently precedes ransomware deployment.",
      finalVerdict: "True Positive",
      businessImpact: "No compromise — attempts were fully contained at the network layer.",
    },
    alertInfo: {
      alertName: "RDP Brute Force — Repeated Failed Logons",
      severity: "high",
      detectionRule: "rdp_multi_user_failed_logon_burst",
      eventTime: "2024-07-02 22:41 UTC",
      source: "198.51.100.77 (external)",
      destination: "srv-app-04 (Windows)",
      detectionProduct: "SIEM + Windows Security Logs",
    },
    triage: {
      whyTriggered: "Threshold exceeded on failed logon Event ID 4625 from a single IP.",
      initialHypothesis: "Automated RDP brute force.",
      initialSeverity: "high",
      priority: "P1",
    },
    steps: [
      {
        title: "Step 1 — Collect Alert Data",
        tool: "SIEM",
        evidence: ["Source IP, destination host, protocol=RDP, timestamps"],
        conclusion: "Alert context established.",
      },
      {
        title: "Step 2 — Analyze Source IP",
        tool: "VirusTotal, Whois",
        evidence: ["Hosting provider IP, foreign geolocation"],
        conclusion: "External and suspicious.",
      },
      {
        title: "Step 3 — Check IP Reputation",
        tool: "VirusTotal, AbuseIPDB",
        evidence: ["Multiple recent brute-force reports"],
        conclusion: "Known-bad reputation.",
      },
      {
        title: "Step 4 — Review Authentication Logs",
        tool: "Windows Security Log (4625/4624)",
        evidence: ["87 x 4625 across 14 unique usernames within 3 minutes", "0 x 4624 from source IP"],
        conclusion: "Brute-force pattern confirmed, no success.",
      },
      {
        title: "Step 5 — Endpoint Verification",
        tool: "EDR",
        evidence: ["No child processes launched from lsass/svchost tied to this IP"],
        conclusion: "Host not compromised.",
      },
    ],
    evidence: [
      { category: "Authentication Logs", items: ["87 x Event ID 4625", "0 x Event ID 4624 from source"] },
      { category: "IPs", items: ["198.51.100.77 — malicious reputation"] },
      { category: "EDR", items: ["No suspicious process activity on srv-app-04"] },
    ],
    iocs: [
      { type: "IP", value: "198.51.100.77", description: "Brute force source" },
      { type: "Host", value: "srv-app-04", description: "Targeted server" },
    ],
    mitre: [
      { tactic: "Credential Access", technique: "Brute Force: Password Guessing", id: "T1110.001", evidence: "87 failed logons across 14 usernames" },
      { tactic: "Initial Access", technique: "External Remote Services", id: "T1133", evidence: "RDP exposed to internet" },
    ],
    timeline: [
      { time: "22:41", event: "First 4625 from 198.51.100.77" },
      { time: "22:43", event: "SIEM alert fired" },
      { time: "22:46", event: "Analyst triage started" },
      { time: "22:57", event: "Threat-intel match confirmed" },
      { time: "23:03", event: "Verdict: TP — no success" },
      { time: "23:10", event: "IP blocked, host monitored" },
    ],
    analysis: {
      facts: ["87 failed logons in <3 min", "14 unique usernames used", "No successful auth"],
      assumptions: ["Attacker using a common username wordlist"],
      supportingTP: ["Volume, distribution across usernames, IP reputation"],
      against: ["No successful auth; no post-logon activity"],
      confidence: "High",
    },
    responseActions: {
      containment: ["Block 198.51.100.77 at firewall", "Restrict RDP to VPN only"],
      eradication: ["Confirm no persistent sessions on srv-app-04"],
      recovery: ["Enforce account lockout policy review"],
      monitoring: ["Continuous EDR watch on srv-app-04 for 72h"],
    },
    additionalDataRequested: [
      "Full 4625 export for 30-day baseline",
      "NetFlow to/from srv-app-04",
      "Sysmon logs for the affected host",
    ],
    lessonsLearned: {
      technical: ["RDP should never be internet-exposed without VPN + MFA"],
      operational: ["Faster automation for firewall block on TP brute-force verdicts"],
      detectionImprovements: ["Tune rule to fire earlier on >5 unique usernames within 60s"],
    },
    finalVerdict: {
      verdict: "True Positive",
      justification: "Confirmed automated RDP brute force. Fully contained; no compromise.",
    },
    references: [
      { label: "MITRE T1110.001 — Password Guessing", url: "https://attack.mitre.org/techniques/T1110/001/" },
      { label: "CISA — Guide to Securing Remote Access", url: "https://www.cisa.gov/news-events/cybersecurity-advisories" },
    ],
  },
  {
    id: "INC-2024-004",
    title: "Phishing Email with Malicious Attachment",
    severity: "high",
    tools: ["Email Security", "SIEM", "EDR", "Proxy", "VirusTotal"],
    difficulty: "Intermediate",
    estimatedTime: "60 min",
    shortDescription:
      "User reported a suspicious email impersonating a vendor with a password-protected ZIP attachment containing a malicious loader.",
    caseInfo: {
      caseId: "INC-2024-004",
      incidentName: "Phishing Email with Malicious Attachment",
      alertId: "ALRT-PHISH-4471",
      date: "2024-08-19",
      analyst: "Christian Velasco",
    },
    executiveSummary: {
      whatHappened:
        "An employee received a spoofed invoice email from a lookalike vendor domain containing a password-protected ZIP. The ZIP held a JavaScript loader that, when executed, would reach out to a known malware C2 domain.",
      whyImportant:
        "Phishing with password-protected archives is a leading initial-access vector for infostealers and ransomware because the payload bypasses most inline AV scanning.",
      finalVerdict: "True Positive",
      businessImpact:
        "User reported the email before opening the attachment. No execution, no C2 traffic, no compromise. Mailbox-wide purge removed 14 additional copies delivered to other users.",
    },
    alertInfo: {
      alertName: "Suspicious Attachment — Password-Protected Archive from External Sender",
      severity: "high",
      detectionRule: "email_pw_protected_archive_external_lookalike",
      eventTime: "2024-08-19 09:47 UTC",
      source: "billing@vendor-support[.]co (external)",
      destination: "m.gomez@corp.local",
      user: "m.gomez",
      host: "wks-mgomez-04",
      detectionProduct: "Email Security Gateway + User Report (PhishAlert)",
    },
    triage: {
      whyTriggered:
        "Email gateway flagged a password-protected ZIP from an external sender using a domain lexically similar to an approved vendor. User also submitted a PhishAlert report.",
      initialHypothesis: "Targeted phishing delivering a malware loader via encrypted archive.",
      initialSeverity: "high",
      priority: "P1",
    },
    steps: [
      {
        title: "Step 1 — Review Email",
        objective: "Determine whether the email exhibits phishing characteristics.",
        tool: "Email Security",
        evidence: [
          "Sender domain vendor-support[.]co is a lookalike of the legitimate vendor-support.com",
          "Password-protected ZIP with the password included in the email body",
          "Urgency language: 'overdue invoice — action required today'",
        ],
        conclusion: "Email is highly suspicious and consistent with phishing.",
      },
      {
        title: "Step 2 — Header Analysis",
        objective: "Validate authentication and true origin.",
        tool: "Email headers / EOP",
        evidence: [
          "SPF: softfail",
          "DKIM: none",
          "DMARC: fail",
          "Originating IP 185.220.101.42 — hosted in known bulletproof range",
        ],
        conclusion: "Authentication failures and hostile-hosted origin confirm spoofing.",
      },
      {
        title: "Step 3 — Threat Intelligence",
        objective: "Enrich sender, IPs, hashes, and URLs.",
        tool: "VirusTotal, AbuseIPDB, URLScan",
        query: "hash: 6f2c1a...9e / domain: vendor-support[.]co",
        evidence: [
          "Attachment JS loader hash flagged malicious by 41/68 engines",
          "Callback domain cdn-metrics[.]top linked to known infostealer family",
        ],
        conclusion: "Payload and infrastructure tied to a known commodity malware campaign.",
      },
      {
        title: "Step 4 — Attachment Sandbox Analysis",
        objective: "Understand payload behavior without executing on endpoint.",
        tool: "any.run / Cuckoo",
        evidence: [
          "JS spawns powershell.exe with base64 command",
          "Downloads secondary stage from hxxps://cdn-metrics[.]top/upd",
          "Persistence via Run key HKCU\\...\\Run\\SysUpd",
        ],
        conclusion: "Loader for infostealer with C2 beacon and registry persistence.",
      },
      {
        title: "Step 5 — Log Correlation",
        objective: "Verify whether any user opened the attachment.",
        tool: "SIEM (proxy, EDR, DNS)",
        evidence: [
          "No DNS resolution for cdn-metrics[.]top from any internal host",
          "No process execution of the ZIP or JS on wks-mgomez-04",
          "Email gateway shows 15 total recipients, 0 clicks",
        ],
        conclusion: "Campaign delivered but not executed. No compromise.",
      },
      {
        title: "Step 6 — Mailbox Sweep",
        objective: "Identify and remove all copies across the org.",
        tool: "Email Security / Message Trace",
        evidence: ["14 additional recipients identified and purged"],
        conclusion: "Full org-wide containment of the campaign.",
      },
    ],
    evidence: [
      { category: "Email", items: ["Spoofed sender billing@vendor-support[.]co", "Password-protected ZIP 'invoice_8842.zip'"] },
      { category: "Headers", items: ["SPF softfail, DKIM none, DMARC fail", "Origin IP 185.220.101.42"] },
      { category: "Attachments", items: ["invoice_8842.js — SHA256 6f2c1a...9e"] },
      { category: "URLs", items: ["hxxps://cdn-metrics[.]top/upd (C2)"] },
      { category: "Hashes", items: ["6f2c1a09b7...9e (JS loader)"] },
      { category: "Domains", items: ["vendor-support[.]co", "cdn-metrics[.]top"] },
      { category: "IPs", items: ["185.220.101.42 — malicious reputation"] },
      { category: "Proxy Logs", items: ["No outbound traffic to C2 observed"] },
      { category: "Authentication Logs", items: ["No anomalous logons for m.gomez"] },
    ],
    iocs: [
      { type: "Domain", value: "vendor-support[.]co", description: "Lookalike sender domain" },
      { type: "Domain", value: "cdn-metrics[.]top", description: "Malware C2" },
      { type: "IP", value: "185.220.101.42", description: "Sending infrastructure" },
      { type: "SHA256", value: "6f2c1a09b7...9e", description: "Malicious JS loader" },
      { type: "Email", value: "billing@vendor-support[.]co", description: "Spoofed sender" },
    ],
    mitre: [
      { tactic: "Initial Access", technique: "Phishing: Spearphishing Attachment", id: "T1566.001", evidence: "Password-protected ZIP with JS loader" },
      { tactic: "Defense Evasion", technique: "Obfuscated Files or Information", id: "T1027", evidence: "Password-protected archive bypasses AV scanning" },
      { tactic: "Execution", technique: "Command and Scripting Interpreter: JavaScript", id: "T1059.007", evidence: "JS loader designed to launch PowerShell" },
      { tactic: "Command and Control", technique: "Application Layer Protocol: Web Protocols", id: "T1071.001", evidence: "HTTPS callback to cdn-metrics[.]top" },
    ],
    timeline: [
      { time: "09:47", event: "Email delivered to 15 recipients" },
      { time: "09:52", event: "m.gomez submits PhishAlert report" },
      { time: "09:54", event: "Email gateway rule fires on password-protected archive" },
      { time: "10:05", event: "Analyst triage begins" },
      { time: "10:20", event: "Sandbox confirms malicious behavior" },
      { time: "10:35", event: "Org-wide mailbox purge executed" },
      { time: "10:45", event: "Domain + IP blocked at proxy and firewall" },
      { time: "10:50", event: "Verdict: True Positive — no compromise" },
    ],
    analysis: {
      facts: [
        "15 recipients received the spoofed email",
        "Attachment confirmed malicious via sandbox and multiple AV engines",
        "No user executed the attachment; no C2 traffic observed",
      ],
      assumptions: ["Campaign is opportunistic commodity malware rather than targeted APT"],
      supportingTP: ["DMARC failure", "Malicious hash", "Known-bad C2 domain", "Lookalike sender"],
      against: ["No execution, no beacon, no lateral movement"],
      confidence: "High",
    },
    responseActions: {
      containment: [
        "Purge all copies from mailboxes org-wide",
        "Block vendor-support[.]co and cdn-metrics[.]top at proxy",
        "Block sending IP at edge",
      ],
      eradication: ["Confirm no execution artifacts on any recipient endpoint via EDR sweep"],
      recovery: ["Send user comms with sample screenshot and reporting reminder"],
      monitoring: ["Add IOCs to watchlist for 60 days", "Hunt for related lookalike domains"],
    },
    additionalDataRequested: [
      "EDR timeline for all 15 recipient endpoints",
      "DNS logs for cdn-metrics[.]top across 30 days",
      "Windows Event Logs and Sysmon for wks-mgomez-04",
      "Full email headers for correlated campaigns",
      "Firewall logs to hostile ASN",
    ],
    lessonsLearned: {
      technical: ["Password-protected archives should be quarantined by default from external senders"],
      operational: ["PhishAlert workflow worked as designed — reduce SLA from 15 to 5 min for high-severity reports"],
      detectionImprovements: [
        "Add rule: external sender + password-protected archive + password disclosed in body",
        "Auto-detonate encrypted attachments in sandbox using body-extracted password",
      ],
    },
    finalVerdict: {
      verdict: "True Positive",
      justification:
        "Confirmed phishing campaign delivering a known malware loader via password-protected archive. Fully contained pre-execution through user report and mailbox purge.",
    },
    analystNotes:
      "User awareness training paid off here — the report arrived before the gateway rule fired. Recommend spotlighting m.gomez in the monthly security newsletter.",
    references: [
      { label: "MITRE T1566.001 — Spearphishing Attachment", url: "https://attack.mitre.org/techniques/T1566/001/" },
      { label: "CISA — Phishing Guidance", url: "https://www.cisa.gov/news-events/news/phishing-guidance-stopping-attack-cycle-phase-one" },
    ],
  },
];
