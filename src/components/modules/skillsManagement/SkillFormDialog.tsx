'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Search, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as LucideIcons from 'lucide-react'

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
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'

import {
	createSkill,
	updateSkill,
	ISkillPayload,
} from '../../../services/skill-management'

import { ISkill } from '../../../models/Skill'
import { SkillCategoryDTO } from '@/src/types/skill.interface'

// ─── Constants ─────────────────────────────────────────────

const PROFICIENCY_LEVELS = [
	{ value: 'beginner', label: 'Beginner' },
	{ value: 'intermediate', label: 'Intermediate' },
	{ value: 'advanced', label: 'Advanced' },
	{ value: 'expert', label: 'Expert' },
]

/**
 * Curated list of Lucide icons relevant for a dev portfolio.
 * Add or remove names as needed — they must match lucide-react exports exactly.
 */
const ICON_LIST: string[] = [
	// Languages & code
	'Code2',
	'CodeXml',
	'FileCode',
	'FileCode2',
	'Braces',
	'Hash',
	'Terminal',
	'Cpu',
	'Binary',
	'Sigma',
	// Web & network
	'Globe',
	'Globe2',
	'Wifi',
	'Server',
	'Cloud',
	'CloudCog',
	'Link',
	'Link2',
	'Rss',
	'Network',
	// Data
	'Database',
	'DatabaseZap',
	'HardDrive',
	'Archive',
	'Table',
	'Sheet',
	// UI & design
	'Palette',
	'Brush',
	'Layers',
	'Layout',
	'Monitor',
	'Smartphone',
	'Frame',
	'PenTool',
	'Crop',
	'Image',
	// DevOps & tools
	'GitBranch',
	'GitMerge',
	'GitCommit',
	'GitPullRequest',
	'Wrench',
	'Settings',
	'Settings2',
	'Cog',
	'Hammer',
	'Package',
	'PackageOpen',
	'Box',
	'Boxes',
	// Security & auth
	'Shield',
	'ShieldCheck',
	'ShieldAlert',
	'Lock',
	'Key',
	'Fingerprint',
	// Cloud & deploy
	'Rocket',
	'Zap',
	'ZapOff',
	'Flame',
	'Leaf',
	// Communication
	'Mail',
	'MessageSquare',
	'Bell',
	'Send',
	// Payment
	'CreditCard',
	'Wallet',
	'DollarSign',
	'Receipt',
	// Misc
	'Blocks',
	'LayoutDashboard',
	'Gauge',
	'Activity',
	'FlaskConical',
	'TestTube',
	'Microscope',
	'Puzzle',
	'Component',
	'Workflow',
	'Link2',
]

// ─── Icon Picker ────────────────────────────────────────────

interface IconPickerProps {
	value: string
	onChange: (icon: string) => void
}

function IconPicker({ value, onChange }: IconPickerProps) {
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)

	const filtered = ICON_LIST.filter((name) =>
		name.toLowerCase().includes(search.toLowerCase()),
	)

	const SelectedIcon = value
		? (LucideIcons[value as keyof typeof LucideIcons] as React.FC<{
				size?: number
				className?: string
			}>)
		: null

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='outline'
					role='combobox'
					className='w-full justify-start gap-2 font-normal'
				>
					{SelectedIcon ? (
						<>
							<SelectedIcon
								size={16}
								className='shrink-0 text-muted-foreground'
							/>
							<span>{value}</span>
						</>
					) : (
						<span className='text-muted-foreground'>Pick an icon…</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className='w-80 p-0' align='start' side='bottom'>
				{/* Search */}
				<div className='flex items-center gap-2 border-b px-3 py-2'>
					<Search size={14} className='text-muted-foreground shrink-0' />
					<input
						type='text'
						placeholder='Search icons…'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'
					/>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-7 gap-1 p-2 max-h-56 overflow-y-auto'>
					{filtered.length === 0 && (
						<p className='col-span-7 text-center text-xs text-muted-foreground py-4'>
							No icons found
						</p>
					)}
					{filtered.map((name) => {
						const Icon = LucideIcons[
							name as keyof typeof LucideIcons
						] as React.FC<{
							size?: number
							className?: string
						}>
						if (!Icon) return null
						const isSelected = value === name

						return (
							<button
								key={name}
								type='button'
								title={name}
								onClick={() => {
									onChange(name)
									setOpen(false)
									setSearch('')
								}}
								className={`
									relative flex items-center justify-center rounded p-2 transition-colors
									hover:bg-accent
									${isSelected ? 'bg-primary/10 ring-1 ring-primary' : ''}
								`}
							>
								<Icon
									size={16}
									className={isSelected ? 'text-primary' : 'text-foreground'}
								/>
								{isSelected && (
									<span className='absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary'>
										<Check size={8} className='text-primary-foreground' />
									</span>
								)}
							</button>
						)
					})}
				</div>

				{/* Footer hint */}
				<div className='border-t px-3 py-2'>
					<p className='text-xs text-muted-foreground'>
						{filtered.length} icon{filtered.length !== 1 ? 's' : ''}
						{value && (
							<button
								type='button'
								onClick={() => {
									onChange('')
									setOpen(false)
								}}
								className='ml-2 text-destructive hover:underline'
							>
								Clear
							</button>
						)}
					</p>
				</div>
			</PopoverContent>
		</Popover>
	)
}

