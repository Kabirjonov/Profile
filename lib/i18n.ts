export const locales = ["uz", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";
export const localeCookieName = "NEXT_LOCALE";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase().trim();
  const short = normalized.split("-")[0];

  if (isValidLocale(normalized)) {
    return normalized;
  }

  if (isValidLocale(short)) {
    return short;
  }

  return null;
}

export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) {
    return defaultLocale;
  }

  const parts = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim())
    .filter(Boolean);

  for (const part of parts) {
    const locale = normalizeLocale(part);
    if (locale) {
      return locale;
    }
  }

  return defaultLocale;
}
