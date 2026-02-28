'use client'

import { useEffect, useRef } from 'react'
import { Mail, Layers, Trophy, CheckCircle2 } from 'lucide-react'

const texts = [
	'Full Stack Developer',
	'MERN Stack Expert',
	'Senior Web Instructor',
	'Open Source Enthusiast',
]

const stats = [
	{ value: '3+', label: 'Years Experience' },
	{ value: '2K+', label: 'Students Taught' },
	{ value: '30+', label: 'API Endpoints Built' },
	{ value: '5+', label: 'Projects Deployed' },
]

export default function HeroSection() {
	const typedRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		let ti = 0,
			ci = 0,
			deleting = false
		let timeout: ReturnType<typeof setTimeout>

		function type() {
			const el = typedRef.current
			if (!el) return
			const current = texts[ti]

			if (!deleting) {
				el.textContent = current.slice(0, ++ci)
				if (ci === current.length) {
					deleting = true
					timeout = setTimeout(type, 1500)
					return
				}
			} else {
				el.textContent = current.slice(0, --ci)
				if (ci === 0) {
					deleting = false
					ti = (ti + 1) % texts.length
				}
			}

			timeout = setTimeout(type, deleting ? 60 : 100)
		}

		type()
		return () => clearTimeout(timeout)
	}, [])

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
	}

	return (
		<section
			id='hero'
			className='relative overflow-hidden min-h-screen flex items-center px-6 md:px-16 bg-linear-to-br from-background to-secondary/40'
		>
			{/* Background Blobs */}
			<div className='absolute -top-24 -right-16 w-100 h-100 bg-primary/20 rounded-full blur-3xl' />
			<div className='absolute bottom-10 left-20 w-70 h-70 bg-accent/20 rounded-full blur-3xl' />

			<div className='w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center relative z-10'>
				{/* LEFT */}
				<div>
					<p className='uppercase tracking-widest text-sm font-semibold text-primary mb-4'>
						👋 Hello, I’m
					</p>

					<h1 className='text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-3'>
						Md. Jasim
					</h1>

					<div className='flex items-center gap-2 text-2xl font-semibold text-muted-foreground mb-6 min-h-8'>
						<span ref={typedRef} />
						<span className='cursor' />
					</div>

					<p className='text-muted-foreground text-lg max-w-xl leading-relaxed mb-8'>
						Full Stack Developer & Senior Web Instructor at{' '}
						<a
							href='https://web.programming-hero.com/home'
							target='_blank'
							className='text-primary font-semibold'
						>
							Programming Hero
						</a>
						<br />I build scalable web apps with React, Node.js, and MongoDB —
						and teach 1000+ students to do the same.
					</p>

					{/* Buttons */}
					<div className='flex flex-wrap gap-4 mb-12'>
						<a
							href='mailto:ismailjosim@yahoo.com'
							className='flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:scale-105 transition'
						>
							<Mail size={16} />
							Hire Me
						</a>

						<button
							onClick={() => scrollToSection('projects')}
							className='flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition'
						>
							<Layers size={16} />
							View Projects
						</button>
					</div>

					{/* Stats */}
					<div className='flex flex-wrap sm:justify-start justify-center items-center lg:gap-8 md:gap-12 gap-16'>
						{stats.map((stat, i) => (
							<div
								key={stat.label}
								className='flex justify-center text-center items-center gap-8'
							>
								{i > 0 && (
									<div className='hidden sm:block w-px h-10 bg-border' />
								)}
								<div className='text-center'>
									<div className='text-3xl font-extrabold text-primary'>
										{stat.value}
									</div>
									<div className='text-sm text-muted-foreground mt-1'>
										{stat.label}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* RIGHT */}
				<div className='relative flex justify-center lg:justify-end'>
					{/* Image */}
					<div
						className='hero-morph w-72 h-72 lg:w-150 lg:h-150 md:w-110 md:h-110 bg-center bg-cover'
						style={{ backgroundImage: "url('/person.jpeg')" }}
					/>

					{/* Glow */}
					<div className='absolute w-150 h-150 bg-primary/10 rounded-full blur-3xl -z-10' />

					{/* Floating Badge 1 */}
					<div className='absolute sm:-top-4 -top-10 sm:-right-6 -right-8 bg-card shadow-xl rounded-2xl p-4 flex items-center gap-3 float-y'>
						<div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
							<Trophy size={18} className='text-orange-500' />
						</div>
						<div>
							<div className='font-bold text-sm text-foreground'>3+ Years</div>
							<div className='text-xs text-muted-foreground'>Experience</div>
						</div>
					</div>

					{/* Floating Badge 2 */}
					<div className='absolute lg:bottom-6 bottom-1 lg:left-20 -left-10 bg-card shadow-xl rounded-2xl p-4 flex items-center gap-3 float-y [animation-delay:1.5s] border sm:border-transparent'>
						<div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
							<CheckCircle2 size={18} className='text-green-500' />
						</div>
						<div>
							<div className='font-bold text-sm text-foreground'>200+</div>
							<div className='text-xs text-muted-foreground'>Projects Done</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
