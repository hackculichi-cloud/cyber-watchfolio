export type ExperienceEntry = {
  id: string;
  title: string;
  organization?: string;
  period?: string;
  summary: string;
  highlights: string[];
};

export const experienceSummary = {
  headline: "5+ years of bilingual customer service experience",
  statement:
    "More than 5 years of bilingual customer service experience, developing strong communication, problem-solving, user support, and conflict-resolution skills.",
  stats: [
    { value: "5+", label: "Years of experience" },
    { value: "2", label: "Languages (EN / ES)" },
    { value: "Daily", label: "Direct user support" },
  ],
};

export const transferableImpact = [
  {
    area: "IT & Technical Support",
    detail: "Clear user communication, patient troubleshooting and expectation management during incidents.",
  },
  {
    area: "Cybersecurity",
    detail: "Explaining risk and findings to non-technical stakeholders, structured documentation and escalation.",
  },
  {
    area: "Software Development",
    detail: "User-centred thinking, gathering requirements and translating real needs into practical solutions.",
  },
];

/**
 * Add specific roles, companies and dates here when you want them published.
 * Left empty on purpose — nothing is invented.
 */
export const experienceEntries: ExperienceEntry[] = [];

/** Derived from the existing experience summary; no employers or performance metrics are inferred. */
export const customerServiceSkills = [
  { title: "Bilingual communication", icon: "phone", description: "Customer service in English and Spanish, with clear explanations adapted to each user." },
  { title: "User support", icon: "support", description: "Listening to user needs, clarifying the issue and guiding the next steps." },
  { title: "Problem solving", icon: "problem", description: "Understanding the problem and explaining practical options clearly." },
  { title: "Conflict resolution", icon: "conflict", description: "Patient communication with frustrated users and clear expectation management." },
] as const;
