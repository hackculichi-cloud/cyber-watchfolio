import { expect, test, type Page } from '@playwright/test';
import { openElectricalArea } from './support/electricalArea';

async function openRepair(page: Page, id: string) {
  for (const group of ['iPhone', id === 'sr-003' ? 'iPhone-screen' : 'iPhone-battery', id]) {
    const tile = page.locator(`[data-repair-group="${group}"]`);
    if (await tile.getAttribute('aria-expanded') !== 'true') await tile.click();
  }
}

for (const width of [320, 1440]) {
  test(`every electrical case has the shared record, native evidence and an honest completion list at ${width}px`, async ({ browser }) => {
    test.setTimeout(60000);
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.addInitScript(() => localStorage.setItem('portfolio-lang', 'es'));
    const page = await context.newPage();
    await page.goto('/electrical#projects');
    for (const [area, group, id, count] of [
      ['residential', 'outlets', 'residential-outlet-october-2026', 5],
      ['residential', 'outlets', 'residential-outlet-switch-replacement', 3],
      ['residential', 'lighting', 'residential-two-luminaire-replacement', 4],
      ['residential', 'training-boards', 'residential-training-board', 4],
      ['control', 'level-control', 'float-switch-course-practice', 2],
      ['control', 'contactors', 'start-stop-contactor-planned', 0],
    ] as const) {
      await openElectricalArea(page, area);
      const choice = page.locator(`[data-electrical-group="${area}-${group}"]`);
      if (await choice.getAttribute('aria-expanded') !== 'true') await choice.click();
      await page.locator(`[data-work="${id}"]`).getByRole('button', { name: 'Ver proyecto', exact: true }).last().click();
      const dialog = page.getByRole('dialog').filter({ has: page.locator('[data-work-process]') });
      await expect(dialog).toHaveAttribute('data-profile', 'electrical');
      await expect(dialog.locator('[data-work-step]')).toHaveCount(count);
      await expect(dialog.locator('[data-work-protocol]')).toContainText('Lista de referencia');
      const pending = dialog.locator('[data-pending-documentation]');
      await expect(pending).not.toHaveAttribute('open', '');
      await pending.locator('summary').click();
      await expect(pending.getByText(/Una foto nueva documenta/)).toBeVisible();
      expect(await pending.locator('[data-documentation-gap]').count()).toBeGreaterThan(0);
      if (id === 'start-stop-contactor-planned') {
        await expect(dialog).toContainText('Planeado');
        await expect(dialog.locator('img:not([data-language-flag])')).toHaveCount(0);
      } else if (id === 'float-switch-course-practice') {
        await expect(dialog.locator('[data-work-step] video')).toHaveCount(1);
        await expect(dialog.locator('video')).toHaveAttribute('preload', 'metadata');
        await expect(dialog.locator('video')).not.toHaveAttribute('autoplay');
      } else {
        const photo = dialog.locator('[data-work-step]').getByRole('button', { name: /^Abrir vista ampliada:/ }).first();
        await photo.click();
        const photoDialog = page.locator('[data-photo-dialog]');
        await expect(photoDialog.locator('img')).toHaveCount(1);
        await photoDialog.getByRole('button', { name: 'Cerrar', exact: true }).click();
        await expect(photoDialog).toHaveCount(0);
        await expect(dialog).toBeVisible();
      }
      expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
    await context.close();
  });

  test(`repair steps keep every assigned photo, author confirmation and keyboard-accessible missing evidence at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.addInitScript(() => localStorage.setItem('portfolio-lang', 'es'));
    const page = await context.newPage();
    await page.goto('/repair#smartphones');
    for (const [id, count, photos] of [['sr-001', 5, 9], ['sr-002', 5, 5], ['sr-003', 3, 2]] as const) {
      await openRepair(page, id);
      const record = page.locator(`[data-repair-case="${id}"]`);
      await expect(record.locator('[data-work-step]')).toHaveCount(count);
      await expect(record.locator('figure')).toHaveCount(photos);
      await expect(record.locator('[data-step-source="confirmation"]').last()).toContainText('Confirmado por el autor');
      await expect(record.locator('[data-work-protocol]')).toContainText('Lista de referencia');
      const pending = record.locator('[data-pending-documentation]');
      await pending.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(pending).toHaveAttribute('open', '');
      await expect(pending.getByText('Estado exterior y funcionamiento actual', { exact: true })).toBeVisible();
      await expect(record).not.toContainText('119.3');
      expect(await record.evaluate(el => getComputedStyle(el).boxShadow)).toBe('none');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  });
}
