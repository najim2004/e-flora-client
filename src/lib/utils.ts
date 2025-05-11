import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { theme } from "./theme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemeColor(path: string): string {
  return path.split('.').reduce((obj, key) => obj[key], theme.colors as any) || '';
}

export function createThemeValue(value: string | number, unit: string = 'px'): string {
  return typeof value === 'number' ? `${value}${unit}` : value;
}

// Type utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;
