export const site = {
  name: "Christian Armando Velasco Estrada",
  shortName: "Christian Velasco",
  role: "IT • Cybersecurity • Software Development",
  tagline:
    "Building my career in technology and cybersecurity while developing practical skills across multiple technical fields.",
  intro:
    "My professional focus is IT, cybersecurity and software development. Alongside that path I keep developing multidisciplinary technical skills, and I bring more than 5 years of bilingual customer service experience to every team I join.",
  email: "christian@culichi.lat",
  github: "https://github.com/ByCulichi/ByCulichi",
  githubHandle: "github.com/ByCulichi",
  linkedin: "https://www.linkedin.com/in/culichi/?locale=es_ES",
  linkedinHandle: "linkedin.com/in/culichi",
  url: "https://culichi.lovable.app",
  languages: ["English", "Spanish"],
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Technology",
    href: "/cybersecurity",
    children: [
      { label: "Cybersecurity", href: "/cybersecurity" },
      { label: "Software Development", href: "/software-development" },
      { label: "Labs", href: "/labs" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    label: "Electrical & Electronics",
    href: "/electrical-electronics",
    children: [
      { label: "Electrical", href: "/electrical-electronics#electrical" },
      { label: "Electronics", href: "/electrical-electronics#electronics" },
    ],
  },
  { label: "Technical Repair", href: "/repair" },
  { label: "Experience", href: "/experience" },
  { label: "Journal", href: "/journal" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];
