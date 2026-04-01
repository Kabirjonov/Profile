import { z } from "zod";

const resumeProfileSchema = z.object({
	label: z.string().trim().min(1, "Label is required."),
	value: z.string().trim().min(1, "Profile name is required."),
});

const resumeThemeColorsSchema = z.object({
	pageBackground: z.string(),
	sidebarBackground: z.string(),
	accent: z.string(),
	text: z.string(),
	mutedText: z.string(),
	border: z.string(),
});

export const resumeSchema = z.object({
	language: z.enum(["uz", "ru", "en"]),
	nameFont: z.enum(["sans", "serif", "mono"]),
	titleFont: z.enum(["sans", "serif", "mono"]),
	bodyFont: z.enum(["sans", "serif", "mono"]),
	theme: z.enum(["classic", "ocean", "forest", "sunset", "midnight", "custom"]),
	customColors: resumeThemeColorsSchema,
	fullName: z
		.string()
		.trim()
		.min(2, "Full name must be at least 2 characters."),
	jobTitle: z.string().trim().min(2, "Job title is required."),
	email: z.email("Enter a valid email address."),
	phone: z.string().trim().min(7, "Phone number is required."),
	profiles: z.array(resumeProfileSchema),
	photo: z.string(),
	summary: z
		.string()
		.trim()
		.min(20, "Summary should be at least 20 characters."),
	skills: z.string().trim().min(2, "Add at least one skill."),
	experience: z.string().trim().min(20, "Add at least one experience item."),
	education: z.string().trim().min(10, "Add education details."),
});

export type ResumeSchemaValues = z.infer<typeof resumeSchema>;