// ─── Types ─────────────────────────────────────────────────

interface SkillFormValues {
	name: string
	categoryId: string
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
	/** Pass all available categories for the dropdown */
	categories?: SkillCategoryDTO[]
}

// ─── Component ─────────────────────────────────────────────

const SkillFormDialog = ({
	open,
	onClose,
	onSuccess,
	skill,
	categories,
}: ISkillDialogProps) => {
	const isEdit = !!skill?._id

	const form = useForm<SkillFormValues>({
		defaultValues: {
			name: '',
			categoryId: '',
			proficiency: 'intermediate',
			description: '',
			yearsOfExperience: undefined,
			icon: '',
			isPublished: true,
		},
	})

	useEffect(() => {
		if (skill) {
			form.reset({
				name: skill.name,
				categoryId: skill.category ?? '',
				proficiency: skill.proficiency,
				description: skill.description || '',
				yearsOfExperience: skill.yearsOfExperience,
				icon: skill.icon || '',
				isPublished: skill.isPublished,
			})
		} else {
			form.reset({
				name: '',
				categoryId: '',
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
				category: data.categoryId,
				proficiency: data.proficiency,
				description: data.description,
				yearsOfExperience: data.yearsOfExperience,
				icon: data.icon || undefined,
				isPublished: data.isPublished ?? true,
			}

			const result =
				isEdit && skill?._id
					? await updateSkill(skill._id.toString(), payload)
					: await createSkill(payload)

			if (!result.success) {
				toast.error(result.message || 'Failed to save skill')
				return
			}

			toast.success(isEdit ? 'Skill updated' : 'Skill created')
			onSuccess()
			handleClose()
		} catch {
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
						{isEdit
							? 'Update the details of this skill'
							: 'Add a new skill to your portfolio'}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col flex-1 min-h-0'
					>
						<div className='flex-1 overflow-y-auto space-y-4 px-1 pb-1'>
							{/* ── Row 1: Name + Category ── */}
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

								{/* Category — fixed dropdown from DB */}
								<FormField
									control={form.control}
									name='categoryId'
									rules={{ required: 'Category is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<SelectElement
												value={field.value || ''}
												onValueChange={field.onChange}
											>
												<FormControl>
													<SelectTrigger className='w-full bg-background'>
														<SelectValue placeholder='Select category' />
													</SelectTrigger>
												</FormControl>
												<SelectContent position='popper'>
													{!categories || categories.length === 0 ? (
														<div className='p-2 text-sm text-muted-foreground'>
															No categories available
														</div>
													) : (
														categories.map((cat) => (
															<SelectItem key={cat.id} value={cat.id}>
																{cat.label}
															</SelectItem>
														))
													)}
												</SelectContent>
											</SelectElement>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* ── Row 2: Proficiency + Years ── */}
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
													<SelectTrigger className='w-full bg-background'>
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
													placeholder='e.g. 3'
													{...field}
													value={field.value ?? ''}
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

							{/* ── Icon Picker ── */}
							<FormField
								control={form.control}
								name='icon'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon</FormLabel>
										<FormControl>
											<IconPicker
												value={field.value ?? ''}
												onChange={field.onChange}
											/>
										</FormControl>
										<p className='text-xs text-muted-foreground'>
											Pick a Lucide icon from the palette above.
										</p>
									</FormItem>
								)}
							/>

							{/* ── Description ── */}
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={3}
												placeholder='Brief description of your experience with this skill…'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* ── Publish toggle ── */}
							<FormField
								control={form.control}
								name='isPublished'
								render={({ field }) => (
									<FormItem className='flex items-center gap-3 rounded-md border px-3 py-3'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div>
											<FormLabel className='m-0 cursor-pointer'>
												Publish this skill
											</FormLabel>
											<p className='text-xs text-muted-foreground'>
												Visible on your public portfolio
											</p>
										</div>
									</FormItem>
								)}
							/>
						</div>

						{/* ── Footer ── */}
						<div className='flex justify-end gap-2 pt-4 border-t mt-2'>
							<Button type='button' variant='outline' onClick={handleClose}>
								Cancel
							</Button>
							<Button type='submit' disabled={form.formState.isSubmitting}>
								<Plus className='h-4 w-4 mr-2' />
								{form.formState.isSubmitting
									? 'Saving…'
									: isEdit
										? 'Update Skill'
										: 'Create Skill'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default SkillFormDialog
