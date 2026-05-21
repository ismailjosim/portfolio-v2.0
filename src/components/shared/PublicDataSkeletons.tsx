import { FolderKanban, MessageCircle, Newspaper, Wrench } from 'lucide-react';

import { Skeleton } from '../ui/skeleton';

export function BlogCardSkeleton() {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="h-48 w-full rounded-none bg-muted" />
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 bg-muted" />
          <Skeleton className="h-4 w-16 bg-muted" />
        </div>
        <Skeleton className="h-6 w-4/5 bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-11/12 bg-muted" />
          <Skeleton className="h-4 w-2/3 bg-muted" />
        </div>
        <div className="flex gap-4 border-t border-border/40 pt-3">
          <Skeleton className="h-4 w-16 bg-muted" />
          <Skeleton className="h-4 w-16 bg-muted" />
          <Skeleton className="h-4 w-20 bg-muted" />
        </div>
        <Skeleton className="h-4 w-20 bg-muted" />
      </div>
    </article>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function BlogFilterSkeleton() {
  const widths = ['w-12', 'w-24', 'w-24', 'w-28', 'w-24', 'w-24', 'w-32', 'w-24', 'w-20', 'w-28'];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {widths.map((width, index) => (
        <Skeleton key={index} className={`h-10 ${width} rounded-md bg-muted`} />
      ))}
    </div>
  );
}

export function ProjectCardSkeleton({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2 lg:gap-8 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <Skeleton className="aspect-video h-full min-h-64 rounded-xl bg-muted" />
      <div className="space-y-5 p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 bg-muted" />
            <Skeleton className="h-4 w-24 bg-muted" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 rounded-full bg-muted" />
            <Skeleton className="h-5 w-5 rounded-full bg-muted" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-10/12 bg-muted" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-11/12 bg-muted" />
          <Skeleton className="h-4 w-9/12 bg-muted" />
          <Skeleton className="h-4 w-8/12 bg-muted" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 bg-muted" />
          <Skeleton className="h-6 w-24 bg-muted" />
          <Skeleton className="h-6 w-16 bg-muted" />
          <Skeleton className="h-6 w-20 bg-muted" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 bg-muted" />
          <Skeleton className="h-10 w-24 bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function ProjectListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-12">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} reverse={index % 2 !== 0} />
      ))}
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, groupIndex) => (
        <div key={groupIndex} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-2xl bg-muted" />
            <Skeleton className="h-5 w-32 bg-muted" />
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 7 }).map((_, skillIndex) => (
              <Skeleton
                key={skillIndex}
                className="h-9 rounded-2xl bg-muted"
                style={{ width: `${72 + ((groupIndex + skillIndex) % 4) * 18}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-muted" />
          <div className="flex-1 space-y-2 rounded-xl bg-muted/40 px-4 py-3">
            <div className="flex justify-between gap-4">
              <Skeleton className="h-4 w-28 bg-muted" />
              <Skeleton className="h-3 w-20 bg-muted" />
            </div>
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-3/5 bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  icon = 'articles',
  title,
  description,
}: {
  icon?: 'articles' | 'projects' | 'skills' | 'comments';
  title: string;
  description?: string;
}) {
  const icons = {
    articles: Newspaper,
    projects: FolderKanban,
    skills: Wrench,
    comments: MessageCircle,
  };
  const Icon = icons[icon];

  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-lg font-semibold text-foreground">{title}</p>
      {description && <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
