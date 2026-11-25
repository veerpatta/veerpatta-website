export interface SchoolPhoto { widths:number[]; w:number; h:number; avif?:boolean; pos?:string; gallery?:string; alt:{en:string;hi:string} }
export const photos:Record<string,SchoolPhoto> = {
  "campus-lawn": {
    "widths": [
      480,
      800,
      1200,
      1600
    ],
    "w": 1600,
    "h": 1200,
    "pos": "center 40%",
    "gallery": "campus",
    "alt": {
      "en": "Students playing on the green lawn in front of the school building",
      "hi": "विद्यालय भवन के सामने हरे-भरे लॉन में खेलते विद्यार्थी"
    }
  },
  "campus-lawn-tall": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 1071,
    "alt": {
      "en": "Students playing on the green lawn in front of the school building",
      "hi": "विद्यालय भवन के सामने हरे-भरे लॉन में खेलते विद्यार्थी"
    }
  },
  "campus-front": {
    "widths": [
      480,
      800,
      1200,
      1600
    ],
    "w": 1600,
    "h": 992,
    "gallery": "campus",
    "alt": {
      "en": "Main entrance of the school with palm trees and the front staircase",
      "hi": "विद्यालय का मुख्य प्रवेश द्वार, ताड़ के पेड़ और सामने की सीढ़ियाँ"
    }
  },
  "campus-evening": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 602,
    "gallery": "campus",
    "alt": {
      "en": "The two-storey school building in the evening light",
      "hi": "शाम की रोशनी में विद्यालय का दो-मंज़िला भवन"
    }
  },
  "assembly-courtyard": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 904,
    "gallery": "campus",
    "alt": {
      "en": "Assembly courtyard under its new blue canopy",
      "hi": "नई नीली छत वाला प्रार्थना-सभा प्रांगण"
    }
  },
  "school-hall": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 921,
    "gallery": "campus",
    "alt": {
      "en": "Reception hall with its patterned stone floor and glass front",
      "hi": "नक्काशीदार पत्थर के फ़र्श और काँच के सामने वाला स्वागत कक्ष"
    }
  },
  "basketball-court": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 560,
    "gallery": "sports",
    "alt": {
      "en": "Basketball court with the school building behind it",
      "hi": "बास्केटबॉल कोर्ट, पीछे विद्यालय भवन"
    }
  },
  "activity-room": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 917,
    "gallery": "academic",
    "alt": {
      "en": "Activity room with low round tables for young learners",
      "hi": "छोटे बच्चों के लिए गोल मेज़ों वाला गतिविधि कक्ष"
    }
  },
  "classroom": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 1034,
    "gallery": "academic",
    "alt": {
      "en": "A bright classroom with neat rows of desks",
      "hi": "डेस्कों की साफ़-सुथरी कतारों वाली रोशन कक्षा"
    }
  },
  "classroom-benches": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 921,
    "gallery": "academic",
    "alt": {
      "en": "Classroom with blue benches and learning charts",
      "hi": "नीली बेंचों और शिक्षण चार्टों वाली कक्षा"
    }
  },
  "science-lab": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 1630,
    "pos": "center 60%",
    "gallery": "academic",
    "alt": {
      "en": "Science laboratory with workbenches and apparatus",
      "hi": "वर्कबेंच और उपकरणों से सुसज्जित विज्ञान प्रयोगशाला"
    }
  },
  "computer-lab": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 900,
    "gallery": "academic",
    "alt": {
      "en": "Computer lab workstations",
      "hi": "कंप्यूटर लैब के वर्कस्टेशन"
    }
  },
  "staff-team": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 796,
    "pos": "center 62%",
    "gallery": "academic",
    "alt": {
      "en": "Our teaching staff",
      "hi": "हमारे शिक्षक"
    }
  },
  "robotics-training": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 602,
    "gallery": "academic",
    "alt": {
      "en": "Teachers training with robotics kits",
      "hi": "रोबोटिक्स किट के साथ प्रशिक्षण लेते शिक्षक"
    }
  },
  "learning-exhibition": {
    "widths": [
      480,
      800,
      1200,
      1600
    ],
    "w": 1600,
    "h": 720,
    "avif": true,
    "gallery": "academic",
    "alt": {
      "en": "Students explaining their models at the learning exhibition",
      "hi": "शिक्षण प्रदर्शनी में अपने मॉडल समझाते विद्यार्थी"
    }
  },
  "function-stage": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 675,
    "gallery": "cultural",
    "alt": {
      "en": "Dance performance on stage at the cultural programme",
      "hi": "सांस्कृतिक कार्यक्रम में मंच पर नृत्य प्रस्तुति"
    }
  },
  "dance-lawn": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 540,
    "gallery": "cultural",
    "alt": {
      "en": "Inter-house dance competition on the school lawn",
      "hi": "विद्यालय के लॉन पर अंतर-सदनीय नृत्य प्रतियोगिता"
    }
  },
  "dance-group": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 450,
    "gallery": "cultural",
    "alt": {
      "en": "Dancers in traditional dress at the inter-house competition",
      "hi": "अंतर-सदनीय प्रतियोगिता में पारंपरिक वेशभूषा में नर्तक"
    }
  },
  "dance-line": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 450,
    "gallery": "cultural",
    "alt": {
      "en": "A house team performs a folk dance",
      "hi": "लोक नृत्य प्रस्तुत करती एक सदन टीम"
    }
  },
  "sports-finish": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 540,
    "gallery": "sports",
    "alt": {
      "en": "A runner breaks the finish tape on Sports Day",
      "hi": "खेल दिवस पर फ़िनिश टेप तोड़ता धावक"
    }
  },
  "sports-drill": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 540,
    "gallery": "sports",
    "alt": {
      "en": "Students in house colours give the PT display on Sports Day",
      "hi": "खेल दिवस पर सदन रंगों में पीटी प्रदर्शन करते विद्यार्थी"
    }
  },
  "sports-sprint": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 540,
    "gallery": "sports",
    "alt": {
      "en": "Girls' sprint on the school ground",
      "hi": "विद्यालय मैदान पर छात्राओं की दौड़"
    }
  },
  "sports-oath": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "sports",
    "alt": {
      "en": "House captains take the sports oath",
      "hi": "खेल शपथ लेते सदन कप्तान"
    }
  },
  "sports-start": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "sports",
    "alt": {
      "en": "Sprinters at the start line, school building behind",
      "hi": "प्रारंभ रेखा पर धावक, पीछे विद्यालय भवन"
    }
  },
  "sack-race": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "sports",
    "alt": {
      "en": "Sack race nearing the finish line",
      "hi": "फ़िनिश लाइन की ओर बढ़ती बोरा दौड़"
    }
  },
  "three-legged-race": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "sports",
    "alt": {
      "en": "Junior three-legged race",
      "hi": "जूनियर तीन-टांग दौड़"
    }
  },
  "musical-chairs": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "sports",
    "alt": {
      "en": "Musical chairs on Sports Day",
      "hi": "खेल दिवस पर म्यूज़िकल चेयर"
    }
  },
  "ncc-cadets": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 540,
    "gallery": "ncc",
    "alt": {
      "en": "NCC cadets of the school unit on Sports Day",
      "hi": "खेल दिवस पर विद्यालय इकाई के एनसीसी कैडेट"
    }
  },
  "ncc-podium": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "ncc",
    "alt": {
      "en": "NCC cadets with junior medal winners and guests",
      "hi": "जूनियर पदक विजेताओं और अतिथियों के साथ एनसीसी कैडेट"
    }
  },
  "prize-podium": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "celebrations",
    "alt": {
      "en": "Medal winners on the podium with guests",
      "hi": "अतिथियों के साथ पोडियम पर पदक विजेता"
    }
  },
  "prize-certificate": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 360,
    "gallery": "celebrations",
    "alt": {
      "en": "A student receives a certificate at the dais",
      "hi": "मंच पर प्रमाण-पत्र प्राप्त करता विद्यार्थी"
    }
  },
  "computer-lab-wide": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 921,
    "gallery": "academic",
    "alt": {
      "en": "Computer lab with rows of desktop workstations",
      "hi": "डेस्कटॉप वर्कस्टेशन की कतारों वाली कंप्यूटर लैब"
    }
  },
  "cricket-nets": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 542,
    "gallery": "sports",
    "alt": {
      "en": "Cricket practice nets beside the school building",
      "hi": "विद्यालय भवन के पास क्रिकेट अभ्यास नेट"
    }
  },
  "volleyball-court": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 516,
    "gallery": "sports",
    "alt": {
      "en": "Volleyball court in front of the senior block",
      "hi": "सीनियर ब्लॉक के सामने वॉलीबॉल कोर्ट"
    }
  },
  "football-lawn": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 600,
    "gallery": "sports",
    "alt": {
      "en": "Football goal on the green lawn",
      "hi": "हरे लॉन पर फ़ुटबॉल गोल"
    }
  },
  "open-air-stage": {
    "widths": [
      480,
      800
    ],
    "w": 800,
    "h": 528,
    "gallery": "campus",
    "alt": {
      "en": "Open-air stage for assemblies and events",
      "hi": "सभा और कार्यक्रमों के लिए खुला मंच"
    }
  },
  "video-sports-day": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 675,
    "alt": {
      "en": "Sports Day: students sprint to the finish line",
      "hi": "खेल दिवस: फ़िनिश लाइन की ओर दौड़ते विद्यार्थी"
    }
  },
  "video-house-dance": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 675,
    "alt": {
      "en": "Inter-house dance competition on the school lawn",
      "hi": "विद्यालय के लॉन पर अंतर-सदनीय नृत्य प्रतियोगिता"
    }
  },
  "video-cultural-stage": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 675,
    "alt": {
      "en": "Independence Day programme: a stage dance",
      "hi": "स्वतंत्रता दिवस कार्यक्रम: मंच पर नृत्य"
    }
  },
  "veranda": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 1600,
    "gallery": "campus",
    "alt": {
      "en": "Long shaded veranda outside the classrooms",
      "hi": "कक्षाओं के बाहर लंबा छायादार बरामदा"
    }
  },
  "veranda-courtyard": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 904,
    "gallery": "campus",
    "alt": {
      "en": "Covered walkway beside the paved courtyard",
      "hi": "पक्के प्रांगण के साथ ढका हुआ गलियारा"
    }
  },
  "paved-courtyard": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 650,
    "gallery": "campus",
    "alt": {
      "en": "The wide paved courtyard between the classroom blocks",
      "hi": "कक्षा भवनों के बीच चौड़ा पक्का प्रांगण"
    }
  },
  "school-office": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 914,
    "gallery": "campus",
    "alt": {
      "en": "The school office",
      "hi": "विद्यालय कार्यालय"
    }
  },
  "arched-stairs": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 1641,
    "gallery": "campus",
    "alt": {
      "en": "Arched staircase in the main building",
      "hi": "मुख्य भवन की मेहराबदार सीढ़ियाँ"
    }
  },
  "lawn-wide": {
    "widths": [
      480,
      800,
      1200,
      1600
    ],
    "w": 1600,
    "h": 1205,
    "gallery": "sports",
    "alt": {
      "en": "The green playing lawn on campus",
      "hi": "परिसर का हरा-भरा खेल का लॉन"
    }
  },
  "building-palm": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 921,
    "gallery": "campus",
    "alt": {
      "en": "Front steps with railings and palm trees",
      "hi": "रेलिंग वाली सामने की सीढ़ियाँ और ताड़ के पेड़"
    }
  },
  "campus-approach": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 630,
    "gallery": "campus",
    "alt": {
      "en": "Stone steps leading up to the main building",
      "hi": "मुख्य भवन तक जाती पत्थर की सीढ़ियाँ"
    }
  },
  "video-campus-tour": {
    "widths": [
      480,
      800,
      1200
    ],
    "w": 1200,
    "h": 675,
    "alt": {
      "en": "Campus film: steps up to the main building",
      "hi": "कैंपस फ़िल्म: मुख्य भवन तक जाती सीढ़ियाँ"
    }
  }
};
photos['exhibition-project'] = {
  widths: [240, 390], w: 390, h: 132, avif: true, gallery: 'academic',
  alt: {"en": "Hands moving coloured shapes on a project at the school exhibition", "hi": "स्कूल की प्रदर्शनी में एक प्रोजेक्ट पर रंगीन आकृतियाँ रखते हुए हाथ"}
};
photos['robotics-kit'] = {
  widths: [320, 480, 608], w: 608, h: 294, avif: true, gallery: 'academic',
  alt: {"en": "Hands, coloured parts and kit trays at a teacher robotics workshop", "hi": "शिक्षकों की रोबोटिक्स कार्यशाला में रंगीन पुर्ज़े, ट्रे और काम करते हाथ"}
};
photos['science-bench'] = {
  widths: [416, 720, 828], w: 828, h: 558, avif: true, gallery: 'academic',
  alt: {"en": "Glassware, stands and equipment on the school science bench", "hi": "स्कूल की विज्ञान प्रयोगशाला की मेज़ पर काँच के उपकरण और स्टैंड"}
};
photos['race-lanes'] = {
  widths: [240, 448], w: 448, h: 162, avif: true, gallery: 'sports',
  alt: {"en": "Pupils' feet beside cones and chalk lines during a team race", "hi": "टीम रेस के दौरान चूने की रेखाओं और कोन के पास विद्यार्थियों के कदम"}
};

