import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const site = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const qr = readFileSync(new URL('../src/components/WhatsAppQr.astro', import.meta.url), 'utf8');

test('the contact page QR opens the same WhatsApp number the site shows', () => {
  const number = /whatsapp:\s*'(\+\d+)'/.exec(site)?.[1];
  assert.ok(number, 'site.whatsapp is set');
  const target = /data-qr-target="([^"]+)"/.exec(qr)?.[1];
  assert.equal(target, `https://wa.me/${number.replace(/\D/g, '')}`);
});
