import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Blog from '../../../../../../../models/Blog';
import BlogComment from '../../../../../../../models/BlogComment';
import BlogCommentLike from '../../../../../../../models/BlogCommentLike';
import { connectDB } from '../../../../../../../lib/mongodb';
import { getVisitorFingerprint } from '@/src/lib/fingerprint';

/**
 * PATCH - toggle this visitor's like on a comment.
 *
 * Deliberately different from the blog-level like (which is one-way): the thread UI
 * shows a Facebook-style heart, so a second click has to undo the first.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    await connectDB();

    const { slug, commentId } = await params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 });
    }

    // Case-insensitive slug search
    const blog = await Blog.findOne({
      slug: { $regex: `^${slug.trim()}$`, $options: 'i' },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Scoped to the blog in the URL so a comment id from another post cannot be liked
    // through this route, and so hidden comments cannot be liked at all.
    const comment = await BlogComment.findOne({
      _id: commentId,
      blogId: blog._id,
      status: 'visible',
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const fingerprint = await getVisitorFingerprint();

    const existingLike = await BlogCommentLike.findOne({
      commentId: comment._id,
      visitorFingerprint: fingerprint,
    });

    if (existingLike) {
      await existingLike.deleteOne();
      comment.likesCount = Math.max(0, (comment.likesCount || 0) - 1);
    } else {
      await BlogCommentLike.create({
        commentId: comment._id,
        visitorFingerprint: fingerprint,
      });
      comment.likesCount = (comment.likesCount || 0) + 1;
    }

    await comment.save();

    return NextResponse.json({
      success: true,
      isLiked: !existingLike,
      likesCount: comment.likesCount,
    });
  } catch (error) {
    console.error('[PATCH /api/blogs/:slug/comments/:commentId/likes]', error);

    return NextResponse.json({ error: 'Failed to update comment like' }, { status: 500 });
  }
}
