import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LanguageProvider } from "@/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import MobileNavigation from '@/components/mobile-navigation';
import CommonFooter from '@/components/common-footer';

// Initialize Font Awesome config
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mati'r Sathi - Smart Farming Assistant",
  description: "AI-powered agriculture platform for crop disease detection, smart crop suggestions, and Bengali AI chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16 md:pb-0`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <CommonFooter />
          <MobileNavigation />
        </LanguageProvider>
      </body>
    </html>
  );
}
