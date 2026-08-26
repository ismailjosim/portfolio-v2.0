import mongoose, { Schema, Document } from 'mongoose';
import {
  DEFAULT_FONT,
  DEFAULT_PALETTE,
  DEFAULT_THEME_MODE,
  FONT_IDS,
  FontId,
  PALETTE_IDS,
  PaletteId,
  THEME_MODES,
  ThemeMode,
} from '@/src/lib/theme-options';

export interface IThemeSettings extends Document {
  palette: PaletteId;
  font: FontId;
  themeMode: ThemeMode;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Global (site-wide) theme configuration. Treated as a singleton document —
 * reads and writes always target the most recently updated document.
 */
const ThemeSettingsSchema = new Schema<IThemeSettings>(
  {
    palette: {
      type: String,
      required: true,
      enum: [...PALETTE_IDS],
      default: DEFAULT_PALETTE,
    },
    font: {
      type: String,
      required: true,
      enum: [...FONT_IDS],
      default: DEFAULT_FONT,
    },
    themeMode: {
      type: String,
      required: true,
      enum: [...THEME_MODES],
      default: DEFAULT_THEME_MODE,
    },
  },
  {
    timestamps: true,
  }
);

const ThemeSettings =
  mongoose.models.ThemeSettings ||
  mongoose.model<IThemeSettings>('ThemeSettings', ThemeSettingsSchema);

export default ThemeSettings;
