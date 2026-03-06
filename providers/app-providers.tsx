"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
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
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<I18nProvider locale={locale} messages={messages}>
				<Toaster position='top-right' reverseOrder={false} />
				{children}
			</I18nProvider>
		</QueryClientProvider>
	);
}
