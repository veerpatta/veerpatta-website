import {normalizeIndianPhone} from './phone.ts';
export {normalizeIndianPhone} from './phone.ts';
export type BudgetField = 'tuition' | 'admission' | 'books' | 'uniform' | 'transport';
export type BudgetInput = Record<BudgetField, string>;
export type BudgetResult = { valid: true; annualTotal: number; firstYearTotal: number } | { valid: false; invalidFields: BudgetField[] };
export type EnquiryDraft = { guardian: string; phone: string; className: string };
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


export function buildWhatsAppMessage(draft: EnquiryDraft, lang: Language): string {
  const phone = normalizeIndianPhone(draft.phone) ?? draft.phone.trim();
  return lang === 'hi'
    ? `नमस्ते, मुझे वीरपट्टा सीनियर सेकेंडरी स्कूल में प्रवेश की जानकारी चाहिए।\nअभिभावक: ${draft.guardian.trim()}\nकक्षा: ${draft.className}\nमोबाइल: ${phone}\nकृपया शुल्क, उपलब्धता और अगले चरण की जानकारी दें। यह केवल पूछताछ है।`
    : `Hello, I would like admission information for Veerpatta Senior Secondary School.\nParent/guardian: ${draft.guardian.trim()}\nClass: ${draft.className}\nMobile: ${phone}\nPlease share fees, availability and next steps. This is an enquiry only.`;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

function initAdmissions(): void {
  document.querySelectorAll<HTMLFormElement>('[data-admission-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';
    const lang: Language = form.dataset.lang === 'hi' ? 'hi' : 'en';
    const t = (en: string, hi: string) => lang === 'hi' ? hi : en;
    const panels = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-enquiry-step]'));
    const markers = Array.from(form.querySelectorAll<HTMLElement>('[data-step-marker]'));
    const guardian = form.elements.namedItem('guardian') as HTMLInputElement;
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    const classSelect = form.elements.namedItem('class') as HTMLSelectElement;
    const consent = form.elements.namedItem('consent') as HTMLInputElement;
    const status = form.querySelector<HTMLElement>('[data-enquiry-status]')!;
    const review = form.querySelector<HTMLElement>('[data-enquiry-review]')!;
    const send = form.querySelector<HTMLButtonElement>('[data-enquiry-send]')!;
    const whatsapp = form.querySelector<HTMLButtonElement>('[data-enquiry-whatsapp]')!;
    let currentStep = 0;
    let sending = false;
    form.noValidate = true;
    form.querySelectorAll<HTMLElement>('[data-enhanced-only]').forEach((el) => { el.hidden = false; });

    const setStep = (index: number, focus = true) => {
      currentStep = index;
      panels.forEach((panel, i) => { panel.hidden = i !== index; });
      markers.forEach((marker, i) => {
        marker.toggleAttribute('data-current', i === index);
        if (i === index) marker.setAttribute('aria-current', 'step');
        else marker.removeAttribute('aria-current');
      });
      if (focus) panels[index]?.querySelector<HTMLElement>('legend')?.focus();
    };
    const validateDetails = () => {
      guardian.setCustomValidity(guardian.value.trim().length >= 2 ? '' : t('Enter the parent or guardian’s name.', 'अभिभावक का नाम लिखें।'));
      phone.setCustomValidity(normalizeIndianPhone(phone.value) ? '' : t('Enter a valid 10-digit Indian mobile number.', 'भारत का सही 10 अंकों वाला मोबाइल नंबर लिखें।'));
      for (const element of [guardian, phone, classSelect]) {
        if (!element.validity.valid) { setStep(0, false); element.reportValidity(); return false; }
      }
      return true;
    };
    const draft = (): EnquiryDraft => ({ guardian: guardian.value.trim(), phone: phone.value, className: classSelect.options[classSelect.selectedIndex]?.text ?? classSelect.value });
    const refreshReview = () => { review.textContent = buildWhatsAppMessage(draft(), lang); };
    [guardian, phone].forEach((input) => input.addEventListener('input', () => input.setCustomValidity('')));
    form.querySelectorAll<HTMLButtonElement>('[data-enquiry-next]').forEach((button) => button.addEventListener('click', () => {
      if (!validateDetails()) return;
      refreshReview();
      setStep(Math.min(currentStep + 1, 2));
    }));
    form.querySelectorAll<HTMLButtonElement>('[data-enquiry-back]').forEach((button) => button.addEventListener('click', () => setStep(Math.max(0, currentStep - 1))));
    whatsapp.addEventListener('click', () => {
      if (sending || !validateDetails()) return;
      if (!consent.reportValidity()) return;
      // Only this explicit action creates a URL containing the parent's draft.
      window.location.assign(buildWhatsAppUrl(form.dataset.whatsapp ?? '919413748575', buildWhatsAppMessage(draft(), lang)));
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending || !validateDetails()) return;
      if (currentStep < 2) { refreshReview(); setStep(currentStep + 1); return; }
      if (!consent.reportValidity()) return;
      sending = true;
      send.disabled = true;
      whatsapp.disabled = true;
      form.setAttribute('aria-busy', 'true');
      status.textContent = t('Sending your enquiry…', 'आपकी पूछताछ भेजी जा रही है…');
      const payload = new FormData(form);
      payload.set('guardian', guardian.value.trim());
      payload.set('phone', normalizeIndianPhone(phone.value)!);
      // Freeze the submitted draft so a late response cannot erase newer edits.
      panels.forEach((panel) => { panel.disabled = true; });
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 25_000);
      try {
        const response = await fetch(form.action, { method: 'POST', body: payload, signal: controller.signal, headers: { Accept: 'application/json' } });
        const data: unknown = await response.json();
        if (!response.ok || typeof data !== 'object' || data === null || !('ok' in data) || data.ok !== true) throw new Error('Enquiry not confirmed');
        form.reset();
        review.textContent = '';
        setStep(0, false);
        status.textContent = t('Your enquiry was submitted successfully. Admission and visit dates still need confirmation from the school. You can also call the office.', 'आपकी पूछताछ सफलतापूर्वक भेज दी गई है। प्रवेश और विद्यालय भ्रमण की तारीख की पुष्टि विद्यालय से होनी बाकी है। आप कार्यालय में फोन भी कर सकते हैं।');
      } catch {
        status.textContent = t('We could not confirm that your enquiry was received. Your details are still here. Please call the office or use WhatsApp. Check with the office before sending again to avoid a duplicate.', 'आपकी पूछताछ मिलने की पुष्टि नहीं हो सकी। आपका विवरण यहीं है। कृपया कार्यालय में फोन करें या WhatsApp का उपयोग करें। दोबारा भेजने से पहले कार्यालय से जाँच लें।');
      } finally {
        window.clearTimeout(timeout);
        panels.forEach((panel) => { panel.disabled = false; });
        sending = false;
        send.disabled = false;
        whatsapp.disabled = false;
        form.removeAttribute('aria-busy');
        status.focus();
      }
    });
    setStep(0, false);
  });

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
