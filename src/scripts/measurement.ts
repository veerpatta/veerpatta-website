/** Advertising measurement boundary. Intentionally does not import a vendor SDK or implement a network transport. */
export const enquiryReceivedEvent = 'vpps:enquiry-received';
export const consentStorageKey = 'vpps.measurement.v1';
export type MeasurementConfig = Readonly<{ enabled: boolean; datasetId: string }>;
export const measurementConfig: MeasurementConfig = Object.freeze({enabled: false, datasetId: ''});
export type MeasurementEvent = Readonly<{ datasetId: string; name: 'PageView' | 'Lead'; sourceUrl: string }>;
export type MeasurementTransport = (event: MeasurementEvent) => void;
export const verifiedMetaTransport: MeasurementTransport | null = null;
const ownerOrigin = 'https://vpps.co.in';
// Public, parent-facing marketing routes only. Other pages still offer preference controls.
const allowedSources = new Set(['en','hi'].flatMap(lang=>
 ['', 'admissions/', 'admissions/pre-primary/', 'admissions/class-11/', 'contact/'].map(page=>`/${lang}/${page}`)));
export function measurementSource(origin: string, pathname: string): string | null {
 return origin === ownerOrigin && allowedSources.has(pathname) ? ownerOrigin + pathname : null;
}

export function activeDataset(config: MeasurementConfig, transport: MeasurementTransport | null): string | null {
 return config.enabled === true && /^[1-9][0-9]{9,19}$/.test(config.datasetId) && typeof transport === 'function' ? config.datasetId : null;
}

export const measurementReady = activeDataset(measurementConfig, verifiedMetaTransport) !== null;
export type ConsentState = 'on' | 'off';
const maxConsentAgeMs = 180 * 24 * 60 * 60 * 1000;
export function parseConsent(raw: string | null, now = Date.now()): ConsentState {
 if (!raw?.startsWith('on:') || !/^on:\d{13}$/.test(raw)) return 'off';
 const timestamp = Number(raw.slice(3));
 return timestamp <= now && now - timestamp < maxConsentAgeMs ? 'on' : 'off';
}

export function createMeasurement(config: MeasurementConfig, transport: MeasurementTransport | null, origin: string, pathname: string) {
 const datasetId = activeDataset(config,transport);
 const sourceUrl = measurementSource(origin,pathname);
 let consent: ConsentState = 'off';
 let pageViewAttempted = false;
 const receiptsSeen = new WeakSet<object>();
 const send = (name: MeasurementEvent['name']): void => {
  if (!transport || !datasetId || !sourceUrl) return;
  try { transport(Object.freeze({datasetId,name,sourceUrl})); } catch { /* No background retry; measurement cannot block a form. */ }
 };
 return {
  setConsent(next: ConsentState) {
   consent = next;
   if (consent === 'on' && !pageViewAttempted && datasetId && sourceUrl) {
    pageViewAttempted = true;
    send('PageView');
   }
  },
  recordEnquiry(receipt: object) {
   if (receiptsSeen.has(receipt)) return;
   // Mark even without consent: later consent never retroactively queues a conversion.
   receiptsSeen.add(receipt);
   if (consent === 'on') send('Lead');
  },
 };
}

export function bindMeasurementConsent(root: HTMLElement, config: MeasurementConfig, transport: MeasurementTransport | null): void {
 if (!activeDataset(config,transport) || window.location.origin !== ownerOrigin) return;
 const form = root.querySelector<HTMLFormElement>('[data-measurement-form]');
 const adult = root.querySelector<HTMLInputElement>('[data-measurement-adult]');
 const off = root.querySelector<HTMLButtonElement>('[data-measurement-off]');
 const status = root.querySelector<HTMLElement>('[data-measurement-status]');
 if (!form || !adult || !off || !status) return;
 const boundary = createMeasurement(config,transport,location.origin,location.pathname);
 let revokedHere = false;
 // A blocked/throwing store can keep consent off. There is no permissive fallback.
 const currentChoice = (): ConsentState => {
  if (revokedHere) return 'off';
  try { return parseConsent(localStorage.getItem(consentStorageKey)); } catch { return 'off'; }
 };
 const sync = () => {
  const state = currentChoice();
  boundary.setConsent(state);
  status.textContent = state === 'on' ? root.dataset.statusOn ?? '' : root.dataset.statusOff ?? '';
 };
 root.hidden = false;
 sync();
 form.addEventListener('submit',(event)=>{
  event.preventDefault();
  if (!adult.checked) return;
  try { localStorage.setItem(consentStorageKey,`on:${Date.now()}`); revokedHere = false; } catch { /* No opt-in if preference cannot be written. */ }
  sync();
 });
 off.addEventListener('click',()=>{
  revokedHere = true;
  boundary.setConsent('off');
  adult.checked = false;
  try { localStorage.removeItem(consentStorageKey); } catch { /* Immediately off in this document. */ }
  status.textContent = root.dataset.statusOff ?? '';
 });
 // Apply revocations in other tabs and after bfcache restoration.
 window.addEventListener('storage',event=>{if (event.key === consentStorageKey || event.key === null) sync();});
 window.addEventListener('pageshow',sync);
 document.addEventListener(enquiryReceivedEvent,(event)=>{
  boundary.setConsent(currentChoice());
  boundary.recordEnquiry(event);
 });
}
