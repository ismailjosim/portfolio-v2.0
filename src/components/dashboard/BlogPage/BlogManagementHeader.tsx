'use client'
import { Plus } from 'lucide-react'
import ManagementPageHeader from '../../shared/ManagementPageHeader'
import AddBlogModal from '../../modules/blog/AddBlogModal'
import { IBlog } from '../../../types/blog.interface'

interface BlogManagementHeaderProps {
	onOpenEdit: (blog: IBlog | null) => void
	isDialogOpen: boolean
	selectedBlog: IBlog | null
	onCloseDialog: () => void
	onSuccess: () => void
}

const BlogManagementHeader = ({
	onOpenEdit,
	isDialogOpen,
	selectedBlog,
	onCloseDialog,
	onSuccess,
}: BlogManagementHeaderProps) => {
	const handleOpenCreate = () => {
		onOpenEdit(null)
	}

	return (
		<>
			<AddBlogModal
				open={isDialogOpen}
				onClose={onCloseDialog}
				onSuccess={onSuccess}
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
