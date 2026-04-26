import { serverFetch } from '../lib/server-fetch'

export interface DashboardStats {
	totalBlogs: number
	totalProjects: number
	totalSkills: number
	blogMetrics: {
		totalBlogs: number
		totalViews: number
		totalLikes: number
		totalComments: number
		averageViews: number
	}
	recentBlogs: any[]
	projects: any[]
	skills: any[]
	skillsByCategory?: Record<string, number>
}

export async function getDashboardData(): Promise<DashboardStats> {
	try {
		// Fetch all data in parallel
		const [blogsRes, projectsRes, skillsRes] = await Promise.all([
			serverFetch.get('/blogs?limit=100'),
			serverFetch.get('/projects?limit=100'),
			// Skills endpoint might not exist yet, so we don't fail if it's missing
			serverFetch.get('/skills?limit=100').catch(() => null),
		])

		const blogsData = blogsRes.ok ? await blogsRes.json() : { blogs: [] }
		const projectsData = projectsRes.ok
			? await projectsRes.json()
			: { projects: [] }
		const skillsData =
			skillsRes && skillsRes.ok ? await skillsRes.json() : { skills: [] }

		const blogs = Array.isArray(blogsData)
			? blogsData
			: blogsData.blogs || blogsData.data || []
		const projects = Array.isArray(projectsData)
			? projectsData
			: projectsData.projects || projectsData.data || []
		const skills = Array.isArray(skillsData)
			? skillsData
			: skillsData.skills || skillsData.data || []

		// Calculate blog metrics
		const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
		const totalLikes = blogs.reduce(
			(sum, blog) => sum + (blog.likesCount || 0),
			0,
		)
		const totalComments = blogs.reduce(
			(sum, blog) => sum + (blog.commentsCount || 0),
			0,
		)
		const averageViews = blogs.length > 0 ? totalViews / blogs.length : 0

		// Group skills by category
		const skillsByCategory: Record<string, number> = {}
		skills.forEach((skill) => {
			const category = skill.category || 'Uncategorized'
			skillsByCategory[category] = (skillsByCategory[category] || 0) + 1
		})

		// Sort blogs by creation date and get recent ones
		const sortedBlogs = [...blogs].sort(
			(a, b) =>
				new Date(b.createdAt || 0).getTime() -
				new Date(a.createdAt || 0).getTime(),
		)

		return {
			totalBlogs: blogs.length,
			totalProjects: projects.length,
			totalSkills: skills.length,
			blogMetrics: {
				totalBlogs: blogs.length,
				totalViews,
				totalLikes,
				totalComments,
				averageViews,
			},
			recentBlogs: sortedBlogs.slice(0, 4),
			projects: projects.slice(0, 3),
			skills: skills.slice(0, 6),
			skillsByCategory,
		}
	} catch (error) {
		console.error('Error fetching dashboard data:', error)
		return {
			totalBlogs: 0,
			totalProjects: 0,
			totalSkills: 0,
			blogMetrics: {
				totalBlogs: 0,
				totalViews: 0,
				totalLikes: 0,
				totalComments: 0,
				averageViews: 0,
			},
			recentBlogs: [],
			projects: [],
			skills: [],
			skillsByCategory: {},
		}
	}
}
