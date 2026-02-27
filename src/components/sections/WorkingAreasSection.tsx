import FadeUp from '../ui/FadeUp'

const areas = [
	{
		icon: 'fa fa-code',
		iconColor: 'text-orange-500',
		iconBg: 'bg-orange-100',
		title: 'Frontend Development',
		desc: 'Pixel-perfect, responsive UIs with React, Next.js, TypeScript, Tailwind CSS, and modern animation libraries.',
	},
	{
		icon: 'fa-brands fa-dev',
		iconColor: 'text-blue-500',
		iconBg: 'bg-blue-100',
		title: 'Backend & API Development',
		desc: 'Scalable RESTful APIs with Node.js, Express.js, JWT auth, Redis caching, and cloud integrations.',
	},
	{
		icon: 'fa-brands fa-mdb',
		iconColor: 'text-purple-500',
		iconBg: 'bg-purple-100',
		title: 'Database Design',
		desc: 'Efficient schema design with MongoDB, Mongoose ODM, and PostgreSQL for performant data access.',
	},
	{
		icon: 'fa-brands fa-themeco',
		iconColor: 'text-pink-500',
		iconBg: 'bg-pink-100',
		title: 'Full Stack MERN Apps',
		desc: 'End-to-end application development with auth, payments (Stripe/SSLCommerz), real-time features, and deployment.',
	},
	{
		icon: 'fa-solid fa-people-pulling',
		iconColor: 'text-yellow-500',
		iconBg: 'bg-yellow-100',
		title: 'Web Mentoring',
		desc: '1-on-1 or group mentoring for aspiring developers on React, Node.js, JavaScript, and career guidance.',
	},
	{
		icon: 'fa-brands fa-docker',
		iconColor: 'text-green-500',
		iconBg: 'bg-green-100',
		title: 'Deployment & DevOps',
		desc: 'Production-ready deployments on Vercel, Netlify, and Firebase with CI/CD and performance optimization.',
	},
]

export default function WorkingAreasSection() {
	return (
		<section
			id='workings'
			className='container mx-auto flex justify-center items-center'
			style={{ padding: '80px 60px', minHeight: '100vh' }}
		>
			<div className='w-full'>
				<FadeUp>
					<p className='section-label'>What I do</p>
					<h2 className='text-4xl font-bold text-gray-900 mb-10'>
						My Working Areas
					</h2>
				</FadeUp>

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{areas.map((area, i) => (
						<FadeUp key={area.title} delay={i * 80}>
							<div className='p-8 rounded-2xl bg-card hover:shadow-xl transition-shadow group cursor-pointer border hover:border-orange-100 h-full'>
								<div
									className={`w-14 h-14 rounded-2xl ${area.iconBg} flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors`}
								>
									<i
										className={`${area.icon} ${area.iconColor} text-xl group-hover:text-white transition-colors`}
									/>
								</div>
								<h3 className='text-lg font-bold mb-2 text-gray-900'>
									{area.title}
								</h3>
								<p className='text-gray-500 text-sm leading-relaxed'>
									{area.desc}
								</p>
							</div>
						</FadeUp>
					))}
				</div>
			</div>
		</section>
	)
}
