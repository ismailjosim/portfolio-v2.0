'use client';

import { useEffect, useState } from 'react';
import FadeUp from '@/src/components/ui/FadeUp';
import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import ScrollToTop from '@/src/components/ui/ScrollToTop';
import { EmptyState, ProjectListSkeleton } from '@/src/components/shared/PublicDataSkeletons';
import ProjectShowcaseCard from '@/src/components/projects/ProjectShowcaseCard';

interface IProject {
  _id: string;
  name: string;
  subtitle: string;
  title: string;
  type: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt?: string;
}

interface ProjectDisplay extends IProject {
  reverse?: boolean;
  bullets: string[];
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<ProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects?limit=100');
        const data = await response.json();

        if (data.projects && data.projects.length > 0) {
          const displayProjects: ProjectDisplay[] = data.projects.map(
            (project: IProject, index: number) => ({
              ...project,
              reverse: index % 2 !== 0,
              bullets: project.features.slice(0, 3),
            })
          );

          setProjects(displayProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen transition-all duration-300 bg-background">
        <section className="py-20 px-6">
          <div className="container mx-auto">
            {/* Header */}
            <FadeUp>
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">
                All Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                Explore all the projects I&apos;ve built and worked on. Each project represents my
                commitment to quality, innovation, and delivering impactful solutions.
              </p>
            </FadeUp>

            {loading ? (
              <ProjectListSkeleton count={4} />
            ) : projects.length === 0 ? (
              <EmptyState
                icon="projects"
                title="No projects found"
                description="Published projects will show up here as soon as they are available."
              />
            ) : (
              <div className="space-y-12">
                {projects.map((project, i) => (
                  <FadeUp key={project._id} delay={i * 50}>
                    <ProjectShowcaseCard
                      project={project}
                      reverse={project.reverse}
                      priority={i === 0}
                    />
                  </FadeUp>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
