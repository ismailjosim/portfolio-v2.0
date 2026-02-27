'use client'

import { useEffect, useRef } from 'react'
import { Mail, Layers } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const texts = [
	'Full Stack Developer',
	'MERN Stack Expert',
	'Senior Web Instructor',
	'Open Source Enthusiast',
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
					timeout = setTimeout(type, 1800)
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
		if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
	}

	const stats = [
		{ value: '2+', label: 'Years Experience' },
		{ value: '1K+', label: 'Students Taught' },
		{ value: '30+', label: 'API Endpoints Built' },
		{ value: '5+', label: 'Projects Deployed' },
	]

	return (
		<section
			id='hero'
			className='relative overflow-hidden min-h-screen flex items-center'
			style={{
				background: 'linear-gradient(135deg, #f9f9fc 0%, #f0eeff 100%)',
				padding: '80px 60px',
			}}
		>
			<div
				className='blob w-96 h-96'
				style={{
					position: 'absolute',
					top: '-100px',
					right: '-50px',
					background: 'var(--accent)',
				}}
			/>
			<div
				className='blob w-64 h-64'
				style={{
					position: 'absolute',
					bottom: '50px',
					left: '200px',
					background: 'var(--accent2)',
				}}
			/>

			<div className='w-full relative grid sm:grid-cols-2 sm:gap-0 gap-10 justify-between items-center'>
				<FadeUp>
					<p className='section-label'>👋 Hello, I&apos;m</p>
					<h1 className='text-6xl font-extrabold text-gray-900 leading-tight mb-2'>
						Md. Jasim
					</h1>
					<div className='flex items-center gap-2 text-2xl font-semibold text-gray-700 mb-6'>
						<span ref={typedRef} />
						<span className='cursor' />
					</div>
					<p className='text-gray-600 text-lg max-w-xl leading-relaxed mb-8'>
						Full Stack Developer &amp; Senior Web Instructor at{' '}
						<span className='text-purple-600 font-semibold'>
							Programming Hero
						</span>
						, Bangladesh. I build scalable web apps with React, Node.js, and
						MongoDB — and teach 1000+ students to do the same.
					</p>
					<div className='flex flex-wrap gap-4'>
						<a href='mailto:ismailjosim@yahoo.com' className='btn-primary'>
							<Mail className='w-4 h-4' />
							Hire Me
						</a>
						<button
							className='btn-outline'
							onClick={() => scrollToSection('projects')}
						>
							<Layers className='w-4 h-4' />
							View Projects
						</button>
					</div>

					{/* Stats */}
					<div className='flex flex-wrap gap-6 mt-12'>
						{stats.map((stat, i) => (
							<div key={stat.label} className='flex items-center gap-6'>
								{i > 0 && <div className='w-px bg-gray-200 h-10' />}
								<div className='text-center'>
									<div
										className='text-4xl font-extrabold text-purple-600'
										style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
									>
										{stat.value}
									</div>
									<div className='text-sm text-gray-500 mt-1'>{stat.label}</div>
								</div>
							</div>
						))}
					</div>
				</FadeUp>

				<FadeUp
					className='relative w-full flex justify-center sm:justify-end'
					delay={200}
				>
					<div className='hero-img' />
					<div className='hero-glow' />

					{/* Floating badges */}
					<div className='absolute -top-2 -right-4 bg-card rounded-2xl shadow-xl p-3 flex items-center gap-2'>
						<div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
							<i className='fa fa-trophy text-orange-500 text-sm' />
						</div>
						<div>
							<div className='font-bold text-sm text-gray-800'>7+ Years</div>
							<div className='text-xs text-gray-400'>Experience</div>
						</div>
					</div>

					<div className='absolute bottom-5 left-52 bg-card rounded-2xl shadow-xl p-3 flex items-center gap-2'>
						<div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
							<i className='fa fa-check text-green-500 text-sm' />
						</div>
						<div>
							<div className='font-bold text-sm text-gray-800'>200+</div>
							<div className='text-xs text-gray-400'>Projects Done</div>
						</div>
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
