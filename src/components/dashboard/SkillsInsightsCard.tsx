'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Zap, Grid3x3, Award, ArrowRight, Layers, Code2 } from 'lucide-react';
import Link from 'next/link';

interface Skill {
  _id?: string;
  name?: string;
  category?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillsMetrics {
  totalSkills: number;
  skillsByCategory: Record<string, number>;
  proficiencyBreakdown?: Record<string, number>;
}

interface SkillsInsightsCardProps {
  metrics: SkillsMetrics;
  skills: Skill[];
}

const proficiencyColors: Record<string, { bar: string; text: string; bg: string }> = {
  expert: {
    bar: 'bg-linear-to-r from-purple-500 to-indigo-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  advanced: {
    bar: 'bg-linear-to-r from-cyan-500 to-primary',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  intermediate: {
    bar: 'bg-linear-to-r from-emerald-500 to-teal-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  beginner: {
    bar: 'bg-linear-to-r from-slate-400 to-slate-500',
    text: 'text-slate-400',
    bg: 'bg-slate-500/10 border-slate-500/20',
  },
};

export const SkillsInsightsCard = ({ metrics, skills }: SkillsInsightsCardProps) => {
  const categories = Object.entries(metrics.skillsByCategory || {});
  const maxCategoryCount = Math.max(...Object.values(metrics.skillsByCategory || {}), 1);
  const proficiencies = metrics.proficiencyBreakdown || {};
  const totalSkillsCount = metrics.totalSkills || skills.length || 0;

  return (
    <Card className="relative overflow-hidden border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-lg flex flex-col justify-between h-full">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

      <div>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">
                Technical Skills & Competency Matrix
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Category stack distribution & proficiency breakdown
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/skills"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Manage Skills <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>

        <CardContent className="space-y-5 pt-1">
          {/* Top 3 Quick Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                <span className="truncate">Total Skills</span>
              </div>
              <p className="text-xl font-bold font-mono text-foreground">{totalSkillsCount}</p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Grid3x3 className="h-3.5 w-3.5 text-purple-400" />
                <span className="truncate">Categories</span>
              </div>
              <p className="text-xl font-bold font-mono text-foreground">
                {categories.length || 6}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 dark:border-slate-800/60 dark:bg-slate-950/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Award className="h-3.5 w-3.5 text-emerald-400" />
                <span className="truncate">High Mastery</span>
              </div>
              <p className="text-xl font-bold font-mono text-foreground">
                {(proficiencies.expert || 0) + (proficiencies.advanced || 0)}
              </p>
            </div>
          </div>

          {/* 2-Column Split: Category Stack on Left, Proficiency Spectrum on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Category Distribution */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 dark:border-slate-800/60 dark:bg-slate-950/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  Stack Distribution
                </h4>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {categories.length} active groups
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {categories.length > 0 ? (
                  categories.map(([category, count]) => {
                    const percentage =
                      totalSkillsCount > 0 ? Math.round((count / totalSkillsCount) * 100) : 0;

                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground capitalize truncate">
                            {category}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-[11px]">
                            <span className="text-muted-foreground">{count}</span>
                            <span className="text-primary font-bold">({percentage}%)</span>
                          </div>
                        </div>

                        <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-4 text-center text-xs text-muted-foreground">
                    No categories found. Add skills to see the distribution.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Proficiency Spectrum */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 dark:border-slate-800/60 dark:bg-slate-950/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-purple-400" />
                  Proficiency Breakdown
                </h4>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Competency spread
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {['expert', 'advanced', 'intermediate', 'beginner'].map((level) => {
                  const count = proficiencies[level] || 0;
                  const style = proficiencyColors[level] || proficiencyColors.intermediate;
                  const pct =
                    totalSkillsCount > 0 ? Math.round((count / totalSkillsCount) * 100) : 0;

                  return (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-semibold capitalize ${style.text}`}>{level}</span>
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span className="text-muted-foreground">{count} skills</span>
                          <span className="font-bold text-foreground">({pct}%)</span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full ${style.bar} rounded-full transition-all duration-500`}
                          style={{ width: `${pct || 4}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer Micro-insights */}
      <div className="px-6 py-3 border-t border-border/50 bg-muted/10 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Curated technical expertise across full-stack engineering</span>
        <Link href="/dashboard/skills" className="font-medium text-primary hover:underline">
          Manage full skill tree →
        </Link>
      </div>
    </Card>
  );
};
