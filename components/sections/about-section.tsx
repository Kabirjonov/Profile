"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type SkillCategory = {
	title: string;
	items: string[];
};

export function AboutSection() {
	const { t } = useTranslation();
	const autoplay = useRef(
		Autoplay({
			delay: 2800,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		})
	);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
	}, [autoplay.current]);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
	const skillCategories = t("sections.about.skillCategories", {
		returnObjects: true,
	}) as SkillCategory[];

	return (
		<section
			id='about'
			className='mx-auto w-full max-w-6xl px-6 py-16 sm:px-10'
		>
			<div className='rounded-3xl border border-border/70 bg-card/65 p-6 shadow-lg sm:p-8 lg:p-10'>
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

					<div className='rounded-2xl border border-border/70 p-5 sm:p-6'>
						<div className='flex items-center justify-between gap-3'>
							<h3 className='text-2xl font-semibold tracking-tight text-foreground'>
								{t("sections.about.skillsTitle")}
							</h3>
							<div className='flex items-center gap-2'>
								<button
									type='button'
									onClick={scrollPrev}
									className='inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition hover:border-primary/70 hover:text-primary'
									aria-label='Previous skills'
								>
									<ChevronLeft size={16} />
								</button>
								<button
									type='button'
									onClick={scrollNext}
									className='inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition hover:border-primary/70 hover:text-primary'
									aria-label='Next skills'
								>
									<ChevronRight size={16} />
								</button>
							</div>
						</div>

						<div className='mt-5 overflow-hidden' ref={emblaRef}>
							<div className='flex'>
								{skillCategories.map(category => (
									<div
										key={category.title}
										className='min-w-0 flex-[0_0_100%] pr-3 sm:flex-[0_0_50%]'
									>
										<div className='h-full rounded-xl border border-border/70 bg-background/45 p-4'>
											<h4 className='text-sm font-semibold tracking-wide text-primary uppercase'>
												{category.title}
											</h4>
											<div className='mt-3 flex flex-wrap gap-2'>
												{category.items.map(skill => (
													<span
														key={skill}
														className='rounded-lg border border-border/80 bg-muted px-3 py-1.5 text-xs font-medium text-foreground/90 transition hover:border-primary/70 hover:text-foreground'
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
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
