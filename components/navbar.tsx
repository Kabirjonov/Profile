"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navLinks } from "@/constants/Navbar";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function Navbar() {
	const [activeLink, setActiveLink] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const { t } = useTranslation();
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const sections = navLinks.map(l => document.getElementById(l.id));

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				root: null,
				threshold: 0.5, // section 50% ko‘rinsa active bo‘ladi
			},
		);

		sections.forEach(sec => {
			if (sec) observer.observe(sec);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<header className='sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur relative'>
			<nav className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10'>
				<Link
					href='/'
					className='capitalize text-lg font-semibold text-primary tracking-widest'
				>
					kabirjonov
				</Link>

				<div className='hidden md:flex items-center gap-3 overflow-x-auto px-2 md:gap-4 lg:gap-6 '>
					{navLinks.map(link => {
						const isActive = activeSection === link.id;

						return (
							<button
								key={link.id}
								onClick={() => {
									document.getElementById(link.id)?.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								}}
								className={cn(
									"text-sm font-medium transition-colors",
									isActive
										? "text-primary"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								{t(link.key)}
							</button>
						);
					})}
				</div>
				<div className='flex items-center gap-2'>
					<Button className='relative hidden sm:block' variant={"outline"}>
						<p className='absolute text-shadow-sm -top-1.5 -right-2 text-primary  capitalize font-bold text-xs '>
							new
						</p>
						<Link href={"/resume"}>Resume create</Link>
					</Button>
					<LanguageSwitcher />
					<ThemeToggle />

					<button
						type='button'
						className='md:hidden inline-flex items-center justify-center rounded-md border border-border/70 px-3 py-2 text-sm'
						aria-label='Open menu'
						aria-expanded={isMobile}
						onClick={() => setIsMobile(v => !v)}
					>
						<span
							className={`transition-all duration-200 ${
								isMobile
									? "rotate-90 scale-90 opacity-0"
									: "rotate-0 scale-100 opacity-100"
							}`}
						>
							<Menu />
						</span>

						<span
							className={`absolute transition-all duration-200 ${
								isMobile
									? "rotate-0 scale-100 opacity-100"
									: "-rotate-90 scale-90 opacity-0"
							}`}
						>
							<X />
						</span>
					</button>
				</div>
			</nav>
			{isMobile && (
				<div
					className={`md:hidden absolute left-0 right-0 top-full w-full border-t border-border/70 bg-background/95 backdrop-blur
		transition-all duration-300 ease-out
		${isMobile ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
	`}
				>
					<div className='mx-auto w-full max-w-6xl px-6 sm:px-10 py-3 flex flex-col gap-2'>
						{navLinks.map(link => {
							const isActive = activeSection === link.id;

							return (
								<button
									key={link.id}
									onClick={() => {
										document.getElementById(link.id)?.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});

										setIsMobile(false);
									}}
									className={cn(
										"rounded-md px-3 py-2 text-sm font-medium text-left transition-colors",
										isActive
											? "text-secondary bg-muted/40"
											: "text-muted-foreground hover:bg-muted/40",
									)}
								>
									{t(link.key)}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</header>
	);
}
