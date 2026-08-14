export type CvVariant = {
  id: string;
  title: string;
  description: string;
  /** Place the PDF in /public and update the path to publish it. */
  file: string;
  available: boolean;
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
    title: "Electrical / Technical CV",
    description: "Focused on electrical maintenance, electronics and device repair training.",
    file: "/cv/christian-velasco-electrical.pdf",
    available: false,
  },
];
