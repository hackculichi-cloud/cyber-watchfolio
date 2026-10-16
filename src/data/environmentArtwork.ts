import type { ProfileSlug } from "./profiles";
import cyber from "@/assets/environments/cybersecurity.webp";
import cyberSmall from "@/assets/environments/cybersecurity-small.webp";
import software from "@/assets/environments/development.webp";
import softwareSmall from "@/assets/environments/development-small.webp";
import electrical from "@/assets/environments/electrical.webp";
import electricalSmall from "@/assets/environments/electrical-small.webp";
import electronics from "@/assets/environments/electronics.webp";
import electronicsSmall from "@/assets/environments/electronics-small.webp";
import repair from "@/assets/environments/repair.webp";
import repairSmall from "@/assets/environments/repair-small.webp";
import service from "@/assets/environments/customer-service.webp";
import serviceSmall from "@/assets/environments/customer-service-small.webp";

/** Environment layers contain no mascot; changing the character does not replace these rooms. */
export const environmentArtwork: Record<ProfileSlug, { full: string; small: string; material: string; panel: string }> = {
  cybersecurity: { full:cyber, small:cyberSmall, material:"network", panel:"212 45% 13%" },
  development: { full:software, small:softwareSmall, material:"studio", panel:"155 24% 12%" },
  electrical: { full:electrical, small:electricalSmall, material:"workshop", panel:"215 25% 14%" },
  electronics: { full:electronics, small:electronicsSmall, material:"laboratory", panel:"218 35% 14%" },
  repair: { full:repair, small:repairSmall, material:"precision", panel:"254 29% 14%" },
  "customer-service": { full:service, small:serviceSmall, material:"office", panel:"192 32% 13%" },
};
