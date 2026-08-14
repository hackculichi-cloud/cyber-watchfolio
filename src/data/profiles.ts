import { Cpu, Shield, Code2, Wrench, type LucideIcon } from "lucide-react";

export type ProfileCardData = {
  title: string;
  summary: string;
  href: string;
  icon: LucideIcon;
  emphasis: "primary" | "secondary";
  focus: string[];
  status?: string;
};

export const professionalProfiles: ProfileCardData[] = [
  {
    title: "Cybersecurity",
    summary:
      "Blue-team oriented: monitoring, detection, alert triage and structured incident investigation with documented playbooks.",
    href: "/cybersecurity",
    icon: Shield,
    emphasis: "primary",
    focus: ["SOC / Blue Team", "SIEM", "Networking", "Linux", "Hardening"],
    status: "Primary focus",
  },
  {
    title: "Software Development",
    summary:
      "Web development, APIs and automation with a maintainable, version-controlled workflow.",
    href: "/software-development",
    icon: Code2,
    emphasis: "primary",
    focus: ["Web", "APIs", "Backend", "Automation", "Git / GitHub"],
    status: "Primary focus",
  },
  {
    title: "Electrical & Electronics",
    summary:
      "Currently studying residential electrical maintenance and general electronics as complementary technical training.",
    href: "/electrical-electronics",
    icon: Cpu,
    emphasis: "secondary",
    focus: ["Residential electrical", "General electronics"],
    status: "Currently studying",
  },
  {
    title: "Technical Repair",
    summary:
      "Hands-on smartphone repair training, with console repair planned as a future learning track.",
    href: "/electrical-electronics#repair",
    icon: Wrench,
    emphasis: "secondary",
    focus: ["Smartphone repair", "Diagnostics", "Console repair (planned)"],
    status: "In training",
  },
];
