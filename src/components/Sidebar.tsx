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
	Github,
	MessageCircle,
	Mail,
	Phone,
	Linkedin,
	X,
	Icon,
} from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'
import Image from 'next/image'

const navItems = [
	{ id: 'hero', label: 'Home', icon: Home },
	{ id: 'about', label: 'About Me', icon: User },
	{ id: 'skills', label: 'Skills', icon: Star },
	{ id: 'experience', label: 'Experience', icon: Briefcase },
	{ id: 'workings', label: 'Workings', icon: Radio },
	{ id: 'projects', label: 'Projects', icon: Layers },
	{ id: 'education', label: 'Education', icon: GraduationCap },
	{ id: 'blog', label: 'Blog', icon: BookOpen },
	{ id: 'github', label: 'GitHub', icon: Github },
	{ id: 'contact', label: 'Contact', icon: MessageCircle },
]

const socialLinks = [
	{ href: 'https://github.com/ismailjosim', icon: Github },
	{ href: 'https://linkedin.com/in/ismailjosim', icon: Linkedin },
	{ href: 'https://twitter.com/ismailjosim', icon: X },
]
export default function Sidebar() {
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
		// Close sidebar on mobile
		const sidebar = document.getElementById('sidebar')
		const overlay = document.getElementById('sidebar-overlay')
		sidebar?.classList.remove('open')
		overlay?.classList.remove('show')
	}

	return (
		<aside id='sidebar' className='relative'>
			{/* Profile */}
			<div className='p-6 text-center border-b border-gray-100'>
				<div className='relative inline-block mb-3'>
					<div
						className='w-24 h-24 rounded-full avatar-ring mx-auto flex items-center justify-center text-3xl font-bold text-white select-none overflow-hidden'
						style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
					>
						<Image
							className='w-full h-full object-cover '
							alt='JASIM'
							src={'/person.jpeg'}
							width={500}
							height={500}
						/>
					</div>
				</div>
				<h3
					className='font-bold text-gray-900 text-base'
					style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
				>
					Md. Jasim
				</h3>
				<p className='text-xs text-purple-600 font-medium mt-1'>
					Full Stack Developer
				</p>
				<div className='flex justify-center gap-2 mt-3'>
					<a
						href='mailto:ismailjosim@yahoo.com'
						className='social-btn'
						title='Email'
					>
						<Mail className='w-4 h-4' />
					</a>
					<a
						href='https://github.com/ismailjosim'
						target='_blank'
						rel='noreferrer'
						className='social-btn'
						title='GitHub'
					>
						<Github className='w-4 h-4' />
					</a>
					<a
						href='https://linkedin.com/in/ismailjosim'
						target='_blank'
						rel='noreferrer'
						className='social-btn'
						title='LinkedIn'
					>
						<Linkedin className='w-4 h-4' />
					</a>
					<a href='tel:+8801715052808' className='social-btn' title='Phone'>
						<Phone className='w-4 h-4' />
					</a>
				</div>
			</div>

			{/* Nav */}
			<nav className='p-4 space-y-1'>
				{navItems.map(({ id, label, icon: Icon }) => (
					<button
						key={id}
						className={`nav-link w-full text-left ${active === id ? 'active' : ''}`}
						onClick={() => scrollToSection(id)}
					>
						<Icon className='w-4.5 h-4.5 shrink-0' />
						{label}
					</button>
				))}
			</nav>

			{/* Footer */}
			<div className='p-4 border-t border-gray-100 mt-2 absolute left-0 w-full bottom-0 flex justify-center items-center'>
				<div>
					<div className='text-center mb-2'>
						<p className='text-xs text-gray-400 text-center'>
							© 2026 Md. Jasim
						</p>
						<h4 className='font-semibold'>Follow Me</h4>
					</div>
					<div className='flex justify-center items-center gap-3'>
						{/* theme switcher */}
						<ThemeToggle />
						{socialLinks.map(({ href, icon: Icon }) => (
							<a
								key={href}
								href={href}
								target='_blank'
								rel='noreferrer'
								className='w-10 h-10 rounded-lg bg-gray-700 dark:bg-gray-200 flex items-center justify-center text-gray-300 dark:text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-300'
							>
								<Icon className='w-4 h-4' />
							</a>
						))}
					</div>
				</div>
			</div>
		</aside>
	)
}
