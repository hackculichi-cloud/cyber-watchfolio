export type TrainingStatus = "Currently Studying" | "In Training" | "Learning" | "Planned";

export type TrainingTrack = {
  id: string;
  title: string;
  status: TrainingStatus;
  description: string;
  topics: string[];
  anchor: string;
};

export const trainingTracks: TrainingTrack[] = [
  {
    id: "electrical",
    anchor: "electrical",
    title: "Residential Electrical Maintenance",
    status: "Currently Studying",
    description:
      "Formal training in residential electrical maintenance: safe practices, installations, diagnostics and repair fundamentals.",
    topics: ["Safety practices", "Residential installations", "Diagnostics", "Maintenance"],
  },
  {
    id: "electronics",
    anchor: "electronics",
    title: "General Electronics",
    status: "Currently Studying",
    description:
      "General electronics fundamentals: components, circuits, measurement and troubleshooting methodology.",
    topics: ["Components", "Circuits", "Measurement", "Troubleshooting"],
  },
  {
    id: "smartphone-repair",
    anchor: "repair",
    title: "Smartphone Repair",
    status: "In Training",
    description:
      "Hands-on practice diagnosing and repairing smartphones, from component-level inspection to reassembly and testing.",
    topics: ["Diagnostics", "Disassembly", "Component replacement", "Testing"],
  },
  {
    id: "console-repair",
    anchor: "repair",
    title: "Console Repair",
    status: "Planned",
    description: "Planned future learning track — not started yet.",
    topics: ["Planned"],
  },
];

export type PracticalEntry = {
  id: string;
  title: string;
  track: string;
  date: string;
  summary: string;
  skills: string[];
  tools?: string[];
  image?: string;
};

/** Document practical exercises, diagnostics and projects here as you complete them. */
export const practicalEntries: PracticalEntry[] = [];
