const defaultSiteUrl = "https://kabirjonov.uz";

function normalizeSiteUrl(value: string) {
	const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
	return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl() {
	const candidates = [
		process.env.NEXT_PUBLIC_SITE_URL,
		process.env.SITE_URL,
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
		process.env.VERCEL_URL,
	].filter(Boolean) as string[];

	if (candidates.length === 0) {
		return defaultSiteUrl;
	}

	return normalizeSiteUrl(candidates[0]);
}

const normalizedSiteUrl = resolveSiteUrl();

export const siteConfig = {
	name: "Kabirjonov Oxunjon | Official Portfolio",
	fullName: "Kabirjonov Oxunjon",
	alternateNames: [
		"Oxunjon Kabirjonov",
		"Kabirjanov Oxunjon",
		"Oxunjon Kabirjanov",
	],
	description:
		"Official personal website of Kabirjonov Oxunjon. Portfolio, resume, featured projects, developer experience, and direct contact links.",
	url: normalizedSiteUrl,
	isPlaceholderDomain: normalizedSiteUrl === defaultSiteUrl,
	jobTitle: "Frontend and Full-Stack Developer",
	email: "info.kabirjonov@gmail.com",
	phone: "+998946684005",
	resumePath: "/resume.pdf",
	github: "https://github.com/Kabirjonov",
	linkedin: "https://www.linkedin.com/in/oxunjon-kabirjanov-022b5325b/",
	instagram: "https://www.instagram.com/kab1rjonov_o/",
	telegram: "https://t.me/kabirjonov_o",
	googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
};
