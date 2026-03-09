import type { Metadata } from "next";

import ProjectsPageClient from "@/components/pages/projects-page-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
	title: "Projects | Kabirjonov Oxunjon",
	description:
		"Selected software projects by Kabirjonov Oxunjon, including frontend and full-stack work.",
	path: "/projects",
});

export default function ProjectsPage() {
	return <ProjectsPageClient />;
}
