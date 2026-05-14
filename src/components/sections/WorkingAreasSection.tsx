'use client';

import FadeUp from '../ui/FadeUp';
import { Code2, ServerCog, Database, Layers, Users, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { areas } from '../../dummyData/dummyData';

export default function WorkingAreasSection() {
  return (
    <section
      id="workings"
      className="container mx-auto flex justify-center items-center lg:min-h-screen px-6 py-16"
    >
      <div className="w-full">
        <FadeUp>
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            What I do
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-10">My Working Areas</h2>
        </FadeUp>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <FadeUp key={area.title} delay={i * 80}>
              <Card className="group flex flex-col p-8 h-full cursor-pointer border border-border hover:border-accent hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div
                  className={`w-14 h-14 mb-5 flex items-center justify-center rounded-2xl ${area.iconBg} transition-colors duration-300 group-hover:bg-accent`}
                >
                  <area.Icon
                    size={22}
                    className={`transition-colors duration-300 ${area.iconColor} group-hover:text-white`}
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2 text-foreground">{area.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
