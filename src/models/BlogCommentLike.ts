import mongoose, { Schema, Document, Model } from 'mongoose';
import { registerModel } from '../lib/register-model';

/**
 * A single anonymous visitor's like on a single comment. Mirrors BlogLike, but unlike
 * the blog-level like this one is a toggle — the unique index is what keeps a visitor
 * from liking the same comment twice.
 */
export interface IBlogCommentLike extends Document {
  commentId: mongoose.Types.ObjectId;
  visitorFingerprint: string;
  likedAt: Date;
}

const BlogCommentLikeSchema = new Schema<IBlogCommentLike>({
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'BlogComment',
    required: [true, 'Comment ID is required'],
    validate: {
      validator: (v: mongoose.Types.ObjectId) => mongoose.Types.ObjectId.isValid(v),
      message: 'Comment ID must be a valid ObjectId',
    },
  },
  visitorFingerprint: {
    type: String,
    required: [true, 'Visitor fingerprint is required'],
    trim: true,
    minlength: [8, 'Visitor fingerprint is too short to be valid'],
    maxlength: [128, 'Visitor fingerprint exceeds maximum allowed length'],
  },
  likedAt: {
    type: Date,
    default: Date.now,
    validate: {
      validator: (v: Date) => v <= new Date(),
      message: 'Liked date cannot be in the future',
    },
  },
});

BlogCommentLikeSchema.index({ commentId: 1, visitorFingerprint: 1 }, { unique: true });

const BlogCommentLike: Model<IBlogCommentLike> = registerModel<IBlogCommentLike>(
  'BlogCommentLike',
  BlogCommentLikeSchema
);

export default BlogCommentLike;
