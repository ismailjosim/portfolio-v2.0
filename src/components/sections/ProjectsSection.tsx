import { Github } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const projects = [
	{
		emoji: '🚀',
		name: 'TRAVELER',
		subtitle: 'Tour Management',
		gradient: 'from-purple-500 to-indigo-600',
		tags: ['React 19', 'TypeScript', 'Node.js', 'MongoDB'],
		title: 'Traveler — Tour Management System',
		type: 'Full Stack Web Application',
		accentColor: 'text-purple-600',
		bullets: [
			'Architected 30+ RESTful API endpoints for tours, bookings, payments & analytics',
			'JWT + Google OAuth authentication with role-based access control',
			'Cloudinary image management & Nodemailer automated notifications',
			'Deployed on Vercel with lazy loading and performance optimizations',
		],
		badges: [
			'Redux',
			'Express.js',
			'Cloudinary',
			'Nodemailer',
			'JWT',
			'Google OAuth',
			'Vercel',
		],
	},
	{
		emoji: '🎓',
		name: 'EDU PLATFORM',
		subtitle: '1000+ Students',
		gradient: 'from-green-500 to-teal-600',
		tags: ['MERN', 'Firebase', 'Stripe'],
		title: 'E-Learning Dashboard',
		type: 'Educational Platform',
		accentColor: 'text-green-600',
		bullets: [
			'Interactive course modules with progress tracking and certification',
			'Real-time live session integration with video streaming capabilities',
			'Payment integration with Stripe for course enrollment',
			'Admin dashboard for course management and student analytics',
		],
		badges: [
			'React',
			'Next.js',
			'Node.js',
			'Express',
			'MongoDB',
			'Firebase',
			'Stripe',
		],
		reverse: true,
	},
	{
		emoji: '⚡',
		name: 'REST API',
		subtitle: 'Backend · Node.js',
		gradient: 'from-orange-500 to-red-600',
		tags: ['Node.js', 'Express', 'MongoDB'],
		title: 'RESTful API Architecture',
		type: 'Backend · API Development',
		accentColor: 'text-orange-600',
		bullets: [
			'30+ RESTful endpoints with comprehensive error handling',
			'JWT authentication, rate limiting, and request validation',
			'Redis caching for optimized performance and reduced load',
			'Comprehensive API documentation with Swagger/OpenAPI',
		],
		badges: ['Express.js', 'MongoDB', 'JWT', 'Redis', 'Axios', 'Swagger'],
	},
]

export default function ProjectsSection() {
	return (
		<section id='projects' className='bg-card' style={{ padding: '80px 60px' }}>
			<div className='container mx-auto'>
				<FadeUp>
					<p className='section-label'>Things I&apos;ve built</p>
					<h2 className='text-4xl font-bold text-gray-900 mb-12'>
						Featured Projects
					</h2>
				</FadeUp>

				<div className='space-y-12'>
					{projects.map((project, i) => (
						<FadeUp key={project.name} delay={i * 100}>
							<div className='project-card-hybrid group overflow-hidden rounded-2xl border border-gray-200 hover:border-purple-300 transition-all'>
								<div
									className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${project.reverse ? 'direction-reverse' : ''}`}
								>
									{/* Visual Side */}
									<div
										className={`bg-linear-to-br ${project.gradient} relative overflow-hidden min-h-80 md:min-h-auto flex items-center justify-center ${project.reverse ? 'order-2 md:order-1' : ''}`}
									>
										<div
											style={{
												textAlign: 'center',
												position: 'relative',
												zIndex: 1,
											}}
										>
											<div style={{ fontSize: '56px', marginBottom: '16px' }}>
												{project.emoji}
											</div>
											<div
												style={{
													fontFamily: "'Cabinet Grotesk',sans-serif",
													fontSize: '32px',
													fontWeight: 700,
													color: 'rgba(255,255,255,0.95)',
												}}
											>
												{project.name}
											</div>
											<div
												style={{
													fontSize: '12px',
													color: 'rgba(255,255,255,0.7)',
													marginTop: '8px',
													textTransform: 'uppercase',
													letterSpacing: '1px',
												}}
											>
												{project.subtitle}
											</div>
										</div>
										<div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8'>
											<p className='text-white text-sm leading-relaxed'>
												{project.bullets[0]}
											</p>
										</div>
									</div>

									{/* Content Side */}
									<div
										className={`p-8 flex flex-col justify-between ${project.reverse ? 'order-1 md:order-2' : ''}`}
									>
										<div>
											<div className='flex flex-wrap gap-2 mb-4'>
												{project.tags.map((tag) => (
													<span key={tag} className='tech-tag'>
														{tag}
													</span>
												))}
											</div>
											<h3 className='text-2xl font-bold text-gray-900 mb-2'>
												{project.title}
											</h3>
											<p className='text-gray-500 text-sm mb-6'>
												{project.type}
											</p>

											<ul className='space-y-3 mb-6'>
												{project.bullets.map((b) => (
													<li
														key={b}
														className='flex gap-3 text-sm text-gray-600'
													>
														<span
															className={`${project.accentColor} font-bold shrink-0 mt-0.5`}
														>
															✓
														</span>
														<span>{b}</span>
													</li>
												))}
											</ul>

											<div className='flex flex-wrap gap-2 mb-6'>
												{project.badges.map((b) => (
													<span key={b} className='tech-badge'>
														{b}
													</span>
												))}
											</div>
										</div>

										<a
											href='https://github.com/ismailjosim'
											target='_blank'
											rel='noreferrer'
											className='btn-primary inline-flex items-center gap-2 w-fit'
										>
											<Github className='w-4 h-4' />
											View on GitHub
										</a>
									</div>
								</div>
							</div>
						</FadeUp>
					))}
				</div>

				<FadeUp delay={200}>
					<p className='text-center text-gray-400 text-sm mt-12'>
						More projects coming soon — follow me on{' '}
						<a
							href='https://github.com/ismailjosim'
							className='text-purple-600 font-semibold hover:underline'
							target='_blank'
							rel='noreferrer'
						>
							GitHub
						</a>
					</p>
				</FadeUp>
			</div>
		</section>
	)
}
