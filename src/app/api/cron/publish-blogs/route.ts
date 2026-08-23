import { NextResponse } from 'next/server';
import Blog from '../../../../models/Blog';
import { connectDB } from '../../../../lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Optional: Add a simple authorization check here using a secret key
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

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
