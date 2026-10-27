export type ProjectStatus = "In progress" | "Active" | "Completed" | "Planned" | "Prototype";

export type SoftwareProject = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  features?: string[];
  scope?: string;
  previousRepo?: string;
  repo?: string;
  demo?: string;
  status: ProjectStatus;
  category: "Software" | "Security" | "Automation";
};

/**
 * Source of truth for the Projects section.
 * Add a new object and the cards render automatically.
 */
export const softwareProjects: SoftwareProject[] = [
  {
    id: "ronnys-food-truck", name: "Ronny’s Food Truck", category: "Software", status: "Active",
    description: "A food-truck website that turns a 28-product menu into a responsive, interactive experience with four categories and a seasonal identity.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/ByCulichi/RonnysFoodTruck", demo: "https://ronnys-food-truck.vercel.app",
    previousRepo: "https://github.com/ByCulichi/RonnysPage",
    features: ["Interactive menu with four categories and product selection", "Original menu viewer with zoom and mobile navigation", "Category-based character outfits and reduced-motion controls"],
    scope: "Informational website and menu browser. Contact shortcuts lead to the business channels; the site does not include checkout or payment processing.",
  },
  {
    id: "portfolio",
    name: "Personal Portfolio Platform",
    description:
      "This website: a React + TypeScript + Tailwind personal brand platform with a reusable, data-driven content architecture for labs, projects and write-ups.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    repo: "https://github.com/hackculichi-cloud/cyber-watchfolio",
    status: "In progress",
    category: "Software",
    demo: "https://culichi.lat",
    features: ["Six professional areas with reusable, data-driven content", "Spanish and English navigation, profile CVs and local evidence galleries", "Keyboard-accessible dialogs, responsive layouts and browser checks"],
    scope: "This portfolio brings together projects, training and documented practice. Its content is maintained in typed data and local assets, with GitHub version control.",
  },
  {
    id: "worlds-finest-shows", name: "World’s Finest Shows", category: "Software", status: "Prototype",
    description: "A reference-based carnival homepage prototype built with React 19, TypeScript and Vite, with responsive navigation and interactive attraction browsing.",
    stack: ["React 19", "TypeScript", "Vite", "CSS"],
    repo: "https://github.com/hackculichi-cloud/worldfinestshows",
    demo: "https://worldfinestshows.vercel.app",
    features: ["Six attraction categories with filters and search", "Attraction detail dialogs with keyboard and Escape support", "Responsive reference design with local images, fonts and newsletter feedback"],
    scope: "Development prototype based on the official website reference. Newsletter feedback stays local; ticket purchases and payments are outside this prototype.",
  },
  {
    id: "mirror", name: "Mirror", category: "Software", status: "Active",
    description: "Music-player interface built with Next.js, React and TypeScript, with a responsive dark layout, reusable UI components and built-in demo data.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], repo: "https://github.com/ByCulichi/Mirror",
  },
  {
    id: "culichi-metrics", name: "Culichi-Metrics", category: "Automation", status: "Active",
    description: "Python automation that generates Excel KPI reports with daily and team metrics, conditional formatting and charts.",
    stack: ["Python", "pandas", "XlsxWriter", "Excel"], repo: "https://github.com/ByCulichi/Culichi-Metrics",
  },
  {
    id: "calculator", name: "Calculator-Culichi", category: "Software", status: "Active",
    description: "Calculator project for arithmetic logic and interface practice, with a React/TypeScript version and Vitest testing setup.",
    stack: ["React", "TypeScript", "Vite", "Vitest"], repo: "https://github.com/ByCulichi/Calculator-Culichi",
  },
  {
    id: "todo", name: "Todo-Culichi", category: "Software", status: "Active",
    description: "Task-list application for adding, completing and deleting tasks, practicing JavaScript and browser storage.",
    stack: ["JavaScript", "HTML", "CSS", "Local Storage"], repo: "https://github.com/ByCulichi/Todo-Culichi",
  },
  {
    id: "weather", name: "WeatherApp-Culichi", category: "Software", status: "Active",
    description: "City weather lookup using the OpenWeatherMap API, JavaScript and a responsive web interface.",
    stack: ["JavaScript", "REST API", "HTML", "CSS"], repo: "https://github.com/ByCulichi/WeatherApp-Culichi",
  },
  {
    id: "journey", name: "Journey_blog", category: "Software", status: "Active",
    description: "An early travel-blog exercise using semantic HTML to organize articles, links and navigation.",
    stack: ["HTML"], repo: "https://github.com/ByCulichi/Journey_blog",
  },
  {
    id: "previous-portfolio", name: "Portfolio-Culichi", category: "Software", status: "Active",
    description: "Earlier personal portfolio presenting projects and experience with HTML, CSS and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"], repo: "https://github.com/ByCulichi/Portfolio-Culichi",
  },
];
