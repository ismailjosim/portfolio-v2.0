import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Blog from '../../../../../models/Blog';
import BlogComment from '../../../../../models/BlogComment';
import BlogCommentLike from '../../../../../models/BlogCommentLike';
import { connectDB } from '../../../../../lib/mongodb';
import { getVisitorFingerprint } from '@/src/lib/fingerprint';

// GET - the public thread: visible comments only, flat, with this visitor's like state
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    // Case-insensitive slug search
    const blog = await Blog.findOne({
      slug: { $regex: `^${slug.trim()}$`, $options: 'i' },
    });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Comments marked as spam (and their cascaded replies) never reach the public.
    const comments = await BlogComment.find({
      blogId: blog._id,
      status: 'visible',
    })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();

    // One extra query tells us which of these the current visitor has already liked,
    // so the heart renders filled on first paint instead of flickering.
    const fingerprint = await getVisitorFingerprint();
    const likedIds = await BlogCommentLike.find({
      commentId: { $in: comments.map((comment) => comment._id) },
      visitorFingerprint: fingerprint,
    })
      .select('commentId')
      .lean();

    const likedSet = new Set(likedIds.map((like) => String(like.commentId)));

    return NextResponse.json({
      comments: comments.map((comment) => ({
        ...comment,
        likedByMe: likedSet.has(String(comment._id)),
      })),
    });
  } catch (error) {
    console.error('[GET /api/blogs/:slug/comments]', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST - add a top-level comment, or a reply when `parentId` is supplied
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const { name, content, parentId } = await req.json();

    if (!name || !content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    }

    // Case-insensitive slug search
    const blog = await Blog.findOne({
      slug: { $regex: `^${slug.trim()}$`, $options: 'i' },
    });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // A reply has to point at a comment that exists, sits on this same post, and has
    // not been taken down — otherwise it would be stranded or resurrect a spam thread.
    if (parentId) {
      if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return NextResponse.json({ error: 'Invalid parent comment' }, { status: 400 });
      }

      const parent = await BlogComment.findOne({
        _id: parentId,
        blogId: blog._id,
        status: 'visible',
      });

      if (!parent) {
        return NextResponse.json(
          { error: 'The comment you are replying to is no longer available' },
          { status: 400 }
        );
      }
    }

    const comment = new BlogComment({
      blogId: blog._id,
      parentId: parentId || null,
      name,
      content,
    });

    await comment.save();

    // Increment comment count
    blog.commentsCount = (blog.commentsCount || 0) + 1;
    await blog.save();

    return NextResponse.json({ ...comment.toObject(), likedByMe: false }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/blogs/:slug/comments]', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
