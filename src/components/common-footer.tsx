"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export const Icons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  mapPin: MapPin,
  phone: Phone,
  mail: Mail,
} as const;

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface SocialLink extends FooterLink {
  icon: keyof typeof Icons;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerConfig = {
  features: {
    title: "Features",
    links: [
      { href: "/disease-detection", label: "Disease Detection" },
      { href: "/crop-suggestions", label: "Crop Suggestions" },
      { href: "/chatbot", label: "AI Chatbot" },
      { href: "/weather", label: "Weather Forecasts" },
      { href: "/market-prices", label: "Market Prices" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/knowledge-base", label: "Knowledge Base" },
      { href: "/community", label: "Community Forum" },
      { href: "/tutorials", label: "Video Tutorials" },
      { href: "/success-stories", label: "Success Stories" },
    ],
  },
  social: [
    {
      href: "https://facebook.com/matirsathi",
      label: "Facebook",
      icon: "facebook",
    },
    {
      href: "https://twitter.com/matirsathi",
      label: "Twitter",
      icon: "twitter",
    },
    {
      href: "https://instagram.com/matirsathi",
      label: "Instagram",
      icon: "instagram",
    },
    {
      href: "https://youtube.com/matirsathi",
      label: "YouTube",
      icon: "youtube",
    },
  ] as SocialLink[],
};

const FooterSection = ({ title, links }: FooterSection) => (
  <div className="flex flex-col">
    <h4 className="mb-4 text-lg font-semibold text-white">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={cn(
              "text-white/80 hover:text-white transition-colors duration-200",
              "inline-flex items-center gap-2"
            )}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function CommonFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B5E20] py-12 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Image
                src="/logo.jpg"
                alt="Mati'r Sathi Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h3 className="text-xl font-bold">Mati&apos;r Sathi</h3>
            </div>
            <p className="mb-4 text-white/80">
              Empowering farmers with technology to improve agricultural
              practices and increase crop yields.
            </p>
            <div className="flex space-x-4">
              {footerConfig.social.map((social) => {
                const Icon = Icons[social.icon];
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      "bg-white/10 text-white transition-colors hover:bg-white/20"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Features Section */}
          <FooterSection {...footerConfig.features} />

          {/* Resources Section */}
          <FooterSection {...footerConfig.resources} />

          {/* Contact Section */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Icons.mapPin className="mt-1 mr-3 h-5 w-5" />
                <span className="text-white/80">
                  123 Agri Tech Park, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Icons.phone className="mr-3 h-5 w-5" />
                <span className="text-white/80">+880 1234 567890</span>
              </li>
              <li className="flex items-center">
                <Icons.mail className="mr-3 h-5 w-5" />
                <span className="text-white/80">info@matirsathi.com</span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="mt-4 w-full border-white text-gray-800 hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>

        <Separator className="mb-8 bg-white/20" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-white/70">
            © {currentYear} Mati&apos;r Sathi. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
