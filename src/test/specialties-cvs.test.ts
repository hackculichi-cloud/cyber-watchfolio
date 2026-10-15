import { profileCapabilities } from "@/data/profileCapabilities";
import { describe, expect, it } from "vitest";
import { cvVariants } from "@/data/cvs";
import { profileIdentities } from "@/data/profiles";
import { specialtiesFor } from "@/data/specialties";
import { translate } from "@/i18n/translate";

describe("specialty and CV publishing integrity", () => {
  it("publishes course knowledge in both languages with an explicit training context", () => {
    for (const cards of Object.values(profileCapabilities)) for (const card of cards) {
      expect(translate(card.title, "es")).not.toBe(card.title);
      expect(translate(card.body, "es")).not.toBe(card.body);
      expect(translate(card.status, "es")).not.toBe(card.status);
    }
  });
  it("gives each of the six profiles its own CV instead of reusing unrelated profiles", () => {
    expect(cvVariants).toHaveLength(6);
    const ids = new Set<string>();
    for (const profile of profileIdentities) {
      expect(profile.cvIds).toHaveLength(1);
      const cv = cvVariants.find(item => item.id === profile.cvIds[0]);
      expect(cv).toBeDefined();
      expect(ids.has(cv!.id)).toBe(false);
      ids.add(cv!.id);

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
    for (const item of specialtiesFor("development")) expect(item.summary).toContain("Academlo");
  });
});
