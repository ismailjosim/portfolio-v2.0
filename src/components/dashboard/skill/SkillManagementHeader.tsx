'use client'
import { useState, useTransition } from 'react'
import SkillFormDialog from './SkillFormDialog'
import { useRouter } from 'next/navigation'
import ManagementPageHeader from '../../shared/ManagementPageHeader'
import { Plus } from 'lucide-react'

const SkillManagementHeader = () => {
	const router = useRouter()
	const [, startTransition] = useTransition()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleSuccess = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	return (
		<>
			<SkillFormDialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSuccess={handleSuccess}
			/>
			<ManagementPageHeader
				title='Skill Management'
				description='manage portfolio skills section'
				action={{
					label: 'Add Skill',
					icon: Plus,
					onClick: () => setIsDialogOpen(true),
				}}
			/>
		</>
	)
}

export default SkillManagementHeader
