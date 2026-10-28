import { test, expect, type Page } from '@playwright/test';
import { createServer } from 'node:http';
import { selectLanguage } from './support/selectLanguage';

type SecurityProbe = Window & {
  securityViolations?: string[];
  securityHandlerRan?: boolean;
  securityInputExecuted?: boolean;
};

async function recordPolicyViolations(page: Page) {
  await page.evaluate(() => {
    const probe = window as SecurityProbe;
    probe.securityViolations = [];
    document.addEventListener('securitypolicyviolation', event => {
      probe.securityViolations!.push(event.effectiveDirective);
    });
  });
}

test('security headers cover SPA routes, local assets and downloadable PDFs', async ({ request }) => {
  for (const path of ['/', '/contact', '/electrical', '/favicon.svg', '/cv/christian-velasco-general-en.pdf']) {
    const response = await request.head(path);
    expect(response.status(), path).toBe(200);
    const headers = response.headers();
    const csp = headers['content-security-policy'];
    expect(csp, path).toBeTruthy();
    const entries = csp.split(';').map(value => value.trim()).filter(Boolean).map(value => {
      const [directive, ...sources] = value.split(/\s+/);
      return [directive, sources.join(' ')] as const;
    });
    const directives = new Map(entries);
    expect(directives.size, `${path}: duplicate CSP directives`).toBe(entries.length);
    for (const [directive, sources] of Object.entries({
      'default-src': "'self'",
      'base-uri': "'none'",
      'script-src': "'self'",
      'script-src-attr': "'none'",
      'worker-src': "'none'",
      'connect-src': "'self'",
      'object-src': "'none'",
      'frame-src': "'none'",
      'frame-ancestors': "'none'",
      'form-action': "'none'",
    })) {
      expect(directives.get(directive), `${path}: ${directive}`).toBe(sources);
    }
    expect(headers['x-content-type-options'], path).toBe('nosniff');
    expect(headers['x-frame-options'], path).toBe('DENY');
    expect(headers['cross-origin-opener-policy'], path).toBe('same-origin');
    expect(headers['cross-origin-resource-policy'], path).toBe('same-origin');
    expect(headers['referrer-policy'], path).toBe('strict-origin-when-cross-origin');
    expect(headers['permissions-policy'], path).toBe('camera=(), microphone=(), geolocation=()');
  }
});

test('a cross-origin page cannot display the portfolio in an iframe', async ({ page, baseURL }) => {
  const portfolioURL = new URL('/contact', baseURL).href;
  const browserErrors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  const cdp = await page.context().newCDPSession(page);
  cdp.on('Log.entryAdded', ({ entry }) => browserErrors.push(entry.text));
  cdp.on('Audits.issueAdded', ({ issue }) => {
    const violation = issue.details.contentSecurityPolicyIssueDetails;
    if (violation) browserErrors.push(violation.violatedDirective);
  });
  await cdp.send('Log.enable');
  await cdp.send('Audits.enable');
  // Intercepted synthetic responses have an unknown IP address space in Chromium,
  // so use a real loopback parent to reach frame-ancestors enforcement before PNA.
  const parent = createServer((request, response) => {
    if (request.url !== '/__security-parent') {
      response.writeHead(204).end();
      return;
    }
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`<!doctype html><title>Frame policy probe</title><iframe id="security-frame" src="${portfolioURL}"></iframe>`);
  });
  await new Promise<void>((resolve, reject) => {
    parent.once('error', reject);
    parent.listen(0, '127.0.0.1', resolve);
  });
  try {
    const address = parent.address();
    if (!address || typeof address === 'string') throw new Error('Missing loopback server address');
    const parentURL = `http://127.0.0.1:${address.port}/__security-parent`;
    await page.goto(parentURL);
    await expect(page.locator('#security-frame')).toHaveAttribute('src', portfolioURL);
    await expect.poll(() => browserErrors.some(message => /frame-ancestors|X-Frame-Options/i.test(message))).toBe(true);
    await expect(page.frameLocator('#security-frame').locator('main')).toHaveCount(0);
  } finally {
    await cdp.detach();
    await new Promise<void>((resolve, reject) => {
      parent.close(error => error ? reject(error) : resolve());
      parent.closeAllConnections();
    });
  }
});

