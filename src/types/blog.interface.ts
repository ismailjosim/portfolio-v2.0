
export interface IBlogTag {
    value: string
    label: string
}

export interface IBlog {
    id?: string | number
    title: string
    category: string
    coverImage?: string
    coverImagePreview?: string
    tags: string[]
    content: string
    slug?: string
    createdAt?: string
    updatedAt?: string
}
