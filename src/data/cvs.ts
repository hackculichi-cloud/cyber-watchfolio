import electricalPdf from "@/assets/christian-velasco-electrical.pdf.asset.json";
import electricalPreview from "@/assets/electrical-cv-preview.jpg.asset.json";
import { site } from "@/data/site";

export type CvVariant = {
  id: string;
  title: string;
  description: string;
  /** Place the PDF in /public and update the path to publish it. */
  file: string;
  available: boolean;
  preview?: string;
};

export const cvVariants: CvVariant[] = [
  {
    id: "general",
    title: "General CV",
    description: "Complete overview of technical training, customer service experience and current focus.",
    file: "/cv/christian-velasco-general.pdf",
    available: false,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity / IT CV",
    description: "Tailored for SOC, blue team, IT support and cybersecurity roles.",
    file: "/cv/christian-velasco-cybersecurity.pdf",
    available: false,
  },
  {
    id: "software",
    title: "Software Development CV",
    description: "Focused on web development, APIs, automation and software projects.",
    file: "/cv/christian-velasco-software.pdf",
    available: false,
  },
  {
    id: "electrical",
    title: "Residential & Industrial Electrical Maintenance CV",
    description: "Electrical CV covering residential and industrial maintenance, installations and technical training.",
    file: new URL(electricalPdf.url, site.url).href,
    preview: new URL(electricalPreview.url, site.url).href,
    available: true,
  },
];
