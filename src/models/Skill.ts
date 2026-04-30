import mongoose, { Schema, Document } from 'mongoose'

export interface ISkill extends Document {
	name: string
	category: string
	proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
	description?: string
	yearsOfExperience?: number
	icon?: string
	isPublished: boolean
	order?: number
	createdAt: Date
	updatedAt: Date
}

const SkillSchema = new Schema<ISkill>(
	{
		name: {
			type: String,
			required: [true, 'Skill name is required'],
			trim: true,
			minlength: [2, 'Name must be at least 2 characters'],
			maxlength: [100, 'Name cannot exceed 100 characters'],
		},
		category: {
			type: String,
			required: [true, 'Category is required'],
			trim: true,
			minlength: [2, 'Category must be at least 2 characters'],
			maxlength: [60, 'Category cannot exceed 60 characters'],
		},
		proficiency: {
			type: String,
			enum: {
				values: ['beginner', 'intermediate', 'advanced', 'expert'],
				message: 'Invalid proficiency level',
			},
			default: 'intermediate',
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, 'Description cannot exceed 500 characters'],
		},
		yearsOfExperience: {
			type: Number,
			min: [0, 'Years of experience cannot be negative'],
			max: [50, 'Years of experience seems unrealistic'],
		},
		icon: {
			type: String,
			trim: true,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
		order: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
)

// Index for common queries
SkillSchema.index({ category: 1, name: 1 })
SkillSchema.index({ isPublished: 1 })

const Skill =
	mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)

export default Skill
