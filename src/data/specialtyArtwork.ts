import residential from "@/assets/specialties/electrical-residential.webp";
import industrial from "@/assets/specialties/electrical-industrial.webp";
import control from "@/assets/specialties/electrical-control.webp";

type SpecialtyArtwork = { src: string; alt: string; reference: boolean };

/** Reference art is labeled separately from original photographs of completed work. */
export const specialtyArtwork: Record<string, SpecialtyArtwork> = {
  residential: {
    src: residential,
    alt: "Illustrative reference: residential outlets, switches and measurement tools",
    reference: true,
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
