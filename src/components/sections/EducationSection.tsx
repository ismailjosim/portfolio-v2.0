import FadeUp from '../ui/FadeUp'

const academic = [
	{
		title: 'Master of Business Administration',
		sub: 'MBA in Accounting · National University, Bangladesh',
		grade: '4.0/4.0',
		desc: 'Advanced studies in accounting, financial analysis, and business strategy. Combining analytical business background with technical full-stack development skills and leadership expertise.',
	},
	{
		title: 'Bachelor of Business Administration',
		sub: 'BBA in Accounting · National University, Bangladesh (2016 - 2021)',
		grade: '3.95/4.0',
		desc: 'Foundational business education with focus on accounting principles, management, and analytical thinking. Structured approach informs maintainable software architecture and scalable system design.',
	},
	{
		title: 'HSC (Higher Secondary Certificate)',
		sub: 'Science · National Board of Bangladesh (2008 - 2014)',
		grade: '3.92/4.0',
		desc: 'Strong foundation in mathematics, physics, and chemistry. Developed analytical and problem-solving skills that became the cornerstone for computer science and programming studies.',
	},
]

const certifications = [
	{
		title: 'The Complete JavaScript Course 2024',
		sub: 'Udemy · Online Course (Dec 2023)',
		desc: 'Comprehensive JavaScript covering ES6+, asynchronous programming, DOM manipulation, closures, and modern patterns. Applied in production applications with 50+ hours of practical coding.',
	},
	{
		title: 'React & Redux - Complete Course',
		sub: 'Udemy · Online Course (Oct 2023)',
		desc: 'In-depth React fundamentals, hooks, context API, and Redux state management. Built multiple projects with component architecture patterns and performance optimization techniques.',
	},
	{
		title: 'Node.js & Express Backend Mastery',
		sub: 'Programming Hero · Bootcamp (Aug 2023)',
		desc: 'Server-side development with Node.js, Express.js, authentication systems, RESTful API design, MongoDB integration, and production deployment strategies.',
	},
]

export default function EducationSection() {
	return (
		<section
			id='education'
			className='container mx-auto flex justify-center items-center lg:h-screen'
		>
			<div className='w-full'>
				<FadeUp>
					<p className='text-xs font-semibold tracking-widest uppercase text-accent mb-2'>My Academic Journey</p>
					<h2 className='text-4xl font-bold mb-12 text-foreground'>
						Education &amp; Qualifications
					</h2>
				</FadeUp>

				<FadeUp delay={100}>
					<div className='grid sm:grid-cols-2 gap-12'>
						{/* Academic */}
						<div>
							<p className='mb-2 text-xs font-semibold leading-0.5 uppercase text-[#999]'>2016 - 2025</p>
							<h3 className='text-2xl font-bold mb-8 text-foreground'>
								Academic Education
							</h3>
							<div className='space-y-8'>
								{academic.map((item) => (
									<div key={item.title} className='timeline-item'>
										<h4 className='font-bold text-foreground'>{item.title}</h4>
										<p className='text-sm font-medium text-accent'>
											{item.sub}
										</p>
										<span className='skill-pill text-xs mt-1 mb-2 inline-block'>
											{item.grade}
										</span>
										<p className='text-sm text-muted-foreground'>{item.desc}</p>
									</div>
								))}
							</div>
						</div>

						{/* Certifications */}
						<div>
							<p className='mb-2 text-xs font-semibold leading-0.5 uppercase text-[#999]'>2023 - Present</p>
							<h3 className='text-2xl font-bold mb-8 text-foreground'>
								Professional Certifications
							</h3>
							<div className='space-y-8'>
								{certifications.map((item) => (
									<div key={item.title} className='timeline-item'>
										<h4 className='font-bold text-foreground'>{item.title}</h4>
										<p className='text-sm font-medium text-accent'>
											{item.sub}
										</p>
										<span className='skill-pill text-xs mt-1 mb-2 inline-block'>
											✓ Certified
										</span>
										<p className='text-sm text-muted-foreground'>{item.desc}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
