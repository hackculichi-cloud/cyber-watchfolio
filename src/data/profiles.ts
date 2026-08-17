import { Cpu, Shield, Code2, Wrench, Zap, type LucideIcon } from "lucide-react";

/** Slugs used for the per-profile visual identity (see `[data-profile]` in index.css). */
export type ProfileSlug = "cybersecurity" | "development" | "electrical" | "electronics" | "repair";

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
    title: "Electrical",
    summary:
      "Residential electrical maintenance training: installations, wiring, measurements and diagnostics.",
    href: "/electrical",
    icon: Zap,
    emphasis: "secondary",
    focus: ["Installations", "Wiring", "Measurements", "Diagnostics"],
    status: "Currently studying",
  },
  {
    slug: "electronics",
    title: "Electronics",
    summary:
      "General electronics: components, circuits, PCB work, soldering practice and instrument-based diagnostics.",
    href: "/electronics",
    icon: Cpu,
    emphasis: "secondary",
    focus: ["Components", "Circuits", "Soldering", "Measurements"],
    status: "Currently studying",
  },
  {
    slug: "repair",
    title: "Technical Repair",
    summary:
      "Device repair workshop: smartphones and laptops today, consoles planned — documented before, diagnosis, repair and after.",
    href: "/repair",
    icon: Wrench,
    emphasis: "secondary",
    focus: ["Smartphones", "Laptops", "Consoles (planned)", "Diagnostics"],
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
  /** Short highlight chips rendered in the profile hero. */
  highlights: string[];
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
    highlights: ["SOC / Blue Team", "SIEM & log analysis", "Networking", "Linux hardening"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Skills" },
      { id: "investigations", label: "Investigations" },
      { id: "playbooks", label: "Playbooks" },
      { id: "labs", label: "Labs" },
      { id: "projects", label: "Projects" },
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
    highlights: ["Web apps", "APIs & backend", "Automation", "Git / GitHub"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Technologies" },
      { id: "projects", label: "Projects" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["software", "general"],
  },
  {
    slug: "electrical",
    path: "/electrical",
    aliases: ["/electrical-electronics"],
    label: "Electrical",
    eyebrow: "Technical profile",
    status: "Currently studying",
    description:
      "Residential electrical maintenance training: safe practices, installations, wiring, panels, measurements and diagnostics — documented honestly as learning in progress.",
    icon: Zap,
    highlights: ["Residential installations", "Wiring & panels", "Measurements", "Safety practices"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "tracks", label: "Training" },
      { id: "projects", label: "Projects" },
      { id: "practice", label: "Practice" },
      { id: "measurements", label: "Measurements" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["electrical", "general"],
  },
  {
    slug: "electronics",
    path: "/electronics",
    aliases: [],
    label: "Electronics",
    eyebrow: "Technical profile",
    status: "Currently studying",
    description:
      "General electronics training: components, circuits, PCB work, soldering practice, measurement instruments and structured troubleshooting.",
    icon: Cpu,
    highlights: ["Components & circuits", "PCB work", "Soldering", "Oscilloscope / multimeter"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "tracks", label: "Training" },
      { id: "projects", label: "Projects" },
      { id: "diagnostics", label: "Diagnostics" },
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
      "A repair workshop portfolio: smartphones, laptops and (planned) consoles — every case documented as before, diagnosis, repair and after.",
    icon: Wrench,
    highlights: ["Smartphones", "Laptops", "Consoles (planned)", "Component-level work"],
    sections: [
      { id: "overview", label: "Overview" },
      { id: "smartphones", label: "Smartphones" },
      { id: "laptops", label: "Laptops" },
      { id: "consoles", label: "Consoles" },
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
