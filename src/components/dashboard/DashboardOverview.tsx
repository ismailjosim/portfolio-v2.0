/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { StatsCard } from './StatsCard'
import { BlogInsightsCard } from './BlogInsightsCard'
import { ProjectsOverviewCard } from './ProjectsOverviewCard'
import { SkillsOverviewCard } from './SkillsOverviewCard'
import { RecentBlogsCard } from './RecentBlogsCard'

import {
	BookOpen,
	FolderOpen,
	Zap,
	Eye,
	ThumbsUp,
	MessageCircle,
} from 'lucide-react'
import DashboardPageHeader from '../shared/DashboardPageHeader'

interface DashboardData {
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

interface DashboardOverviewProps {
	data: DashboardData
}

export const DashboardOverview = ({ data }: DashboardOverviewProps) => {
	return (
		<div className='space-y-6'>
			<DashboardPageHeader
				title='Dashboard'
				description='Welcome back! Here is your portfolio overview.'
			/>

			{/* Stats Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<StatsCard
					icon={BookOpen}
					label='Total Blogs'
					value={data.totalBlogs}
					description='Published posts'
					trend={{ value: 12, isPositive: true }}
				/>
				<StatsCard
					icon={Eye}
					label='Total Views'
					value={formatNumber(data.blogMetrics.totalViews)}
					description='All time views'
					trend={{ value: 8, isPositive: true }}
				/>
				<StatsCard
					icon={FolderOpen}
					label='Projects'
					value={data.totalProjects}
					description='Featured & Active'
					trend={{ value: 3, isPositive: true }}
				/>
				<StatsCard
					icon={Zap}
					label='Skills'
					value={data.totalSkills}
					description='Across categories'
				/>
			</div>

			{/* Main Cards */}
			<div className='grid gap-4 lg:grid-cols-3'>
				<div className='lg:col-span-2'>
					<BlogInsightsCard metrics={data.blogMetrics} />
				</div>
				<div>
					<RecentBlogsCard
						blogs={data.recentBlogs}
						totalBlogs={data.totalBlogs}
					/>
				</div>
			</div>

			{/* Projects and Skills */}
			<div className='grid gap-4 lg:grid-cols-2'>
				<ProjectsOverviewCard
					projects={data.projects}
					totalProjects={data.totalProjects}
				/>
				<SkillsOverviewCard
					skills={data.skills}
					totalSkills={data.totalSkills}
					skillsByCategory={data.skillsByCategory}
				/>
			</div>
		</div>
	)
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	}
	return num.toString()
}
