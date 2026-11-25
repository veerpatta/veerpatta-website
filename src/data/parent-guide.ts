import { pick, pathFor, type Lang } from './site';
// Public reference answers only. No prompts, remote model, logs or persistent state.
export function guideAnswers(lang: Lang) {
  const t = (en: string, hi: string) => pick(lang, en, hi);
  return [
    { q: t('Where should we start for a young child?', 'छोटे बच्चे के लिए शुरुआत कहाँ से करें?'), a: t('Start with Nursery or KG. The office can help decide the appropriate class and explain age eligibility.', 'नर्सरी या केजी की जानकारी से शुरू करें। बच्चे की उम्र के अनुसार उपयुक्त कक्षा और पात्रता कार्यालय से पूछें।'), label:t('See the early-years guide','नर्सरी और केजी की जानकारी'), url:pathFor(lang,'admissions/pre-primary') },
    { q: t('What are the current fees?', 'अभी की फ़ीस कितनी है?'), a: t('Fees depend on the class. Ask the office for tuition and any separate costs for books, uniform or transport. You can request a written fee breakdown.', 'फ़ीस कक्षा के अनुसार जानें। पढ़ाई के साथ किताबों, वर्दी और परिवहन के अलग खर्च भी कार्यालय से पूछें। कार्यालय से फ़ीस का लिखित विवरण माँग सकते हैं।'), label:t('Contact the office','कार्यालय से संपर्क करें'), url:pathFor(lang,'contact') },
    { q: t('How do we visit the campus?', 'हम स्कूल कब और कहाँ देख सकते हैं?'), a: t('Find the school opposite Mela Ground in Amet. Call before travelling so the office can confirm a suitable time.', 'स्कूल आमेट में मेला ग्राउंड के सामने है। निकलने से पहले फोन करके आने का समय पक्का कर लें।'), label:t('Directions and visit details','रास्ता और आने की जानकारी'), url:pathFor(lang,'contact')+'#visit' },
    { q: t('What can we choose in Class 11?', 'कक्षा 11 में कौन-से संकाय हैं?'), a: t('Science, Commerce and Arts are the school’s streams. Ask the office to confirm individual subjects, eligibility and availability.', 'विज्ञान, वाणिज्य और कला स्कूल के संकाय हैं। विषय-संयोजन, पात्रता और उपलब्धता कार्यालय से पक्की करें।'), label:t('Class 11 guide','कक्षा 11 की जानकारी'), url:pathFor(lang,'admissions/class-11') },
  ];
}
