'use client'
import { Plus } from 'lucide-react'
import ManagementPageHeader from '../../shared/ManagementPageHeader'
import SkillFormDialog from './SkillFormDialog'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const SkillManagementHeader = () => {
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	//force remount to reset state of form
	const [dialogKey, setDialogKey] = useState(0)

	const handleOpenDialog = () => {
		setDialogKey((prev) => prev + 1)
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
	}

	const handleSuccess = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	return (
		<>
			<SkillFormDialog
				key={dialogKey}
				open={isDialogOpen}
				onClose={handleCloseDialog}
				onSuccess={handleSuccess}
			/>

			<ManagementPageHeader
				title='All Skills'
				description='Manage Your Skills'
				action={{
					label: 'Add Skill',
					icon: Plus,
					onClick: handleOpenDialog,
				}}
			/>
		</>
	)
}

export default SkillManagementHeader
