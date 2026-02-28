'use client'

import FadeUp from '../ui/FadeUp'
import {
	Code2,
	FileCode2,
	Braces,
	Globe,
	Palette,
	Database,
	Server,
	CreditCard,
	Wrench,
	Leaf,
	Link2,
	Cpu,
	Shield,
	GitBranch,
	Cloud,
} from 'lucide-react'

type Skill = {
	name: string
	icon: React.ElementType
}

type SkillGroup = {
	label: string
	icon: React.ElementType
	skills: Skill[]
}

const skillGroups: SkillGroup[] = [
	{
		label: 'Languages',
		icon: Code2,
		skills: [
			{ name: 'JavaScript', icon: FileCode2 },
			{ name: 'TypeScript', icon: Braces },
			{ name: 'HTML5', icon: Globe },
			{ name: 'CSS3', icon: Palette },
			{ name: 'C / C++', icon: Cpu },
		],
	},
	{
		label: 'Frontend',
		icon: Globe,
		skills: [
			{ name: 'React.js', icon: Cpu },
			{ name: 'Next.js', icon: Globe },
			{ name: 'Redux Toolkit', icon: GitBranch },
			{ name: 'TanStack Query', icon: Database },
			{ name: 'React Router', icon: Globe },
			{ name: 'React Hook Form', icon: FileCode2 },
			{ name: 'Socket.io', icon: Server },
		],
	},
	{
		label: 'Styling & UI',
		icon: Palette,
		skills: [
			{ name: 'Tailwind CSS', icon: Palette },
			{ name: 'Material UI', icon: Braces },
			{ name: 'Shadcn UI', icon: Braces },
			{ name: 'Ant Design', icon: Braces },
			{ name: 'Framer Motion', icon: Cpu },
		],
	},
	{
		label: 'Backend',
		icon: Server,
		skills: [
			{ name: 'Node.js', icon: Server },
			{ name: 'Express.js', icon: Server },
			{ name: 'JWT / OAuth', icon: Shield },
			{ name: 'Firebase Auth', icon: Shield },
			{ name: 'NextAuth', icon: Shield },
			{ name: 'Nodemailer', icon: FileCode2 },
			{ name: 'Redis', icon: Database },
		],
	},
	{
		label: 'Database',
		icon: Database,
		skills: [
			{ name: 'MongoDB', icon: Leaf },
			{ name: 'Mongoose', icon: Link2 },
			{ name: 'PostgreSQL', icon: Database },
		],
	},
	{
		label: 'Tools & DevOps',
		icon: Wrench,
		skills: [
			{ name: 'Git / GitHub', icon: GitBranch },
			{ name: 'Vercel', icon: Cloud },
			{ name: 'Netlify', icon: Cloud },
			{ name: 'Firebase', icon: Cloud },
			{ name: 'Linux', icon: Cpu },
		],
	},
	{
		label: 'Payment & Validation',
		icon: CreditCard,
		skills: [
			{ name: 'Stripe', icon: CreditCard },
			{ name: 'SSLCommerz', icon: CreditCard },
			{ name: 'Zod', icon: Shield },
			{ name: 'Axios', icon: Globe },
		],
	},
]

export default function SkillsSection() {
	return (
		<section id='skills' className='py-24 bg-background'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<FadeUp>
					<p className='uppercase tracking-widest text-sm font-semibold text-primary mb-3'>
						What I work with
					</p>
					<h2 className='text-4xl md:text-5xl font-extrabold text-foreground mb-16'>
						Technical Skills
					</h2>
				</FadeUp>

				{/* Skill Groups Grid */}
				<FadeUp delay={100}>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{skillGroups.map(({ label, icon: GroupIcon, skills }) => (
							<div
								key={label}
								className='bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
							>
								{/* Group Header */}
								<div className='flex items-center gap-3 mb-6'>
									<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
										<GroupIcon size={20} className='text-primary' />
									</div>
									<h4 className='text-lg font-semibold text-foreground'>
										{label}
									</h4>
								</div>

								{/* Skills */}
								<div className='flex flex-wrap gap-3'>
									{skills.map(({ name, icon: SkillIcon }) => (
										<div
											key={name}
											className='flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-white transition group cursor-default'
										>
											<SkillIcon
												size={16}
												className='text-primary group-hover:text-white transition'
											/>
											<span className='text-sm font-medium'>{name}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
