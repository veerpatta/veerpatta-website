import type { Lang, PageSlug } from './site';

type Bilingual = Record<Lang, string>;
const copy = (en: string, hi: string): Bilingual => ({ en, hi });

export interface PageContent {
  kicker: Bilingual;
  title: Bilingual;
  description: Bilingual;
  image?: string;
  caption?: Bilingual;
}

export const pageContent: Record<PageSlug, PageContent> = {
  about: {
    kicker: copy('Our school', 'हमारा विद्यालय'),
    title: copy('Meet the pupils of Veer Patta', 'वीर पत्ता के विद्यार्थियों से मिलिए'),
    description: copy(
      'Pupils play cricket on the lawn in front of their school in Amet. Opposite Mela Ground, Veer Patta brings together children from Nursery through Class 12 for lessons, exhibitions, sports and house events.',
      'आमेट में विद्यालय भवन के सामने लॉन पर बच्चे क्रिकेट खेलते हैं। मेला ग्राउंड के सामने स्थित वीर पत्ता में नर्सरी से कक्षा 12 तक पढ़ाई होती है। प्रदर्शनी, खेल और सदनों के कार्यक्रमों में भी बच्चे साथ आते हैं।'
    ),
    image: 'school-lawn-cricket',
    caption: copy('Cricket on the school lawn in Amet, March 2026.', 'आमेट में विद्यालय के लॉन पर क्रिकेट, मार्च 2026।'),
  },
  academics: {
    kicker: copy('Learning', 'पढ़ाई'),
    title: copy('Pupils explain what they make', 'बच्चे अपने मॉडल समझाते हैं'),
    description: copy(
      'At the learning exhibition, a pupil shows a visitor how to use a handmade angle wheel. Other pupils use blocks to explain tens and ones and coloured tubes to trace the path of blood between the heart and lungs.',
      'विद्यालय की प्रदर्शनी में एक बच्चा आगंतुक को अपना बनाया कोण-चक्र चलाना सिखाता है। दूसरे प्रोजेक्ट में बच्चों ने ब्लॉक से दहाई-इकाई समझाई और रंगीन नलियों से हृदय और फेफड़ों के बीच खून का रास्ता दिखाया।'
    ),
    image: 'angle-wheel-demonstration',
    caption: copy('A pupil points to the markings as a visitor turns the red pointer.', 'आगंतुक लाल सुई घुमाते हैं और एक विद्यार्थी चक्र की रेखाओं की ओर इशारा करता है।'),
  },
  admissions: {
    kicker: copy('Admissions', 'प्रवेश'),
    title: copy('Enquire about a class', 'कक्षा के बारे में पूछें'),
    description: copy(
      'Choose a class from Nursery to Class 12, ask the office about fees or arrange a school visit in Amet.',
      'नर्सरी से कक्षा 12 तक अपनी कक्षा चुनें। शुल्क की जानकारी और आमेट में विद्यालय देखने का समय कार्यालय से लें।'
    ),
  },
  beyond: {
    kicker: copy('School life', 'विद्यालय जीवन'),
    title: copy('On the field with our pupils', 'विद्यार्थियों के साथ मैदान में'),
    description: copy(
      'Three medallists take their places on the podium at the 2026 Annual Sports Day. The school album also follows pupils into the race lanes, onto the lawn for an inter-house dance and behind an NCC exhibition table.',
      '2026 के वार्षिक खेल दिवस में पदक पहने तीन खिलाड़ी विजय मंच पर खड़े हैं। विद्यालय के एल्बम में दौड़ की लेनों में बच्चे, लॉन पर सदनों का नृत्य और प्रदर्शनी की मेज़ पर एनसीसी कैडेट भी दिखते हैं।'
    ),
    image: 'sports-podium-amet',
    caption: copy('Medallists on the podium at the Annual Sports Day, 2026.', 'वार्षिक खेल दिवस 2026 में विजय मंच पर पदक विजेता।'),
  },
  digital: {
    kicker: copy('Digital campus', 'डिजिटल परिसर'),
    title: copy('Digital learning and parent links', 'डिजिटल पढ़ाई और अभिभावकों के लिए लिंक'),
    description: copy(
      'At the 2023 student-led conference, a pupil used MIT App Inventor at a computer. Families can ask the office how to find class notices, access their parent login or pay school fees.',
      '2023 के विद्यार्थी सम्मेलन में एक बच्चे ने कंप्यूटर पर MIT App Inventor का इस्तेमाल किया। कक्षा की सूचनाएँ, अभिभावक लॉगिन और शुल्क जमा करने का तरीका कार्यालय से जान सकते हैं।'
    ),
    image: 'student-headset-desk',
    caption: copy('Headphones on and a hand on the mouse at the student-led conference, 2023.', '2023 के सम्मेलन में एक विद्यार्थी हेडफ़ोन लगाकर कंप्यूटर पर काम कर रहा है।'),
  },
  contact: {
    kicker: copy('Visit & contact', 'संपर्क और मुलाक़ात'),
    title: copy('Visit us in Amet', 'आमेट में हमसे मिलें'),
    description: copy(
      'Find us opposite Mela Ground. Call the school office to agree on a time to visit, or message us on WhatsApp about admission.',
      'हमारा विद्यालय मेला ग्राउंड के सामने है। आने का समय कार्यालय में फ़ोन करके तय करें। प्रवेश की जानकारी WhatsApp पर भी ले सकते हैं।'
    ),
  },
  faq: {
    kicker: copy('Parent questions', 'अभिभावकों के सवाल'),
    title: copy('Questions families ask', 'अभिभावक अक्सर पूछते हैं'),
    description: copy(
      'Answers about admission, school fees, classes and the things to check before visiting the campus.',
      'प्रवेश, शुल्क, कक्षाओं और विद्यालय आने से पहले ध्यान रखने वाली बातों के जवाब।'
    ),
  },
  privacy: {
    kicker: copy('Privacy', 'गोपनीयता'),
    title: copy('Your information', 'आपकी जानकारी'),
    description: copy(
      'How admission enquiries work on WhatsApp, what stays on your device and how to contact the school about a correction or a photograph.',
      'WhatsApp पर प्रवेश की पूछताछ कैसे होती है, आपके डिवाइस पर क्या रहता है और किसी सुधार या तस्वीर के बारे में विद्यालय से कैसे बात करें।'
    ),
  },
  news: {
    kicker: copy('School news', 'विद्यालय समाचार'),
    title: copy('From the school archive', 'विद्यालय के समाचार संग्रह से'),
    description: copy(
      'The school’s Children’s Day film, early-years track games in Amet and a conference led by pupils. For this term’s notices and dates, contact the school office.',
      'बाल दिवस की फ़िल्म, आमेट में छोटे बच्चों के खेल और विद्यार्थियों के सम्मेलन की झलकियाँ। इस सत्र की सूचनाएँ और तारीख़ें विद्यालय कार्यालय से लें।'
    ),
  },
};

