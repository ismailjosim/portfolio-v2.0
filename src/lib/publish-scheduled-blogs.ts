import Blog from '../models/Blog';

/**
 * Backfills `publishedAt` for rows that were published before the field existed.
 *
 * Idempotent — once every published row has the field this matches nothing, so it is
 * safe to leave in the hot path. Can be deleted once production data is known to be
 * clean. Runs in its own guard so a backfill problem can never stop the scheduled
 * publishing below.
 */
async function backfillMissingPublishedAt() {
  try {
    await Blog.updateMany(
      { status: 'published', publishedAt: { $exists: false } },
      // `createdAt`, not `updatedAt`: legacy `updatedAt` values were bumped by the
      // view/like/comment counters, so they no longer reflect a publish date.
      [{ $set: { publishedAt: '$createdAt' } }],
      // Mongoose 9 rejects an array update unless the pipeline form is opted into
      // explicitly ("Cannot pass an array to query updates unless the `updatePipeline`
      // option is set").
      { updatePipeline: true }
    );
  } catch (err) {
    console.error('[publish-scheduled-blogs] publishedAt backfill failed:', err);
  }
}

/**
 * Flips any `scheduled` blog whose publish time has passed over to `published`,
 * stamping `publishedAt` as it goes.
 *
 * This used to be copy-pasted in three places (the cron route plus both blog GET
 * handlers); it lives here so every caller stamps `publishedAt` the same way.
 */
export async function publishDueScheduledBlogs() {
  await backfillMissingPublishedAt();

  return Blog.updateMany(
    {
      status: 'scheduled',
      scheduledPublishDate: { $lte: new Date() },
    },
    {
      $set: { status: 'published', publishedAt: new Date() },
    }
  );
}
