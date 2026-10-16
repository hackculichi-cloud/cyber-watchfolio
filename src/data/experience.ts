export type ExperienceEntry = {
  id: string;
  title: string;
  organization?: string;
  period?: string;
  summary: string;
  highlights: string[];
  location?: string;
  current?: boolean;
};

export const experienceSummary = {
  headline: "7 years of bilingual customer service experience",
  statement:
    "Seven years of bilingual customer service, with roles in operations supervision, Tier 2 technical support, training, logistics and billing support at TCS, TTEC, Alorica and TP.",
  stats: [
    { value: "7", label: "Years of experience" },
    { value: "2", label: "Languages (EN / ES)" },
    { value: "Daily", label: "Direct user support" },
  ],
};

export const transferableImpact = [
  {
    area: "IT & Technical Support",
    detail: "At TTEC I provided Tier 2 mobile-device support and root-cause analysis for hardware and software incidents. At TCS I monitored technical queues involving network issues and service outages.",
  },
  {
    area: "Cybersecurity",
    detail: "TCS operations work developed SLA follow-up, incident-response coordination and escalation discipline. I transfer those communication skills to my educational SOC investigations; this is not paid SOC experience.",
  },
  {
    area: "Software Development",
    detail: "Customer support, technical training and internal ticketing taught me to clarify reported issues and explain practical next steps. I bring that user perspective to my software portfolio.",
  },
];

/** Visible text from the owner's career screenshot; truncated bullets and relative durations are not inferred. */
export const experienceEntries: ExperienceEntry[] = [
  { id: "tcs-operations", title: "Operations Supervisor", organization: "Tata Consultancy Services (TCS)", period: "Oct 2025 — Present", location: "San Pedro Tlaquepaque, Jalisco, Mexico · Hybrid", current: true,
    summary: "Supervised day-to-day operations, following SLA commitments, incident response times and escalation protocols.", highlights: ["Quality metrics", "Time management", "SLA follow-up and escalation"] },
  { id: "tcs-support", title: "Technical Support Analyst (Energy Operations)", organization: "Tata Consultancy Services (TCS)", period: "Nov 2023 — Oct 2025", location: "Guadalajara, Jalisco, Mexico",
    summary: "Monitored and managed multiple technical queues, including network issues, service outages and system-impact incidents.", highlights: ["Billing services", "Telecommunications billing", "Technical queue monitoring"] },
  { id: "alorica-logistics", title: "Logistics Operations Analyst", organization: "Alorica", period: "Dec 2022 — Aug 2023", location: "Guadalajara, Jalisco, Mexico · On-site",
    summary: "Coordinated business-critical deliveries using internal ticketing and tracking systems.", highlights: ["Logistics support", "Logistics management", "Ticketing and tracking"] },
  { id: "ttec-tier2", title: "Training Technician / Tier 2 Technical Support", organization: "TTEC", period: "Apr 2019 — Oct 2022", location: "Guadalajara, Jalisco, Mexico · Hybrid",
    summary: "Provided Tier 2 technical support for mobile devices, performing root-cause analysis for hardware and software incidents.", highlights: ["Mobile-device troubleshooting", "Technical training", "Root-cause analysis"] },
  { id: "tp-support", title: "Customer Support & Sales Representative", organization: "TP", period: "Aug 2017 — May 2018", location: "Guadalajara, Jalisco, Mexico · On-site",
    summary: "Provided bilingual customer and billing support in high-volume environments.", highlights: ["Bilingual customer and billing support", "New-hire training", "Sales training"] },
];

/** Derived from the existing experience summary; no employers or performance metrics are inferred. */
export const customerServiceSkills = [
  { title: "Bilingual communication", icon: "phone", description: "I provide customer service in English and Spanish, adapting the explanation to each user and confirming that the next steps are understood." },
  { title: "User support", icon: "support", description: "I listen to the reported issue, ask clarifying questions and guide the user through practical next steps with patient, clear communication." },
  { title: "Problem solving", icon: "problem", description: "I break down the problem, identify the user’s needs and explain the available options so they can make an informed decision." },
  { title: "Conflict resolution", icon: "conflict", description: "I handle difficult conversations calmly, acknowledge the user’s concern and set clear expectations about the available solution and next steps." },
  { title: "Operations supervision", icon: "operations", description: "At TCS I supervise daily operations, quality metrics and time management, following SLA commitments and escalation protocols." },
  { title: "Tier 2 technical support", icon: "technical", description: "At TTEC I supported mobile devices and investigated hardware and software incidents through root-cause analysis." },
  { title: "Training & knowledge sharing", icon: "training", description: "My background includes technical training at TTEC and new-hire and sales training associated with my customer-support role at TP." },
  { title: "Ticketing & logistics coordination", icon: "logistics", description: "At Alorica I coordinated business-critical deliveries using internal ticketing and tracking systems. At TCS I monitored technical queues and service incidents." },
] as const;
