'use client'

import FadeUp from '../ui/FadeUp'
import { Code2, ServerCog, Database, Layers, Users, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WorkArea {
	Icon: LucideIcon
	iconColor: string
	iconBg: string
	title: string
	desc: string
}

const areas: WorkArea[] = [
	{
		Icon: Code2,
		iconColor: 'text-orange-500',
		iconBg: 'bg-orange-100 dark:bg-orange-500/20',
		title: 'Frontend Development',
		desc: 'Pixel-perfect, responsive UIs with React, Next.js, TypeScript, Tailwind CSS, and modern animation libraries.',
	},
	{
		Icon: ServerCog,
		iconColor: 'text-blue-500',
		iconBg: 'bg-blue-100 dark:bg-blue-500/20',
		title: 'Backend & API Development',
		desc: 'Scalable RESTful APIs with Node.js, Express.js, JWT auth, Redis caching, and cloud integrations.',
	},
	{
		Icon: Database,
		iconColor: 'text-purple-500',
		iconBg: 'bg-purple-100 dark:bg-purple-500/20',
		title: 'Database Design',
		desc: 'Efficient schema design with MongoDB, Mongoose ODM, and PostgreSQL for performant data access.',
	},
	{
		Icon: Layers,
		iconColor: 'text-pink-500',
		iconBg: 'bg-pink-100 dark:bg-pink-500/20',
		title: 'Full Stack MERN Apps',
		desc: 'End-to-end application development with auth, payments (Stripe/SSLCommerz), real-time features, and deployment.',
	},
	{
		Icon: Users,
		iconColor: 'text-yellow-500',
		iconBg: 'bg-yellow-100 dark:bg-yellow-500/20',
		title: 'Web Mentoring',
		desc: '1-on-1 or group mentoring for aspiring developers on React, Node.js, JavaScript, and career guidance.',
	},
	{
		Icon: Rocket,
		iconColor: 'text-green-500',
		iconBg: 'bg-green-100 dark:bg-green-500/20',
		title: 'Deployment & DevOps',
		desc: 'Production-ready deployments on Vercel, Netlify, and Firebase with CI/CD and performance optimization.',
	},
]

export default function WorkingAreasSection() {
	return (
		<section
			id='workings'
			className='container mx-auto flex justify-center items-center h-screen'
		>
			<div className='w-full'>
				<FadeUp>
					<p className='section-label'>What I do</p>
					<h2 className='text-4xl font-bold text-foreground mb-10'>
						My Working Areas
					</h2>
				</FadeUp>

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{areas.map((area, i) => {
						const { Icon, iconColor, iconBg, title, desc } = area
						return (
							<FadeUp key={title} delay={i * 80}>
								<div className='group p-8 rounded-2xl h-full cursor-pointer bg-card border border-border hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
									{/* Icon box */}
									<div
										className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${iconBg} group-hover:bg-accent`}
									>
										<Icon
											size={22}
											className={`transition-colors duration-300 ${iconColor} group-hover:text-white`}
										/>
									</div>

									{/* Text */}
									<h3 className='text-lg font-bold mb-2 text-foreground'>
										{title}
									</h3>
									<p className='text-sm leading-relaxed text-muted-foreground'>
										{desc}
									</p>
								</div>
							</FadeUp>
						)
					})}
				</div>
			</div>
		</section>
	)
}
