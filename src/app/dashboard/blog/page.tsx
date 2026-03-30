'use client'

import { useEffect, useState, useCallback } from 'react'
import BlogManagementHeader from '../../../components/dashboard/BlogPage/BlogManagementHeader'
import { IBlog } from '../../../types/blog.interface'
import { getAllBlogs, deleteBlog } from '../../../services/blog-management'
import { toast } from 'sonner'

const DashboardBlogPage = () => {
	const [blogs, setBlogs] = useState<IBlog[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const fetchBlogs = useCallback(async () => {
		setLoading(true)
		const result = await getAllBlogs()
		if (result.success) {
			setBlogs(result.data)
		} else {
			toast.error(result.message || 'Failed to fetch blogs')
		}
		setLoading(false)
	}, [])

	useEffect(() => {
		fetchBlogs()
	}, [fetchBlogs])

	const handleSuccess = () => {
		fetchBlogs()
	}

	const handleOpenEdit = (blog: IBlog | null) => {
		setSelectedBlog(blog)
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
		setSelectedBlog(null)
	}

	const handleDelete = async (blog: IBlog) => {
		if (!blog.slug) return
		const result = await deleteBlog(blog.slug)
		if (result.success) {
			toast.success('Blog deleted successfully')
			fetchBlogs()
		} else {
			toast.error(result.message || 'Failed to delete blog')
		}
	}

	return (
		<section className='p-6'>
			<BlogManagementHeader
				onOpenEdit={handleOpenEdit}
				isDialogOpen={isDialogOpen}
				selectedBlog={selectedBlog}
				onCloseDialog={handleCloseDialog}
				onSuccess={handleSuccess}
			/>

			<div className='mt-6 border rounded-lg overflow-hidden'>
				<table className='w-full text-left'>
					<thead className='bg-gray-50 border-b'>
						<tr>
							<th className='px-4 py-2'>Title</th>
							<th className='px-4 py-2'>Category</th>
							<th className='px-4 py-2'>Tags</th>
							<th className='px-4 py-2'>Created At</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={5} className='px-4 py-2 text-center'>
									Loading...
								</td>
							</tr>
						) : blogs.length === 0 ? (
							<tr>
								<td colSpan={5} className='px-4 py-2 text-center'>
									No blogs found
								</td>
							</tr>
						) : (
							blogs.map((blog) => (
								<tr key={blog.id || blog.slug}>
									<td className='px-4 py-2 border-b'>{blog.title}</td>
									<td className='px-4 py-2 border-b'>{blog.category}</td>
									<td className='px-4 py-2 border-b'>{blog.tags.join(', ')}</td>
									<td className='px-4 py-2 border-b'>
										{new Date(blog.createdAt || '').toLocaleDateString()}
									</td>
									<td className='px-4 py-2 border-b'>
										<button
											onClick={() => handleOpenEdit(blog)}
											className='text-blue-500 hover:underline mr-2'
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(blog)}
											className='text-red-500 hover:underline'
										>
											Delete
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default DashboardBlogPage
