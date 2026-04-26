// sidebar.config.ts
import { BookOpen, FolderKanban, Award, LayoutDashboard } from 'lucide-react'

export const sidebarNav = [
	{
		title: 'Overview',
		url: '/overview',
		icon: LayoutDashboard,
	},
	{
		title: 'Blogs',
		url: '/blog',
		icon: BookOpen,
	},
	{
		title: 'Projects',
		url: '/projects',
		icon: FolderKanban,
	},
	{
		title: 'Skills',
		url: '/skills',
		icon: Award,
	},
]

export const sidebarUser = {
	name: 'Md. Jasim',
	email: 'dashboard@ismailjosim.com',
	avatar: '/person.jpeg',
}
