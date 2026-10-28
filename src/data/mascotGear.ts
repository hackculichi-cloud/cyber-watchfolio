import type { ProfileSlug } from "./profiles";

export type MascotTool = "multimeter" | "pliers" | "oscilloscope" | "soldering-iron" | "phone" | "screwdriver" | "laptop" | "keyboard" | "router" | "security-key" | "headset" | "clipboard" | "hair-clipper" | "barber-scissors";
export const toolArtwork: Record<MascotTool, { label: string; region?: [number, number, number, number]; clip?: string }> = {
  "hair-clipper": { label: "Hair clipper" },
  "barber-scissors": { label: "Barber scissors" },
  multimeter: { label: "Digital multimeter", region: [0, 0, 362, 362] },
  pliers: { label: "Insulated pliers", region: [362, 0, 340, 362] },
  oscilloscope: { label: "Oscilloscope", region: [705, 0, 381, 362] },
  "soldering-iron": { label: "Soldering iron", region: [0, 362, 362, 362] },
  phone: { label: "Smartphone", region: [380, 362, 305, 362] },
  screwdriver: { label: "Precision screwdriver", region: [720, 362, 366, 362] },
  laptop: { label: "Laptop", region: [0, 724, 401, 345], clip: "polygon(0 0,75% 0,85% 55%,100% 70%,100% 100%,0 100%)" },
  keyboard: { label: "Keyboard", region: [341, 753, 399, 297], clip: "polygon(0 35%,30% 0,100% 30%,100% 100%,30% 100%,0 75%)" },
  router: { label: "Network router", region: [727, 750, 359, 300] },
  "security-key": { label: "USB security key", region: [0, 1086, 362, 362] },
  headset: { label: "Headset", region: [363, 1060, 363, 388] },
  clipboard: { label: "Service checklist", region: [730, 1060, 356, 388] },
};

/** Illustrated costume props; these do not assert ownership of physical equipment. */
export const mascotGear: Record<ProfileSlug, [MascotTool, MascotTool]> = {
  cybersecurity: ["router", "security-key"],
  development: ["laptop", "keyboard"],
  electrical: ["multimeter", "pliers"],
  electronics: ["oscilloscope", "soldering-iron"],
  repair: ["phone", "screwdriver"],
  "customer-service": ["headset", "clipboard"],
  barbering: ["hair-clipper", "barber-scissors"],
};
