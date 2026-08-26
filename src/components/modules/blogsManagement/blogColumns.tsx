'use client';

import { Eye, Heart, MessageCircleMore } from 'lucide-react';
import { IBlog } from '../../../types/blog.interface';
import Image from 'next/image';

import { DateCell } from '../../shared/DateCell';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortKey?: string;
}

export const blogColumns: Column<IBlog>[] = [
  {
    header: 'Blog',
    accessor: (blog) => (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src={
              blog.coverImage?.startsWith('blob')
                ? '/placeholder.jpg'
                : blog.coverImage || '/placeholder.jpg'
            }
            alt={blog.title}
            fill
            className="rounded-md object-cover"
            sizes="40px"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {blog.title.length > 40 ? `${blog.title.substring(0, 40)}...` : blog.title}
          </span>
          <span className="text-xs text-gray-500">{blog.slug}</span>
        </div>
      </div>
    ),
    sortKey: 'title',
  },

  {
    header: 'Category',
    accessor: (blog) => (
      <div className="flex flex-col">
        <span className="text-sm">{blog.category}</span>
        <span className="text-xs text-gray-500">
          {blog.tags && blog.tags.length > 0
            ? blog.tags.slice(0, 3).join(', ') +
              (blog.tags.length > 3 ? `, +${blog.tags.length - 4} more` : '')
            : 'No tags'}
        </span>
      </div>
    ),
    sortKey: 'category',
  },

  {
    header: 'Engagement',
    accessor: (blog) => (
      <div className="text-sm flex items-center gap-3">
        <p className="flex items-center gap-1 text-muted-foreground">
          <Eye size={18} />
          <span>{blog.views}</span>
        </p>

        <p className="flex items-center gap-1 text-destructive">
          <Heart fill="currentColor" size={18} />
          <span>{blog.likesCount}</span>
        </p>

        <p className="flex items-center gap-1 text-accent">
          <MessageCircleMore size={18} />
          <span>{blog.commentsCount}</span>
        </p>
      </div>
    ),
    sortKey: 'engagement',
  },

  {
    header: 'Created',
    accessor: (blog) => <DateCell date={blog.createdAt} />,
    sortKey: 'createdAt',
  },

  {
    header: 'Published',
    accessor: (blog) =>
      blog.publishedAt ? (
        <DateCell date={blog.publishedAt} />
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
    sortKey: 'publishedAt',
  },

  {
    header: 'Status',
    accessor: (blog) => {
      const statusStyles: Record<string, string> = {
        review: 'bg-blue-500/20 text-blue-600',
        scheduled: 'bg-purple-500/20 text-purple-600',
        published: 'bg-green-500/20 text-green-600',
        draft: 'bg-yellow-500/20 text-yellow-600',
        archived: 'bg-gray-500/20 text-gray-500',
      };

      return (
        <span
          className={`px-2 py-1 text-xs rounded-full capitalize ${
            statusStyles[blog.status] || 'bg-gray-500/20 text-gray-500'
          }`}
        >
          {blog.status}
        </span>
      );
    },
    sortKey: 'status',
  },
];
