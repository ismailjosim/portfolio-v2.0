'use client'

import { useEffect, useRef } from 'react'
import FadeUp from '../ui/FadeUp'

export default function AboutSection() {
	const swiperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Simple CSS-based slideshow without swiper dependency issues
		const slides = swiperRef.current?.querySelectorAll('.slide-image')
		if (!slides || slides.length === 0) return

		let current = 0
		;(slides[0] as HTMLElement).style.opacity = '1'

		const interval = setInterval(() => {
			;(slides[current] as HTMLElement).style.opacity = '0'
			current = (current + 1) % slides.length
			;(slides[current] as HTMLElement).style.opacity = '1'
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	const info = [
		{ label: '📍 Location', value: 'Bangladesh' },
		{ label: '📞 Phone', value: '+880-1715-052-808' },
		{ label: '📧 Email', value: 'ismailjosim@yahoo.com' },
		{ label: '🌐 Languages', value: 'EN / BN / HI' },
	]

	return (
		<section
			id='about'
			className='flex justify-center items-center bg-card'
			style={{ padding: '80px 60px', minHeight: '100vh' }}
		>
			<div className='container mx-auto'>
				<FadeUp>
					<p className='section-label'>Get to know me</p>
					<h2 className='text-4xl font-bold text-gray-900 mb-10'>About Me</h2>
				</FadeUp>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
					<FadeUp delay={100}>
						<p className='text-gray-600 leading-relaxed mb-4'>
							I&apos;m a passionate <strong>Full Stack Developer</strong> based
							in Bangladesh, specializing in the MERN stack. Currently serving
							as a <strong>Senior Web Instructor at Programming Hero</strong>, I
							lead advanced workshops and help shape the next generation of
							developers.
						</p>
						<p className='text-gray-600 leading-relaxed mb-6'>
							I thrive at the intersection of clean code and great teaching.
							Whether building scalable production APIs, architecting frontend
							interfaces, or crafting curriculum materials — I bring the same
							level of care and precision to everything I do.
						</p>
						<div className='grid grid-cols-2 gap-4 text-sm'>
							{info.map(({ label, value }) => (
								<div key={label}>
									<span className='text-gray-400'>{label}</span>
									<p className='font-semibold text-gray-800 text-xs'>{value}</p>
								</div>
							))}
						</div>
					</FadeUp>

					<FadeUp delay={200}>
						<div
							ref={swiperRef}
							className='slideshow-container relative'
							style={{
								height: '400px',
								borderRadius: '12px',
								overflow: 'hidden',
							}}
						>
							{['/about-slide-01.jpg', '/about-slide-02.jpg'].map((src, i) => (
								<img
									key={src}
									src={src}
									alt={`About slide ${i + 1}`}
									className='slide-image absolute inset-0 w-full h-full object-cover'
									style={{
										opacity: 0,
										transition: 'opacity 0.8s ease-in-out',
									}}
								/>
							))}
						</div>
					</FadeUp>
				</div>
			</div>
		</section>
	)
}
