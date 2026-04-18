'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

interface BlogLikeButtonProps {
	blogId: string
	initialCount: number
	slug: string
}

export default function BlogLikeButton({
	blogId,
	initialCount,
	slug,
}: BlogLikeButtonProps) {
	const [isLiked, setIsLiked] = useState(false)
	const [count, setCount] = useState(initialCount)
	const [isLoading, setIsLoading] = useState(false)

	const handleLike = async () => {
		if (isLiked) {
			toast.info('You already liked this post')
			return
		}

		setIsLoading(true)
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}/likes`,
				{
					method: 'PATCH',
				},
			)

			if (!response.ok) {
				throw new Error('Failed to like blog')
			}

			setIsLiked(true)
			setCount(count + 1)
			toast.success('Blog liked!')
		} catch (error) {
			console.error('Failed to like blog:', error)
			toast.error('Failed to like blog')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			onClick={handleLike}
			disabled={isLoading || isLiked}
			className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
				isLiked
					? 'bg-red-500/10 border-red-500/30 text-red-500'
					: 'hover:bg-accent/10 hover:border-accent'
			} disabled:opacity-50 disabled:cursor-not-allowed`}
		>
			<Heart
				className={`w-5 h-5 transition-transform ${isLiked ? 'fill-current' : ''}`}
			/>
			<span>
				{count} {count === 1 ? 'like' : 'likes'}
			</span>
		</button>
	)
}
