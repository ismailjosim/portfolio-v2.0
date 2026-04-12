import {
	BarChart2,
	BookOpen,
	Calendar,
	Heart,
	Link,
	MessageCircle,
	Tag,
} from 'lucide-react'
import { IBlog } from '../../../types/blog.interface'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog'
import { Badge } from '../../ui/badge'
import InfoRow from '../../shared/InfoRow'
import { Separator } from '../../ui/separator'
import { formatDateTime } from '../../../lib/formatters.ts'

interface IBlogViewDialogProps {
	open: boolean
	onClose: () => void
	blog: IBlog | null
}

const BlogViewDetailDialog = ({
	open,
	onClose,
	blog,
}: IBlogViewDialogProps) => {
	if (!blog) return null

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='min-w-3xl max-h-[90vh] flex flex-col p-0'>
				<DialogHeader className='px-6 pt-6 pb-4'>
					<DialogTitle>Blog Details</DialogTitle>
				</DialogHeader>

				<div className='flex-1 overflow-y-auto px-6 pb-6'>
					{/* Blog Header */}
					<div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg mb-6'>
						{blog.coverImage && (
							<img
								src={blog.coverImage}
								alt={blog.title}
								className='h-28 w-44 rounded-lg object-cover border-4 border-white shadow-lg shrink-0'
							/>
						)}
						<div className='flex-1 text-center sm:text-left'>
							<h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
							<p className='text-muted-foreground mb-3 flex items-center justify-center sm:justify-start gap-2 text-sm'>
								<BookOpen className='h-4 w-4' />
								{blog.category}
							</p>
							<div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
								{blog.tags.map((tag) => (
									<Badge key={tag} variant='secondary' className='text-xs'>
										<Tag className='h-3 w-3 mr-1' />
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>

					<div className='space-y-6'>
						{/* Engagement Stats */}
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<BarChart2 className='h-5 w-5 text-emerald-600' />
								<h3 className='font-semibold text-lg'>Engagement</h3>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg'>
								<div className='flex items-start gap-3'>
									<BarChart2 className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow label='Views' value={String(blog.views)} />
								</div>
								<div className='flex items-start gap-3'>
									<Heart className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow label='Likes' value={String(blog.likesCount)} />
								</div>
								<div className='flex items-start gap-3'>
									<MessageCircle className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow
										label='Comments'
										value={String(blog.commentsCount)}
									/>
								</div>
							</div>
						</div>

						<Separator />

						{/* Post Information */}
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<Calendar className='h-5 w-5 text-orange-600' />
								<h3 className='font-semibold text-lg'>Post Information</h3>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
								<div className='flex items-start gap-3'>
									<Link className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow label='Slug' value={blog.slug} />
								</div>
								<div className='flex items-start gap-3'>
									<BookOpen className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow label='Category' value={blog.category} />
								</div>
								<div className='flex items-start gap-3'>
									<Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow
										label='Created On'
										value={formatDateTime(blog.createdAt as string)}
									/>
								</div>
								<div className='flex items-start gap-3'>
									<Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
									<InfoRow
										label='Last Updated'
										value={formatDateTime(blog.updatedAt as string)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default BlogViewDetailDialog
