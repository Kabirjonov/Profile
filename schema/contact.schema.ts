import { z } from "zod";

type TranslateFn = (key: string) => string;

export const createContactSchema = (t: TranslateFn) =>
	z.object({
		fullName: z
			.string()
			.trim()
			.min(2, t("sections.contact.form.validation.fullNameMin")),
		phone: z
			.string()
			.trim()
			.min(9, t("sections.contact.form.validation.phoneMin"))
			.regex(
				/^\+?[0-9\s\-()]{7,20}$/,
				t("sections.contact.form.validation.phoneInvalid")
			)
			.refine(value => {
				const digits = value.replace(/\D/g, "");
				return digits.startsWith("998") && digits.length === 12;
			}, t("sections.contact.form.validation.phoneInvalid")),
		description: z
			.string()
			.trim()
			.min(10, t("sections.contact.form.validation.descriptionMin")),
		file: z
			.custom<FileList | undefined>()
			.optional()
			.refine(
				files => !files?.[0] || files[0].size <= 5 * 1024 * 1024,
				t("sections.contact.form.validation.fileMaxSize"),
			),
	});

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
