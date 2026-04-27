import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { ArrowRight, Eye, ThumbsUp, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface Blog {
	_id?: string
	title: string
	category: string
	slug?: string
	status: string
	views: number
	likesCount: number
	commentsCount: number
	createdAt?: string | Date
	tags: string[]
}

interface RecentBlogsCardProps {
	blogs: Blog[]
	totalBlogs: number
}

const statusColors: Record<string, string> = {
	draft: 'bg-gray-100 text-gray-800',
	review: 'bg-yellow-100 text-yellow-800',
	scheduled: 'bg-blue-100 text-blue-800',
	published: 'bg-green-100 text-green-800',
	archived: 'bg-red-100 text-red-800',
}

export const RecentBlogsCard = ({
	blogs,
	totalBlogs,
}: RecentBlogsCardProps) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
				<div>
					<CardTitle className='text-xl'>Recent Blogs</CardTitle>
					<p className='text-sm text-muted-foreground mt-1'>
						{totalBlogs} published blogs
					</p>
				</div>
				<Link
					href='/dashboard/blog'
					className='text-sm text-primary hover:underline flex items-center gap-1'
				>
					View All <ArrowRight className='w-3 h-3' />
				</Link>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{blogs.slice(0, 4).map((blog) => (
						<div
							key={blog._id}
							className='p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-border'
						>
							<div className='flex items-start justify-between gap-2'>
								<div className='flex-1 min-w-0'>
									<div className='flex items-center gap-2 flex-wrap'>
										<h4 className='font-medium truncate text-sm'>
											{blog.title}
										</h4>
										<Badge
											variant='secondary'
											className={`text-xs ${
												statusColors[blog.status] || 'bg-muted'
											}`}
										>
											{blog.status}
										</Badge>
									</div>
									<div className='flex items-center gap-3 mt-2 text-xs text-muted-foreground'>
										<span className='flex items-center gap-1'>
											<Eye className='w-3 h-3' />
											{formatNumber(blog.views)}
										</span>
										<span className='flex items-center gap-1'>
											<ThumbsUp className='w-3 h-3' />
											{formatNumber(blog.likesCount)}
										</span>
										<span className='flex items-center gap-1'>
											<MessageCircle className='w-3 h-3' />
											{formatNumber(blog.commentsCount)}
										</span>
									</div>
									{blog.tags.length > 0 && (
										<div className='flex flex-wrap gap-1 mt-2'>
											{blog.tags.slice(0, 2).map((tag) => (
												<Badge key={tag} variant='outline' className='text-xs'>
													{tag}
												</Badge>
											))}
											{blog.tags.length > 2 && (
												<Badge variant='outline' className='text-xs'>
													+{blog.tags.length - 2}
												</Badge>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{blogs.length === 0 && (
					<div className='text-center py-8 text-muted-foreground'>
						<p>No blogs published yet</p>
						<p className='text-xs mt-1'>
							Create your first blog post to get started
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	}
	return num.toString()
}
