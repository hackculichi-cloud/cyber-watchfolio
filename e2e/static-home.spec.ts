import { expect, test } from '@playwright/test';

for (const oldWelcomeFlag of [null, '1']) {
  test(`Home opens directly without welcome UI or its assets with legacy flag ${oldWelcomeFlag ?? 'absent'}`, async ({ page }) => {
    const welcomeRequests: string[] = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname.startsWith('/images/welcome/')) welcomeRequests.push(request.url());
    });
    await page.addInitScript(value => {
      if (value === null) localStorage.removeItem('culichi-welcome-seen');
      else localStorage.setItem('culichi-welcome-seen', value);
    }, oldWelcomeFlag);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('[data-fox-welcome], .welcome-replay')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Replay welcome|Repetir bienvenida/ })).toHaveCount(0);
    const stage = page.locator('[data-home-mascot]');
    await expect(stage.locator('[data-outfit]')).toHaveCount(7);
    await stage.locator('[data-outfit="electrical"]').click();
    await expect(page).toHaveURL(/\/electrical$/);
    await expect(page.locator('[data-profile-workspace="electrical"]')).toBeVisible();
    expect(welcomeRequests).toEqual([]);
  });
}

for (const width of [320, 390, 1440]) {
  for (const motion of ['no-preference', 'reduce'] as const) {
    test(`seven area links stay fixed without labels or playback at ${width}px with ${motion} motion`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.emulateMedia({ reducedMotion: motion });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const stage = page.locator('[data-home-mascot]');
      await stage.scrollIntoViewIfNeeded();
      await page.locator('[data-home-introduction]').evaluate(async element => {
        await Promise.all(element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running' && Number.isFinite(animation.effect?.getTiming().iterations)).map(animation => animation.finished));
      });
      await expect(stage.locator('[data-outfit]')).toHaveCount(7);
      await expect(page.locator('[data-gear-preview], [data-mascot-legend], [data-orbit-toggle], [data-tool-label]')).toHaveCount(0);
      await expect(stage.locator('[data-outfit-selector]')).toHaveCSS('animation-name', 'none');
      for (const node of await stage.locator('[data-orbit-node]').all()) await expect(node).toHaveCSS('animation-name', 'none');
      for (const link of await stage.locator('[data-outfit]').all()) {
        await expect(link).toHaveAccessibleName(/.+/);
        await expect(link).not.toHaveAttribute('aria-describedby');
      }
      const drift = await stage.evaluate(element => new Promise<number>(resolve => {
        const links = [...element.querySelectorAll('[data-outfit]')];
        const initial = links.map(link => link.getBoundingClientRect());
        let maximum = 0;
        let frames = 0;
        const sample = () => {
          links.forEach((link, index) => {
            const rect = link.getBoundingClientRect();
            maximum = Math.max(maximum, Math.abs(rect.x - initial[index].x), Math.abs(rect.y - initial[index].y));
          });
          if (++frames < 20) requestAnimationFrame(sample);
          else resolve(maximum);
        };
        requestAnimationFrame(sample);
      }));
      expect(drift).toBeLessThan(1);
      await stage.locator('[data-outfit="repair"]').focus();
      await expect(stage).toHaveAttribute('data-preview-outfit', 'repair');
      await expect(stage.locator('[data-tool-field="repair"] [data-tool-prop]')).toHaveCount(3);
      await expect(page.locator('[data-gear-preview], [data-mascot-legend]')).toHaveCount(0);
      await stage.locator('[data-outfit="repair"]').click();
      await expect(page).toHaveURL(/\/repair$/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}
