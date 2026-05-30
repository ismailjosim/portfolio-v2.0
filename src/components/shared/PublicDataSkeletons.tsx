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
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl dark:border-slate-800/60 dark:bg-[#0B1329]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`relative flex min-h-80 flex-col justify-between overflow-hidden border-b border-border bg-slate-950 p-6 lg:col-span-5 lg:border-b-0 lg:border-r dark:border-slate-800 dark:bg-[#070D1E] ${reverse ? 'lg:order-2 lg:border-l lg:border-r-0' : ''}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full bg-muted/40" />
              <Skeleton className="h-3 w-28 bg-muted/40" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full bg-muted/40" />
          </div>

          <div className="my-auto flex flex-col items-center gap-3 py-8 text-center">
            <Skeleton className="h-9 w-48 bg-muted/50" />
            <Skeleton className="h-3 w-56 max-w-full bg-muted/40" />
            <Skeleton className="h-3 w-40 max-w-full bg-muted/40" />
          </div>

          <Skeleton className="absolute inset-x-8 bottom-8 h-32 rounded-xl bg-muted/20" />
        </div>

        <div className="space-y-6 p-6 sm:p-8 lg:col-span-7 dark:bg-[#0A1124]">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-6 w-44 rounded-md bg-muted" />
              <Skeleton className="h-9 w-52 bg-muted" />
            </div>
            <div className="flex w-full flex-wrap gap-2.5 xl:w-md">
              <Skeleton className="h-9 min-w-30 flex-1 rounded-lg bg-muted" />
              <Skeleton className="h-9 min-w-24 flex-1 rounded-md bg-muted" />
              <Skeleton className="h-9 min-w-24 flex-1 rounded-md bg-muted" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-11/12 bg-muted" />
            <Skeleton className="h-4 w-8/12 bg-muted" />
          </div>

          <div className="rounded-xl border border-border bg-muted/35 p-4 dark:border-slate-800/80 dark:bg-slate-950/30">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-28 bg-muted" />
              <Skeleton className="h-6 w-14 rounded-full bg-muted" />
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {['w-11/12', 'w-full', 'w-10/12', 'w-9/12', 'w-8/12', 'w-11/12'].map(
                (width, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-muted" />
                    <Skeleton className={`h-4 ${width} bg-muted`} />
                  </div>
                )
              )}
            </div>
            <Skeleton className="mt-3 h-9 w-36 rounded-md bg-muted" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-40 bg-muted" />
            <div className="flex flex-wrap gap-1.5">
              {['w-20', 'w-24', 'w-16', 'w-28', 'w-20', 'w-24'].map((width, index) => (
                <Skeleton key={index} className={`h-7 ${width} rounded-md bg-muted`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
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
