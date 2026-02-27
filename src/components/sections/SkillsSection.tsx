import FadeUp from '../ui/FadeUp'

const skillGroups = [
	{
		label: 'Languages',
		skills: [
			'🟨 JavaScript (ES6+)',
			'🔷 TypeScript',
			'🌐 HTML5',
			'🎨 CSS3',
			'⚙️ C / C++',
		],
	},
	{
		label: 'Frontend',
		skills: [
			'⚛️ React.js',
			'▲ Next.js',
			'🔴 Redux / RTK',
			'🔄 TanStack Query',
			'🛣️ React Router',
			'📝 React Hook Form',
			'🗺️ React Leaflet',
			'⚡ Socket.io',
		],
	},
	{
		label: 'Styling & UI',
		skills: [
			'💨 Tailwind CSS',
			'🎭 Material UI',
			'🌑 Shadcn UI',
			'🐜 Ant Design',
			'🎞️ Framer Motion',
		],
	},
	{
		label: 'Backend',
		skills: [
			'🟢 Node.js',
			'🚂 Express.js',
			'🔐 JWT / OAuth',
			'🔥 Firebase Auth',
			'🔑 NextAuth',
			'📧 Nodemailer',
			'☁️ Cloudinary',
			'⏰ NodeCron',
			'🤖 OpenAI API',
			'🛂 Passport.js',
			'📄 PDFKit',
			'⚡ Redis',
		],
	},
	{
		label: 'Database',
		skills: ['🍃 MongoDB', '🔗 Mongoose ODM', '🐘 PostgreSQL'],
	},
	{
		label: 'Tools & DevOps',
		skills: [
			'🐙 Git / GitHub',
			'▲ Vercel',
			'🌐 Netlify',
			'🔥 Firebase',
			'🎨 Figma',
			'🐧 Linux',
		],
	},
	{
		label: 'Payment & Validation',
		skills: ['💳 Stripe', '💰 SSLCommerz', '✅ Zod', '📡 Axios'],
	},
]

export default function SkillsSection() {
	return (
		<section
			id='skills'
			className='container mx-auto'
			style={{ padding: '80px 60px' }}
		>
			<FadeUp>
				<p className='section-label'>What I work with</p>
				<h2 className='text-4xl font-bold text-gray-900 mb-10'>
					Technical Skills
				</h2>
			</FadeUp>

			<FadeUp delay={100}>
				<div className='space-y-8'>
					{skillGroups.map(({ label, skills }) => (
						<div key={label}>
							<h4 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-3'>
								{label}
							</h4>
							<div>
								{skills.map((skill) => (
									<span key={skill} className='tech-badge'>
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</FadeUp>
		</section>
	)
}
