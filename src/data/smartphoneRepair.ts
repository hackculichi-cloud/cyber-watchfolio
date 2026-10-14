import type { WorkImage } from "./works";
import { repairPhotos } from "./repairPhotos";

/** ---------------------------------------------------------------
 * Smartphone repair profile data.
 * Everything below is either real (training curriculum, certificate,
 * documented photos) or explicitly marked as pending.
 * Add new repairs to `smartphoneRepairs` — the UI renders automatically.
 * --------------------------------------------------------------- */

export const smartphoneStatus = "Training completed · Practical development";

export type TrainingModule = {
  day: string;
  title: string;
  summary: string;
  topics: string[];
};

export const trainingProvider = {
  name: "LIDETEC",
  fullName: "Liceo de Tecnología",
  course: "Curso de Reparación de Celulares",
  courseEn: "Smartphone Repair Course",
  kind: "Formal training / coursework",
  location: "Guadalajara, Jalisco",
  /** Only what is printed on the certificate. */
  certificateDate: "01 de agosto de 2026",
  instructor: "Francisco Eduardo Villaseñor",
  document: "Constancia (certificate of participation)",
  image: null,
  imageRotation: 180,
};

export const trainingModules: TrainingModule[] = [
  {
    day: "Day 01",
    title: "Tools & Fundamentals",
    summary: "Workshop setup, service documentation and how a smartphone is built and measured.",
    topics: [
      "Professional repair tools",
      "Technical service forms",
      "Smartphone components",
      "Smartphone architecture",
      "Multimeter fundamentals",
      "Component testing",
      "Safe handling of logic boards",
    ],
  },
  {
    day: "Day 02",
    title: "Disassembly & Diagnostics",
    summary: "Opening devices safely and identifying the most common hardware failures.",
    topics: [
      "Smartphone assembly and disassembly",
      "Common smartphone failures",
      "Battery diagnostics and service",
      "Water / sulfation damage",
      "Display diagnostics and replacement",
      "Microphone diagnostics and replacement",
      "Flex cable diagnostics and recovery",
      "Logic board maintenance and diagnostics",
    ],
  },
  {
    day: "Day 03",
    title: "Components, Soldering & Charging Systems",
    summary: "Hands-on electronics: rework stations, discrete components and charging hardware.",
    topics: [
      "Soldering iron techniques",
      "Hot air station",
      "Component removal and installation",
      "Diodes, resistors, capacitors and coils",
      "Connectors",
      "Charging port installation",
      "Volume button installation",
    ],
  },
  {
    day: "Day 04",
    title: "Advanced Hardware & Microsoldering",
    summary: "Board-level work: fine rework, connector repair and shielding.",
    topics: [
      "Microsoldering fundamentals",
      "Connector repair",
      "Shielding",
      "Cameras",
      "Audio jack",
      "Charging circuits",
      "Touch / display systems",
      "Battery connectors",
      "RF-related connectors",
      "Practical board work",
    ],
  },
  {
    day: "Day 05",
    title: "Software Servicing & Device Maintenance",
    summary: "Software-side servicing: diagnostics, maintenance and manufacturer-supported workflows.",
    topics: [
      "Smartphone software fundamentals",
      "Operating system diagnostics",
      "Software-related troubleshooting",
      "Device servicing tools",
      "Software installation and maintenance",
    ],
  },
];

export const practicalExperience = {
  intro:
    "Hands-on smartphone repair and diagnostics experience developed through training and independent practice.",
  items: [
    "Smartphone disassembly and reassembly",
    "Hardware inspection",
    "Component identification",
    "Diagnostic procedures",
    "Battery replacement",
    "iPhone battery replacement using appropriate procedures",
    "Hardware troubleshooting",
    "Following structured diagnostic protocols",
    "Safe handling of logic boards",
    "Device inspection before repair",
    "Post-repair functional testing",
  ],
};

export const diagnosticWorkflow: { step: string; title: string; body: string }[] = [
  { step: "01", title: "Initial Inspection", body: "Visual check of the device, reported symptoms and physical condition before opening anything." },
  { step: "02", title: "Functional Testing", body: "Test what still works: display, touch, charging, audio, buttons and sensors." },
  { step: "03", title: "Diagnosis", body: "Measurements and component testing to confirm the actual fault, not just the symptom." },
  { step: "04", title: "Repair Plan", body: "Decide the intervention, required parts and tools, and the risks involved." },
  { step: "05", title: "Repair / Component Replacement", body: "Controlled disassembly, replacement or rework with safe handling of the logic board." },
  { step: "06", title: "Post-Repair Testing", body: "Re-run the functional tests and verify the repaired subsystem behaves correctly." },
  { step: "07", title: "Documentation", body: "Record device, fault, work performed, tools, result and photos of every stage." },
];

