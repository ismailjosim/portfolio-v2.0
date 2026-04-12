import BlogManagementHeader from '../../../components/dashboard/BlogPage/BlogManagementHeader'

import { getAllBlogs } from '../../../services/blog-management'

import { queryStringFormatter } from '../../../lib/formatters.ts'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../components/shared/TableSkeleton'
import BlogTable from '../../../components/modules/blogsManagement/blog-table'
import TablePagination from '../../../components/shared/TablePagination'

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

			<Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
				<BlogTable blogs={blogsResult?.data || []} />
				<TablePagination
					currentPage={blogsResult?.pagination?.page || 1}
					totalPages={totalPages || 1}
				/>
			</Suspense>
		</div>
	)
}

export default DashboardBlogPage
