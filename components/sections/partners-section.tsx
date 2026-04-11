"use client";

import { useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const partners = [
	{
		name: "Imarat development",
		logo: "/partners/imarat.png",
	},
	{
		name: "Texnool market",
		logo: "/partners/texnool.webp",
	},
	// {
	// 	name: "Tenzorsoft",
	// 	logo: "/partners/tenzorsoftuz_logo.jpeg",
	// },
	{
		name: "Tenzor Soft company",
		logo: "/partners/tenzorsoft-logo-3.png",
	},
];
export function Partners() {
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	return (
		<div className='mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-20'>
			{/* <h2 className='mb-8 text-2xl font-bold text-center'>Partners</h2> */}
			<Carousel
				plugins={[plugin.current]}
				opts={{
					align: "start",
					loop: true,

					// slidesToScroll: 1,
					// breakpoints: {
					// 	"(min-width: 640px)": { slidesToScroll: 2 },
					// 	"(min-width: 1024px)": { slidesToScroll: 3 },
					// },
					// containScroll: "trimSnaps",
				}}
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				className='w-full '
			>
				<CarouselContent>
					{partners.map((partner, index) => (
						<CarouselItem key={index} className='basis-1/2 lg:basis-1/3'>
							<div className='p-2'>
								<div className='flex h-40 items-center justify-center rounded-xl border p-4 shadow-sm'>
									<Image
										src={partner.logo}
										alt={partner.name}
										width={220}
										height={120}
										className='h-auto max-h-24 w-auto object-contain'
									/>
								</div>
								<h2 className='mt-3 text-center text-sm font-medium sm:text-base'>
									{partner.name}
								</h2>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
