import { Suspense } from 'react'
import { TableSkeleton } from '../../../components/shared/TableSkeleton'
import TablePagination from '../../../components/shared/TablePagination'
import SkillManagementHeader from '@/src/components/modules/skillsManagement/SkillManagementHeader'
import SkillsTable from '@/src/components/modules/skillsManagement/SkillsTable'
import SkillFilter from '@/src/components/modules/skillsManagement/SkillFilter'
import { getAllSkills } from '@/src/services/skill-management'
import { queryStringFormatter } from '@/src/lib/formatters.ts'

const SkillsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
	const searchParamsObj = await searchParams
	const queryString = queryStringFormatter(searchParamsObj)
	const skillsResult = await getAllSkills({
		page: searchParamsObj.page ? Number(searchParamsObj.page) : undefined,
		limit: searchParamsObj.limit ? Number(searchParamsObj.limit) : undefined,
		category:
			typeof searchParamsObj.category === 'string'
				? searchParamsObj.category
				: undefined,
		proficiency:
			typeof searchParamsObj.proficiency === 'string'
				? searchParamsObj.proficiency
				: undefined,
		search:
			typeof searchParamsObj.searchTerm === 'string'
				? searchParamsObj.searchTerm
				: undefined,
	})

	const totalPages = Math.ceil(
		(skillsResult?.pagination?.total || 1) /
			(skillsResult?.pagination?.limit || 1),
	)

	return (
		<div className='space-y-6'>
			<SkillManagementHeader />

			{/* search filter */}
			<SkillFilter />

			<Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
				<SkillsTable skills={skillsResult?.data || []} />
				<TablePagination
					currentPage={skillsResult?.pagination?.page || 1}
					totalPages={totalPages || 1}
				/>
			</Suspense>
		</div>
	)
}

export default SkillsPage
