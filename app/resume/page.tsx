import { JsonLd } from "@/components/seo/json-ld";
import ResumeBuilderPage from "@/components/pages/resume-builder-page";
import { Button } from "@/components/ui/button";
import {
	buildPageMetadata,
	buildResumeBuilderFaqSchema,
	buildResumeBuilderSchema,
} from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
	title: "AI Resume Builder & CV Generator PDF | Kabirjonov Oxunjon",
	description:
		"Create a professional resume online with this resume builder and CV generator. Customize fonts, colors, themes, background, and export your resume as a PDF.",
	path: "/resume",
	keywords: [
		"resume builder",
		"cv builder",
		"resume generator",
		"cv generator",
		"pdf resume builder",
		"create resume online",
		"professional resume maker",
		"online cv maker",
		"resume builder uzbekistan",
		"multilingual resume builder",
	],
	images: ["/profile.png"],
});

export default function Page() {
	const resumeBuilderJsonLd = buildResumeBuilderSchema();
	const resumeBuilderFaqJsonLd = buildResumeBuilderFaqSchema();

	return (
		<>
			<JsonLd id='resume-builder-jsonld' data={resumeBuilderJsonLd} />
			<JsonLd id='resume-builder-faq-jsonld' data={resumeBuilderFaqJsonLd} />
			<Link href='/' className='absolute top-4 left-4 text-sm  hover:underline'>
				<Button variant={"outline"} size={"sm"}>
					<ArrowLeft />
					Back
				</Button>
			</Link>
			<ResumeBuilderPage />
		</>
	);
}
