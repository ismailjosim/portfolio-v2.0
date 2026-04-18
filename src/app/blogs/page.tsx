import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { IBlog } from '@/src/types/blog.interface'
import { Input } from '@/src/components/ui/input'
import BlogCard from '@/src/components/blogs/BlogCard'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Read my latest articles and insights',
}

// const categories = [
// 	'All',
// 	'Technology',
// 	'Lifestyle',
// 	'Travel',
// 	'Finance',
// 	'Learning',
// 	'Other',
// ]

async function fetchBlogs() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})

		if (!res.ok) {
			return []
		}

		const data = await res.json()
		return (data.blogs || []).filter(
			(blog: IBlog) => blog.status === 'published',
		)
	} catch (error) {
		console.error('Failed to fetch blogs:', error)
		return []
	}
}

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

export default async function BlogsPage() {
	const blogs = await fetchBlogs()

	return (
		<main className='min-h-screen'>
			{/* Header Section */}
			<section className='py-16 bg-linear-to-b from-background via-background to-background'>
				<div className='container mx-auto px-4 max-w-4xl'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>Blog</h1>
					<p className='text-lg text-muted-foreground mb-8'>
						Explore my thoughts on technology, career, and more
					</p>

					{/* Search Bar */}
					<div className='relative'>
						<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search articles...'
							className='pl-12 py-3 text-lg'
						/>
					</div>
				</div>
			</section>

			{/* Blog Content */}
			<section className='py-12'>
				<div className='container mx-auto  '>
					{blogs.length === 0 ? (
						<div className='text-center py-16'>
							<p className='text-xl text-muted-foreground'>
								No published articles yet. Check back soon!
							</p>
						</div>
					) : (
						<div className='space-y-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
							{blogs.map((blog: IBlog, index: number) => (
								<BlogCard blog={blog} key={blog._id} index={index} />
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	)
}
