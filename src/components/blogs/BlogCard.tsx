import { IBlog } from '@/src/types/blog.interface';
import FadeUp from '../ui/FadeUp';
import Image from 'next/image';
import { Eye, FileText, Heart, MessageCircle } from 'lucide-react';

interface BlogCardPros {
  blog: IBlog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardPros) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      frontend: 'from-blue-500 to-purple-600',
      backend: 'from-green-500 to-teal-600',
      'full stack': 'from-orange-500 to-red-600',
      fullstack: 'from-orange-500 to-red-600',
      devops: 'from-pink-500 to-rose-600',
      database: 'from-cyan-500 to-blue-600',
      authentication: 'from-indigo-500 to-purple-600',
      tutorial: 'from-amber-500 to-orange-600',
      career: 'from-violet-500 to-purple-600',
      'case study': 'from-teal-500 to-green-600',
      casestudy: 'from-teal-500 to-green-600',
    };
    return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  const getCategoryClassName = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '');
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
        className="h-full rounded-2xl overflow-hidden transition-all flex flex-col hover:shadow-lg"
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
            <FileText className="h-12 w-12 text-white/50" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`blog-category-badge ${getCategoryClassName(blog.category)}`}>
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

          {/* Stats - Views, Likes, Comments */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 py-2 border-t border-border/40 pt-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{blog.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{blog.likesCount} likes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{blog.commentsCount} comments</span>
            </div>
          </div>

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
