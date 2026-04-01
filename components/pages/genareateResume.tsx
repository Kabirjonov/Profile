import { buildPageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
	title: "Generate Resume | Kabirjonov Oxunjon",
	description:
		"Generate a professional resume with our easy-to-use builder. Customize your layout, add sections, and download your resume in PDF format.",
	path: "/generate",
});
export default function GenerateResumeClient() {
	return <div>generateResume</div>;
}
