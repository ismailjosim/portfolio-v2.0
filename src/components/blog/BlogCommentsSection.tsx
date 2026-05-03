/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { formatDateTime } from '@/src/lib/formatters.ts'

interface Comment {
	_id: string
	name: string
	content: string
	createdAt: string
}

export default function BlogCommentsSection({
	blogId,
	initialCommentsCount,
	initialLikesCount,
	slug,
}: any) {
	const [comments, setComments] = useState<Comment[]>([])
	const [count, setCount] = useState(initialCommentsCount)
	const [likesCount, setLikesCount] = useState(initialLikesCount)
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState('')
	const [content, setContent] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		fetchComments()
	}, [slug])

	const fetchComments = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}/comments`,
			)

			const data = await res.json()
			setComments(data.comments || [])
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name.trim() || !content.trim()) {
			toast.error('Fill all fields')
			return
		}

		setIsSubmitting(true)

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}/comments`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name, content }),
				},
			)

			const newComment = await res.json()

			setComments([newComment, ...comments])
			setCount((c: any) => c + 1)

			setName('')
			setContent('')

			toast.success('Comment posted')
		} catch (err) {
			toast.error('Failed')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='max-w-3xl mx-auto mt-12'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold flex items-center gap-2'>
					<MessageCircle className='w-5 h-5' />
					Comments
				</h2>

				<div className='flex items-center gap-4 text-sm text-muted-foreground'>
					<span className='flex items-center gap-1'>
						<Heart className='w-4 h-4 text-red-500' />
						{likesCount}
					</span>
					<span>{count} comments</span>
				</div>
			</div>

			{/* Input box (Facebook style) */}
			<form onSubmit={handleSubmitComment} className='flex gap-3 mb-8'>
				<div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold'>
					{name?.[0]?.toUpperCase() || 'U'}
				</div>

				<div className='flex-1'>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Your name'
						className='w-full mb-2 px-3 py-2 rounded-md border bg-background'
					/>

					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='Write a comment...'
						rows={2}
						className='w-full px-3 py-2 rounded-md border bg-background resize-none'
					/>

					<div className='flex justify-end mt-2'>
						<button
							type='submit'
							disabled={isSubmitting}
							className='px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90'
						>
							{isSubmitting ? 'Posting...' : 'Comment'}
						</button>
					</div>
				</div>
			</form>

			{/* Comments list */}
			<div className='space-y-4'>
				{loading ? (
					<p className='text-sm text-muted-foreground'>Loading comments...</p>
				) : comments.length === 0 ? (
					<p className='text-sm text-muted-foreground'>No comments yet</p>
				) : (
					comments.map((c) => (
						<div key={c._id} className='flex gap-3'>
							{/* Avatar */}
							<div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold'>
								{c.name[0]?.toUpperCase()}
							</div>

							{/* Bubble */}
							<div className='flex-1'>
								<div className='bg-muted/50 rounded-xl px-4 py-2'>
									<div className='flex justify-between items-center'>
										<p className='font-semibold text-sm'>{c.name}</p>
										<span className='text-xs text-muted-foreground'>
											{formatDateTime(c.createdAt)}
										</span>
									</div>

									<p className='text-sm mt-1 whitespace-pre-wrap'>
										{c.content}
									</p>
								</div>

								{/* Actions (optional Facebook style) */}
								<div className='flex gap-4 text-xs text-muted-foreground mt-1 px-2'>
									<button className='hover:underline'>Like</button>
									<button className='hover:underline'>Reply</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</section>
	)
}
