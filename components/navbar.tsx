"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navLinks } from "@/constants/Navbar";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
	const [activeLink, setActiveLink] = useState("/");
	const [isMobile, setIsMobile] = useState(false);
	const { t } = useTranslation();
	const pathname = usePathname();
	useEffect(() => {
		setIsMobile(false);
	}, [pathname]);
	return (
		<header className='sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur relative'>
			<nav className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10'>
				<Link
					href='/'
					className='capitalize text-lg font-semibold text-primary tracking-widest'
				>
					kab1rjonov
				</Link>

				<div className='hidden md:flex items-center gap-3 overflow-x-auto px-2 md:gap-4 lg:gap-6 '>
					{navLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setActiveLink(link.href)}
							className={`text-sm font-medium transition-colors hover:text-foreground ${
								link.href === activeLink
									? " text-foreground"
									: "text-muted-foreground"
							}`}
						>
							{t(link.key)}
						</Link>
					))}
				</div>
				<div className='flex items-center gap-2'>
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
					{/* // <div className='md:hidden border-t border-border/70 bg-background/95 backdrop-blur'> */}
					<div className='mx-auto w-full max-w-6xl px-6 sm:px-10 py-3 flex flex-col gap-2'>
						{navLinks.map(link => {
							const active = link.href === pathname;
							return (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setIsMobile(v => !v)}
									className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/40 ${
										active ? "text-foreground" : "text-muted-foreground"
									}`}
								>
									{t(link.key)}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</header>
	);
}
