import React, { useState } from "react";
import Navbar from "./HomePage Components/Navbar";
import Hero from "./HomePage Components/Hero";
import Card from "./HomePage Components/Card";
import Footer from "./HomePage Components/Footer";
import Stats from "./HomePage Components/Stats";
import Uico from "./HomePage Components/uicomponents";
import Slider from "./HomePage Components/Sliderpg";
import Vision from "./HomePage Components/Vision";
import card1 from "/ai-technology.png";
import card2 from "/law.png";
import card3 from "/data-analysis.png";
import vision from "/vision.png";
import mission from "/mission.png";

// Translation object to hold content for both languages
const translations = {
  en: {
    navbar: {
      title: "LawWise",
      navitem1: "Features",
      navitem2: "About us",
      navitem3: "Contact",
      navitem4: "Pricing",
      navitem5: "Our Team",
      button: "Launch App",
    },
    hero: "Justice Accelerated, Efficiency Elevated",
    description:
      "Our platform revolutionizes legal research and case management for commercial courts with AI-driven tools that automate document parsing, instantly extracting case details, clauses, and precedents from large volumes of text.",
    cards: [
      {
        title: "Legal Data Aggregation",
        info: "Aggregate cases, laws, statutory provisions, judicial rules, and legal precedents from various sources, ensuring accurate legal research.",
      },
      {
        title: "AI-Powered Research",
        info: "Harness the power of AI to automate legal research. Extract relevant information from historic cases and simplify complex legal documents.",
      },
      {
        title: "Predictive Analytics",
        info: "Leverage historical case data and AI to analyze cases, providing trend analysis to assist in understanding case probabilities.",
      },
    ],
    stats: [
      {
        img: "/pending-tasks.png",
        name: "Cases Pending",
        value: "There are 4.7 Million cases pending.",
        percentage: "which is very concerning",
      },
      {
        img: "/judge-chair.png",
        name: "Judges per Population",
        value: "The ratio is about 21 judges per million people",
        percentage: "50%",
      },
      {
        img: "/case-file.png",
        name: "Case Disposal Time",
        value: "Case disposal time takes about 5 to 7 years",
        percentage: "50%",
      },
      {
        img: "/management.png",
        name: "Case Management",
        value: "The Case Management Systems are highly Improper",
        percentage: "50%",
      },
    ],
    vision: {
      title: "Vision",
      info: "To revolutionize the legal industry by empowering commercial courts with advanced AI-driven research tools, that is faster and enhance the efficiency of judicial processes.",
    },
    mission: {
      title: "Mission",
      info: "Powerful AI platform that automates legal research, reduces time for retrieving case laws, statutes, provides accurate information to assist judges and lawyers in resolving commercial disputes.",
    },
    footer: {
      title: "LawWise",
      mail: "help@LawWise.co",
      no: "+12 3456789",
    },
  },
  hi: {
    navbar: {
      title: "लॉवाइज",
      navitem1: "विशेषताएँ",
      navitem2: "हमारे बारे में",
      navitem3: "संपर्क करें",
      navitem4: "मूल्य निर्धारण",
      navitem5: "हमारी टीम",
      button: "ऐप लॉन्च करें",
    },
    hero: "न्याय तेज, कार्यकुशलता उन्नत",
    description:
      "हमारा प्लेटफ़ॉर्म व्यावसायिक अदालतों के लिए एआई-संचालित उपकरणों के साथ कानूनी अनुसंधान और मामले प्रबंधन में क्रांति ला रहा है...",
    cards: [
      {
        title: "कानूनी डेटा एकत्रीकरण",
        info: "मामलों, कानूनों, सांविधिक प्रावधानों, न्यायिक नियमों और कानूनी नजीरों को एकत्रित करें...",
      },
      {
        title: "एआई-संचालित अनुसंधान",
        info: "कानूनी अनुसंधान को स्वचालित करने के लिए एआई की शक्ति का उपयोग करें...",
      },
      {
        title: "भविष्यवाणी विश्लेषण",
        info: "ऐतिहासिक मामले डेटा और एआई का उपयोग करके मामलों का विश्लेषण करें...",
      },
    ],
    stats: [
      {
        name: "लंबित मामले",
        value: "4.7 मिलियन",
        percentage: "जो बहुत चिंताजनक है",
      },
      {
        name: "प्रति मिलियन जनसंख्या पर न्यायाधीश",
        value: "21 न्यायाधीश",
        percentage: "50%",
      },
      { name: "मामला निपटान समय", value: "5 से 7 साल", percentage: "50%" },
      { name: "मामला प्रबंधन प्रणाली", value: "अप्रभावी", percentage: "50%" },
    ],
    vision: {
      title: "दृष्टिकोण",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "मिशन",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "लॉवाइज", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  mr: {
    navbar: {
      title: "लॉवाइज",
      navitem1: "वैशिष्ट्ये",
      navitem2: "आमच्याबद्दल",
      navitem3: "संपर्क",
      navitem4: "किंमत",
      navitem5: "आमची टीम",
      button: "अ‍ॅप लाँच करा",
    },
    hero: "न्याय गतीशील, कार्यक्षमता वाढली",
    description:
      "आमचा प्लॅटफॉर्म व्यावसायिक न्यायालयांसाठी एआय-चालित साधनांसह कायदेशीर संशोधन आणि केस व्यवस्थापनात क्रांती घडवून आणत आहे...",
    cards: [
      {
        title: "कायदेशीर डेटा एकत्रीकरण",
        info: "प्रकरणे, कायदे, वैधानिक तरतुदी, न्यायालयीन नियम आणि कायदेशीर नजीरे एकत्र करा...",
      },
      {
        title: "एआय-चालित संशोधन",
        info: "कायदेशीर संशोधन स्वयंचलित करण्यासाठी एआयचा वापर करा...",
      },
      {
        title: "भविष्यवाणी विश्लेषण",
        info: "ऐतिहासिक प्रकरणांचे डेटा आणि एआयचा वापर करून प्रकरणांचे विश्लेषण करा...",
      },
    ],
    stats: [
      {
        name: "प्रलंबित प्रकरणे",
        value: "4.7 दशलक्ष",
        percentage: "जे खूप चिंताजनक आहे",
      },
      {
        name: "प्रति दशलक्ष लोकसंख्येवरील न्यायाधीश",
        value: "21 न्यायाधीश",
        percentage: "50%",
      },
      { name: "केस निकाली वेळ", value: "5 ते 7 वर्षे", percentage: "50%" },
      { name: "केस व्यवस्थापन प्रणाली", value: "अप्रभावी", percentage: "50%" },
    ],
    vision: {
      title: "दृष्टीकोन",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "मिशन",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "लॉवाइज", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  ur: {
    navbar: {
      title: "لاو وائز",
      navitem1: "خصوصیات",
      navitem2: "ہمارے بارے میں",
      navitem3: "رابطہ",
      navitem4: "قیمت",
      navitem5: "ہماری ٹیم",
      button: "ایپ لانچ کریں",
    },
    hero: "انصاف کی رفتار، کارکردگی میں اضافہ",
    description:
      "ہمارا پلیٹ فارم تجارتی عدالتوں کے لیے AI سے چلنے والے آلات کے ساتھ قانونی تحقیق اور کیس مینجمنٹ میں انقلاب لاتا ہے...",
    cards: [
      {
        title: "قانونی ڈیٹا اکٹھا کرنا",
        info: "کیسوں، قوانین، قانونی دفعات، عدالتی قواعد اور قانونی نظیروں کو جمع کریں...",
      },
      {
        title: "اے آئی سے چلنے والی تحقیق",
        info: "قانونی تحقیق کو خودکار بنانے کے لیے AI کی طاقت کا استعمال کریں...",
      },
      {
        title: "پیش گوئی کا تجزیہ",
        info: "AI اور تاریخی کیس ڈیٹا کا استعمال کرتے ہوئے کیسوں کا تجزیہ کریں...",
      },
    ],
    stats: [
      {
        name: "زیر التواء کیس",
        value: "4.7 ملین",
        percentage: "جو بہت تشویشناک ہے",
      },
      { name: "آبادی کے فی ملین ججز", value: "21 ججز", percentage: "50%" },
      { name: "کیس نمٹانے کا وقت", value: "5 سے 7 سال", percentage: "50%" },
      { name: "کیس مینجمنٹ سسٹمز", value: "غیر مناسب", percentage: "50%" },
    ],
    vision: {
      title: "نظریہ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "مشن",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "لاو وائز", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  ta: {
    navbar: {
      title: "லா வைஸ்",
      navitem1: "அம்சங்கள்",
      navitem2: "எங்களை பற்றி",
      navitem3: "தொடர்பு",
      navitem4: "விலை",
      navitem5: "எங்கள் குழு",
      button: "யாப்பைத் தொடங்குக",
    },
    hero: "நீதி வேகமாகவும், திறனாகவும்",
    description:
      "எங்கள் பிளாட்பாரம் AI-ஆல் இயக்கப்படும் கருவிகளுடன் வணிக நீதிமன்றங்களுக்கு சட்ட ஆராய்ச்சி மற்றும் வழக்கு மேலாண்மையில் புரட்சி கொண்டுவருகிறது...",
    cards: [
      {
        title: "சட்ட தரவுகளை திரட்டுதல்",
        info: "வழக்குகள், சட்டங்கள், சட்டப்பணியாளர்கள், நீதிமன்ற விதிகள் மற்றும் சட்ட முன்னுதாரணங்களை திரட்டுங்கள்...",
      },
      {
        title: "AI ஆல் இயக்கப்படும் ஆராய்ச்சி",
        info: "சட்ட ஆராய்ச்சியை தானியங்கி செய்ய AI-யின் சக்தியைப் பயன்படுத்துங்கள்...",
      },
      {
        title: "முன்கூட்டிய கணிப்பு பகுப்பாய்வு",
        info: "வரலாற்று வழக்கு தரவுகள் மற்றும் AI-ஐப் பயன்படுத்தி வழக்குகளை பகுப்பாய்வு செய்யுங்கள்...",
      },
    ],
    stats: [
      {
        name: "நிலுவையில் உள்ள வழக்குகள்",
        value: "4.7 மில்லியன்",
        percentage: "மிகக் கவலைக்குரியது",
      },
      {
        name: "ஒரு மில்லியன் மக்களுக்கு நீதிபதிகள்",
        value: "21 நீதிபதிகள்",
        percentage: "50%",
      },
      {
        name: "வழக்குகள் தீர்க்கும் நேரம்",
        value: "5 முதல் 7 ஆண்டுகள்",
        percentage: "50%",
      },
      {
        name: "வழக்கு மேலாண்மை அமைப்புகள்",
        value: "பயனற்ற",
        percentage: "50%",
      },
    ],
    vision: {
      title: "தோற்றம்",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "பணி",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "லா வைஸ்", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  bn: {
    navbar: {
      title: "লওওয়াইস",
      navitem1: "বৈশিষ্ট্য",
      navitem2: "আমাদের সম্পর্কে",
      navitem3: "যোগাযোগ",
      navitem4: "মূল্য নির্ধারণ",
      navitem5: "আমাদের দল",
      button: "অ্যাপ চালু করুন",
    },
    hero: "ন্যায়বিচার ত্বরান্বিত, দক্ষতা উন্নত",
    description:
      "আমাদের প্ল্যাটফর্ম বাণিজ্যিক আদালতগুলির জন্য AI চালিত সরঞ্জামগুলির মাধ্যমে আইনি গবেষণা এবং মামলার ব্যবস্থাপনায় বিপ্লব ঘটাচ্ছে...",
    cards: [
      {
        title: "আইনি ডেটা সংগ্রহ",
        info: "মামলা, আইন, সাংবিধানিক বিধান, বিচারিক নিয়ম এবং আইনি নজির একত্রিত করুন...",
      },
      {
        title: "এআই চালিত গবেষণা",
        info: "আইনি গবেষণাকে স্বয়ংক্রিয় করতে AI এর শক্তি ব্যবহার করুন...",
      },
      {
        title: "পূর্বাভাস বিশ্লেষণ",
        info: "ঐতিহাসিক মামলা ডেটা এবং AI ব্যবহার করে মামলা বিশ্লেষণ করুন...",
      },
    ],
    stats: [
      {
        name: "মুলতুবি মামলা",
        value: "4.7 মিলিয়ন",
        percentage: "যা খুবই উদ্বেগজনক",
      },
      {
        name: "প্রতি মিলিয়ন জনসংখ্যার বিচারক",
        value: "21 জন বিচারক",
        percentage: "50%",
      },
      {
        name: "মামলা নিষ্পত্তির সময়",
        value: "5 থেকে 7 বছর",
        percentage: "50%",
      },
      {
        name: "কেস ম্যানেজমেন্ট সিস্টেম",
        value: "অকার্যকর",
        percentage: "50%",
      },
    ],
    vision: {
      title: "দৃষ্টি",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "মিশন",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "লওওয়াইস", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  te: {
    navbar: {
      title: "లా వైజ్",
      navitem1: "అంశాలు",
      navitem2: "మా గురించి",
      navitem3: "సంప్రదించండి",
      navitem4: "ధర",
      navitem5: "మా జట్టు",
      button: "యాప్ ప్రారంభించు",
    },
    hero: "న్యాయం వేగంగా, సామర్థ్యం మెరుగుపడింది",
    description:
      "మా వేదిక AI-చేతితో వాణిజ్య కోర్టులకు న్యాయ పరిశోధన మరియు కేసు నిర్వహణలో విప్లవాత్మక మార్పులు తీసుకువస్తుంది...",
    cards: [
      {
        title: "చట్టపరమైన డేటా సమీకరణ",
        info: "కేసులు, చట్టాలు, చట్టపరమైన షరతులు, న్యాయ నియమాలు మరియు చట్టపరమైన మునుపటి నిర్ణయాలను సమీకరించండి...",
      },
      {
        title: "AI ఆధారిత పరిశోధన",
        info: "న్యాయ పరిశోధనను ఆటోమేటిక్ చేయడానికి AI శక్తిని ఉపయోగించండి...",
      },
      {
        title: "భవిష్యత్ విశ్లేషణలు",
        info: "చరిత్రాత్మక కేసుల డేటా మరియు AI ను ఉపయోగించి కేసులను విశ్లేషించండి...",
      },
    ],
    stats: [
      {
        name: "పెండింగ్లో ఉన్న కేసులు",
        value: "4.7 మిలియన్",
        percentage: "అది చాలా ఆందోళనకరం",
      },
      {
        name: "ప్రతి మిలియన్ జనాభాకు న్యాయమూర్తులు",
        value: "21 న్యాయమూర్తులు",
        percentage: "50%",
      },
      { name: "కేసు నిర్వహణ వ్యవస్థలు", value: "చెడు", percentage: "50%" },
    ],
    vision: {
      title: "దృష్టి",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "మిషన్",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "లా వైజ్", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  gu: {
    navbar: {
      title: "લૉવાઈઝ",
      navitem1: "વિશેષતાઓ",
      navitem2: "અમારા વિશે",
      navitem3: "સંપર્ક",
      navitem4: "કિંમત",
      navitem5: "અમારી ટીમ",
      button: "એપ લૉન્ચ કરો",
    },
    hero: "ન્યાય ઝડપથી, કાર્યક્ષમતા વધારવી",
    description:
      "અમારો પ્લેટફોર્મ એઆઈ-ચાલિત સાધનો સાથે વ્યાપારી કોર્ટ માટે કાનૂની સંશોધન અને કેસ મેનેજમેન્ટમાં ક્રાંતિ લાવે છે...",
    cards: [
      {
        title: "કાનૂની ડેટા એકત્રિત",
        info: "કેસો, કાયદાઓ, કાયદાકીય વિધાન, ન્યાયપાલિકા નિયમો અને કાનૂની પૂર્વતા એકત્ર કરો...",
      },
      {
        title: "AI-ચાલિત સંશોધન",
        info: "કાનૂની સંશોધનને સ્વચાલિત કરવા માટે એઆઈની શક્તિનો ઉપયોગ કરો...",
      },
      {
        title: "પૂર્વાનુમાન વિશ્લેષણ",
        info: "ઇતિહાસ કેસ ડેટા અને AI નો ઉપયોગ કરીને કેસોનું વિશ્લેષણ કરો...",
      },
    ],
    stats: [
      {
        name: "બાકી કેસ",
        value: "4.7 મિલિયન",
        percentage: "જે ખૂબ ચિંતાજનક છે",
      },
      {
        name: "લોકસંખ્યા દીઠ ન્યાયાધીશો",
        value: "21 ન્યાયાધીશો",
        percentage: "50%",
      },
      { name: "કેસની નિકાલ સમય", value: "5 થી 7 વર્ષ", percentage: "50%" },
      {
        name: "કેસ મેનેજમેન્ટ સિસ્ટમ",
        value: "અપ્રભાવશાળી",
        percentage: "50%",
      },
    ],
    vision: {
      title: "દ્રષ્ટિ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "મિશન",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "લૉવાઈઝ", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  kn: {
    navbar: {
      title: "ಲಾ ವೈಸ್",
      navitem1: "ವೈಶಿಷ್ಟ್ಯಗಳು",
      navitem2: "ನಮ್ಮ ಬಗ್ಗೆ",
      navitem3: "ಸಂಪರ್ಕ",
      navitem4: "ಬೆಲೆ",
      navitem5: "ನಮ್ಮ ತಂಡ",
      button: "ಆಪ್ ಪ್ರಾರಂಭಿಸಿ",
    },
    hero: "ನ್ಯಾಯದ ವೇಗ, ದಕ್ಷತೆ ಹೆಚ್ಚಾಗಿ",
    description:
      "ನಮ್ಮ ವೇದಿಕೆ ವಾಣಿಜ್ಯ ಕೋರ್ಟ್‌ಗಳಿಗೆ AI ಚಲಿತ ಸಾಧನಗಳೊಂದಿಗೆ ಕಾನೂನು ಸಂಶೋಧನೆ ಮತ್ತು ಪ್ರಕರಣ ನಿರ್ವಹಣೆಯಲ್ಲಿ ಕ್ರಾಂತಿ ತರುತ್ತಿದೆ...",
    cards: [
      {
        title: "ಕಾನೂನು ಡೇಟಾ ಸಂಗ್ರಹ",
        info: "ಪ್ರಕರಣಗಳು, ಕಾನೂನುಗಳು, ಕಾನೂನು ವಿಧಿಗಳು, ನ್ಯಾಯಾಂಗ ನಿಯಮಗಳು ಮತ್ತು ಕಾನೂನು ಮುನ್ನೋಟಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ...",
      },
      {
        title: "AI-ಚಾಲಿತ ಸಂಶೋಧನೆ",
        info: "ಕಾನೂನು ಸಂಶೋಧನೆ ಸ್ವಯಂಚಾಲಿತ ಮಾಡಲು AI ಶಕ್ತಿಯನ್ನು ಬಳಸಿರಿ...",
      },
      {
        title: "ಭವಿಷ್ಯ ಪೂರಕ ವಿಶ್ಲೇಷಣೆ",
        info: "ಐತಿಹಾಸಿಕ ಪ್ರಕರಣದ ಡೇಟಾ ಮತ್ತು AI ಬಳಸಿ ಪ್ರಕರಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ...",
      },
    ],
    stats: [
      {
        name: "ವಿಚಾರಣೆಯಲ್ಲಿರುವ ಪ್ರಕರಣಗಳು",
        value: "4.7 ಮಿಲಿಯನ್",
        percentage: "ಅದು ತುಂಬಾ ಚಿಂತಾಜನಕವಾಗಿದೆ",
      },
      {
        name: "ಪ್ರತಿ ಮಿಲಿಯನ್ ಜನಸಂಖ್ಯೆಗೆ ನ್ಯಾಯಾಧೀಶರು",
        value: "21 ನ್ಯಾಯಾಧೀಶರು",
        percentage: "50%",
      },
      { name: "ಪ್ರಕರಣ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ", value: "ಅಸಮರ್ಪಕ", percentage: "50%" },
    ],
    vision: {
      title: "ದೃಷ್ಟಿ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "ಮಿಷನ್",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "ಲಾ ವೈಸ್", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  or: {
    navbar: {
      title: "ଲା ଭାଇଜ୍",
      navitem1: "ବିଶେଷତା",
      navitem2: "ଆମ ପରିଚୟ",
      navitem3: "ଯୋଗାଯୋଗ",
      navitem4: "ମୂଲ୍ୟ ନିର୍ଣ୍ଣୟ",
      navitem5: "ଆମର ଟିମ",
      button: "ଆପ୍ ପ୍ରାରମ୍ଭ କରନ୍ତୁ",
    },
    hero: "ନ୍ୟାୟ ତ୍ୱରିତ, କାର୍ଯ୍ୟକୁଶଳତା ଉନ୍ନତ",
    description:
      "ଆମ ପ୍ଲାଟଫର୍ମ AI ଚାଲିତ ସାଧନରେ କାନୁନି ଗବେଷଣା ଏବଂ ବ୍ୟବସାୟିକ ଅଦାଲତମାନଙ୍କ ପାଇଁ କେସ୍ ପ୍ରବନ୍ଧନରେ ପରିବର୍ତ୍ତନ ଆଣୁଛି...",
    cards: [
      {
        title: "କାନୁନି ତଥ୍ୟ ସଂଗ୍ରହ",
        info: "ମାମଲାମାନ, କାନୁନ, ସଂବିଧାନିକ ବ୍ୟବସ୍ଥାମାନ, ନ୍ୟାୟାଳୟ ନିୟମ ଏବଂ କାନୁନି ନଜିରକୁ ଏକାଠି କରନ୍ତୁ...",
      },
      {
        title: "AI ଚାଲିତ ଗବେଷଣା",
        info: "କାନୁନି ଗବେଷଣାକୁ ସ୍ୱୟଂଚାଳିତ କରିବାକୁ AI ଶକ୍ତିର ଉପଯୋଗ କରନ୍ତୁ...",
      },
      {
        title: "ପୂର୍ବାଭାସ ତଥ୍ୟାବଲୋକନ",
        info: "ଇତିହାସିକ ମାମଲା ତଥ୍ୟ ଏବଂ AI ଉପଯୋଗ କରି ମାମଲାମାନଙ୍କୁ ତଥ୍ୟାବଲୋକନ କରନ୍ତୁ...",
      },
    ],
    stats: [
      {
        name: "ବକାୟା ମାମଲା",
        value: "4.7 ମିଲିୟନ",
        percentage: "ଯାହା ଅତ୍ୟନ୍ତ ଚିନ୍ତାଜନକ",
      },
      {
        name: "ଜନସଂଖ୍ୟା ପ୍ରତି ମିଲିୟନରେ ନ୍ୟାୟାଧିଶ",
        value: "21 ନ୍ୟାୟାଧିଶ",
        percentage: "50%",
      },
      {
        name: "ମାମଲାମାନଙ୍କର ନିର୍ଦ୍ଧାରିତ ସମୟ",
        value: "5ରୁ 7 ବର୍ଷ",
        percentage: "50%",
      },
      { name: "କେସ୍ ପ୍ରବନ୍ଧନ ସିଷ୍ଟମ୍", value: "ଅସରକାରି", percentage: "50%" },
    ],
    vision: {
      title: "ଭବିଷ୍ୟତ୍",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "ଉଦ୍ଦେଶ୍ୟ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "ଲା ଭାଇଜ୍", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  ml: {
    navbar: {
      title: "ലാ വൈസ",
      navitem1: "വിശേഷതകൾ",
      navitem2: "ഞങ്ങളേക്കുറിച്ച്",
      navitem3: "ബന്ധപ്പെടുക",
      navitem4: "വില",
      navitem5: "ഞങ്ങളുടെ ടീം",
      button: "ആപ്പ് ലോഞ്ച് ചെയ്യുക",
    },
    hero: "നീതിയും വേഗതയും, ഫലപ്രാപ്തിയും ഉയർത്തുക",
    description:
      "AI ഉപയോഗിച്ചുള്ള ഉപകരണങ്ങളിലൂടെ നിയമപരമായ അന്വേഷണങ്ങളിലും കേസ് മാനേജ്മെന്റിലും വിപ്ലവം സൃഷ്ടിക്കുന്നു...",
    cards: [
      {
        title: "നിയമ ഡാറ്റ സമാഹരണം",
        info: "കേസുകൾ, നിയമങ്ങൾ, നിയമ വ്യവസ്ഥകൾ, കോടതിയുടെ ചട്ടങ്ങൾ എന്നിവയെല്ലാം സമാഹരിക്കുക...",
      },
      {
        title: "AI ഉപയോഗിച്ചുള്ള ഗവേഷണം",
        info: "നിയമപരമായ അന്വേഷണം ഓട്ടോമേറ്റ് ചെയ്യാൻ AI ശക്തി ഉപയോഗിക്കുക...",
      },
      {
        title: "പ്രതീക്ഷാ വിശകലനം",
        info: "ചരിത്രപരമായ കേസ് ഡാറ്റയും AI-യും ഉപയോഗിച്ച് കേസുകളുടെ വിശകലനം ചെയ്യുക...",
      },
    ],
    stats: [
      {
        name: "പെൻഡിംഗ് കേസുകൾ",
        value: "4.7 മില്യൺ",
        percentage: "ഇത് വളരെ ആശങ്കജനകമാണ്",
      },
      {
        name: "ജനസംഖ്യയ്ക്ക് അനുപാതമായി ന്യായാധിപന്മാർ",
        value: "മികച്ച 21",
        percentage: "50%",
      },
      {
        name: "കേസ് മാനേജ്മെന്റ് സിസ്റ്റം",
        value: "തെറ്റായ",
        percentage: "50%",
      },
    ],
    vision: {
      title: "ദൃഷ്ടി",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "മിഷൻ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "ലാ വൈസ", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  pa: {
    navbar: {
      title: "ਲਾਅਵਾਈਜ਼",
      navitem1: "ਫੀਚਰ",
      navitem2: "ਸਾਡੇ ਬਾਰੇ",
      navitem3: "ਸੰਪਰਕ",
      navitem4: "ਕੀਮਤ",
      navitem5: "ਸਾਡੀ ਟੀਮ",
      button: "ਐਪ ਲਾਂਚ ਕਰੋ",
    },
    hero: "ਨਿਆਂ ਤੇਜ਼ੀ ਨਾਲ, ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਵਿਧੀ ਨਾਲ",
    description:
      "ਸਾਡੇ ਪਲੇਟਫਾਰਮ ਨੇ ਵਪਾਰਕ ਅਦਾਲਤਾਂ ਲਈ ਕਾਨੂੰਨੀ ਖੋਜ ਅਤੇ ਕੇਸ ਮੈਨੇਜਮੈਂਟ ਵਿੱਚ AI-ਤਾਕਤ ਵਾਲੇ ਸਾਧਨਾਂ ਨਾਲ ਇਨਕਲਾਬ ਲਿਆਉਣਾ ਹੈ...",
    cards: [
      {
        title: "ਕਾਨੂੰਨੀ ਡਾਟਾ ਸੰਘਰਸ਼",
        info: "ਕੇਸਾਂ, ਕਾਨੂੰਨਾਂ, ਕਾਨੂੰਨੀ ਸ਼ਰਤਾਂ, ਅਦਾਲਤੀ ਨਿਯਮਾਂ ਅਤੇ ਕਾਨੂੰਨੀ ਮੌਜੂਦਗੀ ਨੂੰ ਇਕੱਠਾ ਕਰੋ...",
      },
      {
        title: "AI-ਤਾਕਤ ਵਾਲੀ ਖੋਜ",
        info: "ਕਾਨੂੰਨੀ ਖੋਜ ਨੂੰ ਆਟੋਮੈਟਿਕ ਬਣਾਉਣ ਲਈ AI ਦੀ ਤਾਕਤ ਵਰਤੋ...",
      },
      {
        title: "ਪ੍ਰੀਖਣ ਅੰਕੜੇ",
        info: "ਇਤਿਹਾਸਕ ਕੇਸ ਡਾਟਾ ਅਤੇ AI ਦਾ ਉਪਯੋਗ ਕਰਕੇ ਕੇਸਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ...",
      },
    ],
    stats: [
      {
        name: "ਬਾਕੀ ਕੇਸ",
        value: "4.7 ਮਿਲੀਅਨ",
        percentage: "ਜੋ ਬਹੁਤ ਚਿੰਤਾਜਨਕ ਹੈ",
      },
      { name: "ਹਰ ਲੱਖ ਲੋਕਾਂ 'ਚ ਜੱਜ", value: "21 ਜੱਜ", percentage: "50%" },
      { name: "ਕੇਸ ਨਿਪਟਾਰੇ ਦਾ ਸਮਾਂ", value: "5 ਤੋਂ 7 ਸਾਲ", percentage: "50%" },
      { name: "ਕੇਸ ਮੈਨੇਜਮੈਂਟ ਸਿਸਟਮ", value: "ਗਲਤ", percentage: "50%" },
    ],
    vision: {
      title: "ਵੀਜ਼ਨ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "ਮਿਸ਼ਨ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "ਲਾਅਵਾਈਜ਼", mail: "help@LawWise.co", no: "+12 3456789" },
  },

  as: {
    navbar: {
      title: "লৱৱাইজ",
      navitem1: "বিশেষত্ব",
      navitem2: "আমাৰ সম্পৰ্কে",
      navitem3: "যোগাযোগ",
      navitem4: "মূল্য নিৰ্ধাৰণ",
      navitem5: "আমাৰ দল",
      button: "অ্যাপ মুকলি কৰক",
    },
    hero: "বিচাৰ সাৱধানী আৰু দক্ষতা উন্নীত",
    description:
      "আমাৰ প্লেটফর্ম বাণিজ্যিক আদালতসমূহৰ বাবে কৃত্ৰিম বুদ্ধিমত্তা (AI)-চালিত সঁজুলি লৈ আইনী অনুসন্ধান আৰু মামলা পৰিচালনাৰ ক্ষেত্ৰত পৰিৱর্তন আনিছে...",
    cards: [
      {
        title: "আইনী তথ্য একত্ৰণ",
        info: "মামলা, আইন, আইনী প্ৰয়োজনীয়তা, ন্যায়ালয়ৰ নিয়মসমূহ আৰু আইনী নিৰ্দেশসমূহ একত্ৰিত কৰক...",
      },
      {
        title: "কৃত্ৰিম বুদ্ধিমত্তা (AI)-চালিত অনুসন্ধান",
        info: "আইনী অনুসন্ধান অটোমেট কৰিবলৈ কৃত্ৰিম বুদ্ধিমত্তা (AI)-ৰ শক্তি ব্যৱহাৰ কৰক...",
      },
      {
        title: "ভৱিষ্যতৰ বিশ্লেষণ",
        info: "ঐতিহাসিক মামলা তথ্য আৰু কৃত্ৰিম বুদ্ধিমত্তা (AI) ব্যৱহাৰ কৰি মামলাসমূহৰ বিশ্লেষণ কৰক...",
      },
    ],
    stats: [
      {
        name: "লম্বিত মামলাসমূহ",
        value: "৪.৭ মিলিয়ন",
        percentage: "যি এক ব্যতিব্যস্তা",
      },
      {
        name: "প্রতি মিলিয়ন জনসংখ্যাৰ ন্যায়াধীশ",
        value: "২১ ন্যায়াধীশ",
        percentage: "৫০%",
      },
      { name: "মামলা নিষ্পত্তিৰ সময়", value: "৫-৭ বছৰ", percentage: "৫০%" },
      { name: "মামলা পৰিচালন প্ৰণালী", value: "অব্যৱহাৰ", percentage: "৫০%" },
    ],
    vision: {
      title: "ভৱিষ্যতৰ",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    mission: {
      title: "মিছন",
      info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    footer: { title: "লৱৱাইজ", mail: "help@LawWise.co", no: "+12 3456789" },
  },
};

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
  { value: "ur", label: "Urdu" },
  { value: "ta", label: "Tamil" },
  { value: "bn", label: "Bengali" },
  { value: "te", label: "Telugu" },
  { value: "gu", label: "Gujarati" },
  { value: "kn", label: "Kannada" },
  { value: "or", label: "Odia" },
  { value: "ml", label: "Malayalam" },
  { value: "pa", label: "Punjabi" },
  { value: "as", label: "Assamese" },
  { value: "mai", label: "Maithili" },
  { value: "sat", label: "Santali" },
  { value: "sa", label: "Sanskrit" },
  { value: "ks", label: "Kashmiri" },
];

const HomePage = () => {
  const [language, setLanguage] = useState("en"); // Default language: English

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const t = translations[language]; // Get translation based on current language

  return (
    <div>
      <div className="container relative mx-auto px-5 md:px-10 w-full">
        <select
          onChange={handleChangeLanguage}
          value={language}
          className="p-2 bg-white border border-gray-300 rounded-md"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className=" ">
          <Navbar
            title= "https://png.pngtree.com/png-clipart/20190520/original/pngtree-web-search-vector-icon-png-image_3720264.jpg"
            navitem1="Home"
            navLink1="/"
            navitem2="About"
            navLink2="#"
            navitem3="Services"
            navLink3="#"
            navitem4="Contact"
            navLink4="#"
            navitem5="timepass"
            navLink5="#"
            button="Sign In"
            buttonLink="/btn"
          />
        </div>
        <section className="">
          <div className="absolute w-full  bg-gradient-to-r from-grad1 via-grad1 to-grad1 opacity-50 blur-2xl animate-pulse"></div>
          <Hero />
        </section>
        <section className="py-5  md:px-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 place-items-center mx-auto">
            {t.cards.map((card, index) => (
              <Card
                key={index}
                img={index === 0 ? card1 : index === 1 ? card2 : card3}
                title={card.title}
                info={card.info}
              />
            ))}
          </div>
        </section>
        <section className="md:p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 place-items-center">
            <div className="flex flex-col gap-5 py-6">
              <h1 className="text-center text-3xl  md:text-4xl font-bold font-playfair">
                {t.hero}
              </h1>
              <h3 className="text-center lg:text-2xl md:text-xl text-gray-600 md:px-10">
                {t.description}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mx-6 gap-5 mt-5">
              {t.stats.map((stat, index) => (
                <Stats
                  key={index}
                  img={stat.img}
                  name={stat.name}
                  value={stat.value}
                  percentage={stat.percentage}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="flex flex-col px-3">
          <Slider />
        </div>
        <section className="grid md:grid-cols-2 gap-x-5  mx-auto items-center place-items-center mt-2">
          <div className="">
            <Vision img={vision} title={t.vision.title} info={t.vision.info} />
          </div>
          <div className="">
            <Vision
              img={mission}
              title={t.mission.title}
              info={t.mission.info}
            />
          </div>
        </section>
      </div>
      <footer className="p-10 bg-gradient-to-b mt-10 shadow bg-elebtn">
        <Footer title={t.footer.title} mail={t.footer.mail} no={t.footer.no} />
      </footer>
    </div>
  );
};

export default HomePage;
