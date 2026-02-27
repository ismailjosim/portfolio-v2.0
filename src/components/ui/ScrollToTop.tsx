'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const handleScroll = () => setShow(window.scrollY > 300)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<button
			id='scrollToTop'
			className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 ${
				show ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			<ArrowUp className='w-5 h-5' />
		</button>
	)
}
