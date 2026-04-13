export interface IBlogTag {
	value: string
	label: string
}

export interface IBlog {
	_id?: string

	title: string
	category: string
	coverImage: string
	coverImagePreview?: string
	tags: string[]
	content: string
	slug?: string
	createdAt?: string | Date
	updatedAt?: string | Date

	views: number
	likesCount: number
	commentsCount: number
}
