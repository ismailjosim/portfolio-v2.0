interface ISkillGroup {
	id: string
	label: string // "Languages", "Frontend", etc.
	icon: string // store icon name as string: "Code2", "Globe"
	order: number // for drag-to-reorder later
	createdAt: Date
}

interface ISkill {
	_id: string
	name: string
	icon: string
	groupId: string
	order: number
	createdAt: Date
}
