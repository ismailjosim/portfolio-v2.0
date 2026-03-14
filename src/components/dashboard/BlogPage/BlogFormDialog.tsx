/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface BlogFormDialogProps {
	open: boolean
	onClose: () => void
	onSuccess: () => void
	blog?: any
}

const BlogFormDialog = ({
	open,
	onClose,
	onSuccess,
	blog,
}: BlogFormDialogProps) => {
	const formRef = useRef<HTMLFormElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const isEdit = !!blog?.id

	// Action State handling for Create vs Update
	const [state, formAction, isPending] = useActionState(
		isEdit ? updateBlog.bind(null, blog.id) : createBlog,
		null,
	)

	// State for the file object only
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	/**
	 * Derived State: previewUrl
	 * Instead of storing the URL string in state, we generate it from the selectedFile.
	 * This prevents the "cascading renders" error.
	 */
	const previewUrl = useMemo(() => {
		if (!selectedFile) return null
		return URL.createObjectURL(selectedFile)
	}, [selectedFile])

	/**
	 * Cleanup Effect:
	 * Since createObjectURL creates a memory reference in the browser,
	 * we must revoke it when the file changes or the component unmounts.
	 */
	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl)
		}
	}, [previewUrl])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		setSelectedFile(file || null)
	}

	// Handle server response success/failure
	useEffect(() => {
		if (state?.success) {
			toast.success(state.message || (isEdit ? 'Blog updated' : 'Blog created'))
			onClose()
			onSuccess()
		} else if (state?.message && !state.success) {
			toast.error(state.message)

			// If server fails, we force the file back into the input so the user doesn't lose it
			if (selectedFile && fileInputRef.current) {
				const dataTransfer = new DataTransfer()
				dataTransfer.items.add(selectedFile)
				fileInputRef.current.files = dataTransfer.files
			}
		}
	}, [])

	const handleClose = () => {
		// Reset states
		setSelectedFile(null)

		// Reset the HTML form fields
		if (formRef.current) {
			formRef.current.reset()
		}

		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='max-h-[90vh] flex flex-col p-0 sm:max-w-137.5'>
				<DialogHeader className='px-6 pt-6 pb-4'>
					<DialogTitle>{isEdit ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
				</DialogHeader>

				<form
					ref={formRef}
					action={formAction}
					className='flex flex-col flex-1 min-h-0'
				>
					<div className='flex-1 overflow-y-auto px-6 space-y-4 pb-6'>
						{/* Hidden ID field for edit mode if your service doesn't use the bound ID */}
						{isEdit && <input type='hidden' name='id' value={blog.id} />}

						<Field>
							<FieldLabel htmlFor='title'>Title</FieldLabel>
							<Input
								id='title'
								name='title'
								placeholder='Enter blog title'
								defaultValue={state?.formData?.title || blog?.title || ''}
							/>
							<InputFieldError field='title' state={state} />
						</Field>

						<Field>
							<FieldLabel htmlFor='author'>Author Name</FieldLabel>
							<Input
								id='author'
								name='author'
								placeholder='John Doe'
								defaultValue={state?.formData?.author || blog?.author || ''}
							/>
							<InputFieldError field='author' state={state} />
						</Field>

						<Field>
							<FieldLabel htmlFor='content'>Description / Content</FieldLabel>
							<Input
								id='content'
								name='content'
								placeholder='Start writing...'
								defaultValue={state?.formData?.content || blog?.content || ''}
							/>
							<InputFieldError field='content' state={state} />
						</Field>

						<Field>
							<FieldLabel htmlFor='file'>Cover Image</FieldLabel>
							{previewUrl && (
								<div className='mb-2 relative h-32 w-full overflow-hidden rounded-md border'>
									<Image
										src={previewUrl}
										alt='Preview'
										fill
										className='object-cover'
									/>
								</div>
							)}
							<Input
								ref={fileInputRef}
								id='file'
								name='file'
								type='file'
								accept='image/*'
								onChange={handleFileChange}
							/>
							<p className='text-[10px] text-muted-foreground mt-1'>
								Recommended size: 1200x630px
							</p>
							<InputFieldError field='file' state={state} />
						</Field>
					</div>

					<div className='flex justify-end gap-2 px-6 py-4 border-t bg-gray-50/50'>
						<Button
							type='button'
							variant='outline'
							onClick={handleClose}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={isPending}>
							{isPending
								? 'Processing...'
								: isEdit
									? 'Update Blog'
									: 'Create Blog'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default BlogFormDialog
