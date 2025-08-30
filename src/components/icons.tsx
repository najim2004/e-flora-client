import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Sun,
  Wind,
  Cloud,
  Github,
  Twitter,
  Leaf,
  Flower,
  Sprout,
  BookOpen,
  DollarSign,
  Heart,
  Lightbulb,
  MapPin,
  Star,
  Thermometer,
  Droplets,
  Scissors,
  Shield,
  Users,
  FlaskConical,
  Landmark,
  Smile,
  type Icon as LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Icon = LucideIcon;

export const Icons = {
  logo: ({ className, ...props }: React.HTMLAttributes<SVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      className={cn("w-10 h-10", className)}
      {...props}
    >
      <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="var(--color-primary)" />
      <path d="M25 15 L35 25 L25 35 L15 25 Z" fill="var(--color-primary)" />
    </svg>
  ),
  sun: Sun,
  wind: Wind,
  cloud: Cloud,
  github: Github,
  twitter: Twitter,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  loader: Loader2,
  leaf: Leaf,
  flower: Flower,
  sprout: Sprout,
  bookOpen: BookOpen,
  dollarSign: DollarSign,
  heart: Heart,
  lightbulb: Lightbulb,
  mapPin: MapPin,
  star: Star,
  thermometer: Thermometer,
  droplets: Droplets,
  scissors: Scissors,
  shield: Shield,
  users: Users,
  flaskConical: FlaskConical,
  landmark: Landmark,
  smile: Smile,
};