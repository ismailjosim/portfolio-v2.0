'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

export default function FadeUp({
	children,
	className = '',
	delay = 0,
}: {
	children: ReactNode
	className?: string
	delay?: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setVisible(true)
			},
			{ threshold: 0.1 },
		)
		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={`fade-up ${visible ? 'visible' : ''} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	)
}
