"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
	const [ready, setReady] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");
		const reducedMotionQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);

		const syncVisibility = () => {
			setShouldRender(mediaQuery.matches && !reducedMotionQuery.matches);
		};

		syncVisibility();
		mediaQuery.addEventListener("change", syncVisibility);
		reducedMotionQuery.addEventListener("change", syncVisibility);

		return () => {
			mediaQuery.removeEventListener("change", syncVisibility);
			reducedMotionQuery.removeEventListener("change", syncVisibility);
		};
	}, []);

	useEffect(() => {
		if (!shouldRender) return;

		initParticlesEngine(async (engine: Engine) => {
			await loadFull(engine);
		}).then(() => setReady(true));
	}, [shouldRender]);

	useEffect(() => {
		const root = document.documentElement;
		const syncTheme = () => setIsDark(root.classList.contains("dark"));

		syncTheme();

		const observer = new MutationObserver(syncTheme);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const options: ISourceOptions = useMemo(
		() => ({
			fpsLimit: 60,
			background: {
				color: { value: "transparent" },
			},
			particles: {
				number: {
					value: 40,
					density: { enable: true, area: 1200 },
				},
				color: { value: isDark ? "#ffffff" : "#355079" },
				links: {
					enable: true,
					color: isDark ? "#ffffff" : "#4f6a91",
					opacity: isDark ? 0.14 : 0.2,
					distance: 110,
					width: 1,
				},
				move: {
					enable: true,
					speed: 0.45,
					outModes: { default: "out" },
				},
				size: { value: { min: 1, max: 2 } },
				opacity: { value: isDark ? 0.35 : 0.5 },
			},
			interactivity: {
				events: {
					onHover: { enable: false, mode: "grab" },
					resize: { enable: true },
				},
				modes: {
					grab: {
						distance: 120,
						links: { opacity: isDark ? 0.28 : 0.35 },
					},
				},
			},
			detectRetina: false,
		}),
		[isDark],
	);

	if (!shouldRender || !ready) return null;

	return (
		<Particles
			id='tsparticles'
			className='pointer-events-none fixed inset-0 z-0'
			options={options}
		/>
	);
}
