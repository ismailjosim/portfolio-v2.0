import { serverFetch } from '../lib/server-fetch';

/* =========================
   Types
========================= */

export interface Blog {
  _id?: string;
  title?: string;
  views?: number;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: string;
}

export interface Project {
  _id?: string;
  title?: string;
  createdAt?: string;
}

export interface Skill {
  _id?: string;
  name?: string;
  category?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced';
}

export interface DashboardStats {
  totalBlogs: number;
  totalProjects: number;
  totalSkills: number;
  blogMetrics: {
    totalBlogs: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    averageViews: number;
  };
  skillsMetrics: {
    totalSkills: number;
    skillsByCategory: Record<string, number>;
    proficiencyBreakdown: Record<string, number>;
  };
  recentBlogs: Blog[];
  projects: Project[];
  skills: Skill[];
}

/* =========================
   Helpers
========================= */

// Normalize API response safely
function extractArray<T>(data: unknown, key: string): T[] {
  if (Array.isArray(data)) return data as T[];

  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj[key])) return obj[key] as T[];
    if (Array.isArray(obj.data)) return obj.data as T[];
  }

  return [];
}

/* =========================
   Service
========================= */

export async function getDashboardData(): Promise<DashboardStats> {
  try {
    const [blogsRes, projectsRes, skillsRes] = await Promise.all([
      serverFetch.get('/api/blogs?limit=100'),
      serverFetch.get('/api/projects?limit=100'),
      serverFetch.get('/api/skills?limit=100').catch(() => null),
    ]);

    const blogsData = blogsRes.ok ? await blogsRes.json() : [];
    const projectsData = projectsRes.ok ? await projectsRes.json() : [];
    const skillsData = skillsRes && skillsRes.ok ? await skillsRes.json() : [];

    const blogs = extractArray<Blog>(blogsData, 'blogs');
    const projects = extractArray<Project>(projectsData, 'projects');
    const skills = extractArray<Skill>(skillsData, 'skills');

    /* =========================
		   Blog Metrics
		========================= */

    const totalViews = blogs.reduce<number>((sum, blog) => sum + (blog.views ?? 0), 0);

    const totalLikes = blogs.reduce<number>((sum, blog) => sum + (blog.likesCount ?? 0), 0);

    const totalComments = blogs.reduce<number>((sum, blog) => sum + (blog.commentsCount ?? 0), 0);

    const averageViews = blogs.length > 0 ? totalViews / blogs.length : 0;

    /* =========================
		   Skills Metrics
		========================= */

    const skillsByCategory: Record<string, number> = {};
    const proficiencyBreakdown: Record<string, number> = {};

    for (const skill of skills) {
      const category = skill.category ?? 'Uncategorized';
      skillsByCategory[category] = (skillsByCategory[category] ?? 0) + 1;

      const proficiency = skill.proficiency ?? 'intermediate';
      proficiencyBreakdown[proficiency] = (proficiencyBreakdown[proficiency] ?? 0) + 1;
    }

    /* =========================
		   Sorting
		========================= */

    const sortedBlogs = [...blogs].sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? 0).getTime();
      return dateB - dateA;
    });

    /* =========================
		   Final Response
		========================= */

    return {
      totalBlogs: blogs.length,
      totalProjects: projects.length,
      totalSkills: skills.length,

      blogMetrics: {
        totalBlogs: blogs.length,
        totalViews,
        totalLikes,
        totalComments,
        averageViews,
      },

      skillsMetrics: {
        totalSkills: skills.length,
        skillsByCategory,
        proficiencyBreakdown,
      },

      recentBlogs: sortedBlogs.slice(0, 4),
      projects: projects.slice(0, 3),
      skills: skills.slice(0, 12),
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    return {
      totalBlogs: 0,
      totalProjects: 0,
      totalSkills: 0,

      blogMetrics: {
        totalBlogs: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        averageViews: 0,
      },

      skillsMetrics: {
        totalSkills: 0,
        skillsByCategory: {},
        proficiencyBreakdown: {},
      },

      recentBlogs: [],
      projects: [],
      skills: [],
    };
  }
}
