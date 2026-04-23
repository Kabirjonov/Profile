"use client";

import {
	ChevronRight,
	Download,
	Github,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	Send,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const SocialLinks = [
	{ name: "Github", link: "https://github.com/Kabirjonov", icon: Github },
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/oxunjon-kabirjanov-022b5325b/",
		icon: Linkedin,
	},
	{ name: "Mail", link: "mailto:info.kabirjonov@gmail.com", icon: Mail },
	{
		name: "Instagram",
		link: "https://www.instagram.com/kab1rjonov_o/",
		icon: Instagram,
	},
	{
		name: "Telegram",
		link: "https://t.me/kabirjonov_o",
		icon: Send,
	},
	{
		name: "+998 94 668 4005",
		link: "tel:+998946684005",
		icon: Phone,
	},
] as const;
export default function RightLinks() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className='fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 rounded-r-2xl border bg-background p-2 shadow-accent-foreground md:flex md:shadow'>
				{SocialLinks.map(item => (
					<Link
						href={item.link}
						key={item.name}
						target={item.link.startsWith("http") ? "_blank" : "_self"}
						className='group relative rounded-full border border-border p-2 transition hover:bg-primary'
					>
						<item.icon
							size={20}
							className='transition-colors group-hover:text-card'
						/>
						<span className='absolute left-full ml-3 -translate-x-2 whitespace-nowrap rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100'>
							{item.name}
						</span>
					</Link>
				))}
				<Link
					href='/resume.pdf'
					download
					className='group relative rounded-full border border-border p-2 transition hover:bg-primary'
				>
					<Download
						size={20}
						className='transition-colors group-hover:text-card'
					/>
					<span className='absolute left-full ml-3 -translate-x-2 whitespace-nowrap rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100'>
						Download CV
					</span>
				</Link>
			</div>

			<div className='hidden left-3 top-1/2 z-40 -translate-y-1/2 '>
				<div
					className={`flex items-center gap-2 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-xl backdrop-blur transition-all duration-300 ${
						isOpen ? "translate-x-0" : "-translate-x-1"
					}`}
				>
					<button
						type='button'
						onClick={() => setIsOpen(open => !open)}
						aria-label={isOpen ? "Close social links" : "Open social links"}
						aria-expanded={isOpen}
						className='inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground transition hover:border-primary hover:text-primary'
					>
						{isOpen ? <X size={18} /> : <ChevronRight size={18} />}
					</button>

					<div
						className={`flex origin-left items-center gap-2 overflow-hidden transition-all duration-300 ${
							isOpen
								? "max-w-[320px] scale-100 opacity-100"
								: "max-w-0 scale-95 opacity-0"
						}`}
					>
						{SocialLinks.map(item => (
							<Link
								href={item.link}
								key={item.name}
								target={item.link.startsWith("http") ? "_blank" : "_self"}
								onClick={() => setIsOpen(false)}
								className='inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-[#08224b] text-slate-100 transition hover:border-primary hover:bg-primary hover:text-primary-foreground'
								aria-label={item.name}
								title={item.name}
							>
								<item.icon size={19} />
							</Link>
						))}
						<Link
							href='/resume.pdf'
							download
							onClick={() => setIsOpen(false)}
							className='inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-[#08224b] text-slate-100 transition hover:border-primary hover:bg-primary hover:text-primary-foreground'
							aria-label='Download CV'
							title='Download CV'
						>
							<Download size={19} />
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
