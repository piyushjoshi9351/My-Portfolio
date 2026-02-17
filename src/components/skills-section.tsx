"use client";
import React, { useEffect, useRef, useState } from "react";
import { supabase, Skill } from "@/lib/supabase";
import { Progress } from "@/components/ui/progress";

const SkillBar = ({ skill, level }: { skill: string; level: number }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(level);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.5,
      }
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
    <div ref={ref} className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{skill}</span>
        <span className="text-sm font-medium text-primary">{level}%</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Technical';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Technical Toolkit
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            The technologies and tools I use to bring ideas to life.
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="animate-zoom-in">
              <h3 className="mb-6 text-2xl font-bold text-center text-primary">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {categorySkills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill.name} level={skill.proficiency} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
