import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return [
		{
			url: siteConfig.url,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${siteConfig.url}/projects`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${siteConfig.url}${siteConfig.resumePath}`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
