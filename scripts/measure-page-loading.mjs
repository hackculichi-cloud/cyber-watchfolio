// Local diagnostics, not a device-independent FPS or INP test.
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const baseURL = process.env.FLUENCY_BASE_URL || 'http://127.0.0.1:4173';
const paths = ['/', '/electrical', '/software-development', '/repair', '/barbering'];
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const samples = [];
try {
  for (let round = 0; round < 3; round++) {
    for (const path of paths) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        const session = await context.newCDPSession(page);
        await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        await session.send('Performance.enable');
        await page.goto(baseURL + path, { waitUntil: 'networkidle' });
        await page.locator('main h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const metrics = Object.fromEntries((await session.send('Performance.getMetrics')).metrics.map(({ name, value }) => [name, value]));
        const resources = await page.evaluate(() => {
          const entries = performance.getEntriesByType('resource');
          const bytes = type => entries.filter(entry => entry.initiatorType === type).reduce((sum, entry) => sum + entry.encodedBodySize, 0);
          return { scriptBytes: bytes('script'), imageBytes: entries.filter(entry => /\.(?:png|jpe?g|webp|svg)(?:\?|$)/i.test(entry.name)).reduce((sum, entry) => sum + entry.encodedBodySize, 0), totalBytes: entries.reduce((sum, entry) => sum + entry.encodedBodySize, 0), requests: entries.length, dom: document.querySelectorAll('*').length };
        });
        samples.push({ round, path, ...resources, taskMs: metrics.TaskDuration * 1000, scriptMs: metrics.ScriptDuration * 1000, layoutMs: metrics.LayoutDuration * 1000, styleMs: metrics.RecalcStyleDuration * 1000 });
      } finally { await context.close(); }
    }
  }
} finally { await browser.close(); }
if (process.env.FLUENCY_REPORT) writeFileSync(process.env.FLUENCY_REPORT, JSON.stringify(samples, null, 2) + '\n');
for (const path of paths) {
  const rows = samples.filter(sample => sample.path === path);
  const keys = ['scriptBytes', 'imageBytes', 'totalBytes', 'requests', 'dom', 'taskMs', 'scriptMs', 'layoutMs', 'styleMs'];
  console.log(path, JSON.stringify(Object.fromEntries(keys.map(key => [key, rows.map(row => row[key]).sort((a, b) => a - b)[1]]))));
}
