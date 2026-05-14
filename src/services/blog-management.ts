import { serverFetch } from '../lib/server-fetch';
import { IBlog } from '../types/blog.interface';

export interface IBlogPayload {
  title: string;
  category: string;
  content: string;
  coverImage?: string;
  status: string;
  tags: string[];
  summary?: string;
  slug?: string;
}

type GetBlogsParams = {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
};

export async function createBlog(payload: IBlogPayload) {
  try {
    const res = await serverFetch.post('/blogs', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json();

      return {
        success: false,
        ...result,
      };
    }

    const blog = (await res.json()) as IBlog;

    return {
      success: true,
      data: blog,
    };
  } catch (error) {
    console.error('createBlog', error);

    return {
      success: false,
      message: 'Failed to create blog',
    };
  }
}

export async function updateBlog(slug: string, payload: IBlogPayload) {
  try {
    const res = await serverFetch.patch(`/blogs/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json();

      return {
        success: false,
        ...result,
      };
    }

    const blog = (await res.json()) as IBlog;

    return {
      success: true,
      data: blog,
    };
  } catch (error) {
    console.error('updateBlog', error);

    return {
      success: false,
      message: 'Failed to update blog',
    };
  }
}

export async function getAllBlogs(params?: GetBlogsParams) {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.set('page', String(params.page));

    if (params?.limit) query.set('limit', String(params.limit));

    if (params?.category) query.set('category', params.category);

    if (params?.tag) query.set('tag', params.tag);

    if (params?.search) query.set('search', params.search);

    const endpoint = `/blogs${query.toString() ? `?${query.toString()}` : ''}`;

    const res = await serverFetch.get(endpoint, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Failed to fetch blogs',
      };
    }

    const result = await res.json();

    return {
      success: true,
      data: result.blogs,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error('getAllBlogs', error);

    return {
      success: false,
      message: 'Failed to fetch blogs',
    };
  }
}

export async function deleteBlog(slug: string) {
  try {
    const res = await serverFetch.delete(`/blogs/${slug}`);

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || 'Failed to delete blog',
      };
    }

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    console.error('deleteBlog', error);

    return {
      success: false,
      message: 'Failed to delete blog',
    };
  }
}

export async function getSingleBlogBySlug(slug: string) {
  try {
    const res = await serverFetch.get(`/blogs/${slug}`);

    if (!res.ok) {
      const result = await res.json();

      return {
        success: false,
        ...result,
      };
    }

    const blog = (await res.json()) as IBlog;

    return {
      success: true,
      data: blog,
    };
  } catch (error) {
    console.error('getSingleBlogBySlug', error);

    return {
      success: false,
      message: 'Failed to fetch blog',
    };
  }
}
