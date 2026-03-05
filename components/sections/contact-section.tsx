"use client";

import { useTranslation } from "react-i18next";

export function ContactSection() {
	const { t } = useTranslation();

	return (
		<section
			id='contact'
			className='mx-auto w-full max-w-6xl px-6 py-20 sm:px-10'
		>
			<div className='rounded-2xl border border-border/80 bg-card/85 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
				<h2 className='text-2xl font-semibold'>
					{t("sections.contact.title")}
				</h2>
				<p className='mt-4 max-w-3xl text-muted-foreground'>
					{t("sections.contact.description")}
				</p>
			</div>
		</section>
	);
}