test('browser CSP blocks form POSTs and off-origin fetches before requests leave the page', async ({ page, baseURL }) => {
  const formURL = new URL('/__security-form-probe', baseURL).href;
  const fetchURL = 'https://csp-probe.invalid/collect';
  const attemptedRequests: string[] = [];
  // If a policy regresses, interception still prevents server writes or external traffic.
  for (const url of [formURL, fetchURL]) {
    await page.route(url, route => {
      attemptedRequests.push(`${route.request().method()} ${route.request().url()}`);
      return route.fulfill({ status: 200, contentType: 'text/plain', headers: { 'access-control-allow-origin': '*' }, body: 'Intercepted security probe' });
    });
  }
  await page.goto('/contact');
  await expect(page.locator('main h1')).toBeVisible();
  await recordPolicyViolations(page);
  const fetchRejected = await page.evaluate(async ({ formURL, fetchURL }) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formURL;
    document.body.appendChild(form);
    form.submit();
    try {
      await fetch(fetchURL, { method: 'POST', body: 'security-probe' });
      return false;
    } catch {
      return true;
    }
  }, { formURL, fetchURL });
  expect(fetchRejected).toBe(true);
  await expect.poll(() => page.evaluate(() => (window as SecurityProbe).securityViolations)).toEqual(expect.arrayContaining(['form-action', 'connect-src']));
  expect(attemptedRequests).toEqual([]);
  // CSP cancels the form navigation; inspect the active document rather than
  // waiting for Playwright's pending-navigation lifecycle to finish.
  expect(await page.evaluate(() => window.location.href)).toBe(new URL('/contact', baseURL).href);
  expect(await page.evaluate(() => {
    const heading = document.querySelector('main h1');
    return !!heading && heading.getBoundingClientRect().width > 0 && heading.getBoundingClientRect().height > 0 && getComputedStyle(heading).visibility === 'visible';
  })).toBe(true);
});

test('browser CSP blocks injected event handlers', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('main h1')).toBeVisible();
  await recordPolicyViolations(page);
  await page.evaluate(() => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('onclick', 'window.securityHandlerRan = true');
    document.body.appendChild(button);
    button.click();
    button.remove();
  });
  await expect.poll(() => page.evaluate(() => (window as SecurityProbe).securityViolations)).toContain('script-src-attr');
  expect(await page.evaluate(() => (window as SecurityProbe).securityHandlerRan)).toBeUndefined();
  await expect(page.locator('main h1')).toBeVisible();
});

test('malicious query, hash and stored language values stay inert while language controls work', async ({ page }) => {
  const payload = '<img id="security-input-payload" src="/__security-missing-image" onerror="window.securityInputExecuted=true">';
  const appErrors: string[] = [];
  page.on('pageerror', error => appErrors.push(error.message));
  await page.goto('/contact');
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(value => localStorage.setItem('portfolio-lang', value), payload);
  await page.goto(`/electrical?q=${encodeURIComponent(payload)}#${encodeURIComponent(payload)}`);
  expect(new URL(page.url()).searchParams.get('q')).toBe(payload);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('main h1')).toContainText('Mantenimiento eléctrico');
  await expect(page.locator('#security-input-payload')).toHaveCount(0);
  expect(await page.evaluate(() => (window as SecurityProbe).securityInputExecuted)).toBeUndefined();
  await selectLanguage(page, 'en');
  await expect(page.locator('main h1')).toContainText('Electrical');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toContainText('Electrical');
  // Also cover malformed percent encoding at the hash decoding boundary.
  await page.goto(`/electrical?q=${encodeURIComponent(payload)}#%E0%A4%A`);
  await expect(page.locator('main h1')).toContainText('Electrical');
  await expect(page.locator('#security-input-payload')).toHaveCount(0);
  expect(await page.evaluate(() => (window as SecurityProbe).securityInputExecuted)).toBeUndefined();
  expect(appErrors).toEqual([]);
});
