'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

interface CommonHeaderProps {
  showBackButton?: boolean;
  pageTitle?: string;
}

export default function CommonHeader({ 
  showBackButton = false,
  pageTitle
}: CommonHeaderProps) {
  const { translate } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="page-container flex items-center gap-4">
        {showBackButton ? (
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-[#2E7D32]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="hidden sm:inline">
              {translate('Back')}
            </span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image 
                src="/logo.svg" 
                alt="Mati'r Sathi Logo" 
                fill
                priority
              />
            </div>
            <span className="text-lg font-medium text-gray-900">Mati&apos;r Sathi</span>
          </Link>
        )}
        
        {pageTitle && (
          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
            {pageTitle}
          </h1>
        )}
      </div>
    </header>
  );
}