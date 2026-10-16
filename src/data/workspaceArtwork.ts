import type { ProfileSlug } from "./profiles";
import cyber from "@/assets/workspaces/cybersecurity.webp";
import cyberSmall from "@/assets/workspaces/cybersecurity-small.webp";
import software from "@/assets/workspaces/development.webp";
import softwareSmall from "@/assets/workspaces/development-small.webp";
import electrical from "@/assets/workspaces/electrical.webp";
import electricalSmall from "@/assets/workspaces/electrical-small.webp";
import electronics from "@/assets/workspaces/electronics.webp";
import electronicsSmall from "@/assets/workspaces/electronics-small.webp";
import repair from "@/assets/workspaces/repair.webp";
import repairSmall from "@/assets/workspaces/repair-small.webp";
import service from "@/assets/workspaces/customer-service.webp";
import serviceSmall from "@/assets/workspaces/customer-service-small.webp";

export const workspaceArtwork: Record<ProfileSlug, { full: string; small: string }> = {
  cybersecurity: { full:cyber, small:cyberSmall },
  development: { full:software, small:softwareSmall },
  electrical: { full:electrical, small:electricalSmall },
  electronics: { full:electronics, small:electronicsSmall },
  repair: { full:repair, small:repairSmall },
  "customer-service": { full:service, small:serviceSmall },
};
