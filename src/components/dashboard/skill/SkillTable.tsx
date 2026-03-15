/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useTransition } from 'react'
import ManagementTable from '../../shared/ManagementTable'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SkillColumns } from './SkillColumns'
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog'

const SkillTable = () => {
	const [skills, setSkills] = useState({
		icon: 'icon',
		id: '1',
		title: 'it has title',
	})
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [deletingSkill, setDeletingSkill] = useState(null)
	const [isDeletingDialog, setIsDeletingDialog] = useState(false)

	const handleRefresh = () => {
		startTransition(() => {
			router.refresh()
		})
	}
	const handleDelete = (skill: any) => {
		setDeletingSkill(skill)
	}

	const confirmDelete = async () => {
		if (!deletingSkill) return

		setIsDeletingDialog(true)
		// const result = await deleteSkill(deletingSkill.id)
		const result = {
			success: true,
			message: 'item delete successfully',
		}
		setIsDeletingDialog(false)
		if (result.success) {
			toast.success(result.message || 'Skill deleted successfully')
			setDeletingSkill(null)
			handleRefresh()
		} else {
			toast.error(result.message || 'Failed to delete Specialty')
		}
	}

	return (
		<>
			<ManagementTable
				data={skills}
				columns={SkillColumns}
				onDelete={handleDelete}
				getRowKey={(skill) => skill.id}
				emptyMessage='No skill found'
			/>

			{/* Delete Confirmation Dialog */}
			<DeleteConfirmationDialog
				open={!!deletingSkill}
				onOpenChange={(open) => !open && setDeletingSkill(null)}
				onConfirm={confirmDelete}
				title='Delete Specialty'
				description={`Are you sure you want to delete ${deletingSkill?.title}? This action cannot be undone.`}
				isDeleting={isDeletingDialog}
			/>
		</>
	)
}

export default SkillTable
