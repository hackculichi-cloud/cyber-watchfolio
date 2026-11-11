import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const evidence = JSON.parse(readFileSync(new URL("../docs/electrical-outlet-november-evidence.json", import.meta.url), "utf8")) as {
  caseId: string;
  photos: { number: number; src: string; bytes: number; sha256: string }[];
  previouslyPublished: { sha256: string }[];
};

const caseId = "residential-outlet-november-2026";
const photoDirectory = "/images/electrical/outlet-practice-november-2026/";

test("the nine new outlet photographs retain their uploaded bytes without republishing the 34 older files", async ({ request }) => {
  expect(evidence.caseId).toBe(caseId);
  expect(evidence.photos).toHaveLength(9);
  expect(evidence.previouslyPublished).toHaveLength(34);
  const olderHashes = new Set(evidence.previouslyPublished.map(photo => photo.sha256));
  const hashes = new Set<string>();
  for (const photo of evidence.photos) {
    expect(photo.src).toBe(`${photoDirectory}${String(photo.number).padStart(2, "0")}.jpeg`);
    const response = await request.get(photo.src);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
    const bytes = await response.body();
    expect(bytes.length).toBe(photo.bytes);
    const hash = createHash("sha256").update(bytes).digest("hex");
    expect(hash).toBe(photo.sha256);
    expect(olderHashes.has(hash)).toBe(false);
    hashes.add(hash);
  }
  expect(hashes.size).toBe(9);
});

for (const lang of ["es", "en"] as const) for (const width of [320, 390, 1440]) {
  test(`one work collection presents the new outlet practice and its nine photos at ${width}px in ${lang}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    await page.goto("/electrical#projects");
    const collection = page.locator("#projects");
    await expect(collection.locator("h2")).toHaveText(lang === "es" ? "Trabajos y prácticas" : "Work & practice");
    if (width < 640) await expect(page.locator(".profile-section-nav select")).toHaveValue("projects");
    else await expect(page.locator(".profile-section-nav a[href='#projects']")).toHaveAttribute("aria-current", "true");
    await expect(page.locator("[data-area-tab], [role=tablist]")).toHaveCount(0);
    await expect(collection.locator("[data-work]")).toHaveCount(6);
    await expect(collection.locator("[data-photo-gallery]")).toHaveCount(0);
    const filters = collection.locator("[data-electrical-category-choices]");
    await expect(filters.locator("button")).toHaveCount(4);
    await expect(collection.locator("button[aria-pressed]")).toHaveCount(4);
    await expect(collection.getByText(lang === "es" ? "Todos los trabajos realizados" : "All completed work", { exact: true })).toHaveCount(0);
    await filters.locator('[data-electrical-group="residential-outlets"]').click();
    await expect(collection.locator("[data-work]")).toHaveCount(4);
    const card = collection.locator(`[data-work="${caseId}"]`);
    const opener = card.locator("button").first();
    await expect(opener.locator("img")).toHaveAttribute("src", `${photoDirectory}07.jpeg`);
    await opener.click();
    const detail = page.getByRole("dialog");
    const technical = detail.locator("[data-content-details]");
    await expect(technical).not.toHaveAttribute("open", "");
    const gallery = detail.locator("[data-photo-gallery]");
    await expect(gallery).toHaveAttribute("data-photo-count", "9");
    await expect(gallery.locator("figure")).toHaveCount(9);
    const sources = await gallery.locator("img").evaluateAll(images => images.map(image => image.getAttribute("src")));
    expect(sources).toEqual(evidence.photos.map(photo => photo.src));
    await expect(detail).toContainText("122.0 V");
    await expect(detail.locator('img[src*="outlet-october-2026"], img[src*="/images/repair/"]')).toHaveCount(0);
    const photo = gallery.locator("button").first();
    await photo.click();
    const viewer = page.locator("[data-photo-dialog]");
    for (const [index, source] of sources.entries()) {
      await expect(viewer.locator("img")).toHaveAttribute("src", source!);
      await expect(viewer.getByRole("status")).toHaveText(lang === "es" ? `Foto ${index + 1} de 9` : `Photo ${index + 1} of 9`);
      if (index < sources.length - 1) await page.keyboard.press("ArrowRight");
    }
    await page.keyboard.press("Escape");
    await expect(viewer).toHaveCount(0);
    await expect(photo).toBeFocused();
    expect(await detail.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(opener).toBeFocused();
    await page.goto("/electrical#evidence");
    // A same-page legacy link keeps the active filter; a direct reload starts with all cases.
    await expect(page.locator("#projects [data-work]")).toHaveCount(4);
    await expect(page.locator('[data-electrical-group="residential-outlets"]')).toHaveAttribute("aria-pressed", "true");
    await page.reload();
    await expect(page.locator("#projects [data-work]")).toHaveCount(6);
    if (width < 640) await expect(page.locator(".profile-section-nav select")).toHaveValue("projects");
    else await expect(page.locator(".profile-section-nav a[href='#projects']")).toHaveAttribute("aria-current", "true");
    await expect(page.locator("[data-photo-gallery]")).toHaveCount(0);
    await expect(page.locator(".profile-section-nav a[href='#evidence'], .profile-section-nav option[value='evidence']")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
