import { expect, test } from '@playwright/test';

for (const [index, path] of ['/', '/cybersecurity', '/software-development', '/electrical', '/electronics', '/repair', '/experience', '/barbering'].entries()) {
  test(`all four contact previews keep the footer fox fixed on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: [320,820,1440][index % 3], height:900 });
    await page.emulateMedia({ reducedMotion:'no-preference' });
    await page.goto(path);
    await page.evaluate(()=>document.fonts.ready);
    const footer=page.locator('footer');
    const frame=footer.locator('[data-footer-contact]');
    const fox=frame.locator('.footer-contact-fox, [data-home-character]').first();
    const links=frame.locator('[data-contact-grid] > a');
    for (const [i, channel] of ['Email','LinkedIn','GitHub','WhatsApp'].entries()) {
      const link=links.nth(i);
      await link.scrollIntoViewIfNeeded();
      const before=(await fox.boundingBox())!;
      await link.hover();
      await link.focus();
      const preview=page.locator(`[data-contact-preview="${channel}"]`);
      await expect(preview).toBeVisible();
      const after=(await fox.boundingBox())!;
      expect(Math.abs(after.x-before.x)).toBeLessThan(1);
      expect(Math.abs(after.y-before.y)).toBeLessThan(1);
      if(channel==='WhatsApp') {
        await expect(preview).toContainText('+52 33 1752 2176');
        await expect(preview.locator('iframe')).toHaveCount(0);
        await expect(link).toHaveAttribute('href','https://wa.me/523317522176');
        await expect(link).toHaveAttribute('rel',/noopener/);
      }
      await page.keyboard.press('Escape');
      await expect(preview).toBeHidden();
    }
    await expect(footer.locator('[data-footer-navigation-layout] [data-footer-utilities]')).toHaveCount(0);
    for(const href of ['/about','/cv','/contact']) await expect(footer.locator(`[data-footer-bottom] a[href="${href}"]`)).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
}

test('WhatsApp keeps direct touch navigation and offers the local preview on Contact', async ({ browser }) => {
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await context.route('https://wa.me/**',route=>route.fulfill({body:'Local navigation check',contentType:'text/plain'}));
  const page=await context.newPage(); await page.goto('/contact');
  const link=page.locator('main a[href="https://wa.me/523317522176"]');
  await link.focus(); await expect(page.locator('[data-contact-preview="WhatsApp"]')).toBeVisible();
  const popupPromise=context.waitForEvent('page'); await link.tap();
  const popup=await popupPromise; await popup.waitForURL('https://wa.me/523317522176');
  await context.close();
});
