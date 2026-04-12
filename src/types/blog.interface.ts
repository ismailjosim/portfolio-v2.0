export interface IBlogTag {
	value: string
	label: string
}

export interface IBlog {
	title: string
	category: string
	coverImage?: string
	coverImagePreview?: string
	tags: string[]
	content: string
	slug?: string
	createdAt?: string
	updatedAt?: string
	_id: string
	views: number
	likesCount: number
	commentsCount: number
}
