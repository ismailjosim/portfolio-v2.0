import mongoose, { Schema, Document, Model } from 'mongoose';
import { registerModel } from '../lib/register-model';

export const COMMENT_STATUSES = ['visible', 'spam'] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];

export interface IBlogComment extends Document {
  blogId: mongoose.Types.ObjectId;
  /** Absent/null for a top-level comment. Nesting depth is unlimited. */
  parentId?: mongoose.Types.ObjectId | null;
  name: string;
  content: string;
  likesCount: number;
  /** `spam` hides the comment (and its replies) from the public thread. Reversible. */
  status: CommentStatus;
  createdAt: Date;
  updatedAt: Date;
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
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'BlogComment',
      default: null,
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
    likesCount: {
      type: Number,
      default: 0,
      min: [0, 'Likes count cannot be negative'],
    },
    status: {
      type: String,
      enum: COMMENT_STATUSES,
      default: 'visible',
    },
  },
  { timestamps: true }
);

// Public thread read: filter by blog + status, newest first.
BlogCommentSchema.index({ blogId: 1, status: 1, createdAt: -1 });
// Walking down a thread when cascading a spam flag to descendants.
BlogCommentSchema.index({ parentId: 1 });

const BlogComment: Model<IBlogComment> = registerModel<IBlogComment>(
  'BlogComment',
  BlogCommentSchema
);

export default BlogComment;
