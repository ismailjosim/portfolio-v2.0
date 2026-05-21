import { Search } from 'lucide-react';

import Navbar from '@/src/components/shared/Navbar';
import { BlogFilterSkeleton, BlogGridSkeleton } from '@/src/components/shared/PublicDataSkeletons';
import { Input } from '@/src/components/ui/input';

export default function BlogsLoading() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-screen">
        <section className="py-20 bg-linear-to-b from-background via-background to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore my thoughts on technology, career, and more
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-12 py-3 text-lg"
                disabled
              />
            </div>

            <div className="mt-8">
              <BlogFilterSkeleton />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto">
            <BlogGridSkeleton count={6} />
          </div>
        </section>
      </main>
    </>
  );
}
