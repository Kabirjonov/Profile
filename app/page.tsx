import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectSection } from "@/components/sections/project-section";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import { Footer } from "@/components/shared/footer";
import RightLinks from "@/components/shared/RightLinks";

export const metadata: Metadata = {
	title: "Kabirjonov Oxunjon | Official Portfolio",
	description:
		"Official website of Kabirjonov Oxunjon (Oxunjon Kabirjonov): resume, portfolio projects, experience, and contact details.",
	alternates: {
		canonical: "/",
	},
};

export default async function HomePage() {
	return (
		<main>
			<Navbar />
			<div className='relative min-h-screen bg-background text-foreground overflow-hidden'>
				<BackgroundParticles />
				<RightLinks />
				<div className='relative z-10'>
					<HeroSection />
					<AboutSection />
					<ProjectSection />
					{/* <SkillsSection /> */}
					<ContactSection />
					<Footer />
				</div>
			</div>
		</main>
	);
}
