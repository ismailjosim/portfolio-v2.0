import { NextResponse } from 'next/server'
import Blog from '../../../../../models/Blog'
import BlogComment from '../../../../../models/BlogComment'
import { connectDB } from '../../../../../lib/mongodb'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    try {
        await connectDB()
        const { slug } = await params

        // Case-insensitive slug search
        const blog = await Blog.findOne({ slug: { $regex: `^${slug.trim()}$`, $options: 'i' } })
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        const comments = await BlogComment.find({
            blogId: blog._id,
            isApproved: true,
        }).sort({ createdAt: -1 })

        return NextResponse.json({ comments })
    } catch (error) {
        console.error('[GET /api/blogs/:slug/comments]', error)
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 },
        )
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    try {
        await connectDB()
        const { slug } = await params
        const { name, content } = await req.json()

        if (!name || !content) {
            return NextResponse.json(
                { error: 'Name and content are required' },
                { status: 400 },
            )
        }

        // Case-insensitive slug search
        const blog = await Blog.findOne({ slug: { $regex: `^${slug.trim()}$`, $options: 'i' } })
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        const comment = new BlogComment({
            blogId: blog._id,
            name,
            content,
            isApproved: false,
        })

        await comment.save()

        // Increment comment count
        blog.commentsCount = (blog.commentsCount || 0) + 1
        await blog.save()

        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        console.error('[POST /api/blogs/:slug/comments]', error)
        return NextResponse.json(
            { error: 'Failed to post comment' },
            { status: 500 },
        )
    }
}
