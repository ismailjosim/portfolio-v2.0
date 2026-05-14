import { IBlog } from '@/src/types/blog.interface';
import FadeUp from '../ui/FadeUp';
import Image from 'next/image';

interface BlogCardPros {
  blog: IBlog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardPros) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'from-blue-500 to-purple-600',
      lifestyle: 'from-green-500 to-teal-600',
      travel: 'from-orange-500 to-red-600',
      finance: 'from-pink-500 to-rose-600',
      learning: 'from-cyan-500 to-blue-600',
      other: 'from-indigo-500 to-purple-600',
    };
    return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  return (
    <FadeUp key={blog.slug} delay={index * 80}>
      <article
        className="h-full rounded-2xl overflow-hidden transition-all flex flex-col"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--blog-card)',
        }}
      >
        {blog.coverImage ? (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div
            className={`bg-linear-to-br ${getCategoryColor(blog.category)} h-48 flex items-center justify-center overflow-hidden`}
          >
            <div className="text-white opacity-40 text-4xl">📝</div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`blog-category-badge ${blog.category.toLowerCase()}`}>
              {blog.category}
            </span>
            <span className="text-muted-foreground text-xs">{getReadTime(blog.content)}</span>
          </div>
          <h3 className="font-bold text-foreground text-lg mb-2 hover:text-accent transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
            {blog.summary || blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}
            {!blog.summary && '...'}
          </p>
          <a
            href={`/blogs/${blog.slug}`}
            className="text-accent text-sm font-medium hover:underline"
          >
            Read More →
          </a>
        </div>
      </article>
    </FadeUp>
  );
};

export default BlogCard;
