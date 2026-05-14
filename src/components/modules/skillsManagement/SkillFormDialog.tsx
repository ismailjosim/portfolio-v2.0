'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
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
import {
	Select as SelectElement,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select'
import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/checkbox'

import {
	createSkill,
	updateSkill,
	ISkillPayload,
} from '../../../services/skill-management'

import { ISkill } from '../../../models/Skill'

// ─── Constants ─────────────────────────────────────────────

const PROFICIENCY_LEVELS = [
	{ value: 'beginner', label: 'Beginner' },
	{ value: 'intermediate', label: 'Intermediate' },
	{ value: 'advanced', label: 'Advanced' },
	{ value: 'expert', label: 'Expert' },
]

// ─── Types ─────────────────────────────────────────────────

interface SkillFormValues {
	name: string
	category: string
	proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
	description?: string
	yearsOfExperience?: number
	icon?: string
	isPublished?: boolean
}

interface ISkillDialogProps {
	open: boolean
	onClose: () => void
	onSuccess: () => void
	skill?: ISkill
}

// ─── Component ─────────────────────────────────────────────

const SkillFormDialog = ({
	open,
	onClose,
	onSuccess,
	skill,
}: ISkillDialogProps) => {
	const isEdit = !!skill?._id

	const form = useForm<SkillFormValues>({
		defaultValues: {
			name: '',
			category: '',
			proficiency: 'intermediate',
			description: '',
			yearsOfExperience: undefined,
			icon: '',
			isPublished: true,
		},
	})

	// Populate form when skill prop changes (edit mode)
	useEffect(() => {
		if (skill) {
			form.reset({
				name: skill.name,
				category: skill.category,
				proficiency: skill.proficiency,
				description: skill.description || '',
				yearsOfExperience: skill.yearsOfExperience,
				icon: skill.icon || '',
				isPublished: skill.isPublished,
			})
		} else {
			form.reset({
				name: '',
				category: '',
				proficiency: 'intermediate',
				description: '',
				yearsOfExperience: undefined,
				icon: '',
				isPublished: true,
			})
		}
	}, [skill, form])

	const handleClose = () => {
		form.reset()
		onClose()
	}

	const onSubmit = async (data: SkillFormValues) => {
		try {
			const payload: ISkillPayload = {
				name: data.name,
				category: data.category,
				proficiency: data.proficiency,
				description: data.description || undefined,
				yearsOfExperience: data.yearsOfExperience,
				icon: data.icon || undefined,
				isPublished: data.isPublished ?? true,
			}

			let result

			if (isEdit && skill?._id) {
				result = await updateSkill(skill._id.toString(), payload)
			} else {
				result = await createSkill(payload)
			}

			if (!result.success) {
				toast.error(result.message || 'Failed to save skill')
				return
			}

			toast.success(
				isEdit ? 'Skill updated successfully' : 'Skill created successfully',
			)

			onSuccess()
			handleClose()
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? 'Edit Skill' : 'Create New Skill'}
					</DialogTitle>

					<DialogDescription>
						Add a new skill to your portfolio or update an existing one
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col flex-1 min-h-0'
					>
						<div className='flex-1 overflow-y-auto space-y-4 px-1'>
							{/* Name and Category */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='name'
									rules={{ required: 'Skill name is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Skill Name</FormLabel>
											<FormControl>
												<Input placeholder='React.js' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='category'
									rules={{ required: 'Category is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input placeholder='Frontend Development' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Proficiency and Years of Experience */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='proficiency'
									rules={{ required: 'Proficiency level is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Proficiency Level</FormLabel>
											<SelectElement
												value={field.value}
												onValueChange={field.onChange}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select proficiency' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{PROFICIENCY_LEVELS.map((level) => (
														<SelectItem key={level.value} value={level.value}>
															{level.label}
														</SelectItem>
													))}
												</SelectContent>
											</SelectElement>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='yearsOfExperience'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Years of Experience</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='0'
													max='50'
													placeholder='5'
													{...field}
													onChange={(e) =>
														field.onChange(
															e.target.value
																? Number(e.target.value)
																: undefined,
														)
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							{/* Icon and Description */}
							<FormField
								control={form.control}
								name='icon'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon (Lucide name)</FormLabel>
										<FormControl>
											<Input
												placeholder='Code2, Database, Palette...'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={4}
												placeholder='Brief description of your skill...'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Published Checkbox */}
							<FormField
								control={form.control}
								name='isPublished'
								render={({ field }) => (
									<FormItem className='flex items-center gap-3'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className='m-0'>Publish this skill</FormLabel>
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
								{isEdit ? 'Update Skill' : 'Create Skill'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default SkillFormDialog
