"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import BackgroundParticles from "@/components/shared/BackgroundParticles";

type ProjectItem = {
	title: string;
	description: string;
	stack: string[];
	liveUrl: string;
	codeUrl: string;
	status: string;
	category?: string;
	image?: string;
};

const UNSPLASH_FALLBACK_IMAGES = [
	"https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
];

function getProjectImage(project: ProjectItem, index: number) {
	if (project.image) return project.image;
	return UNSPLASH_FALLBACK_IMAGES[index % UNSPLASH_FALLBACK_IMAGES.length];
}

export default function ProjectsPage() {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
	const [status, setStatus] = useState("all");

	const projects = t("sections.project.items", {
		returnObjects: true,
	}) as ProjectItem[];

	const categories = useMemo(
		() => [
			"all",
			...Array.from(
				new Set(projects.map(item => item.category).filter(Boolean)),
			),
		],
		[projects],
	);

	const statuses = useMemo(
		() => ["all", ...Array.from(new Set(projects.map(item => item.status)))],
		[projects],
	);

	const filteredProjects = useMemo(() => {
		return projects.filter(item => {
			const text = `${item.title} ${item.description} ${item.stack.join(" ")} ${
				item.status
			} ${item.category ?? ""}`.toLowerCase();
			const matchSearch = text.includes(query.trim().toLowerCase());
			const matchCategory = category === "all" || item.category === category;
			const matchStatus = status === "all" || item.status === status;
			return matchSearch && matchCategory && matchStatus;
		});
	}, [projects, query, category, status]);

	return (
		<main className='relative min-h-screen bg-background px-6 pb-16 pt-12 text-foreground sm:px-10'>
			<BackgroundParticles />

			<section className='mx-auto w-full max-w-6xl'>
				<Link
					href={"/"}
					className='py-5 gap-1 flex items-center capitalize text-lg'
				>
					<MoveLeft size={16} />
					back
				</Link>
				<div className='rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
					<div className='max-w-3xl'>
						<h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
							{t("projectsPage.title")}
						</h1>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>
							{t("projectsPage.description")}
						</p>
					</div>

					<div className='mt-7 grid gap-3 md:grid-cols-3'>
						<div>
							<input
								type='search'
								value={query}
								onChange={event => setQuery(event.target.value)}
								placeholder={t("projectsPage.searchPlaceholder")}
								className='w-full rounded-lg border border-border  bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
							/>
						</div>
						<div>
							<select
								value={category}
								onChange={event => setCategory(event.target.value)}
								className='w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
							>
								{categories.map(item => (
									<option key={item} value={item}>
										{item === "all"
											? t("projectsPage.filters.allCategories")
											: item}
									</option>
								))}
							</select>
						</div>
						<div>
							<select
								value={status}
								onChange={event => setStatus(event.target.value)}
								className='w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
							>
								{statuses.map(item => (
									<option key={item} value={item}>
										{item === "all"
											? t("projectsPage.filters.allStatuses")
											: item}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
						{filteredProjects.map((project, index) => (
							<article
								key={`${project.title}-${index}`}
								className='rounded-2xl border border-border/70 bg-background/45 p-5'
							>
								<div className='relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted/40'>
									<Image
										src={getProjectImage(project, index)}
										alt={`${project.title} preview`}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
										className='object-cover'
									/>
								</div>
								<div className='flex items-start justify-between gap-3'>
									<h3 className='text-lg font-semibold'>{project.title}</h3>
									<span className='rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase'>
										{project.status}
									</span>
								</div>
								<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
									{project.description}
								</p>
								<div className='mt-4 flex flex-wrap gap-2'>
									{project.stack.map(tech => (
										<span
											key={tech}
											className='rounded-md border border-border/70 bg-muted px-2.5 py-1 text-xs font-medium text-foreground/90'
										>
											{tech}
										</span>
									))}
								</div>
								<div className='mt-5 flex items-center gap-3'>
									<Link
										href={project.liveUrl}
										target='_blank'
										rel='noreferrer'
										className='inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground'
									>
										{t("sections.project.viewLive")}
										<ArrowUpRight size={14} />
									</Link>
									<Link
										href={project.codeUrl}
										target='_blank'
										rel='noreferrer'
										className='inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background/70 px-3 py-2 text-xs font-semibold'
									>
										{t("sections.project.viewCode")}
										<Github size={14} />
									</Link>
								</div>
							</article>
						))}
					</div>

					{filteredProjects.length === 0 && (
						<p className='mt-8 text-sm text-muted-foreground'>
							{t("projectsPage.empty")}
						</p>
					)}
				</div>
			</section>
		</main>
	);
}
