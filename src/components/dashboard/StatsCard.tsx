'use client';

import { LucideIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  subValue?: string;
  badge?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  href?: string;
}

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  description,
  subValue,
  badge,
  trend,
  href,
}: StatsCardProps) => {
  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1',
        'hover:border-primary/40',
        'dark:bg-[#0A1124]/90 dark:border-slate-800/80'
      )}
    >
      {/* Background Accent Gradient */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-linear-to-br from-primary/10 via-accent/5 to-transparent blur-2xl transition-opacity duration-500 opacity-50 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
            {badge && (
              <span
                className="rounded-full border px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary border-primary/20"
              >
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <h3 className="text-3xl font-extrabold tracking-tight text-foreground font-mono">
              {value}
            </h3>
            {subValue && (
              <span className="text-xs font-medium text-muted-foreground">({subValue})</span>
            )}
          </div>
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 bg-primary/10 text-primary border-primary/20"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Footer Info / Trend */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground dark:border-slate-800/60">
        <div className="truncate">{description && <span>{description}</span>}</div>

        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 font-semibold',
              trend.isPositive
                ? 'text-emerald-500 dark:text-emerald-400'
                : 'text-rose-500 dark:text-rose-400'
            )}
          >
            <span>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            {trend.label && (
              <span className="font-normal text-muted-foreground">{trend.label}</span>
            )}
          </div>
        )}

        {href && (
          <span className="flex items-center gap-0.5 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 font-medium">
            View <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
