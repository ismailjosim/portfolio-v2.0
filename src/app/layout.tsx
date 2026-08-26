import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { TooltipProvider } from '../components/ui/tooltip';
import { ThemeProvider } from '../providers/theme-provider';
import { CustomThemeProvider } from '../providers/custom-theme-provider';
import { getGlobalThemeSettings } from '../lib/theme-settings';

export const metadata: Metadata = {
  title: 'JASIM - Full Stack Developer & Instructor',
  description: 'Full Stack Developer | Programmer | Instructor',
  icons: {
    icon: [
      { url: '/ismailjosim.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global theme, resolved on the server so the first paint is already correct.
  const themeSettings = await getGlobalThemeSettings();

  return (
    <html
      lang="en"
      data-palette={themeSettings.palette}
      data-font={themeSettings.font}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme={themeSettings.themeMode} enableSystem>
          <CustomThemeProvider
            initialPalette={themeSettings.palette}
            initialFont={themeSettings.font}
            initialThemeMode={themeSettings.themeMode}
            initialUpdatedAt={themeSettings.updatedAt}
          >
            <TooltipProvider>
              {children}

              <Toaster position="top-right" richColors />
            </TooltipProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
