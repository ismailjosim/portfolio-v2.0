/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod'
import { zodValidator } from '../lib/zodValidator'

export const blogZodSchema = z.object({
	title: z.string().min(10, 'Title must be at least 10 characters'),
	description: z.string().min(50, 'Description must be at least 50 characters'),
})

// --- Create Blog ---
export const createBlog = async (_prevState: any, formData: FormData) => {
	try {
		const payload = {
			title: formData.get('title') as string,
			description: formData.get('content') as string, // Matching 'name' attribute in your form
		}

		const validation = zodValidator(payload, blogZodSchema)
		if (!validation.success) return validation

		const newFormData = new FormData()
		newFormData.append('data', JSON.stringify(validation.data))

		const file = formData.get('file') as File
		if (file && file.size > 0) {
			newFormData.append('file', file)
		}

		const res = await fetch('/blog/create', {
			method: 'POST',
			body: newFormData,
		})

		const result = await res.json()
		return result
	} catch (error) {
		console.error(error)
		return { success: false, message: 'Failed to create blog' }
	}
}

// --- Update Blog ---
export const updateBlog = async (
	id: string,
	_prevState: any,
	formData: FormData,
) => {
	try {
		const payload = {
			title: formData.get('title') as string,
			description: formData.get('content') as string,
		}

		const validation = zodValidator(payload, blogZodSchema)
		if (!validation.success) return validation

		const newFormData = new FormData()
		newFormData.append('data', JSON.stringify(validation.data))

		const file = formData.get('file') as File
		// Only append file if a new one was selected (file size > 0)
		if (file && file.size > 0) {
			newFormData.append('file', file)
		}

		const res = await fetch(`/blog/update/${id}`, {
			method: 'PATCH', // or 'PUT' depending on your backend
			body: newFormData,
		})

		const result = await res.json()

		if (res.ok) {
			return { ...result, success: true }
		} else {
			return { ...result, success: false, formData: payload }
		}
	} catch (error) {
		console.error(error)
		return { success: false, message: 'Failed to update blog' }
	}
}
