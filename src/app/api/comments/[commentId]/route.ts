import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Blog from '@/src/models/Blog';
import BlogComment, { COMMENT_STATUSES, CommentStatus } from '@/src/models/BlogComment';
import { connectDB } from '@/src/lib/mongodb';
import { isDashboardAuthenticated } from '@/src/lib/dashboard-auth';

export const dynamic = 'force-dynamic';

/**
 * Collects a comment and every descendant beneath it. Nesting is unlimited, so this
 * walks the tree level by level rather than assuming a fixed depth.
 */
async function collectThreadIds(rootId: mongoose.Types.ObjectId) {
  const ids = [rootId];
  let frontier = [rootId];

  while (frontier.length > 0) {
    const children = await BlogComment.find({ parentId: { $in: frontier } })
      .select('_id')
      .lean();

    if (children.length === 0) break;

    frontier = children.map((child) => child._id);
    ids.push(...frontier);
  }

  return ids;
}

/**
 * PATCH /api/comments/:commentId — admin-only moderation.
 *
 * Body: `{ status: 'visible' | 'spam' }`. Marking a comment as spam hides it and every
 * reply under it; setting it back to `visible` restores the whole thread. Nothing is
 * ever deleted, so a mis-click is recoverable.
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ commentId: string }> }) {
  try {
    if (!(await isDashboardAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Sign in to moderate comments.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { commentId } = await params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ success: false, error: 'Invalid comment id' }, { status: 400 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
    }

    const { status } = (body ?? {}) as Record<string, unknown>;

    if (typeof status !== 'string' || !(COMMENT_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json(
        { success: false, error: `Unsupported status: ${String(status)}` },
        { status: 400 }
      );
    }

    const comment = await BlogComment.findById(commentId).select('_id blogId').lean();

    if (!comment) {
      return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 });
    }

    const threadIds = await collectThreadIds(comment._id);

    const result = await BlogComment.updateMany(
      { _id: { $in: threadIds } },
      { $set: { status: status as CommentStatus } }
    );

    // Recompute rather than $inc: a recount cannot drift, and it repairs any count that
    // is already out of step with reality.
    const visibleCount = await BlogComment.countDocuments({
      blogId: comment.blogId,
      status: 'visible',
    });

    await Blog.updateOne({ _id: comment.blogId }, { $set: { commentsCount: visibleCount } });

    return NextResponse.json({
      success: true,
      status,
      affectedCount: threadIds.length,
      replyCount: threadIds.length - 1,
      modifiedCount: result.modifiedCount,
      commentsCount: visibleCount,
    });
  } catch (error) {
    console.error('[PATCH /api/comments/:commentId]', error);

    return NextResponse.json(
      { success: false, error: 'Failed to update comment status' },
      { status: 500 }
    );
  }
}
