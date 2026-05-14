'use server';

import { serverFetch } from '../lib/server-fetch';
import { IProject } from '../types/project.interface';

export interface IProjectPayload {
  name: string;
  subtitle: string;
  title: string;
  type: string;

  image: string;
  demoImages?: string[];

  description?: string;
  technologies: string[];
  features: string[];

  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;

  featured?: boolean;
  order?: number;
  isPublished?: boolean;

  slug?: string;
}

/* =========================
   Create Project
========================= */
export async function createProject(payload: IProjectPayload) {
  try {
    const res = await serverFetch.post('/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json();
      return { success: false, ...result };
    }

    const project = await res.json();
    return { success: true, data: project };
  } catch (error) {
    return { success: false, message: 'Failed to create project' };
  }
}

/* =========================
   Update Project
========================= */
export async function updateProject(slug: string, payload: IProjectPayload) {
  try {
    const res = await serverFetch.patch(`/projects/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json();
      return { success: false, ...result };
    }

    const project = (await res.json()) as IProject;
    return { success: true, data: project };
  } catch (error) {
    console.error('updateProject', error);
    return { success: false, message: 'Failed to update project' };
  }
}

/* =========================
   Get All Projects
========================= */
export async function getAllProjects(queryStr?: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/projects${
      queryStr ? `?${queryStr}` : ''
    }`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to fetch projects' };
    }

    const result = await res.json();

    return {
      success: true,
      data: result.projects,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error('getAllProjects', error);
    return { success: false, message: 'Failed to fetch projects' };
  }
}

/* =========================
   Delete Project
========================= */
export async function deleteProject(slug: string) {
  try {
    const res = await serverFetch.delete(`/projects/${slug}`);

    if (!res.ok) {
      const result = await res.json();
      return { success: false, ...result };
    }

    return { success: true };
  } catch (error) {
    console.error('deleteProject', error);
    return { success: false, message: 'Failed to delete project' };
  }
}

/* =========================
   Get Single Project
========================= */
export async function getSingleProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/projects/${slug}`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) {
      const result = await res.json();
      return { success: false, ...result };
    }

    const project = (await res.json()) as IProject;

    return { success: true, data: project };
  } catch (error) {
    console.error('getSingleProjectBySlug', error);
    return { success: false, message: 'Failed to fetch project' };
  }
}
