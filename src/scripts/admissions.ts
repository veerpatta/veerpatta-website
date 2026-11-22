export {normalizeIndianPhone} from './phone.ts';
export type BudgetField = 'tuition' | 'admission' | 'books' | 'uniform' | 'transport';
export type BudgetInput = Record<BudgetField, string>;
export type BudgetResult = { valid: true; annualTotal: number; firstYearTotal: number } | { valid: false; invalidFields: BudgetField[] };
type Language = 'en' | 'hi';
const budgetFields: BudgetField[] = ['tuition', 'admission', 'books', 'uniform', 'transport'];

/** All recurring inputs are annual. Work in integer paise to avoid decimal drift. */
export function calculateBudget(input: BudgetInput): BudgetResult {
  const invalidFields: BudgetField[] = [];
  const paise = {} as Record<BudgetField, number>;
  for (const field of budgetFields) {
    const value = input[field].trim();
    if (value === '') { paise[field] = 0; continue; }
    if (!/^\d+(?:\.\d{1,2})?$/.test(value) || !Number.isFinite(Number(value)) || Number(value) > 10_000_000) {
      invalidFields.push(field);
      continue;
    }
    paise[field] = Math.round(Number(value) * 100);
  }
  if (invalidFields.length) return { valid: false, invalidFields };
  const annual = paise.tuition + paise.books + paise.uniform + paise.transport;
  return { valid: true, annualTotal: annual / 100, firstYearTotal: (annual + paise.admission) / 100 };
}


function initAdmissions(): void {
  document.querySelectorAll<HTMLFormElement>('[data-budget-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';
    const lang: Language = form.dataset.lang === 'hi' ? 'hi' : 'en';
    const t = (en: string, hi: string) => lang === 'hi' ? hi : en;
    const result = form.querySelector<HTMLElement>('[data-budget-result]')!;
    const error = form.querySelector<HTMLElement>('[data-budget-error]')!;
    const print = form.querySelector<HTMLButtonElement>('[data-budget-print]')!;
    const calculate = form.querySelector<HTMLButtonElement>('[data-budget-calculate]')!;
    calculate.hidden = false;
    calculate.addEventListener('click', () => form.requestSubmit());
    const currency = new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = {} as BudgetInput;
      for (const field of budgetFields) values[field] = (form.elements.namedItem(field) as HTMLInputElement).value;
      const budget = calculateBudget(values);
      if (!budget.valid) {
        result.hidden = true;
        print.hidden = true;
        error.textContent = t('Enter non-negative rupee amounts, with up to two decimal places and no commas (maximum ₹1,00,00,000 per field).', 'बिना कॉमा के शून्य या उससे अधिक रुपये लिखें, अधिकतम दो दशमलव तक (प्रत्येक राशि अधिकतम ₹1,00,00,000)।');
        (form.elements.namedItem(budget.invalidFields[0]!) as HTMLInputElement).focus();
        return;
      }
      error.textContent = '';
      result.querySelector<HTMLElement>('[data-budget-annual]')!.textContent = currency.format(budget.annualTotal);
      result.querySelector<HTMLElement>('[data-budget-first]')!.textContent = currency.format(budget.firstYearTotal);
      result.hidden = false;
      print.hidden = false;
      result.focus();
    });
    form.addEventListener('input', () => { result.hidden = true; print.hidden = true; error.textContent = ''; });
    print.addEventListener('click', () => window.print());
  });
}

if (typeof document !== 'undefined') initAdmissions();
