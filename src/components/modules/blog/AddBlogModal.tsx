'use client'
import React, { useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor'
import { FileUp, Upload } from 'lucide-react'
import { useTheme } from 'next-themes'

// shadcn ui
import { Input } from '../../ui/input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form'
import {
	Select as SelectElement,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select'
import { Button } from '../../ui/button'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'sonner'
import { IBlog, IBlogTag } from '../../../types/blog.interface'
import {
	createBlog,
	updateBlog,
	IBlogPayload,
} from '../../../services/blog-management'

// ─── Constants ─────────────────────────────────────────────

const CATEGORIES = [
	'Technology',
	'Lifestyle',
	'Travel',
	'Finance',
	'Learning',
	'Other',
]

const TAG_OPTIONS = [
	{ value: 'react', label: 'React' },
	{ value: 'webdev', label: 'Web Dev' },
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'nextjs', label: 'Next.js' },
]

// ─── Types ─────────────────────────────────────────────────

interface BlogFormValues {
	title: string
	category: string
	content: string
	tags: IBlogTag[]
	coverImage: File | null
	coverImagePreview?: string
}

interface Props {
	open: boolean
	onClose: () => void
	onSuccess: (data: IBlog) => void
	blog?: IBlog | null
}

// ─── Component ─────────────────────────────────────────────

const AddBlogModal = ({ open, onClose, onSuccess, blog }: Props) => {
	const isEditMode = Boolean(blog)
	const coverInputRef = useRef<HTMLInputElement>(null)
	const mdFileInputRef = useRef<HTMLInputElement>(null)

	const { theme } = useTheme()

	const form = useForm<BlogFormValues>({
		defaultValues: {
			title: '',
			category: '',
			coverImage: null,
			coverImagePreview: '',
			tags: [],
			content: '',
		},
	})

	// Populate form when blog prop changes (edit mode)
	useEffect(() => {
		if (blog) {
			form.reset({
				title: blog.title,
				category: blog.category,
				coverImage: null,
				coverImagePreview: blog.coverImage ?? '',
				tags: (blog.tags || []).map((tag) => ({ value: tag, label: tag })),
				content: blog.content,
			})
		} else {
			form.reset({
				title: '',
				category: '',
				coverImage: null,
				coverImagePreview: '',
				tags: [],
				content: '',
			})
		}
	}, [blog, form])

	const coverPreview = form.watch('coverImagePreview')

	// ─── Handlers ──────────────────────────────────────────

	const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		if (!file.type.startsWith('image/')) return

		const url = URL.createObjectURL(file)
		form.setValue('coverImage', file)
		form.setValue('coverImagePreview', url)
	}

	const handleMdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		if (!file.name.endsWith('.md')) return

		const reader = new FileReader()
		reader.onload = (ev) => {
			if (typeof ev.target?.result === 'string') {
				form.setValue('content', ev.target.result)
			}
		}
		reader.readAsText(file)
	}

	const onSubmit = async (data: BlogFormValues) => {
		const payload: IBlogPayload = {
			title: data.title,
			category: data.category,
			content: data.content,
			tags: data.tags.map((item) => item.value),
			coverImage: data.coverImagePreview ?? undefined,
		}

		try {
			let result
			if (isEditMode && blog && blog.slug) {
				result = await updateBlog(blog.slug, payload)
			} else {
				result = await createBlog(payload)
			}

			if (!result.success) {
				toast.error(result.message || 'Failed to save blog')
				return
			}

			const createdBlog = result.data as IBlog
			onSuccess(createdBlog)
			toast.success(isEditMode ? 'Blog updated' : 'Blog created')
			onClose()
			form.reset()
		} catch (error) {
			console.error('AddBlogModal submit', error)
			toast.error('Something went wrong while saving blog')
		}
	}

	// ─── UI ────────────────────────────────────────────────

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Edit blog post' : 'Create new blog post'}
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? 'Update your blog post content below.'
							: 'Write your content with markdown support.'}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex-1 overflow-y-auto space-y-5'
					>
						{/* Title */}
						<FormField
							control={form.control}
							name='title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='My awesome blog post' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Category + tags */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
							{/* Category */}
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Category</FormLabel>
										<SelectElement
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='bg-secondary'>
												{CATEGORIES.map((c) => (
													<SelectItem key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</SelectElement>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Tags */}
							<FormItem>
								<FormLabel>Tags</FormLabel>
								<Controller
									control={form.control}
									name='tags'
									render={({ field }) => (
										<CreatableSelect
											isClearable
											isMulti
											unstyled
											options={TAG_OPTIONS}
											classNames={{
												control: ({ isFocused }) =>
													`rounded-lg border px-2 py-1 bg-secondary transition-colors ${
														isFocused
															? 'border-blue-500'
															: 'border-input hover:border-blue-500'
													}`,
												menu: () =>
													'mt-1 rounded-lg border border-secondary bg-secondary shadow-lg',
												menuList: () => 'py-1',
												option: ({ isFocused, isSelected }) =>
													`px-3 py-2 cursor-pointer text-secondary-foreground transition-colors ${
														isSelected
															? 'bg-blue-600 text-white'
															: isFocused
																? 'bg-accent text-accent-foreground'
																: 'bg-transparent'
													}`,
												multiValue: () =>
													'inline-flex items-center gap-1 bg-primary/10 border border-primary/30 rounded-sm mx-1 px-2 py-0.5',
												multiValueLabel: () =>
													'text-foreground text-sm font-medium leading-none',
												multiValueRemove: ({ isFocused }) =>
													`ml-0.5 rounded transition-all duration-150 text-muted-foreground hover:bg-destructive hover:text-white ${
														isFocused ? 'bg-destructive text-white' : ''
													}`,
												placeholder: () => 'text-muted-foreground',
												input: () => 'text-secondary-foreground',
												indicatorsContainer: () => 'text-muted-foreground',
												clearIndicator: ({ isFocused }) =>
													`p-1 rounded transition-colors ${isFocused ? 'text-foreground' : ''}`,
												dropdownIndicator: ({ isFocused }) =>
													`p-1 transition-colors ${isFocused ? 'text-foreground' : ''}`,
											}}
											{...field}
											onChange={field.onChange}
										/>
									)}
								/>
							</FormItem>
						</div>

						{/* Cover Image */}
						<FormItem className='w-full grid grid-cols-2 justify-between items-center'>
							<div>
								<FormLabel>Cover Image</FormLabel>
								<FormControl>
									<Button
										type='button'
										variant='outline'
										className='w-full justify-start gap-2 mt-3'
										onClick={() => coverInputRef.current?.click()}
									>
										<Upload className='h-4 w-4' />
										{coverPreview ? 'Change Cover Image' : 'Upload Cover Image'}
									</Button>
								</FormControl>
							</div>

							<div>
								{coverPreview && (
									<img
										src={coverPreview}
										className='h-24 w-full rounded-sm object-cover border'
									/>
								)}

								<input
									ref={coverInputRef}
									type='file'
									hidden
									onChange={handleCoverUpload}
								/>
							</div>
						</FormItem>

						{/* Markdown Upload */}
						<div>
							<div className='flex w-full justify-end'>
								<Button
									type='button'
									variant='secondary'
									size='sm'
									className='cursor-pointer hover:bg-accent hover:text-accent-foreground'
									onClick={() => mdFileInputRef.current?.click()}
								>
									<span>Upload .md</span>
									<FileUp className='h-4 w-4' />
								</Button>
							</div>

							<input
								ref={mdFileInputRef}
								type='file'
								hidden
								onChange={handleMdUpload}
							/>
						</div>

						{/* Content */}
						<FormField
							control={form.control}
							name='content'
							rules={{ required: 'Content is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormControl>
										<div data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
											<MDEditor {...field} height={300} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Footer */}
						<DialogFooter className='pt-4'>
							<Button type='button' variant='outline' onClick={onClose}>
								Cancel
							</Button>
							<Button type='submit' disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting
									? isEditMode
										? 'Saving...'
										: 'Publishing...'
									: isEditMode
										? 'Save Changes'
										: 'Publish Post'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export type Blog = IBlog

export default AddBlogModal
