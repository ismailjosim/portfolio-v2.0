import { IBlog } from '../types/blog.interface'

export interface IBlogPayload {
	title: string
	category: string
	content: string
	tags: string[]
	coverImage?: string
	slug?: string
}

export async function createBlog(payload: IBlogPayload) {
	try {
		const res = await fetch('/api/blogs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})

		if (!res.ok) {
			const result = await res.json()
			return { success: false, ...result }
		}

		const blog = (await res.json()) as IBlog
		return { success: true, data: blog }
	} catch (error) {
		console.error('createBlog', error)
		return { success: false, message: 'Failed to create blog' }
	}
}

export async function updateBlog(slug: string, payload: IBlogPayload) {
	try {
		const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})

		if (!res.ok) {
			const result = await res.json()
			return { success: false, ...result }
		}

		const blog = (await res.json()) as IBlog
		return { success: true, data: blog }
	} catch (error) {
		console.error('updateBlog', error)
		return { success: false, message: 'Failed to update blog' }
	}
}
