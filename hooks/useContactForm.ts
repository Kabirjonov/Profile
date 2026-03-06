"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	createContactSchema,
	type ContactFormValues,
} from "@/schema/contact.schema";
import toast from "react-hot-toast";

type ContactApiSuccess = {
	ok: true;
	message: string;
};

export function useContactForm() {
	const { t } = useTranslation();

	const contactSchema = useMemo(() => createContactSchema(t), [t]);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			fullName: "",
			phone: "+998",
			description: "",
		},

		mode: "onBlur",
	});

	const mutation = useMutation<ContactApiSuccess, Error, ContactFormValues>({
		mutationFn: async values => {
			const formData = new FormData();
			formData.append("fullName", values.fullName.trim());
			formData.append("phone", values.phone.trim());
			formData.append("description", values.description.trim());

			const selectedFile = values.file?.[0];
			if (selectedFile) {
				formData.append("file", selectedFile);
			}

			const response = await axios.post<ContactApiSuccess>(
				"/api/contact",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			return response.data;
		},
		onSuccess: () => {
			toast.success(t("sections.contact.form.success"));
			form.reset({
				fullName: "",
				phone: "+998",
				description: "",
			});
		},
		onError: () => {
			toast.error(t("sections.contact.form.error"));
		},
	});

	const onSubmit = form.handleSubmit(values => {
		mutation.mutate(values);
	});

	let serverError = mutation.error?.message ?? "";
	if (axios.isAxiosError(mutation.error)) {
		const serverData = mutation.error.response?.data as
			| { error?: string }
			| undefined;
		serverError = serverData?.error || mutation.error.message;
	}

	return {
		...form,
		onSubmit,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		serverMessage: mutation.data?.message ?? "",
		serverError,
	};
}
