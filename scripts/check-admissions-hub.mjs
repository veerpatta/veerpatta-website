/**
 * Exercise the actual school Hub parser and VPPS One consent gate with draft
 * links from the Astro build. The only database is a fresh in-memory PGlite
 * instance containing One's synthetic fixture. Each case rolls back.
 *
 * node --experimental-strip-types scripts/check-admissions-hub.mjs /path/to/hub/src/admissions-words.ts \
 *   /path/to/vppsone /path/to/node_modules/@electric-sql/pglite
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [parserFile, oneDirectory, pglitePackage] = process.argv.slice(2);
if (!parserFile || !oneDirectory || !pglitePackage) {
  throw new Error('Pass the local Hub parser file, VPPS One checkout and PGlite package directory.');
}
const { readAdmissionsMessage, questionIn, admissionsReply } = await import(pathToFileURL(resolve(parserFile)).href);
const { PGlite } = createRequire(import.meta.url)(resolve(pglitePackage));
const expectedClasses = ['Nursery', 'JKG', 'SKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
const hash = value => createHash('sha256').update(value).digest('hex');
const readButton = id => readAdmissionsMessage({ type: 'interactive', interactive: { button_reply: { id } } });

async function linksFor(language) {
  const html = await readFile(new URL(`../_site/${language}/admissions/index.html`, import.meta.url), 'utf8');
  const tags = html.match(/<a\s[^>]*\bdata-admission-class="[^"]+"[^>]*>/g) ?? [];
  const choices = tags.map(tag => {
    const grade = /\sdata-admission-class="([^"]+)"/.exec(tag)[1];
    const url = new URL(/\shref="([^"]+)"/.exec(tag)[1]);
    assert.equal(url.origin + url.pathname, 'https://wa.me/918302207823', grade);
    assert.deepEqual([...url.searchParams.keys()], ['text'], grade);
    assert.equal(url.hash, '', grade);
    return { grade, body: url.searchParams.get('text') };
  });
  assert.deepEqual(choices.map(choice => choice.grade), expectedClasses, `${language} class directory`);
  return choices;
}

const db = new PGlite();
async function checkCase(language, grade, body) {
  const message = { type: 'text', text: { body } };
  const parsed = readAdmissionsMessage(message);
  assert.deepEqual(parsed, { intent: 'start', classLabel: grade, language }, body);
  assert.equal(questionIn(message, parsed), null);

  // A reserved fictional number, scoped to this rolled-back test transaction.
  const from = '+12025550123';
  const sender = hash(`${language}/${grade}`);
  let sequence = 0;
  async function turn(input) {
    const result = await db.query(
      "select vppsone.whatsapp_admissions_turn_v3('pilot', $1, $2, $3, now(), $4, $5, $6) as reply",
      [sender, from, hash(`${sender}/${++sequence}`), input.intent, input.classLabel, input.language],
    );
    return result.rows[0].reply;
  }
  async function state() {
    const result = await db.query(
      'select phase, class_hint, class_interest, consented_at is not null as agreed, enquiry_id is not null as submitted from vppsone.whatsapp_admissions_senders where sender_key = $1',
      [sender],
    );
    return result.rows[0];
  }
  await db.query('begin');
  try {
    await db.query("insert into vppsone.message_test_recipients values ($1, 'Fictional website test')", [from]);
    const consent = await turn(parsed);
    assert.deepEqual(consent, { code: 'consent', language, classLabel: grade, stage: 'open' });
    assert.deepEqual(admissionsReply(consent).buttons.map(button => button.id), ['adm:yes', 'adm:no']);
    assert.equal((await turn(readButton('adm:send'))).code, 'consent');
    assert.deepEqual(await state(), { phase: 'consent', class_hint: grade, class_interest: null, agreed: false, submitted: false });
    assert.equal((await turn(readButton('adm:no'))).code, 'declined');
    assert.deepEqual(await state(), { phase: 'idle', class_hint: null, class_interest: null, agreed: false, submitted: false });

    assert.equal((await turn(parsed)).code, 'consent');
    const confirmation = await turn(readButton('adm:yes'));
    assert.deepEqual(confirmation, { code: 'confirm', language, classLabel: grade, stage: 'open' });
    assert.deepEqual(admissionsReply(confirmation).buttons.map(button => button.id), ['adm:send', 'adm:cancel']);
    const plainYes = readAdmissionsMessage({ type: 'text', text: { body: language === 'hi' ? 'हाँ' : 'Yes' } });
    assert.equal((await turn(plainYes)).code, 'confirm');
    assert.deepEqual(await state(), { phase: 'confirm', class_hint: grade, class_interest: grade, agreed: true, submitted: false });
    const completed = await turn(readButton('adm:send'));
    assert.equal(completed.code, 'received');
    assert.equal(completed.classLabel, grade);
  } finally {
    await db.query('rollback');
  }
}

try {
  await db.exec(await readFile(join(oneDirectory, 'tests/sql/whatsapp-admissions-fixture.sql'), 'utf8'));
  const directory = join(oneDirectory, 'supabase/migrations');
  const migrations = (await readdir(directory)).filter(name => /^\d{14}_whatsapp_admissions_[a-z_]+\.sql$/.test(name)).sort();
  for (const name of migrations) await db.exec(await readFile(join(directory, name), 'utf8'));
  await db.query("update vppsone.whatsapp_admissions_settings set mode = 'pilot', counsellor = 'off'");
  for (const language of ['en', 'hi']) {
    for (const { grade, body } of await linksFor(language)) {
      await checkCase(language, grade, body);
      console.log(`${language} | ${grade} | ${body} | start → consent → confirm → received`);
    }
  }
  console.log('30 rendered drafts passed the Hub parser and consent gate. All fictional cases rolled back.');
} finally {
  await db.close();
}
