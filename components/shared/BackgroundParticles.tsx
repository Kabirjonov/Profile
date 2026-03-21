"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
	const [ready, setReady] = useState(false);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine: Engine) => {
			await loadFull(engine);
		}).then(() => setReady(true));
	}, []);

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
			fpsLimit: 120,
			background: {
				color: { value: "transparent" },
			},
			particles: {
				number: {
					value: 85,
					density: { enable: true, area: 900 },
				},
				color: { value: isDark ? "#ffffff" : "#355079" },
				links: {
					enable: true,
					color: isDark ? "#ffffff" : "#4f6a91",
					opacity: isDark ? 0.18 : 0.28,
					distance: 130,
					width: 1,
				},
				move: {
					enable: true,
					speed: 0.8,
					outModes: { default: "out" },
				},
				size: { value: { min: 1, max: 2 } },
				opacity: { value: isDark ? 0.45 : 0.65 },
			},
			interactivity: {
				events: {
					onHover: { enable: true, mode: "grab" },
					resize: { enable: true },
				},
				modes: {
					grab: {
						distance: 140,
						links: { opacity: isDark ? 0.35 : 0.45 },
					},
				},
			},
			detectRetina: true,
		}),
		[isDark],
	);

	if (!ready) return null;

	return (
		<Particles
			id='tsparticles'
			className='pointer-events-none fixed inset-0 z-0'
			options={options}
		/>
	);
}
