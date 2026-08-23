import type { WorkImage } from "./works";
import certAsset from "@/assets/cert-lidetec.jpg.asset.json";
import openAsset from "@/assets/iphone12-open.jpg.asset.json";
import healthAsset from "@/assets/iphone12-battery-health.jpg.asset.json";
import logAsset from "@/assets/iphone12-repair-log.jpg.asset.json";

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
  image: certAsset.url,
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
    id: "sr-001",
    ref: "SMARTPHONE REPAIR #001",
    device: "iPhone 12 / 12 Pro",
    repairType: "Battery replacement",
    work: ["Device opened on the repair mat", "Battery service performed", "Reassembly and functional verification"],
    tools: ["Smartphone repair toolkit", "Anti-static repair mat"],
    result:
      "Device reports 100% maximum battery capacity, and the iOS repair log lists the battery part with status Original.",
    date: "Repair finished 21 August (per the device repair log)",
    during: {
      src: openAsset.url,
      alt: "iPhone 12 opened on a blue anti-static repair mat, display detached and battery visible",
      caption: "During — device opened, battery and logic board exposed",
    },
    evidence: [
      {
        src: healthAsset.url,
        alt: "iOS Battery Health screen showing 100% maximum capacity",
        caption: "Post-repair test — 100% maximum capacity",
      },
      {
        src: logAsset.url,
        alt: "iOS repair log showing the battery part with status Original",
        caption: "Repair log — battery, status Original",
      },
    ],
  },
];