export const galleryIds = [
  "learning-exhibition", "early-years-dance", "place-value-blocks", "sprint-start", "campus-front", "seasons-model",
  "dance-lawn", "angles-board", "campus-lawn", "football-goal", "planets-project", "ncc-cadets",
  "greenhouse-model", "early-years-track", "circulatory-model", "sports-finish", "function-stage", "tablet-quiz",
  "three-legged-race", "staff-team", "volleyball-court", "prize-podium", "dance-group", "basketball-court",
  "sports-drill", "ncc-podium", "cricket-nets", "dance-line", "sports-sprint", "prize-certificate",
  "sack-race", "musical-chairs", "sports-oath", "lawn-wide", "science-lab", "computer-lab-wide",
  "robotics-training", "campus-approach", "building-palm", "arched-stairs", "veranda", "veranda-courtyard",
  "assembly-courtyard", "paved-courtyard", "open-air-stage"
];
export interface SchoolVideo {poster:string;duration:string;size:string;caption:{en:string;hi:string}}
export const videos:Record<string,SchoolVideo> = {
  "campus-tour": {
    "poster": "video-campus-tour",
    "duration": "0:45",
    "size": "5.0 MB",
    "caption": {
      "en": "Campus film: entrance, reception, verandas, classrooms, labs and lawns",
      "hi": "कैंपस फ़िल्म: प्रवेश द्वार, स्वागत कक्ष, बरामदे, कक्षाएँ, प्रयोगशालाएँ और लॉन"
    }
  },
  "sports-day": {
    "poster": "video-sports-day",
    "duration": "0:15",
    "size": "3.0 MB",
    "caption": {
      "en": "Sports Day: students sprint to the finish line",
      "hi": "खेल दिवस: फ़िनिश लाइन की ओर दौड़ते विद्यार्थी"
    }
  },
  "house-dance": {
    "poster": "video-house-dance",
    "duration": "0:13",
    "size": "3.0 MB",
    "caption": {
      "en": "Inter-house dance competition on the school lawn",
      "hi": "विद्यालय के लॉन पर अंतर-सदनीय नृत्य प्रतियोगिता"
    }
  },
  "cultural-stage": {
    "poster": "video-cultural-stage",
    "duration": "0:12",
    "size": "2.3 MB",
    "caption": {
      "en": "Independence Day programme: students in costume and a stage dance",
      "hi": "स्वतंत्रता दिवस कार्यक्रम: वेशभूषा में विद्यार्थी और मंच पर नृत्य"
    }
  }
};

