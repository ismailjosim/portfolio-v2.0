'use client';

import Link from 'next/link';
import { CornerDownRight, Heart } from 'lucide-react';
import type { AdminComment } from '../../../services/comment-admin';
import type { Column } from '../../shared/ManagementTable';
import { DateCell } from '../../shared/DateCell';

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max)}...` : value;

export const commentColumns: Column<AdminComment>[] = [
  {
    header: 'Author',
    accessor: (comment) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
          {comment.name[0]?.toUpperCase()}
        </div>
        <span className="font-medium text-sm">{truncate(comment.name, 24)}</span>
      </div>
    ),
    sortKey: 'name',
  },

  {
    header: 'Comment',
    accessor: (comment) => (
      <div className="flex flex-col max-w-100">
        <span className="text-sm whitespace-pre-wrap break-words">
          {truncate(comment.content, 120)}
        </span>
        {comment.parentId && (
          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <CornerDownRight size={12} />
            reply to {comment.parentName ?? 'a comment'}
          </span>
        )}
      </div>
    ),
  },

  {
    header: 'Blog',
    accessor: (comment) =>
      comment.blogSlug ? (
        <Link
          href={`/blogs/${comment.blogSlug}`}
          target="_blank"
          className="text-sm hover:underline text-primary"
        >
          {truncate(comment.blogTitle ?? comment.blogSlug, 34)}
        </Link>
      ) : (
        <span className="text-xs text-muted-foreground">Deleted blog</span>
      ),
  },

  {
    header: 'Likes',
    accessor: (comment) => (
      <p className="flex items-center gap-1 text-sm text-destructive">
        <Heart fill="currentColor" size={16} />
        <span>{comment.likesCount}</span>
      </p>
    ),
    sortKey: 'likesCount',
  },

  {
    header: 'Status',
    accessor: (comment) => {
      const statusStyles: Record<string, string> = {
        visible: 'bg-green-500/20 text-green-600',
        spam: 'bg-red-500/20 text-red-600',
      };

      return (
        // `no-underline` opts out of the row-wide line-through a spam row carries — the
        // badge is what states the row is spam, so striking it reads as a contradiction.
        <span
          className={`px-2 py-1 text-xs rounded-full capitalize no-underline ${
            statusStyles[comment.status] || 'bg-gray-500/20 text-gray-500'
          }`}
        >
          {comment.status}
        </span>
      );
    },
    sortKey: 'status',
  },

  {
    header: 'Created',
    accessor: (comment) => <DateCell date={comment.createdAt} />,
    sortKey: 'createdAt',
  },
];
