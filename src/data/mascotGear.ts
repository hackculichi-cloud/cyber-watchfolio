import type { ProfileSlug } from "./profiles";

export type MascotTool = "router" | "security-key" | "firewall" | "laptop" | "keyboard" | "mouse" | "multimeter" | "pliers" | "wire-stripper" | "oscilloscope" | "soldering-iron" | "circuit-board" | "phone" | "screwdriver" | "suction-cup" | "headset" | "clipboard" | "desk-phone" | "hair-clipper" | "barber-scissors" | "detail-trimmer";

/** Each decorative tool belongs to one profession, with artwork in that section's color. */
export const mascotGear: Record<ProfileSlug, [MascotTool, MascotTool, MascotTool]> = {
  cybersecurity: ["router", "security-key", "firewall"],
  development: ["laptop", "keyboard", "mouse"],
  electrical: ["multimeter", "pliers", "wire-stripper"],
  electronics: ["oscilloscope", "soldering-iron", "circuit-board"],
  repair: ["phone", "screwdriver", "suction-cup"],
  "customer-service": ["headset", "clipboard", "desk-phone"],
  barbering: ["hair-clipper", "barber-scissors", "detail-trimmer"],
};

const labels: Record<MascotTool, string> = {
  router: "Network router", "security-key": "USB security key", firewall: "Hardware firewall",
  laptop: "Laptop", keyboard: "Keyboard", mouse: "Computer mouse",
  multimeter: "Digital multimeter", pliers: "Electrician's pliers", "wire-stripper": "Automatic wire stripper",
  oscilloscope: "Oscilloscope", "soldering-iron": "Soldering iron", "circuit-board": "Printed circuit board",
  phone: "Smartphone", screwdriver: "Precision screwdriver", "suction-cup": "Screen-opening suction cup",
  headset: "Headset", clipboard: "Service checklist", "desk-phone": "Desk phone",
  "hair-clipper": "Hair clipper", "barber-scissors": "Barber scissors", "detail-trimmer": "Detail trimmer",
};

/** Illustrations for Home navigation; they do not assert equipment ownership. */
export const toolArtwork = Object.fromEntries(Object.entries(mascotGear).flatMap(([profile, tools]) => tools.map(tool => [tool, { label: labels[tool], profile, src: `/images/mascot-tools/${profile}/${tool}.webp` }]))) as Record<MascotTool, { label: string; profile: ProfileSlug; src: string }>;
