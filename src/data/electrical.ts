export type TrainingStatus = "Currently Studying" | "In Training" | "Learning" | "Planned" | "Completed";

export type ElectricalModule = {
  id: string;
  title: string;
  topics: string[];
};

export const electricalTraining = {
  title: "Electrical Fundamentals & Industrial Electricity",
  provider: "Universidad Internacional · RED CONOCER",
  status: "Currently Studying",
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
  title: "Electrical Systems: Reading Drawings and Schematics",
  issuer: "LinkedIn Learning",
  status: "Completed",
  highlights: ["Completed course on reading electrical drawings and schematics."],
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
  learningObjectives?: string[];
  /** Only the sections visible in the author's supplied course screenshot. */
  syllabus?: { title: string; topics: string[] }[];
  syllabusNote?: string;
};

export const trainingTracks: TrainingTrack[] = [
  {
    id: "electrical",
    anchor: "electrical",
    title: "Electrical Fundamentals & Industrial Electricity",
    status: "Currently Studying",
    description: "Electrical training with Universidad Internacional through RED CONOCER. Curriculum topics describe the program; the original certificate is pending.",
    topics: ["Safety practices", "Residential installations", "Diagnostics", "Maintenance"],
  },
  {
    id: "electrical-linkedin",
    anchor: "electrical",
    title: "Electrical Systems: Reading Drawings and Schematics",
    status: "Completed",
    description: "LinkedIn Learning course completed. Certificate image pending upload.",
    topics: ["Electrical diagrams"],
  },
  {
    id: "electrical-udemy",
    anchor: "electrical",
    title: "Basic Electrical Installations",
    status: "Currently Studying",
    description: "Udemy course in progress. Curriculum and certificate will be added when provided.",
    topics: [],
  },
  {
    id: "electrical-udemy-measurements",
    anchor: "electrical",
    title: "Electrical Measurements",
    status: "Completed",
    description: "Completed Udemy course on electrical quantities, measuring instruments and multimeter measurements, with a certificate dated October 30, 2026.",
    topics: ["AC / DC", "Digital multimeter", "Clamp multimeter", "Resistance", "Continuity"],
    learningObjectives: ["Main electrical quantities present in electrical circuits.", "How an elementary electrical circuit works.", "Differences between series and parallel circuits.", "Measuring AC and DC voltage.", "Measuring AC current with a clamp multimeter.", "Measuring the electrical resistance of components.", "Testing continuity in de-energized circuits.", "Detecting short circuits using continuity testing on de-energized circuits.", "Checking protection devices with a multimeter.", "Understanding multimeter protection ratings and voltage limits."],
    syllabusNote: "Documented topics from the completed course. This list is partial.",
    syllabus: [
      { title: "Electrical fundamentals", topics: ["What is electricity?", "Electrical quantities", "Elementary electrical circuit", "Series, parallel and mixed circuits", "Quiz: electrical fundamentals"] },
      { title: "Measuring instruments", topics: ["What does measuring mean?", "Measuring instruments", "Instrument accuracy and precision", "Multimeter capacity", "Symbols on the multimeter", "Analysis of the course multimeter", "Physical inspection of the multimeter", "Voltage test screwdriver", "Voltage detector", "Outlet tester", "Multimeter recommendations", "Quiz: measuring instruments and alternatives"] },
      { title: "Measurements with a multimeter", topics: ["Voltage measurement at an outlet and lamp socket", "Battery voltage measurement", "Electric current measurement", "Electrical resistance measurement", "What is continuity?", "Continuity in lamp sockets, outlets and switches", "Quiz: voltage, current, resistance and continuity"] },
      { title: "Multimeter protection ratings", topics: ["Multimeter safety", "CAT measurement categories"] },
    ],
  },
  {
    id: "electronics",
    anchor: "electronics",
    title: "Basic Electronics",
    status: "Currently Studying",
    description:
      "Basic electronics studies in progress at Escuela Tecnológica de Occidente: components, circuits, measurement and troubleshooting methodology.",
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
