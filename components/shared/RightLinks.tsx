import {
	Download,
	Github,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	Send,
} from "lucide-react";
import Link from "next/link";

export const SocialLinks = [
	{ name: "Github", link: "https://github.com/Kabirjonov", icon: Github },
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/oxunjon-kabirjanov-022b5325b/",
		icon: Linkedin,
	},
	{ name: "Mail", link: "https://github.com/yourusername", icon: Mail },
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
		name: "Download CV",
		link: "/resume.pdf",
		icon: Download,
	},
] as const;
export default function RightLinks() {
	return (
		<div className='fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 shadow shadow-accent-foreground  p-2 rounded-r-2xl'>
			{SocialLinks.map(item => (
				<Link
					href={item.link}
					key={item.name}
					target='_blank'
					className='relative p-2 group rounded-full border border-border  transition hover:bg-primary'
				>
					<item.icon
						size={20}
						className='group-hover:text-card transition-colors transition'
					/>
					<span
						className='
            absolute left-full ml-3
            whitespace-nowrap rounded-md
            bg-foreground text-background
            px-3 py-1 text-xs font-medium
            opacity-0 -translate-x-2
            transition-all duration-200
            group-hover:opacity-100 group-hover:translate-x-0
          '
					>
						{item.name}
					</span>
				</Link>
			))}
		</div>
	);
}
