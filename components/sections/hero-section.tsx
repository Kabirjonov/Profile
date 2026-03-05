"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
function LoadingDots() {
	return (
		<span className='ml-1 inline-flex'>
			<span className='animate-pulse [animation-delay:0ms]'>.</span>
			<span className='animate-pulse [animation-delay:200ms]'>.</span>
			<span className='animate-pulse [animation-delay:400ms]'>.</span>
		</span>
	);
}
export function HeroSection() {
	const { t } = useTranslation();
	const [aboutIndex, setAboutIndex] = useState(0);
	const [typedCount, setTypedCount] = useState(0);

	const shortAbout = useMemo(() => {
		const items = t("hero.shortAbout", { returnObjects: true });
		if (Array.isArray(items) && items.length > 0) {
			return items as string[];
		}
		return [t("hero.badge")];
	}, [t]);

	const currentAbout = shortAbout[aboutIndex % shortAbout.length] ?? "";
	const typedAbout = currentAbout.slice(0, typedCount);

	useEffect(() => {
		if (!currentAbout) return;

		if (typedCount < currentAbout.length) {
			const typingTimer = setTimeout(() => {
				setTypedCount(prev => prev + 1);
			}, 80);
			return () => clearTimeout(typingTimer);
		}

		const pauseTimer = setTimeout(() => {
			setAboutIndex(prev => (prev + 1) % shortAbout.length);
			setTypedCount(0);
		}, 2000);

		return () => clearTimeout(pauseTimer);
	}, [typedCount, currentAbout, shortAbout.length]);

	return (
		<section
			id='home'
			className='mx-auto relative w-full max-w-6xl px-4 pb-12 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pt-20'
		>
			<div className='grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12'>
				<div className='space-y-5 sm:space-y-6 lg:col-span-7'>
					<span className='inline-flex items-center rounded-full border border-border/80 bg-card/70 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase text-primary sm:px-4 sm:text-xs sm:tracking-[0.18em]'>
						<span className='inline-block min-w-[17ch]'>
							Who am I: {typedAbout}
							{/* <span className='ml-0.5 inline-block h-[1em] w-[1px] translate-y-[2px] animate-pulse bg-primary' /> */}
							<LoadingDots />
						</span>
					</span>
					<h1 className='max-w-[16ch] text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						{t("hero.title")}
					</h1>
					<p className='max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg'>
						{t("hero.description")}
					</p>
					<div className='flex flex-col gap-3 sm:flex-row sm:items-center mt-7'>
						<Link
							href='#project'
							className='inline-flex w-full jumping items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 sm:w-auto'
						>
							{t("hero.primaryCta")}
						</Link>
						<Link
							href='#contact'
							className='inline-flex jumping gap-2 w-full items-center justify-center rounded-xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted sm:w-auto'
						>
							{t("hero.secondaryCta")}
							<span>
								<ArrowRight size={20} />
							</span>
						</Link>
					</div>
					{/* <div className='rounded-2xl border border-border/80 bg-card/70 p-3 backdrop-blur-sm sm:p-4'>
						<p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
							{t("hero.stackLabel")}
						</p>
						<div className='mt-3 flex flex-wrap gap-2'>
							{stack.map(item => (
								<span
									key={item}
									className='rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-medium text-foreground'
								>
									{item}
								</span>
							))}
						</div>
					</div> */}
				</div>

				<div className='relative mx-auto w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:col-span-5 lg:mr-0'>
					<div className='absolute -inset-3 -z-10 rounded-full bg-primary/20 blur-2xl sm:-inset-4' />
					<div className='rounded-full border border-border/80 bg-card/85 p-2.5 shadow-sm backdrop-blur-sm sm:rounded-[2rem] sm:p-3'>
						<div className='overflow-hidden rounded-full border border-border/70 bg-muted/40 sm:rounded-[1.4rem]'>
							<Image
								className='h-auto w-full object-cover rounded-full px-2'
								src='/john.png'
								alt='Personal picture'
								width={420}
								height={520}
								priority
							/>
						</div>
						{/* <div className='mt-3 flex flex-col gap-2 px-1 pb-1 sm:flex-row sm:items-center sm:justify-between'>
							<p className='text-sm font-medium text-foreground'>
								Oxunjon Kabirjonov
							</p>
							<span className='w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary'>
								{t("hero.availability")}
							</span>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
}
