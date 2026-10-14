import { specialtiesFor } from "./specialties";
import type { ProfileSlug } from "./profiles";
import type { LucideIcon } from "lucide-react";

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
  languages: ["English", "Spanish"],
};

export type NavItem = { label: string; href: string; profile?: ProfileSlug; icon?: LucideIcon; description?: string; status?: string; children?: NavItem[] };
const specialtyLinks = (profile: ProfileSlug, path: string): NavItem[] => specialtiesFor(profile).map(item => ({ label: item.title, href: `${path}#${item.id}`, icon: item.icon, description: item.summary, status: item.status }));

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Cybersecurity",
    href: "/cybersecurity",
    profile: "cybersecurity",
    children: specialtyLinks("cybersecurity", "/cybersecurity"),
  },
  {
    label: "Software Development",
    href: "/software-development",
    profile: "development",
    children: specialtyLinks("development", "/software-development"),
  },
  {
    label: "Residential & Industrial Electrical Maintenance",
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
    label: "Technical Repair",
    href: "/repair",
    profile: "repair",
    children: specialtyLinks("repair", "/repair"),
  },
  {
    label: "Call Center & Customer Service", href: "/experience",
    profile: "customer-service",
    children: specialtyLinks("customer-service", "/experience"),
  },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];
