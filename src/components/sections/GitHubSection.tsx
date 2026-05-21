import { ExternalLink, Github, Info } from 'lucide-react';
import FadeUp from '../ui/FadeUp';

export default function GitHubSection() {
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
          <div className="bg-card border border-border rounded-2xl sm:p-10 p-4 flex flex-col items-center gap-6">
            {/* Description */}
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Github className="h-4 w-4 text-accent" />
              Here&apos;s my recent GitHub snapshot.
            </p>

            {/* Contribution Graph */}

            <div className="w-full overflow-x-auto rounded-xl border border-border bg-background/40 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="GitHub Contribution Graph for ismailjosim"
                width={800}
                height={200}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto min-w-[720px] max-w-full rounded-lg opacity-90"
                src="https://ghchart.rshah.org/00c6d7/ismailjosim"
              />
            </div>

            {/* Info + Link */}
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-accent shrink-0" />
              (This section dynamically loads your actual GitHub contribution graph and statistics.)
            </p>

            <a
              href="https://github.com/ismailjosim"
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
