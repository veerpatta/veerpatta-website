import type { Lang, PageSlug } from './site';

type Bilingual = Record<Lang, string>;
export type PageContent = { kicker: Bilingual; title: Bilingual; description: Bilingual; image: string };
export const pageContent: Record<PageSlug, PageContent> = {
  about: {
    kicker: { en: 'Rooted in Amet', hi: 'आमेट से जुड़ा विद्यालय' },
    title: { en: 'A place to learn. A place to belong.', hi: 'सीखने की जगह। अपनेपन का अहसास।' },
    description: { en: 'Get to know Veerpatta Senior Secondary School through the spaces, people and everyday moments that make a school.', hi: 'विद्यालय के परिसर, शिक्षकों और रोज़मर्रा के पलों के ज़रिए वीरपट्टा सीनियर सेकेंडरी स्कूल को जानें।' },
    image: 'campus-approach',
  },
  academics: {
    kicker: { en: 'Nursery to Class 12 · RBSE', hi: 'नर्सरी से कक्षा 12 · आरबीएसई' },
    title: { en: 'The next chapter starts with curiosity.', hi: 'जिज्ञासा से शुरू होता है सीखने का सफ़र।' },
    description: { en: 'Explore the school stages, see our learning spaces and discuss the right class or stream with the school.', hi: 'कक्षाओं और पढ़ाई की जगहों को जानें। सही कक्षा या संकाय के लिए विद्यालय से बात करें।' },
    image: 'classroom',
  },
  admissions: {
    kicker: { en: 'For your family’s next step', hi: 'आपके परिवार का अगला कदम' },
    title: { en: 'Start with a conversation.', hi: 'शुरुआत एक बातचीत से करें।' },
    description: { en: 'Ask about a class, understand the costs and arrange a campus visit with the school office. An enquiry is not an admission or a seat reservation.', hi: 'कक्षा और शुल्क की जानकारी लें और विद्यालय कार्यालय से परिसर भ्रमण के लिए बात करें। पूछताछ से प्रवेश या सीट आरक्षित नहीं होती।' },
    image: 'campus-front',
  },
  beyond: {
    kicker: { en: 'Beyond the classroom', hi: 'कक्षा से आगे' },
    title: { en: 'Room to play. A stage to shine.', hi: 'खेलने का मैदान। अभिव्यक्ति का मंच।' },
    description: { en: 'Sport, performance, exhibitions and shared experiences, captured in real moments from our school.', hi: 'खेल, मंच, प्रदर्शनी और साथ बिताए अनुभव, हमारे विद्यालय की असली तस्वीरों में।' },
    image: 'sports-drill',
  },
  digital: {
    kicker: { en: 'A clear path for parents', hi: 'अभिभावकों के लिए सरल जानकारी' },
    title: { en: 'Technology, with a human connection.', hi: 'तकनीक के साथ मानवीय जुड़ाव।' },
    description: { en: 'See our computer learning spaces and find out how to get the right school updates and online access.', hi: 'कंप्यूटर कक्ष देखें और विद्यालय की सही ऑनलाइन जानकारी व सेवाओं तक पहुँचने का तरीका जानें।' },
    image: 'computer-lab-wide',
  },
  contact: {
    kicker: { en: 'Let’s talk', hi: 'आइए, बात करें' },
    title: { en: 'Your questions are welcome.', hi: 'आपके सवालों का स्वागत है।' },
    description: { en: 'Call, message or ask to visit Veerpatta Senior Secondary School in Amet, Rajasthan.', hi: 'आमेट, राजस्थान के वीरपट्टा सीनियर सेकेंडरी स्कूल में फोन करें, संदेश भेजें या मिलने का समय पूछें।' },
    image: 'school-office',
  },
  faq: {
    kicker: { en: 'Useful answers', hi: 'काम की जानकारी' },
    title: { en: 'A little clarity goes a long way.', hi: 'सही जानकारी से आसान होता है फैसला।' },
    description: { en: 'A starting point for your questions about classes, admissions, fees and visiting the school.', hi: 'कक्षाओं, प्रवेश, शुल्क और विद्यालय आने से जुड़े सवालों के शुरुआती जवाब।' },
    image: 'school-hall',
  },
  privacy: {
    kicker: { en: 'Your information', hi: 'आपकी जानकारी' },
    title: { en: 'Privacy, in plain language.', hi: 'आपकी गोपनीयता, सरल शब्दों में।' },
    description: { en: 'What this website asks for, where an enquiry goes and how to raise a privacy concern.', hi: 'यह वेबसाइट क्या जानकारी माँगती है, पूछताछ कहाँ जाती है और गोपनीयता से जुड़ी चिंता कैसे बताएँ।' },
    image: '',
  },
  news: {
    kicker: { en: 'From the school', hi: 'विद्यालय से' },
    title: { en: 'Moments worth remembering.', hi: 'याद रखने लायक पल।' },
    description: { en: 'Stories from the school archive. For current notices and dates, please contact the office.', hi: 'विद्यालय के संग्रह से कुछ कहानियाँ। वर्तमान सूचनाओं और तारीखों के लिए कार्यालय से संपर्क करें।' },
    image: 'sports-oath',
  },
};

