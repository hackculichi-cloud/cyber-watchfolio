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
    id: "portfolio",
    name: "Personal Portfolio Platform",
    description:
      "This website: a React + TypeScript + Tailwind personal brand platform with a reusable, data-driven content architecture for labs, projects and write-ups.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    repo: "https://github.com/ByCulichi",
    status: "In progress",
    category: "Software",
  },
];
