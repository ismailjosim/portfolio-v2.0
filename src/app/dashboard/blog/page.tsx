import { getAllBlogs } from '../../../services/blog-management'
import { queryStringFormatter } from '../../../lib/formatters.ts'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../components/shared/TableSkeleton'
import TablePagination from '../../../components/shared/TablePagination'
import BlogsFilter from '../../../components/modules/blogsManagement/BlogsFilter'
import BlogsTable from '../../../components/modules/blogsManagement/BlogsTable'
import BlogManagementHeader from '@/src/components/modules/blogsManagement/BlogManagementHeader'

const DashboardBlogPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
	const searchParamsObj = await searchParams
	const queryString = queryStringFormatter(searchParamsObj)
	const blogsResult = await getAllBlogs(queryString)

	const totalPages = Math.ceil(
		(blogsResult?.pagination?.total || 1) /
			(blogsResult?.pagination?.limit || 1),
	)

	return (
		<div className='space-y-6'>
			<BlogManagementHeader />

			{/* search filter */}
			<BlogsFilter />

			<Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
				<BlogsTable blogs={blogsResult?.data || []} />
				<TablePagination
					currentPage={blogsResult?.pagination?.page || 1}
					totalPages={totalPages || 1}
				/>
			</Suspense>
		</div>
	)
}

export default DashboardBlogPage
