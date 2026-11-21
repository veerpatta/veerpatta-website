import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBudget, normalizeIndianPhone } from '../src/scripts/admissions.ts';
import { site, whatsappUrl, admissionWhatsApp, admissionWhatsAppText } from '../src/data/site.ts';

const blank = { tuition: '', admission: '', books: '', uniform: '', transport: '' };
test('blank budget is a zero-value parent estimate', () => {
  assert.deepEqual(calculateBudget(blank), { valid: true, annualTotal: 0, firstYearTotal: 0 });
});
test('tuition, books, uniform and transport are annual; admission is one-time', () => {
  assert.deepEqual(calculateBudget({ tuition: '10000', admission: '1500', books: '500', uniform: '600', transport: '2000' }), { valid: true, annualTotal: 13100, firstYearTotal: 14600 });
});
test('amounts are added as paise without floating-point drift', () => {
  assert.deepEqual(calculateBudget({ ...blank, tuition: '0.10', books: '0.20' }), { valid: true, annualTotal: 0.3, firstYearTotal: 0.3 });
});
for (const invalid of ['-1', 'NaN', 'Infinity', '1e5', '1,000', 'abc', '12.345', '10000001', '0x10']) {
  test(`rejects invalid budget amount ${invalid}`, () => {
    assert.deepEqual(calculateBudget({ ...blank, tuition: invalid }), { valid: false, invalidFields: ['tuition'] });
  });
}
test('reports every invalid amount rather than a partial total', () => {
  assert.deepEqual(calculateBudget({ ...blank, tuition: '-1', books: 'no' }), { valid: false, invalidFields: ['tuition', 'books'] });
});
for (const phone of ['9413748575', '+91 94137 48575', '91-94137-48575', '09413748575', '(+91) 9413748575']) {
  test(`normalizes valid Indian mobile ${phone}`, () => assert.equal(normalizeIndianPhone(phone), '+919413748575'));
}
for (const phone of ['', '1234567890', '941374857', '+1 9413748575', 'abc9413748575', '9413748575 ext 2', '+91+9413748575', '+9413748575', '+09413748575']) {
  test(`rejects invalid Indian mobile ${phone}`, () => assert.equal(normalizeIndianPhone(phone), null));
}
test('the school WhatsApp is the verified hub number, never the call number', () => {
  assert.equal(site.whatsapp, '+918302207823');
  assert.equal(site.whatsappDisplay, '+91 83022 07823');
  assert.notEqual(site.whatsapp, site.phone);
  assert.equal(site.phone, '+917976199548');
});
for (const lang of ['en', 'hi'] as const) {
  test(`${lang} admission link opens the school chat with the words that start an enquiry`, () => {
    const url = new URL(admissionWhatsApp(lang));
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/918302207823');
    assert.equal(url.searchParams.get('text'), admissionWhatsAppText(lang));
    assert.equal(url.hash, '');
    assert.deepEqual([...url.searchParams.keys()], ['text']);
  });
}
test('admission words are fixed and carry no personal details', () => {
  assert.equal(admissionWhatsAppText('en'), 'Admission enquiry');
  assert.equal(admissionWhatsAppText('hi'), 'प्रवेश पूछताछ');
  assert.doesNotMatch(admissionWhatsAppText('en') + admissionWhatsAppText('hi'), /\d/);
});
test('a plain WhatsApp link carries no message', () => {
  assert.equal(whatsappUrl(), 'https://wa.me/918302207823');
  assert.equal(new URL(whatsappUrl('A & B\nClass 6? #1')).searchParams.get('text'), 'A & B\nClass 6? #1');
});
