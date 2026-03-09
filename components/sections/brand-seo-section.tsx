import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function BrandSeoSection() {
	return (
		<section
			aria-labelledby='brand-overview-title'
			className='mx-auto w-full max-w-6xl px-6 py-8 sm:px-10'
		>
			<div className='rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm sm:p-8'>
				<h2
					id='brand-overview-title'
					className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'
				>
					Official Brand Page: Kabirjonov Oxunjon
				</h2>
				<p className='mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
					This is the official personal portfolio and resume website of
					 {" "}
					<strong className='text-foreground'>Kabirjonov Oxunjon</strong>, also
					 searched as Oxunjon Kabirjonov, Kabirjanov Oxunjon, and Oxunjon
					 Kabirjanov. The website includes verified profile links, selected
					 development projects, and direct contact channels.
				</p>
				<div className='mt-5 flex flex-wrap gap-3 text-sm'>
					<Link
						href='/projects'
						className='rounded-lg border border-border/80 bg-background/60 px-4 py-2 font-medium transition hover:border-primary/70'
					>
						Browse Projects
					</Link>
					<Link
						href={siteConfig.resumePath}
						className='rounded-lg border border-border/80 bg-background/60 px-4 py-2 font-medium transition hover:border-primary/70'
					>
						Download Resume
					</Link>
					<Link
						href='/#contact'
						className='rounded-lg border border-border/80 bg-background/60 px-4 py-2 font-medium transition hover:border-primary/70'
					>
						Contact
					</Link>
				</div>
			</div>
		</section>
	);
}

export function FaqSection() {
	return (
		<section
			id='faq'
			aria-labelledby='faq-title'
			className='mx-auto w-full max-w-6xl px-6 py-8 sm:px-10'
		>
			<div className='rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm sm:p-8'>
				<h2 id='faq-title' className='text-2xl font-bold tracking-tight sm:text-3xl'>
					FAQ
				</h2>
				<div className='mt-5 space-y-3'>
					<details className='rounded-lg border border-border/70 bg-background/60 p-4'>
						<summary className='cursor-pointer text-sm font-semibold sm:text-base'>
							Who is Kabirjonov Oxunjon?
						</summary>
						<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
							Kabirjonov Oxunjon is a frontend and full-stack developer from
							 Uzbekistan. This website is his official portfolio and resume page.
						</p>
					</details>
					<details className='rounded-lg border border-border/70 bg-background/60 p-4'>
						<summary className='cursor-pointer text-sm font-semibold sm:text-base'>
							Are Oxunjon Kabirjonov and Kabirjanov Oxunjon the same person?
						</summary>
						<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
							Yes. These are common spelling and name-order variations used for
							 the same personal brand.
						</p>
					</details>
					<details className='rounded-lg border border-border/70 bg-background/60 p-4'>
						<summary className='cursor-pointer text-sm font-semibold sm:text-base'>
							How can I contact Kabirjonov Oxunjon?
						</summary>
						<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
							Use the contact form on this page or reach out via Telegram,
							 LinkedIn, email ({siteConfig.email}), or phone ({siteConfig.phone}).
						</p>
					</details>
				</div>
			</div>
		</section>
	);
}
