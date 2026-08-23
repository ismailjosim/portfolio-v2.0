'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Eye, ThumbsUp, MessageSquare, Plus, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Blog {
  _id?: string;
  title: string;
  category?: string;
  slug?: string;
  status: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  createdAt?: string | Date;
  tags?: string[];
}

interface RecentBlogsCardProps {
  blogs: Blog[];
  totalBlogs: number;
}

const statusBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  published: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
  },
  scheduled: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/30',
  },
  review: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
  },
  draft: {
    bg: 'bg-slate-500/10 dark:bg-slate-500/15',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-500/30',
  },
  archived: {
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500/30',
  },
};

export const RecentBlogsCard = ({ blogs, totalBlogs }: RecentBlogsCardProps) => {
  return (
    <Card className="relative overflow-hidden border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-lg flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg font-bold">Recent Articles</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{totalBlogs} posts recorded</p>
        </div>
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-1">
        <div className="space-y-2.5">
          {blogs.slice(0, 4).map((blog) => {
            const statusConfig = statusBadgeStyles[blog.status] || statusBadgeStyles.draft;
            const formattedDate = blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              : null;

            return (
              <div
                key={blog._id}
                className="group relative rounded-xl border border-border/60 bg-muted/20 p-3 transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 dark:border-slate-800/60 dark:bg-slate-950/30 dark:hover:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                      >
                        {blog.status}
                      </span>
                      {formattedDate && (
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Calendar className="h-2.5 w-2.5" />
                          {formattedDate}
                        </span>
                      )}
                    </div>

                    <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>

                    {/* Engagement Badges */}
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Eye className="h-3 w-3 text-cyan-500" />
                        {formatNumber(blog.views ?? 0)}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <ThumbsUp className="h-3 w-3 text-rose-500" />
                        {formatNumber(blog.likesCount ?? 0)}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <MessageSquare className="h-3 w-3 text-amber-500" />
                        {formatNumber(blog.commentsCount ?? 0)}
                      </span>
                    </div>
                  </div>

                  {blog.slug && (
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary"
                      title="View public post"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p className="text-sm font-medium">No articles yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1 mb-4">
              Write and publish your first article to see it here.
            </p>
            <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
              <Link href="/dashboard/blog">
                <Plus className="h-3.5 w-3.5 text-primary" /> Create Blog Post
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

