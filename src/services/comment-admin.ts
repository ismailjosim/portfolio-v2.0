import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import BlogComment, { COMMENT_STATUSES, CommentStatus } from '../models/BlogComment';
import '../models/Blog'; // registers the `Blog` model so `.populate('blogId')` resolves

/**
 * Server-only reads for the comment moderation table.
 *
 * These go straight to MongoDB rather than through `serverFetch`: the moderation API is
 * guarded by the `dashboard_session` cookie and `serverFetch` does not forward cookies,
 * so a server component cannot call it. Access control for the page itself comes from
 * `src/proxy.ts`, which gates every `/dashboard/*` route. Same approach as
 * `src/lib/theme-settings.ts`.
 */

export interface AdminComment {
  _id: string;
  name: string;
  content: string;
  status: CommentStatus;
  likesCount: number;
  parentId: string | null;
  /** Author of the comment being replied to, when this is a reply. */
  parentName: string | null;
  blogId: string | null;
  blogTitle: string | null;
  blogSlug: string | null;
  createdAt: string;
}

export interface AdminCommentsResult {
  comments: AdminComment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ListCommentsParams {
  page?: number;
  limit?: number;
  status?: string;
  blogId?: string;
  search?: string;
  sortBy?: string;
  orderBy?: string;
}

interface PopulatedBlog {
  _id: mongoose.Types.ObjectId;
  title?: string;
  slug?: string;
}

interface CommentRow {
  _id: mongoose.Types.ObjectId;
  name: string;
  content: string;
  status?: CommentStatus;
  likesCount?: number;
  parentId?: mongoose.Types.ObjectId | null;
  blogId?: PopulatedBlog | null;
  createdAt: Date;
}

const SORTABLE_FIELDS = new Set(['name', 'status', 'likesCount', 'createdAt']);

const emptyResult = (page: number, limit: number): AdminCommentsResult => ({
  comments: [],
  pagination: { total: 0, page, limit, totalPages: 0, hasNext: false, hasPrev: page > 1 },
});

/** Escapes user input before it reaches a `$regex`, so `.` or `(` cannot break the query. */
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function listCommentsForAdmin(
  params: ListCommentsParams = {}
): Promise<AdminCommentsResult> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));

  try {
    await connectDB();

    const filter: Record<string, unknown> = {};

    if (params.status && (COMMENT_STATUSES as readonly string[]).includes(params.status)) {
      filter.status = params.status;
    }

    if (params.blogId && mongoose.Types.ObjectId.isValid(params.blogId)) {
      filter.blogId = new mongoose.Types.ObjectId(params.blogId);
    }

    if (params.search?.trim()) {
      const term = escapeRegex(params.search.trim());
      filter.$or = [
        { name: { $regex: term, $options: 'i' } },
        { content: { $regex: term, $options: 'i' } },
      ];
    }

    const sortField =
      params.sortBy && SORTABLE_FIELDS.has(params.sortBy) ? params.sortBy : 'createdAt';
    const sortOrder = params.orderBy === 'asc' ? 1 : -1;

    const [rows, total] = await Promise.all([
      BlogComment.find(filter)
        .populate<{ blogId: PopulatedBlog | null }>('blogId', 'title slug')
        .select('name content status likesCount parentId blogId createdAt')
        .sort({ [sortField]: sortOrder, _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean<CommentRow[]>(),
      BlogComment.countDocuments(filter),
    ]);

    // One extra query resolves "replying to <author>" for the whole page, instead of a
    // populate per row.
    const parentIds = rows.map((row) => row.parentId).filter(Boolean) as mongoose.Types.ObjectId[];

    const parents = parentIds.length
      ? await BlogComment.find({ _id: { $in: parentIds } })
          .select('name')
          .lean<{ _id: mongoose.Types.ObjectId; name: string }[]>()
      : [];

    const parentNames = new Map(parents.map((parent) => [String(parent._id), parent.name]));

    return {
      comments: rows.map((row) => {
        const parentId = row.parentId ? String(row.parentId) : null;

        return {
          _id: String(row._id),
          name: row.name,
          content: row.content,
          status: row.status ?? 'visible',
          likesCount: row.likesCount ?? 0,
          parentId,
          parentName: parentId ? (parentNames.get(parentId) ?? null) : null,
          blogId: row.blogId ? String(row.blogId._id) : null,
          blogTitle: row.blogId?.title ?? null,
          blogSlug: row.blogId?.slug ?? null,
          createdAt: new Date(row.createdAt).toISOString(),
        };
      }),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error('[listCommentsForAdmin]', error);
    return emptyResult(page, limit);
  }
}
