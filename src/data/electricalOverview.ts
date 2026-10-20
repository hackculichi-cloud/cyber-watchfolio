import { CircuitBoard, House, Gauge, Cog, ClipboardCheck } from "lucide-react";

/** Short reading layer; the full topics remain in the main program's syllabus. */
export const electricalKnowledge = [
  { title: "I interpret circuits", icon: CircuitBoard, points: ["I relate voltage, current and resistance.", "I read electrical symbols, drawings and connections."] },
  { title: "I practice residential installation", icon: House, points: ["I study conductors, conduit and circuit loads.", "I assemble training boards and replace outlets and lighting."] },
  { title: "I measure and check", icon: Gauge, points: ["I measure AC/DC voltage and check polarity.", "I test resistance and continuity on de-energized circuits."] },
  { title: "I study motors and control", icon: Cog, points: ["I study three-phase systems and motor protection.", "I have practiced float-switch control; contactor practice is planned."] },
  { title: "I develop maintenance skills", icon: ClipboardCheck, points: ["I study fault diagnosis and preventive maintenance.", "I learn about project design and photovoltaic systems."] },
];

export const electricalOverviewAreas: Record<string, { modules: string[]; knowledge: number[] }> = {
  residential: { modules: ["module-1", "module-2", "module-3"], knowledge: [0, 1, 2] },
  industrial: { modules: ["module-5", "module-6", "module-7", "module-8"], knowledge: [0, 2, 3, 4] },
  "electrical-control": { modules: ["module-4", "module-5"], knowledge: [0, 2, 3] },
};
