/**
 * One-off data migration for fields added after these documents were created.
 *
 * Mongoose only applies schema defaults to *new* documents, so rows written before a
 * field existed simply do not have it — and a query like `{ status: 'visible' }` skips
 * them entirely. Run this once per environment after deploying:
 *
 *   pnpm migrate
 *
 * Safe to re-run: every step is idempotent and reports 0 modified once it is done.
 */
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not set. Pass --env-file=.env.local');
  process.exit(1);
}

await mongoose.connect(uri);

const db = mongoose.connection.db;
const blogs = db.collection('blogs');
const comments = db.collection('blogcomments');

const log = (label, result) =>
  console.log(
    `${label.padEnd(42)} matched ${result.matchedCount}, modified ${result.modifiedCount}`
  );

// --- blogs.publishedAt -------------------------------------------------------------
// The public list is ordered by publishedAt, and missing values sort last in a
// descending sort, so every already-published row needs a value. createdAt is the only
// honest proxy available: updatedAt was bumped by the view/like/comment counters.
log(
  'blogs.publishedAt (from createdAt)',
  await blogs.updateMany({ status: 'published', publishedAt: { $exists: false } }, [
    { $set: { publishedAt: '$createdAt' } },
  ])
);

// --- blogcomments.status / likesCount / parentId -----------------------------------
// Without `status`, an existing comment matches neither 'visible' nor 'spam' and would
// disappear from both the public thread and the moderation table.
log(
  'blogcomments.status = visible',
  await comments.updateMany({ status: { $exists: false } }, { $set: { status: 'visible' } })
);

log(
  'blogcomments.likesCount = 0',
  await comments.updateMany({ likesCount: { $exists: false } }, { $set: { likesCount: 0 } })
);

log(
  'blogcomments.parentId = null',
  await comments.updateMany({ parentId: { $exists: false } }, { $set: { parentId: null } })
);

// --- verification -----------------------------------------------------------------
console.log('\nremaining gaps (all should be 0):');
console.log(
  '  published blogs without publishedAt :',
  await blogs.countDocuments({ status: 'published', publishedAt: { $exists: false } })
);
console.log(
  '  comments without status             :',
  await comments.countDocuments({ status: { $exists: false } })
);
console.log(
  '  comments without likesCount         :',
  await comments.countDocuments({ likesCount: { $exists: false } })
);
console.log(
  '  comments without parentId           :',
  await comments.countDocuments({ parentId: { $exists: false } })
);

console.log('\ntotals:');
console.log('  comments visible :', await comments.countDocuments({ status: 'visible' }));
console.log('  comments spam    :', await comments.countDocuments({ status: 'spam' }));

await mongoose.disconnect();
