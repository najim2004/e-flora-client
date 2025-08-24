import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import MobileNavigation from "@/components/mobile-navigation";
import CommonFooter from "@/components/common-footer";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Toaster } from "sonner";
import FetchInitialData from "@/components/fetchInitialData";

// Initialize Font Awesome config
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "eFlora - Smart Gardening Assistant",
  description:
    "AI-powered Garden platform for crop disease detection, smart crop suggestions, and Bengali AI chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased pb-16 md:pb-0`}>
        <ReduxProvider>
          <LanguageProvider>
            <FetchInitialData/>
            <Navbar />
            <main>{children}</main>
            <CommonFooter />
            <MobileNavigation />
          </LanguageProvider>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
