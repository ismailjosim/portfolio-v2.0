'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useCustomTheme, PALETTES, FONTS } from '@/src/providers/custom-theme-provider';
import { normalizeThemeSettings, toThemeMode } from '@/src/lib/theme-options';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Label } from '@/src/components/ui/label';
import {
  Palette,
  Type,
  Sun,
  Moon,
  Laptop,
  Check,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  Globe,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    palette,
    setPalette,
    font,
    setFont,
    resetTheme,
    globalSettings,
    isSyncedWithGlobal,
    syncGlobalSettings,
  } = useCustomTheme();
  const [isPublishing, setIsPublishing] = useState(false);

  // `theme` is undefined until next-themes mounts — fall back to the global mode.
  const activeMode = toThemeMode(theme, globalSettings.themeMode);
  const isModeSyncedWithGlobal = activeMode === globalSettings.themeMode;
  const isFullySynced = isSyncedWithGlobal && isModeSyncedWithGlobal;

  const currentPaletteObj = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  const currentFontObj = FONTS.find((f) => f.id === font) || FONTS[0];
  const globalPaletteObj = PALETTES.find((p) => p.id === globalSettings.palette) || PALETTES[0];
  const globalFontObj = FONTS.find((f) => f.id === globalSettings.font) || FONTS[0];

  const handleReset = () => {
    resetTheme();
    setTheme('system');
    toast.success('Theme & typography reset to defaults');
  };

  /** Publishes the current selection to MongoDB so every visitor sees it. */
  const handleApplyGlobally = async () => {
    setIsPublishing(true);

    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ palette, font, themeMode: activeMode }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        throw new Error(json?.error || 'Failed to save the global theme.');
      }

      syncGlobalSettings(normalizeThemeSettings(json.data));

      toast.success('Global theme published', {
        description: `Every visitor now loads ${currentPaletteObj.name} · ${currentFontObj.name} · ${activeMode} mode.`,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save the global theme.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* ── Page Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-linear-to-r from-card/90 via-primary/5 to-card/90 backdrop-blur-2xl p-6 sm:p-8 shadow-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90">
        {/* Glow background */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                <Sliders className="h-3 w-3" />
                Customization Studio
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Global Styling Engine</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Theme & Typography Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Customize your portfolio’s visual brand, color palette, and body typography in real
              time. Changes preview instantly here — click{' '}
              <span className="font-semibold text-foreground">Apply Globally</span> to publish them
              to every visitor.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                  isFullySynced
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                }`}
              >
                {isFullySynced ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                {isFullySynced ? 'Live globally' : 'Unpublished preview'}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Global: {globalPaletteObj.name} · {globalFontObj.name} · {globalSettings.themeMode}{' '}
                mode
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={handleApplyGlobally}
              disabled={isPublishing || isFullySynced}
              className="gap-2 shadow-sm shadow-primary/20"
            >
              {isPublishing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Globe className="h-3.5 w-3.5" />
              )}
              <span>{isPublishing ? 'Publishing…' : 'Apply Globally'}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isPublishing}
              className="gap-2 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* ── LEFT COLUMN: Controls ── */}
        <div className="space-y-8 lg:col-span-7">
          {/* 1. THEME MODE SELECTOR */}
          <Card className="border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Sun className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Theme Mode</CardTitle>
                  <CardDescription className="text-xs">
                    Choose between light, dark, or system appearance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Laptop },
                ].map(({ id, label, icon: Icon }) => {
                  const isSelected = activeMode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setTheme(id);
                        toast.success(`Theme mode set to ${label}`);
                      }}
                      className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/15 text-primary'
                          : 'border-border/80 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground dark:border-slate-800 dark:bg-slate-950/40'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold">{label}</span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 2. COLOR PALETTE SELECTOR */}
          <Card className="border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Palette className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Color Palette</CardTitle>
                  <CardDescription className="text-xs">
                    Select a curated color scheme for accents, buttons, and glowing gradients
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PALETTES.map((p) => {
                  const isSelected = palette === p.id;

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setPalette(p.id);
                        toast.success(`Applied ${p.name} palette`);
                      }}
                      className={`group relative flex items-start gap-3.5 rounded-2xl border p-3.5 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/20 ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:border-border hover:bg-muted/40 dark:border-slate-800 dark:bg-slate-950/30'
                      }`}
                    >
                      {/* Swatch Circle */}
                      <div
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${p.primaryColor}, ${p.accentColor})`,
                        }}
                      >
                        {isSelected && <Check className="h-4 w-4 text-white drop-shadow-md" />}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-xs text-foreground truncate">
                            {p.name}
                          </h4>
                          {p.id === 'cyan' && (
                            <span className="rounded-full bg-primary/10 border border-primary/20 px-1.5 py-0.2 text-[9px] font-semibold text-primary">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 3. FONT SELECTOR */}
          <Card className="border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Type className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Body Typography</CardTitle>
                  <CardDescription className="text-xs">
                    Choose the primary Google Font applied across public pages & dashboard
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FONTS.map((f) => {
                  const isSelected = font === f.id;

                  return (
                    <div
                      key={f.id}
                      onClick={() => {
                        setFont(f.id);
                        toast.success(`Font updated to ${f.name}`);
                      }}
                      className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/20 ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:border-border hover:bg-muted/40 dark:border-slate-800 dark:bg-slate-950/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-foreground">{f.name}</h4>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            {f.category}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      <p
                        className="text-xs text-muted-foreground line-clamp-2 border-t border-border/40 pt-2 dark:border-slate-800/40"
                        style={{
                          fontFamily:
                            f.id === 'jakarta'
                              ? "'Plus Jakarta Sans', sans-serif"
                              : f.id === 'outfit'
                                ? "'Outfit', sans-serif"
                                : f.id === 'space-grotesk'
                                  ? "'Space Grotesk', sans-serif"
                                  : f.id === 'poppins'
                                    ? "'Poppins', sans-serif"
                                    : f.id === 'rajdhani'
                                      ? "'Rajdhani', sans-serif"
                                      : f.id === 'roboto'
                                        ? "'Roboto', sans-serif"
                                        : "'Inter', sans-serif",
                        }}
                      >
                        {f.previewText}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT COLUMN: Live Interactive Playground ── */}
        <div className="lg:col-span-5 sticky top-6 space-y-6">
          <Card className="relative overflow-hidden border-border/80 bg-card/80 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-[#0A1124]/95 shadow-xl">
            {/* Ambient Palette Glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl opacity-40 transition-colors duration-500"
              style={{ background: currentPaletteObj.primaryColor }}
            />

            <CardHeader className="pb-3 border-b border-border/60 dark:border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <CardTitle className="text-sm font-bold uppercase tracking-wider">
                    Live UI Preview
                  </CardTitle>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
                  {currentPaletteObj.name} • {currentFontObj.name}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-5">
              {/* Preview Hero Mock */}
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4.5 dark:border-slate-800/60 dark:bg-slate-950/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                    <Sparkles className="h-2.5 w-2.5" /> Full Stack Developer
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                  Crafting Digital <span className="text-primary">Experiences</span>
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  The quick brown fox jumps over the lazy dog. Experience modern software
                  engineering with tailored palettes and typography.
                </p>

                {/* Buttons showcase */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Button size="sm" className="gap-1.5 shadow-sm">
                    Primary Action <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-border">
                    Secondary Link
                  </Button>
                </div>
              </div>

              {/* Progress & Highlights Mock */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Accents & Progress Meter
                </Label>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-foreground font-medium">Performance Score</span>
                    <span className="text-primary font-bold">98.4%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: '85%' }}
                    />
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Next.js 16', 'TypeScript', 'TailwindCSS', 'Mongoose'].map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[11px] font-medium border border-border/40 hover:border-primary/40 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Information Status box */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  {isFullySynced ? (
                    <>
                      This palette, font, and theme mode are stored in the database and served to
                      every visitor on their first paint — homepage, hero section, project cards,
                      blog reader, and dashboard tables.
                    </>
                  ) : (
                    <>
                      You are previewing changes locally. Click{' '}
                      <span className="font-semibold text-foreground">Apply Globally</span> to store
                      them in the database and serve them to every visitor.
                    </>
                  )}
                </span>
              </div>

              <Button
                onClick={handleApplyGlobally}
                disabled={isPublishing || isFullySynced}
                className="w-full gap-2"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                <span>
                  {isPublishing
                    ? 'Publishing…'
                    : isFullySynced
                      ? 'Already Live Globally'
                      : 'Apply Globally'}
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
