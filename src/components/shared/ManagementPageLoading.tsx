'use client';

import { useMemo } from 'react';
import { TableSkeleton } from './TableSkeleton';

interface ManagementPageLoadingProps {
  columns: number;
  hasActionButton?: boolean;
  filterCount?: number;
  filterWidths?: string[];
}

export function ManagementPageLoading({
  columns,
  hasActionButton = false,
  filterCount = 0,
  filterWidths = [],
}: ManagementPageLoadingProps) {
  // Memoize filter elements to prevent recreation on every render
  const filterElements = useMemo(() => {
    if (filterCount === 0) return null;

    return (
      <div className="flex items-center gap-3">
        {Array.from({ length: filterCount }).map((_, index) => (
          <div
            key={index}
            className={`h-10 ${
              filterWidths[index] || 'w-40'
            } bg-slate-300 dark:bg-slate-700 animate-pulse rounded-md border-2 border-slate-400 dark:border-slate-500 shadow-sm`}
          />
        ))}
      </div>
    );
  }, [filterCount, filterWidths]);

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-md shadow-sm" />
          <div className="h-4 w-96 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-md shadow-sm" />
        </div>
        {hasActionButton && (
          <div className="h-10 w-32 bg-slate-300 dark:bg-slate-700 animate-pulse rounded-md shadow-sm" />
        )}
      </div>

      {/* Filters Skeleton */}
      {filterElements}

      {/* Table Skeleton */}
      <TableSkeleton columns={columns} rows={10} />
    </div>
  );
}
