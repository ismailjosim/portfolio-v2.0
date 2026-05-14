import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogView extends Document {
  blogId: mongoose.Types.ObjectId;
  visitorFingerprint: string;
  viewedAt: Date;
}

const BlogViewSchema = new Schema<IBlogView>({
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
  viewedAt: {
    type: Date,
    default: Date.now,
    validate: {
      validator: (v: Date) => v <= new Date(),
      message: 'Viewed date cannot be in the future',
    },
  },
});

BlogViewSchema.index({ blogId: 1, visitorFingerprint: 1 }, { unique: true });

const BlogView: Model<IBlogView> =
  mongoose.models.BlogView || mongoose.model<IBlogView>('BlogView', BlogViewSchema);

export default BlogView;
