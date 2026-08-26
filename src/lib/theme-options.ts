/**
 * Single source of truth for the theme identifiers shared by the client provider,
 * the Mongoose model and the /api/theme route. Framework-neutral on purpose so it
 * can be imported from both server and client code.
 */

export const PALETTE_IDS = ['cyan', 'indigo', 'emerald', 'amber', 'purple', 'rose'] as const;

export const FONT_IDS = [
  'inter',
  'jakarta',
  'outfit',
  'space-grotesk',
  'poppins',
  'rajdhani',
  'roboto',
] as const;

export const THEME_MODES = ['light', 'dark', 'system'] as const;

export type PaletteId = (typeof PALETTE_IDS)[number];
export type FontId = (typeof FONT_IDS)[number];
export type ThemeMode = (typeof THEME_MODES)[number];

export const DEFAULT_PALETTE: PaletteId = 'cyan';
export const DEFAULT_FONT: FontId = 'inter';
export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export interface GlobalThemeSettings {
  palette: PaletteId;
  font: FontId;
  themeMode: ThemeMode;
  /** Epoch ms of the last global publish. `0` means the admin never published. */
  updatedAt: number;
}

export const DEFAULT_THEME_SETTINGS: GlobalThemeSettings = {
  palette: DEFAULT_PALETTE,
  font: DEFAULT_FONT,
  themeMode: DEFAULT_THEME_MODE,
  updatedAt: 0,
};

export const isPaletteId = (value: unknown): value is PaletteId =>
  typeof value === 'string' && (PALETTE_IDS as readonly string[]).includes(value);

export const isFontId = (value: unknown): value is FontId =>
  typeof value === 'string' && (FONT_IDS as readonly string[]).includes(value);

export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === 'string' && (THEME_MODES as readonly string[]).includes(value);

export const toPaletteId = (value: unknown, fallback: PaletteId = DEFAULT_PALETTE): PaletteId =>
  isPaletteId(value) ? value : fallback;

export const toFontId = (value: unknown, fallback: FontId = DEFAULT_FONT): FontId =>
  isFontId(value) ? value : fallback;

export const toThemeMode = (value: unknown, fallback: ThemeMode = DEFAULT_THEME_MODE): ThemeMode =>
  isThemeMode(value) ? value : fallback;

/** Normalises an untrusted payload (API response, DB document) into settings. */
export const normalizeThemeSettings = (
  value: unknown,
  fallback: GlobalThemeSettings = DEFAULT_THEME_SETTINGS
): GlobalThemeSettings => {
  const raw = (value ?? {}) as Record<string, unknown>;
  const updatedAt =
    raw.updatedAt instanceof Date
      ? raw.updatedAt.getTime()
      : typeof raw.updatedAt === 'number'
        ? raw.updatedAt
        : typeof raw.updatedAt === 'string'
          ? new Date(raw.updatedAt).getTime()
          : fallback.updatedAt;

  return {
    palette: toPaletteId(raw.palette, fallback.palette),
    font: toFontId(raw.font, fallback.font),
    themeMode: toThemeMode(raw.themeMode, fallback.themeMode),
    updatedAt: Number.isFinite(updatedAt) ? updatedAt : 0,
  };
};
