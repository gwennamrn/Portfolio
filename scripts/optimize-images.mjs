import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..");
const PUBLIC_DIR = join(ROOT, "public");
const CONTENT_DIR = join(PUBLIC_DIR, "content");

const STATIC_PUBLIC_ALLOWLIST = ["about-photo.png", "about-photo.jpg", "about-photo.jpeg"];

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_WIDTH = 2000;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 60;
const AVIF_EFFORT = 4;

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      if (entry.isFile()) return [full];
      return [];
    }),
  );
  return files.flat();
}

async function collectSources() {
  const sources = [];

  const contentFiles = await walk(CONTENT_DIR);
  for (const file of contentFiles) {
    if (SOURCE_EXTENSIONS.has(extname(file).toLowerCase())) {
      sources.push(file);
    }
  }

  for (const name of STATIC_PUBLIC_ALLOWLIST) {
    const full = join(PUBLIC_DIR, name);
    if (existsSync(full)) sources.push(full);
  }

  return sources;
}

async function isUpToDate(variantPath, sourceMtimeMs) {
  if (!existsSync(variantPath)) return false;
  const variantStat = await stat(variantPath);
  return variantStat.mtimeMs >= sourceMtimeMs;
}

async function generateVariant(source, variantPath, format) {
  await mkdir(dirname(variantPath), { recursive: true });
  const pipeline = sharp(source).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });
  if (format === "webp") {
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(variantPath);
  } else {
    await pipeline.avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT }).toFile(variantPath);
  }
}

function variantPathFor(source, ext) {
  const dir = dirname(source);
  const base = source.slice(dir.length + 1, source.length - extname(source).length);
  return join(dir, `${base}.${ext}`);
}

export async function run() {
  const sources = await collectSources();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const source of sources) {
    const sourceStat = await stat(source);
    const sourceMtimeMs = sourceStat.mtimeMs;

    for (const format of ["webp", "avif"]) {
      const target = variantPathFor(source, format);
      if (await isUpToDate(target, sourceMtimeMs)) {
        skipped++;
        continue;
      }
      try {
        await generateVariant(source, target, format);
        generated++;
      } catch (error) {
        failed++;
        console.error(`[images] échec ${source} → ${format}:`, error.message);
      }
    }
  }

  const summary = `[images] ${generated} variant${generated > 1 ? "s" : ""} généré${generated > 1 ? "s" : ""}, ${skipped} sauté${skipped > 1 ? "s" : ""}`;
  if (failed > 0) {
    console.warn(`${summary}, ${failed} échec${failed > 1 ? "s" : ""}`);
  } else {
    console.log(summary);
  }
  return { generated, skipped, failed };
}

const isCli = import.meta.url === `file://${process.argv[1]}`;
if (isCli) {
  run().catch((error) => {
    console.error("[images] erreur:", error);
    process.exit(1);
  });
}
