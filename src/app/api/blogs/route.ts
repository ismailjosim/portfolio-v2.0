import { NextResponse } from 'next/server'

import Blog from '../../../models/Blog'
import { parseMongooseError } from '../../../lib/parseMongooseError'
import { connectDB } from '../../../lib/mongodb'

// GET /api/blogs
// Supports: ?page=1&limit=10&category=nextjs&tag=react&search=hello
export async function GET(req: Request) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const page = Math.max(1, Number(searchParams.get('page') ?? 1))
        const limit = Math.min(
            50,
            Math.max(1, Number(searchParams.get('limit') ?? 10)),
        )
        const category = searchParams.get('category')
        const tag = searchParams.get('tag')
        const search = searchParams.get('search')

        const filter: Record<string, unknown> = {}
        if (category) filter.category = category
        if (tag) filter.tags = tag
        if (search)
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ]

        const [blogs, total] = await Promise.all([
            Blog.find(filter)
                .select('-__v')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Blog.countDocuments(filter),
        ])

        return NextResponse.json({
            blogs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        })
    } catch (err) {
        console.error('[GET /api/blogs]', err)
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 },
        )
    }
}

// POST /api/blogs
export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()

        // Auto-generate slug from title if not provided
        if (!body.slug && body.title) {
            body.slug = body.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
        }

        const blog = await Blog.create(body)

        return NextResponse.json(blog, { status: 201 })
    } catch (err: unknown) {
        const errors = parseMongooseError(err)
        if (errors) {
            return NextResponse.json({ errors }, { status: 422 })
        }
        console.error('[POST /api/blogs]', err)
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 },
        )
    }
}
