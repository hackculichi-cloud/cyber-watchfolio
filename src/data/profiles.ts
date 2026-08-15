import { Cpu, Shield, Code2, Wrench, type LucideIcon } from "lucide-react";

/** Slugs used for the per-profile visual identity (see `[data-profile]` in index.css). */
export type ProfileSlug = "cybersecurity" | "development" | "electrical" | "repair";

export type ProfileCardData = {
  slug: ProfileSlug;
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
    slug: "cybersecurity",
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
    slug: "development",
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
    slug: "electrical",
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
    slug: "repair",
    title: "Technical Repair",
    summary:
      "Hands-on smartphone repair training, with console repair planned as a future learning track.",
    href: "/repair",
    icon: Wrench,
    emphasis: "secondary",
    focus: ["Smartphone repair", "Diagnostics", "Console repair (planned)"],
    status: "In training",
  },
];

export type ProfileSection = { id: string; label: string };

export type ProfileIdentity = {
  slug: ProfileSlug;
  path: string;
  /** Extra routes that should also render with this profile identity. */
  aliases: string[];
  label: string;
  eyebrow: string;
  status: string;
  description: string;
  icon: LucideIcon;
  /** Sections rendered by the profile page, used for the sticky in-page nav. */
  sections: ProfileSection[];
  /** CV variant ids from `src/data/cvs.ts` most relevant to this profile. */
  cvIds: string[];
};

export const profileIdentities: ProfileIdentity[] = [
  {
    slug: "cybersecurity",
    path: "/cybersecurity",
    aliases: ["/labs"],
    label: "Cybersecurity",
    eyebrow: "Primary profile",
    status: "Primary focus",
    description:
      "Blue-team oriented work: security fundamentals, monitoring and detection, and structured investigations documented end to end.",
    icon: Shield,
    sections: [
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Skills" },
      { id: "investigations", label: "Investigations" },
      { id: "playbooks", label: "Playbooks" },
      { id: "labs", label: "Labs" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["cybersecurity", "general"],
  },
  {
    slug: "development",
    path: "/software-development",
    aliases: ["/development", "/projects"],
    label: "Software Development",
    eyebrow: "Primary profile",
    status: "Primary focus",
    description:
      "Web development, APIs, backend logic and automation — built to be readable, maintainable and version controlled.",
    icon: Code2,
    sections: [
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["software", "general"],
  },
  {
    slug: "electrical",
    path: "/electrical-electronics",
    aliases: ["/electrical"],
    label: "Electrical & Electronics",
    eyebrow: "Technical profile",
    status: "Currently studying",
    description:
      "Complementary technical training presented honestly as learning in progress — not as professional experience.",
    icon: Cpu,
    sections: [
      { id: "overview", label: "Overview" },
      { id: "tracks", label: "Training" },
      { id: "practice", label: "Practice log" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["electrical", "general"],
  },
  {
    slug: "repair",
    path: "/repair",
    aliases: [],
    label: "Technical Repair",
    eyebrow: "Practical profile",
    status: "In training",
    description:
      "Hands-on device repair training: smartphone diagnostics, component-level work and testing, with console repair planned.",
    icon: Wrench,
    sections: [
      { id: "overview", label: "Overview" },
      { id: "tracks", label: "Training" },
      { id: "work", label: "Repair log" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["electrical", "general"],
  },
];

export const profileBySlug = (slug: ProfileSlug) =>
  profileIdentities.find((p) => p.slug === slug)!;

/** Resolve the active profile identity from a route pathname. */
export const profileForPath = (pathname: string): ProfileIdentity | undefined =>
  profileIdentities.find((p) => p.path === pathname || p.aliases.includes(pathname));
