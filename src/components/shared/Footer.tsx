import { Heart } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
	const startYear = 2019
	const currentYear = new Date().getFullYear()

	return (
		<footer className='w-full py-5 text-center border-t border-white/10'>
			<div className='container mx-auto px-4'>
				<p className='flex items-center justify-center gap-1.5 text-sm font-medium tracking-wide text-muted-foreground'>
					Made with{' '}
					<Heart
						size={20}
						className='text-red-500 fill-red-500 animate-pulse duration-1000'
					/>{' '}
					by
					<Link
						href={'https://www.ismailjosim.com'}
						className='text-foreground capitalize hover:text-primary transition-colors ease-in-out duration-200'
					>
						Md. jasim
					</Link>
				</p>
				<div className='mt-3 text-xs opacity-60 font-light flex flex-col gap-1'>
					<p>
						© {startYear}–{currentYear} All rights reserved.
					</p>
					<p>Crafting digital experiences since {startYear}.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
