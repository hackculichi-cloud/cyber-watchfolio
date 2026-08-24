export type JournalCategory =
  | "What I Learned"
  | "Cybersecurity Labs"
  | "Networking Notes"
  | "Electrical Projects"
  | "Repair Projects"
  | "Development Projects";

export const journalCategories: JournalCategory[] = [
  "What I Learned",
  "Cybersecurity Labs",
  "Networking Notes",
  "Electrical Projects",
  "Repair Projects",
  "Development Projects",
];

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  category: JournalCategory;
  summary: string;
  content: string[];
  technologies?: string[];
  tags?: string[];
};

/** Publish learning notes here — the Journal page and filters update automatically. */
export const journalPosts: JournalPost[] = [];
