import BlogManagementHeader from '../../../components/dashboard/BlogPage/BlogManagementHeader'

const DashboardBlogPage = () => {
	return (
		<section className='p-6'>
			<BlogManagementHeader />

			<div className='mt-6 border rounded-lg overflow-hidden'>
				<table className='w-full text-left'>
					<thead className='bg-gray-50 border-b'>
						<tr>
							<th className='px-4 py-2'>Title</th>
							<th className='px-4 py-2'>Author</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='px-4 py-2 border-b'>Table content will go here</td>
							<td className='px-4 py-2 border-b'>...</td>
							<td className='px-4 py-2 border-b'>...</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default DashboardBlogPage
