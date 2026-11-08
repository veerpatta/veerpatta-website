import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBudget, normalizeIndianPhone, buildWhatsAppMessage, buildWhatsAppUrl } from '../src/scripts/admissions.ts';

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
test('WhatsApp enquiry explicitly requests information and includes only parent fields', () => {
  const message = buildWhatsAppMessage({ guardian: 'A & B', phone: '9413748575', className: 'Class 6' }, 'en');
  assert.match(message, /A & B/);
  assert.match(message, /Class 6/);
  assert.match(message, /\+919413748575/);
  assert.match(message, /enquiry only/);
  assert.doesNotMatch(message, /admission complete|seat booked|confirmed admission/i);
});
test('Hindi WhatsApp enquiry has Hindi text', () => {
  assert.match(buildWhatsAppMessage({ guardian: 'मीना', phone: '9413748575', className: 'कक्षा 6' }, 'hi'), /केवल पूछताछ/);
});
test('WhatsApp URL safely encodes Hindi, ampersands and newlines', () => {
  const message = 'नमस्ते A & B\nClass 6? #1';
  const url = new URL(buildWhatsAppUrl('919413748575', message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919413748575');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(url.hash, '');
});
