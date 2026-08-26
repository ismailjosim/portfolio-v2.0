import { unstable_cache } from 'next/cache';
import { connectDB } from '@/src/lib/mongodb';
import ThemeSettings from '@/src/models/ThemeSettings';
import {
  DEFAULT_THEME_SETTINGS,
  GlobalThemeSettings,
  normalizeThemeSettings,
  PaletteId,
  FontId,
  ThemeMode,
} from '@/src/lib/theme-options';

/** Cache tag used to invalidate prerendered pages after a global theme publish. */
export const THEME_SETTINGS_TAG = 'global-theme-settings';

interface ThemeSettingsDocument {
  palette?: string;
  font?: string;
  themeMode?: string;
  updatedAt?: Date;
}

/**
 * Reads the global theme straight from MongoDB. Never throws — a database
 * outage degrades to the built-in defaults instead of breaking the layout.
 */
export async function readGlobalThemeSettings(): Promise<GlobalThemeSettings> {
  try {
    await connectDB();

    const doc = await ThemeSettings.findOne()
      .sort({ updatedAt: -1 })
      .lean<ThemeSettingsDocument | null>();

    if (!doc) return DEFAULT_THEME_SETTINGS;

    return normalizeThemeSettings(doc);
  } catch (err) {
    console.error('[theme-settings] Failed to read global theme settings:', err);
    return DEFAULT_THEME_SETTINGS;
  }
}

/**
 * Cached variant for use in the root layout so every page render does not hit
 * MongoDB. Invalidated through `THEME_SETTINGS_TAG` whenever the admin publishes,
 * which also regenerates statically prerendered pages.
 */
export const getGlobalThemeSettings = unstable_cache(
  readGlobalThemeSettings,
  ['global-theme-settings'],
  { tags: [THEME_SETTINGS_TAG], revalidate: 300 }
);

/** Creates the singleton document on first publish, updates it afterwards. */
export async function saveGlobalThemeSettings(input: {
  palette: PaletteId;
  font: FontId;
  themeMode: ThemeMode;
}): Promise<GlobalThemeSettings> {
  await connectDB();

  const doc = await ThemeSettings.findOneAndUpdate(
    {},
    { $set: input },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      sort: { updatedAt: -1 },
    }
  ).lean<ThemeSettingsDocument>();

  return normalizeThemeSettings(doc, { ...DEFAULT_THEME_SETTINGS, ...input });
}
