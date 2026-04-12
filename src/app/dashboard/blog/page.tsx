import BlogManagementHeader from '../../../components/dashboard/BlogPage/BlogManagementHeader'
import { IBlog } from '../../../types/blog.interface'
import { deleteBlog, getAllBlogs } from '../../../services/blog-management'

import { queryStringFormatter } from '../../../lib/formatters.ts'

const DashboardBlogPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
	const searchParamsObj = await searchParams
	const queryString = queryStringFormatter(searchParamsObj)
	const blogsResult = await getAllBlogs(queryString)
	console.log(blogsResult)

	return (
		<section className='p-6'>
			{/* <BlogManagementHeader
				onOpenEdit={handleOpenEdit}
				isDialogOpen={isDialogOpen}
				selectedBlog={selectedBlog}
				onCloseDialog={handleCloseDialog}
				onSuccess={handleSuccess}
			/> */}

			<div className='mt-6 border rounded-lg overflow-hidden'></div>
		</section>
	)
}

export default DashboardBlogPage
