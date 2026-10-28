import { specialtiesFor } from "./specialties";
import type { ProfileSlug } from "./profiles";
import { GraduationCap, Scissors, Wrench, type LucideIcon } from "lucide-react";

export const site = {
  name: "Christian Armando Velasco Estrada",
  shortName: "Christian Velasco",
  role: "IT • Cybersecurity • Software Development",
  tagline:
    "Building my career in technology and cybersecurity while developing practical skills across multiple technical fields.",
  intro:
    "My professional focus is IT, cybersecurity and software development. Alongside that path I keep developing multidisciplinary technical skills, and I bring 7 years of bilingual customer service experience to every team I join.",
  email: "christian@culichi.lat",
  github: "https://github.com/ByCulichi",
  githubHandle: "github.com/ByCulichi",
  linkedin: "https://www.linkedin.com/in/culichi/?locale=es_ES",
  linkedinHandle: "linkedin.com/in/culichi",
  url: "https://culichi.lat",
  languages: ["English", "Spanish"],
};

export type NavItem = { label: string; shortLabel?: string; href: string; profile?: ProfileSlug; icon?: LucideIcon; description?: string; status?: string; children?: NavItem[] };
const shortLabels: Record<string, string> = { residential: "Residential", industrial: "Industrial", "electrical-control": "Control", "basic-electronics": "Basic Electronics", "television-video": "Television & video", "audio-radio": "Audio & radio", "digital-systems": "Digital systems", microcontrollers: "Microcontrollers", microcomputers: "Microcomputers", "industrial-electronics": "Industrial electronics", "bilingual-support": "Bilingual support", "operations-supervision": "Operations", "technical-training": "Support & training" };
const specialtyLinks = (profile: ProfileSlug, path: string): NavItem[] => specialtiesFor(profile).map(item => ({ label: item.title, shortLabel: shortLabels[item.id], href: `${path}#${item.id}`, icon: item.icon, description: item.summary, status: item.status }));

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Cybersecurity",
    href: "/cybersecurity",
    profile: "cybersecurity",
    children: specialtyLinks("cybersecurity", "/cybersecurity"),
  },
  {
    label: "Software Development", shortLabel: "Software",
    href: "/software-development",
    profile: "development",
    children: specialtyLinks("development", "/software-development"),
  },
  {
    label: "Residential & Industrial Electrical Maintenance", shortLabel: "Electricity",
    href: "/electrical",
    profile: "electrical",
    children: specialtyLinks("electrical", "/electrical"),
  },
  {
    label: "Electronics", href: "/electronics",
    profile: "electronics",
    children: specialtyLinks("electronics", "/electronics"),
  },
  {
    label: "Technical Repair", shortLabel: "Repair",
    href: "/repair",
    profile: "repair",
    children: specialtyLinks("repair", "/repair"),
  },
  {
    label: "Call Center & Customer Service", shortLabel: "Customer service", href: "/experience",
    profile: "customer-service",
    children: specialtyLinks("customer-service", "/experience"),
  },
  {
    label: "Barbering", href: "/barbering", profile: "barbering",
    children: [
      { label: "Training", href: "/barbering#training", icon: GraduationCap },
      { label: "My cuts", href: "/barbering#cuts", icon: Scissors },
      { label: "Tools", href: "/barbering#tools", icon: Wrench },
    ],
  },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];
