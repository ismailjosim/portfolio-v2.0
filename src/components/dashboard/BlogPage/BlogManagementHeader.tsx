'use client'
import { Plus } from 'lucide-react'
import ManagementPageHeader from '../../shared/ManagementPageHeader'
import BlogFormDialog from './BlogFormDialog'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { AddBlogModal } from '../../modules/blog/AddBlogModal'

const BlogManagementHeader = () => {
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [dialogKey, setDialogKey] = useState(0)

	const handleSuccess = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	const handleOpenDialog = () => {
		setDialogKey((prev) => prev + 1)
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
	}

	return (
		<>
			<AddBlogModal
				key={dialogKey}
				open={isDialogOpen}
				onClose={handleCloseDialog}
				onSuccess={handleSuccess}
			/>

			<ManagementPageHeader
				title='All Blogs'
				description='Manage All Blogs'
				action={{
					label: 'Add Blog',
					icon: Plus,
					onClick: handleOpenDialog,
				}}
			/>
		</>
	)
}

export default BlogManagementHeader
