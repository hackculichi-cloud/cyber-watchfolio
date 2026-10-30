import type { ProfileSlug } from "./profiles";

export type MascotTool = "multimeter" | "pliers" | "oscilloscope" | "soldering-iron" | "phone" | "screwdriver" | "laptop" | "keyboard" | "router" | "security-key" | "headset" | "clipboard" | "hair-clipper" | "barber-scissors" | "detail-trimmer";
export const toolArtwork: Record<MascotTool, { label: string; accent: string; region?: [number, number, number, number]; clip?: string }> = {
  "hair-clipper": { label: "Hair clipper", accent: "346 83% 77%" },
  "barber-scissors": { label: "Barber scissors", accent: "199 89% 65%" },
  "detail-trimmer": { label: "Detail trimmer", accent: "48 96% 60%" },
  multimeter: { label: "Digital multimeter", accent: "48 96% 60%", region: [0, 0, 362, 362] },
  pliers: { label: "Insulated pliers", accent: "27 96% 65%", region: [362, 0, 340, 362] },
  oscilloscope: { label: "Oscilloscope", accent: "172 70% 65%", region: [705, 0, 381, 362] },
  "soldering-iron": { label: "Soldering iron", accent: "27 96% 65%", region: [0, 362, 362, 362] },
  phone: { label: "Smartphone", accent: "255 92% 79%", region: [380, 362, 305, 362] },
  screwdriver: { label: "Precision screwdriver", accent: "199 89% 65%", region: [720, 362, 366, 362] },
  laptop: { label: "Laptop", accent: "142 71% 64%", region: [0, 724, 401, 345], clip: "polygon(0 0,75% 0,85% 55%,100% 70%,100% 100%,0 100%)" },
  keyboard: { label: "Keyboard", accent: "199 89% 65%", region: [341, 753, 399, 297], clip: "polygon(0 35%,30% 0,100% 30%,100% 100%,30% 100%,0 75%)" },
  router: { label: "Network router", accent: "199 89% 65%", region: [727, 750, 359, 300] },
  "security-key": { label: "USB security key", accent: "48 96% 60%", region: [0, 1086, 362, 362] },
  headset: { label: "Headset", accent: "199 89% 65%", region: [363, 1060, 363, 388] },
  clipboard: { label: "Service checklist", accent: "48 96% 60%", region: [730, 1060, 356, 388] },
};

/** Illustrated costume props; these do not assert ownership of physical equipment. */
export const mascotGear: Record<ProfileSlug, [MascotTool, MascotTool, MascotTool]> = {
  cybersecurity: ["router", "security-key", "laptop"],
  development: ["laptop", "keyboard", "phone"],
  electrical: ["multimeter", "pliers", "screwdriver"],
  electronics: ["oscilloscope", "soldering-iron", "multimeter"],
  repair: ["phone", "screwdriver", "soldering-iron"],
  "customer-service": ["headset", "clipboard", "laptop"],
  barbering: ["hair-clipper", "barber-scissors", "detail-trimmer"],
};
