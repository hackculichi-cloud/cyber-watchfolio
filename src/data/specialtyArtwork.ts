import industrial from "@/assets/specialties/electrical-industrial.webp";
import control from "@/assets/specialties/electrical-control.webp";

type SpecialtyArtwork = { src: string; alt: string; reference: boolean };

/** Reference art is labeled separately from original photographs of completed work. */
export const specialtyArtwork: Record<string, SpecialtyArtwork> = {
  residential: {
    src: "/images/electrical/outlet-october-2026/16.jpeg",
    alt: "Completed replacement outlet with its wall plate.",
    reference: false,
  },
  industrial: {
    src: industrial,
    alt: "Illustrative reference: industrial motor and electrical workshop",
    reference: true,
  },
  "electrical-control": {
    src: control,
    alt: "Illustrative reference: contactor training board with START/STOP buttons",
    reference: true,
  },
};
