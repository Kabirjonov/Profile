"use client";
// in this component we will show the clients notes about me
import { FaRegStar, FaStarHalf } from "react-icons/fa";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

interface ClientsNotesProps {
	notes: {
		id: number;
		name: string;
		note: string;
		createdAt: string;
		from?: string;
		position?: string;
		avatarUrl?: string;
		star: number;
	}[];
}

const ClientsNotes = ({ notes }: ClientsNotesProps) => {
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<section
			id='clients-notes'
			className='mx-auto relative w-full max-w-6xl px-4 pb-12 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pt-20'
		>
			<h2 className='text-3xl font-bold mb-8 text-center dark:text-white text-primary'>
				Our Client Rewiew
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
							<CarouselItem key={note.id} className='md:basis-1/3 basis-1/2'>
								<div className='p-4 border rounded-md shadow-lg bg-background/50 border-primary'>
									<div className='flex items-center space-x-4 mb-4 border-b pb-2 border-primary'>
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
												<span className='hidden md:flex'>{note.position}</span>
												<span className='font-bold text-foreground'>
													{note.from && `- ${note.from}`}
												</span>
											</p>
										</div>
									</div>
									<p className='text-card-foreground 	md:line-clamp-6 line-clamp-3 '>
										{note.note}
									</p>
									<p className='text-sm text-gray-400 mt-2'>
										{note.createdAt &&
											`Created at: ${new Date(note.createdAt).toLocaleDateString()}`}
									</p>
									<div className='flex gap-x-0.5'>
										{/* {Array.from({ length: 4 }).map((_, index) => (
											<FaStarHalf key={index} className='text-yellow-500' />
										))} */}
										{Array.from({ length: 5 }).map((_, i) =>
											i < note.star ? (
												<FaStar key={i} className='text-yellow-500' />
											) : (
												<FaRegStar key={i} className='text-gray-400' />
											),
										)}
									</div>
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
