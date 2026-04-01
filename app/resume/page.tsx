import ResumeBuilderPage from "@/components/pages/resume-builder-page";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowLeft, ArrowLeftToLine } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
	title: "Kabirjonov Oxunjon | Generate Resume",
	description:
		"Create a professional resume with Kabirjonov Oxunjon's online resume builder. Customize your CV, choose from templates, and download your resume in PDF format.",
	path: "/resume",
});

export default function Page() {
	return (
		<>
			<Link href='/' className='absolute top-4 left-4 text-sm  hover:underline'>
				<Button variant={"outline"} size={"sm"}>
					<ArrowLeft />
					Back
				</Button>
			</Link>
			<ResumeBuilderPage />;
		</>
	);
}
