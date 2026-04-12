'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function NotFound() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [glitch, setGlitch] = useState(false)

	// =========================
	// Background Particle Canvas
	// =========================
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resize()
		window.addEventListener('resize', resize)

		const colors = [
			'hsl(var(--primary))',
			'hsl(var(--accent))',
			'hsl(187,100%,42%)',
		]

		const particles = Array.from({ length: 70 }).map(() => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			size: Math.random() * 2,
			alpha: Math.random() * 0.5 + 0.2,
			color: colors[Math.floor(Math.random() * colors.length)],
		}))

		let animationId: number

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			particles.forEach((p) => {
				p.x += p.vx
				p.y += p.vy

				if (p.x < 0 || p.x > canvas.width) p.vx *= -1
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
				ctx.fillStyle = p.color
				ctx.globalAlpha = p.alpha
				ctx.fill()
			})

			ctx.globalAlpha = 1
			animationId = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			cancelAnimationFrame(animationId)
			window.removeEventListener('resize', resize)
		}
	}, [])

	// =========================
	// Glitch Effect
	// =========================
	useEffect(() => {
		const interval = setInterval(() => {
			setGlitch(true)
			setTimeout(() => setGlitch(false), 200)
		}, 3500)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative flex min-h-screen items-center justify-center bg-background text-foreground dark:bg-black dark:text-white overflow-hidden'>
			{/* Canvas */}
			<canvas
				ref={canvasRef}
				className='fixed inset-0 -z-10 opacity-50 dark:opacity-25'
			/>

			{/* Subtle Glow */}
			<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(1,180,186,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(1,180,186,0.03),transparent_70%)]' />

			{/* Content */}
			<div className='z-10 flex flex-col items-center text-center px-6 animate-in fade-in slide-in-from-bottom-6 duration-700'>
				{/* Badge */}
				<div className='mb-8 flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs uppercase tracking-widest text-accent dark:border-accent/50 dark:bg-accent/20 dark:text-accent'>
					<span className='h-2 w-2 rounded-full bg-accent animate-pulse dark:bg-accent/80' />
					Error 404
				</div>

				{/* 404 Number */}
				<div className='relative mb-6'>
					<h1
						className={`text-[clamp(6rem,18vw,12rem)] font-black tracking-tight bg-linear-to-br from-primary via-accent to-primary bg-clip-text text-transparent transition-transform duration-200 ${
							glitch ? 'translate-x-1 -translate-y-1' : ''
						} dark:from-primary/80 dark:via-accent/80 dark:to-primary/80`}
						style={{
							fontFamily: 'Cabinet Grotesk, sans-serif',
						}}
					>
						404
					</h1>
				</div>

				{/* Divider */}
				<div className='mb-6 h-px w-24 bg-linear-to-r from-transparent via-primary to-transparent dark:via-primary/60' />

				{/* Title */}
				<h2 className='mb-3 text-xl font-semibold tracking-wide uppercase text-foreground dark:text-white'>
					Page Not Found
				</h2>

				{/* Description */}
				<p className='mb-8 max-w-md text-muted-foreground dark:text-muted-foreground/70'>
					The page you’re looking for may have been moved, deleted, or never
					existed.
				</p>

				{/* Buttons */}
				<div className='flex flex-wrap justify-center gap-4'>
					<Button asChild size='lg'>
						<Link href='/'>← Back Home</Link>
					</Button>

					<Button asChild variant='outline' size='lg'>
						<Link href='/#contact'>Contact Me</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
