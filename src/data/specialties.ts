import { House, Factory, CircuitBoard, Radio, Tv, Binary, Terminal, Database, Network, type LucideIcon } from "lucide-react";
import type { ProfileSlug } from "./profiles";

export type Specialty = {
  id: string;
  title: string;
  description: string;
  profile: ProfileSlug;
  icon: LucideIcon;
  status: "Training & client practice" | "Currently studying" | "Documentation pending" | "Planned";
  destination: string;
  destinationLabel: string;
};

/** Navigation categories describe areas, never unverified qualifications. */
export const specialties: Specialty[] = [
  {
    id: "linux-training", profile: "cybersecurity", title: "Linux Diploma Program", icon: Terminal,
    description: "Currently studying a Linux diploma program.", status: "Currently studying", destination: "/cybersecurity#skills", destinationLabel: "View skills"
  },
  {
    id: "sql-training", profile: "cybersecurity", title: "SQL Training", icon: Database,
    description: "SQL is a future study plan. No completed course or certification is claimed.", status: "Planned", destination: "/cybersecurity#skills", destinationLabel: "View skills"
  },
  {
    id: "cisco-training", profile: "cybersecurity", title: "Cisco Training", icon: Network,
    description: "Cisco is a future study plan. No completed course or certification is claimed.", status: "Planned", destination: "/cybersecurity#skills", destinationLabel: "View skills"
  },
  {
    id: "residential-maintenance", profile: "electrical", title: "Residential Electrical Maintenance", icon: House,
    description: "Residential training and documented client work: outlets, switches and lighting.",
    status: "Currently studying", destination: "/electrical#projects", destinationLabel: "View documented projects"
  },
  {
    id: "industrial-maintenance", profile: "electrical", title: "Industrial Electrical Maintenance", icon: Factory,
    description: "Industrial electrical curriculum in progress: control, motors and maintenance. START/STOP practice remains planned.",
    status: "Currently studying", destination: "/electrical#tracks", destinationLabel: "View training"
  },
  {
    id: "basic-electronics", profile: "electronics", title: "Basic Electronics", icon: CircuitBoard,
    description: "Components, circuits, measurement and the foundations of electronic troubleshooting.",
    status: "Currently studying", destination: "/electronics#tracks", destinationLabel: "View training"
  },
  {
    id: "audio-radio", profile: "electronics", title: "Audio & Radio", icon: Radio,
    description: "A dedicated area for audio and radio documentation. No projects have been published in this category yet.",
    status: "Planned", destination: "/electronics#projects", destinationLabel: "View projects"
  },
  {
    id: "television", profile: "electronics", title: "Television", icon: Tv,
    description: "A dedicated area for television documentation. No projects have been published in this category yet.",
    status: "Planned", destination: "/electronics#projects", destinationLabel: "View projects"
  },
  {
    id: "digital-systems", profile: "electronics", title: "Digital Systems", icon: Binary,
    description: "A dedicated area for digital systems documentation. No projects have been published in this category yet.",
    status: "Planned", destination: "/electronics#projects", destinationLabel: "View projects"
  },
];

export const specialtiesFor = (profile: ProfileSlug) => specialties.filter((item) => item.profile === profile);
export const specialtyPath = (item: Specialty) => `/${item.profile}#${item.id}`;
