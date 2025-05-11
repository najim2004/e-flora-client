'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { theme } from '@/lib/theme';

export default function CommonFooter() {
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerSections = {
    quickLinks: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' }
    ],
    features: [
      { href: '/disease-detection', label: 'Disease Detection' },
      { href: '/crop-suggestions', label: 'Crop Suggestions' },
      { href: '/chatbot', label: 'AI Chatbot' },
      { href: '/weather', label: 'Weather Forecast' }
    ],
    social: [
      { href: '#', icon: 'facebook', label: 'Facebook' },
      { href: '#', icon: 'twitter', label: 'Twitter' },
      { href: '#', icon: 'instagram', label: 'Instagram' },
      { href: '#', icon: 'youtube', label: 'YouTube' }
    ]
  };

  return (
    <footer className="bg-[#1B5E20] text-white py-12">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.svg" 
                  alt="Mati'r Sathi Logo" 
                  fill
                  className="invert"
                />
              </div>
              <span className="text-xl font-medium">Mati&apos;r Sathi</span>
            </div>
            <p className="text-white/80">
              {translate('EmpoweringFarmers')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{translate('QuickLinks')}</h4>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {translate(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold mb-4">{translate('Features')}</h4>
            <ul className="space-y-2">
              {footerSections.features.map((feature) => (
                <li key={feature.href}>
                  <Link href={feature.href} className="text-white/80 hover:text-white">
                    {translate(feature.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{translate('ContactUs')}</h4>
            <address className="not-italic text-white/80 space-y-2">
              <p>{translate('Email')}: info@matirsathi.com</p>
              <p>{translate('Phone')}: +880 1234 567890</p>
              <div className="flex gap-4 mt-4">
                {footerSections.social.map((social) => (
                  <a 
                    key={social.icon} 
                    href={social.href} 
                    className="hover:text-[#81C784] transition-colors"
                    aria-label={social.label}
                  >
                    <i className={`fab fa-${social.icon} w-6 h-6`}></i>
                  </a>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Mati&apos;r Sathi. {translate('AllRightsReserved')}
          </p>

          <div className="flex gap-4 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-white">
              {translate('PrivacyPolicy')}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {translate('TermsOfService')}
            </Link>
            <Link href="/cookies" className="hover:text-white">
              {translate('CookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}