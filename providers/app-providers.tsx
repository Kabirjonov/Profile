"use client";

import type { ReactNode } from "react";

import { I18nProvider } from "@/i18n/i18n-provider";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type AppProvidersProps = {
	children: ReactNode;
	locale: Locale;
	messages: Dictionary;
};

export function AppProviders({
	children,
	locale,
	messages,
}: AppProvidersProps) {
	return (
		<I18nProvider locale={locale} messages={messages}>
			{children}
		</I18nProvider>
	);
}
