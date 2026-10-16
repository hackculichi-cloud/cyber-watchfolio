export type ProjectStatus = "In progress" | "Active" | "Completed" | "Planned";

export type SoftwareProject = {
  id: string;
  name: string;
  description: string;
  stack: string[];
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
    id: "mirror", name: "Mirror", category: "Software", status: "Active",
    description: "Music-player interface built with Next.js, React and TypeScript, with a responsive dark layout and reusable UI components.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], repo: "https://github.com/ByCulichi/Mirror",
  },
  {
    id: "ronnys-page", name: "RonnysPage", category: "Software", status: "Active",
    description: "Food-truck website with a responsive interface, built with Next.js, React, TypeScript and Tailwind CSS.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], repo: "https://github.com/ByCulichi/RonnysPage",
  },
  {
    id: "culichi-metrics", name: "Culichi-Metrics", category: "Automation", status: "Active",
    description: "Python automation that generates Excel KPI reports with daily and team metrics, conditional formatting and charts.",
    stack: ["Python", "pandas", "XlsxWriter", "Excel"], repo: "https://github.com/ByCulichi/Culichi-Metrics",
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
    description: "Travel blog for practicing HTML structure, content organization and responsive reading layouts.",
    stack: ["HTML", "CSS"], repo: "https://github.com/ByCulichi/Journey_blog",
  },
  {
    id: "previous-portfolio", name: "Portfolio-Culichi", category: "Software", status: "Active",
    description: "Earlier personal portfolio presenting projects and experience with HTML, CSS and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"], repo: "https://github.com/ByCulichi/Portfolio-Culichi",
  },
];
