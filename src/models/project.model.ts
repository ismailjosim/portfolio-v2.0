import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
	name: string
	subtitle: string
	title: string
	type: string
	image: string
	demoImages?: string[]
	description?: string
	technologies: string[]
	features: string[]
	githubUrl?: string
	liveUrl?: string
	caseStudyUrl?: string
	featured?: boolean
	order?: number
	isPublished?: boolean
	slug: string
	createdAt: Date
	updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
	{
		name: {
			type: String,
			required: [true, 'Project name is required'],
			trim: true,
			maxlength: [100, 'Name cannot exceed 100 characters'],
		},
		subtitle: {
			type: String,
			required: [true, 'Subtitle is required'],
			trim: true,
		},
		title: {
			type: String,
			required: [true, 'Display title is required'],
			trim: true,
		},
		type: {
			type: String,
			required: [true, 'Project type is required'],
			trim: true,
		},
		image: {
			type: String,
			required: [true, 'Main project image is required'],
		},
		demoImages: {
			type: [String],
			default: [],
		},
		description: {
			type: String,
			trim: true,
		},
		technologies: {
			type: [String],
			required: [true, 'Technologies are required'],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: 'At least one technology must be provided',
			},
		},
		features: {
			type: [String],
			default: [],
		},
		githubUrl: {
			type: String,
			trim: true,
		},
		liveUrl: {
			type: String,
			trim: true,
		},
		caseStudyUrl: {
			type: String,
			trim: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		order: {
			type: Number,
			default: 0,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
		slug: {
			type: String,
			required: [true, 'Slug is required'],
			unique: true,
			trim: true,
			lowercase: true,
			match: [
				/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				'Slug must be lowercase letters, numbers, and hyphens only',
			],
		},
	},
	{ timestamps: true },
)

ProjectSchema.index({ type: 1 })
ProjectSchema.index({ technologies: 1 })
ProjectSchema.index({ featured: 1 })
ProjectSchema.index({ order: 1 })

const Project: Model<IProject> =
	mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
