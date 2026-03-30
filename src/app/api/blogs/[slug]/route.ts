import { NextResponse } from 'next/server'

import Blog from '../../../../models/Blog'
import { parseMongooseError } from '../../../../lib/parseMongooseError'
import { connectDB } from '../../../../lib/mongodb'

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
    try {
        await connectDB()

        const { slug } = params
        const body = await req.json()

        if (!body) {
            return NextResponse.json({ error: 'No payload' }, { status: 400 })
        }

        const updated = await Blog.findOneAndUpdate(
            { slug },
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true },
        )

        if (!updated) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json(updated)
    } catch (err: unknown) {
        const errors = parseMongooseError(err)
        if (errors) {
            return NextResponse.json({ errors }, { status: 422 })
        }
        console.error('[PATCH /api/blogs/:slug]', err)
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
    }
}