photos["video-school-story"] = {widths:[480,800,1200],w:1200,h:675,alt:{en:"The entrance of Veerpatta School, opening frame of the edited campus story",hi:"वीरपट्टा स्कूल का प्रवेश द्वार, संपादित कैंपस कहानी का पहला दृश्य"}};
videos["school-story"] = {poster:"film-dance-poster",duration:"0:24",size:"3.9 MB",caption:{en:"A little glimpse of our world",hi:"हमारी दुनिया की एक छोटी झलक"}};

// Original school photographs. Width, height and orientation reserve space before load.
photos['first-school-room'] = {widths:[384,640,896,1120],w:1120,h:840,alt:{en:'Low round blue tables and small chairs in the school’s activity room.',hi:'स्कूल के गतिविधि कक्ष में गोल नीली मेज़ें और छोटी कुर्सियाँ।'}};

// School photo story, November 2026: real moments from the school's own
// photographs. Crops of newly sourced Drive photos keep pupils' faces out of
// frame; the originals stay in Drive and are never committed.
photos['hero-exhibition-phone'] = {widths:[480,800,1200],w:1200,h:600,avif:true,pos:'50% 30%',alt:{en:'Pupils show their shapes project at the learning exhibition',hi:'शिक्षण प्रदर्शनी में अपना आकृतियों वाला प्रोजेक्ट दिखाते विद्यार्थी'}};
photos['hero-exhibition-panel'] = {widths:[480,840],w:840,h:720,avif:true,alt:{en:'Pupils show their shapes project at the learning exhibition',hi:'शिक्षण प्रदर्शनी में अपना आकृतियों वाला प्रोजेक्ट दिखाते विद्यार्थी'}};
photos['early-years-dance'] = {widths:[480,800,1140],w:1140,h:580,avif:true,pos:'55% 75%',gallery:'cultural',alt:{en:'Young pupils in white dresses dance on the school lawn at the inter-house dance competition',hi:'अंतर-सदनीय नृत्य प्रतियोगिता में स्कूल के लॉन पर सफ़ेद पोशाक में नृत्य करते नन्हे विद्यार्थी'}};
photos['early-years-track'] = {widths:[480,800,1200],w:1200,h:646,avif:true,pos:'60% 45%',gallery:'sports',alt:{en:'Early-years pupils in chalk-marked lanes for track games on Sports Day',hi:'खेल दिवस पर ट्रैक खेलों के लिए चूने की लेनों में खड़े छोटे विद्यार्थी'}};
photos['seasons-model'] = {widths:[480,800,1200],w:1200,h:600,avif:true,gallery:'academic',alt:{en:'A pupils’ model of summer, the rainy season and winter at the school exhibition',hi:'स्कूल प्रदर्शनी में गर्मी, बरसात और सर्दी के मौसम पर विद्यार्थियों का मॉडल'}};
photos['place-value-blocks'] = {widths:[480,800,1200],w:1200,h:750,avif:true,gallery:'academic',alt:{en:'A pupil places blocks on a place-value chart at the school exhibition',hi:'स्कूल प्रदर्शनी में स्थानीय मान चार्ट पर ब्लॉक रखते हुए विद्यार्थी'}};
photos['planets-project'] = {widths:[480,800,1200],w:1200,h:718,avif:true,gallery:'academic',alt:{en:'Painted planets and a solar-system chart made by pupils for the school exhibition',hi:'स्कूल प्रदर्शनी के लिए विद्यार्थियों के बनाए ग्रह और सौरमंडल का चार्ट'}};
photos['angles-board'] = {widths:[480,800,1200],w:1200,h:800,avif:true,gallery:'academic',alt:{en:'Hands measure with an angle wheel on a pupils’ project about types of angles',hi:'कोणों के प्रकार वाले विद्यार्थियों के प्रोजेक्ट पर कोण-चक्र से मापते हाथ'}};
photos['circulatory-model'] = {widths:[480,800,1200],w:1200,h:708,avif:true,gallery:'academic',alt:{en:'A pupils’ model of the heart and lungs, with tubes for the flow of blood',hi:'रक्त प्रवाह दिखाने वाली नलियों के साथ हृदय और फेफड़ों का विद्यार्थियों का मॉडल'}};
photos['greenhouse-model'] = {widths:[480,800,1200],w:1200,h:600,avif:true,pos:'70% 50%',gallery:'academic',alt:{en:'A pupils’ greenhouse model with a small town, trees and a sun at the school exhibition',hi:'स्कूल प्रदर्शनी में छोटे शहर, पेड़ों और सूरज के साथ विद्यार्थियों का ग्रीनहाउस मॉडल'}};
photos['tablet-quiz'] = {widths:[480,800,1200],w:1200,h:750,avif:true,gallery:'academic',alt:{en:'A pupil demonstrates a tablet activity at the school exhibition',hi:'स्कूल प्रदर्शनी में टैबलेट पर एक गतिविधि दिखाता विद्यार्थी'}};
photos['sprint-start'] = {widths:[480,800,1200],w:1200,h:750,avif:true,gallery:'sports',alt:{en:'Runners crouch at the start line in chalk-marked lanes on Sports Day',hi:'खेल दिवस पर चूने से बनी लेनों में स्टार्ट लाइन पर तैयार धावक'}};
photos['football-goal'] = {widths:[480,800,1200],w:1200,h:883,avif:true,pos:'58% 50%',gallery:'sports',alt:{en:'A football goal on the school lawn, with pupils playing beyond it',hi:'स्कूल के लॉन पर फ़ुटबॉल गोल, पीछे खेलते विद्यार्थी'}};
photos['film-dance-poster'] = {widths:[480,800,960],w:960,h:540,avif:true,alt:{en:'Pupils dance on the school lawn in front of the main building, a moment from the school film',hi:'मुख्य भवन के सामने स्कूल के लॉन पर नृत्य करते विद्यार्थी, स्कूल फ़िल्म का एक दृश्य'}};
// 25 Nov 2026: AVIF copies made from the published WebP by
// scripts/add_avif_2026_11.py, only where every width looks the same
// (SSIM >= 0.985) and is at least 12% smaller. The rest stay WebP-only.
for (const id of ['assembly-courtyard','basketball-court','campus-front','computer-lab','computer-lab-wide','function-stage','school-hall','school-office']) photos[id].avif = true;
