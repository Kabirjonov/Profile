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
			className='group inline-flex h-8 w-14 items-center rounded-full border border-border bg-card px-1 transition hover:border-primary/60'
			aria-label='Toggle theme'
		>
			<span className='sr-only'>Toggle theme</span>
			<span className='inline-flex h-6 w-6 translate-x-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform dark:translate-x-6'>
				<span className='text-[10px] leading-none dark:hidden'>
					<Sun className='p-1' />
				</span>
				<span className='hidden text-[10px] leading-none dark:inline'>
					<Moon className='p-1' />
				</span>
			</span>
		</button>
	);
}
