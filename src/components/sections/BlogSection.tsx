'use client'

import { useState } from 'react'
import FadeUp from '../ui/FadeUp'

const filters = ['all', 'frontend', 'backend', 'tools', 'career']

const articles = [
	{
		category: 'frontend',
		gradient: 'from-blue-500 to-purple-600',
		icon: 'fa fa-react',
		readTime: '5 min read',
		title: 'Building Interactive React Components',
		desc: 'Learn best practices for creating reusable, performant React components with hooks and modern patterns.',
	},
	{
		category: 'backend',
		gradient: 'from-green-500 to-teal-600',
		icon: 'fa fa-server',
		readTime: '8 min read',
		title: 'Scaling Node.js Applications',
		desc: 'Strategies for building scalable Node.js APIs with clustering, load balancing, and caching techniques.',
	},
	{
		category: 'tools',
		gradient: 'from-orange-500 to-red-600',
		icon: 'fa fa-hammer',
		readTime: '6 min read',
		title: 'Modern Development Tools 2024',
		desc: 'Explore the latest development tools, from TypeScript to Vite that accelerate your workflow.',
	},
	{
		category: 'career',
		gradient: 'from-pink-500 to-rose-600',
		icon: 'fa fa-briefcase',
		readTime: '7 min read',
		title: 'Landing Your First Developer Job',
		desc: 'Complete guide to preparing your portfolio, resume, and interview skills for landing your first role.',
	},
	{
		category: 'frontend',
		gradient: 'from-cyan-500 to-blue-600',
		icon: 'fa fa-css3-alt',
		readTime: '4 min read',
		title: 'CSS Grid and Flexbox Mastery',
		desc: 'Deep dive into modern CSS layout techniques with practical examples and common pitfalls to avoid.',
	},
	{
		category: 'backend',
		gradient: 'from-indigo-500 to-purple-600',
		icon: 'fa fa-database',
		readTime: '9 min read',
		title: 'Database Design & Optimization',
		desc: 'Learn MongoDB and PostgreSQL best practices, indexing strategies, and query optimization techniques.',
	},
]

export default function BlogSection() {
	const [activeFilter, setActiveFilter] = useState('all')

	const filtered =
		activeFilter === 'all'
			? articles
			: articles.filter((a) => a.category === activeFilter)

	return (
		<section id='blog' className='bg-card' style={{ padding: '80px 60px' }}>
			<div className='container mx-auto'>
				<div className='text-center mb-12'>
					<FadeUp>
						<p className='section-label'>My thoughts and insights</p>
						<h2 className='text-4xl font-bold text-gray-900 mb-8'>
							Latest Articles &amp; Insights
						</h2>
					</FadeUp>

					<FadeUp delay={100}>
						<div className='flex flex-wrap justify-center gap-3 mb-12'>
							{filters.map((f) => (
								<button
									key={f}
									className={`blog-filter ${activeFilter === f ? 'active' : ''}`}
									onClick={() => setActiveFilter(f)}
								>
									{f.charAt(0).toUpperCase() + f.slice(1)}
								</button>
							))}
						</div>
					</FadeUp>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filtered.map((article, i) => (
						<FadeUp key={article.title} delay={i * 80}>
							<article className='blog-card h-full'>
								<div
									className={`bg-linear-to-br ${article.gradient} flex items-center justify-center overflow-hidden`}
									style={{ height: '192px' }}
								>
									<i
										className={`${article.icon} text-white opacity-40`}
										style={{ fontSize: '64px' }}
									/>
								</div>
								<div className='p-6 flex flex-col flex-1'>
									<div className='flex items-center gap-2 mb-3'>
										<span className={`blog-category-badge ${article.category}`}>
											{article.category}
										</span>
										<span className='text-gray-400 text-xs'>
											{article.readTime}
										</span>
									</div>
									<h3 className='font-bold text-gray-900 text-lg mb-2 hover:text-purple-600 transition-colors'>
										{article.title}
									</h3>
									<p className='text-gray-600 text-sm mb-4 flex-1'>
										{article.desc}
									</p>
									<a
										href='#'
										className='text-purple-600 text-sm font-medium hover:text-purple-700'
									>
										Read More →
									</a>
								</div>
							</article>
						</FadeUp>
					))}
				</div>

				<FadeUp delay={200}>
					<div className='text-center mt-12'>
						<a href='#' className='btn-outline'>
							View All Articles →
						</a>
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
