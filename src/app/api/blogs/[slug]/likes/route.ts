import { NextResponse } from 'next/server';
import Blog from '../../../../../models/Blog';
import BlogLike from '../../../../../models/BlogLike';
import { connectDB } from '../../../../../lib/mongodb';
import { getVisitorFingerprint } from '@/src/lib/fingerprint';

// GET - Check whether the visitor already liked this blog
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();

    const { slug } = await params;

    // Find blog
    const blog = await Blog.findOne({
      slug: {
        $regex: `^${slug.trim()}$`,
        $options: 'i',
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Generate visitor fingerprint
    const fingerprint = await getVisitorFingerprint();

    // Check if this visitor already liked this blog
    const existingLike = await BlogLike.findOne({
      blogId: blog._id,
      visitorFingerprint: fingerprint,
    });

    return NextResponse.json({
      success: true,
      isLiked: !!existingLike,
      likesCount: blog.likesCount || 0,
    });
  } catch (error) {
    console.error('[GET /api/blogs/:slug/likes]', error);

    return NextResponse.json({ error: 'Failed to check like status' }, { status: 500 });
  }
}

// PATCH - Like the blog
export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();

    const { slug } = await params;

    // Case-insensitive slug search
    const blog = await Blog.findOne({
      slug: {
        $regex: `^${slug.trim()}$`,
        $options: 'i',
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const fingerprint = await getVisitorFingerprint();

    // Check if user already liked this blog
    const existingLike = await BlogLike.findOne({
      blogId: blog._id,
      visitorFingerprint: fingerprint,
    });

    if (existingLike) {
      return NextResponse.json({ error: 'You already liked this blog' }, { status: 400 });
    }

    // Create new like
    const like = new BlogLike({
      blogId: blog._id,
      visitorFingerprint: fingerprint,
    });

    await like.save();

    // Increment like count
    blog.likesCount = (blog.likesCount || 0) + 1;

    await blog.save();

    return NextResponse.json({
      success: true,
      likesCount: blog.likesCount,
    });
  } catch (error) {
    console.error('[PATCH /api/blogs/:slug/likes]', error);

    return NextResponse.json({ error: 'Failed to like blog' }, { status: 500 });
  }
}
