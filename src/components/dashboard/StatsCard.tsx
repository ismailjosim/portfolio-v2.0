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
  accentColor?: 'cyan' | 'purple' | 'emerald' | 'amber';
  href?: string;
}

const colorVariants = {
  cyan: {
    bg: 'from-cyan-500/10 via-primary/5 to-transparent',
    iconBg: 'bg-primary/10 text-primary border-primary/20',
    border: 'hover:border-primary/40',
    glow: 'group-hover:shadow-[0_0_25px_rgba(1,180,186,0.15)]',
    badge: 'bg-primary/10 text-primary border-primary/20',
  },
  purple: {
    bg: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    iconBg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    border: 'hover:border-purple-500/40',
    glow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  emerald: {
    bg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    border: 'hover:border-emerald-500/40',
    glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  amber: {
    bg: 'from-amber-500/10 via-orange-500/5 to-transparent',
    iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    border: 'hover:border-amber-500/40',
    glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
};

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  description,
  subValue,
  badge,
  trend,
  accentColor = 'cyan',
  href,
}: StatsCardProps) => {
  const colors = colorVariants[accentColor];

  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1',
        colors.border,
        colors.glow,
        'dark:bg-[#0A1124]/90 dark:border-slate-800/80'
      )}
    >
      {/* Background Accent Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-linear-to-br blur-2xl transition-opacity duration-500 opacity-50 group-hover:opacity-100',
          colors.bg
        )}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
            {badge && (
              <span
                className={cn(
                  'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                  colors.badge
                )}
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
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110',
            colors.iconBg
          )}
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
