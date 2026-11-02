import type { ProfileSlug } from "./profiles";
import type { TrainingProviderId } from "./trainingProviders";

export type CertificationRecord = {
  id: string; title: string; provider: string; providerId?: TrainingProviderId; training: string; document: string; href?: string;
  awardedTo?: string;
  issuedOn?: string;
  instructor?: string;
  duration?: string;
  contactHours?: number;
  credentialId?: string;
  verifyUrl?: string;
  image?: { src: string; alt: string; width: number; height: number };
};
export const certifications: Partial<Record<ProfileSlug, CertificationRecord[]>> = {
  electrical: [
    { id: "electrical-conocer", title: "Electrical Fundamentals & Industrial Electricity", provider: "Universidad Internacional · RED CONOCER", providerId: "universidad-internacional", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
    {
      id: "electrical-linkedin-equipment", title: "Electrical Systems: Panel Boards, Frequency Drives, and Transformers", provider: "LinkedIn Learning", providerId: "linkedin-learning", training: "Completed",
      document: "Course completed on November 2, 2026; certificate issued by LinkedIn Learning.",
      awardedTo: "Christian Velasco Estrada", issuedOn: "2026-11-02", contactHours: 0.25,
      credentialId: "c817c182dd2d139f1c061815cdfb7589bae0a657e50ad8f5db1c2d3f4eb56c0c",
      href: "/certificates/linkedin-electrical-panels-drives-transformers.pdf",
      image: {
        src: "/certificates/linkedin-electrical-panels-drives-transformers.webp",
        alt: "LinkedIn Learning completion certificate for Electrical Systems: Panel Boards, Frequency Drives, and Transformers awarded to Christian Velasco Estrada on November 2, 2026.",
        width: 1600, height: 1237,
      },
    },
    {
      id: "electrical-linkedin", title: "Electrical Systems: Reading Drawings and Schematics", provider: "LinkedIn Learning", providerId: "linkedin-learning", training: "Completed",
      document: "Course completed on October 30, 2026; certificate issued by LinkedIn Learning.",
      awardedTo: "Christian Velasco Estrada", issuedOn: "2026-10-30", contactHours: 0.75,
      credentialId: "7f0b6b08ee714835933ca230548a28ca29db50bff8e0fb9ae0f7b6614018df29",
      href: "/certificates/linkedin-electrical-drawings-schematics.pdf",
      image: {
        src: "/certificates/linkedin-electrical-drawings-schematics.webp",
        alt: "LinkedIn Learning completion certificate for Electrical Systems: Reading Drawings and Schematics awarded to Christian Velasco Estrada on October 30, 2026.",
        width: 1600, height: 1237,
      },
    },
    { id: "electrical-udemy", title: "Basic Electrical Installations", provider: "Udemy", providerId: "udemy", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
    {
      id: "electrical-measurements", title: "Electrical Measurements", provider: "Udemy", providerId: "udemy", training: "Completed",
      document: "Course completed on October 30, 2026; certificate issued by Udemy.",
      awardedTo: "Christian Velasco Estrada", issuedOn: "2026-10-30", instructor: "Irving Lopez Hernandez", duration: "2 hours",
      credentialId: "UC-25442727-a627-4cdc-894e-d93da3bba021",
      verifyUrl: "https://www.udemy.com/certificate/UC-25442727-a627-4cdc-894e-d93da3bba021/",
      href: "/certificates/udemy-mediciones-electricas.pdf",
      image: {
        src: "/certificates/udemy-mediciones-electricas.webp",
        alt: "Udemy completion certificate for Electrical Measurements awarded to Christian Velasco Estrada on October 30, 2026.",
        width: 1600, height: 1190,
      },
    },
  ],
  electronics: [
    { id: "eto-basic", title: "Basic Electronics", provider: "Escuela Tecnológica de Occidente", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
  ],
  cybersecurity: [
    { id: "aws-preparation", title: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", training: "In preparation", document: "Preparing for the certification exam. Exam not passed; credential not yet obtained." },
    { id: "linux-diploma", title: "Linux diploma program", provider: "Institution not specified", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
  ],
  development: [
    { id: "aws-preparation", title: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", training: "In preparation", document: "Preparing for the certification exam. Exam not passed; credential not yet obtained." },
    { id: "academlo", title: "Frontend / Backend / Full Stack", provider: "Academlo", training: "Incomplete studies", document: "Incomplete studies; no graduation certificate claimed." },
  ],
  repair: [
    { id: "lidetec", title: "Smartphone Repair", provider: "LIDETEC", training: "Course participation", document: "Participation certificate available.", href: "#repair-certification" },
  ],
};
