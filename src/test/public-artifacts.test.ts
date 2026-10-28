/// <reference types="node" />
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, expect, it } from "vitest";

const directories: string[] = [];
const fixture = () => {
  const directory = mkdtempSync(resolve(tmpdir(), "portfolio-public-check-"));
  directories.push(directory);
  return directory;
};
const checker = resolve("scripts/check-public-artifacts.mjs");
afterEach(() => directories.splice(0).forEach(directory => rmSync(directory, { recursive: true, force: true })));

it("allows ordinary nested website assets", () => {
  const directory = fixture();
  mkdirSync(resolve(directory, "assets"));
  writeFileSync(resolve(directory, "assets/index.js"), "console.log('public app')");
  writeFileSync(resolve(directory, "index.html"), "<title>Public page</title>");
  expect(execFileSync(process.execPath, [checker, directory], { encoding: "utf8" })).toContain("paths checked");
});

it("rejects accidentally published private configuration, keys and source maps without printing contents", () => {
  const directory = fixture();
  for (const name of [".env.production", "private.pem", "bundle.js.map"]) writeFileSync(resolve(directory, name), "PRIVATE_TEST_CONTENT");
  const result = spawnSync(process.execPath, [checker, directory], { encoding: "utf8" });
  expect(result.status).toBe(1);
  for (const name of [".env.production", "private.pem", "bundle.js.map"]) expect(result.stderr).toContain(name);
  expect(result.stderr).not.toContain("PRIVATE_TEST_CONTENT");
});

it.skipIf(process.platform === "win32")("rejects symbolic links both inside an artifact tree and at its root", () => {
  const directory = fixture();
  const target = fixture();
  const link = resolve(directory, "linked-assets");
  symlinkSync(target, link, "dir");
  for (const root of [directory, link]) {
    const result = spawnSync(process.execPath, [checker, root], { encoding: "utf8" });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("linked-assets");
  }
});
