'use client'

import Image from 'next/image'
import { Column, DataTable } from '../../data-table'


export interface Blog {
    id: string
    image: string
    title: string
    author: string
    publishedAt: string
    status: string
}

// sample data; consumers can override via prop
export const blogData: Blog[] = [
    {
        id: '1',
        image: '/blog1.jpg',
        title: 'Mastering Next.js App Router',
        author: 'John Doe',
        publishedAt: 'Mar 01, 2026',
        status: 'Published',
    },
    {
        id: '2',
        image: '/blog2.jpg',
        title: 'MongoDB Schema Design Guide',
        author: 'Jane Smith',
        publishedAt: 'Feb 20, 2026',
        status: 'Draft',
    },
]

interface BlogTableProps {
    data: Blog[]
}

const BlogTable = ({ data }: BlogTableProps) => {
    const columns: Column<Blog>[] = [
        {
            header: 'Image',
            accessor: 'image',
            render: (row) => (
                <Image
                    src={row.image}
                    alt={row.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                />
            ),
        },
        {
            header: 'Title',
            accessor: 'title',
        },
        {
            header: 'Author',
            accessor: 'author',
        },
        {
            header: 'Published',
            accessor: 'publishedAt',
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span
                    className={`px-2 py-1 text-xs rounded-full ${row.status === 'Published'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-yellow-500/20 text-yellow-600'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
    ]

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default BlogTable
