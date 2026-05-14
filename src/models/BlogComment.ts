import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogComment extends Document {
  blogId: mongoose.Types.ObjectId;
  name: string;
  content: string;
  createdAt: Date;
}

const BlogCommentSchema = new Schema<IBlogComment>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Blog ID is required'],
      validate: {
        validator: (v: mongoose.Types.ObjectId) => mongoose.Types.ObjectId.isValid(v),
        message: 'Blog ID must be a valid ObjectId',
      },
    },
    name: {
      type: String,
      required: [true, 'Display name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      minlength: [2, 'Comment must be at least 2 characters'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  { timestamps: true }
);

BlogCommentSchema.index({ blogId: 1 });

const BlogComment: Model<IBlogComment> =
  mongoose.models.BlogComment || mongoose.model<IBlogComment>('BlogComment', BlogCommentSchema);

export default BlogComment;
