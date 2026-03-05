"use client";

import { createContext, useContext, useMemo } from "react";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";

import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale | null>(null);

type I18nProviderProps = {
	locale: Locale;
	messages: Dictionary;
	children: React.ReactNode;
};

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
	const i18n = useMemo(() => {
		const instance = createInstance();

		void instance.init({
			lng: locale,
			fallbackLng: locale,
			resources: {
				[locale]: {
					translation: messages,
				},
			},
			interpolation: {
				escapeValue: false,
			},
			returnNull: false,
			initImmediate: false,
		});

		return instance;
	}, [locale, messages]);

	return (
		<LocaleContext.Provider value={locale}>
			<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
		</LocaleContext.Provider>
	);
}

export function useLocale(): Locale {
	const locale = useContext(LocaleContext);

	if (!locale) {
		throw new Error("useLocale must be used within I18nProvider");
	}

	return locale;
}
