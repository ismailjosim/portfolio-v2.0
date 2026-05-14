import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogLike extends Document {
  blogId: mongoose.Types.ObjectId;
  visitorFingerprint: string;
  likedAt: Date;
}

const BlogLikeSchema = new Schema<IBlogLike>({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: [true, 'Blog ID is required'],
    validate: {
      validator: (v: mongoose.Types.ObjectId) => mongoose.Types.ObjectId.isValid(v),
      message: 'Blog ID must be a valid ObjectId',
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

BlogLikeSchema.index({ blogId: 1, visitorFingerprint: 1 }, { unique: true });

const BlogLike: Model<IBlogLike> =
  mongoose.models.BlogLike || mongoose.model<IBlogLike>('BlogLike', BlogLikeSchema);

export default BlogLike;
