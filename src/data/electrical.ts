export type TrainingStatus = "Currently Studying" | "In Training" | "Learning" | "Planned";

export type ElectricalModule = {
  id: string;
  title: string;
  topics: string[];
};

export const electricalTraining = {
  title: "Electrical Fundamentals & Industrial Electricity",
  provider: "RED CONOCER",
  status: "Completed",
  summary:
    "Eight-module training covering electrical theory, measurement, circuits, installations, control, motors, maintenance, diagnostics and renewable energy.",
  modules: [
    {
      id: "module-1",
      title: "Fundamentals of Electricity",
      topics: [
        "Safety and regulations",
        "Fundamental concepts I",
        "Fundamental concepts II",
        "Electrical units and measurement",
        "Measurement equipment and tools",
        "Ohm's Law and Kirchhoff's Laws",
        "Electrical circuits",
        "Electrical diagrams",
      ],
    },
    {
      id: "module-2",
      title: "Electrical Materials and Components",
      topics: [
        "Conductors, insulators and semiconductors",
        "Electrical cable types",
        "Inductance",
        "Electrical components",
        "Residential electrical symbols",
      ],
    },
    {
      id: "module-3",
      title: "Residential Electrical Installations",
      topics: [
        "Electrical distribution networks",
        "Residential electrical plans and diagrams",
        "Electrical load calculations",
        "Conduit and electrical piping",
        "Installation standards",
        "Introduction to home automation",
      ],
    },
    {
      id: "module-4",
      title: "Electrical Control and Automation",
      topics: [
        "Electrical control components",
        "Control electrical symbols",
        "Control and power circuits",
        "Electrical circuit simulation",
        "Introduction to variable frequency drives (VFD)",
      ],
    },
    {
      id: "module-5",
      title: "Industrial Electricity and Motors",
      topics: [
        "Electric motors",
        "Three-phase systems",
        "Three-phase power",
        "Motor protection",
        "Motor starting methods",
        "Power cables and industrial distribution",
      ],
    },
    {
      id: "module-6",
      title: "Electrical Maintenance and Diagnostics",
      topics: [
        "Introduction to electrical maintenance",
        "Types of electrical maintenance",
        "Electrical fault diagnosis",
        "Maintenance planning",
      ],
    },
    {
      id: "module-7",
      title: "Renewable Energy",
      topics: [
        "Introduction to renewable energy",
        "Solar photovoltaic fundamentals",
        "Photovoltaic system components",
        "Solar system types",
        "Energy efficiency and electrical savings",
      ],
    },
    {
      id: "module-8",
      title: "Final Project and Evaluation",
      topics: [
        "Electrical project design",
        "Electrical drawings",
        "Applied electrical calculations",
        "Assembly and commissioning",
        "Project presentation",
      ],
    },
  ] satisfies ElectricalModule[],
};

export type ElectricalCredential = {
  title: string;
  issuer: string;
  status: string;
  /** Only fill these when the printed document confirms them. */
  issuedOn?: string;
  credentialId?: string;
  verifyUrl?: string;
  highlights: string[];
  /** Optional photo/scan of the certificate. */
  image?: { src: string; alt: string };
};

export const electricalCredential: ElectricalCredential = {
  title: "Electrical Fundamentals & Industrial Electricity",
  issuer: "RED CONOCER",
  status: "Completed",
  highlights: [
    "8-module program covering theory, installations, control, motors, maintenance and renewable energy",
    "Final project: electrical design, drawings, calculations, assembly and commissioning",
    "Practical work documented with real installation exercises",
  ],
};

export const electricalSkills = [
  "Voltage measurement",
  "Current measurement",
  "Resistance measurement",
  "Continuity testing",
  "Diode testing",
  "Basic circuit analysis",
  "Ohm's Law",
  "Electrical diagrams",
  "Basic fault diagnosis",
  "Multimeter operation",
];

export const electricalToolGroups = [
  { title: "Measurement", items: ["Digital multimeter", "Electrical test equipment"] },
  { title: "Installation", items: ["Wire stripping/crimping tools", "Screwdrivers and hand tools"] },
  { title: "Workshop & safety", items: ["Soldering equipment", "Electrical safety equipment"] },
];

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
