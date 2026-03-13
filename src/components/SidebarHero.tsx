'use client'

import { useEffect, useState } from 'react'
import {
	Home,
	User,
	Star,
	Briefcase,
	Radio,
	Layers,
	GraduationCap,
	BookOpen,
	MessageCircle,
} from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'
import Image from 'next/image'

import SocialIcons from './modules/SocialIcons'
import { Button } from './ui/button'
import Link from 'next/link'

const navItems = [
	{ id: 'hero', label: 'Home', icon: Home },
	{ id: 'about', label: 'About Me', icon: User },
	{ id: 'skills', label: 'Skills', icon: Star },
	{ id: 'experience', label: 'Experience', icon: Briefcase },
	{ id: 'workings', label: 'Workings', icon: Radio },
	{ id: 'projects', label: 'Projects', icon: Layers },
	{ id: 'education', label: 'Education', icon: GraduationCap },
	{ id: 'blog', label: 'Blog', icon: BookOpen },
	{ id: 'contact', label: 'Contact', icon: MessageCircle },
	{ id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
]

export default function SidebarHero() {
	const [active, setActive] = useState('hero')

	useEffect(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll('section[id]')
			let current = 'hero'
			sections.forEach((s) => {
				const el = s as HTMLElement
				if (window.scrollY >= el.offsetTop - 80) current = s.id
			})
			setActive(current)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (!el) return
		window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
		const sidebar = document.getElementById('sidebar')
		const overlay = document.getElementById('sidebar-overlay')
		sidebar?.classList.remove('open')
		overlay?.classList.remove('show')
	}

	return (
		<aside id='sidebar' className='flex flex-col'>
			{/* Profile */}
			<div className='p-6 text-center border-b border-border shrink-0'>
				<div className='relative inline-block mb-3'>
					<div className='w-24 h-24 rounded-full ring-2 ring-primary mx-auto overflow-hidden'>
						<Image
							className='w-full h-full object-cover'
							alt='JASIM'
							src={'/person.jpeg'}
							width={500}
							height={500}
						/>
					</div>
				</div>
				<h3 className='font-bold text-foreground text-base'>Md. Jasim</h3>
				<p className='text-xs text-accent font-medium mt-1'>
					Full Stack Developer
				</p>
				<div className='flex justify-center gap-2 mt-3'>
					<SocialIcons.Phone />
					<SocialIcons.Email />
					<SocialIcons.WhatsApp />
				</div>
			</div>

			{/* Nav — scrollable */}
			<nav className='p-4 space-y-1 flex-1 overflow-y-auto'>
				{navItems.map(({ id, label, icon: Icon, href }) => (
					href ? (
						<Link
							key={id}
							href={href}
							className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active === id
								? 'bg-primary text-primary-foreground'
								: 'text-foreground hover:bg-secondary'
								}`}
						>
							<Icon size={18} />
							{label}
						</Link>
					) : (
						<Button
							key={id}
							variant='ghost'
							className={`w-full justify-start ${active === id ? 'bg-primary text-primary-foreground' : ''
								}`}
							onClick={() => scrollToSection(id)}
						>
							<Icon size={18} />
							{label}
						</Button>
					)
				))}

			</nav>

			{/* Footer — always visible at bottom */}
			<div className='p-4 border-t border-border shrink-0'>
				<div className='text-center'>
					<h4 className='font-semibold text-foreground text-sm uppercase tracking-widest mb-3'>
						Follow Me
					</h4>
					<div className='flex justify-center items-center gap-3 mb-3'>
						<SocialIcons.Facebook />
						<SocialIcons.Linkedin />
						<SocialIcons.Github />
						<SocialIcons.Twitter />
						<ThemeToggle />
					</div>
					<p className='text-xs text-muted-foreground'>© 2026 Md. Jasim</p>
				</div>
			</div>
		</aside>
	)
}
