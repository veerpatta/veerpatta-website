export type Lang = 'en' | 'hi';
export type PageSlug = 'about'|'academics'|'admissions'|'beyond'|'digital'|'contact'|'faq'|'privacy'|'news';
export const pick = <T>(lang:Lang,en:T,hi:T):T => lang === 'hi' ? hi : en;
export const pathFor = (lang:Lang,slug=''):string => `/${lang}/${slug ? slug+'/' : ''}`;
export const site = {
  name: 'Veer Patta Senior Secondary School',
  nameHi: 'वीर पट्टा सीनियर सेकेंडरी स्कूल',
  fullName: 'Shri Veer Patta Senior Secondary School',
  phone: '+917976199548', phoneDisplay: '+91 79761 99548',
  // The school's WhatsApp number, verified 21 Nov 2026: messages to it reach the school's WhatsApp service, which takes an
  // admission enquiry inside the chat and puts it on the office's Admissions board. Never infer it from the phone.
  whatsapp: '+918302207823', whatsappDisplay: '+91 83022 07823',
  address: 'Opp. Mela Ground, Amet, Rajasthan 313332',
  addressHi: 'मेला ग्राउंड के सामने, आमेट, राजस्थान 313332',
  maps: 'https://maps.google.com/?q=Shri+Veer+Patta+Senior+Secondary+School+Amet+Rajasthan',
  url: 'https://vpps.co.in',
  release: 'amet-school-journeys-20261125'
};
/** A wa.me link to the school's WhatsApp. `message` is typed into the chat for the parent; nothing is sent until they send it. */
export const whatsappUrl = (message = ''): string =>
  `https://wa.me/${site.whatsapp.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
/** The words the school's WhatsApp reads as "start an admission enquiry", in the page's language. */
export const admissionWhatsAppText = (lang: Lang): string => pick(lang, 'Admission enquiry', 'प्रवेश पूछताछ');
export const admissionWhatsApp = (lang: Lang, classLabel?: string): string => {
  const opening = admissionWhatsAppText(lang);
  return whatsappUrl(classLabel ? opening + ' · ' + classLabel : opening);
};
export const navigation = (lang:Lang) => [
  {slug:'',label:pick(lang,'Home','होम')},
  {slug:'about',label:pick(lang,'Our school','हमारा स्कूल')},
  {slug:'academics',label:pick(lang,'Learning','शिक्षा')},
  {slug:'beyond',label:pick(lang,'School life','स्कूल जीवन')},
  {slug:'gallery',label:pick(lang,'Photos & films','तस्वीरें और फ़िल्में')},
  {slug:'contact',label:pick(lang,'Visit & contact','मुलाक़ात और संपर्क')}
];
