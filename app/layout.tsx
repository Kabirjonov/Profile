import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";
import { siteConfig } from "@/lib/site";
import { AppProviders } from "@/providers";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppProviders locale={locale} messages={dictionary}>
					{children}
				</AppProviders>
			</body>
		</html>
	);
}
