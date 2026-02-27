import FadeUp from '../ui/FadeUp'

const experiences = [
	{
		title: 'Senior Web Instructor',
		company: 'Programming Hero — Remote, Bangladesh',
		period: 'Apr 2025 – Present',
		bullets: [
			'Led advanced MERN stack workshops and supported junior instructors',
			'Reviewed and improved course content for technical quality & industry alignment',
		],
	},
	{
		title: 'Web Instructor',
		company: 'Programming Hero — Remote, Bangladesh',
		period: 'Jul 2023 – Apr 2025',
		bullets: [
			'Taught full-stack development to 1000+ students (React, Node.js, Express.js, MongoDB)',
			'Delivered live coding support sessions and designed project-based learning modules',
			'Developed curriculum materials and conducted debugging workshops',
		],
	},
	{
		title: 'Web Instructor (Intern)',
		company: 'Programming Hero — Remote, Bangladesh',
		period: 'Apr 2023 – Jun 2023',
		bullets: [
			'Assisted in live classes, demo projects, and debugging tasks',
			'Gained hands-on experience with educational content delivery',
		],
	},
	{
		title: 'Web Developer (Intern)',
		company: 'Winsple — Remote, Bengaluru, India',
		period: 'Jan 2023 – Feb 2023',
		bullets: [
			'Built React-based web applications and integrated REST APIs for production',
			'Collaborated with backend developers on cross-functional team projects',
		],
	},
]

const stats = [
	{
		value: '3+',
		label: 'Years Experience',
		color: 'text-orange-500',
		bg: 'bg-orange-50',
	},
	{
		value: '2000+',
		label: 'Students Mentor',
		color: 'text-blue-500',
		bg: 'bg-blue-50',
	},
	{
		value: '150+',
		label: 'Github Repositories',
		color: 'text-purple-500',
		bg: 'bg-purple-50',
	},
	{
		value: '10+',
		label: 'Full Stack Project',
		color: 'text-green-500',
		bg: 'bg-green-50',
	},
	{
		value: '11200+',
		label: 'Student Problems Solved',
		color: 'text-cyan-500',
		bg: 'bg-green-50',
	},
	{
		value: '1500+',
		label: 'Hours Live Session',
		color: 'text-pink-500',
		bg: 'bg-green-50',
	},
]

export default function ExperienceSection() {
	return (
		<section
			id='experience'
			className='bg-card'
			style={{ padding: '80px 60px' }}
		>
			<div
				className='container mx-auto flex justify-center items-center'
				style={{ minHeight: '100vh' }}
			>
				<div className='w-full'>
					<FadeUp>
						<p className='section-label'>My journey</p>
						<h2 className='text-4xl font-bold text-gray-900 mb-10'>
							Work Experience
						</h2>
					</FadeUp>

					<div className='grid grid-cols-2 gap-10'>
						<FadeUp delay={100}>
							<div className='space-y-10'>
								{experiences.map((exp) => (
									<div key={exp.title} className='timeline-item'>
										<div className='flex flex-wrap justify-between items-start gap-2 mb-2'>
											<div>
												<h3 className='text-xl font-bold text-gray-900'>
													{exp.title}
												</h3>
												<p className='text-purple-600 font-semibold text-sm'>
													{exp.company}
												</p>
											</div>
											<span className='skill-pill'>{exp.period}</span>
										</div>
										<ul className='space-y-1 text-gray-600 text-sm mt-3 list-disc list-inside'>
											{exp.bullets.map((b) => (
												<li key={b}>{b}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</FadeUp>

						<FadeUp delay={200}>
							<div className='grid grid-cols-2 gap-6'>
								{stats.map(({ value, label, color, bg }) => (
									<div
										key={label}
										className={`text-center p-12 ${bg} rounded-2xl`}
									>
										<div className={`text-5xl font-black ${color} mb-2`}>
											{value}
										</div>
										<div className='text-gray-600 font-medium'>{label}</div>
									</div>
								))}
							</div>
						</FadeUp>
					</div>
				</div>
			</div>
		</section>
	)
}
