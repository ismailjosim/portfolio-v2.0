'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import ThemeToggle from '../ui/ThemeToggle'
import Image from 'next/image'

const navItems = [
	{ name: 'Home', href: '#home' },
	{ name: 'About Me', href: '#about' },
	{ name: 'Technical Skills', href: '#skills' },
	{ name: 'Experiences', href: '#experience' },
	{ name: 'Projects', href: '#projects' },
	{ name: 'Education', href: '#education' },
	{ name: 'Blogs', href: '#blog' },
	{ name: 'Contact', href: '#contact' },
]

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [activeSection, setActiveSection] = useState('#home')
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)

			const sections = navItems.map((item) => item.href.substring(1))
			let current = sections[0]

			for (const section of sections) {
				const el = document.getElementById(section)
				if (el) {
					const { top, bottom } = el.getBoundingClientRect()
					if (top <= 150 && bottom >= 150) {
						current = section
						break
					}
				}
			}
			setActiveSection(`#${current}`)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className='fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none'>
			<nav
				className={cn(
					'pointer-events-auto container mx-auto flex items-center justify-between px-4 py-2.5 rounded-2xl border transition-all duration-300',
					isScrolled
						? 'bg-background/80 backdrop-blur-md border-border shadow-sm'
						: 'bg-background/50 backdrop-blur-sm border-transparent',
				)}
			>
				{/* ── Logo + availability badge ── */}
				<div className='flex flex-col justify-center'>
					<Link
						href='#home'
						className='flex items-center gap-1.5 font-bold text-lg tracking-tight text-foreground hover:text-accent transition-colors'
						style={{ fontFamily: 'Rajdhani, sans-serif' }}
					>

						<Image className='w-10 h-10 object-cover rounded-2xl' width={50} height={50} src={'/person.jpeg'} alt='Jasim'/>
					</Link>

				</div>

				{/* ── Desktop nav links (hidden below lg because 8 items need space) ── */}
				<ul className='hidden lg:flex items-center gap-0.5'>
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								className={cn(
									'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
									activeSection === item.href
										? 'bg-accent text-accent-foreground shadow-sm'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted',
								)}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				{/* ── Right actions ── */}
				<div className='flex items-center gap-2'>
					<ThemeToggle />
					{/* Mobile / tablet menu — visible below lg */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='lg:hidden rounded-2xl text-muted-foreground hover:text-accent hover:bg-muted transition-colors'
								aria-label='Open menu'
							>
								{isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
							</Button>
						</SheetTrigger>

						<SheetContent
							side='top'
							className='pt-16 rounded-b-3xl border-border bg-background'
						>
							<ul className='flex flex-col gap-1'>
								{navItems.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											onClick={() => setIsMobileMenuOpen(false)}
											className={cn(
												'block px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
												activeSection === item.href
													? 'bg-accent text-accent-foreground'
													: 'text-muted-foreground hover:text-foreground hover:bg-muted',
											)}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	)
}
