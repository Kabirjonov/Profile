"use client";
// in this component we will show the clients notes about me
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface ClientsNotesProps {
	notes: {
		id: number;
		name: string;
		note: string;
		createdAt: string;
		from?: string;
		position?: string;
		avatarUrl?: string;
	}[];
}

const ClientsNotes = ({ notes }: ClientsNotesProps) => {
	const router = useRouter();
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<section
			id='clients-notes'
			className='mx-auto relative w-full max-w-6xl px-4 pb-12 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pt-20'
		>
			<h2 className='text-3xl font-bold mb-8 text-center dark:text-white text-primary'>
				Clients Notes
			</h2>
			<div className='space-y-4 '>
				<Carousel
					plugins={[plugin.current]}
					opts={{
						align: "start",
						loop: true,
					}}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
					className='w-full '
				>
					<CarouselContent>
						{notes.map(note => (
							<CarouselItem key={note.id} className='basis-1/3'>
								<div className='p-4 border rounded-md shadow-lg bg-background/50 border-primary'>
									<div className='flex items-center space-x-4 mb-4'>
										<img
											src={note.avatarUrl || "https://via.placeholder.com/40"}
											alt={note.name}
											className='w-10 h-10 rounded-full object-cover'
										/>
										<div>
											<h3 className='text-lg font-semibold dark:text-white text-primary'>
												{note.name}
											</h3>
											<p className='text-sm text-gray-400'>
												{note.position}
												<span className='font-bold text-foreground'>
													{note.from && `- ${note.from}`}
												</span>
											</p>
										</div>
									</div>
									<p className='text-card-foreground'>{note.note}</p>
									<p className='text-sm text-gray-400 mt-2'>
										{note.createdAt &&
											`Created at: ${new Date(note.createdAt).toLocaleDateString()}`}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
};

export default ClientsNotes;
