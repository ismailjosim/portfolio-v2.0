import Image from 'next/image'
import FadeUp from '../ui/FadeUp'

const githubStats = [
	{ icon: 'fa fa-code-fork', number: '50+', label: 'Repositories' },
	{ icon: 'fa fa-star', number: '200+', label: 'Stars' },
	{ icon: 'fa fa-code', number: '1000+', label: 'Commits' },
	{ icon: 'fa fa-users', number: '30+', label: 'Followers' },
]

export default function GitHubSection() {
	return (
		<section
			id='github'
			className='bg-linear-to-b from-white to-gray-50 flex justify-center items-center'
			style={{ padding: '80px 60px', minHeight: '100vh' }}
		>
			<div className='container mx-auto'>
				<FadeUp>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-purple-600 mb-4'>
							My GitHub Contributions
						</h2>
						<p className='text-gray-600'>
							Here&apos;s a snapshot of my recent activity on GitHub.
						</p>
					</div>
				</FadeUp>

				<FadeUp delay={100}>
					<div className='bg-card border border-gray-200 dark:border-gray-700 rounded-xl p-8'>
						<div className='flex justify-center items-center bg-gray-50 rounded-lg p-5 min-h-36 overflow-x-auto mb-6'>
							<img
								src='https://ghchart.rshah.org/6C63FF/ismailjosim'
								alt='GitHub Contribution Graph'
								style={{
									maxWidth: '100%',
									height: 'auto',
									display: 'block',
									filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
								}}
							/>
						</div>
						<div className='border border-gray-200 rounded-lg p-6 text-center'>
							<p className='text-gray-600 text-sm mb-4'>
								<i className='fa fa-info-circle text-purple-600 mr-2' />
								This section dynamically loads your actual GitHub contribution
								graph and statistics.
							</p>
							<a
								href='https://github.com/ismailjosim'
								target='_blank'
								rel='noreferrer'
								className='text-purple-600 font-semibold hover:text-purple-700 transition-colors'
							>
								View My GitHub Profile →
							</a>
						</div>
					</div>
				</FadeUp>

				{/* <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
					{githubStats.map((stat, i) => (
						<FadeUp key={stat.label} delay={i * 80}>
							<div className='github-stat-card'>
								<div
									className='w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0'
									style={{
											background:
												'linear-gradient(135deg, var(--avatar-ring-1) 0%, var(--tech-border) 100%)',
											color: 'var(--accent)',
										}}
								>
									<i className={stat.icon} />
								</div>
								<div>
									<div className='text-xl font-bold text-gray-900'>
										{stat.number}
									</div>
									<div className='text-sm text-gray-400 mt-1'>{stat.label}</div>
								</div>
							</div>
						</FadeUp>
					))}
				</div> */}
			</div>
		</section>
	)
}
