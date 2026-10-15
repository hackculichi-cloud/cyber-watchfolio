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
  { title: "Bilingual communication", icon: "phone", description: "I provide customer service in English and Spanish, adapting the explanation to each user and confirming that the next steps are understood." },
  { title: "User support", icon: "support", description: "I listen to the reported issue, ask clarifying questions and guide the user through practical next steps with patient, clear communication." },
  { title: "Problem solving", icon: "problem", description: "I break down the problem, identify the user’s needs and explain the available options so they can make an informed decision." },
  { title: "Conflict resolution", icon: "conflict", description: "I handle difficult conversations calmly, acknowledge the user’s concern and set clear expectations about the available solution and next steps." },
] as const;
