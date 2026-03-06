"use client";

import Link from "next/link";
import {
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Github,
	SquareArrowOutUpRight,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type ProjectItem = {
	title: string;
	description: string;
	stack: string[];
	liveUrl: string;
	codeUrl: string;
	status: string;
};

export function ProjectSection() {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(true);
	const autoplay = useRef(
		Autoplay({
			delay: 3200,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		}),
	);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
		},
		[autoplay.current],
	);

	const projects = t("sections.project.items", {
		returnObjects: true,
	}) as ProjectItem[];
	const skeletonItems = useMemo(() => Array.from({ length: 3 }), []);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 700);
		return () => clearTimeout(timer);
	}, []);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	return (
		<section
			id='project'
			className='mx-auto w-full max-w-6xl px-6 py-16 sm:px-10'
		>
			<div className='rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
				<div className='mx-auto max-w-3xl text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
						{t("sections.project.title")}
					</h2>
					<div className='mx-auto mt-4 h-1 w-16 rounded-full bg-primary/80' />
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
						{t("sections.project.description")}
					</p>
				</div>

				<div className='mt-10'>
					<div className='overflow-hidden' ref={emblaRef}>
						<div className='flex'>
							{isLoading
								? skeletonItems.map((_, idx) => (
										<div
											key={`skeleton-${idx}`}
											className='min-w-0 flex-[0_0_100%] pr-0 md:flex-[0_0_50%] md:pr-4 xl:flex-[0_0_33.333%]'
										>
											<article className='rounded-2xl border border-border/70 bg-background/45 p-5'>
												<div className='animate-pulse'>
													<div className='h-5 w-2/3 rounded bg-muted' />
													<div className='mt-3 h-3 w-full rounded bg-muted' />
													<div className='mt-2 h-3 w-5/6 rounded bg-muted' />
													<div className='mt-4 flex flex-wrap gap-2'>
														<div className='h-6 w-16 rounded-md bg-muted' />
														<div className='h-6 w-20 rounded-md bg-muted' />
														<div className='h-6 w-14 rounded-md bg-muted' />
													</div>
													<div className='mt-5 flex gap-3'>
														<div className='h-8 w-20 rounded-lg bg-muted' />
														<div className='h-8 w-20 rounded-lg bg-muted' />
													</div>
												</div>
											</article>
										</div>
									))
								: projects.map(project => (
										<div
											key={project.title}
											className='min-w-0 flex-[0_0_100%] pr-0 md:flex-[0_0_50%] md:pr-4 xl:flex-[0_0_33.333%]'
										>
											<article className='group h-full rounded-2xl border border-border/70 bg-background/45 p-5 transition hover:border-primary/50'>
												<div className='flex items-start justify-between gap-3'>
													<h3 className='text-lg font-semibold text-foreground'>
														{project.title}
													</h3>
													<span className='rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase'>
														{project.status}
													</span>
												</div>
												<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
													{project.description}
												</p>

												<div className='mt-4 flex flex-wrap gap-2'>
													{project.stack.map(tech => (
														<span
															key={tech}
															className='rounded-md border border-border/70 bg-muted px-2.5 py-1 text-xs font-medium text-foreground/90'
														>
															{tech}
														</span>
													))}
												</div>

												<div className='mt-5 flex items-center gap-3'>
													<Link
														href={project.liveUrl}
														target='_blank'
														rel='noreferrer'
														className='inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-95'
													>
														{t("sections.project.viewLive")}
														<ArrowUpRight size={14} />
													</Link>
													<Link
														href={project.codeUrl}
														target='_blank'
														rel='noreferrer'
														className='inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/60'
													>
														{t("sections.project.viewCode")}
														<Github size={14} />
													</Link>
												</div>
											</article>
										</div>
									))}
						</div>
					</div>
					<div className='mb-4 flex justify-center gap-2 mt-2 relative'>
						<Link
							type='button'
							href={"projects"}
							onClick={scrollPrev}
							className='absolute right-0 top-0 inline-flex size-8 items-center justify-center rounded-full  text-foreground transition hover:border-primary/70 hover:text-primary'
							aria-label='Previous projects'
						>
							<SquareArrowOutUpRight size={20} />
						</Link>
						<button
							type='button'
							onClick={scrollPrev}
							className='inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition hover:border-primary/70 hover:text-primary'
							aria-label='Previous projects'
						>
							<ChevronLeft size={16} />
						</button>
						<button
							type='button'
							onClick={scrollNext}
							className='inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition hover:border-primary/70 hover:text-primary'
							aria-label='Next projects'
						>
							<ChevronRight size={16} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
