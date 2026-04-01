"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
	root.style.colorScheme = theme;
	window.localStorage.setItem("theme", theme);
}

function getPreferredTheme(): Theme {
	const savedTheme = window.localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (savedTheme === "dark" || savedTheme === "light") {
		return savedTheme;
	}

	return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
	useEffect(() => {
		applyTheme(getPreferredTheme());
	}, []);

	function onToggleTheme() {
		const isDark = document.documentElement.classList.contains("dark");
		applyTheme(isDark ? "light" : "dark");
	}

	return (
		<button
			type='button'
			onClick={onToggleTheme}
			className='group inline-flex h-7 w-12 items-center rounded-full border border-border bg-card px-1 transition hover:border-primary/60 sm:h-8 sm:w-14'
			aria-label='Toggle theme'
		>
			<span className='sr-only'>Toggle theme</span>
			<span className='inline-flex h-5 w-5 translate-x-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform dark:translate-x-5 sm:h-6 sm:w-6 sm:dark:translate-x-6'>
				<span className='dark:hidden'>
					<Sun className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
				</span>
				<span className='hidden dark:inline'>
					<Moon className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
				</span>
			</span>
		</button>
	);
}
