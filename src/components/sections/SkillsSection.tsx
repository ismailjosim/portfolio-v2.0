/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { getIcon } from '../../lib/iconMapper';
import FadeUp from '../ui/FadeUp';
import { SkillGroup } from '../../interface/content.interface';

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  proficiency: string;
  description?: string;
  order?: number;
}

interface SkillGroupData extends SkillGroup {
  skills: (Omit<Skill, 'icon'> & { icon: any })[];
}

// --------------------------
// Component
// --------------------------
export default function SkillsSection() {
  const [skillGroups, setSkillGroups] = useState<SkillGroupData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills?limit=100&isPublished=true');
        const data = await response.json();

        if (data.skills) {
          // Group skills by category
          const groupedByCategory = data.skills.reduce(
            (acc: Record<string, Skill[]>, skill: Skill) => {
              if (!acc[skill.category]) {
                acc[skill.category] = [];
              }
              acc[skill.category].push(skill);
              return acc;
            },
            {}
          );

          // Transform to SkillGroup format
          const groups: SkillGroupData[] = Object.entries(groupedByCategory).map(
            ([category, skills]) => ({
              label: category,
              icon: getIcon(
                category === 'Languages'
                  ? 'Code2'
                  : category === 'Frontend'
                    ? 'Globe'
                    : category === 'Styling & UI'
                      ? 'Palette'
                      : category === 'Backend'
                        ? 'Server'
                        : category === 'Database'
                          ? 'Database'
                          : 'Wrench'
              ),
              skills: (skills as Skill[]).map((skill) => ({
                ...skill,
                icon: getIcon(skill.icon),
              })),
            })
          );

          setSkillGroups(groups);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
              What I work with
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-16">
              Technical Skills
            </h2>
          </FadeUp>
          <div className="flex items-center justify-center min-h-96">
            <p className="text-muted-foreground">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            What I work with
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-16">
            Technical Skills
          </h2>
        </FadeUp>

        {/* Skill Groups */}
        <FadeUp delay={100}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillGroups.map(({ label, icon: GroupIcon, skills }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <GroupIcon size={20} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{label}</h4>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {skills.map(({ _id, name, icon: SkillIcon }) => (
                    <div
                      key={_id}
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-muted text-muted-foreground hover:bg-primary hover:text-white transition group cursor-default"
                    >
                      <SkillIcon
                        size={16}
                        className="text-primary group-hover:text-white transition"
                      />
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
