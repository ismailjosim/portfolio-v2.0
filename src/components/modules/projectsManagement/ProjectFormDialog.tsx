'use client'

import React, { useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Upload, Plus } from 'lucide-react'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'sonner'

// shadcn ui
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '../../ui/dialog'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form'

import { Button } from '../../ui/button'

import { uploadImage } from '@/src/services/upload.action'

import {
	createProject,
	updateProject,
	IProjectPayload,
} from '../../../services/project-management'

import { IProject } from '../../../types/project.interface'

interface ProjectFormValues {
	name: string
	subtitle: string
	title: string
	type: string

	image: string | null
	imagePreview?: string

	description: string

	technologies: { label: string; value: string }[]
	features: string

	githubUrl: string
	liveUrl: string
	caseStudyUrl: string
}

interface IProjectDialogProps {
	open: boolean
	onClose: () => void
	onSuccess: () => void
	project?: IProject
}

const ProjectFormDialog = ({
	open,
	onClose,
	onSuccess,
	project,
}: IProjectDialogProps) => {
	const coverInputRef = useRef<HTMLInputElement>(null)
	const coverFileRef = useRef<File | null>(null)

	const isEdit = !!project?.slug

	const form = useForm<ProjectFormValues>({
		defaultValues: {
			name: '',
			subtitle: '',
			title: '',
			type: '',
			image: null,
			imagePreview: '',
			description: '',
			technologies: [],
			features: '',
			githubUrl: '',
			liveUrl: '',
			caseStudyUrl: '',
		},
	})

	useEffect(() => {
		if (project) {
			form.reset({
				name: project.name,
				subtitle: project.subtitle,
				title: project.title,
				type: project.type,
				image: null,
				imagePreview: project.image,
				description: project.description || '',
				technologies: project.technologies.map((item) => ({
					label: item,
					value: item,
				})),
				features: (project.features || []).join('\n'),
				githubUrl: project.githubUrl || '',
				liveUrl: project.liveUrl || '',
				caseStudyUrl: project.caseStudyUrl || '',
			})
		} else {
			form.reset()
		}
	}, [project, form])

	const imagePreview = form.watch('imagePreview')

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		coverFileRef.current = file

		const localPreview = URL.createObjectURL(file)
		form.setValue('imagePreview', localPreview)
		form.setValue('image', null)
	}

	const handleClose = () => {
		coverFileRef.current = null
		form.reset()
		onClose()
	}

	const onSubmit = async (data: ProjectFormValues) => {
		try {
			let imageUrl = data.image

			if (coverFileRef.current) {
				const formData = new FormData()
				formData.append('image', coverFileRef.current)

				const result = await uploadImage(formData)

				if (!result.success) {
					toast.error('Image upload failed')
					return
				}

				imageUrl = result.url!
			}

			const payload: IProjectPayload = {
				name: data.name,
				subtitle: data.subtitle,
				title: data.title,
				type: data.type,
				image: imageUrl || '',
				description: data.description,
				technologies: data.technologies.map((item) => item.value),
				features: data.features
					.split('\n')
					.map((item) => item.trim())
					.filter(Boolean),
				githubUrl: data.githubUrl || undefined,
				liveUrl: data.liveUrl || undefined,
				caseStudyUrl: data.caseStudyUrl || undefined,
			}

			let result

			if (isEdit && project?.slug) {
				result = await updateProject(project.slug, payload)
			} else {
				result = await createProject(payload)
			}

			if (!result.success) {
				toast.error(result.message || 'Failed to save project')
				return
			}

			toast.success(
				isEdit
					? 'Project updated successfully'
					: 'Project created successfully',
			)

			onSuccess()
			handleClose()
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? 'Edit Project' : 'Create New Project'}
					</DialogTitle>

					<DialogDescription>
						Add your portfolio project details
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col flex-1 min-h-0'
					>
						<div className='flex-1 overflow-y-auto space-y-4 px-1'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='name'
									rules={{ required: 'Name is Required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder='TRAVELER' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='subtitle'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subtitle</FormLabel>
											<FormControl>
												<Input placeholder='Tour Management' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='title'
								rules={{ required: 'Required' }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder='Traveler — Tour Management System'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Input
												placeholder='Full Stack Web Application'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Image */}
							<FormItem>
								<FormLabel>Project Image</FormLabel>

								<Button
									type='button'
									variant='outline'
									onClick={() => coverInputRef.current?.click()}
									className='w-full justify-start gap-2'
								>
									<Upload className='h-4 w-4' />
									Upload Image
								</Button>

								<input
									hidden
									type='file'
									accept='image/*'
									ref={coverInputRef}
									onChange={handleImageUpload}
								/>

								{imagePreview && (
									<img
										src={imagePreview}
										className='h-36 w-full object-cover rounded-md border mt-3'
									/>
								)}
							</FormItem>

							{/* Description */}
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={4}
												placeholder='Short project summary...'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Technologies */}
							<FormItem>
								<FormLabel>Technologies</FormLabel>

								<Controller
									control={form.control}
									name='technologies'
									render={({ field }) => (
										<CreatableSelect
											isMulti
											value={field.value}
											onChange={field.onChange}
											placeholder='React, Node.js...'
										/>
									)}
								/>
							</FormItem>

							{/* Features */}
							<FormField
								control={form.control}
								name='features'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Features</FormLabel>
										<FormControl>
											<Textarea
												rows={6}
												placeholder='One feature per line'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Links */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='githubUrl'
									render={({ field }) => (
										<FormItem>
											<FormLabel>GitHub URL</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='liveUrl'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Live URL</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='caseStudyUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Case Study URL</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className='flex justify-end gap-2 pt-4'>
							<Button type='button' variant='outline' onClick={handleClose}>
								Cancel
							</Button>

							<Button type='submit'>
								<Plus className='h-4 w-4 mr-2' />
								{isEdit ? 'Update Project' : 'Create Project'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default ProjectFormDialog
