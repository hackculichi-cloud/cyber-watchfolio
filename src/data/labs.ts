export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Lab = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  difficulty: Difficulty;
  date: string;
  link?: string;
  linkLabel?: string;
  result?: string;
};

/**
 * Add new security labs here — the Labs page renders every entry automatically.
 * Keep entries authentic: only publish labs you have actually completed.
 */
export const labs: Lab[] = [];
