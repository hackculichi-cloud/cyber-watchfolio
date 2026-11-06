import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';

for (const lang of ['es','en'] as const) {
  test(`electrical collections are short, directly clickable and keep their routes in ${lang}`, async ({page,request}) => {
    await page.addInitScript(value=>localStorage.setItem('portfolio-lang',value),lang);
    for(const width of [320,768,1440]) {
      await page.setViewportSize({width,height:1000});
      await page.goto('/electrical');
      const world=page.locator('[data-world="electrical"]');
      await expect(world).toHaveCSS('background-image','none');
      await expect(page.locator('[data-world-hero="electrical"]')).toHaveCSS('background-image',/hero-electrical/);
      await expect(page.locator('footer')).toHaveCSS('background-image','none');
      const tools=page.locator('[data-open-electrical-tools]');
      const training=page.locator('[data-open-electrical-training]');
      await expect(tools).toContainText(lang==='es'?'5 fotos':'5 photos');
      await expect(training).toContainText(lang==='es'?'5 cursos completados':'5 completed courses');
      for(const entry of [tools,training]) {
        expect((await entry.innerText()).split(/\s+/).length).toBeLessThan(9);
        expect((await entry.boundingBox())!.height).toBeGreaterThanOrEqual(100);
      }
      const a=(await tools.boundingBox())!,b=(await training.boundingBox())!;
      if(width>=640) expect(a.y).toBeCloseTo(b.y,0);
      else expect(b.y).toBeGreaterThanOrEqual(a.y+a.height);
      await tools.click();
      await expect(page).toHaveURL(/#tools$/);
      await expect(page.locator('[data-owned-tool]')).toHaveCount(5);
      await page.locator('[data-close-electrical-tools]').first().click();
      await expect(tools).toBeFocused();
      await training.click();
      await expect(page.locator('[data-certificate-original]')).toHaveCount(5);
      await page.locator('[data-close-electrical-training]').click();
      await expect(training).toBeFocused();
      await expect(page.locator('header a[href="/contact"],header a[href="/cv"]')).toHaveCount(0);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
    const response=await request.get(`/cv/christian-velasco-electrical-${lang}.pdf`);
    expect(response.ok()).toBe(true);
    const text=execFileSync('pdftotext',['-raw','-','-'],{input:await response.body()}).toString().replace(/-\s+/g,'-').replace(/\s+/g,' ');
    for(const fragment of lang==='es'
      ? ['Instalaciones Eléctricas Básicas','Mediciones Eléctricas','lectura de planos y esquemas','variadores de frecuencia y transformadores','119.3 V CA','En curso','Conocimientos técnicos y resumen de formación']
      : ['Basic Electrical Installations','Electrical Measurements','Reading Drawings and Schematics','Frequency Drives, and Transformers','119.3 V AC','In progress','Technical skills & course summary']) expect(text).toContain(fragment);
    expect(text).not.toMatch(/document pending|original file pending|archivo original pendiente|documento pendiente/i);
  });
}
