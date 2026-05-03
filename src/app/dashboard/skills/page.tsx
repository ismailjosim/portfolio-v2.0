import { Suspense } from 'react'

import RefreshButton from '../../../components/shared/RefreshButton'
import { TableSkeleton } from '../../../components/shared/TableSkeleton'

import TablePagination from '../../../components/shared/TablePagination'
// import { queryStringFormatter } from '../../../lib/formatters.ts'

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
	// const searchParamsObj = await searchParams
	// const queryStr = queryStringFormatter(searchParamsObj)

	// const result = await getSkills(queryStr)

	// const totalPages = Math.ceil(result.meta.total / result.meta.limit)

	return (
		<div className='space-y-6'>
			{/* <SkillManagementHeader /> */}
			<div className='flex'>
				<RefreshButton />
			</div>
			<Suspense fallback={<TableSkeleton columns={2} />}>
				{/* <SkillTable /> */}
				<TablePagination currentPage={1} totalPages={50} />
			</Suspense>
		</div>
	)
}

export default page
