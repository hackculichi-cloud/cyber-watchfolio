import type { ProfileSlug } from "./profiles";

/** First-person scan summaries of confirmed practice, study and employment. */
export const profileSpotlights: Record<ProfileSlug, { headline: string; skills: string[]; proof: string }> = {
  cybersecurity: {
    headline: "I investigate alerts in training labs",
    skills: ["Analyze authentication and network logs", "Investigate educational phishing cases", "Document evidence and response playbooks"],
    proof: "3 documented training investigations",
  },
  development: {
    headline: "I build web interfaces",
    skills: ["React, Next.js and TypeScript interfaces", "Python automation for Excel reports", "Git/GitHub version control"],
    proof: "10 public portfolio projects to explore",
  },
  electrical: {
    headline: "I install, measure and verify",
    skills: ["Residential outlets and ceiling lights", "Polarity and protective-earth checks", "AC/DC measurement practice"],
    proof: "Residential work with original photographs",
  },
  electronics: {
    headline: "I learn electronics through practice",
    skills: ["Component and diagram identification", "Circuit measurement and lab diagnosis", "Soldering foundations in training"],
    proof: "Basic Electronics at ETO · In progress",
  },
  repair: {
    headline: "I repair and test smartphones",
    skills: ["iPhone battery replacements", "Screen replacement", "Functional checks after reassembly"],
    proof: "3 completed iPhone repairs",
  },
  "customer-service": {
    headline: "I turn problems into solutions",
    skills: ["Operations supervision and SLA follow-up", "Tier 2 technical support and training", "Bilingual customer communication"],
    proof: "7 years of professional experience",
  },
  barbering: {
    headline: "I also cut hair",
    skills: ["Haircutting", "Training at Baltra Barbería", "A space for my cuts and tools"],
    proof: "Baltra Barbería · Guadalajara",
  },
};
