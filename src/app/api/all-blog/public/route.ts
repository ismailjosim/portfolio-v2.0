import { NextResponse } from 'next/server';

import Blog from '../../../../models/Blog';
import { connectDB } from '../../../../lib/mongodb';

// GET /api/all-blog/public
// Public endpoint — returns only published blogs (no auth required)
// Supports: ?page=1&limit=10&category=nextjs&tag=react&search=hello&sortBy=createdAt&orderBy=desc
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 10)));

    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search') ?? searchParams.get('searchTerm');
    const sortBy = searchParams.get('sortBy') ?? 'createdAt';
    const sortOrder = searchParams.get('orderBy') === 'asc' ? 1 : -1;

    const sortOptions: Record<string, Record<string, 1 | -1>> = {
      title: { title: sortOrder, createdAt: -1 },
      category: { category: sortOrder, title: 1 },
      engagement: {
        views: sortOrder,
        likesCount: sortOrder,
        commentsCount: sortOrder,
        createdAt: -1,
      },
      views: { views: sortOrder, createdAt: -1 },
      likesCount: { likesCount: sortOrder, views: sortOrder, createdAt: -1 },
      commentsCount: { commentsCount: sortOrder, views: sortOrder, createdAt: -1 },
      createdAt: { createdAt: sortOrder },
    };

    const sort = sortOptions[sortBy] ?? sortOptions.createdAt;

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
