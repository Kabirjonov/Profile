const defaultSiteUrl = "https://your-domain.example";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, "");

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
	isPlaceholderDomain: rawSiteUrl === defaultSiteUrl,
	jobTitle: "Frontend and Full-Stack Developer",
	email: "info.kabirjonov@gmail.com",
	phone: "+998946684005",
	resumePath: "/resume.pdf",
	github: "https://github.com/Kabirjonov",
	linkedin: "https://www.linkedin.com/in/oxunjon-kabirjanov-022b5325b/",
	instagram: "https://www.instagram.com/kab1rjonov_o/",
	telegram: "https://t.me/kabirjonov_o",
};
