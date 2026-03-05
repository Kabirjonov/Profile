import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectSection } from "@/components/sections/project-section";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import RightLinks from "@/components/shared/RightLinks";

export default async function HomePage() {
	return (
		<main className='relative min-h-screen bg-background text-foreground overflow-hidden'>
			<BackgroundParticles />
			<RightLinks />
			<div className='relative z-10'>
				<HeroSection />
				<AboutSection />
				<ProjectSection />
				{/* <SkillsSection /> */}
				<ContactSection />
			</div>
		</main>
	);
}
