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
  { title: "Frontend", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Python automation", skills: ["Python", "pandas", "XlsxWriter", "Excel reports", "REST API"] },
  { title: "Workflow", skills: ["Git / GitHub", "Vercel", "TypeScript checks", "ESLint", "Vitest", "Playwright"] },
  { title: "Cloud & backend learning", note: "AWS Cloud Practitioner preparation and continued exploration of Node.js, Docker and backend development.", skills: ["AWS Cloud Practitioner (preparation)", "Node.js", "Docker", "Backend foundations"] },
];

export const transferableSkills: string[] = [
  "Communication",
  "Problem solving",
  "Customer support",
  "Technical communication",
  "Conflict resolution",
  "English / Spanish",
];
