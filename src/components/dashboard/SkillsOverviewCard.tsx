import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Skill {
  _id?: string;
  name: string;
  category?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillsOverviewCardProps {
  skills: Skill[];
  totalSkills: number;
  skillsByCategory?: Record<string, number>;
}

const proficiencyColors = {
  beginner: 'bg-blue-100 text-blue-800',
  intermediate: 'bg-green-100 text-green-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800',
};

export const SkillsOverviewCard = ({
  skills,
  totalSkills,
  skillsByCategory = {},
}: SkillsOverviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl">Skills</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {totalSkills} skills across categories
          </p>
        </div>
        <Link
          href="/dashboard/skills"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Manage <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.keys(skillsByCategory).length > 0 && (
            <div className="space-y-3">
              {Object.entries(skillsByCategory).map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{category}</p>
                    <span className="text-xs text-muted-foreground">{count} skills</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(count / totalSkills) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 6).map((skill) => (
                  <Badge key={skill._id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
                {skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{skills.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet</p>
            <p className="text-xs mt-1">Add your skills to showcase your expertise</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
