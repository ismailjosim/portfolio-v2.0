import { useRouter } from 'next/navigation'
import { IBlog } from '../../../types/blog.interface'
import { useState, useTransition } from 'react'
import { deleteBlog } from '../../../services/blog-management'
import { toast } from 'sonner'
import ManagementTable from '../../shared/ManagementTable'
import { blogColumns } from './blogColumns'
import BlogFormDialog from './BlogFormDialog'
import BlogViewDetailDialog from './BlogViewDetailDialog'

interface BlogsTableProps {
	blogs: IBlog[]
}

const BlogsTable = ({ blogs }: BlogsTableProps) => {
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [deletingBlog, setDeletingBlog] = useState<IBlog | null>(null)
	const [viewingBlog, setViewingBlog] = useState<IBlog | null>(null)
	const [editingBlog, setEditingBlog] = useState<IBlog | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleRefresh = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	const handleView = (blog: IBlog) => {
		setViewingBlog(blog)
	}
	const handleEdit = (Blog: IBlog) => {
		setEditingBlog(Blog)
	}

	const handleDelete = (blog: IBlog) => {
		setDeletingBlog(blog)
	}

	const confirmDelete = async () => {
		if (!deletingBlog) return
		setIsDeleting(true)
		const result = await deleteBlog(deletingBlog.slug as string)
		setIsDeleting(false)
		if (result.success) {
			toast.success(result.message || 'Blog deleted successfully')
			setDeletingBlog(null)
			handleRefresh()
		} else {
			toast.error(result.message || 'Failed to delete blog')
		}
	}

	return (
		<>
			{/* management table */}
			<ManagementTable
				data={blogs}
				columns={blogColumns}
				onView={handleView}
				onEdit={handleEdit}
				getRowKey={(blog) => blog._id}
				emptyMessage='No blogs found!'
				onDelete={handleDelete}
			/>
			{/* edit blog form */}
			<BlogFormDialog
				open={!!editingBlog}
				onClose={() => setEditingBlog(null)}
				blog={editingBlog!}
				onSuccess={() => {
					setEditingBlog(null)
					handleRefresh()
				}}
			/>
			<BlogViewDetailDialog
				open={!!viewingBlog}
				onClose={() => setViewingBlog(null)}
				blog={viewingBlog}
			/>
			{/* view blog details dialog */}
			{/* delete confirmation dialog */}
		</>
	)
}

export default BlogsTable
