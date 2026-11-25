import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = join(root, 'public/assets');
const catalogue = JSON.parse(readFileSync(join(root, 'src/data/published-media.json'), 'utf8'));
const output = new Map();

function copy(relative) {
  output.set(relative, readFileSync(join(root, 'assets', relative)));
}

for (const file of ['vpps-emblem-144.webp', 'vpps-emblem-48.png', 'vpps-emblem-wait.gif',
                    'school-logo-120.webp', 'school-logo-240.webp', 'school-mark-48.png']) {
  copy('images/' + file);
}
for (const [id, photo] of Object.entries(catalogue.photos)) {
  for (const width of photo.widths) copy(`media/photos/${id}-${width}.webp`);
  for (const width of photo.avifWidths ?? []) copy(`media/photos/${id}-${width}.avif`);
}

function timestamp(seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 23);
}
for (const [id, film] of Object.entries(catalogue.videos)) {
  copy(`media/videos/${film.file}`);
  for (const language of ['en', 'hi']) {
    const cues = film.scenes.map((scene, index) => {
      const end = film.scenes[index + 1]?.start ?? film.seconds;
      return `${timestamp(scene.start)} --> ${timestamp(end)}\n${scene[language]}\n`;
    });
    output.set(`media/videos/${id}-${language}.vtt`, Buffer.from('WEBVTT\n\n' + cues.join('\n')));
  }
}

// Remove retired files even if a previous build staged the entire media archive.
function prune(relative = '') {
  for (const entry of readdirSync(join(target, relative), { withFileTypes: true })) {
    const path = relative ? relative + '/' + entry.name : entry.name;
    if (entry.isDirectory()) {
      if ([...output.keys()].some(file => file.startsWith(path + '/'))) prune(path);
      else rmSync(join(target, path), { recursive: true, force: true });
    } else if (!output.has(path)) {
      rmSync(join(target, path), { force: true });
    }
  }
}

mkdirSync(target, { recursive: true });
prune();
// Write complete files into place. Concurrent preview/build readers see either
// version and repeated builds leave matching files alone.
const temporary = mkdtempSync(join(root, '.media-stage-'));
try {
  for (const [relative, data] of output) {
    const destination = join(target, relative);
    if (existsSync(destination) && readFileSync(destination).equals(data)) continue;
    const draft = join(temporary, 'next');
    writeFileSync(draft, data);
    mkdirSync(dirname(destination), { recursive: true });
    renameSync(draft, destination);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
