import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import {
  readGlobalThemeSettings,
  saveGlobalThemeSettings,
  THEME_SETTINGS_TAG,
} from '@/src/lib/theme-settings';
import { isFontId, isPaletteId, isThemeMode } from '@/src/lib/theme-options';

// The client provider polls this on mount to detect a stale cached document,
// so it must never be served from a cache.
export const dynamic = 'force-dynamic';

const SESSION_COOKIE = 'dashboard_session';
const SESSION_VALUE = 'authenticated';

/** GET /api/theme — public read of the global theme settings. */
export async function GET() {
  const settings = await readGlobalThemeSettings();

  return NextResponse.json(
    { success: true, data: settings },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/** POST /api/theme — admin-only write of the global theme settings. */
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get(SESSION_COOKIE)?.value !== SESSION_VALUE) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Sign in to change the global theme.' },
        { status: 401 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
    }

    const { palette, font, themeMode } = (body ?? {}) as Record<string, unknown>;

    if (!isPaletteId(palette)) {
      return NextResponse.json(
        { success: false, error: `Unsupported palette: ${String(palette)}` },
        { status: 400 }
      );
    }
    if (!isFontId(font)) {
      return NextResponse.json(
        { success: false, error: `Unsupported font: ${String(font)}` },
        { status: 400 }
      );
    }
    if (!isThemeMode(themeMode)) {
      return NextResponse.json(
        { success: false, error: `Unsupported theme mode: ${String(themeMode)}` },
        { status: 400 }
      );
    }

    const settings = await saveGlobalThemeSettings({ palette, font, themeMode });

    // Drop the cached layout read so already-rendered pages pick up the new theme.
    // `expire: 0` purges immediately instead of serving stale-while-revalidate.
    revalidateTag(THEME_SETTINGS_TAG, { expire: 0 });

    return NextResponse.json({ success: true, data: settings });
  } catch (err) {
    console.error('[POST /api/theme]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save theme settings.' },
      { status: 500 }
    );
  }
}
