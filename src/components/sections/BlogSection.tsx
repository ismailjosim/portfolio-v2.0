'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import FadeUp from '../ui/FadeUp'
import { IBlog } from '@/src/types/blog.interface'
import Link from 'next/link'
import { Button } from '../ui/button'

const filters = [
	'all',
	'technology',
	'lifestyle',
	'travel',
	'finance',
	'learning',
	'other',
]

export default function BlogSection() {
	const [activeFilter, setActiveFilter] = useState('all')
	const [blogs, setBlogs] = useState<IBlog[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
				const data = await response.json()

				const publishedBlogs = (data.blogs || []).filter(
					(blog: IBlog) => blog.status === 'published',
				)

				setBlogs(publishedBlogs)
			} catch (error) {
				console.error('Failed to fetch blogs:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [])

	const filtered =
		activeFilter === 'all'
			? blogs
			: blogs.filter(
					(blog) => blog.category.toLowerCase() === activeFilter.toLowerCase(),
				)

	// show only 6 blogs
	const displayBlogs = filtered.slice(0, 6)

	const getCategoryColor = (category: string) => {
		const colors: Record<string, string> = {
			technology: 'from-blue-500 to-purple-600',
			lifestyle: 'from-green-500 to-teal-600',
			travel: 'from-orange-500 to-red-600',
			finance: 'from-pink-500 to-rose-600',
			learning: 'from-cyan-500 to-blue-600',
			other: 'from-indigo-500 to-purple-600',
		}
		return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600'
	}

	const getReadTime = (content: string) => {
		const wordsPerMinute = 200
		const words = content.split(/\s+/).length
		const minutes = Math.ceil(words / wordsPerMinute)
		return `${minutes} min read`
	}

	return (
		<section className='pb-20' id='blog'>
			<div className='container mx-auto '>
				<div className='text-center mb-12'>
					<FadeUp>
						<p className='text-xs font-semibold tracking-widest uppercase text-accent mb-2'>
							My thoughts and insights
						</p>
						<h2 className='text-4xl font-bold text-foreground mb-8'>
							Latest Articles &amp; Insights
						</h2>
					</FadeUp>

					<FadeUp delay={100}>
						<div className='flex flex-wrap justify-center gap-3'>
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

				{loading ? (
					<div className='text-center py-12'>
						<p className='text-muted-foreground'>Loading articles...</p>
					</div>
				) : displayBlogs.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-muted-foreground'>
							No articles found in this category.
						</p>
					</div>
				) : (
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{displayBlogs.map((blog, i) => (
							<FadeUp key={blog.slug} delay={i * 80}>
								<article
									className='h-full rounded-2xl overflow-hidden transition-all flex flex-col'
									style={{
										border: '1px solid var(--border)',
										background: 'var(--blog-card)',
									}}
								>
									{blog.coverImage ? (
										<div className='relative h-48 w-full overflow-hidden bg-muted'>
											<Image
												loading='eager'
												src={blog.coverImage}
												alt={blog.title}
												fill
												sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
												className='object-cover'
											/>
										</div>
									) : (
										<div
											className={`bg-linear-to-br ${getCategoryColor(
												blog.category,
											)} h-48 flex items-center justify-center overflow-hidden`}
										>
											<div className='text-white opacity-40 text-4xl'>📝</div>
										</div>
									)}

									<div className='p-6 flex flex-col flex-1'>
										<div className='flex items-center gap-2 mb-3'>
											<span
												className={`blog-category-badge ${blog.category.toLowerCase()}`}
											>
												{blog.category}
											</span>

											<span className='text-muted-foreground text-xs'>
												{getReadTime(blog.content)}
											</span>
										</div>

										<h3 className='font-bold text-foreground text-lg mb-2 hover:text-accent transition-colors line-clamp-2'>
											{blog.title}
										</h3>

										<p className='text-muted-foreground text-sm mb-4 flex-1 line-clamp-3'>
											{blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}
											...
										</p>

										<Link
											href={`/blogs/${blog.slug}`}
											className='text-accent text-sm font-medium hover:underline'
										>
											Read More →
										</Link>
									</div>
								</article>
							</FadeUp>
						))}
					</div>
				)}

				<FadeUp delay={200}>
					<div className='text-center py-16'>
						<Button asChild variant='outline'>
							<Link href='/blogs'>View All Articles →</Link>
						</Button>
					</div>
				</FadeUp>
			</div>
		</section>
	)
}
