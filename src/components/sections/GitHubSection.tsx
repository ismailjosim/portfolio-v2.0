import { Info } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

export default function GitHubSection() {
	return (
		<section
			id='github'
			className='bg-background flex justify-center items-center py-40'
		>
			<div className='container mx-auto'>
				<FadeUp>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-accent mb-4'>
							My GitHub Contributions
						</h2>
					</div>
				</FadeUp>

				<FadeUp delay={100}>
					<div className='bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-6'>
						{/* Description */}
						<p className='text-muted-foreground text-sm'>
							Here&apos;s a snapshot of my recent activity on GitHub.
						</p>

						{/* Contribution Graph */}

						<div className='w-full overflow-x-auto flex justify-center'>
							<img
								alt='GitHub Contribution Graph for ismailjosim'
								loading='lazy'
								width='800'
								height='200'
								decoding='async'
								data-nimg='1'
								className='w-full h-auto rounded-lg mb-4 opacity-75 text-primary'
								src='https://ghchart.rshah.org/ismailjosim'
							/>
						</div>

						{/* Info + Link */}
						<p className='text-muted-foreground text-sm flex items-center gap-2'>
							<Info className='w-4 h-4 text-accent shrink-0' />
							(This section dynamically loads your actual GitHub contribution
							graph and statistics.)
						</p>

						<a
							href='https://github.com/ismailjosim'
							target='_blank'
							rel='noreferrer'
							className='text-accent font-semibold hover:underline transition-colors text-sm'
						>
							View My GitHub Profile →
						</a>
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
