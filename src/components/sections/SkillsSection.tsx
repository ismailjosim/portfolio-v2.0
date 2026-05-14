'use client';

import { skillGroups } from '../../dummyData/dummyData';
import FadeUp from '../ui/FadeUp';

// --------------------------
// Component
// --------------------------
export default function SkillsSection() {
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
                  {skills.map(({ name, icon: SkillIcon }) => (
                    <div
                      key={name}
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
