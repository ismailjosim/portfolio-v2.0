import { NextResponse } from 'next/server';

import Blog from '../../../../models/Blog';
import { connectDB } from '../../../../lib/mongodb';
import { publishDueScheduledBlogs } from '../../../../lib/publish-scheduled-blogs';

// GET /api/all-blog/public
// Public endpoint — returns only published blogs (no auth required)
// Supports: ?page=1&limit=10&category=nextjs&tag=react&search=hello&sortBy=publishedAt&orderBy=desc
export async function GET(req: Request) {
  try {
    await connectDB();

    // This is the endpoint that feeds the public list, so it is also where the
    // publishedAt backfill and any due scheduled posts need to be settled before we
    // sort — otherwise legacy rows with no publishedAt would sort last.
    try {
      await publishDueScheduledBlogs();
    } catch (publishErr) {
      console.error(
        '[GET /api/all-blog/public] Failed to auto-publish scheduled blogs:',
        publishErr
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 10)));

    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search') ?? searchParams.get('searchTerm');
    const sortBy = searchParams.get('sortBy') ?? 'publishedAt';
    const sortOrder = searchParams.get('orderBy') === 'asc' ? 1 : -1;

    // Readers care when a post went live, not when it was drafted — a post created
    // last month but published today belongs at the top. `updatedAt` cannot be used
    // for this: the view/like/comment handlers all bump it via `blog.save()`.
    const sortOptions: Record<string, Record<string, 1 | -1>> = {
      title: { title: sortOrder, publishedAt: -1 },
      category: { category: sortOrder, title: 1 },
      engagement: {
        views: sortOrder,
        likesCount: sortOrder,
        commentsCount: sortOrder,
        publishedAt: -1,
      },
      views: { views: sortOrder, publishedAt: -1 },
      likesCount: { likesCount: sortOrder, views: sortOrder, publishedAt: -1 },
      commentsCount: { commentsCount: sortOrder, views: sortOrder, publishedAt: -1 },
      publishedAt: { publishedAt: sortOrder, createdAt: -1 },
      createdAt: { createdAt: sortOrder },
    };

    const sort = sortOptions[sortBy] ?? sortOptions.publishedAt;

    // Always filter to published only — this is the public endpoint
    const filter: Record<string, unknown> = { status: 'published' };

    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select('-__v -content') // Exclude full content from list view for performance
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

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
    });
  } catch (err) {
    console.error('[GET /api/all-blog/public]', err);

    return NextResponse.json({ error: 'Failed to fetch published blogs' }, { status: 500 });
  }
}
