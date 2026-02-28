'use client'

import { useEffect, useRef } from 'react'
import FadeUp from '../ui/FadeUp'
import { Phone, MapPin, Mail, Languages } from 'lucide-react'

export default function AboutSection() {
	const swiperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const slides =
			swiperRef.current?.querySelectorAll<HTMLImageElement>('.slide-image')
		if (!slides || slides.length === 0) return

		let current = 0
		slides[0].classList.add('opacity-100')

		const interval = setInterval(() => {
			slides[current].classList.remove('opacity-100')
			slides[current].classList.add('opacity-0')

			current = (current + 1) % slides.length

			slides[current].classList.remove('opacity-0')
			slides[current].classList.add('opacity-100')
		}, 3500)

		return () => clearInterval(interval)
	}, [])

	const info = [
		{ label: 'Location', value: 'Bangladesh', icon: MapPin },
		{ label: 'Phone', value: '+880-1715-052-808', icon: Phone },
		{ label: 'Email', value: 'ismailjosim@yahoo.com', icon: Mail },
		{ label: 'Languages', value: 'EN / BN / HI', icon: Languages },
	]

	return (
		<section
			id='about'
			className='bg-card sm:h-screen flex justify-center items-center'
		>
			<div className='container mx-auto px-6'>
				{/* Section Heading */}
				<FadeUp>
					<p className='uppercase tracking-widest text-sm font-semibold text-primary mb-3'>
						Get to know me
					</p>
					<h2 className='text-4xl md:text-5xl font-extrabold text-foreground'>
						About Me
					</h2>
				</FadeUp>

				<div className='grid md:grid-cols-2 lg:gap-16 md:gap-10 gap-6 items-start mt-10'>
					{/* LEFT CONTENT */}
					<FadeUp delay={100}>
						<p className='text-muted-foreground text-lg leading-relaxed mb-5 text-justify'>
							I’m a passionate{' '}
							<span className='text-primary font-semibold'>
								Full Stack Developer
							</span>{' '}
							based in Bangladesh, specializing in the MERN stack. Currently
							serving as a{' '}
							<span className='text-primary font-semibold'>
								Senior Web Instructor at Programming Hero
							</span>
							, I lead advanced workshops and mentor aspiring developers.
						</p>

						<p className='text-muted-foreground leading-relaxed text-justify text-lg mb-12 '>
							I thrive at the intersection of clean code and impactful teaching.
							Whether building scalable APIs, architecting frontend systems, or
							designing curriculum — I bring precision and clarity to everything
							I do.
						</p>

						{/* Info Grid */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 '>
							{info.map(({ label, value, icon: Icon }) => (
								<div key={label} className='flex items-start gap-3'>
									<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
										<Icon size={18} className='text-primary' />
									</div>
									<div>
										<p className='text-xs uppercase tracking-wide text-muted-foreground'>
											{label}
										</p>
										<p className='font-semibold text-foreground text-sm'>
											{value}
										</p>
									</div>
								</div>
							))}
						</div>
					</FadeUp>

					{/* RIGHT SLIDESHOW */}
					<FadeUp delay={200}>
						<div
							ref={swiperRef}
							className='relative h-100 rounded-2xl overflow-hidden shadow-xl'
						>
							{['/about-slide-01.jpg', '/about-slide-02.jpg'].map((src, i) => (
								<img
									key={src}
									src={src}
									alt={`About slide ${i + 1}`}
									className='slide-image absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000'
								/>
							))}
						</div>
					</FadeUp>
				</div>
			</div>
		</section>
	)
}
