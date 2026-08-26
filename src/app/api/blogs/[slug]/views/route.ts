import { NextResponse } from 'next/server';
import Blog from '../../../../../models/Blog';
import BlogView from '../../../../../models/BlogView';
import { connectDB } from '../../../../../lib/mongodb';
import { getVisitorFingerprint } from '@/src/lib/fingerprint';

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    // Case-insensitive slug search
    const blog = await Blog.findOne({ slug: { $regex: `^${slug.trim()}$`, $options: 'i' } });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const fingerprint = await getVisitorFingerprint();
    console.log({ fingerprint });

    // Check if visitor already viewed this blog today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingView = await BlogView.findOne({
      blogId: blog._id,
      visitorFingerprint: fingerprint,
      viewedAt: { $gte: today },
    });

    // if already liked show meaningful error message
    if (existingView) {
      console.log('You already liked this blog');
      return NextResponse.json({ error: 'You already liked this blog' }, { status: 400 });
    }

    if (!existingView) {
      // Create new view record
      const { default: BlogViewModel } = await import('../../../../../models/BlogView');
      const view = new BlogViewModel({
        blogId: blog._id,
        visitorFingerprint: fingerprint,
      });
      await view.save();

      // Increment view count
      blog.views = (blog.views || 0) + 1;
      await blog.save();
    }

    return NextResponse.json({ success: true, views: blog.views });
  } catch (error) {
    console.error('[PATCH /api/blogs/:slug/views]', error);
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
  }
}