export const schoolStages = [
  { label: { en: 'Nursery & KG', hi: 'नर्सरी और केजी' }, title: { en: 'A beginning full of discovery', hi: 'नई खोजों से भरी शुरुआत' }, text: { en: 'A first look at school life. Visit the early-years spaces and talk about age requirements and settling into a new routine.', hi: 'स्कूली जीवन का पहला परिचय। छोटे बच्चों की जगहें देखें और आयु की शर्तों व नई दिनचर्या के बारे में बात करें।' }, image: 'activity-room' },
  { label: { en: 'Classes 1–5', hi: 'कक्षा 1–5' }, title: { en: 'Build the foundations', hi: 'मज़बूत नींव की ओर' }, text: { en: 'Reading, writing and numbers form the foundation. Ask the team about the curriculum, classroom language and daily learning routine.', hi: 'पढ़ना, लिखना और गणित सीखने की नींव हैं। पाठ्यक्रम, पढ़ाई की भाषा और रोज़ की दिनचर्या के बारे में जानकारी लें।' }, image: 'classroom-benches' },
  { label: { en: 'Classes 6–8', hi: 'कक्षा 6–8' }, title: { en: 'Explore more questions', hi: 'और सवाल, और खोज' }, text: { en: 'The middle-school years open up new subjects. Talk with the school about subject learning, practice and classroom expectations.', hi: 'माध्यमिक कक्षाओं की तैयारी में नए विषय जुड़ते हैं। विषयों, अभ्यास और कक्षा की अपेक्षाओं पर विद्यालय से बात करें।' }, image: 'learning-exhibition' },
  { label: { en: 'Classes 9–10', hi: 'कक्षा 9–10' }, title: { en: 'Look ahead with purpose', hi: 'लक्ष्य की ओर अगला कदम' }, text: { en: 'Understand the RBSE secondary stage. Ask about subjects, assessment and the approach to preparing for board examinations.', hi: 'आरबीएसई माध्यमिक स्तर को समझें। विषयों, मूल्यांकन और बोर्ड परीक्षा की तैयारी के बारे में पूछें।' }, image: 'classroom' },
  { label: { en: 'Classes 11–12', hi: 'कक्षा 11–12' }, title: { en: 'Choose your direction', hi: 'अपनी दिशा चुनें' }, text: { en: 'Science, Commerce and Arts. Confirm the current subject combinations, eligibility and availability directly with the school office.', hi: 'विज्ञान, वाणिज्य और कला। वर्तमान विषय-संयोजन, पात्रता और उपलब्धता की पुष्टि विद्यालय कार्यालय से करें।' }, image: 'science-lab' },
];

