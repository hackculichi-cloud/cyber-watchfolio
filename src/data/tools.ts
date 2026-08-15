import type { ProfileSlug } from "./profiles";

export type ToolGroup = { title: string; items: string[] };

/** Tools, software, hardware and equipment used in each profile. */
export const toolsByProfile: Record<ProfileSlug, ToolGroup[]> = {
  cybersecurity: [
    { title: "Analysis", items: ["Wireshark", "Nmap", "Linux CLI"] },
    { title: "Monitoring", items: ["SIEM (learning)", "Log analysis"] },
    { title: "Automation", items: ["Bash", "Python scripts"] },
  ],
  development: [
    { title: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    { title: "Frontend", items: ["React", "Tailwind CSS", "Vite"] },
    { title: "Workflow", items: ["Git", "GitHub", "VS Code"] },
  ],
  electrical: [
    { title: "Measurement", items: ["Multimeter", "Add your equipment here"] },
    { title: "Installation", items: ["Hand tools", "Add your equipment here"] },
  ],
  repair: [
    { title: "Diagnostics", items: ["Multimeter", "Add your equipment here"] },
    { title: "Rework", items: ["Soldering iron", "Add your equipment here"] },
  ],
};

export type CertificateEntry = {
  id: string;
  title: string;
  issuer?: string;
  status: "In progress" | "Planned" | "Completed";
  profile: ProfileSlug;
  date?: string;
};

/** Only publish real certificates. Empty on purpose. */
export const certificates: CertificateEntry[] = [];
