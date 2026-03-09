import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";
import { siteConfig } from "@/lib/site";
import { AppProviders } from "@/providers";
import ChatWidget from "@/components/ChatWidget";
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
	applicationName: siteConfig.fullName,
	authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
	creator: siteConfig.fullName,
	publisher: siteConfig.fullName,
	keywords: [
		"Kabirjonov Oxunjon",
		"Oxunjon Kabirjonov",
		"Kabirjonov",
		"Oxunjon",
		"Frontend Developer Uzbekistan",
		"Full Stack Developer Portfolio",
	],
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.fullName,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);
	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.fullName,
		alternateName: siteConfig.alternateName,
		url: siteConfig.url,
		sameAs: [siteConfig.github],
		jobTitle: "Frontend and Full-Stack Developer",
	};

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Script id='yandex-metrika' strategy='afterInteractive'>
					{`
						(function(m,e,t,r,i,k,a){
							m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
							m[i].l=1*new Date();
							for (var j = 0; j < document.scripts.length; j++) {
								if (document.scripts[j].src === r) { return; }
							}
							k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
						})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107225340', 'ym');

						ym(107225340, 'init', {
							ssr: true,
							webvisor: true,
							clickmap: true,
							ecommerce: "dataLayer",
							referrer: document.referrer,
							url: location.href,
							accurateTrackBounce: true,
							trackLinks: true
						});
					`}
				</Script>
				<Script
					id='person-jsonld'
					type='application/ld+json'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<noscript>
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src='https://mc.yandex.ru/watch/107225340'
							style={{ position: "absolute", left: "-9999px" }}
							alt=''
						/>
					</div>
				</noscript>
				<AppProviders locale={locale} messages={dictionary}>
					{children}
					<ChatWidget />
				</AppProviders>
			</body>
		</html>
	);
}
