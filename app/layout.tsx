import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/seo/json-ld";

import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPersonSchema, buildRootMetadata, buildWebsiteSchema } from "@/lib/seo";
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

export const metadata: Metadata = buildRootMetadata();

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);
	const personJsonLd = buildPersonSchema();
	const websiteJsonLd = buildWebsiteSchema();

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
				<JsonLd id='person-jsonld' data={personJsonLd} />
				<JsonLd id='website-jsonld' data={websiteJsonLd} />
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
