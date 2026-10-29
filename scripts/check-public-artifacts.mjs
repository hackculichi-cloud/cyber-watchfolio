import { lstatSync, readdirSync } from "node:fs";
import { resolve, relative, basename } from "node:path";

// Check names only: never print the contents of a potentially sensitive file.
const roots = process.argv.slice(2);
if (!roots.length) roots.push("public", "dist");
const rejected = [];
const forbidden = name => /^\.env(?:\.|$)/i.test(name)
  || [".git", ".vercel", ".aws", ".npmrc"].includes(name.toLowerCase())
  || /\.(?:pem|key|p12|pfx|map)$/i.test(name);

function inspect(directory, root) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (forbidden(basename(path)) || entry.isSymbolicLink()) {
      rejected.push(`${root}/${relative(root, path)}`);
    } else if (entry.isDirectory()) inspect(path, root);
  }
}

try {
  for (const root of roots) {
    const absolute = resolve(root);
    if (lstatSync(absolute).isSymbolicLink()) rejected.push(root);
    else inspect(absolute, root);
  }
  if (rejected.length) {
    process.stderr.write(`Unsafe public artifact paths:\n${rejected.join("\n")}\n`);
    process.exitCode = 1;
  } else process.stdout.write("Public artifact paths checked: no private configuration, key files, source maps or symlinks.\n");
} catch (error) {
  process.stderr.write(`Public artifact check could not complete: ${error.code ?? "filesystem error"}. Build the site before checking.\n`);
  process.exitCode = 1;
}
