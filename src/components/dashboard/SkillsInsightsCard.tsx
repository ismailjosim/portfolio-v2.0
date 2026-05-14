import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Zap, Grid3x3, TrendingUp } from 'lucide-react';

interface Skill {
  _id?: string;
  name: string;
  category?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillsMetrics {
  totalSkills: number;
  skillsByCategory: Record<string, number>;
  proficiencyBreakdown?: Record<string, number>;
}

interface SkillsInsightsCardProps {
  metrics: SkillsMetrics;
  skills: Skill[];
}

const proficiencyColors: Record<string, string> = {
  beginner: 'from-blue-500 to-blue-600',
  intermediate: 'from-green-500 to-green-600',
  advanced: 'from-orange-500 to-orange-600',
  expert: 'from-purple-500 to-purple-600',
};

export const SkillsInsightsCard = ({ metrics, skills }: SkillsInsightsCardProps) => {
  const categories = Object.entries(metrics.skillsByCategory);
  const maxCategoryCount = Math.max(...Object.values(metrics.skillsByCategory), 1);
  const proficiencies = metrics.proficiencyBreakdown || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Skills Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <MetricBox icon={Zap} label="Total Skills" value={metrics.totalSkills} />
              <MetricBox
                icon={Grid3x3}
                label="Categories"
                value={Object.keys(metrics.skillsByCategory).length}
              />
              <MetricBox icon={TrendingUp} label="Expert Level" value={proficiencies.expert || 0} />
            </div>

            {Object.keys(proficiencies).length > 0 && (
              <div className="pt-4 border-t space-y-3">
                <p className="text-sm font-medium">Proficiency Distribution</p>
                {Object.entries(proficiencies)
                  .sort(([, a], [, b]) => b - a)
                  .map(([level, count]) => (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="capitalize font-medium">{level}</span>
                        <span className="text-muted-foreground">{count} skills</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`bg-linear-to-r ${
                            proficiencyColors[level] || 'from-gray-500 to-gray-600'
                          } h-2 rounded-full transition-all`}
                          style={{
                            width: `${(count / metrics.totalSkills) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="breakdown" className="mt-4 space-y-3">
            {categories.length > 0 ? (
              categories.map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-xs text-muted-foreground">
                      {count} {count === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${(count / maxCategoryCount) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Show skills in this category */}
                  <div className="flex flex-wrap gap-1 mt-2 ml-2">
                    {skills
                      .filter((s) => (s.category || 'Uncategorized') === category)
                      .slice(0, 4)
                      .map((skill) => (
                        <span key={skill._id} className="text-xs bg-muted px-2 py-1 rounded-sm">
                          {skill.name}
                        </span>
                      ))}
                    {skills.filter((s) => (s.category || 'Uncategorized') === category).length >
                      4 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-sm text-muted-foreground">
                        +
                        {skills.filter((s) => (s.category || 'Uncategorized') === category).length -
                          4}
                        more
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No skills in any category</p>
                <p className="text-xs mt-1">Add skills to see them grouped by category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface MetricBoxProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}

const MetricBox = ({ icon: Icon, label, value }: MetricBoxProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};
