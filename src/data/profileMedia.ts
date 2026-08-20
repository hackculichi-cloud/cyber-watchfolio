import type { ProfileSlug } from "./profiles";
import heroCybersecurity from "@/assets/hero-cybersecurity.jpg";
import heroDevelopment from "@/assets/hero-development.jpg";
import heroElectrical from "@/assets/hero-electrical.jpg";
import heroElectronics from "@/assets/hero-electronics.jpg";
import heroRepair from "@/assets/hero-repair.jpg";

/**
 * Atmospheric hero imagery per professional world.
 * Swap a file here and the hero + homepage card update everywhere.
 */
export const profileHeroImage: Record<ProfileSlug, string> = {
  cybersecurity: heroCybersecurity,
  development: heroDevelopment,
  electrical: heroElectrical,
  electronics: heroElectronics,
  repair: heroRepair,
};

export const profileHeroAlt: Record<ProfileSlug, string> = {
  cybersecurity: "Abstract network topology with glowing nodes representing security monitoring",
  development: "Dark code editor and software architecture diagrams glowing in green",
  electrical: "High voltage electrical grid with lightning arcs in amber light",
  electronics: "Macro photo of a circuit board with glowing traces and components",
  repair: "Electronics repair bench with a disassembled phone, laptop board and precision tools",
};
