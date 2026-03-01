'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const stored = localStorage.getItem('theme')
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches
		const initial =
			stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
		setTheme(initial)
		document.documentElement.classList.toggle('dark', initial === 'dark')
	}, [])

	const toggle = () => {
		const next = theme === 'light' ? 'dark' : 'light'
		setTheme(next)
		document.documentElement.classList.toggle('dark', next === 'dark')
		localStorage.setItem('theme', next)
	}

	return (
		<button
			onClick={toggle}
			className='h-9 w-9 rounded-lg border border-border text-muted-foreground bg-transparent transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent flex justify-center items-center'
			aria-label='Toggle theme'
		>
			{theme === 'light' ? (
				<Moon className='w-5 h-5' />
			) : (
				<Sun className='w-5 h-5' />
			)}
		</button>
	)
}
