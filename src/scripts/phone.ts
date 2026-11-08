export function normalizeIndianPhone(value: string): string | null {
  const clean = value.trim();
  if (!/^[+\d\s()\-]+$/.test(clean)) return null;
  const compact = clean.replace(/[\s()\-]/g, '');
  if (!/^\+?\d+$/.test(compact)) return null;
  if (compact.startsWith('+') && !/^\+91[6-9]\d{9}$/.test(compact)) return null;
  let digits = compact.replace(/^\+/, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}
