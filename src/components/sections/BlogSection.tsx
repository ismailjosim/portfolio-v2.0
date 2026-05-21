'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeUp from '../ui/FadeUp';
import { IBlog } from '@/src/types/blog.interface';
import Link from 'next/link';
import { Button } from '../ui/button';
import { blogCategories } from '@/src/constants/blogTaxonomy';
import BlogCard from '../blogs/BlogCard';

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters] = useState<string[]>(() => [
    'all',
    ...Array.from(blogCategories).map((cat) => cat.toLowerCase()),
  ]);

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

  const filtered =
    activeFilter === 'all'
      ? blogs
      : blogs.filter((blog) => blog.category.toLowerCase() === activeFilter.toLowerCase());

  // show only 6 blogs
  const displayBlogs = filtered.slice(0, 6);

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

          <FadeUp delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`blog-filter ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : displayBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
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
