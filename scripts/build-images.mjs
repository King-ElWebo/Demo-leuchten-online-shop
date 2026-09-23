import { createHash } from 'node:crypto';
import {
  access,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const mediaRoot = path.resolve(root, 'public/media');
const generatedRoot = path.resolve(mediaRoot, 'responsive');
const marker = path.join(generatedRoot, '.generated-by-build-images');
const widths = JSON.parse(
  await readFile(path.resolve(root, 'src/lib/image-widths.json'), 'utf8'),
);
const webpOptions = { quality: 78, effort: 4 };
const rasterExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function listSources(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (directory === mediaRoot && entry.name === 'responsive') continue;
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listSources(filePath)));
    else if (
      entry.isFile() &&
      rasterExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(filePath);
    }
  }
  return files;
}

if (
  !Array.isArray(widths) ||
  widths.some((width) => !Number.isInteger(width) || width <= 0)
) {
  throw new Error(
    'src/lib/image-widths.json must contain positive integer widths.',
  );
}

const sources = (await listSources(mediaRoot)).sort();
const signature = createHash('sha256');
signature.update(
  JSON.stringify({ widths, webpOptions, sharp: sharp.versions.sharp }),
);
for (const source of sources) {
  signature.update(path.relative(mediaRoot, source));
  signature.update(await readFile(source));
}
const currentSignature = signature.digest('hex');

try {
  await stat(generatedRoot);
  await stat(marker).catch(() => {
    throw new Error(
      'Refusing to replace public/media/responsive without its generator marker.',
    );
  });
  if (generatedRoot !== path.join(mediaRoot, 'responsive')) {
    throw new Error('Generated image path escaped public/media.');
  }
  const previousSignature = (await readFile(marker, 'utf8')).trim();
  const expectedFiles = sources.flatMap((source) =>
    widths.map((width) =>
      path.join(
        generatedRoot,
        path.relative(mediaRoot, source),
        `${width}.webp`,
      ),
    ),
  );
  const allFilesExist = (
    await Promise.all(
      expectedFiles.map((file) =>
        access(file).then(
          () => true,
          () => false,
        ),
      ),
    )
  ).every(Boolean);
  if (previousSignature === currentSignature && allFilesExist) {
    console.log(
      `Responsive images are current: ${expectedFiles.length} variants from ${sources.length} sources.`,
    );
    process.exit(0);
  }
  await rm(generatedRoot, { recursive: true, force: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await mkdir(generatedRoot, { recursive: true });
await writeFile(marker, `${currentSignature}\n`);

for (const source of sources) {
  const relativeSource = path.relative(mediaRoot, source);
  const outputDirectory = path.join(generatedRoot, relativeSource);
  await mkdir(outputDirectory, { recursive: true });
  for (const width of widths) {
    await sharp(source)
      .rotate()
      .resize({ width })
      .webp(webpOptions)
      .toFile(path.join(outputDirectory, `${width}.webp`));
  }
  console.log(
    `Responsive images: ${relativeSource} → ${widths.length} WebP widths`,
  );
}
console.log(
  `Generated ${sources.length * widths.length} variants from ${sources.length} sources.`,
);
