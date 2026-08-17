import type { WorkImage } from "./works";

export type RepairDeviceType = "Smartphones" | "Laptops" | "Consoles";

/** BEFORE → DIAGNOSIS → REPAIR → AFTER documented repair case. */
export type RepairCase = {
  id: string;
  deviceType: RepairDeviceType;
  device: string;
  problem: string;
  diagnosis: string;
  work: string[];
  tools?: string[];
  components?: string[];
  result: string;
  date?: string;
  notes?: string;
  before?: WorkImage;
  during?: WorkImage;
  after?: WorkImage;
};

export const repairDeviceTypes: {
  type: RepairDeviceType;
  description: string;
  scope: string[];
  status: string;
}[] = [
  {
    type: "Smartphones",
    description: "Hands-on training: diagnostics, screen and battery replacement, charging ports and reassembly testing.",
    scope: ["Diagnostics", "Screen replacement", "Battery replacement", "Charging ports", "Reassembly & testing"],
    status: "In training",
  },
  {
    type: "Laptops",
    description: "Diagnostics and maintenance practice: keyboards, screens, thermal service and board inspection.",
    scope: ["Diagnostics", "Screen replacement", "Keyboard replacement", "Thermal service", "Board inspection"],
    status: "Learning",
  },
  {
    type: "Consoles",
    description: "Planned future learning track — disassembly, cleaning and component replacement.",
    scope: ["Disassembly", "Cleaning", "Component replacement"],
    status: "Planned",
  },
];

/** Only real, documented repairs are published here. */
export const repairCases: RepairCase[] = [];

export const repairsFor = (type: RepairDeviceType) => repairCases.filter((r) => r.deviceType === type);
