export interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  day: string;
  temp: string;
  icon: string;
}

export interface CropSuggestion {
  name: string;
  confidence: number;
  image: string;
  tips: string[];
  suitability: string[];
}

export interface SoilType {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  location: string;
  image: string;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Authentication related types
export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Component Props Types
export interface CommonHeaderProps {
  showBackButton?: boolean;
  pageTitle?: string;
  showAuthButtons?: boolean;
}