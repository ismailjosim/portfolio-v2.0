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
			className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors'
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
