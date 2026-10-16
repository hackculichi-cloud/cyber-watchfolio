import { profileHeroImage } from "./profileMedia";
import type { ProfileSlug } from "./profiles";

/** The original per-area visual identity remains independent of illustrated workplaces. */
export const profileAtmospheres: Record<ProfileSlug, { image: string; material: string; panel: string }> = {
  cybersecurity: { image: profileHeroImage.cybersecurity, material: "network", panel: "212 45% 13%" },
  development: { image: profileHeroImage.development, material: "studio", panel: "155 24% 12%" },
  electrical: { image: profileHeroImage.electrical, material: "energy", panel: "215 25% 14%" },
  electronics: { image: profileHeroImage.electronics, material: "circuit", panel: "218 35% 14%" },
  repair: { image: profileHeroImage.repair, material: "precision", panel: "254 29% 14%" },
  "customer-service": { image: profileHeroImage["customer-service"], material: "communication", panel: "192 32% 13%" },
};
