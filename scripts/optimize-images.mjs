import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, extname } from "path";

const ROOT = "public/images";

// [glob-ish prefix match on relative path, maxWidth]
const RULES = [
  { test: (p) => p.startsWith("gallery/"), maxWidth: 1000 },
  { test: (p) => p.startsWith("home/hero-"), maxWidth: 1400 },
  { test: (p) => p.startsWith("home/seva-"), maxWidth: 700 },
  { test: (p) => p.endsWith("banner.jpg") || p.endsWith("banner.png"), maxWidth: 1400 },
  { test: (p) => p.startsWith("contact/"), maxWidth: 80 },
  { test: (p) => p.startsWith("leadership/"), maxWidth: 400 },
  { test: (p) => p.startsWith("icons/"), maxWidth: 300 },
  {
    test: (p) => p.startsWith("janmashtami/") || p.startsWith("food-for-life/"),
    maxWidth: 700,
  },
  { test: (p) => true, maxWidth: 500 }, // default: menu icons, catering, decorative, logo, qr
];

function maxWidthFor(relPath) {
  const rule = RULES.find((r) => r.test(relPath));
  return rule.maxWidth;
}

function walk(dir, base = "") {
  const entries = readdirSync(dir);
  let files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      files = files.concat(walk(full, rel));
    } else {
      files.push({ full, rel });
    }
  }
  return files;
}

const files = walk(ROOT);
let before = 0;
let after = 0;

for (const { full, rel } of files) {
  const ext = extname(full).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const beforeSize = statSync(full).size;
  before += beforeSize;

  const maxWidth = maxWidthFor(rel);
  const inputBuffer = readFileSync(full);
  const img = sharp(inputBuffer);
  const meta = await img.metadata();

  let pipeline = img;
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth });
  }

  let buffer;
  if (ext === ".png") {
    // No `quality`/`palette` here — those trigger lossy quantization (libimagequant),
    // which shows up as visible dithering/speckling on photographic or gradient PNGs.
    buffer = await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  } else {
    buffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  }

  writeFileSync(full, buffer);
  const afterSize = buffer.length;
  after += afterSize;
  console.log(`${rel}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB`);
}

console.log(`\nTotal: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`);
