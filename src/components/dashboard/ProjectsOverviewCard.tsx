'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, FolderKanban, Plus, ExternalLink, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Project {
  _id?: string;
  name?: string;
  title?: string;
  type?: string;
  technologies?: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsOverviewCardProps {
  projects: Project[];
  totalProjects: number;
}

export const ProjectsOverviewCard = ({ projects, totalProjects }: ProjectsOverviewCardProps) => {
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <Card className="relative overflow-hidden border-border/80 bg-card/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0A1124]/90 shadow-lg flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <FolderKanban className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Featured Projects</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totalProjects} projects · {featuredCount} spotlighted
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Manage <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-1">
        <div className="space-y-2.5">
          {projects.slice(0, 3).map((project) => {
            const projectName = project.name || project.title || 'Untitled Project';

            return (
              <div
                key={project._id || projectName}
                className="group relative rounded-xl border border-border/60 bg-muted/20 p-3 transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 dark:border-slate-800/60 dark:bg-slate-950/30 dark:hover:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {projectName}
                      </h4>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.2 text-[10px] font-bold text-amber-500">
                          <Sparkles className="h-2.5 w-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground truncate">
                      {project.type || 'Full Stack Application'}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 bg-background/50 border-border/50 dark:border-slate-800"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        title="Repository"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p className="text-sm font-medium">No projects yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1 mb-4">
              Add your portfolio projects to showcase them.
            </p>
            <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
              <Link href="/dashboard/projects">
                <Plus className="h-3.5 w-3.5 text-primary" /> Create Project
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
