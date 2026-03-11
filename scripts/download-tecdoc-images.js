#!/usr/bin/env node
/**
 * Downloads TecDoc part images from fsn1.your-objectstorage.com to public/images/parts/
 * (Remote URLs return 403 when hotlinked.)
 * Usage: node scripts/download-tecdoc-images.js
 */

const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(__dirname, 'tecdoc-raw-data.json');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'parts');
const DELAY_MS = 500;

function sanitizeArticleId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '_');
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!fs.existsSync(RAW_PATH)) {
    console.error('Not found:', RAW_PATH);
    process.exit(1);
  }

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log('Created', OUT_DIR);
  }

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const parts = raw.parts || [];
  const toDownload = parts.filter(
    (p) => p.s3image && String(p.s3image).startsWith('https://fsn1.your-objectstorage.com')
  );
  const total = toDownload.length;
  console.log('Parts with s3image:', total, 'of', parts.length);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < toDownload.length; i++) {
    const part = toDownload[i];
    const articleId = part.articleId ?? part.articleNo ?? `part-${i}`;
    const safeId = sanitizeArticleId(articleId);
    const filePath = path.join(OUT_DIR, `${safeId}.webp`);
    const current = i + 1;

    if (fs.existsSync(filePath)) {
      success++;
      if (current % 50 === 0 || current === total) {
        console.log(`[${current}/${total}] Skipped (exists): ${safeId}.webp`);
      }
      continue;
    }

    try {
      const res = await fetch(part.s3image, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Referer: 'https://apify.com/',
          Accept: 'image/webp,image/apng,image/*,*/*',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buf);
      success++;
      console.log(`[${current}/${total}] Downloaded: ${safeId}.webp`);
    } catch (err) {
      failed++;
      console.log(`[${current}/${total}] FAILED: ${safeId} - ${err.message}`);
    }

    if (i < toDownload.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`Done! Downloaded: ${success}, Failed: ${failed}, Total: ${total}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
