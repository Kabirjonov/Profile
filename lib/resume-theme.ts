import type { ResumeThemeColors, ResumeThemeId } from "@/types/resume";

export const resumeThemeOptions: Array<{
	id: Exclude<ResumeThemeId, "custom">;
	label: string;
	colors: ResumeThemeColors;
}> = [
	{
		id: "classic",
		label: "Classic",
		colors: {
			pageBackground: "#ffffff",
			sidebarBackground: "#f8fafc",
			accent: "#2563eb",
			text: "#0f172a",
			mutedText: "#64748b",
			border: "#dbe3f0",
		},
	},
	{
		id: "ocean",
		label: "Ocean",
		colors: {
			pageBackground: "#f3fbff",
			sidebarBackground: "#e0f2fe",
			accent: "#0284c7",
			text: "#082f49",
			mutedText: "#0f766e",
			border: "#bae6fd",
		},
	},
	{
		id: "forest",
		label: "Forest",
		colors: {
			pageBackground: "#f6fdf8",
			sidebarBackground: "#dcfce7",
			accent: "#15803d",
			text: "#14532d",
			mutedText: "#3f6212",
			border: "#bbf7d0",
		},
	},
	{
		id: "sunset",
		label: "Sunset",
		colors: {
			pageBackground: "#fff7ed",
			sidebarBackground: "#ffedd5",
			accent: "#ea580c",
			text: "#7c2d12",
			mutedText: "#9a3412",
			border: "#fed7aa",
		},
	},
	{
		id: "midnight",
		label: "Midnight",
		colors: {
			pageBackground: "#0f172a",
			sidebarBackground: "#1e293b",
			accent: "#38bdf8",
			text: "#e2e8f0",
			mutedText: "#94a3b8",
			border: "#334155",
		},
	},
];

export const defaultCustomThemeColors: ResumeThemeColors = {
	pageBackground: "#ffffff",
	sidebarBackground: "#f8fafc",
	accent: "#2563eb",
	text: "#0f172a",
	mutedText: "#64748b",
	border: "#dbe3f0",
};

export function getResumeThemeColors(
	theme: ResumeThemeId,
	customColors: ResumeThemeColors,
) {
	if (theme === "custom") {
		return customColors;
	}

	return (
		resumeThemeOptions.find(option => option.id === theme)?.colors ??
		resumeThemeOptions[0].colors
	);
}
