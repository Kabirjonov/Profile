import type { Locale } from "@/lib/i18n";

import en from "@/i18n/locales/en.json";
import ru from "@/i18n/locales/ru.json";
import uz from "@/i18n/locales/uz.json";

type SectionKey = "about" | "project" | "skills" | "contact";
type NavKey = "home" | "about" | "project" | "skills" | "contact";

type Section = {
  title: string;
  description: string;
};

export type Dictionary = {
  seo: {
    title: string;
    description: string;
  };
  nav: Record<NavKey, string>;
  hero: {
    badge: string;
    title: string;
    description: string;
    availability: string;
    primaryCta: string;
    secondaryCta: string;
    stackLabel: string;
  };
  sections: Record<SectionKey, Section>;
};

const dictionaries: Record<Locale, Dictionary> = {
  uz,
  en,
  ru,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
