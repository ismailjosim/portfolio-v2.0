'use client';

import { useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import FadeUp from '@/src/components/ui/FadeUp';
import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import ScrollToTop from '@/src/components/ui/ScrollToTop';

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
              <div className="flex items-center justify-center min-h-96">
                <p className="text-muted-foreground text-lg">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center justify-center min-h-96">
                <p className="text-muted-foreground text-lg">No projects found.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {projects.map((project, i) => (
                  <FadeUp key={project._id} delay={i * 50}>
                    <div
                      className={`group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${project.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                    >
                      {/* Image Column */}
                      <div className="relative overflow-hidden rounded-xl aspect-video shadow-sm group/img">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                      </div>

                      {/* Content Column */}
                      <div className="flex flex-col justify-center p-6 lg:p-8">
                        {/* Title and Links */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                              {project.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{project.type}</p>
                          </div>
                          <div className="flex gap-3 text-muted-foreground">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors"
                                title="View on GitHub"
                              >
                                <Github className="w-5 h-5" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors"
                                title="Visit Live Site"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {project.subtitle || project.title}
                        </p>

                        {/* Features */}
                        <ul className="mb-6 space-y-2">
                          {project.bullets.map((bullet) => (
                            <li key={bullet} className="text-sm text-foreground flex gap-3">
                              <span className="text-accent font-bold shrink-0">✓</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <Badge key={tech} variant="secondary" className="font-mono text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <Button asChild className="flex-1">
                              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                                View Live
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button asChild variant="outline">
                              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                <Github className="w-4 h-4" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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
