'use client'

import { formatDateTime } from '@/src/lib/formatters.ts'

interface DateCellProps {
	date?: string | Date
}

export function DateCell({ date }: DateCellProps) {
	return <span className='text-sm'>{formatDateTime(date!)}</span>
}
