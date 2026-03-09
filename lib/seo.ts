import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const brandedKeywords = [
	"Kabirjonov Oxunjon",
	"Oxunjon Kabirjonov",
	"Kabirjanov Oxunjon",
	"Oxunjon Kabirjanov",
	"Kabirjonov portfolio",
	"Kabirjonov resume",
	"Frontend Developer Uzbekistan",
	"Full Stack Developer Portfolio",
] as const;

function toAbsoluteUrl(path = "/") {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${siteConfig.url}${normalizedPath}`;
}

type PageMetadataInput = {
	title: string;
	description: string;
	path?: string;
	images?: string[];
	noIndex?: boolean;
};

export function buildRootMetadata(): Metadata {
	return {
		metadataBase: new URL(siteConfig.url),
		title: {
			default: siteConfig.name,
			template: `%s | ${siteConfig.fullName}`,
		},
		description: siteConfig.description,
		applicationName: siteConfig.fullName,
		authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
		creator: siteConfig.fullName,
		publisher: siteConfig.fullName,
		keywords: [...brandedKeywords],
		alternates: {
			canonical: toAbsoluteUrl("/"),
		},
		openGraph: {
			type: "website",
			url: toAbsoluteUrl("/"),
			title: siteConfig.name,
			description: siteConfig.description,
			siteName: siteConfig.fullName,
			images: [toAbsoluteUrl("/profile.png")],
		},
		twitter: {
			card: "summary_large_image",
			title: siteConfig.name,
			description: siteConfig.description,
			images: [toAbsoluteUrl("/profile.png")],
		},
	};
}

export function buildPageMetadata({
	title,
	description,
	path = "/",
	images,
	noIndex = false,
}: PageMetadataInput): Metadata {
	const canonical = toAbsoluteUrl(path);
	const imageList = images?.length ? images.map(toAbsoluteUrl) : [toAbsoluteUrl("/profile.png")];

	return {
		title,
		description,
		keywords: [...brandedKeywords],
		alternates: {
			canonical,
		},
		openGraph: {
			type: "website",
			url: canonical,
			title,
			description,
			siteName: siteConfig.fullName,
			images: imageList,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: imageList,
		},
		robots: noIndex
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}

export function buildPersonSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${siteConfig.url}/#person`,
		name: siteConfig.fullName,
		alternateName: siteConfig.alternateNames,
		url: siteConfig.url,
		jobTitle: siteConfig.jobTitle,
		email: siteConfig.email,
		telephone: siteConfig.phone,
		sameAs: [
			siteConfig.github,
			siteConfig.linkedin,
			siteConfig.instagram,
			siteConfig.telegram,
		],
		subjectOf: {
			"@type": "CreativeWork",
			name: "Resume",
			url: toAbsoluteUrl(siteConfig.resumePath),
		},
	};
}

export function buildWebsiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${siteConfig.url}/#website`,
		url: siteConfig.url,
		name: siteConfig.name,
		description: siteConfig.description,
		inLanguage: ["en", "uz", "ru"],
		publisher: {
			"@id": `${siteConfig.url}/#person`,
		},
	};
}

export function buildHomeWebPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${siteConfig.url}/#webpage`,
		url: siteConfig.url,
		name: `${siteConfig.fullName} - Official Portfolio`,
		description: siteConfig.description,
		isPartOf: { "@id": `${siteConfig.url}/#website` },
		about: { "@id": `${siteConfig.url}/#person` },
		primaryImageOfPage: toAbsoluteUrl("/profile.png"),
	};
}

export function buildProfilePageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		"@id": `${siteConfig.url}/#profilepage`,
		url: siteConfig.url,
		name: `${siteConfig.fullName} Profile`,
		isPartOf: { "@id": `${siteConfig.url}/#website` },
		mainEntity: { "@id": `${siteConfig.url}/#person` },
	};
}

export function buildFaqSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "Who is Kabirjonov Oxunjon?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Kabirjonov Oxunjon is a frontend and full-stack developer from Uzbekistan. This website is his official personal portfolio and resume.",
				},
			},
			{
				"@type": "Question",
				name: "Are Oxunjon Kabirjonov and Kabirjanov Oxunjon the same person?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes. These are common spelling and order variations of the same name used for the same personal brand.",
				},
			},
			{
				"@type": "Question",
				name: "Where can I contact Kabirjonov Oxunjon or download resume?",
				acceptedAnswer: {
					"@type": "Answer",
					text: `You can contact via email (${siteConfig.email}), phone (${siteConfig.phone}), Telegram, and LinkedIn. Resume is available at ${toAbsoluteUrl(siteConfig.resumePath)}.`,
				},
			},
		],
	};
}

export { toAbsoluteUrl };
