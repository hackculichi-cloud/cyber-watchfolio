import { profileCapabilities } from "@/data/profileCapabilities";
import { describe, expect, it } from "vitest";
import { cvVariants } from "@/data/cvs";
import { profileIdentities } from "@/data/profiles";
import { specialtiesFor } from "@/data/specialties";
import { translate } from "@/i18n/translate";
import resumes from "@/data/resumes.json";
import { experienceEntries } from "@/data/experience";
import { cvSections } from "../../scripts/cv-layout.mjs";

describe("specialty and CV publishing integrity", () => {
  it("publishes course knowledge in both languages with an explicit training context", () => {
    for (const cards of Object.values(profileCapabilities)) for (const card of cards) {
      expect(translate(card.title, "es")).not.toBe(card.title);
      expect(translate(card.body, "es")).not.toBe(card.body);
      expect(translate(card.status, "es")).not.toBe(card.status);
    }
  });
  it("gives each of the six profiles its own CV instead of reusing unrelated profiles", () => {
    expect(cvVariants).toHaveLength(7);
    const general = cvVariants.find(item => item.id === "general");
    expect(general?.pageCount).toBeGreaterThanOrEqual(2);
    expect(general?.localized?.es.previews.length).toBeGreaterThanOrEqual(2);
    const ids = new Set<string>();
    for (const profile of profileIdentities) {
      if (profile.slug === "barbering") {
        expect(profile.cvIds).toHaveLength(0);
        continue; // No barbering CV is published without confirmed course and work details.
      }
      expect(profile.cvIds).toHaveLength(1);
      const cv = cvVariants.find(item => item.id === profile.cvIds[0]);
      expect(cv).toBeDefined();
      expect(ids.has(cv!.id)).toBe(false);
      ids.add(cv!.id);
      for (const lang of ["es", "en"] as const) {
        const pages = cv!.localized![lang].previews;
        if (cv!.id === "repair") expect(pages).toHaveLength(1);
        else expect(pages.length).toBeGreaterThanOrEqual(2);
        expect(new Set(pages).size).toBe(pages.length);
        expect(pages[pages.length - 1]).toContain(pages.length > 1 ? `-page-${pages.length}.png` : `-${lang}.png`);
      }
    }
  });
  it("limits shared employment to customer service and selected relevant repair roles", () => {
    expect(resumes.careerIds).toEqual(experienceEntries.map(entry => entry.id));
    for (const lang of ["es", "en"] as const) {
      expect(resumes.career[lang]).toHaveLength(5);
      for (const resume of resumes.resumes) {
        const sections = resume[lang].sections;
        expect(sections.some(section => section.id === "skills")).toBe(true);
        if (resume.id === "customer-service") {
          expect(sections.filter(section => section.source === "career")).toHaveLength(1);
          expect(cvSections(resumes, resume, lang).find(section => section.source === "career")?.entries).toEqual(resumes.career[lang]);
          expect(resume[lang].highlights[0].value).toBe("7");
        } else if (resume.id === "repair") {
          const career = cvSections(resumes, resume, lang).find(section => section.source === "career");
          expect(career?.ids).toEqual(["ttec-tier2", "tcs-operations", "tcs-support"]);
          expect(career?.entries).toEqual([3, 0, 1].map(index => resumes.career[lang][index]));
          expect(JSON.stringify(career)).not.toMatch(/Alorica|Teleperformance/);
          expect(resume[lang].sections.map(section => section.id)).toEqual(["experience", "repairs", "skills", "certifications", "languages", "development"]);
        } else {
          expect(sections.some(section => section.source === "career")).toBe(false);
          expect(sections.find(section => section.id === "experience")?.entries?.length).toBeGreaterThan(0);
          expect(JSON.stringify(resume[lang])).not.toMatch(/customer service|atención al cliente|Tata Consultancy Services|TTEC|Alorica|years in bilingual service|años de atención bilingüe/i);
        }
        const training = sections.find(section => section.source === "training");
        expect(training).toBeDefined();
        for (const id of training!.ids!) expect(resumes.training[lang].some(record => record.id === id)).toBe(true);
      }
      const aws = resumes.training[lang].find(record => record.id === "aws-preparation")!;
      expect(aws.tone).toBe("pending");
      expect(resumes.training[lang].find(record => record.id === "academlo")?.tone).toBe("partial");
      expect(resumes.training[lang].find(record => record.id === "lidetec")?.document).toBe("https://culichi.lat/images/repair/cert-lidetec.jpg");
    }
  });
  it("rejects accidentally adding the shared service chronology to a technical PDF", () => {
    const original = resumes.resumes.find(item => item.id === "electrical")!;
    const resume = { ...original, es: { ...original.es, sections: [...original.es.sections, { id: "unrelated", title: "Unrelated history", icon: "experience", layout: "timeline", source: "career" }] } };
    expect(() => cvSections(resumes, resume, "es")).toThrow(/only in its own CV/);
  });
  it("rejects unrelated or unknown employment in the targeted repair CV", () => {
    const original = resumes.resumes.find(item => item.id === "repair")!;
    for (const id of ["alorica-logistics", "unknown-job"]) {
      const resume = { ...original, en: { ...original.en, sections: [{ id: "experience", title: "Experience", icon: "experience", layout: "timeline", source: "career", ids: [id] }] } };
      expect(() => cvSections(resumes, resume, "en")).toThrow(/repair/i);
    }
  });
  it("targets relevant roles in both languages and leads applications with evidenced work", () => {
    for (const resume of resumes.resumes) for (const lang of ["es", "en"] as const) {
      expect(resume[lang].targetRoles).toHaveLength(resume.id === "repair" ? 0 : 3);
      expect(resume[lang].sections[0].id).toBe(resume.id === "general" ? "projects" : "experience");
      expect(translate(resume.en.summary, "es")).toBe(resume.es.summary);
    }
    const electrical = resumes.resumes.find(resume => resume.id === "electrical")!;
    expect(electrical.es.targetRoles).toContain("Ayudante electricista");
    expect(electrical.es.targetRoles.join(" ")).not.toMatch(/ingeniero|certificado/i);
    expect(electrical.es.sections.find(section => section.source === "training")?.ids?.[0]).toBe("electrical-conductors");
    expect(resumes.training.es.find(record => record.id === "electrical-conocer")?.tone).toBe("progress");
    for (const lang of ["es", "en"] as const) {
      const ids = electrical[lang].sections.find(section => section.source === "training")!.ids!;
      const completed = ids.map(id => resumes.training[lang].find(record => record.id === id)!).filter(record => record.tone === "complete");
      expect(completed).toHaveLength(5);
      for (const course of completed) expect(course.document).toMatch(/^https:\/\/culichi\.lat\/certificates\/.+\.pdf$/);
      expect(ids).toContain("electrical-linkedin-equipment");
      expect(ids).toContain("electrical-conductors");
      expect(resumes.training[lang].find(record => record.id === "electrical-conductors")?.document).toBe("https://culichi.lat/certificates/udemy-calculo-seleccion-conductores.pdf");
    }
  });
  it("translates specialty descriptions and keeps future electronics training planned", () => {
    for (const profile of profileIdentities) for (const item of specialtiesFor(profile.slug)) {
      expect(translate(item.summary, "es")).not.toBe(item.summary);
      expect(translate(item.status, "es")).not.toBe(item.status);
    }
    const electronic = specialtiesFor("electronics");
    expect(electronic.find(item => item.id === "basic-electronics")?.summary).toContain("Escuela Tecnológica de Occidente");
    expect(electronic).toHaveLength(7);
    expect(electronic.filter(item => item.status === "Currently studying")).toHaveLength(1);
    for (const id of ["audio-radio", "television-video", "digital-systems", "microcontrollers", "microcomputers", "industrial-electronics"]) expect(electronic.find(item => item.id === id)?.status).toBe("Upcoming");
    for (const item of specialtiesFor("development").filter(item => ["frontend", "backend", "full-stack"].includes(item.id))) expect(item.summary).toContain("Academlo");
    expect(specialtiesFor("development").find(item => item.id === "python-automation")?.summary).toContain("Culichi-Metrics");
  });
});
