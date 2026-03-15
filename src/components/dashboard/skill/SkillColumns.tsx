import Image from 'next/image'
import { Column } from '../../shared/ManagementTable'

// todo : need to be changed
interface ISkill {
	id: string
	icon: string
	title: string
}

export const SkillColumns: Column<ISkill>[] = [
	{
		header: 'Icon',
		accessor: (skill) => (
			<Image
				src={skill.icon}
				alt={skill.title}
				width={40}
				height={40}
				className='rounded-full'
			/>
		),
	},
	{
		header: 'Title',
		accessor: (skill) => skill.title,
	},
]
