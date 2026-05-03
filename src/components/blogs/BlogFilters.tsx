'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/src/components/ui/input'
import { Button } from '../ui/button'

const categories = ['all', 'technology', 'lifestyle', 'travel', 'finance']

export default function BlogFilters() {
	const router = useRouter()
	const params = useSearchParams()

	const handleCategory = (cat: string) => {
		const newParams = new URLSearchParams(params.toString())

		if (cat === 'all') newParams.delete('category')
		else newParams.set('category', cat)

		newParams.set('page', '1')

		router.push(`?${newParams.toString()}`)
	}

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = new FormData(e.currentTarget)
		const value = form.get('search') as string

		const newParams = new URLSearchParams(params.toString())

		if (value) newParams.set('search', value)
		else newParams.delete('search')

		newParams.set('page', '1')

		router.push(`?${newParams.toString()}`)
	}

	return (
		<div className='space-y-4'>
			{/* Search */}
			<form onSubmit={handleSearch} className='flex gap-2'>
				<Input name='search' placeholder='Search...' />
				<Button type='submit'>Search</Button>
			</form>

			{/* Categories */}
			<div className='flex gap-2 flex-wrap'>
				{categories.map((cat) => (
					<Button
						key={cat}
						variant='outline'
						onClick={() => handleCategory(cat)}
					>
						{cat}
					</Button>
				))}
			</div>
		</div>
	)
}
