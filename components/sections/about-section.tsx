"use client";

import { useTranslation } from "react-i18next";

export function AboutSection() {
	const { t } = useTranslation();
	const skillItems = t("sections.about.skillItems", {
		returnObjects: true,
	}) as string[];

	return (
		<section id='about' className='mx-auto w-full max-w-6xl px-6 py-16 sm:px-10'>
			<div className='rounded-3xl border border-border/70 bg-card/65 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:p-10'>
				<div className='mx-auto max-w-3xl text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
						{t("sections.about.title")}
					</h2>
					<div className='mx-auto mt-4 h-1 w-16 rounded-full bg-primary/80' />
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
						{t("sections.about.intro")}
					</p>
				</div>

				<div className='mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10'>
					<div className='rounded-2xl border border-border/70 bg-background/45 p-5 sm:p-6'>
						<h3 className='text-2xl font-semibold tracking-tight text-foreground'>
							{t("sections.about.getToKnowTitle")}
						</h3>
						<div className='mt-5 space-y-4 text-base leading-relaxed text-muted-foreground'>
							<p>{t("sections.about.p1")}</p>
							<p>{t("sections.about.p2")}</p>
							<p>{t("sections.about.p3")}</p>
						</div>
					</div>

					<div className='rounded-2xl border border-border/70 bg-background/45 p-5 sm:p-6'>
						<h3 className='text-2xl font-semibold tracking-tight text-foreground'>
							{t("sections.about.skillsTitle")}
						</h3>
						<div className='mt-5 flex flex-wrap gap-3'>
							{skillItems.map(skill => (
								<span
									key={skill}
									className='rounded-lg border border-border/80 bg-muted px-4 py-2 text-sm font-medium text-foreground/90 transition hover:border-primary/70 hover:text-foreground'
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>

				<p className='mt-8 text-center text-sm text-muted-foreground'>
					{t("sections.about.description")}
				</p>
			</div>
		</section>
	);
}
