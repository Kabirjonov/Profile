export type ResumeLanguage = "uz" | "ru" | "en";
export type ResumeFontId = "sans" | "serif" | "mono";
export type ResumeThemeId =
	| "classic"
	| "ocean"
	| "forest"
	| "sunset"
	| "midnight"
	| "custom";

export type ResumeThemeColors = {
	pageBackground: string;
	sidebarBackground: string;
	accent: string;
	text: string;
	mutedText: string;
	border: string;
};

export type ResumeProfileItem = {
	label: string;
	value: string;
};

export type ResumeFormValues = {
	language: ResumeLanguage;
	nameFont: ResumeFontId;
	titleFont: ResumeFontId;
	bodyFont: ResumeFontId;
	theme: ResumeThemeId;
	customColors: ResumeThemeColors;
	fullName: string;
	jobTitle: string;
	email: string;
	phone: string;
	profiles: ResumeProfileItem[];
	photo: string;
	summary: string;
	skills: string;
	experience: string;
	education: string;
};

export const defaultResumeValues: ResumeFormValues = {
	language: "en",
	nameFont: "sans",
	titleFont: "sans",
	bodyFont: "sans",
	theme: "classic",
	customColors: {
		pageBackground: "#ffffff",
		sidebarBackground: "#f8fafc",
		accent: "#2563eb",
		text: "#0f172a",
		mutedText: "#64748b",
		border: "#dbe3f0",
	},
	fullName: "John Doe",
	jobTitle: "Frontend Developer",
	email: "john.doe@example.com",
	phone: "+1 555 123 4567",
	profiles: [
		{ label: "LinkedIn", value: "john-doe" },
		{ label: "GitHub", value: "johndoe" },
		{ label: "Portfolio", value: "johndoe.dev" },
	],
	photo: "",
	summary:
		"Frontend developer focused on building responsive interfaces, scalable web products, and clean user experiences.",
	skills:
		"HTML\nCSS\nJavaScript\nTypeScript\nReact\nNext.js\nTailwind CSS\nREST API\nGit",
	experience:
		"Frontend Developer | Example Company\nBuilt responsive product pages, reusable UI components, and integrated REST APIs for a production web app.\n\nJunior Web Developer | Startup Studio\nCollaborated with designers and backend developers to deliver landing pages, dashboards, and internal tools.",
	education:
		"BSc in Computer Science | Example University\nFocused on software engineering fundamentals, databases, and modern web development.",
};

export const realResumeValues: ResumeFormValues = {
	language: "en",
	nameFont: "sans",
	titleFont: "sans",
	bodyFont: "sans",
	theme: "classic",
	customColors: {
		pageBackground: "#ffffff",
		sidebarBackground: "#f8fafc",
		accent: "#2563eb",
		text: "#0f172a",
		mutedText: "#64748b",
		border: "#dbe3f0",
	},
	fullName: "Oxunjon Kabirjonov",
	jobTitle: "Full Stack Developer",
	email: "info.kabirjonov@gmail.com",
	phone: "+998 94 668 40 05",
	profiles: [
		{ label: "Telegram", value: "kabirjonov_o" },
		{ label: "Instagram", value: "kab1rjonov_o" },
		{ label: "GitHub", value: "Kabirjonov" },
	],
	photo: "/profile.png",
	summary:
		"Full Stack Developer focused on building modern web applications, improving user experience, and delivering reliable frontend and backend solutions.",
	skills:
		"HTML\nCSS\nSass\nTailwind CSS\nJavaScript\nTypeScript\nReact\nNext.js\nNode.js\nExpress.js\nNest.js\nTypeORM\nMongoDB\nPostgreSQL\nGraphQL\nREST API\nWebSocket\nGit\nDocker",
	experience:
		"Full Stack Developer | Tenzor Soft\nWorked on production web applications, developed scalable frontend and backend features, and contributed to clean and maintainable codebases.\n\nFrontend Developer | IMARAT Development\nBuilt responsive interfaces, improved UI workflows, and helped deliver business-focused web pages with better usability.\n\nFull Stack Developer | Texnool Market\nDeveloped e-commerce style functionality, integrated APIs, and supported both client-side and server-side features for the platform.",
	education:
		"Programming Technologies | TATU\nStudied software development foundations, modern programming practices, and web technologies in the Dasturlash texnologiyalari direction.",
};
