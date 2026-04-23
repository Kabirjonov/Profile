"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { navLinks } from "@/constants/Navbar";
import { SocialLinks } from "@/components/shared/RightLinks";
import { cn } from "@/lib/utils";

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className='bg-card/65  backdrop-blur-sm mt-16   px-6 pb-10 sm:px-10'>
			<div className='grid gap-8 md:grid-cols-3 py-5 max-w-6xl mx-auto'>
				<div>
					<Link
						href='/'
						className='text-lg font-semibold tracking-widest text-primary capitalize'
					>
						kab1rjonov
					</Link>
					<p className='mt-3 max-w-xs text-sm text-muted-foreground'>
						{t("footer.tagline")}
					</p>
				</div>

				<div>
					<h3 className='text-sm font-semibold  tracking-wider text-foreground/90 uppercase'>
						{t("footer.quickLinks")}
					</h3>
					<div className='mt-3 flex flex-col text-start gap-x-4 gap-y-2'>
						{navLinks.map(link => (
							<button
								key={link.id}
								onClick={() => {
									document.getElementById(link.id)?.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								}}
								className={cn(
									"text-sm font-medium text-start transition-colors",
								)}
							>
								{t(link.key)}
							</button>
						))}
					</div>
				</div>

				<div>
					<h3 className='text-sm font-semibold tracking-wider text-foreground/90 uppercase'>
						{t("footer.social")}
					</h3>
					<div className='mt-3 flex flex-wrap gap-2 '>
						{SocialLinks.map(item => (
							<Link
								key={item.name}
								href={item.link}
								target={item.link.startsWith("http") ? "_blank" : undefined}
								rel={item.link.startsWith("http") ? "noreferrer" : undefined}
								aria-label={item.name}
								className='inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground transition hover:border-primary/70 hover:text-primary'
							>
								<item.icon size={16} />
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className='mt-7 border-t border-border/70 pt-4 text-center text-xs text-muted-foreground'>
				{t("footer.rights", { year })}
			</div>
		</footer>
	);
}
