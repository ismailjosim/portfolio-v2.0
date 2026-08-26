'use client';

import { ExternalLink, Github, Info } from 'lucide-react';
import FadeUp from '../ui/FadeUp';
import { PALETTES, useCustomTheme } from '@/src/providers/custom-theme-provider';

const GITHUB_USERNAME = 'ismailjosim';

export default function GitHubSection() {
  const { palette } = useCustomTheme();

  // ghchart builds its whole contribution scale from one base colour (hex, no `#`),
  // so the graph follows the active palette instead of a hardcoded cyan.
  const activePalette = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];
  const chartColor = activePalette.primaryColor.replace('#', '');

  return (
    <section className="flex justify-center items-center">
      <div className="container mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-accent sm:mb-4 mb-2">
              My GitHub Contributions
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="bg-card border border-border rounded-2xl sm:p-8 p-4 flex flex-col items-center gap-6">
            {/* Description */}
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Github className="h-4 w-4 text-accent" />
              Here&apos;s my recent GitHub snapshot.
            </p>

            {/* Contribution Graph */}

            <div className="w-full overflow-x-auto rounded-xl border border-border bg-background/40 p-3 sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`GitHub Contribution Graph for ${GITHUB_USERNAME}`}
                width={663}
                height={104}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto w-full min-w-[720px] rounded-lg opacity-90 dark:opacity-75 transition-opacity"
                src={`https://ghchart.rshah.org/${chartColor}/${GITHUB_USERNAME}`}
              />
            </div>

            {/* Info + Link */}
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-accent shrink-0" />
              (This section dynamically loads your actual GitHub contribution graph and statistics.)
            </p>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline transition-colors text-sm"
            >
              View My GitHub Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
