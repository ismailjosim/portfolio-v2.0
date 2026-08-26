import { NextResponse } from 'next/server';
import Blog from '../../../../models/Blog';
import { connectDB } from '../../../../lib/mongodb';

export const dynamic = 'force-dynamic';

// Optional: to authorize this cron, take the request back as a parameter and check a
// secret header, e.g. `GET(req: Request)` +
// `if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) ...`
export async function GET() {
  try {
    await connectDB();

    const result = await Blog.updateMany(
      {
        status: 'scheduled',
        scheduledPublishDate: { $lte: new Date() },
      },
      {
        $set: { status: 'published' },
      }
    );

    return NextResponse.json({
      message: 'Successfully checked and published scheduled blogs',
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error('[CRON /api/cron/publish-blogs]', err);
    return NextResponse.json({ error: 'Failed to run publish task' }, { status: 500 });
  }
}
