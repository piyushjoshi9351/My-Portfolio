 'use client';

import { useEffect, useRef, useState } from 'react';
import { skillsData } from '@/lib/portfolio-data';
import { supabase, Skill } from '@/lib/supabase';

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function EnhancedSkillsSection() {
  const [groups, setGroups] = useState<typeof skillsData>(skillsData);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
          setGroups(skillsData);
          return;
        }

        // Keep resume skills as base, then merge/append admin skills.
        const baseMap: Record<string, { category: string; skills: { name: string; level: number }[] }> = {};

        skillsData.forEach((group) => {
          baseMap[group.category] = {
            category: group.category,
            skills: [...group.skills],
          };
        });

        data.forEach((s: Skill) => {
          const cat = s.category || 'Technical';
          if (!baseMap[cat]) {
            baseMap[cat] = { category: cat, skills: [] };
          }

          const existingIndex = baseMap[cat].skills.findIndex(
            (skill) => skill.name.toLowerCase() === s.name.toLowerCase()
          );

          if (existingIndex >= 0) {
            // If same skill exists, reflect latest admin proficiency.
            baseMap[cat].skills[existingIndex] = {
              name: s.name,
              level: s.proficiency,
            };
          } else {
            // New admin skill -> append as extra.
            baseMap[cat].skills.push({ name: s.name, level: s.proficiency });
          }
        });

        setGroups(Object.values(baseMap));
      } catch (err) {
        console.error('Error fetching skills for enhanced section:', err);
        setGroups(skillsData);
      }
    };

    fetch();
  }, []);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {groups.map((category) => (
              <div key={category.category} className="space-y-6">
                <h3 className="text-xl font-bold text-foreground border-b border-purple-500/20 pb-3">
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
