import type { LucideIcon } from "lucide-react";
import type { ProfileSlug } from "./profiles";
import { specialtiesFor, specialtyPath } from "./specialties";

export const site = {
  name: "Christian Armando Velasco Estrada",
  shortName: "Christian Velasco",
  role: "IT • Cybersecurity • Software Development",
  tagline:
    "Building my career in technology and cybersecurity while developing practical skills across multiple technical fields.",
  intro:
    "My professional focus is IT, cybersecurity and software development. Alongside that path I keep developing multidisciplinary technical skills, and I bring more than 5 years of bilingual customer service experience to every team I join.",
  email: "christian@culichi.lat",
  github: "https://github.com/ByCulichi",
  githubHandle: "github.com/ByCulichi",
  linkedin: "https://www.linkedin.com/in/culichi/?locale=es_ES",
  linkedinHandle: "linkedin.com/in/culichi",
  url: "https://culichi.lat",
  // Uploaded Lovable assets have a separate origin from the public canonical domain.
  assetOrigin: "https://culichi.lovable.app",
  languages: ["English", "Spanish"],
};

export type NavItem = { label: string; href: string; profile?: ProfileSlug; icon?: LucideIcon; description?: string; children?: NavItem[] };
const specialtyLinks = (profile: ProfileSlug): NavItem[] => specialtiesFor(profile).map((item) => ({ label: item.title, href: specialtyPath(item), icon: item.icon, description: item.status }));

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    profile: "cybersecurity",
    label: "Cybersecurity",
    href: "/cybersecurity",
    children: [
      { label: "Cybersecurity", href: "/cybersecurity" },
      ...specialtyLinks("cybersecurity"),
      { label: "Labs", href: "/labs" },
    ],
  },
  {
    profile: "development",
    label: "Software Development",
    href: "/software-development",
    children: [{ label: "Projects", href: "/projects" }],
  },
  {
    profile: "electrical",
    label: "Residential & Industrial Electrical Maintenance",
    href: "/electrical",
    children: [
      ...specialtyLinks("electrical"),
      { label: "Overview", href: "/electrical" },
      { label: "Training", href: "/electrical#tracks" },
      { label: "Projects", href: "/electrical#projects" },
      { label: "Practical experience", href: "/electrical#practice" },
      { label: "CV", href: "/electrical#cv" },
    ],
  },
  {
    profile: "electronics",
    label: "Electronics", href: "/electronics",
    children: [
      ...specialtyLinks("electronics"),
      { label: "Overview", href: "/electronics" },
      { label: "Training", href: "/electronics#tracks" },
      { label: "Projects", href: "/electronics#projects" },
      { label: "Diagnostics & measurements", href: "/electronics#diagnostics" },
      { label: "Tools", href: "/electronics#tools" },
    ],
  },
  {
    profile: "repair",
    label: "Technical Repair",
    href: "/repair",
    children: [
      { label: "Smartphones", href: "/repair#smartphones" },
      { label: "Laptops", href: "/repair#laptops" },
      { label: "Consoles", href: "/repair#consoles" },
    ],
  },
  { label: "Experience", href: "/experience" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];
