import { Metadata } from 'next'
import { Search } from 'lucide-react'
import { IBlog } from '@/src/types/blog.interface'

import { Input } from '@/src/components/ui/input'
import BlogCard from '@/src/components/blogs/BlogCard'
import Navbar from '@/src/components/shared/Navbar'
import ScrollToTop from '@/src/components/ui/ScrollToTop'
import TablePagination from '@/src/components/shared/TablePagination'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Read my latest articles and insights',
}

async function fetchBlogs(searchParams: {
	page?: string
	limit?: string
	search?: string
	category?: string
	tag?: string
}) {
	try {
		const query = new URLSearchParams()

		if (searchParams.page) query.set('page', searchParams.page)
		if (searchParams.limit) query.set('limit', searchParams.limit)
		if (searchParams.search) query.set('search', searchParams.search)
		if (searchParams.category) query.set('category', searchParams.category)
		if (searchParams.tag) query.set('tag', searchParams.tag)

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/blogs?${query.toString()}`,
			{
				method: 'GET',
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			return { blogs: [], pagination: null }
		}

		const data = await res.json()

		return {
			blogs: (data.blogs || []).filter(
				(blog: IBlog) => blog.status === 'published',
			),
			pagination: data.pagination,
		}
	} catch (error) {
		console.error('Failed to fetch blogs:', error)
		return { blogs: [], pagination: null }
	}
}

export default async function BlogsPage(props: {
	searchParams: Promise<{
		page?: string
		limit?: string
		search?: string
		category?: string
		tag?: string
	}>
}) {
	const searchParams = await props.searchParams

	const { blogs, pagination } = await fetchBlogs({
		page: searchParams.page,
		limit: searchParams.limit,
		search: searchParams.search,
		category: searchParams.category,
		tag: searchParams.tag,
	})

	return (
		<>
			<header>
				<Navbar />
			</header>

			<main className='min-h-screen'>
				{/* HEADER */}
				<section className='py-20 bg-linear-to-b from-background via-background to-background'>
					<div className='container mx-auto px-4 max-w-4xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4'>Blog</h1>

						<p className='text-lg text-muted-foreground mb-8'>
							Explore my thoughts on technology, career, and more
						</p>

						{/* SEARCH (server-driven via URL) */}
						<form className='relative'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />

							<Input
								name='search'
								type='search'
								defaultValue={searchParams.search || ''}
								placeholder='Search articles...'
								className='pl-12 py-3 text-lg'
							/>
						</form>
					</div>
				</section>

				{/* BLOG GRID */}
				<section className='py-12'>
					<div className='container mx-auto'>
						{blogs.length === 0 ? (
							<div className='text-center py-16'>
								<p className='text-xl text-muted-foreground'>
									No published articles yet. Check back soon!
								</p>
							</div>
						) : (
							<>
								<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
									{blogs.map((blog: IBlog, index: number) => (
										<BlogCard blog={blog} key={blog._id} index={index} />
									))}
								</div>

								{/* PAGINATION */}
								{pagination && (
									<div className='mt-12 py-20'>
										<TablePagination
											currentPage={pagination.page}
											totalPages={pagination.totalPages}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</section>
			</main>

			<ScrollToTop />
		</>
	)
}