export const smartphoneSkills: { group: string; items: string[] }[] = [
  { group: "Diagnostics", items: ["Multimeter", "Hardware inspection", "Component testing", "Fault diagnosis"] },
  {
    group: "Hardware",
    items: [
      "Smartphone disassembly",
      "Battery replacement",
      "Display replacement",
      "Charging port work",
      "Connector repair",
      "Component replacement",
    ],
  },
  { group: "Electronics", items: ["Soldering", "Hot air", "Microsoldering fundamentals", "Components", "PCB handling"] },
  { group: "Software", items: ["Smartphone software diagnostics", "Device servicing", "Software maintenance"] },
];

export const smartphoneTools: { group: string; items: string[] }[] = [
  { group: "Diagnostics", items: ["Multimeter", "Diagnostic / service software"] },
  { group: "Rework", items: ["Soldering iron", "Hot air station", "Microsoldering equipment"] },
  { group: "Disassembly", items: ["Smartphone repair toolkit", "Anti-static repair mat"] },
];

export const learningNext: string[] = [
  "More board-level microsoldering practice",
  "Broader fault library across brands and models",
  "Faster, repeatable diagnostic routines",
  "Documenting every future repair with before / during / after photos",
];

/** Individual documented smartphone repair. */
export type SmartphoneRepair = {
  id: string;
  ref: string;
  device: string;
  repairType: string;
  issue?: string;
  diagnosis?: string;
  work?: string[];
  tools?: string[];
  result?: string;
  date?: string;
  learned?: string[];
  precautions?: string[];
  components?: string[];
  tests?: string[];
  notes?: string;
  before?: WorkImage;
  during?: WorkImage;
  after?: WorkImage;
  /** Extra evidence photos (screenshots, part references, tests). */
  evidence?: WorkImage[];
};

/**
 * Only real, personally performed repairs. Fields left undefined render as
 * "pending" in the UI — never invent content here.
 */
export const smartphoneRepairs: SmartphoneRepair[] = [
  {
    "id": "sr-001",
    "ref": "SMARTPHONE REPAIR #001",
    "device": "iPhone 12 Pro",
    "repairType": "Battery replacement",
    "work": [
      "Battery replacement performed by the portfolio owner"
    ],
    "tests": [
      "Power-on",
      "Charging",
      "Touchscreen",
      "Cameras",
      "Audio",
      "Face ID",
      "Battery settings review"
    ],
    "result": "Battery replaced. The portfolio owner confirms that all listed post-repair checks were performed.",
    "notes": "Repair date, battery brand and test measurements are not documented."
  },
  {
    "id": "sr-002",
    "ref": "SMARTPHONE REPAIR #002",
    "device": "iPhone 14 Pro",
    "repairType": "Battery replacement",
    "work": [
      "Battery replacement performed by the portfolio owner"
    ],
    "precautions": [
      "Appropriate repair tools used"
    ],
    "components": [
      "Aftermarket self-programming battery"
    ],
    "tests": [
      "Power-on",
      "Charging",
      "Touchscreen",
      "Cameras",
      "Audio",
      "Face ID",
      "Battery settings review"
    ],
    "result": "Battery replaced. The portfolio owner confirms that all listed post-repair checks were performed.",
    "notes": "Repair date, battery brand and test measurements are not documented."
  },
  {
    "id": "sr-003",
    "ref": "SMARTPHONE REPAIR #003",
    "device": "iPhone XR",
    // The owner identifies the light-blue phone as the XR.
    "during": repairPhotos.find((photo) => photo.src === "/images/repair/repair-photo-10.jpg"),
    "evidence": repairPhotos.filter((photo) => photo.src === "/images/repair/repair-photo-09.jpg"),
    "repairType": "Screen replacement",
    "work": [
      "Screen replacement performed by the portfolio owner"
    ],
    "tests": [
      "Power-on",
      "Charging",
      "Touchscreen",
      "Cameras",
      "Audio",
      "Face ID",
      "Battery settings review"
    ],
    "result": "Screen replaced. The portfolio owner confirms that all listed post-repair checks were performed.",
    "notes": "Repair date, screen brand and test measurements are not documented."
  }
];
