import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sources = process.env.SOFTWARE_SOURCE_ROOT ?? "/tmp/culichi-software-projects";
const only = process.argv.find(arg => arg.startsWith("--only="))?.slice(7).split(",");
const shots = [
  ["ronnys-home-desktop", "ronnys-food-truck", "RonnysFoodTruck", "http://127.0.0.1:4300/", "Desktop", "Ronny’s Food Truck · homepage", "Actual desktop interface of Ronny’s Food Truck with its seasonal cover and navigation"],
  ["ronnys-menu-desktop", "ronnys-food-truck", "RonnysFoodTruck", "http://127.0.0.1:4300/#menu", "Desktop", "Ronny’s Food Truck · interactive menu", "Actual food-truck menu with category controls, product selection and prices"],
  ["ronnys-home-mobile", "ronnys-food-truck", "RonnysFoodTruck", "http://127.0.0.1:4300/", "Mobile", "Ronny’s Food Truck · mobile", "Actual mobile layout of Ronny’s Food Truck with its menu and delivery shortcuts"],
  ["culichi-home-desktop", "portfolio", null, "http://127.0.0.1:8080/", "Desktop", "Culichi · homepage", "Actual Culichi portfolio homepage with its introduction and interactive professional areas"],
  ["culichi-areas-desktop", "portfolio", null, "http://127.0.0.1:8080/#areas", "Desktop", "Culichi · professional areas", "Actual portfolio cards presenting six professional areas and their documented skills"],
  ["culichi-home-mobile", "portfolio", null, "http://127.0.0.1:8080/", "Mobile", "Culichi · mobile", "Actual mobile portfolio layout with its introduction, fox and area controls"],
  ["mirror-desktop", "mirror", "Mirror", "http://127.0.0.1:4301/home", "Desktop", "Mirror · demo interface", "Actual Mirror music interface running its repository’s built-in demo data, without a Spotify account"],
  ["calculator-desktop", "calculator", "Calculator-Culichi", "http://127.0.0.1:4302/", "Desktop", "Calculator · arithmetic", "Actual React calculator displaying a calculation performed through its controls"],
  ["todo-desktop", "todo", "Todo-Culichi", "http://127.0.0.1:4303/Todo-Culichi/", "Desktop", "Todo · sample tasks", "Actual task-list application with local sample tasks entered through its interface"],
  ["weather-desktop", "weather", "WeatherApp-Culichi", "http://127.0.0.1:4303/WeatherApp-Culichi/", "Desktop", "WeatherApp · search interface", "Actual weather-search interface in its initial state, without fabricated weather results"],
  ["journey-desktop", "journey", "Journey_blog", "http://127.0.0.1:4303/Journey_blog/", "Desktop", "Journey · HTML practice", "Actual semantic HTML blog exercise from the Journey_blog repository"],
  ["previous-portfolio-desktop", "previous-portfolio", "Portfolio-Culichi", "http://127.0.0.1:4303/Portfolio-Culichi/", "Desktop", "DevCulichi · earlier portfolio", "Actual earlier DevCulichi portfolio with its web-development projects"],
];
const temporary = "/tmp/culichi-interface-captures";
const out = resolve(root, "public/images/software/screenshots");
await mkdir(temporary, { recursive: true });
await mkdir(resolve(out, "thumbnails"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium" });
let manifest = [];
try { manifest = JSON.parse(await readFile(resolve(root, "src/data/softwareCaptureManifest.json"), "utf8")); } catch { /* First capture. */ }
try {
  for (const [id, projectId, repo, url, viewport, title, alt] of shots) {
    if (only && !only.includes(projectId)) continue;
    const mobile = viewport === "Mobile";
    const context = await browser.newContext({ viewport: { width: mobile ? 390 : 1440, height: mobile ? 844 : 960 }, deviceScaleFactor: mobile ? 2 : 1, reducedMotion: "reduce" });
    const page = await context.newPage();
    // Cache the original upstream font assets when the CDN is blocked; never redraw UI.
    if (projectId === "todo") {
      try {
        await readFile("/tmp/culichi-fontawesome-all.min.css");
        await page.route("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", route => route.fulfill({ path: "/tmp/culichi-fontawesome-all.min.css", contentType: "text/css" }));
        await page.route("**/webfonts/fa-solid-900.woff2", route => route.fulfill({ path: "/tmp/culichi-fontawesome-solid.woff2", contentType: "font/woff2", headers: { "access-control-allow-origin": "*" } }));
      } catch { /* Native fallback remains faithful to the source. */ }
    }
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    if (projectId === "portfolio") await page.locator("[data-home-intro-copy]").waitFor();
    if (id === "ronnys-menu-desktop") await page.locator("#menu").evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
    if (id === "culichi-areas-desktop") await page.locator("#areas").evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
    if (projectId === "todo") {
      for (const task of ["Documentar el proyecto", "Revisar la interfaz móvil", "Organizar la próxima práctica"]) { await page.locator("#task-input").fill(task); await page.locator("#add-task-btn").click(); }
      await page.locator('input[type="checkbox"]').first().check();
    }
    if (projectId === "calculator") for (const key of ["2", "3", "Multiply", "7", "Equals"]) await page.getByRole("button", { name: key, exact: true }).click();
    if (projectId === "previous-portfolio") await page.locator("#intro-overlay").waitFor({ state: "detached", timeout: 10000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].filter(image => { const box = image.getBoundingClientRect(); return box.top < innerHeight && box.bottom > 0; }).map(image => image.decode().catch(() => {})));
    });
    await page.screenshot({ path: resolve(temporary, `${id}.png`), animations: "disabled" });
    execFileSync("python", ["-c", "from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.save(sys.argv[2], quality=88, method=6); im.thumbnail((768,768), Image.Resampling.LANCZOS); im.save(sys.argv[3],quality=82,method=6)", resolve(temporary, `${id}.png`), resolve(out, `${id}.webp`), resolve(out, "thumbnails", `${id}.webp`)]);
    const sourceRepo = repo ? `https://github.com/ByCulichi/${repo}` : "https://github.com/hackculichi-cloud/cyber-watchfolio";
    const sourceRef = repo ? execFileSync("git", ["-C", resolve(sources, repo), "rev-parse", "HEAD"], { encoding: "utf8" }).trim() : "codex/software-studio-projects";
    const record = { id, projectId, title, alt, viewport, src: `/images/software/screenshots/${id}.webp`, thumbnail: `/images/software/screenshots/thumbnails/${id}.webp`, width: mobile ? 780 : 1440, height: mobile ? 1688 : 960, route: new URL(url).pathname + new URL(url).hash, sourceRepo, sourceRef, capturedAt: new Date().toISOString().slice(0, 10), capture: "Local repository build" };
    manifest = [...manifest.filter(item => item.id !== id), record];
    await writeFile(resolve(root, "src/data/softwareCaptureManifest.json"), JSON.stringify(manifest, null, 2) + "\n");
    console.log(`${id}: captured actual ${viewport.toLowerCase()} interface`);
    await context.close();
  }
} finally { await browser.close(); }
