"use client";

import { useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const translations: Translations = {
  // Navigation & Common
  "Home": {
    en: "Home",
    bn: "হোম"
  },
  "Disease Detection": {
    en: "Disease Detection",
    bn: "রোগ সনাক্তকরণ"
  },
  "Crop Suggestions": {
    en: "Crop Suggestions",
    bn: "ফসল পরামর্শ"
  },
  "AI Assistant": {
    en: "AI Assistant",
    bn: "এআই সহকারী"
  },
  "Login": {
    en: "Login",
    bn: "লগইন"
  },
  "Register": {
    en: "Register",
    bn: "রেজিস্টার"
  },
  "Back": {
    en: "Back",
    bn: "পিছনে"
  },

  // Footer Sections
  "QuickLinks": {
    en: "Quick Links",
    bn: "দ্রুত লিঙ্ক"
  },
  "Features": {
    en: "Features",
    bn: "বৈশিষ্ট্য"
  },
  "About Us": {
    en: "About Us",
    bn: "আমাদের সম্পর্কে"
  },
  "Contact": {
    en: "Contact",
    bn: "যোগাযোগ"
  },
  "ContactUs": {
    en: "Contact Us",
    bn: "যোগাযোগ করুন"
  },
  "Weather Forecast": {
    en: "Weather Forecast",
    bn: "আবহাওয়া পূর্বাভাস"
  },

  // Contact Information
  "Email": {
    en: "Email",
    bn: "ইমেইল"
  },
  "Phone": {
    en: "Phone",
    bn: "ফোন"
  },

  // Legal & Policy
  "PrivacyPolicy": {
    en: "Privacy Policy",
    bn: "গোপনীয়তা নীতি"
  },
  "TermsOfService": {
    en: "Terms of Service",
    bn: "সেবার শর্তাবলী"
  },
  "CookiePolicy": {
    en: "Cookie Policy",
    bn: "কুকি নীতি"
  },
  "AllRightsReserved": {
    en: "All rights reserved.",
    bn: "সর্বস্বত্ব সংরক্ষিত।"
  },

  // Action Items
  "Get Started": {
    en: "Get Started",
    bn: "শুরু করুন"
  },
  "Watch Demo": {
    en: "Watch Demo",
    bn: "ডেমো দেখুন"
  },
  "Learn More": {
    en: "Learn More",
    bn: "আরও জানুন"
  },

  // App Description
  "EmpoweringFarmers": {
    en: "Empowering farmers with technology to improve agricultural practices and increase crop yields.",
    bn: "কৃষকদের কৃষি পদ্ধতি উন্নত করতে এবং ফসলের উৎপাদন বাড়াতে প্রযুক্তির মাধ্যমে ক্ষমতায়ন।"
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'bn' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translate = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return {
    language,
    toggleLanguage,
    translate,
  };
};

export type { Language };