export const schoolStages = [
  {
    id: 'early-years',
    label: copy('Nursery & KG', 'नर्सरी और केजी'),
    title: copy('Starting school', 'विद्यालय के शुरुआती दिन'),
    text: copy(
      'The activity room has low tables and small chairs. On a visit, families can see the room and discuss entry age and the first few days of school.',
      'गतिविधि कक्ष में छोटे बच्चों के लिए नीची मेज़ें और छोटी कुर्सियाँ हैं। परिसर आकर कक्ष देखें और प्रवेश की उम्र व शुरुआती दिनों की दिनचर्या के बारे में पूछें।'
    ),
  },
  {
    id: 'primary',
    label: copy('Classes 1–5', 'कक्षा 1–5'),
    title: copy('Reading, language and numbers', 'भाषा, पढ़ना और गणित'),
    text: copy(
      'Primary pupils work on reading, writing and number sense. In ELGA, children from Classes 1–5 learn English in groups matched to their current level.',
      'प्राथमिक कक्षाओं में पढ़ने, लिखने और संख्याओं की समझ पर काम होता है। ELGA में कक्षा 1–5 के बच्चे अंग्रेज़ी की अपनी मौजूदा समझ के अनुसार समूह में सीखते हैं।'
    ),
  },
  {
    id: 'middle',
    label: copy('Classes 6–8', 'कक्षा 6–8'),
    title: copy('Middle school subjects', 'उच्च प्राथमिक कक्षाओं के विषय'),
    text: copy(
      'Children study a wider range of subjects in middle school. Families can discuss the timetable, languages and practical work with the school.',
      'इन कक्षाओं में पढ़ाई का दायरा बढ़ता है। परिवार विषयों की समय-सारणी, भाषाओं और प्रायोगिक कार्य के बारे में विद्यालय से बात कर सकते हैं।'
    ),
  },
  {
    id: 'secondary',
    label: copy('Classes 9–10', 'कक्षा 9–10'),
    title: copy('The secondary years', 'माध्यमिक कक्षाएँ'),
    text: copy(
      'Pupils work towards the RBSE Class 10 board examination. Ask the school about the subjects and the assessment schedule for the current session.',
      'विद्यार्थी राजस्थान बोर्ड की दसवीं की परीक्षा की तैयारी करते हैं। इस सत्र के विषयों और परीक्षा कार्यक्रम की जानकारी विद्यालय से लें।'
    ),
  },
  {
    id: 'senior-secondary',
    label: copy('Classes 11–12', 'कक्षा 11–12'),
    title: copy('Science, Commerce or Arts', 'विज्ञान, वाणिज्य या कला'),
    text: copy(
      'After Class 10, pupils choose a stream. The office can confirm subject combinations and eligibility before a family makes its Class 11 decision.',
      'दसवीं के बाद विद्यार्थी अपना संकाय चुनते हैं। कक्षा 11 के लिए निर्णय लेने से पहले कार्यालय से विषय-संयोजन और पात्रता की पुष्टि करें।'
    ),
  },
];

