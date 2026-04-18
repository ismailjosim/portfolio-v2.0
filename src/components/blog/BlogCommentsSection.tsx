'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { toast } from 'sonner'
import { formatDateTime } from '@/src/lib/formatters.ts'

interface Comment {
	_id: string
	name: string
	content: string
	isApproved: boolean
	createdAt: string
}

interface BlogCommentsSectionProps {
	blogId: string
	initialCount: number
	slug: string
}

export default function BlogCommentsSection({
	blogId,
	initialCount,
	slug,
}: BlogCommentsSectionProps) {
	const [comments, setComments] = useState<Comment[]>([])
	const [count, setCount] = useState(initialCount)
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState('')
	const [content, setContent] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		fetchComments()
	}, [slug])

	const fetchComments = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}/comments`,
			)

			if (!response.ok) {
				throw new Error('Failed to fetch comments')
			}

			const data = await response.json()
			setComments(data.comments || [])
		} catch (error) {
			console.error('Failed to fetch comments:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name.trim() || !content.trim()) {
			toast.error('Please fill in all fields')
			return
		}

		setIsSubmitting(true)
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}/comments`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: name.trim(),
						content: content.trim(),
					}),
				},
			)

			if (!response.ok) {
				throw new Error('Failed to post comment')
			}

			const newComment = await response.json()
			setComments([newComment, ...comments])
			setCount(count + 1)
			setName('')
			setContent('')
			toast.success('Comment posted! (pending approval)')
		} catch (error) {
			console.error('Failed to post comment:', error)
			toast.error('Failed to post comment')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='max-w-4xl mx-auto'>
			<div className='flex items-center gap-3 mb-8'>
				<MessageCircle className='w-6 h-6' />
				<h2 className='text-2xl font-bold'>Comments ({count})</h2>
			</div>

			{/* Comment Form */}
			<form
				onSubmit={handleSubmitComment}
				className='mb-12 p-6 rounded-lg bg-muted/50 border'
			>
				<h3 className='font-semibold mb-4'>Leave a Comment</h3>

				<div className='space-y-4'>
					<div>
						<label htmlFor='name' className='block text-sm font-medium mb-2'>
							Your Name
						</label>
						<input
							id='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='John Doe'
							className='w-full px-4 py-2 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-accent'
							disabled={isSubmitting}
							required
						/>
					</div>

					<div>
						<label htmlFor='content' className='block text-sm font-medium mb-2'>
							Your Comment
						</label>
						<textarea
							id='content'
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder='Share your thoughts...'
							rows={4}
							className='w-full px-4 py-2 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-accent resize-none'
							disabled={isSubmitting}
							required
						/>
					</div>

					<button
						type='submit'
						disabled={isSubmitting}
						className='inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					>
						<Send className='w-4 h-4' />
						{isSubmitting ? 'Posting...' : 'Post Comment'}
					</button>
					<p className='text-xs text-muted-foreground'>
						Comments are moderated and will appear after approval.
					</p>
				</div>
			</form>

			{/* Comments List */}
			<div className='space-y-6'>
				{loading ? (
					<div className='text-center py-8'>
						<p className='text-muted-foreground'>Loading comments...</p>
					</div>
				) : comments.length === 0 ? (
					<div className='text-center py-8'>
						<p className='text-muted-foreground'>
							No comments yet. Be the first to comment!
						</p>
					</div>
				) : (
					comments.map((comment) => (
						<div
							key={comment._id}
							className='p-4 rounded-lg bg-muted/30 border'
						>
							<div className='flex items-start justify-between mb-2'>
								<div>
									<p className='font-semibold'>{comment.name}</p>
									<p className='text-xs text-muted-foreground'>
										{formatDateTime(comment.createdAt)}
									</p>
								</div>
								{!comment.isApproved && (
									<span className='text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-600'>
										Pending Approval
									</span>
								)}
							</div>
							<p className='text-sm text-foreground whitespace-pre-wrap'>
								{comment.content}
							</p>
						</div>
					))
				)}
			</div>
		</section>
	)
}
