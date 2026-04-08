import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { BrandSeoSection } from "@/components/sections/brand-seo-section";
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
import { Partners } from "@/components/sections/partners-section";
import ClientsNotes from "@/components/sections/clientsNotes";

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
	const ClientNotes = [
		{
			id: 1,
			name: "Alisher Karimov",
			createdAt: "2024-03-10",
			avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
			position: "Frontend Developer at TechSolutions",
			from: "Tashkent, Uzbekistan",
			note: "Bu juda ajoyib tajriba bo'ldi! Kabirjonov bilan ishlash juda yoqimli va samarali bo'ldi. U har doim o'z ishiga jiddiy yondashadi va har bir detalga e'tibor beradi. Uning texnik bilimlari va ijodkorligi bizning loyihamizni yangi darajaga olib chiqdi.",
		},
		{
			id: 2,
			name: "Maria Garcia",
			position: "Product Manager at InnovateX",
			createdAt: "2024-02-20",
			from: "Berlin, Germany",
			avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
			note: "Kabirjonov's attention to detail and innovative approach made a significant impact on our product development. His ability to understand our needs and deliver exceptional solutions was truly impressive.",
		},
		{
			id: 3,
			name: "Ivan Petrov",
			position: "CTO at FutureTech",
			createdAt: "2024-01-15",
			from: "Moscow, Russia",
			avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
			note: "Технические знания и навыки решения проблем Кабиржонова сыграли решающую роль в преодолении сложных задач в ходе нашего проекта. Его умение работать в команде и стремление к совершенству сделали его бесценным членом нашей команды.",
		},
		{
			id: 4,
			name: "Emily Davis",
			position: "Lead Designer at CreativeWorks",
			createdAt: "2024-04-05",
			from: "San Francisco, USA",
			avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
			note: "Kabirjonov's creativity and design expertise brought our vision to life in ways we never imagined. His collaborative spirit and dedication to excellence made him an invaluable asset to our team.",
		},
		{
			id: 5,
			name: "Sarah Johnson",
			position: "Marketing Director at GrowthHack",
			createdAt: "2024-03-20",
			from: "New York, USA",
			avatarUrl: "https://randomuser.me/api/portraits/women/38.jpg",
			note: "Kabirjonov's strategic thinking and innovative approach helped us achieve our marketing goals. His ability to deliver results under pressure is truly commendable.",
		},
		{
			id: 6,
			name: "David Wilson",
			position: "Sales Director at SalesPro",
			createdAt: "2024-02-10",
			from: "London, UK",
			avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
			note: "Kabirjonov's sales expertise and client relationship skills have significantly contributed to our growth. His professionalism and dedication are truly impressive.",
		},
	];
	return (
		<main>
			<JsonLd id='webpage-jsonld' data={webPageJsonLd} />
			<JsonLd id='profilepage-jsonld' data={profilePageJsonLd} />
			<JsonLd id='faq-jsonld' data={faqJsonLd} />
			<Navbar />
			<div className='relative min-h-screen bg-background text-foreground overflow-hidden'>
				<BackgroundParticles />
				<RightLinks />
				{/* <ChatWidget /> */}
				<div className='relative z-10'>
					<HeroSection />
					<Partners />
					{/* <BrandSeoSection /> */}
					<AboutSection />
					<ProjectSection />
					{/* <SkillsSection /> */}
					{/* <FaqSection /> */}
					<ContactSection />
					<ClientsNotes notes={ClientNotes} />
					<Footer />
				</div>
			</div>
		</main>
	);
}
