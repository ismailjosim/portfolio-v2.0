'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import FadeUp from '../ui/FadeUp';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

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

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects?limit=3');
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

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-96">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <FadeUp>
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Things I&apos;ve built
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            A selection of projects I&apos;ve worked on, showcasing modern engineering principles
            and user-centric solutions.
          </p>
        </FadeUp>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <FadeUp key={project._id} delay={i * 100}>
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
                    {project.technologies.slice(0, 4).map((tech) => (
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

        {/* Footer CTA */}
        <FadeUp delay={300}>
          <div className="mt-16 flex flex-col items-center gap-6">
            <Button asChild size="lg">
              <a href="/all-projects">View All Projects</a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Explore more projects and solutions I&apos;ve built
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ProjectsSection;
