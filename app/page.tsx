import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/sections/about-section";
import {
	BrandSeoSection,
	FaqSection,
} from "@/components/sections/brand-seo-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectSection } from "@/components/sections/project-section";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import { Footer } from "@/components/shared/footer";
import RightLinks from "@/components/shared/RightLinks";
import {
	buildFaqSchema,
	buildHomeWebPageSchema,
	buildPageMetadata,
	buildProfilePageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
	title: "Kabirjonov Oxunjon | Official Portfolio",
	description:
		"Official website of Kabirjonov Oxunjon. Portfolio projects, resume, experience, and verified contact links.",
	path: "/",
});

export default async function HomePage() {
	const webPageJsonLd = buildHomeWebPageSchema();
	const profilePageJsonLd = buildProfilePageSchema();
	const faqJsonLd = buildFaqSchema();

	return (
		<main>
			<JsonLd id='webpage-jsonld' data={webPageJsonLd} />
			<JsonLd id='profilepage-jsonld' data={profilePageJsonLd} />
			<JsonLd id='faq-jsonld' data={faqJsonLd} />
			<Navbar />
			<div className='relative min-h-screen bg-background text-foreground overflow-hidden'>
				<BackgroundParticles />
				<RightLinks />
				<div className='relative z-10'>
					<HeroSection />
					{/* <BrandSeoSection /> */}
					<AboutSection />
					<ProjectSection />
					{/* <SkillsSection /> */}
					<ContactSection />
					{/* <FaqSection /> */}
					<Footer />
				</div>
			</div>
		</main>
	);
}