export const schoolFaqs = [
  { q: { en: 'Which classes and board does the school offer?', hi: 'विद्यालय में कौन-सी कक्षाएँ और बोर्ड हैं?' }, a: { en: 'The school offers Nursery through Class 12 under RBSE. Senior-secondary streams are Science, Commerce and Arts. Ask the office for current subject combinations.', hi: 'विद्यालय में आरबीएसई के अंतर्गत नर्सरी से कक्षा 12 तक पढ़ाई होती है। सीनियर सेकेंडरी स्तर पर विज्ञान, वाणिज्य और कला संकाय हैं। वर्तमान विषय-संयोजन के लिए कार्यालय से पूछें।' } },
  { q: { en: 'How do I enquire about admission?', hi: 'प्रवेश की जानकारी कैसे लें?' }, a: { en: 'Call or WhatsApp the school, or send the enquiry form with a parent or guardian’s name, mobile number and the class you are considering. The office can explain the next steps.', hi: 'विद्यालय में फोन या WhatsApp करें, या अभिभावक का नाम, मोबाइल नंबर और इच्छित कक्षा बताकर पूछताछ फ़ॉर्म भेजें। कार्यालय आगे की प्रक्रिया समझाएगा।' } },
  { q: { en: 'Does submitting an enquiry reserve a seat?', hi: 'क्या पूछताछ भेजने से सीट आरक्षित हो जाती है?' }, a: { en: 'No. An enquiry is a request for information. Availability, eligibility, documents and admission confirmation must be discussed with the school.', hi: 'नहीं। पूछताछ केवल जानकारी का अनुरोध है। उपलब्धता, पात्रता, दस्तावेज़ और प्रवेश की पुष्टि के लिए विद्यालय से बात करनी होगी।' } },
  { q: { en: 'What are the fees?', hi: 'शुल्क कितना है?' }, a: { en: 'Ask the office for a current, written quote for the class you are considering, including any admission, books, uniform and transport charges. The budget planner uses only amounts you enter and is not a school fee quote.', hi: 'इच्छित कक्षा के लिए वर्तमान लिखित शुल्क विवरण माँगें। प्रवेश, किताबों, वर्दी और परिवहन के अलग शुल्क भी पूछें। बजट कैलकुलेटर केवल आपकी लिखी राशियों पर चलता है, यह विद्यालय का शुल्क विवरण नहीं है।' } },
  { q: { en: 'Is transport available for our area?', hi: 'क्या हमारे क्षेत्र में परिवहन उपलब्ध है?' }, a: { en: 'Please confirm your area, pick-up point, timings, charges and current route availability with the office before making plans. A route is not guaranteed by this website.', hi: 'योजना बनाने से पहले अपने क्षेत्र, पिक-अप स्थान, समय, शुल्क और वर्तमान मार्ग की उपलब्धता की पुष्टि कार्यालय से करें। वेबसाइट किसी मार्ग की गारंटी नहीं देती।' } },
  { q: { en: 'Can we visit before deciding?', hi: 'क्या फैसला लेने से पहले विद्यालय देख सकते हैं?' }, a: { en: 'Contact the office to request a campus visit. Wait for the school to confirm a suitable day and time before travelling.', hi: 'परिसर देखने के लिए कार्यालय से समय माँगें। आने से पहले विद्यालय से दिन और समय की पुष्टि कर लें।' } },
  { q: { en: 'Which documents should I prepare?', hi: 'कौन-से दस्तावेज़ तैयार करने होंगे?' }, a: { en: 'Requirements can depend on the class and previous school. Ask the office for the current checklist before collecting documents. Do not send identity documents through the public enquiry form.', hi: 'दस्तावेज़ों की ज़रूरत कक्षा और पिछले विद्यालय पर निर्भर हो सकती है। दस्तावेज़ जुटाने से पहले कार्यालय से वर्तमान सूची लें। सार्वजनिक पूछताछ फ़ॉर्म से पहचान के दस्तावेज़ न भेजें।' } },
  { q: { en: 'Where do I get a parent login or fee-payment link?', hi: 'अभिभावक लॉगिन या शुल्क भुगतान का लिंक कहाँ मिलेगा?' }, a: { en: 'Ask the school office for the current official link and access instructions. Never share a password, OTP or payment details through this website’s enquiry form.', hi: 'वर्तमान आधिकारिक लिंक और उपयोग की जानकारी विद्यालय कार्यालय से लें। वेबसाइट के पूछताछ फ़ॉर्म में पासवर्ड, ओटीपी या भुगतान विवरण कभी न लिखें।' } },
];
