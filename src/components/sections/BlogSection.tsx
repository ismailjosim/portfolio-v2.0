'use client';

import { useState, useEffect } from 'react';
import FadeUp from '../ui/FadeUp';
import { IBlog } from '@/src/types/blog.interface';
import Link from 'next/link';
import { Button } from '../ui/button';
import BlogCard from '../blogs/BlogCard';
import { BlogGridSkeleton, EmptyState } from '../shared/PublicDataSkeletons';

export default function BlogSection() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const data = await response.json();

        const publishedBlogs = (data.blogs || []).filter(
          (blog: IBlog) => blog.status === 'published'
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const displayBlogs = blogs.slice(0, 6);

  return (
    <section className="py-20" id="blog">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
              My thoughts and insights
            </p>
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Latest Articles &amp; Insights
            </h2>
          </FadeUp>
        </div>

        {loading ? (
          <BlogGridSkeleton count={6} />
        ) : displayBlogs.length === 0 ? (
          <EmptyState
            icon="articles"
            title="No articles published yet"
            description="New writing will appear here as soon as it is published."
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </div>
        )}

        <FadeUp delay={200}>
          <div className="text-center py-16">
            <Button asChild variant="outline">
              <Link href="/blogs">View All Articles →</Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
