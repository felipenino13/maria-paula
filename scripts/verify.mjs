import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
await mkdir("output/verification", { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const errors = [];
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
]) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  const response = await page.goto(
    process.env.TEST_URL || "http://127.0.0.1:3000/",
    { waitUntil: "networkidle" },
  );
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").innerText(), "María Paula");
  assert.equal(await page.locator(".photo").count(), 9);
  const rsvp = new URL(await page.getByRole("link", { name: "Confirmar asistencia" }).getAttribute("href"));
  assert.equal(rsvp.hostname, "wa.me");
  assert.equal(rsvp.pathname, "/573125454520");
  assert.match(rsvp.searchParams.get("text"), /Mi nombre es/);
  assert.match(await page.locator("#celebracion").innerText(), /8:00 p.m./);
  assert.match(await page.locator("#celebracion").innerText(), /Tercer piso/);
  assert.match(await page.locator("#celebracion").innerText(), /parqueadero frente al lugar/);
  assert.match(await page.locator("#asistencia").innerText(), /10 de octubre de 2026/);
  assert.doesNotMatch(await page.locator("main").innerText(), /por confirmar|Pronto estar�/);
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  assert.equal(ogImage, "https://maria-paula-gamma.vercel.app/images/maria-paula-opengraph.png");
  assert.equal(await page.evaluate(async (path) => (await fetch(path)).status, new URL(ogImage).pathname), 200);
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "horizontal overflow",
  );
  await page.screenshot({
    path: `output/verification/${viewport.width}-hero.png`,
  });
  await page.locator("#recuerdos").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: `output/verification/${viewport.width}-memories.png`,
  });
  await page.locator(".photo").first().click();
  assert.ok(await page.locator("dialog").isVisible());
  await page.getByRole("button", { name: "Fotografía siguiente" }).click();
  assert.match(await page.locator(".dialog-controls").innerText(), /2 \/ 9/);
  await page.keyboard.press("Escape");
  assert.ok(!(await page.locator("dialog").isVisible()));
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Guardar la fecha" }).click();
  const download = await downloadPromise;
  const ics = await readFile(await download.path(), "utf8");
  assert.match(ics, /DTSTART:20261018T010000Z/);
  await page.getByRole("button", { name: "Copiar dirección" }).click();
  assert.match(
    await page.evaluate(() => navigator.clipboard.readText()),
    /Cra. 78 # 7D-30/,
  );
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
    );
  assert.deepEqual(broken, []);
  await page.screenshot({
    path: `output/verification/${viewport.width}-full.png`,
    fullPage: true,
  });
  console.log(
    `${viewport.width}px: contenido, galería, cierre con Escape, calendario, portapapeles e imágenes OK`,
  );
  await context.close();
}
await browser.close();
assert.deepEqual(errors, []);
console.log("Sin errores de página ni respuestas HTTP fallidas.");

