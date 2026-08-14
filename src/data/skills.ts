export type SkillGroupData = { title: string; note?: string; skills: string[] };

export const cybersecuritySkills: SkillGroupData[] = [
  {
    title: "Foundations",
    skills: ["Networking", "TCP/IP", "Linux", "Cybersecurity fundamentals", "Hardening"],
  },
  {
    title: "SOC / Blue Team",
    skills: ["SOC operations", "SIEM", "Alert triage", "Incident investigation", "Write-ups"],
  },
  {
    title: "Tooling",
    skills: ["Nmap", "Wireshark", "Scripts & automation", "Capture The Flag", "Security labs"],
  },
];

export const softwareSkills: SkillGroupData[] = [
  { title: "Development", skills: ["Web development", "APIs", "Backend"] },
  { title: "Workflow", skills: ["Git / GitHub", "Automation", "Documentation"] },
];

export const transferableSkills: string[] = [
  "Communication",
  "Problem solving",
  "Customer support",
  "Technical communication",
  "Conflict resolution",
  "English / Spanish",
];
