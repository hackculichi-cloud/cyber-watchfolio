import type { ProfileSlug } from "./profiles";
import bodyAtlas from "@/assets/culichi-athletic-body-atlas.webp";
import maskedCybersecurity from "@/assets/mascot-scenes/cybersecurity.webp";
import portraitAtlas from "@/assets/culichi-mascot-atlas.webp";

export type MascotVariant = ProfileSlug | "home" | "ai" | "emblem";

/** Character artwork is independent of the room, profile colors and professional content. */
export const mascotIdentity = {
  name: "Culichi",
  animal: "fox",
  bodyAtlas,
  portraitAtlas,
  maskedCybersecurity,
  bodyCells: { home:0, cybersecurity:1, development:2, electrical:3, electronics:4, repair:5, "customer-service":6 } satisfies Record<ProfileSlug | "home", number>,
  portraitCells: { home:0, cybersecurity:1, development:2, electrical:3, electronics:4, repair:5, "customer-service":6, ai:7, emblem:8 } satisfies Record<MascotVariant, number>,
};
