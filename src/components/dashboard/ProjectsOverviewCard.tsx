import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  _id?: string;
  name: string;
  type: string;
  technologies: string[];
  featured?: boolean;
  liveUrl?: string;
}

interface ProjectsOverviewCardProps {
  projects: Project[];
  totalProjects: number;
}

export const ProjectsOverviewCard = ({ projects, totalProjects }: ProjectsOverviewCardProps) => {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl">Projects</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {totalProjects} total projects · {featuredProjects.length} featured
          </p>
        </div>
        <Link
          href="/dashboard/projects"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Manage <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project._id}
              className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium truncate">{project.name}</h4>
                  {project.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{project.type}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No projects yet</p>
            <p className="text-xs mt-1">Create your first project to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
