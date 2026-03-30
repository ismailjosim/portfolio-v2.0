'use client'
import { Plus } from 'lucide-react'
import ManagementPageHeader from '../../shared/ManagementPageHeader'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import AddBlogModal from '../../modules/blog/AddBlogModal'
import { IBlog } from '../../../types/blog.interface'

const BlogManagementHeader = () => {
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [dialogKey, setDialogKey] = useState(0)
	const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null)

	const handleSuccess = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	const handleOpenCreate = () => {
		setSelectedBlog(null)
		setDialogKey((prev) => prev + 1)
		setIsDialogOpen(true)
	}

	const handleOpenEdit = (blog: IBlog) => {
		setSelectedBlog(blog)
		setDialogKey((prev) => prev + 1)
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
		setSelectedBlog(null)
	}

	return (
		<>
			<AddBlogModal
				key={dialogKey}
				open={isDialogOpen}
				onClose={handleCloseDialog}
				onSuccess={handleSuccess}
				blog={selectedBlog}
			/>

			<ManagementPageHeader
				title='All Blogs'
				description='Manage All Blogs'
				action={{
					label: 'Add Blog',
					icon: Plus,
					onClick: handleOpenCreate,
				}}
			/>
		</>
	)
}

export default BlogManagementHeader
