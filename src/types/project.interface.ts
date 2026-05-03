export interface IProject {
	_id?: string

	// Basic identity
	name: string
	subtitle: string
	title: string
	type: string

	// Media
	image: string
	demoImages?: string[]

	// Content
	description?: string
	technologies: string[]
	features: string[]

	// Links
	githubUrl?: string
	liveUrl?: string
	caseStudyUrl?: string

	// Controls
	featured?: boolean
	order?: number
	isPublished?: boolean

	// SEO / optional
	slug?: string

	// timestamps
	createdAt?: string
	updatedAt?: string
}
