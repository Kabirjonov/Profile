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
	fullName: "Oxunjon Kabirjonov",
	jobTitle: "Full Stack Developer",
	email: "example@gamil.com",
	phone: "+998 94 668 40 05",
	profiles: [
		{ label: "Telegram", value: "kabirjonov_o" },
		{ label: "Instagram", value: "kab1rjonov_o" },
		{ label: "Github", value: "Kabirjonov" },
	],
	photo: "/profile.png",
	summary:
		"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	skills:
		"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	experience:
		"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	education:
		"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
