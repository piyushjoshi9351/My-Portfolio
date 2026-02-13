"use client";
import React, { useEffect, useRef, useState } from "react";
import { skillsData } from "@/lib/portfolio-data";
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
  return (
    <section id="skills" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Technical Toolkit
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            The technologies and tools I use to bring ideas to life.
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-12">
          {skillsData.map((category) => (
            <div key={category.category} className="animate-zoom-in">
              <h3 className="mb-6 text-2xl font-bold text-center text-primary">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
