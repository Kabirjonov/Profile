"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import { DocumentPdf, PDFDownloadLink } from "../pdf";
import { realResumeValues } from "@/types/resume";
import { Button } from "../ui/button";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
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
	const heroTitle = t("hero.title");

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
							<span className='text-muted-foreground'>Who am I: </span>
							{typedAbout}
							{/* <span className='ml-0.5 inline-block h-[1em] w-[1px] translate-y-[2px] animate-pulse bg-primary' /> */}
							<LoadingDots />
						</span>
					</span>
					{/* <h1 className='max-w-[16ch] text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
					 */}
					<motion.h1
						initial='hidden'
						animate='visible'
						className='max-w-[16ch] text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'
					>
						{heroTitle.split("").map((char, index) => (
							<motion.span
								key={`${char}-${index}`}
								variants={{
									hidden: { opacity: 0, y: 22 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{
									duration: 0.45,
									delay: 0.15 + index * 0.03,
									ease: [0.22, 1, 0.36, 1],
								}}
								className='inline-block'
							>
								{char === " " ? "\u00A0" : char}
							</motion.span>
						))}
					</motion.h1>
					<p className='max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg'>
						{t("hero.description")}
					</p>
					<div className='flex flex-col gap-3 sm:flex-row sm:items-center mt-7'>
						{/* <Link
							href='/resume.pdf'
							className='inline-flex gap-1 w-full jumping items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 sm:w-auto'
						>
							{t("hero.primaryCta")}
							<Download size={16} />
						</Link> */}
						<PDFDownloadLink
							document={<DocumentPdf data={realResumeValues} />}
							fileName='Oxunjon-Kabirjonov-resume.pdf'
							className='inline-flex w-full jumping items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 sm:w-auto'
						>
							{t("hero.primaryCta")}
						</PDFDownloadLink>
						<button className='inline-flex sm:hidden jumping gap-2 w-full items-center justify-center rounded-xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted sm:w-auto'>
							<p className='absolute text-shadow-sm -top-1.5 -right-2 text-primary  capitalize font-bold text-xs '>
								new
							</p>
							<Link href={"/resume"}>Resume create</Link>
						</button>

						<Link
							href='#contact'
							className='inline-flex  jumping gap-2 w-full items-center justify-center rounded-xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted sm:w-auto'
						>
							{t("hero.secondaryCta")}
							<span>
								<ArrowRight size={20} />
							</span>
						</Link>
					</div>
				</div>

				<div className='relative group mx-auto w-full  max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:col-span-5 lg:mr-0 '>
					<div className='absolute -inset-3 -z-10 rounded-[2rem] sm:-inset-4' />
					<div className='rounded-[2rem] border border-border/80 p-2.5 shadow-sm sm:p-3'>
						<div className='absolute left-0 top-0'>
							<div className='w-24 h-24 bg-primary rounded-full blur-3xl opacity-70 animate-pulse' />
						</div>
						<div className='absolute right-0 top-0'>
							<div className='w-16 h-16 bg-secondary rounded-full blur-3xl opacity-70 animate-pulse' />
						</div>
						{/* <div className='absolute inset-0 pointer-events-none'>
							<div className='relative h-full w-full animate-[spin_12s_linear_infinite]'>
								{[
									{
										Icon: FaReact,
										className: "text-sky-400",
										style: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
									},
									{
										Icon: SiTypescript,
										className: "text-blue-500",
										style: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
									},
									{
										Icon: FaReact,
										className: "text-cyan-400",
										style: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
									},
									{
										Icon: SiNextdotjs,
										className: "text-indigo-500",
										style: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
									},
								].map(({ Icon, className, style }, index) => (
									<div
										key={index}
										className={`absolute ${style} rounded-full border border-border/60 bg-background/80 p-3 shadow-md backdrop-blur-sm`}
									>
										<Icon className={`h-6 w-6 ${className}`} />
									</div>
								))}
							</div>
						</div> */}
						<div className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/30 sm:rounded-[1.4rem]'>
							<Image
								className='h-auto w-full object-cover'
								src='/profile.png'
								alt='Personal picture'
								width={420}
								height={520}
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