export const schoolHouses = [
  { name: copy('Rana Pratap', 'राणा प्रताप'), colour: copy('Red', 'लाल'), key: 'red' },
  { name: copy('Rana Kumbha', 'राणा कुम्भा'), colour: copy('Blue', 'नीला'), key: 'blue' },
  { name: copy('Rana Sanga', 'राणा सांगा'), colour: copy('Yellow', 'पीला'), key: 'yellow' },
  { name: copy('Bappa Rawal', 'बप्पा रावल'), colour: copy('Green', 'हरा'), key: 'green' },
];

export const schoolFaqs = [
  {
    group: 'classes-and-visits',
    q: copy('Which classes and board does the school offer?', 'विद्यालय में कौन-सी कक्षाएँ हैं और बोर्ड कौन-सा है?'),
    a: copy('The school teaches Nursery through Class 12 and follows the Rajasthan Board of Secondary Education (RBSE). Science, Commerce and Arts are available in Classes 11–12.', 'विद्यालय में नर्सरी से कक्षा 12 तक पढ़ाई होती है और यह माध्यमिक शिक्षा बोर्ड, राजस्थान (आरबीएसई) से संबद्ध है। कक्षा 11–12 में विज्ञान, वाणिज्य और कला संकाय उपलब्ध हैं।'),
  },
  {
    group: 'admissions-and-fees',
    q: copy('How do I ask about a class?', 'किसी कक्षा में प्रवेश की जानकारी कैसे लें?'),
    a: copy('Choose a class on the admissions page to open a WhatsApp draft, or call the school office. If you send the message, the chat asks an adult to agree to a call back.', 'प्रवेश पेज पर कक्षा चुनें। WhatsApp में एक संदेश खुलेगा जिसे आप भेज सकते हैं। चैट में किसी वयस्क से फ़ोन पर बात करने की सहमति ली जाती है। आप सीधे कार्यालय में फ़ोन भी कर सकते हैं।'),
  },
  {
    group: 'admissions-and-fees',
    q: copy('Does an enquiry reserve a seat?', 'क्या पूछताछ भेजने से सीट आरक्षित हो जाती है?'),
    a: copy('An enquiry starts a conversation. The school office confirms availability, explains the document requirements and tells you how to complete admission.', 'पूछताछ से बातचीत शुरू होती है। सीट की उपलब्धता, ज़रूरी दस्तावेज़ और प्रवेश की पुष्टि के लिए विद्यालय कार्यालय से बात करें।'),
  },
  {
    group: 'admissions-and-fees',
    q: copy('How do we find out the fees?', 'शुल्क की जानकारी कहाँ मिलेगी?'),
    a: copy('Ask the office for a written fee breakdown for your class. Include books, uniform and transport if you need them. The budget planner can add up the amounts the office gives you.', 'अपनी कक्षा का लिखित शुल्क विवरण कार्यालय से लें। किताबों, वर्दी और ज़रूरत हो तो परिवहन का खर्च भी पूछें। मिली हुई राशियों का जोड़ बजट कैलकुलेटर में निकाल सकते हैं।'),
  },
  {
    group: 'classes-and-visits',
    q: copy('How do I check a transport route?', 'परिवहन के मार्ग की जानकारी कैसे लें?'),
    a: copy('Tell the office your area or village. Ask whether a route currently serves it and confirm the pick-up point, times and charges before making arrangements.', 'कार्यालय को अपने इलाके या गाँव का नाम बताएँ। वहाँ अभी बस आती है या नहीं, चढ़ने का स्थान, समय और शुल्क की पुष्टि कर लें।'),
  },
  {
    group: 'classes-and-visits',
    q: copy('Can our family visit the school?', 'क्या हमारा परिवार विद्यालय देखने आ सकता है?'),
    a: copy('Call the office to agree on a day and time. The school is opposite Mela Ground in Amet. If you need step-free access, ask about the entrance when arranging your visit.', 'विद्यालय आमेट में मेला ग्राउंड के सामने है। आने से पहले कार्यालय में फ़ोन करके दिन और समय तय कर लें। बिना सीढ़ियों वाला रास्ता चाहिए तो फ़ोन पर प्रवेश द्वार के बारे में भी पूछें।'),
  },
  {
    group: 'admissions-and-fees',
    q: copy('Which documents will I need?', 'कौन-से दस्तावेज़ लगेंगे?'),
    a: copy('The list depends on the class and previous school. Ask the office for the current checklist and how to present the documents. Keep identity documents out of the initial WhatsApp enquiry.', 'दस्तावेज़ों की सूची कक्षा और पिछले विद्यालय के अनुसार बदल सकती है। कार्यालय से वर्तमान सूची और दस्तावेज़ देने का तरीका पूछें। पहली WhatsApp पूछताछ में पहचान के दस्तावेज़ न भेजें।'),
  },
  {
    group: 'current-families',
    q: copy('Where do I get a parent login or payment link?', 'अभिभावक लॉगिन या शुल्क भुगतान का लिंक कहाँ मिलेगा?'),
    a: copy('Call the office for the current official link or payment instructions. Keep passwords, one-time passcodes and payment details private.', 'वर्तमान आधिकारिक लिंक या शुल्क जमा करने का तरीका कार्यालय से लें। पासवर्ड, ओटीपी और भुगतान की निजी जानकारी अपने पास रखें।'),
  },
  {
    group: 'classes-and-visits',
    q: copy('How do English groups work in primary school?', 'प्राथमिक कक्षाओं में अंग्रेज़ी के समूह कैसे बनते हैं?'),
    a: copy('In Classes 1–5, ELGA groups children by their current English learning level. Pupils from different classes can learn together in the same English group.', 'कक्षा 1–5 में ELGA के तहत बच्चों के समूह अंग्रेज़ी की उनकी मौजूदा समझ के अनुसार बनते हैं। अलग-अलग कक्षाओं के बच्चे एक ही समूह में अंग्रेज़ी सीख सकते हैं।'),
  },
];
