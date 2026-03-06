"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine: Engine) => {
			await loadFull(engine);
		}).then(() => setReady(true));
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
				color: { value: "#ffffff" },
				links: {
					enable: true,
					color: "#ffffff",
					opacity: 0.18,
					distance: 130,
					width: 1,
				},
				move: {
					enable: true,
					speed: 0.8,
					outModes: { default: "out" },
				},
				size: { value: { min: 1, max: 2 } },
				opacity: { value: 0.45 },
			},
			interactivity: {
				events: {
					onHover: { enable: true, mode: "grab" },
					resize: { enable: true },
				},
				modes: {
					grab: {
						distance: 140,
						links: { opacity: 0.35 },
					},
				},
			},
			detectRetina: true,
		}),
		[],
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
