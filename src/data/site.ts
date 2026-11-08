export type Lang = 'en' | 'hi';
export type PageSlug = 'about'|'academics'|'admissions'|'beyond'|'digital'|'contact'|'faq'|'privacy'|'news';
export const pick = <T>(lang:Lang,en:T,hi:T):T => lang === 'hi' ? hi : en;
export const pathFor = (lang:Lang,slug=''):string => `/${lang}/${slug ? slug+'/' : ''}`;
export const site = {
  name: 'Veerpatta Senior Secondary School',
  nameHi: 'वीरपट्टा सीनियर सेकेंडरी स्कूल',
  fullName: 'Shri Veer Patta Senior Secondary School',
  phone: '+919413748575', phoneDisplay: '+91 94137 48575',
  whatsapp: 'https://wa.me/919413748575',
  address: 'Opp. Mela Ground, Amet, Rajasthan 313332',
  addressHi: 'मेला ग्राउंड के सामने, आमेट, राजस्थान 313332',
  maps: 'https://maps.google.com/?q=Shri+Veer+Patta+Senior+Secondary+School+Amet+Rajasthan',
  url: 'https://veerpatta-website.raj-39e.workers.dev',
  release: 'parent-first-20261108'
};
export const navigation = (lang:Lang) => [
  {slug:'',label:pick(lang,'Home','होम')},
  {slug:'about',label:pick(lang,'Our school','हमारा स्कूल')},
  {slug:'academics',label:pick(lang,'Learning','शिक्षा')},
  {slug:'beyond',label:pick(lang,'School life','स्कूल जीवन')},
  {slug:'gallery',label:pick(lang,'Gallery','गैलरी')},
  {slug:'contact',label:pick(lang,'Contact','संपर्क')}
];
