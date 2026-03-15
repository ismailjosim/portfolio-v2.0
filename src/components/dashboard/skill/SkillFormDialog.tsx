import { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

// UI Components
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog'
import { Field, FieldLabel } from '../../ui/field'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { createBlog, updateBlog } from '../../../services/blog-management'
import InputFieldError from '../../shared/InputFieldError'

interface SkillFormDialogProps {
	open: boolean
	onClose: () => void
	onSuccess: () => void
}

const SkillFormDialog = ({
	open,
	onClose,
	onSuccess,
}: SkillFormDialogProps) => {
	const [state, formAction, pending] = useActionState(createBlog, null)

	useEffect(() => {
		if (state && state?.success) {
			toast.success(state.message)
			onSuccess()
			onClose()
		} else if (state && !state.success) {
			toast.error(state.message)
		}
	}, [state])
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Specialty</DialogTitle>
				</DialogHeader>

				<form action={formAction} className='space-y-4'>
					<Field>
						<FieldLabel htmlFor='title'>Title</FieldLabel>
						<Input id='title' name='title' placeholder='Cardiology' required />
						<InputFieldError field='title' state={state} />
					</Field>

					<Field>
						<FieldLabel htmlFor='file'>Upload Icon</FieldLabel>

						<Input id='file' name='file' type='file' accept='image/*' />
						<InputFieldError field='file' state={state} />
					</Field>

					<div className='flex justify-end gap-2'>
						<Button
							type='button'
							variant='outline'
							onClick={onClose}
							disabled={pending}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={pending}>
							{pending ? 'Saving...' : 'Save Specialty'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default SkillFormDialog
