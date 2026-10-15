import { Activity, CircuitBoard, Code2, Flame, Gauge, GitBranch, Headphones, ListChecks, Search, ShieldCheck, Smartphone, Terminal, Wrench, type LucideIcon } from "lucide-react";
import type { ProfileSlug } from "./profiles";

export type MascotGear = { label: string; icon: LucideIcon };
/** Visual shortcuts to tools and activities already documented in the profiles. */
export const mascotGear: Record<ProfileSlug, MascotGear[]> = {
  cybersecurity: [{ label: "Wireshark", icon: Activity }, { label: "Linux CLI", icon: Terminal }, { label: "Log analysis", icon: Search }],
  development: [{ label: "VS Code", icon: Code2 }, { label: "Git", icon: GitBranch }, { label: "React", icon: Code2 }],
  electrical: [{ label: "Digital multimeter", icon: Gauge }, { label: "Hand tools", icon: Wrench }, { label: "Electrical safety equipment", icon: ShieldCheck }],
  electronics: [{ label: "Oscilloscope (learning)", icon: Activity }, { label: "Soldering iron", icon: Flame }, { label: "Components", icon: CircuitBoard }],
  repair: [{ label: "Precision toolkit", icon: Wrench }, { label: "Multimeter", icon: Gauge }, { label: "Smartphones", icon: Smartphone }],
  "customer-service": [{ label: "Headset", icon: Headphones }, { label: "Technical support", icon: Wrench }, { label: "Quality Metrics", icon: ListChecks }],
};
