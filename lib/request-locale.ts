import { cookies, headers } from "next/headers";

import {
  defaultLocale,
  localeCookieName,
  localeFromAcceptLanguage,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n";

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = normalizeLocale(cookieStore.get(localeCookieName)?.value);
  if (cookieLocale) {
    return cookieLocale;
  }

  const acceptLanguageLocale = localeFromAcceptLanguage(
    headerStore.get("accept-language"),
  );

  return acceptLanguageLocale ?? defaultLocale;
}
