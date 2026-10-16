import { PhoneCall, Cpu, Shield, Code2, Wrench, Zap, type LucideIcon } from "lucide-react";

/** Slugs used for the per-profile visual identity (see `[data-profile]` in index.css). */
export type ProfileSlug = "cybersecurity" | "development" | "electrical" | "electronics" | "repair" | "customer-service";

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
      "Educational VPN, RDP and phishing investigations, log analysis and response playbooks, supported by Linux training and bilingual communication.",
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
      "React/Next.js and TypeScript interfaces, Python report automation and public GitHub projects, supported by partial Academlo studies and AWS Cloud Practitioner preparation.",
    href: "/software-development",
    icon: Code2,
    emphasis: "primary",
    focus: ["Web", "APIs", "Backend", "Automation", "Git / GitHub"],
    status: "Primary focus",
  },
  {
    slug: "electrical",
    title: "Residential & Industrial Electrical Maintenance",
    summary:
      "Electrical foundations, drawings, AC/DC measurement and residential/industrial training, with documented installations and maintenance practice.",
    href: "/electrical",
    icon: Zap,
    emphasis: "secondary",
    focus: ["Installations", "Wiring", "Measurements", "Diagnostics"],
    status: "Training & practice",
  },
  {
    slug: "electronics",
    title: "Electronics",
    summary:
      "Basic electronics at ETO: components, circuit behavior, diagrams, metrology and laboratory diagnosis, supported by soldering and repair coursework.",
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
      "LIDETEC phone-repair training: diagnosis, disassembly, measurement, soldering and software foundations, with documented iPhone battery and display replacements.",
    href: "/repair",
    icon: Wrench,
    emphasis: "secondary",
    focus: ["Smartphones", "Laptops", "Consoles (planned)", "Diagnostics"],
    status: "In training",
  },
  {
    slug: "customer-service",
    title: "Call Center & Customer Service",
    summary: "7 years of bilingual customer service, communication, user support and conflict resolution.",
    href: "/experience",
    icon: PhoneCall,
    emphasis: "secondary",
    focus: ["English / Spanish", "Communication", "Customer support", "Problem solving"],
    status: "Professional experience",
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
      "I investigate VPN authentication, RDP brute force and phishing in LetsDefend labs, document evidence and write response playbooks. I am also taking a Linux diploma program and seeking my first SOC Tier 1 opportunity.",
    icon: Shield,
    highlights: ["SOC / Blue Team", "SIEM & log analysis", "Networking", "Linux hardening"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Skills" },
      { id: "investigations", label: "Investigations" },
      { id: "playbooks", label: "Playbooks" },
      { id: "labs", label: "Labs" },
      { id: "projects", label: "Projects" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "certifications", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["cybersecurity"],
  },
  {
    slug: "development",
    path: "/software-development",
    aliases: ["/development", "/projects"],
    label: "Software Development",
    eyebrow: "Primary profile",
    status: "Primary focus",
    description:
      "I build React/Next.js and TypeScript interfaces and automate Excel reports with Python. My public GitHub projects connect those skills with practical examples. I studied frontend, backend and full stack at Academlo without completing the program, and I am preparing for AWS Cloud Practitioner.",
    icon: Code2,
    highlights: ["Web apps", "APIs & backend", "Automation", "Git / GitHub"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "overview", label: "Overview" },
      { id: "skills", label: "Technologies" },
      { id: "projects", label: "Projects" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "certifications", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["software"],
  },
  {
    slug: "electrical",
    path: "/electrical",
    aliases: ["/electrical-electronics"],
    label: "Residential & Industrial Electrical Maintenance",
    eyebrow: "Technical profile",
    status: "Training & practice",
    description:
      "I combine electrical drawings, circuit analysis, measurement and installation knowledge with residential client maintenance and course practice. My RED CONOCER and Udemy studies also cover industrial systems, control, motors and diagnostics.",
    icon: Zap,
    highlights: ["Float-switch practice", "Residential work", "Wiring & panels", "Measurements"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "projects", label: "Projects" },
      { id: "evidence", label: "Completed work" },
      { id: "certificate", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["electrical"],
  },
  {
    slug: "electronics",
    path: "/electronics",
    aliases: [],
    label: "Electronics",
    eyebrow: "Technical profile",
    status: "Currently studying",
    description:
      "I study basic electronics at Escuela Tecnológica de Occidente, applying components, electronic diagrams, instruments and circuit diagnosis in laboratory training. My LIDETEC course adds soldering, hot air and board-care foundations.",
    icon: Cpu,
    highlights: ["Components & circuits", "PCB work", "Soldering", "Oscilloscope / multimeter"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "overview", label: "Overview" },
      { id: "tracks", label: "Training" },
      { id: "projects", label: "Projects" },
      { id: "diagnostics", label: "Diagnostics" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "certifications", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["electronics"],
  },
  {
    slug: "repair",
    path: "/repair",
    aliases: [],
    label: "Technical Repair",
    eyebrow: "Practical profile",
    status: "In training",
    description:
      "I combine LIDETEC service, diagnosis and board-repair training with completed iPhone 12 Pro and 14 Pro battery replacements and an iPhone XR display replacement. Each case includes its own real photographs and final checks.",
    icon: Wrench,
    highlights: ["Smartphones", "Laptops", "Consoles (planned)", "Component-level work"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "overview", label: "Overview" },
      { id: "smartphones", label: "Smartphones" },
      { id: "laptops", label: "Laptops" },
      { id: "consoles", label: "Consoles" },
      { id: "work", label: "Repair log" },
      { id: "gallery", label: "Gallery" },
      { id: "tools", label: "Tools" },
      { id: "certifications", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["repair"],
  },
  {
    slug: "customer-service",
    path: "/experience",
    aliases: [],
    label: "Call Center & Customer Service",
    eyebrow: "Professional skills",
    status: "Professional experience",
    description: "Bilingual customer service, operations supervision and technical support experience at TCS, TTEC, Alorica and TP, including SLA follow-up, incident escalation, training and logistics coordination.",
    icon: PhoneCall,
    highlights: ["English / Spanish", "Operations supervision", "Tier 2 support", "Technical training"],
    sections: [
      { id: "specialties", label: "Specialties" },
      { id: "skills", label: "Skills" },
      { id: "background", label: "Experience" },
      { id: "transferable", label: "Transferable value" },
      { id: "certifications", label: "Certifications" },
      { id: "cv", label: "CV" },
    ],
    cvIds: ["customer-service"],
  },
];

export const profileBySlug = (slug: ProfileSlug) =>
  profileIdentities.find((p) => p.slug === slug)!;

/** Resolve the active profile identity from a route pathname. */
export const profileForPath = (pathname: string): ProfileIdentity | undefined =>
  profileIdentities.find((p) => p.path === pathname || p.aliases.includes(pathname));
