'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Eye,
  Heart,
  MessageSquare,
  Flame,
  Sparkles,
  FileText,
  ArrowRight,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

interface BlogMetrics {
  totalBlogs: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageViews: number;
}

interface BlogInsightsCardProps {
  metrics: BlogMetrics;
}

export const BlogInsightsCard = ({ metrics }: BlogInsightsCardProps) => {
  const totalInteractions = metrics.totalLikes + metrics.totalComments;
  const engagementRate =
    metrics.totalViews > 0
      ? ((totalInteractions / metrics.totalViews) * 100).toFixed(1)
      : metrics.totalBlogs > 0
        ? ((totalInteractions / (metrics.totalBlogs * 10)) * 100).toFixed(1)
        : '0.0';

  const likeRatio =
    metrics.totalViews > 0 ? ((metrics.totalLikes / metrics.totalViews) * 100).toFixed(1) : '0.0';

  const commentRatio =
    metrics.totalViews > 0
      ? ((metrics.totalComments / metrics.totalViews) * 100).toFixed(1)
      : '0.0';

  return (
    <Card className="relative overflow-hidden border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-lg flex flex-col justify-between h-full">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Flame className="h-4.5 w-4.5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Content & Engagement Intelligence</CardTitle>
              <p className="text-xs text-muted-foreground">
                Real-time readership analytics & interactions
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Blog Studio <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Top 4 Metric Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricItem
              icon={FileText}
              label="Published"
              value={metrics.totalBlogs}
              color="text-primary"
              bg="bg-primary/10 border-primary/20"
            />
            <MetricItem
              icon={Eye}
              label="Total Views"
              value={formatNumber(metrics.totalViews)}
              color="text-primary"
              bg="bg-primary/10 border-primary/20"
            />
            <MetricItem
              icon={Heart}
              label="Total Likes"
              value={formatNumber(metrics.totalLikes)}
              color="text-rose-500"
              bg="bg-rose-500/10 border-rose-500/20"
            />
            <MetricItem
              icon={MessageSquare}
              label="Comments"
              value={formatNumber(metrics.totalComments)}
              color="text-amber-500"
              bg="bg-amber-500/10 border-amber-500/20"
            />
          </div>

          {/* Overall Engagement Rate Banner */}
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4 dark:border-slate-800/60 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Overall Engagement Velocity
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Ratio of reader interactions (likes + comments) vs total page views
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-extrabold text-primary">
                  {engagementRate}%
                </span>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary via-accent to-primary/60 transition-all duration-700"
                style={{ width: `${Math.min(Math.max(Number(engagementRate) * 5, 8), 100)}%` }}
              />
            </div>
          </div>

          {/* Performance Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Avg Views per Article */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-1">
                  <BarChart3 className="h-3 w-3 text-primary" /> Avg. Views
                </span>
                <span className="font-mono font-bold text-foreground">
                  {Math.round(metrics.averageViews)} / post
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${Math.min((metrics.averageViews / Math.max(metrics.totalViews || 1, 50)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Like Conversion */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-1">
                  <Heart className="h-3 w-3 text-rose-500" /> Like Rate
                </span>
                <span className="font-mono font-bold text-rose-500">{likeRatio}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all"
                  style={{ width: `${Math.min(Math.max(Number(likeRatio) * 8, 5), 100)}%` }}
                />
              </div>
            </div>

            {/* Comment Rate */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-amber-500" /> Discussion
                </span>
                <span className="font-mono font-bold text-amber-500">{commentRatio}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${Math.min(Math.max(Number(commentRatio) * 8, 5), 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer Micro-insights */}
      <div className="px-6 py-3 border-t border-border/50 bg-muted/10 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          Audience engagement active across {metrics.totalBlogs} published posts
        </span>
        <span className="font-mono font-semibold text-primary">
          {totalInteractions} total reader interactions
        </span>
      </div>
    </Card>
  );
};

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}

const MetricItem = ({ icon: Icon, label, value, color, bg }: MetricItemProps) => (
  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30 transition-all hover:bg-muted/40">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      <div className={`flex h-5 w-5 items-center justify-center rounded-md border ${bg}`}>
        <Icon className={`h-3 w-3 ${color}`} />
      </div>
      <span className="text-[11px] font-medium truncate">{label}</span>
    </div>
    <p className="text-lg font-bold font-mono text-foreground mt-0.5">{value}</p>
  </div>
);

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
