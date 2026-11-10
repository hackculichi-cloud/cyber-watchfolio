import { test, expect } from "@playwright/test";
import { selectLanguage } from "./support/selectLanguage";

test('empty repair areas stay in one dropdown and their deep links remain usable', async ({ page }) => {
  for (const width of [320,820,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/repair');
    const other=page.locator('[data-other-repair-categories]');
    await expect(other).not.toHaveAttribute('open','');
    await expect(page.locator('#laptops')).toBeHidden();
    await other.locator(':scope > summary').click();
    for (const id of ['laptops','consoles','work']) await expect(page.locator(`#${id}`)).toBeVisible();
    await page.goto('/repair#laptops');
    await expect(other).toHaveAttribute('open','');
    await expect(page.locator('#laptops')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});

for (const width of [320, 390, 1440]) {
  test(`clients reach each real repair in one selection, with photos before optional text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/repair');
    const showcase = page.locator('[data-repair-showcase]');
    await expect(showcase.getByRole('button')).toHaveCount(3);
    await expect(page.locator('[data-repair-group="iPhone"]')).toHaveCount(0);
    for (const [id, count] of [['sr-001', 9], ['sr-002', 5], ['sr-003', 2]] as const) {
      const trigger = showcase.locator(`[data-repair-group="${id}"]`);
      await trigger.click();
      const dialog = page.locator('[data-repair-dialog]');
      const record = dialog.locator(`[data-repair-case="${id}"]`);
      const photos = record.locator('[data-photo-gallery]');
      await expect(photos.locator('figure')).toHaveCount(count);
      const technical = record.locator('[data-repair-technical]');
      await expect(technical).not.toHaveAttribute('open', '');
      await expect(photos.locator('button').first()).toBeInViewport();
      await photos.locator('button').first().click();
      const viewer = page.locator('[data-photo-dialog]');
      await expect(viewer.getByRole('status')).toHaveText(`Photo 1 of ${count}`);
      await page.keyboard.press('ArrowRight');
      await expect(viewer.getByRole('status')).toHaveText(`Photo 2 of ${count}`);
      await page.keyboard.press('Escape');
      await expect(viewer).toHaveCount(0);
      await expect(photos.locator('button').first()).toBeFocused();
      await technical.locator(':scope > summary').click();
      await expect(record.getByText('Face ID', { exact: true })).toBeVisible();
      await expect(record.getByText(/test measurements are not documented/)).toBeVisible();
      await expect(record.locator('[data-work-step]')).toHaveCount(id === 'sr-003' ? 3 : 5);
      await expect(record.locator('figure')).toHaveCount(count); // No duplicate photo grids in the written process.
      if (id === 'sr-002') await expect(technical.getByText('Aftermarket self-programming battery', { exact: true })).toBeVisible();
      expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('short filters never mix planned jobs with completed evidence; translations work inside a repair', async ({ page }) => {
  await page.goto('/repair#smartphones');
  const filters = page.getByRole('group', { name: 'Filter repairs' });
  await filters.getByRole('button', { name: 'Battery', exact: true }).click();
  await expect(page.locator('[data-repair-showcase] button')).toHaveCount(2);
  await filters.getByRole('button', { name: 'Screen', exact: true }).click();
  await expect(page.locator('[data-repair-showcase] button')).toHaveCount(1);
  await page.locator('[data-repair-group="sr-003"]').click();
  const dialog = page.locator('[data-repair-dialog]');
  await selectLanguage(dialog, 'es');
  await expect(dialog.getByText('Cambio de pantalla', { exact: true })).toBeVisible();
  await expect(dialog.getByText('Detalles técnicos y comprobaciones', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  const plans = page.locator('#smartphone-repair-groups > details');
  await plans.locator(':scope > summary').click();
  await expect(plans.locator('[data-planned-repair]')).toHaveCount(1);
  await expect(plans.locator('[data-reported-repair]')).toHaveCount(3);
  await expect(plans).toContainText('iPhone 13');
  await expect(plans).toContainText('iPhone X');
  await expect(plans).toContainText('Planeado');
  await expect(plans.locator('img')).toHaveCount(0);
});

test('certificate and syllabus stay in their own destination; the full workshop archive remains reachable', async ({ page }) => {
  await page.goto('/repair#certifications');
  const certificate = page.locator('#repair-certification');
  const curriculum = certificate.locator('#repair-training');
  await expect(curriculum).toBeVisible();
  expect((await certificate.boundingBox())!.y).toBeLessThan((await page.locator('#smartphones').boundingBox())!.y);
  const image = certificate.locator('[data-repair-certificate] img');
  await expect(image).toHaveCSS('max-height', 'none');
  await expect(certificate.locator('[data-repair-school]')).toContainText('LIDETEC');
  await certificate.getByRole('button', { name: 'View certificate', exact: true }).first().click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', '/images/repair/cert-lidetec.jpg');
  await page.keyboard.press('Escape');
  await expect(curriculum.locator('ol > li')).toHaveCount(5);
  await curriculum.getByRole('button', { name: 'View training details', exact: true }).click();
  await expect(curriculum.getByText('UnlockTool setup and software servicing (coursework)', { exact: true })).toBeVisible();
  await page.goto('/repair#gallery');
  await page.locator('#gallery details > summary').click();
  const gallery = page.locator('#gallery [data-photo-gallery]');
  await expect(gallery.locator('figure')).toHaveCount(18);
  await gallery.locator('button').first().click();
  const viewer = page.locator('[data-photo-dialog]');
  for (let index = 1; index <= 18; index++) {
    await expect(viewer.locator('img')).toHaveAttribute('src', `/images/repair/repair-photo-${String(index).padStart(2, '0')}.jpg`);
    if (index < 18) await page.keyboard.press('ArrowRight');
  }
});
