import { describe, expect, it } from "vitest";
import { certifications, relatedTrainingFor } from "@/data/certifications";
import { translate } from "@/i18n/translate";

describe("related training", () => {
  it("reuses the verified measurement credential and keeps ongoing studies distinct in repair", () => {
    const courses = relatedTrainingFor("repair");
    const measurements = courses.find(course => course.record.id === "electrical-measurements")!;
    expect(measurements.record).toBe(certifications.electrical!.find(record => record.id === "electrical-measurements"));
    expect(measurements.record.training).toBe("Completed");
    expect(measurements.href).toBe("/electrical#certificate-electrical-measurements");
    expect(courses.find(course => course.record.id === "eto-basic")!.record.training).toBe("Currently Studying");
    expect(courses.some(course => course.record.id === "lidetec")).toBe(false);
  });
  it("only links courses explicitly relevant to the area, with translated context", () => {
    const courses = relatedTrainingFor("electronics");
    expect(courses.map(course => course.record.id)).toEqual(["electrical-linkedin", "electrical-measurements", "lidetec"]);
    expect(new Set(courses.map(course => course.record.id)).size).toBe(courses.length);
    for (const course of courses) expect(translate(course.summary, "es")).not.toBe(course.summary);
    for (const profile of ["electrical", "cybersecurity", "development", "barbering", "customer-service"] as const) expect(relatedTrainingFor(profile)).toEqual([]);
  });
  it("keeps the supplied photograph separate from its digitized participation document", () => {
    const record = certifications.repair!.find(record => record.id === "lidetec")!;
    expect(record.training).toBe("Course participation");
    expect(record.digitized).toBe(true);
    expect(record.href).toBe("/certificates/lidetec-reparacion-celulares.pdf");
    expect(record.image?.src).toBe("/certificates/lidetec-reparacion-celulares.webp");
    expect(record.sourcePhoto).toBe("/images/repair/cert-lidetec.jpg");
    expect(record.credentialId).toBeUndefined();
  });
});
