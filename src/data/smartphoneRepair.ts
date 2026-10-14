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
  image: "/images/repair/cert-lidetec.jpg",
  imageRotation: 180,
};

/** Syllabus supplied by the course participant; topics are training, not claimed expertise. */
export const trainingModules: TrainingModule[] = [
  {
    "day": "Day 01",
    "title": "Tools, Service Records & Fundamentals",
    "summary": "Repair workshop tools, service records, component recognition and basic measurements.",
    "topics": [
      "Repair workshop tools and business setup",
      "Technical service forms and repair notes",
      "Smartphone parts and internal architecture",
      "Multimeter use: speakers, earpieces, buzzers and batteries",
      "Logic board handling and short-circuit prevention"
    ]
  },
  {
    "day": "Day 02",
    "title": "Disassembly, Diagnostics & Component Recovery",
    "summary": "Assembly practice, common faults, battery service and diagnostics of displays, microphones and flex cables.",
    "topics": [
      "Smartphone assembly and disassembly practice",
      "Common smartphone faults and repair approaches",
      "Battery calibration and rehabilitation concepts",
      "Water damage and sulfation",
      "Membrane-mounted and universal microphone installation",
      "Logic board inspection and maintenance",
      "Display diagnosis, recovery and replacement",
      "Microphone recovery",
      "Interconnection flex cable recovery"
    ]
  },
  {
    "day": "Day 03",
    "title": "Hardware Faults, Soldering & Charging Systems",
    "summary": "Camera, audio, charging and touch faults, battery adaptation and soldering practice.",
    "topics": [
      "Camera and audio jack troubleshooting",
      "Charging filter troubleshooting",
      "Battery adaptation concepts",
      "Touch system and battery holder repair",
      "Soldering iron use and soldering practice",
      "RF connector practice",
      "Charging port jumper concepts across device brands"
    ]
  },
  {
    "day": "Day 04",
    "title": "Hot Air, Components & Microsoldering",
    "summary": "Hot air handling, component removal and installation, charging ports, connectors and introductory microsoldering.",
    "topics": [
      "Correct use of the hot air station",
      "Removal and installation of diodes, resistors, capacitors and coils",
      "Hands-on practice with course materials",
      "Charging port and volume button installation",
      "Introduction to microsoldering",
      "Connector repair and shielding"
    ]
  },
  {
    "day": "Day 05",
    "title": "Software Diagnostics & Device Recovery",
    "summary": "Software fundamentals, operating system faults, firmware servicing and recovery concepts covered in the course.",
    "topics": [
      "Rear housing and device components",
      "Heat-assisted fault-recovery concepts",
      "Firmware flashing and unlocking fundamentals",
      "Smartphone software and operating system diagnostics",
      "UnlockTool setup and software servicing (coursework)",
      "Android screen lock and Google account recovery concepts",
      "Factory reset, connectivity settings and malware troubleshooting",
      "NCK and server-based unlocking concepts"
    ]
  }
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
  { group: "Software", items: ["Smartphone software diagnostics", "Device servicing", "Software maintenance", "Firmware flashing fundamentals", "UnlockTool (coursework)", "Device recovery concepts"] },
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

export type SmartphoneBrand = "iPhone" | "Samsung";
export type SmartphoneRepairType = "Battery replacement" | "Screen replacement";

/** Individual documented smartphone repair. */
export type SmartphoneRepair = {
  id: string;
  ref: string;
  device: string;
  brand: SmartphoneBrand;
  repairType: SmartphoneRepairType;
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
  photos?: WorkImage[];
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
    "brand": "iPhone",
    "photos": repairPhotos.filter((photo) => ["/images/repair/repair-photo-01.jpg", "/images/repair/repair-photo-02.jpg", "/images/repair/repair-photo-05.jpg", "/images/repair/repair-photo-11.jpg", "/images/repair/repair-photo-13.jpg", "/images/repair/repair-photo-14.jpg", "/images/repair/repair-photo-15.jpg", "/images/repair/repair-photo-17.jpg", "/images/repair/repair-photo-18.jpg"].includes(photo.src ?? "")),
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
    "brand": "iPhone",
    "photos": repairPhotos.filter((photo) => ["/images/repair/repair-photo-03.jpg", "/images/repair/repair-photo-06.jpg", "/images/repair/repair-photo-07.jpg", "/images/repair/repair-photo-08.jpg", "/images/repair/repair-photo-12.jpg"].includes(photo.src ?? "")),
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
    "brand": "iPhone",
    "photos": repairPhotos.filter((photo) => ["/images/repair/repair-photo-09.jpg", "/images/repair/repair-photo-10.jpg"].includes(photo.src ?? "")),
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

/** User-confirmed future work. Never included in completed repair counts. */
export const plannedSmartphoneRepairs: { id: string; brand: SmartphoneBrand; device: string; repairType: SmartphoneRepairType }[] = [
  { id: "planned-s21-ultra-screen", brand: "Samsung", device: "Samsung Galaxy S21 Ultra", repairType: "Screen replacement" },
  { id: "planned-a35-battery", brand: "Samsung", device: "Samsung Galaxy A35", repairType: "Battery replacement" },
];
