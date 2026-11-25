import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { galleryIds, photos, videos } from '../src/data/media.ts';
import { normaliseCategory, countVisiblePhotos, galleryCategories } from '../src/scripts/gallery.ts';

const root = fileURLToPath(new URL('../', import.meta.url));

test('unrecognised or retired categories show the full album', () => {
  for (const input of ['all', 'celebrations', 'bad<script>', null]) {
    assert.equal(normaliseCategory(input), 'all');
  }
});

test('every visible filter has a photograph, and category counts are exact', () => {
  const album = galleryIds.map(id => photos[id].gallery!);
  assert.equal(countVisiblePhotos(album, 'all'), galleryIds.length);
  for (const category of galleryCategories.slice(1)) {
    assert.ok(countVisiblePhotos(album, category) > 0, category);
  }
  assert.equal(countVisiblePhotos(['campus', 'sports', 'sports'], 'sports'), 2);
  assert.equal(countVisiblePhotos(['campus'], 'ncc'), 0);
});

test('public photo files exactly match the reviewed responsive catalogue', () => {
  const expected = Object.entries(photos).flatMap(([id, photo]) => [
    ...photo.widths.map(width => `${id}-${width}.webp`),
    ...(photo.avifWidths ?? []).map(width => `${id}-${width}.avif`),
  ]);
  assert.deepEqual(readdirSync(join(root, '_site/assets/media/photos')).sort(), expected.sort());
  assert.ok(!expected.some(name => /^(ai-|hero-exhibition-|early-years-track-|learning-exhibition-|staff-team-)/.test(name)));
  assert.deepEqual(readdirSync(join(root, '_site/assets/media')).sort(), ['photos', 'videos']);
});

test('public films contain their described bilingual VTT tracks and accurate mobile download sizes', () => {
  const directory = join(root, '_site/assets/media/videos');
  const expected: string[] = [];
  for (const [id, film] of Object.entries(videos)) {
    expected.push(film.file);
    assert.equal(statSync(join(directory, film.file)).size, film.bytes);
    assert.equal(film.scenes[0].start, 0);
    for (const lang of ['en', 'hi'] as const) {
      const filename = `${id}-${lang}.vtt`;
      expected.push(filename);
      const track = readFileSync(join(directory, filename), 'utf8');
      assert.match(track, /^WEBVTT\n/);
      for (const [index, scene] of film.scenes.entries()) {
        const end = film.scenes[index + 1]?.start ?? film.seconds;
        const time = (seconds: number) => new Date(seconds * 1000).toISOString().slice(11, 23);
        assert.ok(end > scene.start);
        assert.ok(track.includes(`${time(scene.start)} --> ${time(end)}\n${scene[lang]}\n`));
      }
    }
  }
  assert.deepEqual(readdirSync(directory).sort(), expected.sort());
});
